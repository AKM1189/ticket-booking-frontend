import {
  addSeatTypes,
  deleteSeatTypes,
  updateSeatTypes,
} from "@/api/function/admin/seatTypeApi";
import type { SeatTypeTypes } from "@/types/SeatTypeTypes";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSeatTypeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: Omit<SeatTypeTypes, "id"> }) =>
      addSeatTypes(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Seat Type", data, "Seat Type successfully added");
      queryClient.invalidateQueries({ queryKey: ["seatTypes"] });
    },
    onError: (error) => {
      getErrorNoti("Add Seat Type", error, "Seat Type adding failed");
    },
  });
};

export const useUpdateSeatTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Omit<SeatTypeTypes, "id">;
      id: number;
    }) => updateSeatTypes(data, id),
    onSuccess: (data) => {
      getSuccessNoti(
        "Update Seat Type",
        data,
        "Seat Type successfully updated",
      );
      queryClient.invalidateQueries({ queryKey: ["seatTypes"] });
    },
    onError: (error) => {
      getErrorNoti("Update Seat Type", error, "Seat Type updating failed");
    },
  });
};

export const useDeleteSeatTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSeatTypes(id),
    onSuccess: (data) => {
      getSuccessNoti(
        "Delete Seat Type",
        data,
        "Seat Type successfully deleted",
      );
      queryClient.invalidateQueries({ queryKey: ["seatTypes"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Seat Type", error, "Seat Type deleting failed");
    },
  });
};
