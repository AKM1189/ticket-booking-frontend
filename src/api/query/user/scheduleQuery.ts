import {
  getScheduleDetail,
  getSchedules,
} from "@/api/function/user/scheduleApi";
import { useQuery } from "@tanstack/react-query";

export const useSchedulesQuery = (movieId: string, showDate: string) => {
  return useQuery({
    queryFn: () => getSchedules(movieId, showDate),
    queryKey: ["userSchedules", movieId, showDate],
    retry: 3,
    staleTime: 0,
  });
};

export const useScheduleDetailQuery = (scheduleId: number) => {
  return useQuery({
    queryFn: () => getScheduleDetail(scheduleId),
    queryKey: ["schedule", scheduleId],
    retry: 3,
    staleTime: 0,
  });
};
