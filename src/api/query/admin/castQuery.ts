import { getCasts } from "@/api/function/admin/castApi";
import { useQuery } from "@tanstack/react-query";

export const useCastQuery = () => {
  return useQuery({
    queryFn: getCasts,
    queryKey: ["casts"],
    retry: 5,
  });
};
