import { useMemo, useState, useEffect } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Avatar, Button, Rating, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

import RatingModal from "./RatingModal";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/useLoading";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { useDeleteReviewMutation } from "@/api/mutation/user/reviewMutation";
import { formatDate } from "@/utils/dateFormatter";
import { routes } from "@/routes";

export type ReviewData = {
  id: number | null;
  rating: string | "";
  review: string | "";
};

interface ReviewProps {
  movie: any;
  refetchMovies: () => void;
}

const Review = ({ movie, refetchMovies }: ReviewProps) => {
  const { user } = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [reviewData, setReviewData] = useState<ReviewData>({
    id: null,
    rating: "",
    review: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const { showLoading } = useLoadingStore();
  const { open: showConfirm } = useConfirmModalStore();
  const { mutate: deleteReview } = useDeleteReviewMutation();
  const navigate = useNavigate();

  // Check if current user has already reviewed
  const isUserReviewed = useMemo(() => {
    return movie?.reviews?.some((r) => r?.user?.id === user?.id);
  }, [movie?.reviews, user]);

  // Reset reviewData when modal closes
  useEffect(() => {
    if (!opened) {
      setIsEditing(false);
      setReviewData({ id: null, rating: "", review: "" });
    }
  }, [opened]);

  // Edit review
  const handleEdit = (item: any) => {
    setIsEditing(true);
    setReviewData({
      id: item.id,
      rating: item.rating,
      review: item.description,
    });
    open();
  };

  // Delete review
  const handleDelete = (item: any) => {
    showConfirm({
      title: "Delete Review",
      message: "Are you sure you want to delete your review?",
      onConfirm: () =>
        deleteReview(
          { id: item.id },
          {
            onSuccess: () => {
              refetchMovies(); // refetch movie to update reviews and rating
              showLoading(false);
            },
            onError: () => {
              showLoading(false);
            },
          },
        ),
    });
  };

  const handleWriteReview = () => {
    if (!user) {
      navigate(routes.auth.login);
    } else open();
  };

  // Render reviews
  const reviewElements = useMemo(() => {
    const reviews = movie?.reviews || [];
    if (!reviews.length) return null;

    return reviews.map((item, index) => (
      <div
        key={item.id || index}
        className={twMerge(
          "relative border-b py-3 mt-3",
          index !== reviews.length - 1
            ? "border-surface-hover"
            : "border-surface",
        )}
      >
        <div className="relative flex justify-between flex-wrap items-start">
          <div className="flex min-w-[250px] gap-3 items-center">
            <div className="border border-primary rounded-full w-14 h-14 flex justify-center items-center p-1">
              {!item?.user?.image?.url ? (
                <Avatar w={40} h={40} color="var(--color-primary)" />
              ) : (
                <img
                  src={item.user.image.url}
                  className="rounded-full w-10 h-10 border-2 border-primary"
                  alt={item.user.name}
                />
              )}
            </div>
            <div>
              <div className="uppercase text-base font-semibold">
                {item.user.name}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-3">
              <Rating size={20} value={item.rating} readOnly />
            </div>
            <p className="text-blueGray text-sm">{item.description}</p>
          </div>

          {item.user.id === user?.id && (
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
                color="red"
                className="!cursor-pointer"
                onClick={() => handleDelete(item)}
              >
                <IconTrash size={20} />
              </ThemeIcon>
            </div>
          )}
        </div>
        <p className="text-muted text-end p-0 text-xs mt-2">
          {formatDate(dayjs(item.reviewDate))}
        </p>
      </div>
    ));
  }, [movie?.reviews, user]);

  return (
    <div>
      <div className="text-end mt-5">
        {!isUserReviewed && (
          <Button
            size="lg"
            className="!rounded-full !px-8 !py-0 !text-blueGray !text-sm !shadow-lg hover:!shadow-xl !transition-all !duration-300"
            variant="outline"
            onClick={handleWriteReview}
          >
            Write a Review
          </Button>
        )}
      </div>

      {movie?.reviews?.length === 0 ? (
        <div className="w-full h-[200px] flex justify-center items-center text-muted text-sm">
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
