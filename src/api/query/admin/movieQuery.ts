import { getMovies } from "@/api/function/admin/movieApi";
import { useQuery } from "@tanstack/react-query";

export const useMovieQuery = (searchTerm: string, status: string | null) => {
  return useQuery({
    queryFn: () => getMovies(searchTerm, status),
    queryKey: ["movies"],
    retry: 5,
    staleTime: 0,
  });
};
