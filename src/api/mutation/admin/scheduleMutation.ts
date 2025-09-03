import {
  addSchedule,
  deleteSchedule,
  updateSchedule,
} from "@/api/function/admin/scheduleApi";
import type { ScheduleInputType } from "@/types/ScheduleTypes";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddScheduleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ScheduleInputType }) => addSchedule(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Schedule", data, "Schedule successfully added");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error) => {
      getErrorNoti("Add Schedule", error, "Schedule adding failed");
    },
  });
};

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: ScheduleInputType; id: number }) =>
      updateSchedule(data, id),
    onSuccess: (data) => {
      getSuccessNoti("Update Schedule", data, "Schedule successfully updated");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error) => {
      getErrorNoti("Update Schedule", error, "Schedule updating failed");
    },
  });
};

export const useDeleteScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteSchedule(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete Schedule", data, "Schedule successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Schedule", error, "Schedule deleting failed");
    },
  });
};
