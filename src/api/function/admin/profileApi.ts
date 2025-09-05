import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type {
  PasswordInputType,
  ProfileInputType,
} from "@/components/admin/profile/Profile";

export const updateProfile = async (userId: number, data: ProfileInputType) => {
  const response = await api.put(
    endpoints.admin.profile + "/update/" + userId,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const changePassword = async (
  userId: number,
  data: PasswordInputType,
) => {
  const response = await api.put(
    endpoints.admin.profile + "/change-password/" + userId,
    data,
  );
  return response.data;
};
