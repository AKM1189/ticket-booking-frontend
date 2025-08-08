import {
  addMovie,
  deleteMovie,
  updateMovie,
} from "@/api/function/admin/movieApi";
import type { MovieInputType } from "@/types/MovieTypes";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: MovieInputType }) => addMovie(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Movie", data, "Movie successfully added");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (error) => {
      getErrorNoti("Add Movie", error, "Movie adding failed");
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: MovieInputType; id: number }) =>
      updateMovie(data, id),
    onSuccess: (data) => {
      getSuccessNoti("Update Movie", data, "Movie successfully updated");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (error) => {
      getErrorNoti("Update Movie", error, "Movie updating failed");
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number | undefined }) => deleteMovie(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete Movie", data, "Movie successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Movie", error, "Movie deleting failed");
    },
  });
};
