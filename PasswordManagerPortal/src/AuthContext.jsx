import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { logoutUser } from "./utils/cryptoOperations";

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

const extractTokenFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  if (!accessToken) return null;

  const cryptoData = params.get("crypto_data");
  const encryptionKey = params.get("encryption_key");

  localStorage.setItem("access_token", accessToken);
  if (cryptoData)
    localStorage.setItem("crypto_data", decodeURIComponent(cryptoData));
  if (encryptionKey)
    localStorage.setItem("encryption-key", decodeURIComponent(encryptionKey));
  window.history.replaceState(null, "", window.location.pathname);

  return accessToken;
};


export const AuthProvider = ({ children }) => {
  const authUrl = normalizeOrigin(
    import.meta.env.VITE_AUTH_URL || "http://localhost:3000",
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [hasHubAccount, setHasHubAccount] = useState(false);
  const [loading, setLoading] = useState(() => {
    const urlToken = new URLSearchParams(window.location.search).get(
      "access_token",
    );
    return !isTokenValid() && !urlToken;
  });

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [screenState, setScreenState] = useState("");
  const [isAuthHubVisible, setIsAuthHubVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [folderTitle, setFolderTitle] = useState("");
  const [generatorPassword, setGeneratorPassword] = useState("");
  const [passSelectedFolderId, setPassSelectedFolderId] = useState(
    () => localStorage.getItem("FolderId") || "",
  );
  const [data, setData] = useState("");
  const [selectPasswordsId, setSelectedPasswordsId] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [openPasswordDeleteModal, setOpenPasswordDeleteModal] = useState(false);
  const [openConfirmChangesModal, setOpenConfirmChangesModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] =
    useState(false);
  const [showGeneratePassModal, setShowGeneratePassModal] = useState(false);
  const [applyPasswordButton, setApplyPasswordButton] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  const iframeRef = useRef(null);
  const iframeReadyRef = useRef(false);
  const authDoneRef = useRef(false); 

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  setLoading(false);   
  authDoneRef.current = true;
  }, []);


 useEffect(() => {
  if (isTokenValid()) {
    setAccessToken(localStorage.getItem("access_token"));
    setIsAuthenticated(true);
    setLoading(false);
    authDoneRef.current = true;
  } else if (!window.location.hash.includes("access_token")) {
    setLoading(true); 
  }
}, []);

  useEffect(() => {
    const urlToken = extractTokenFromUrl();
    if (urlToken) {
      setAccessToken(urlToken);
      setIsAuthenticated(true);
      setHasHubAccount(true);
      setLoading(false);
      authDoneRef.current = true;
      return;
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

  const handleMessage = useCallback(
    (event) => {
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
            setLoading(false);
            authDoneRef.current = true;
            break;
          case "LOCKED":
            setIsLocked(true);
            setIsAuthenticated(false);
            setHasHubAccount(!!payload.hasSession);
            setLoading(false);
            break;

          // ✅ No session at all — show login button, don't redirect
          // User can click loginWithHub() manually
          case "NO_SESSION":
            setIsUnlocking(false); // ✅ clear it
            setIsAuthenticated(false);
            setIsLocked(false);
            setHasHubAccount(false);
            setLoading(false);
            break;

          // ✅ Hub broadcast logout — clear everything silently
          case "LOGOUT":
            localStorage.removeItem("access_token");
            localStorage.removeItem("crypto_data");
            localStorage.removeItem("encryption-key");
            setIsAuthenticated(false);
            setAccessToken(null);
            setHasHubAccount(false);
            setIsLocked(false);
            setLoading(false);
            authDoneRef.current = false;
            break;

          // ✅ Hub logged in on another tab — silently pull fresh token
          case "RELOAD_TOKEN":
            if (iframeReadyRef.current) requestAuthFromBridge();
            break;

          default:
            break;
        }
      }

      // ✅ Token successfully refreshed via HttpOnly cookie
      if (type === "TOKEN_REFRESHED") {
        localStorage.setItem("access_token", payload.accessToken);
        setAccessToken(payload.accessToken);
        setIsAuthenticated(true);
      }

      // ✅ Refresh cookie also expired — full session gone
      if (type === "SESSION_EXPIRED") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("crypto_data");
        localStorage.removeItem("encryption-key");
        setIsAuthenticated(false);
        setAccessToken(null);
        setHasHubAccount(false);
        setIsLocked(false);
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

    const result = iframeRef.current?.contentWindow?.postMessage(
      { type: "UNLOCK_APP" },
      authUrl,
    );
  }

  function loginWithHub() {
    const callback = encodeURIComponent(window.location.origin);
    window.location.href = `${authUrl}/?openLogin=true&callback=${callback}`;
  }

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("crypto_data");
    localStorage.removeItem("encryption-key");
    setIsAuthenticated(false);
    setAccessToken(null);
    setHasHubAccount(false);
    authDoneRef.current = false;
    logoutUser();
    lockApp();
  };

  // ── Modal & folder helpers ─────────────────────────────
  const handleOpenDeleteModal = (id) => {
    setSelectedFolderId(id);
    setOpenDeleteModal((p) => !p);
  };
  const handleCreateFolderModal = () => setOpenCreateFolderModal((p) => !p);
  const handleOpenPasswordDeleteModal = () =>
    setOpenPasswordDeleteModal((p) => !p);
  const handleConfirmChangesModal = (formData) => {
    setOpenConfirmChangesModal((p) => !p);
    setData(formData);
  };
  const handleSaveConfirmationModalVisibility = () =>
    setShowSaveConfirmationModal((p) => !p);
  const handleGeneratePassVisibility = (source) => {
    setShowGeneratePassModal((p) => !p);
    setApplyPasswordButton(source);
  };
  const handleFolderSelection = (folder) => {
    setPassSelectedFolderId(folder.id);
    setFolderTitle(folder.title);
    localStorage.setItem("FolderId", folder.id);
  };
  const clearFolderSelection = () => {
    setPassSelectedFolderId("");
    localStorage.removeItem("FolderId");
  };
  const toggleSelection = (id) =>
    setSelectedPasswordsId((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  // ─────────────────────────────────────────────────────────
  return (
    <AuthContext.Provider
      value={{
        // ── Auth ──
        isAuthenticated,
        accessToken,
        isLocked,
        hasHubAccount,
        loading,
        logout,
        lockApp,
        unlockApp,
        refreshToken,
        loginWithHub,
        isUnlocking,

        // ── UI ──
        isDesktop,
        screenState,
        isAuthHubVisible,
        setIsAuthHubVisible,
        search,
        setSearch,
        folderTitle,
        passSelectedFolderId,
        setPassSelectedFolderId,
        clearFolderSelection,
        handleFolderSelection,
        selectedFolderId,
        data,

        // ── Modals ──
        openDeleteModal,
        setOpenDeleteModal,
        handleOpenDeleteModal,
        openCreateFolderModal,
        setOpenCreateFolderModal,
        handleCreateFolderModal,
        openPasswordDeleteModal,
        setOpenPasswordDeleteModal,
        handleOpenPasswordDeleteModal,
        openConfirmChangesModal,
        setOpenConfirmChangesModal,
        handleConfirmChangesModal,
        openLogoutModal,
        setOpenLogoutModal,
        showSaveConfirmationModal,
        handleSaveConfirmationModalVisibility,
        showGeneratePassModal,
        applyPasswordButton,
        handleGeneratePassVisibility,

        // ── Password generator ──
        generatorPassword,
        setGeneratorPassword,

        // ── Multi-select ──
        selectPasswordsId,
        setSelectedPasswordsId,
        toggleSelection,
      }}
    >
      {/*
        iframe always stays mounted even when authenticated
        — needed so BroadcastChannel logout/login sync works
        across all open subdomain tabs without any redirect
      */}
      <iframe
        ref={iframeRef}
        src={`${authUrl}/sso-bridge.html`}
        style={{ display: "none" }}
        title="sso-bridge"
        onLoad={handleIframeLoad}
      />
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
