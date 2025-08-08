import { getMovies } from "@/api/function/admin/movieApi";
import { useQuery } from "@tanstack/react-query";

export const useMovieQuery = () => {
  return useQuery({
    queryFn: getMovies,
    queryKey: ["movies"],
    retry: 5,
    staleTime: 0,
  });
};
