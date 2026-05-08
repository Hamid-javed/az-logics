import {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { logoutUser } from "./utils/cryptoOperations";
import { AuthLoader } from "./components/AuthLoader";

const AuthContext = createContext(null);

const normalizeOrigin = (o) => o?.replace(/\/$/, "") ?? "";

const isTokenValid = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  // ✅ Normalized once — no trailing slash issues
  const authUrl = normalizeOrigin(
    import.meta.env.VITE_AUTH_URL || "http://localhost:3000",
  );

  // ── UI state (unchanged) ───────────────────────────────
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] =
    useState(false);
  const [showGeneratePassModal, setShowGeneratePassModal] = useState(false);
  const [generatorPassword, setGeneratorPassword] = useState("");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});
  const [isOpenKeyPair, setIsOpenKeypair] = useState(false);
  const [recipientData, setRecipientData] = useState("");

  // ── Auth state ─────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [hasHubAccount, setHasHubAccount] = useState(false);

  const [loading, setLoading] = useState(true);
  const hasReceivedResponseRef = useRef(false);

  const iframeRef = useRef(null);
  const iframeReadyRef = useRef(false);
  const authDoneRef = useRef(false);
  const timeoutRef = useRef(null);

  const setLoadingWithCause = (value, cause) => {
    setLoading(value);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      return;
    }

    const params = new URLSearchParams(hash.slice(1));
    const token = params.get("access_token");
    const cryptoData = params.get("crypto_data");
    const encryptionKey = params.get("encryption_key");

    if (!token) {
      return;
    }

    localStorage.setItem("access_token", token);
    if (cryptoData)
      localStorage.setItem("crypto_data", decodeURIComponent(cryptoData));
    if (encryptionKey)
      localStorage.setItem("encryption-key", decodeURIComponent(encryptionKey));

    window.history.replaceState(null, "", window.location.pathname);

    setAccessToken(token);
    setIsAuthenticated(true);
    setHasHubAccount(true);
    setIsLocked(false);
    setLoadingWithCause(false, "OAuth hash token found");
    authDoneRef.current = true;
    hasReceivedResponseRef.current = true;

    // Clear timeout if exists
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // Initial auth check
  useEffect(() => {
    const tokenValid = isTokenValid();
    const hashHasToken = window.location.hash.includes("access_token");

    if (tokenValid) {
      const token = localStorage.getItem("access_token");
      setAccessToken(token);
      setIsAuthenticated(true);
      setLoadingWithCause(false, "Valid token found");
      authDoneRef.current = true;
      hasReceivedResponseRef.current = true;
    } else if (hashHasToken) {
    } else {
      timeoutRef.current = setTimeout(() => {
        if (!hasReceivedResponseRef.current && loading) {
          setLoadingWithCause(false, "Timeout - no iframe response");
        }
      }, 3000); // 3 second timeout
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Token refresh timer
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
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }, [accessToken]);

  const handleMessage = useCallback(
    (event) => {
      if (normalizeOrigin(event.origin) !== authUrl) return;

      const { type, payload } = event.data || {};
      if (!type) return;

      if (type === "AUTH_DATA_RESPONSE") {
        // Mark that we received a response
        hasReceivedResponseRef.current = true;

        // Clear the timeout since we got a response
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        switch (payload?.status) {
          case "AUTHORIZED":
            localStorage.setItem("access_token", payload.accessToken);
            if (payload.cryptoData)
              localStorage.setItem("crypto_data", payload.cryptoData);
            if (payload.encryptionKey)
              localStorage.setItem("encryption-key", payload.encryptionKey);
            setAccessToken(payload.accessToken);
            setIsAuthenticated(true);
            setHasHubAccount(true);
            setIsLocked(false);
            setIsUnlocking(false);
            setLoadingWithCause(false, "AUTHORIZED from Hub");
            authDoneRef.current = true;
            break;

          case "LOCKED":
            setIsLocked(true);
            setIsAuthenticated(false);
            setHasHubAccount(!!payload.hasSession);
            setIsUnlocking(false);
            setLoadingWithCause(false, "LOCKED state from Hub");
            break;

          case "NO_SESSION":
            setIsAuthenticated(false);
            setIsLocked(false);
            setHasHubAccount(payload.hasHubAccount ?? false);
            setIsUnlocking(false);
            setLoadingWithCause(false, "NO_SESSION from Hub - showing login");
            break;

          case "LOGOUT":
            localStorage.removeItem("access_token");
            localStorage.removeItem("crypto_data");
            localStorage.removeItem("encryption-key");
            setIsAuthenticated(false);
            setAccessToken(null);
            setHasHubAccount(false);
            setIsLocked(false);
            setIsUnlocking(false);
            setLoadingWithCause(false, "LOGOUT from Hub");
            authDoneRef.current = false;
            break;

          case "RELOAD_TOKEN":
            if (iframeReadyRef.current) requestAuthFromBridge();
            break;

          default:
            setLoadingWithCause(false, "Unknown status - showing UI");
            break;
        }
      }

      if (type === "TOKEN_REFRESHED") {
        localStorage.setItem("access_token", payload.accessToken);
        setAccessToken(payload.accessToken);
        setIsAuthenticated(true);
      }

      if (type === "SESSION_EXPIRED") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("crypto_data");
        localStorage.removeItem("encryption-key");
        setIsAuthenticated(false);
        setAccessToken(null);
        setHasHubAccount(false);
        setIsLocked(false);
        setIsUnlocking(false);
        setLoadingWithCause(false, "SESSION_EXPIRED from Hub");
        authDoneRef.current = false;
      }
    },
    [authUrl],
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // ── Bridge helpers ─────────────────────────────────────
  function requestAuthFromBridge() {
    try {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "REQUEST_AUTH_DATA" },
        authUrl,
      );
    } catch (error) {
      console.error("Failed to send message to iframe:", error);
      // If we can't communicate with iframe, show login UI after timeout
      setTimeout(() => {
        if (!hasReceivedResponseRef.current && loading) {
          setLoadingWithCause(false, "Cannot communicate with iframe");
        }
      }, 1000);
    }
  }

  function handleIframeLoad() {
    iframeReadyRef.current = true;
    if (!authDoneRef.current && !hasReceivedResponseRef.current) {
      requestAuthFromBridge();
    }
  }

  function refreshToken() {
    if (!iframeReadyRef.current) {
      return;
    }
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
    setIsUnlocking(true);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "UNLOCK_APP" },
      authUrl,
    );
  }

  function loginWithHub() {
    const callback = encodeURIComponent(window.location.origin);
    const loginUrl = `${authUrl}/?openLogin=true&callback=${callback}`;
    window.location.href = loginUrl;
  }

  // ── Auth actions ──
  const login = () => {
    setIsAuthenticated(true);
  };

  const signup = () => {
    setIsAuthenticated(true);
  };

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

  // ── Modal helpers (unchanged) ──────────────────────────
  const handleSaveConfirmationModalVisibility = () =>
    setShowSaveConfirmationModal((prev) => !prev);

  const handleGeneratePassVisibility = () =>
    setShowGeneratePassModal((prev) => !prev);

  const handleModal = (item = null) => {
    setRecipientData(item);
    setIsOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpenKeypair(false);
    setFormValues({});
    setErrors({});
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const openModal = () => {
    setIsOpenKeypair(true);
    setStep(1);
  };

  return (
    <AuthContext.Provider
      value={{
        // ── Auth ──
        isAuthenticated,
        accessToken,
        isLocked,
        isUnlocking,
        hasHubAccount,
        loading,
        login,
        signup,
        logout,
        lockApp,
        unlockApp,
        refreshToken,
        loginWithHub,

        // ── UI (unchanged) ──
        isDesktop,
        search,
        setSearch,
        generatorPassword,
        setGeneratorPassword,
        showGeneratePassModal,
        showSaveConfirmationModal,
        handleGeneratePassVisibility,
        handleSaveConfirmationModalVisibility,

        // ── RSA modal (unchanged) ──
        isOpen,
        step,
        setStep,
        isOpenKeyPair,
        closeModal,
        errors,
        setErrors,
        formValues,
        setFormValues,
        nextStep,
        prevStep,
        openModal,
        recipientData,
        setRecipientData,
        handleModal,
      }}
    >
      <iframe
        ref={iframeRef}
        id="auth-bridge-iframe"
        src={`${authUrl}/sso-bridge.html`}
        style={{ display: "none" }}
        title="sso-bridge"
        onLoad={handleIframeLoad}
        onError={(error) => {
          setLoadingWithCause(false, "Iframe load error - falling back");
        }}
      />
      {loading ? <AuthLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);