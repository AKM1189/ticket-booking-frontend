import { getUserBookings } from "@/api/function/user/bookingApi";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBookingsQuery = (userId: number) => {
  return useQuery({
    queryKey: ["userBookings", userId],
    queryFn: () => getUserBookings(userId),
    enabled: !!userId,
    retry: 3
  });
};