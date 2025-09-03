import { getSeatTypes } from "@/api/function/admin/seatTypeApi";
import { useQuery } from "@tanstack/react-query";

export const useSeatTypeQuery = () => {
  return useQuery({
    queryFn: getSeatTypes,
    queryKey: ["seatTypes"],
    retry: 5,
  });
};
