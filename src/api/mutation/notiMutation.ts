import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readAllNoti, readNoti } from "../function/notificationApi";

export const useReadNotiMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ notiId }: { notiId: number }) => readNoti(notiId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useReadAllNotiMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => readAllNoti(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
