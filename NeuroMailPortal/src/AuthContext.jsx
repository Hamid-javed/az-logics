import React, {
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
  const authUrl = normalizeOrigin(
    import.meta.env.VITE_AUTH_URL || "http://localhost:3000",
  );

  // ── Existing UI/mail state (unchanged) ──
  const [extensions, setExtensions] = useState({});
  const [aiTemplates, setAiTemplates] = useState([
    {
      id: "1",
      updated_at: "2024-01-01T00:00:00Z",
      created_at: "2024-01-01T00:00:00Z",
      name: "Original",
    },
  ]);
  const [search, setSearch] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [userMailBox, setUserMailBox] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [emailDetails, setEmailDetails] = useState({});
  const [Selected, setSelected] = useState("classic");
  const [isFromRegister, setIsFromRegister] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState({ type: "inbox", starred: "" });
  const [emailData, setEmailData] = useState("");
  const [messages, setMessagesData] = useState("");
  const [queryParams, setQueryParams] = useState({ type: "inbox", seen: "", starred: "" });

  // ── Auth state ─────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken,     setAccessToken]     = useState(null);
  const [isLocked,        setIsLocked]        = useState(false);
  const [hasHubAccount,   setHasHubAccount]   = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [isUnlocking,     setIsUnlocking]     = useState(false);

  const [isLoading, setIsLoading] = useState(() => !isTokenValid());

  const iframeRef      = useRef(null);
  const iframeReadyRef = useRef(false);
  const authDoneRef    = useRef(false);

  useEffect(() => {
  const hash = window.location.hash;
  if (!hash) return;

  const params = new URLSearchParams(hash.slice(1));
  const token = params.get("access_token");
  const cryptoData = params.get("crypto_data");
  const encryptionKey = params.get("encryption_key");

  if (!token) return;

  localStorage.setItem("access_token", token);
  if (cryptoData) localStorage.setItem("crypto_data", decodeURIComponent(cryptoData));
  if (encryptionKey) localStorage.setItem("encryption-key", decodeURIComponent(encryptionKey));

  window.history.replaceState(null, "", window.location.pathname);

  setAccessToken(token);
  setIsAuthenticated(true);
  setHasHubAccount(true);
  setIsLocked(false);
  setIsLoading(false);   // ← THIS is what unblocks the render
  authDoneRef.current = true;
}, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 useEffect(() => {
  if (isTokenValid()) {
    setAccessToken(localStorage.getItem("access_token"));
    setIsAuthenticated(true);
    setIsLoading(false);
    authDoneRef.current = true;
  } else if (!window.location.hash.includes("access_token")) {
    setIsLoading(true); 
  }
}, []);

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

  const handleMessage = useCallback((event) => {
    if (normalizeOrigin(event.origin) !== authUrl) return;

    const { type, payload } = event.data || {};
    if (!type) return;

    if (type === "AUTH_DATA_RESPONSE") {
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
          setIsLoading(false);
          authDoneRef.current = true;
          break;

        case "LOCKED":
          setIsLocked(true);
          setIsAuthenticated(false);
          setHasHubAccount(!!payload.hasSession);
          setIsUnlocking(false);
          setIsLoading(false);
          break;

        // ✅ No session — show login button, no redirect
        case "NO_SESSION":
          setIsAuthenticated(false);
          setIsLocked(false);
          setHasHubAccount(payload.hasHubAccount ?? false);
          setIsUnlocking(false);
          setIsLoading(false);
          break;

        // ✅ Hub logout broadcast — clear silently
        case "LOGOUT":
          localStorage.removeItem("access_token");
          localStorage.removeItem("crypto_data");
          localStorage.removeItem("encryption-key");
          localStorage.removeItem("email_id");
          setIsAuthenticated(false);
          setAccessToken(null);
          setHasHubAccount(false);
          setIsLocked(false);
          setIsUnlocking(false);
          setUserMailBox({});
          setIsLoading(false);
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
      localStorage.setItem("access_token", payload.accessToken);
      setAccessToken(payload.accessToken);
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
      setIsLoading(false);
      authDoneRef.current = false;
    }
  }, [authUrl]);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  function requestAuthFromBridge() {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "REQUEST_AUTH_DATA" },
      authUrl,
    );
  }

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
    setIsUnlocking(true);
    iframeRef.current?.contentWindow?.postMessage(
      { type: "UNLOCK_APP" },
      authUrl,
    );
  }

  function loginWithHub() {
    const callback = encodeURIComponent(window.location.origin);
    window.location.href = `${authUrl}/?openLogin=true&callback=${callback}`;
  }

  // ── Auth actions ──
  const login  = () => setIsAuthenticated(true);
  const signup = () => setIsAuthenticated(true);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("crypto_data");
    localStorage.removeItem("encryption-key");
    localStorage.removeItem("email_id");
    setIsAuthenticated(false);
    setAccessToken(null);
    setUserMailBox({});
    authDoneRef.current = false;
    logoutUser();
    lockApp();
  };

  // ── Existing helpers (unchanged) ──
  const handleButtonClick = (newParams) => {
    setActiveButton(newParams);
    setQueryParams((prev) => ({ ...prev, ...newParams }));
  };

  return (
    <AuthContext.Provider
      value={{
        // ── Auth ──
        isAuthenticated,
        accessToken,
        isLocked,
        hasHubAccount,
        loading,
        isLoading,
        isUnlocking,
        setLoading,
        login,
        signup,
        logout,
        lockApp,
        unlockApp,
        refreshToken,
        loginWithHub,

        // ── Mail (unchanged) ──
        search,
        setSearch,
        Selected,
        setSelected,
        selectedIds,
        setSelectedIds,
        currentPage,
        setCurrentPage,
        activeButton,
        setActiveButton,
        handleButtonClick,
        isDesktop,
        messages,
        setMessagesData,
        extensions,
        setExtensions,
        queryParams,
        setQueryParams,
        emailData,
        setEmailData,
        emailDetails,
        setEmailDetails,
        isFromRegister,
        setIsFromRegister,
        isNewMessage,
        setIsNewMessage,
        selectedMessage,
        setSelectedMessage,
        progressValue,
        setProgressValue,
        userMailBox,
        setUserMailBox,
        aiTemplates,
        setAiTemplates,
        userProfile,
        setUserProfile,
        setIsAuthenticated,
      }}
    >
      <iframe
        ref={iframeRef}
        id="auth-bridge-iframe"
        src={`${authUrl}/sso-bridge.html`}
        style={{ display: "none" }}
        title="sso-bridge"
        onLoad={handleIframeLoad}
      />
      {isLoading ? <AuthLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);