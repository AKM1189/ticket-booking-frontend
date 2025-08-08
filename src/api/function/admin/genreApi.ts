import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { GenreType } from "@/types/GenreTypes";

export const getGenre = async () => {
  const response = await api.get(endpoints.admin.genres);
  return response.data;
};

export const addGenre = async (data: Omit<GenreType, "id" | "movieCount">) => {
  const response = await api.post(endpoints.admin.genres, data);
  return response.data;
};

export const updateGenre = async (
  data: Omit<GenreType, "id" | "movieCount">,
  id: number,
) => {
  const response = await api.put(`${endpoints.admin.genres}/${id}`, data);
  return response.data;
};

export const deleteGenre = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.genres}/${id}`);
  return response.data;
};
