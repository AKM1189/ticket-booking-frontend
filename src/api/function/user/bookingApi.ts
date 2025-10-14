import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";

export const getUserBookings = async (userId: number) => {
  const response = await api.get(`/admin${endpoints.user.bookings}/${userId}`);
  return response.data;
};

export const downloadTicket = async (bookingId: number) => {
  const response = await api.get(`/admin${endpoints.user.bookings}/${bookingId}/ticket`, {
    responseType: 'blob'
  });
  return response.data;
};