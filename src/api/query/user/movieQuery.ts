import {
  getMovieDetail,
  getMovies,
  searchMovie,
} from "@/api/function/user/movieApi";
import { MovieStatus } from "@/constants/movieConstants";
import { useQuery } from "@tanstack/react-query";

export const useShowingMovieQuery = () => {
  return useQuery({
    queryFn: () => getMovies(MovieStatus.showing),
    queryKey: ["userMovies", MovieStatus.showing],
    retry: 3,
    staleTime: 0,
  });
};
export const useAvailableMovieQuery = () => {
  return useQuery({
    queryFn: () => getMovies(MovieStatus.available),
    queryKey: ["userMovies", MovieStatus.available],
    retry: 3,
    staleTime: 0,
  });
};
export const useComingMovieQuery = () => {
  return useQuery({
    queryFn: () => getMovies(MovieStatus.coming),
    queryKey: ["userMovies", MovieStatus.coming],
    retry: 3,
    staleTime: 0,
  });
};

export const useMovieDetailQuery = (movieId: string) => {
  return useQuery({
    queryFn: () => getMovieDetail(movieId),
    queryKey: ["userMovieDetail"],
    retry: 3,
    staleTime: 0,
  });
};
