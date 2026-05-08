import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_API_URL as string;
const authUrl = import.meta.env.VITE_AUTH_URL as string;

const apiClient = axios.create({
  baseURL: baseUrl,
});

// ── Token config ──
export function getTokenIncludedConfig(): AxiosRequestConfig {
  return {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  };
}

export function generateRandomKey() {
    const length = Math.floor(Math.random() * 4) + 15; // Random length between 15-18
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*';
    let key = '';
    const randomValues = crypto.getRandomValues(new Uint8Array(length));
    for (let i = 0; i < length; i++) {
        key += charset[randomValues[i] % charset.length];
    }
    return key;
}

// ── Request token refresh via SSO bridge iframe ──
const requestTokenRefresh = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const iframe = document.getElementById("auth-bridge-iframe") as HTMLIFrameElement | null;
    if (!iframe || !iframe.contentWindow) return reject("SSO Bridge not found");

    const handleRefreshResponse = (event: MessageEvent) => {
      if (event.origin !== authUrl) return;

      if (event.data.type === "TOKEN_REFRESHED") {
        window.removeEventListener("message", handleRefreshResponse);
        const newToken = event.data.payload.accessToken as string;
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

// ── Interceptor: on 401 → refresh token → retry request ──
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await requestTokenRefresh();
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch {
        // Refresh failed — send user back to hub login
        localStorage.clear();
        window.location.href = `${authUrl}/?openLogin=true&callback=${encodeURIComponent(window.location.origin)}`;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;