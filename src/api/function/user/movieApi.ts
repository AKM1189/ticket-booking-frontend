import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { MovieStatus } from "@/constants/movieConstants";
import type { FilterListType } from "@/types/MovieTypes";

export const getMovies = async (
  type: MovieStatus | "",
  page: number = 1,
  limit: number = 10,
  filterList: FilterListType | null = null,
) => {
  const query = new URLSearchParams();
  filterList?.lang.forEach((l) => query.append("lang", l));
  filterList?.exp.forEach((l) => query.append("exp", l));
  filterList?.genre.forEach((l) => query.append("genre", l));

  const response = await api.get(
    `${endpoints.user.movies}?${query.toString()}`,
    {
      params: {
        type,
        page,
        limit,
      },
    },
  );
  return response.data;
};

export const getMovieFilterList = async () => {
  const response = await api.get(`${endpoints.user.movieFilter}`);
  return response.data;
};

export const getSearchFilters = async () => {
  const response = await api.get(`${endpoints.user.movies}/search/filters`);
  return response.data;
};

export const searchMovie = async (
  theatreId: string,
  date: string,
  movieId: string,
) => {
  const response = await api.get(`${endpoints.user.movies}/search/movie-list`, {
    params: {
      theatreId,
      date,
      movieId,
    },
  });
  return response.data;
};

export const getMovieDetail = async (id: string) => {
  const response = await api.get(`${endpoints.user.movies}/${id}`);
  return response.data;
};
