import { getSchedules } from "@/api/function/user/scheduleApi";
import { useQuery } from "@tanstack/react-query";

export const useSchedulesQuery = (movieId: string, showDate: string) => {
  return useQuery({
    queryFn: () => getSchedules(movieId, showDate),
    queryKey: ["userSchedules", movieId, showDate],
    retry: 3,
    staleTime: 0,
  });
};
