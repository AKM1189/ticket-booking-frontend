import axios from "axios";
import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { endpoints } from "./endpoints";
import { authApi } from "./AuthApi";
import { routes } from "@/routes";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api`;

export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 408 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const res = await authApi.get(endpoints.auth.refresh);
        if (res?.data) {
          const newAccessToken = res.data.accessToken;
          Cookies.set("accessToken", newAccessToken, {
            expires: 3,
          });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        }
      } catch (error) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = routes.auth.login;
        return Promise.reject(error);
      }
    } else {
      // Cookies.remove("accessToken");
      // Cookies.remove("refreshToken");
      return Promise.reject(error);
    }
  },
);
