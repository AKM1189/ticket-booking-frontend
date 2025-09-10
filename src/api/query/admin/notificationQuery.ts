import { getNotifications } from "@/api/function/notificationApi";
import { useQuery } from "@tanstack/react-query";

export const useNotiQuery = (page: number) => {
  return useQuery({
    queryFn: () => getNotifications(page),
    queryKey: ["notifications"],
    retry: 5,
  });
};
