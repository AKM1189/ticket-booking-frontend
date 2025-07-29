import type { LoginDataType } from "../../pages/auth/Login";
import type { SignupDataType } from "../../pages/auth/Signup";
import { api } from "../api";
import { authApi } from "../AuthApi";
import { endpoints } from "../endpoints";

export const signup = async (data: SignupDataType) => {
  const response = await authApi.post(endpoints.auth.register, data);
  return response;
};

export const login = async (data: LoginDataType) => {
  const response = await authApi.post(endpoints.auth.login, data);
  return response?.data;
};

export const getCurrentUser = async () => {
  const response = await api.get(endpoints.user.me);
  return response?.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await authApi.post(endpoints.auth.forgotPassword, data);
  return response;
};

export const otp = async (data: { otp: string; token: string }) => {
  const response = await authApi.post(endpoints.auth.otp, data);
  return response;
};

export const resetPassword = async (data: {
  password: string;
  token: string;
}) => {
  const response = await authApi.post(endpoints.auth.resetPassword, data);
  return response;
};

export const logout = async () => {
  const response = await authApi.post(endpoints.auth.logout);
  return response;
};
