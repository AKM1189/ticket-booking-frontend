import {
  addUser,
  deactivateUser,
  updateUser,
} from "@/api/function/admin/userApi";
import { Role } from "@/types/AuthType";
import type { UserInputType } from "@/types/UserType";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: UserInputType }) => addUser(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Admin", data, "Admin successfully added");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      getErrorNoti("Add User", error, "User adding failed");
    },
  });
};

export const useUpdateUserMutation = (role: Role | undefined) => {
  const queryClient = useQueryClient();
  const userType = role === Role.admin ? "Admin" : "User";

  return useMutation({
    mutationFn: ({ data, id }: { data: UserInputType; id: number }) =>
      updateUser(data, id),
    onSuccess: (data) => {
      getSuccessNoti(
        "Update " + userType,
        data,
        userType + " successfully updated",
      );
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      getErrorNoti("Update " + userType, error, userType + " updating failed");
    },
  });
};

export const useDeactivateUserMutation = (role: Role | undefined) => {
  const queryClient = useQueryClient();
  const userType = role === Role.admin ? "Admin" : "User";

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deactivateUser(id),
    onSuccess: (data) => {
      getSuccessNoti(
        "Delete " + userType,
        data,
        userType + " successfully deleted",
      );
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      getErrorNoti("Delete " + userType, error, userType + " deleting failed");
    },
  });
};
