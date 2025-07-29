import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { GenreType } from "@/types/GenreTypes";

export const getGenre = async () => {
  const response = await api.get(endpoints.admin.genres);
  return response.data;
};

export const addGenre = async (data: GenreType) => {
  const response = await api.post(endpoints.admin.genres, data);
  return response.data;
};
