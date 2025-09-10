import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { TheatreInputType } from "@/types/TheatreTypes";

export const getTheatres = async (
  searchTerm?: string,
  status?: string | null,
) => {
  let parameters = "";
  if (searchTerm) parameters += "search=" + searchTerm + "&";
  if (status) parameters += "status=" + status.toLowerCase();
  const response = await api.get(
    `${endpoints.admin.theatres}?${parameters || ""}`,
  );
  return response.data;
};

export const getAllTheatres = async () => {
  const response = await api.get(`${endpoints.admin.theatres}/all`);
  return response.data;
};

export const getTheatresByShow = async (movieId: string) => {
  const response = await api.get(
    `${endpoints.admin.theatresByShow}?movieId=${movieId}`,
  );
  return response.data;
};

export const addTheatre = async (data: TheatreInputType) => {
  const response = await api.post(endpoints.admin.theatres, data);
  return response.data;
};

export const updateTheatre = async (data: TheatreInputType, id: number) => {
  const response = await api.put(`${endpoints.admin.theatres}/${id}`, data);
  return response.data;
};

export const deleteTheatre = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.theatres}/${id}`);
  return response.data;
};
