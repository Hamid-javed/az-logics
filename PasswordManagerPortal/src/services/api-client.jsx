import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const authUrl = import.meta.env.VITE_AUTH_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

const requestTokenRefresh = () => {
  return new Promise((resolve, reject) => {
    const iframe = document.getElementById("auth-bridge-iframe");
    if (!iframe) return reject("SSO Bridge not found");

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
    iframe.contentWindow.postMessage(
      { type: "REFRESH_TOKEN_REQUEST" },
      authUrl,
    );
  });
};

// apiClient.js
function getTokenIncludedConfig() {
  const token = localStorage.getItem("access_token");

  return {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

// 2. The Interceptor (Make sure this is attached to axiosInstance)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("401 detected. Attempting refresh via Bridge...");
      originalRequest._retry = true;

      try {
        const newToken = await requestTokenRefresh();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed, logging out.");
        localStorage.clear();
        window.location.href = `${authUrl}/?openLogin=true&callback=${encodeURIComponent(window.location.origin)}`;
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

function getMultipartDataConfig() {
  let getTokenForMultipartData = getTokenIncludedConfig();
  getTokenForMultipartData.headers["Content-Type"] = "multipart/form-data";
  return getTokenForMultipartData;
}

class APIClient {
  endpoint;
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  post = (data = {}) => {
    return axiosInstance
      .post(this.endpoint, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  postConfig = (data = {}, config = getTokenIncludedConfig()) => {
    return axiosInstance
      .post(this.endpoint, data, config)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };
  get = (config = getTokenIncludedConfig()) => {
    return axiosInstance
      .get(this.endpoint, config)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  patch = (data, body, config = getTokenIncludedConfig()) => {
    return axiosInstance
      .patch(`${this.endpoint}/${data?.id}/`, body, config)
      .then((res) => ({
        data: res.data,
        status: res.status,
      }))
      .catch((error) => {
        throw error;
      });
  };

  delete = (id) => {
    return axiosInstance
      .delete(`${this.endpoint}/${id}`, getTokenIncludedConfig())
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  deletePasswords = (pass_id) => {
    return this.postConfig(pass_id);
  };

  createToken = (payload) => {
    return this.post(payload);
  };

  registerSeeds = (payload) => {
    return this.post(payload);
  };

  createFolder = (name) => {
    return this.postConfig(name);
  };

  create = (data) => {
    return axiosInstance
      .post(this.endpoint, data, getMultipartDataConfig())
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  verifyToken = (token, login) => {
    return this.postConfig({ token }).then(() => login());
  };

  getUserPasswords = (id, search) => {
    let url = `${this.endpoint}?folder=${id}`;
    if (search) {
      url += `&search=${search}`;
    }
    return axiosInstance
      .get(url, getTokenIncludedConfig())
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  getFolders = (search) => {
    let url = `${this.endpoint}`;
    if (search) {
      url += `?search=${search}`;
    }
    return axiosInstance
      .get(url, getTokenIncludedConfig())
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };

  getFile = (endpoint) => {
    const config = {
      ...getTokenIncludedConfig(),
      responseType: "blob",
    };
    return axiosInstance
      .get(endpoint, config)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        const contentDisposition = response.headers["content-disposition"];
        let suggestedFilename = "downloaded_file";
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (filenameMatch && filenameMatch[1]) {
            suggestedFilename = decodeURIComponent(
              filenameMatch[1].replace(/['"]/g, ""),
            );
          }
        }
        a.download = suggestedFilename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
        throw error;
      });
  };

  updatePassword = (data) => {
    let idValue = null;
    for (const [key, value] of data.entries()) {
      if (key === "id") {
        idValue = value;
        break;
      }
    }
    return axiosInstance
      .patch(`${this.endpoint}/${idValue}/`, data, getMultipartDataConfig())
      .then((res) => ({
        data: res.data,
        status: res.status,
      }))
      .catch((error) => {
        throw error;
      });
  };
}

export default APIClient;
