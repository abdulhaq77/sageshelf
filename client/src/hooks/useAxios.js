import { useEffect } from "react";
import apiClient from "../api/api.config";
import { useAuth } from "../context/AuthContext";

export const useAxios = () => {
  const { accessToken, setAccessToken, logout } = useAuth();

  useEffect(() => {
    // 1. Injected Request Interceptor
    const requestIntercept = apiClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 2. Injected Response Interceptor
    const responseIntercept = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          // Refresh logic here...
        }
        return Promise.reject(error);
      },
    );

    // Cleanup: Remove interceptors when the component unmounts
    return () => {
      apiClient.interceptors.request.eject(requestIntercept);
      apiClient.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, logout, setAccessToken]);

  return apiClient;
};
