import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Maintained outside the interceptor to coordinate concurrent requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

// response interceptor to handle 401 errors and trigger token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // TARGETED FOCUS: Capture ONLY 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Queue up any additional requests firing while the refresh is mid-flight
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log(
          "🔄 401(Unauthorized) Captured. Initiating token refresh handshake...",
        );

        // Standard axios instance used to bypass this specific interceptor instance
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          withCredentials: true,
        });

        console.log(
          "✅ Session refreshed successfully. Retrying original request.",
        );
        isRefreshing = false;
        processQueue(null);

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ Handshake failed inside 401 catcher.");
        isRefreshing = false;
        processQueue(refreshError);

        return Promise.reject(refreshError);
      }
    }

    // ALL OTHER ERRORS PASS THROUGH: 403, 404, etc. go straight back to your loader/components
    return Promise.reject(error);
  },
);

export default apiClient;
