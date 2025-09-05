import {
  getCardInfo,
  getUpcomingSchedule,
} from "@/api/function/admin/dashboardApi";
import { useQuery } from "@tanstack/react-query";

export const useCardInfoQuery = () => {
  return useQuery({
    queryFn: getCardInfo,
    queryKey: ["cardInfo"],
    retry: 5,
    staleTime: 0,
  });
};

export const useUpcomingSchedulesQuery = () => {
  return useQuery({
    queryFn: getUpcomingSchedule,
    queryKey: ["upcomingSchedules"],
    retry: 5,
    staleTime: 0,
  });
};
