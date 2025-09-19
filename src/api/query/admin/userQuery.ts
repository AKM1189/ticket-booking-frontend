import { getUsers } from "@/api/function/admin/userApi";
import type { Role } from "@/types/AuthType";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = (search?: string, role?: Role, page?: number) => {
  return useQuery({
    queryFn: () => getUsers(search, role, page),
    queryKey: ["users"],
    retry: 5,
  });
};
