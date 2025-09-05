import { changePassword, updateProfile } from "@/api/function/admin/profileApi";
import type {
  PasswordInputType,
  ProfileInputType,
} from "@/components/admin/profile/Profile";
import { routes } from "@/routes";
import { useAuthStore } from "@/store/authStore";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: ProfileInputType;
    }) => updateProfile(userId, data),
    onSuccess: (data) => {
      getSuccessNoti("Update Profile", data, "Profile successfully updated");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      getErrorNoti("Update Profile", error, "User updating failed");
    },
  });
};

export const useChangePasswordMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout: removeUser } = useAuthStore();
  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: PasswordInputType;
    }) => changePassword(userId, data),
    onSuccess: (data) => {
      getSuccessNoti("Change Password", data, "Password successfully changed");
      removeUser();
      Cookies.remove("accessToken");
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      queryClient.clear();
      navigate(routes.auth.login);
    },
    onError: (error) => {
      getErrorNoti("Change Password", error, "Password changing failed");
    },
  });
};
