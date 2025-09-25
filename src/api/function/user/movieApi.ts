import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { MovieStatus } from "@/constants/movieConstants";

export const getMovies = async (type: MovieStatus | "") => {
  let parameters = "";
  if (type) {
    parameters += "?type=" + type;
  }
  const response = await api.get(`${endpoints.user.movies}${parameters}`);
  return response.data;
};

export const getSearchFilters = async (
  theatreId?: string,
  date?: string,
  movieId?: string,
) => {
  const response = await api.get(`${endpoints.user.movies}/search/filters`, {
    params: {
      theatreId,
      date,
      movieId,
    },
  });
  return response.data;
};

export const searchMovie = async (
  theatreId: string,
  date: string,
  movieId: string,
) => {
  const response = await api.get(`${endpoints.user.movies}`, {
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
