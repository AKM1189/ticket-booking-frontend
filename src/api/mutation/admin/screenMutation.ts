import {
  addScreen,
  deleteScreen,
  updateScreen,
} from "@/api/function/admin/screenApi";
import type { ScreenInputType } from "@/types/ScreenTypes";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddScreenMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ScreenInputType }) => addScreen(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Screen", data, "Screen successfully added");
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
    onError: (error) => {
      getErrorNoti("Add Screen", error, "Screen adding failed");
    },
  });
};

export const useUpdateScreenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: ScreenInputType; id: number }) =>
      updateScreen(data, id),
    onSuccess: (data) => {
      getSuccessNoti("Update Screen", data, "Screen successfully updated");
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
    onError: (error) => {
      getErrorNoti("Update Screen", error, "Screen updating failed");
    },
  });
};

export const useDeleteScreenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteScreen(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete Screen", data, "Screen successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["screens"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Screen", error, "Screen deleting failed");
    },
  });
};
