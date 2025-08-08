import { addCast, deleteCast, updateCast } from "@/api/function/admin/castApi";
import type { CastInputType } from "@/types/CastTypes";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCastMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: CastInputType }) => addCast(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Cast", data, "Cast successfully added");
      queryClient.invalidateQueries({ queryKey: ["casts"] });
    },
    onError: (error) => {
      getErrorNoti("Add Cast", error, "Cast adding failed");
    },
  });
};

export const useUpdateCastMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: CastInputType; id: number }) =>
      updateCast(data, id),
    onSuccess: (data) => {
      getSuccessNoti("Update Cast", data, "Cast successfully updated");
      queryClient.invalidateQueries({ queryKey: ["casts"] });
    },
    onError: (error) => {
      getErrorNoti("Update Cast", error, "Cast updating failed");
    },
  });
};

export const useDeleteCastMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteCast(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete Cast", data, "Cast successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["casts"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Cast", error, "Cast deleting failed");
    },
  });
};
