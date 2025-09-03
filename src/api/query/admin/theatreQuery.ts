import { getTheatres } from "@/api/function/admin/theatreApi";
import { useQuery } from "@tanstack/react-query";

export const useTheatreQuery = (
  searchTerm?: string,
  status?: string | null,
) => {
  return useQuery({
    queryFn: () => getTheatres(searchTerm, status),
    queryKey: ["theatres"],
    retry: 5,
  });
};
