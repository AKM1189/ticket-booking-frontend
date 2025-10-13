import { useCallback, useMemo, useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import RatingModal from "./RatingModal";
import { Avatar, Button, Rating, ThemeIcon } from "@mantine/core";
import { useAuthStore } from "@/store/authStore";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteReviewMutation } from "@/api/mutation/user/reviewMutation";
import { useLoadingStore } from "@/store/useLoading";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { formatDate } from "@/utils/dateFormatter";

interface ReviewType {
  movie: any;
  refetchMovies: () => void;
}

export type ReviewData = {
  id: null | number;
  rating: string | "";
  review: string | "";
};

// fetch review separately
const Review = ({ movie, refetchMovies }: ReviewType) => {
  const { user } = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [reviewData, setReviewData] = useState<ReviewData>({
    id: null,
    rating: "",
    review: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deleteReview } = useDeleteReviewMutation();
  const { showLoading } = useLoadingStore();
  const { open: showConfirm } = useConfirmModalStore();

  const handleEdit = (item) => {
    setIsEditing(true);
    setReviewData({
      id: item.id,
      rating: item.rating,
      review: item.description,
    });
    open();
  };

  const handleDelete = (item) => {
    showConfirm({
      title: "Delete Review",
      message: "Are you sure you want to delete review for this movie?",
      onConfirm: () =>
        deleteReview(
          { id: item.id },
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
        ),
    });
  };

  const isUserReviewed = () =>
    useCallback(
      movie?.reviews?.some((review) => review?.user?.id === user?.id),
      [movie],
    );

  const reviewElements = useMemo(() => {
    return movie?.reviews?.map((item, index) => (
      <div
        className={twMerge(
          "relative border-b py-3 mt-3",
          index !== movie?.reviews?.length - 1
            ? "border-surface-hover"
            : "border-surface",
        )}
      >
        <div
          key={item.id || index}
          className={twMerge(
            "relative flex justify-between flex-wrap items-start",
          )}
        >
          <div className="flex min-w-[250px] gap-3 items-center">
            <div className="border border-primary rounded-full w-14 h-14 flex justify-center items-center p-1">
              {!movie?.reviews?.user?.image?.url ? (
                <Avatar w={40} h={40} color="var(--color-primary)" />
              ) : (
                <img
                  src={item?.user?.image?.url}
                  className="rounded-full w-10 h-10 border-2 border-primary"
                  alt=""
                />
              )}
            </div>

            <div>
              <div className="uppercase text-base font-semibold">
                {item?.user?.name}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-3">
              <Rating defaultValue={item.rating} size={20} readOnly />
            </div>
            <p className="text-blueGray text-sm">{item.description}</p>
          </div>
          {/* <div className="flex flex-col items-end gap-3 mt-1"> */}
          {item?.user?.id === user?.id && (
            <div className="absolute top-1 right-0 flex gap-3">
              <ThemeIcon
                variant="light"
                size={30}
                color="var(--color-primary)"
                className="!cursor-pointer"
                onClick={() => handleEdit(item)}
              >
                <IconPencil size={20} />
              </ThemeIcon>
              <ThemeIcon
                variant="light"
                size={30}
                color={"red"}
                className="!cursor-pointer"
                onClick={() => handleDelete(item)}
              >
                <IconTrash size={20} />
              </ThemeIcon>
            </div>
          )}

          {/* </div> */}
        </div>
        <p className="text-muted text-end p-0 text-xs mt-2">
          {formatDate(dayjs(item.reviewDate))}
        </p>
      </div>
    ));
  }, [movie?.reviews]);

  return (
    <div className="">
      <div className="text-end mt-5">
        {!isUserReviewed() && (
          <Button
            size="lg"
            className="!rounded-full !px-8 !py-0 !text-blueGray !text-sm !shadow-lg hover:!shadow-xl !transition-all !duration-300"
            variant="outline"
            onClick={open}
          >
            Write a Review
          </Button>
        )}
      </div>
      {movie && movie?.reviews?.length <= 0 ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          No reviews available for this movie.
        </div>
      ) : (
        <div className="bg-surface py-3 px-10 rounded-lg mt-5">
          {reviewElements}
        </div>
      )}

      <RatingModal
        movieId={movie?.id}
        refetchMovies={refetchMovies}
        opened={opened}
        close={close}
        reviewData={reviewData}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Review;
