import { getNotifications } from "@/api/function/notificationApi";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

export const useNotiQuery = (page: number, type: string) => {
  const { user } = useAuthStore();
  return useQuery({
    queryFn: () => getNotifications(page, type),
    queryKey: ["notifications", type, user?.id],
    retry: 5,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false
  });
};
