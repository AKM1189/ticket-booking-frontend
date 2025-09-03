import {
  getSchedule,
  getSchedulesByShow,
} from "@/api/function/admin/scheduleApi";
import { useQuery } from "@tanstack/react-query";

export const useScheduleQuery = () => {
  return useQuery({
    queryFn: getSchedule,
    queryKey: ["schedules"],
    retry: 5,
  });
};

export const useScheduleByShowDetailQuery = (
  movieId: string,
  theatreId: string,
  screenId: string,
  showDate: string,
  showTime: string,
) => {
  return useQuery({
    queryFn: () =>
      getSchedulesByShow(movieId, theatreId, screenId, showDate, showTime),
    queryKey: ["schedulesByShowDetail"],
    retry: 5,
  });
};
