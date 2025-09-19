import { getNotifications } from "@/api/function/notificationApi";
import { useQuery } from "@tanstack/react-query";

export const useNotiQuery = (page: number, type: string) => {
  return useQuery({
    queryFn: () => getNotifications(page, type),
    queryKey: ["notifications"],
    retry: 5,
  });
};
