import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../function/authApi";

export const useGetUser = () => {
  return useQuery({
    queryFn: () => getCurrentUser,
    queryKey: ["currentUser"],
    retry: 5,
  });
};
