// neuroRsa

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { FilesResponse, Folder } from "./features/directories/folderSlice";
import { debounce } from "@mui/material";
import { logoutUser } from "./utils/cryptoOperations";
import { AuthLoader } from "./Components/AuthLoader";

type OpenComponentsState = {
  [key: string]: boolean;
};

// ── Helpers ───────────────────────────────────────────────
const normalizeOrigin = (o?: string) => o?.replace(/\/$/, "") ?? "";

const isTokenValid = (): boolean => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

// ── Context type ──────────────────────────────────────────
interface AuthContextType {
  // Storage/profile
  profile: string;
  total_size: number;
  used: number;
  search: string;
  isGridMode: boolean;
  usedStorage: number;
  activeFolder: string;
  files: FilesResponse | null;
  parentFolder: Folder | null;
  isAccountOpen: boolean;
  reGetProfile: boolean;
  isOpenComponent: OpenComponentsState;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFiles: (component: FilesResponse | null) => void;
  setTotal_size: React.Dispatch<React.SetStateAction<number>>;
  setUsed: React.Dispatch<React.SetStateAction<number>>;
  setUsedStorage: React.Dispatch<React.SetStateAction<number>>;
  setActiveFolder: (activeFolder: string) => void;
  setParentFolder: (component: Folder) => void;
  setIsGridMode: (isGridMode: boolean) => void;
  setIsAccountOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReGetProfile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleComponent: (component: string, isOpen?: boolean) => void;
  debouncedSetSearch: (value: string) => void;

  // Auth
  isAuthenticated: boolean;
  accessToken: string | null;
  isLocked: boolean;
  isUnlocking: boolean;
  hasHubAccount: boolean;
  loading: boolean;
  isAuthHubVisible: boolean;
  setIsAuthHubVisible: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  signup: () => void;
  logout: () => void;
  lockApp: () => void;
  unlockApp: () => void;
  refreshToken: () => void;
  loginWithHub: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // ✅ Normalize authUrl once — no trailing slash ever
  const authUrl = normalizeOrigin(
    import.meta.env.VITE_AUTH_URL as string
  );

  // ── Storage/profile state (unchanged) ─────────────────
  const [used,          setUsed]          = useState(0);
  const [search,        setSearch]        = useState<string>("");
  const [total_size,    setTotal_size]    = useState(0);
  const [profile,       setProfile]       = useState<string>("");
  const [reGetProfile,  setReGetProfile]  = useState(false);
  const [usedStorage,   setUsedStorage]   = useState<number>(0);
  const [activeFolder,  setActiveFolder]  = useState("allFiles");
  const [isGridMode,    setIsGridMode]    = useState<boolean>(false);
  const [files,         setFiles]         = useState<FilesResponse | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [parentFolder,  setParentFolder]  = useState<Folder | null>(null);
  const [isAuthHubVisible, setIsAuthHubVisible] = useState<boolean>(false);
  const [isOpenComponent, setOpenComponent] = useState<OpenComponentsState>({
    share:     false,
    upload:    false,
    newFolder: false,
    newExcel:  false,
    newDocs:   false,
    reName:    false,
    meta:      false,
  });

  // ── Auth state ─────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken,     setAccessToken]     = useState<string | null>(null);
  const [isLocked,        setIsLocked]        = useState<boolean>(false);
  const [isUnlocking,     setIsUnlocking]     = useState<boolean>(false);
  const [hasHubAccount,   setHasHubAccount]   = useState<boolean>(false);

  // ✅ Subdomain — no URL extraction needed
  // loading=false immediately if local token valid
  const [loading, setLoading] = useState<boolean>(() => !isTokenValid());

  const iframeRef      = useRef<HTMLIFrameElement>(null);
  const iframeReadyRef = useRef<boolean>(false);
  const authDoneRef    = useRef<boolean>(false);

// REPLACE both mount useEffects with this single one
useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get("access_token");
    if (token) {
      const cryptoData = params.get("crypto_data");
      const encryptionKey = params.get("encryption_key");
      localStorage.setItem("access_token", token);
      if (cryptoData) localStorage.setItem("crypto_data", decodeURIComponent(cryptoData));
      if (encryptionKey) localStorage.setItem("encryption-key", decodeURIComponent(encryptionKey));
      window.history.replaceState(null, "", window.location.pathname);
      setAccessToken(token);
      setIsAuthenticated(true);
      setHasHubAccount(true);
      setIsLocked(false);
      setLoading(false);
      authDoneRef.current = true;
      return; // ← exit early, don't fall through to iframe path
    }
  }

  // Priority 2: valid token already in localStorage
  if (isTokenValid()) {
    setAccessToken(localStorage.getItem("access_token"));
    setIsAuthenticated(true);
    setLoading(false);
    authDoneRef.current = true;
    return; // ← exit early
  }

  setLoading(true);

  const iOSFallbackTimer = setTimeout(() => {
    if (!authDoneRef.current) {
      setLoading(false);
    }
  }, 5000);

  return () => clearTimeout(iOSFallbackTimer);
}, []);

  // ── STEP 2: Auto-refresh token before expiry ──────────
  useEffect(() => {
    if (!accessToken) return;
    try {
      const { exp } = JSON.parse(atob(accessToken.split(".")[1]));
      const msUntilExpiry = exp * 1000 - Date.now() - 60_000;
      if (msUntilExpiry <= 0) {
        refreshToken();
        return;
      }
      const timer = setTimeout(() => refreshToken(), msUntilExpiry);
      return () => clearTimeout(timer);
    } catch {}
  }, [accessToken]);

  // ── STEP 3: Handle all messages from iframe ───────────
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // ✅ Normalized comparison — no trailing slash issues
      if (normalizeOrigin(event.origin) !== authUrl) return;

      const { type, payload } = event.data as {
        type: string;
        payload: {
          status:        string;
          accessToken?:  string;
          cryptoData?:   string;
          encryptionKey?: string;
          hasHubAccount?: boolean;
          hasSession?:   boolean;
        };
      };

      if (!type) return;

      if (type === "AUTH_DATA_RESPONSE") {
        switch (payload?.status) {

          // ✅ Hub has valid session — store and authenticate
          case "AUTHORIZED":
            localStorage.setItem("access_token", payload.accessToken!);
            if (payload.cryptoData)
              localStorage.setItem("crypto_data", payload.cryptoData);
            if (payload.encryptionKey)
              localStorage.setItem("encryption-key", payload.encryptionKey);
            setAccessToken(payload.accessToken!);
            setIsAuthenticated(true);
            setHasHubAccount(true);
            setIsLocked(false);
            setIsUnlocking(false);
            setLoading(false);
            authDoneRef.current = true;
            break;

          // ✅ App locked — show unlock screen, no redirect
          case "LOCKED":
            setIsLocked(true);
            setIsAuthenticated(false);
            setHasHubAccount(!!payload.hasSession);
            setIsUnlocking(false);
            setLoading(false);
            break;

          // ✅ No session — show login button, no redirect
          case "NO_SESSION":
            setIsAuthenticated(false);
            setIsLocked(false);
            setHasHubAccount(payload.hasHubAccount ?? false);
            setIsUnlocking(false);
            setLoading(false);
            break;

          // ✅ Hub logout broadcast — clear silently across all tabs
          case "LOGOUT":
            localStorage.removeItem("access_token");
            localStorage.removeItem("crypto_data");
            localStorage.removeItem("encryption-key");
            setIsAuthenticated(false);
            setAccessToken(null);
            setHasHubAccount(false);
            setIsLocked(false);
            setIsUnlocking(false);
            setLoading(false);
            authDoneRef.current = false;
            break;

          // ✅ Hub logged in on another tab — pull fresh token
          case "RELOAD_TOKEN":
            if (iframeReadyRef.current) requestAuthFromBridge();
            break;

          default:
            break;
        }
      }

      // ✅ Token refreshed via HttpOnly cookie
      if (type === "TOKEN_REFRESHED") {
        localStorage.setItem("access_token", payload.accessToken!);
        setAccessToken(payload.accessToken!);
        setIsAuthenticated(true);
      }

      // ✅ Refresh cookie expired — full session gone
      if (type === "SESSION_EXPIRED") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("crypto_data");
        localStorage.removeItem("encryption-key");
        setIsAuthenticated(false);
        setAccessToken(null);
        setHasHubAccount(false);
        setIsLocked(false);
        setIsUnlocking(false);
        setLoading(false);
        authDoneRef.current = false;
      }
    },
    [authUrl],
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  // ── Bridge helpers ─────────────────────────────────────
  function requestAuthFromBridge() {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "REQUEST_AUTH_DATA" },
      authUrl,
    );
  }

  // ✅ Only request auth if local token didn't already resolve it
  function handleIframeLoad() {
    iframeReadyRef.current = true;
    if (!authDoneRef.current) {
      requestAuthFromBridge();
    }
  }

  function refreshToken() {
    if (!iframeReadyRef.current) return;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "REFRESH_TOKEN_REQUEST" },
      authUrl,
    );
  }

  function lockApp() {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "SET_LOCK" },
      authUrl,
    );
    setIsLocked(true);
  }

  function unlockApp() {
    setIsUnlocking(true); // ✅ prevent UI flicker during roundtrip
    iframeRef.current?.contentWindow?.postMessage(
      { type: "UNLOCK_APP" },
      authUrl,
    );
  }

  // ✅ Only called when user clicks Login button
  // One redirect to hub — iframe picks up session on return
  function loginWithHub() {
    const callback = encodeURIComponent(window.location.origin);
    window.location.href = `${authUrl}/?openLogin=true&callback=${callback}`;
  }

  const login  = () => setIsAuthenticated(true);
  const signup = () => setIsAuthenticated(true);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("crypto_data");
    localStorage.removeItem("encryption-key");
    setIsAuthenticated(false);
    setAccessToken(null);
    authDoneRef.current = false;
    logoutUser();
    lockApp();
  };

  // ── Existing helpers (unchanged) ──────────────────────
  useEffect(() => {
    const parentId = localStorage.getItem("parent_id");
    if (parentId) {
      setParentFolder(
        (prev) => ({ ...prev, id: parentId }) as Folder,
      );
    }
  }, []);

  const toggleComponent = (component: string, isOpen?: boolean) => {
    setOpenComponent((prevState) => ({
      ...prevState,
      [component]: isOpen !== undefined ? isOpen : !prevState[component],
    }));
  };

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        // Storage/profile
        used,          setUsed,
        files,         setFiles,
        profile,       setProfile,
        search,        setSearch,
        total_size,    setTotal_size,
        activeFolder,  setActiveFolder,
        isGridMode,    setIsGridMode,
        usedStorage,   setUsedStorage,
        parentFolder,  setParentFolder,
        isAccountOpen, setIsAccountOpen,
        reGetProfile,  setReGetProfile,
        isOpenComponent,
        toggleComponent,
        debouncedSetSearch,

        // Auth
        isAuthenticated,
        accessToken,
        isLocked,
        isUnlocking,
        hasHubAccount,
        loading,
        isAuthHubVisible,
        setIsAuthHubVisible,
        login,
        signup,
        logout,
        lockApp,
        unlockApp,
        refreshToken,
        loginWithHub,
      }}
    >
      {/*
        iframe always mounted — even when authenticated
        required for BroadcastChannel logout sync across tabs
      */}
      <iframe
        ref={iframeRef}
        id="auth-bridge-iframe"
        src={`${authUrl}/sso-bridge.html`}
        style={{ display: "none" }}
        title="sso-bridge"
        onLoad={handleIframeLoad}
        onError={() => {
          // iframe failed to load at all (network error, blocked URL, etc.)
          // Unblock the UI immediately so user isn't stuck on the loader.
          if (!authDoneRef.current) {
            setLoading(false);
          }
        }}
      />
      {loading ? <AuthLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};