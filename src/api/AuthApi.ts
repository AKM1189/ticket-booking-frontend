import axios from "axios";
import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { endpoints } from "./endpoints";
import { routes } from "@/routes";
import { goTo } from "@/services/navigateService";

export const authApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = Cookies.get("accessToken");
//     console.log("accessToken", accessToken);
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log("error", error.response.status);
//     if (error?.response?.status === 401 && !originalRequest._retry) {
//       try {
//         originalRequest._retry = true;
//         const res = await api.get(endpoints.auth.refresh);
//         if (res?.data) {
//           console.log("res data", res?.data);
//           const newAccessToken = res.data.accessToken;
//           const inFifteenMinutes = new Date(
//             new Date().getTime() + 15 * 60 * 1000,
//           );
//           Cookies.set("accessToken", newAccessToken, {
//             expires: inFifteenMinutes,
//           });
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//           return api(originalRequest);
//         }
//       } catch (error) {
//         Cookies.remove("accessToken");
//         Cookies.remove("refreshToken");
//         goTo(routes.auth.login);
//         return Promise.reject(error);
//       }
//     }
//     Cookies.remove("accessToken");
//     Cookies.remove("refreshToken");
//     goTo(routes.auth.login);
//     return Promise.reject(error);
//   },
// );
