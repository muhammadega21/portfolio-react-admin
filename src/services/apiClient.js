import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

if (!api_url) {
  throw new Error("VITE_API_URL is not defined in environment variables");
}

const apiClient = axios.create({
  baseURL: api_url,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // if (config.data instanceof FormData) {
    //   delete config.headers["Content-Type"];
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // Gunakan window.location untuk refresh state
    }
    return Promise.reject(error);
  }
);

export default apiClient;
