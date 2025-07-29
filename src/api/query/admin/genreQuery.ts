import { getGenre } from "@/api/function/admin/genreApi";
import { useQuery } from "@tanstack/react-query";

export const useGenreQuery = () => {
  return useQuery({
    queryFn: getGenre,
    queryKey: ["genres"],
    retry: 5,
  });
};
