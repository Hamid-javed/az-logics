import loginApiClient from '@/lib/loginApiClient';
import { deriveSeedsHash, generateSeedPhrase, handleSuccessfulLogin, performSignup } from '@/lib/cryptoOperations';
import { authService } from '@/services/auth-service';
import { toast } from 'react-toastify';
import { create } from 'zustand';

type ModalType = 'loginSeeds' | 'seedsRegister' | 'selectRegistration' | 'createAccount' | 'freeAccount' | 'settings' | null | 'registeredTools' | 'accountPopup';

interface AuthState {
  seedsData: any | null;
  error: any | null;
  activeModal: ModalType;
  isLoading: boolean;
  isGeneratingSeeds: boolean;
  isAuthenticated: boolean;
  requires2FA: boolean;
  tempSeeds: string | null;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  checkAuth: () => void;
  initBroadcastListener: () => () => void;
  handleRegister: (retry?: boolean) => Promise<void>;
  resetRegState: () => void;
  loginWithSeeds: (seeds: string) => Promise<boolean>;
  loginWithOTP: (otp: string) => Promise<boolean>;
  globalLogout: () => void;
}

const isTokenExpired = (token: string) => {
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

const isTokenValid = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  return !isTokenExpired(token);
};

export const useAuthStore = create<AuthState>((set, get) => ({
  activeModal: null,
  seedsData: null,
  error: null,
  isGeneratingSeeds: false,
  isLoading: false,
  isAuthenticated: false,
  requires2FA: false,
  tempSeeds: null,

  openModal: (type) => set({ activeModal: type, requires2FA: false, tempSeeds: null }),
  closeModal: () => set({ activeModal: null, requires2FA: false, tempSeeds: null }),
  resetRegState: () => set({ seedsData: null, error: null, isGeneratingSeeds: false }),

  // ✅ Call this once in your root component (e.g. layout.tsx)
  // Listens for cross-tab auth events via BroadcastChannel
  initBroadcastListener: () => {
    const bc = new BroadcastChannel("auth_sync");

    bc.onmessage = (e) => {
      // ✅ Another tab logged in — check local storage and sync
      if (e.data.type === "SESSION_UPDATED") {
        if (isTokenValid()) {
          set({ isAuthenticated: true });
        }
      }

      // ✅ Another tab logged out — clear and deauth
      if (e.data.type === "SESSION_TERMINATED") {
        localStorage.clear();
        set({
          isAuthenticated: false,
          activeModal: null,
          requires2FA: false,
          tempSeeds: null,
        });
      }
    };

    // ✅ Also check token on tab visibility change
    // When user switches back to this tab — revalidate token
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (isTokenValid()) {
          set({ isAuthenticated: true });
        } else {
          // Token expired while tab was in background
          set({ isAuthenticated: false });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Return cleanup function
    return () => {
      bc.close();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  },

  // ✅ Check auth on app load
  checkAuth: async () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("access_token");
    const cryptoData = localStorage.getItem("crypto_data");

    if (!token || !cryptoData) {
      set({ isAuthenticated: false });
      return;
    }

    if (isTokenExpired(token)) {
      try {
        await loginApiClient.get('/auth/token/refresh-cookie/');
        set({ isAuthenticated: true });
      } catch {
        set({ isAuthenticated: false });
        localStorage.clear();
      }
    } else {
      set({ isAuthenticated: true });
    }
  },

  handleRegister: async (isRetry = false) => {
    set({ isGeneratingSeeds: true, error: null });
    try {
      const seedPhrase = await generateSeedPhrase();
      const cryptoData = await performSignup(seedPhrase);
      const payload = {
        enc_salt: cryptoData.encSalt,
        encrypted_private_key: cryptoData.encryptedPrivateKey,
        encrypted_private_key_iv: cryptoData.encryptedPrivateKeyIV,
        encrypted_private_key_tag: cryptoData.encryptedPrivateKeyTag,
        pass_phrase: cryptoData.loginHash,
        public_key: cryptoData.publicKey,
      };
      await authService.registerSeeds(payload);
      set({ seedsData: seedPhrase, isGeneratingSeeds: false });
      toast.success("Successfully got seeds");
    } catch (err: any) {
      if (!isRetry) return get().handleRegister(true);
      const message = err.response?.data?.[0] || "Registration failed. Please try again.";
      toast.error(message);
      set({ seedsData: null, error: message, isGeneratingSeeds: false });
    }
  },

  loginWithSeeds: async (seeds: string) => {
    set({ isLoading: true, error: null, requires2FA: false, tempSeeds: null });
    try {
      const seedsHash = await deriveSeedsHash(seeds);
      const payload = { pass_phrase: seedsHash.loginHash };
      const response = await authService.generateToken(payload);
      await handleSuccessfulLogin(response, seeds);

      const token = localStorage.getItem("access_token");
      if (token) {
        // ✅ Notify all subdomain tabs that session is updated
        const bc = new BroadcastChannel("auth_sync");
        bc.postMessage({ type: "SESSION_UPDATED" });
        bc.close(); // ✅ always close after posting

        set({ isAuthenticated: true, isLoading: false, error: null });
        return true;
      } else {
        throw new Error("Token not saved correctly");
      }
    } catch (err: any) {
      const is2FARequired =
        err.response?.status === 400 &&
        (err.response?.data?.totp_token ||
          (typeof err.response?.data === 'object' && 'totp_token' in err.response.data));

      if (is2FARequired) {
        set({ requires2FA: true, tempSeeds: seeds, isLoading: false });
        return false;
      }

      const message = err.response?.data?.detail || err.response?.data?.non_field_errors?.[0] || "Login failed";
      set({ error: message, isLoading: false });
      toast.error(message);
      return false;
    }
  },

  loginWithOTP: async (otp: string) => {
    const { tempSeeds } = get();
    if (!tempSeeds) {
      set({ error: "Session expired. Please try login again.", requires2FA: false });
      return false;
    }

    set({ isLoading: true, error: null });
    try {
      const seedsHash = await deriveSeedsHash(tempSeeds);
      const payload = { pass_phrase: seedsHash.loginHash, totp_token: otp };
      const response = await authService.generateToken(payload);
      await handleSuccessfulLogin(response, tempSeeds);

      // ✅ Notify all subdomain tabs
      const bc = new BroadcastChannel("auth_sync");
      bc.postMessage({ type: "SESSION_UPDATED" });
      bc.close(); // ✅ always close

      set({ isAuthenticated: true, isLoading: false, requires2FA: false, tempSeeds: null });
      return true;
    } catch (err: any) {
      const message = err.response?.data?.detail || err.response?.data?.[0] || "Invalid code";
      set({ error: message, isLoading: false });
      toast.error(message);
      return false;
    }
  },

  globalLogout: async () => {
    localStorage.clear();
    set({ isAuthenticated: false, activeModal: null, requires2FA: false, tempSeeds: null });
    const bc = new BroadcastChannel("auth_sync");
    bc.postMessage({ type: "SESSION_TERMINATED" });
    bc.close(); 
  },
}));