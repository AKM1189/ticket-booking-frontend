import { getBookingById, getBookings } from "@/api/function/admin/bookingApi";
import { useQuery } from "@tanstack/react-query";

export const useBookingQuery = () => {
  return useQuery({
    queryFn: getBookings,
    queryKey: ["bookings"],
    retry: 5,
  });
};

export const useBookingByIdQuery = (id: number) => {
  return useQuery({
    queryFn: () => getBookingById(id),
    queryKey: ["bookings", id],
    retry: 5,
  });
};
