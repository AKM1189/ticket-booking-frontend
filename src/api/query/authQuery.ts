import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../function/authApi";
import { useAuthStore } from "@/store/authStore";

export const useGetUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useQuery({
    queryFn: () =>
      getCurrentUser().then((data) => {
        setUser(data);
        return data;
      }),
    queryKey: ["currentUser"],
    retry: false,
    staleTime: 0,
  });
};
