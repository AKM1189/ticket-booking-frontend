import { getScreen, getScreenByTheatre } from "@/api/function/admin/screenApi";
import { useQuery } from "@tanstack/react-query";

export const useScreenQuery = (
  searchTerm?: string,
  statusFilter?: string | null,
  page?: number,
  theatreId?: number | null,
) => {
  return useQuery({
    queryFn: () => getScreen(searchTerm, statusFilter, page, theatreId),
    queryKey: ["screens"],
    retry: 5,
  });
};

export const useScreenByTheatreQuery = (theatreId: number) => {
  return useQuery({
    queryFn: () => getScreenByTheatre(theatreId),
    queryKey: ["screens"],
    retry: 5,
  });
};
