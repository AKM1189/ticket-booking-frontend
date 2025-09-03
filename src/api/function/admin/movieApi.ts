import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { MovieInputType } from "@/types/MovieTypes";

export const getMovies = async (
  searchTerm?: string,
  status?: string | null,
) => {
  let parameters = "";
  if (searchTerm) parameters += "search=" + searchTerm;
  if (status) parameters += "status=" + status;
  const response = await api.get(
    `${endpoints.admin.movies}${parameters ? "?" + parameters : ""}`,
  );
  return response.data;
};

export const getShowingMovies = async () => {
  const response = await api.get(endpoints.admin.showingMovies);
  return response.data;
};

export const addMovie = async (data: MovieInputType) => {
  const response = await api.post(endpoints.admin.movies, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateMovie = async (data: MovieInputType, id: number) => {
  const response = await api.put(`${endpoints.admin.movies}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteMovie = async (id: number | undefined) => {
  const response = await api.delete(`${endpoints.admin.movies}/${id}`);
  return response.data;
};
