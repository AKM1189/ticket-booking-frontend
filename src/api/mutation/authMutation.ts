import { useMutation } from "@tanstack/react-query";
import {
  resetPassword,
  forgotPassword,
  login,
  otp,
  signup,
} from "../function/authApi";
import type { SignupDataType } from "../../pages/auth/Signup";
import { AxiosError } from "axios";
import { showNotification } from "../../utils/showNotification";
import type { LoginDataType } from "../../pages/auth/Login";
import Cookies from "js-cookie";
import { StatusType } from "../../types/NotificationType";
import { useNavigate } from "react-router";
import { routes } from "../../routes";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: SignupDataType }) => signup(data),
    onSuccess: () => {
      showNotification({
        title: "Login Success",
        message: "You have signed up successfully!",
        type: StatusType.success,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        showNotification({
          title: "Sign up Failed",
          message: errorMessage,
          type: StatusType.error,
        });
      }
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: LoginDataType }) => login(data),
    onSuccess: (response) => {
      console.log("login info", response);
      showNotification({
        title: "Login Success",
        message: "You have logged in successfully!",
        type: StatusType.success,
      });
      var inFifteenMinutes = new Date(new Date().getTime() + 1 * 60 * 1000);
      Cookies.set("accessToken", response.accessToken, {
        expires: inFifteenMinutes,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        showNotification({
          title: "Login Failed",
          message: errorMessage,
          type: StatusType.error,
        });
      }
    },
  });
};

export const useForgotPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data }: { data: { email: string } }) => forgotPassword(data),
    onSuccess: (response) => {
      showNotification({
        title: "Verification Email",
        message: response?.data?.message,
        type: StatusType.success,
      });
      Cookies.set("resetToken", response?.data?.resetToken);
      navigate(routes.auth.otp);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Verification Failed";
        showNotification({
          title: "Verification Email",
          message: errorMessage,
          type: StatusType.error,
        });
      }
    },
  });
};

export const useVerifyOtpMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ data }: { data: { otp: string; token: string } }) =>
      otp(data),
    onSuccess: (response) => {
      showNotification({
        title: "OTP",
        message: response?.data?.message,
        type: StatusType.success,
      });
      navigate(routes.auth.resetPassword);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        showNotification({
          title: "OTP",
          message: errorMessage,
          type: StatusType.error,
        });
      }
    },
  });
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  const token = Cookies.get("resetToken") ?? "";
  return useMutation({
    mutationFn: ({ data }: { data: { password: string } }) =>
      resetPassword({ ...data, token }),
    onSuccess: (response) => {
      showNotification({
        title: "Reset Password Success",
        message: response?.data?.message ?? "Password updated successfully",
        type: StatusType.success,
      });
      navigate(routes.auth.login);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        showNotification({
          title: "Reset Password Failed",
          message: errorMessage ?? "Password updating failed",
          type: StatusType.error,
        });
      }
    },
  });
};
