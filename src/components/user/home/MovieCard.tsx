import { MovieStatus } from "@/constants/movieConstants";
import { routes } from "@/routes";
import type { HomeMoviesType, MovieDetailType } from "@/types/MovieTypes";
import { getRating } from "@/utils/getRating";
import { minsToHMin } from "@/utils/timeFormatter";
import { Button, Image } from "@mantine/core";
import { IconClock, IconStarFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router";

const MovieCard = ({
  movie,
  type,
  isMovieList = false,
}: {
  movie: HomeMoviesType | MovieDetailType;
  type: MovieStatus;
  isMovieList?: boolean;
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${routes.user.movies}/${movie.id}`);
  };
  const canBook =
    type === MovieStatus.showing || type === MovieStatus.available;

  return (
    <div
      className={`bg-surface group rounded-lg overflow-hidden max-w-[300px] shadow-sm ${isMovieList ? "w-full" : "w-[300px]"
        }`}
    >
      <div
        className={`relative h-[400px] rounded-t-lg overflow-hidden cursor-pointer ${isMovieList ? "w-full" : "w-[300px]"
          }`}
        onClick={handleNavigate}
      >
        <Image
          src={movie?.poster?.url}
          className="h-[400px] group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-background/80 border border-surface rounded-md 0 p-2 px-3 text-sm flex gap-1 items-center">
          <IconStarFilled color="var(--color-accent)" />{" "}
          <span>{getRating(movie.rating)}</span>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center">
        <span>
          <div
            className="text-text text-xl font-semibold mb-1 cursor-pointer"
            onClick={handleNavigate}
          >
            {movie.title}
          </div>
          {movie.duration && (
            <div className="text-sm text-muted flex items-center gap-1">
              <IconClock size={20} color="var(--color-muted)" />{" "}
              {minsToHMin(parseInt(movie.duration))}
            </div>
          )}
        </span>
        {canBook && (
          <Button
            size="sm"
            className="!min-w-[110px] !text-sm !px-3"
            onClick={() =>
              navigate(`${routes.user.ticketPlan}?movieId=${movie.id}`)
            }
          >
            Book Ticket
          </Button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
