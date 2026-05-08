import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const authUrl = import.meta.env.VITE_AUTH_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
});

export function getTokenIncludedConfig() {
  return {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  };
}

export function getMultiPartConfig() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "multipart/form-data",
    },
  };
}

// ── Request refresh via SSO bridge iframe ──
const requestTokenRefresh = () => {
  return new Promise((resolve, reject) => {
    const iframe = document.getElementById("auth-bridge-iframe");
    if (!iframe || !iframe.contentWindow) return reject("SSO Bridge not found");

    const handleRefreshResponse = (event) => {
      if (event.origin !== authUrl) return;

      if (event.data.type === "TOKEN_REFRESHED") {
        window.removeEventListener("message", handleRefreshResponse);
        const newToken = event.data.payload.accessToken;
        localStorage.setItem("access_token", newToken);
        resolve(newToken);
      } else if (event.data.type === "SESSION_EXPIRED") {
        window.removeEventListener("message", handleRefreshResponse);
        reject("Session expired");
      }
    };

    window.addEventListener("message", handleRefreshResponse);
    iframe.contentWindow.postMessage({ type: "REFRESH_TOKEN_REQUEST" }, authUrl);
  });
};

let isLoggingOut = false;

export const setLoggingOut = (value) => {
  isLoggingOut = value;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ── FIX: don't refresh if user is logging out ──
    if (isLoggingOut) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await requestTokenRefresh();
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = `${authUrl}/?openLogin=true&callback=${encodeURIComponent(window.location.origin)}`;
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;