import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { SeatTypeTypes } from "@/types/SeatTypeTypes";

export const getSeatTypes = async () => {
  const response = await api.get(endpoints.admin.seatTypes);
  return response.data;
};

export const addSeatTypes = async (data: Omit<SeatTypeTypes, "id">) => {
  const response = await api.post(endpoints.admin.seatTypes, data);
  return response.data;
};

export const updateSeatTypes = async (
  data: Omit<SeatTypeTypes, "id">,
  id: number,
) => {
  const response = await api.put(`${endpoints.admin.seatTypes}/${id}`, data);
  return response.data;
};

export const deleteSeatTypes = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.seatTypes}/${id}`);
  return response.data;
};
