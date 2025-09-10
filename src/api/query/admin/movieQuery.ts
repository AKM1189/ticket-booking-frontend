import {
  getAllMovies,
  getMovies,
  getShowingMovies,
} from "@/api/function/admin/movieApi";
import { useQuery } from "@tanstack/react-query";

export const useMovieQuery = (
  page: number,
  searchTerm?: string,
  status?: string | null,
) => {
  return useQuery({
    queryFn: () => getMovies(page, searchTerm, status),
    queryKey: ["movies"],
    retry: 5,
    staleTime: 0,
  });
};

export const useAllMoviesQuery = () => {
  return useQuery({
    queryFn: () => getAllMovies(),
    queryKey: ["allMovies"],
    retry: 5,
    staleTime: 0,
  });
};

export const useShowingMovieQuery = () => {
  return useQuery({
    queryFn: () => getShowingMovies(),
    queryKey: ["showingMovies"],
    retry: 5,
    staleTime: 0,
  });
};
