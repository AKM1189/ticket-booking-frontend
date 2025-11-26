import {
  getMovieDetail,
  getMovieFilterList,
  getMovies,
} from "@/api/function/user/movieApi";
import { MovieStatus } from "@/constants/movieConstants";
import type { FilterListType } from "@/types/MovieTypes";
import { useQuery } from "@tanstack/react-query";

export const useMovieQuery = (
  type: MovieStatus,
  page?: number,
  limit?: number,
  filterList?: FilterListType,
) => {
  return useQuery({
    queryFn: () => getMovies(type, page, limit, filterList),
    queryKey: ["userAllMovies", type],
    retry: 3,
    staleTime: 0,
  });
};

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
    queryKey: ["userMovieDetail", movieId],
    retry: 3,
    staleTime: 0,
  });
};

export const useMovieFilterListQuery = () => {
  return useQuery({
    queryFn: () => getMovieFilterList(),
    queryKey: ["filterList"],
    retry: 3,
    staleTime: 0,
  });
};
