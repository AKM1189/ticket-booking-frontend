import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { ScreenInputType } from "@/types/ScreenTypes";

export const getScreen = async (
  searchTerm?: string,
  statusFilter?: string | null,
  page: number = 1,
  theatreId?: number | null,
) => {
  let parameters = "";
  if (theatreId) parameters += "theatreId=" + theatreId;
  if (searchTerm) parameters += "&search=" + searchTerm;
  if (statusFilter) parameters += "&status=" + statusFilter.toLowerCase();
  const response = await api.get(
    `${endpoints.admin.screens}?page=${page}${parameters || ""}`,
  );
  return response.data;
};

export const getScreenByTheatre = async (theatreId: number = 1) => {
  const response = await api.get(
    `${endpoints.admin.screens}/all?theatreId=${theatreId}`,
  );
  return response.data;
};

export const getScreensByShow = async (theatreId: string, movieId: string) => {
  const response = await api.get(
    `${endpoints.admin.screensByShow}?theatreId=${theatreId}&movieId=${movieId}`,
  );
  return response.data;
};

export const addScreen = async (data: ScreenInputType) => {
  const response = await api.post(endpoints.admin.screens, data);
  return response.data;
};

export const updateScreen = async (data: ScreenInputType, id: number) => {
  const response = await api.put(`${endpoints.admin.screens}/${id}`, data);
  return response.data;
};

export const deleteScreen = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.screens}/${id}`);
  return response.data;
};
