import { addUser, deleteUser } from "@/api/function/admin/userApi";
import type { UserType } from "@/types/UserType";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: UserType }) => addUser(data),
    onSuccess: (data) => {
      getSuccessNoti("Add User", data, "User successfully added");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      getErrorNoti("Add User", error, "User adding failed");
    },
  });
};

// export const useUpdateCastMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ data, id }: { data: CastInputType; id: number }) =>
//       updateCast(data, id),
//     onSuccess: (data) => {
//       getSuccessNoti("Update Cast", data, "Cast successfully updated");
//       queryClient.invalidateQueries({ queryKey: ["casts"] });
//     },
//     onError: (error) => {
//       getErrorNoti("Update Cast", error, "Cast updating failed");
//     },
//   });
// };

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteUser(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete User", data, "User successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      getErrorNoti("Delete User", error, "User deleting failed");
    },
  });
};
