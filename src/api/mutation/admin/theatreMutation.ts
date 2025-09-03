import {
  addTheatre,
  deleteTheatre,
  updateTheatre,
} from "@/api/function/admin/theatreApi";
import type { TheatreInputType } from "@/types/TheatreTypes";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTheatreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: TheatreInputType }) => addTheatre(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Theatre", data, "Theatre successfully added");
      queryClient.invalidateQueries({ queryKey: ["theatres"] });
    },
    onError: (error) => {
      getErrorNoti("Add Theatre", error, "Theatre adding failed");
    },
  });
};

export const useUpdateTheatreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: TheatreInputType; id: number }) =>
      updateTheatre(data, id),
    onSuccess: (data) => {
      getSuccessNoti("Update Theatre", data, "Theatre successfully updated");
      queryClient.invalidateQueries({ queryKey: ["theatres"] });
    },
    onError: (error) => {
      getErrorNoti("Update Theatre", error, "Theatre updating failed");
    },
  });
};

export const useDeleteTheatreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTheatre(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete Theatre", data, "Theatre successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["theatres"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Theatre", error, "Theatre deleting failed");
    },
  });
};
