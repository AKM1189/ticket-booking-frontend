import axios from "axios";
import type { AxiosInstance } from "axios";

const baseURL = `${import.meta.env.VITE_BASE_URL}/api`;

export const authApi: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
