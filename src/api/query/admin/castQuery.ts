import { getCasts } from "@/api/function/admin/castApi";
import { useQuery } from "@tanstack/react-query";

export const useCastQuery = (page: number, search: string) => {
  return useQuery({
    queryFn: () => getCasts(page, search),
    queryKey: ["casts"],
    retry: 5,
  });
};
