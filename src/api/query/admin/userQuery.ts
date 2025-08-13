import { getUsers } from "@/api/function/admin/userApi";
import type { Role } from "@/types/AuthType";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = (role: Role, page: number) => {
  return useQuery({
    queryFn: () => getUsers(role, page),
    queryKey: ["users"],
    retry: 5,
  });
};
