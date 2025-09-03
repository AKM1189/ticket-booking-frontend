import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { BookingInputType } from "@/types/BookingType";

export const getBookings = async () => {
  const response = await api.get(endpoints.admin.booking);
  return response.data;
};

export const getBookingById = async (id: number) => {
  const response = await api.get(endpoints.admin.booking + "/" + id);
  return response.data;
};

export const addBooking = async (data: BookingInputType) => {
  const response = await api.post(endpoints.admin.booking, data);
  return response.data;
};

export const cancelBooking = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.booking}/${id}`);
  return response.data;
};
