import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  resetPassword,
  forgotPassword,
  login,
  otp,
  signup,
  logout,
} from "../function/authApi";
import type { SignupDataType } from "../../pages/auth/Signup";
import type { LoginDataType } from "../../pages/auth/Login";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { routes } from "../../routes";
import { useAuthStore } from "@/store/authStore";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { Role } from "@/types/AuthType";

export const useSignupMutation = (resetFields: () => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data }: { data: SignupDataType }) => signup(data),
    onSuccess: (data) => {
      getSuccessNoti(
        "Sign up Success",
        data,
        "You have signed up successfully!",
      );
      resetFields();
      navigate(routes.auth.login);
    },
    onError: (error) => {
      getErrorNoti("Sign up Failed", error, "Signing up Failed");
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data }: { data: LoginDataType }) => login(data),
    onSuccess: async (data) => {
      // getSuccessNoti("Login Success", data, "You have logged in successfully!");
      Cookies.set("accessToken", data?.accessToken, {
        expires: 3 * 24 * 60 * 60,
      });
      data?.role === Role.admin || data?.role === Role.staff
        ? navigate(routes.admin.dashboard)
        : navigate(routes.user.home);
    },
    onError: (error) => {
      getErrorNoti("Login Failed", error, "Login Failed");
    },
  });
};

export const useForgotPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data }: { data: { email: string } }) => forgotPassword(data),
    onSuccess: (data) => {
      getSuccessNoti("Reset Code Sent", data, "Reset code sent to your email");

      Cookies.set("resetToken", data?.resetToken);
      navigate(routes.auth.otp);
    },
    onError: (error) => {
      getErrorNoti("Forgot Password", error, "User not found");
    },
  });
};

export const useVerifyOtpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data }: { data: { otp: string; token: string } }) =>
      otp(data),
    onSuccess: (data) => {
      getSuccessNoti(
        "Verification Success",
        data,
        "You have verified successfully",
      );
      navigate(routes.auth.resetPassword);
    },
    onError: (error) => {
      getErrorNoti("Verification Failed", error, "We can't verify you");
    },
  });
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  const token = Cookies.get("resetToken") ?? "";
  return useMutation({
    mutationFn: ({ data }: { data: { password: string } }) =>
      resetPassword({ ...data, token }),
    onSuccess: (data) => {
      getSuccessNoti(
        "Reset Password Success",
        data,
        "Password reseted successfully",
      );
      Cookies.remove("resetToken");
      navigate(routes.auth.login);
    },
    onError: (error) => {
      getErrorNoti("Reset Password Failed", error, "Password cannot be reset");
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { logout: removeUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      removeUser();
      Cookies.remove("accessToken");
      // getSuccessNoti("Logout", data, "You have logout successfully");
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      queryClient.clear();
      navigate(routes.auth.login);
      window.location.href = routes.auth.login;
      // queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      getErrorNoti("Logout Failed", error, "Logout failed");
    },
  });
};
