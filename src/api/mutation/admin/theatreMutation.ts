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
      getSuccessNoti("Add Branch", data, "Branch successfully added");
      queryClient.invalidateQueries({ queryKey: ["theatres"] });
    },
    onError: (error) => {
      getErrorNoti("Add Branch", error, "Branch adding failed");
    },
  });
};

export const useUpdateTheatreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: TheatreInputType; id: number }) =>
      updateTheatre(data, id),
    onSuccess: (data) => {
      getSuccessNoti("Update Branch", data, "Branch successfully updated");
      queryClient.invalidateQueries({ queryKey: ["theatres"] });
    },
    onError: (error) => {
      getErrorNoti("Update Branch", error, "Branch updating failed");
    },
  });
};

export const useDeleteTheatreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTheatre(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete Branch", data, "Branch successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["theatres"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Branch", error, "Branch deleting failed");
    },
  });
};
