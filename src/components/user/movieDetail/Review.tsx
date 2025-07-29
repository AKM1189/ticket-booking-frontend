import { useMemo } from "react";
import { RatingIcon } from "@/assets/svgs";
import type { MovieDetailType } from "@/types/MovieTypes";
import { Button } from "@mantine/core";

interface ReviewType {
  movie: MovieDetailType;
}

// fetch review separately
const Review = ({ movie }: ReviewType) => {
  // Memoize reviews to prevent unnecessary re-renders
  const reviewElements = useMemo(() => {
    return movie?.reviews?.map((item, index) => (
      <div
        key={item.id || index}
        className="flex justify-between items-start border-b border-surface-hover border-dashed py-10"
      >
        <div className="flex gap-5 items-start">
          <div className="border border-primary inline-block rounded-full p-1">
            <img
              src="/movie-bg-10.png"
              className="rounded-full w-14 h-14 border-2 border-primary"
              alt=""
            />
          </div>
          <div>
            <div className="uppercase font-semibold">{item.username}</div>
            <p className="text-muted text-sm mt-1">{item.reviewedDate}</p>
          </div>
        </div>
        <div className="w-[800px]">
          <span className="flex gap-2 mb-3">
            <RatingIcon color="var(--color-accent)" />
            {item.rating}
          </span>
          <p className="text-blueGray">{item.review}</p>
        </div>
      </div>
    ));
  }, [movie?.reviews]);

  return (
    <div className="">
      {reviewElements}

      <div className="text-center mt-10">
        <Button variant="outline" className="!rounded-full !h-[50px] !px-8">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Review;
