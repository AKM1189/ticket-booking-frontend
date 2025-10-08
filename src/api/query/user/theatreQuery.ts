import { getShowingTheatres } from "@/api/function/user/theatreApi";
import { useQuery } from "@tanstack/react-query";

export const useShowingTheatresQuery = () => {
  return useQuery({
    queryFn: () => getShowingTheatres(),
    queryKey: ["userTheatres", "showing"],
    retry: 3,
    staleTime: 0,
  });
};
