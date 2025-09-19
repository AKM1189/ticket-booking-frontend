import { getAllGenre, getGenre } from "@/api/function/admin/genreApi";
import { useQuery } from "@tanstack/react-query";

export const useGenreQuery = (page: number, searchTerm: string) => {
  return useQuery({
    queryFn: () => getGenre(page, searchTerm),
    queryKey: ["genres"],
    retry: 5,
  });
};

export const useAllGenreQuery = () => {
  return useQuery({
    queryFn: () => getAllGenre(),
    queryKey: ["allGenres"],
    retry: 5,
  });
};
