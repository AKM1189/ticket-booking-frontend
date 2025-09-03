import { addBooking, cancelBooking } from "@/api/function/admin/bookingApi";
import type { BookingInputType } from "@/types/BookingType";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: BookingInputType }) => addBooking(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Booking", data, "Booking successfully added");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      getErrorNoti("Add Booking", error, "Booking adding failed");
    },
  });
};

export const useCancelBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => cancelBooking(id),
    onSuccess: (data) => {
      getSuccessNoti("Cancel Booking", data, "Booking successfully cancelled");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      getErrorNoti("Cancel Booking", error, "Booking cancelling failed");
    },
  });
};
