import {
  addGenre,
  deleteGenre,
  updateGenre,
} from "@/api/function/admin/genreApi";
import type { GenreType } from "@/types/GenreTypes";
import { StatusType } from "@/types/NotificationType";
import { showNotification } from "@/utils/showNotification";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAddGenreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: Omit<GenreType, "id" | "movieCount"> }) =>
      addGenre(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Genre", data, "Genre successfully added");
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
    onError: (error) => {
      getErrorNoti("Add Genre", error, "Genre adding failed");
    },
  });
};

export const useUpdateGenreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Omit<GenreType, "id" | "movieCount">;
      id: number;
    }) => updateGenre(data, id),
    onSuccess: (data) => {
      getSuccessNoti("Update Genre", data, "Genre successfully updated");
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
    onError: (error) => {
      getErrorNoti("Update Genre", error, "Genre updating failed");
    },
  });
};

export const useDeleteGenreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteGenre(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete Genre", data, "Genre successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["genres"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Genre", error, "Genre deleting failed");
    },
  });
};
