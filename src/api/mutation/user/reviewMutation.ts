import {
  addReview,
  deleteReview,
  updateReview,
} from "@/api/function/user/reviewApi";
import type { ReviewInputType } from "@/types/MovieTypes";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: ReviewInputType }) => addReview(data),
    onSuccess: (data) => {
      getSuccessNoti("Add Review", data, "Review successfully added");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      getErrorNoti("Add Review", error, "Review adding failed");
    },
  });
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: ReviewInputType; id: number }) =>
      updateReview(data, id),
    onSuccess: (data) => {
      getSuccessNoti("Update Review", data, "Review successfully updated");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      getErrorNoti("Update Review", error, "Review updating failed");
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteReview(id),
    onSuccess: (data) => {
      getSuccessNoti("Delete Review", data, "Review successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      getErrorNoti("Delete Review", error, "Review deleting failed");
    },
  });
};
