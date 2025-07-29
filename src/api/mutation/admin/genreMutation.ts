import { addGenre } from "@/api/function/admin/genreApi";
import type { GenreType } from "@/types/GenreTypes";
import { useMutation } from "@tanstack/react-query";

export const useAddGenreMutation = () => {
  return useMutation({
    mutationFn: ({ data }: { data: GenreType }) => addGenre(data),
    onSuccess: () => window.prompt("Genre successfully added"),
    onError: () => window.prompt("Genre adding failed"),
  });
};
