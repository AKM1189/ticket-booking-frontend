import {
  useAddReviewMutation,
  useUpdateReviewMutation,
} from "@/api/mutation/user/reviewMutation";
import { useLoadingStore } from "@/store/useLoading";
import { Button, Modal, Rating, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ReviewData } from "./Review";
import { useEffect } from "react";

interface RatingModal {
  movieId: number;
  refetchMovies: () => void;
  opened: boolean;
  close: () => void;
  reviewData: ReviewData;
  isEditing: boolean;
}

const RatingModal = ({
  movieId,
  refetchMovies,
  opened,
  close,
  reviewData,
  isEditing,
}: RatingModal) => {
  const { mutate: addReview } = useAddReviewMutation();
  const { mutate: updateReview } = useUpdateReviewMutation();
  const { showLoading } = useLoadingStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      rating: "",
      review: "",
    },
    validate: {
      rating: (value) => (!value ? "Rating is required!" : null),
      review: (value) => (!value ? "Description is required!" : null),
    },
  });

  useEffect(() => {
    form.setValues({ rating: reviewData.rating, review: reviewData.review });
  }, [reviewData]);

  const handlePost = (values: typeof form.values) => {
    showLoading(true);
    const data = {
      rating: values.rating,
      description: values.review,
    };
    if (isEditing) {
      updateReview(
        { data: { movieId, ...data }, id: reviewData.id ?? 0 },
        {
          onSuccess: () => {
            refetchMovies();
            close();
            showLoading(false);
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    } else {
      addReview(
        { data: { movieId, ...data } },
        {
          onSuccess: () => {
            refetchMovies();
            close();
            showLoading(false);
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        className="!text-text"
        classNames={{
          header: "!bg-surface",
          content: "md:!min-w-[600px] w-full !min-h-[400px] !bg-surface p-3",
          close: "!text-text hover:!bg-surface-hover",
        }}
        title={<div className="text-xl font-semibold">Review and Rating</div>}
        centered
      >
        <form action="" onSubmit={form.onSubmit(handlePost)}>
          <div className="mt-3">
            <label className="text-base">Rating</label>
            <Rating
              defaultValue={2}
              size={30}
              mt={10}
              {...form.getInputProps("rating")}
            />
          </div>

          <Textarea
            label={<div>Description</div>}
            className="mt-8"
            placeholder="Write a review"
            minRows={8}
            autosize
            resize="vertical"
            classNames={{
              input:
                "!bg-transparent !text-text !border-surface-hover focus:!border-primary !p-3",
              label: "!mb-2 !text-text",
            }}
            {...form.getInputProps("review")}
          />

          <div className="mt-10 flex justify-between">
            <Button
              variant="outline"
              className="!border-surface-hover !text-muted !text-sm !h-[40px]"
              size="compact-xs"
              onClick={close}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="!text-sm !h-[40px]">
              Post
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default RatingModal;
