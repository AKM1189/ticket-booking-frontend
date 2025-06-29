import ClockIcon from "@/assets/svgs/ClockIcon";
import RatingIcon from "@/assets/svgs/RatingIcon";
import { routes } from "@/routes";
import type { MovieType } from "@/types/MovieTypes";
import { Button, Image } from "@mantine/core";
import { useNavigate } from "react-router";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${routes.user.movies}/${movie.id}`);
  };
  return (
    <div className="bg-surface group">
      <div
        className="relative min-w-[250px] h-[400px] rounded-t-lg overflow-hidden cursor-pointer"
        onClick={handleNavigate}
      >
        <Image
          src={movie.posterUrl}
          className="rounded-lg h-[400px] group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-background/80 border border-surface rounded-md 0 p-2 px-3 text-sm flex gap-1 items-center">
          <RatingIcon color="var(--color-accent)" /> <span>8.0</span>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center">
        <span>
          <div
            className="text-text text-xl font-semibold mb-1 cursor-pointer"
            onClick={handleNavigate}
          >
            {movie.name}
          </div>
          <div className="text-sm text-muted flex items-center gap-1">
            <ClockIcon size={20} color="var(--color-muted)" /> 2h 50m
          </div>
        </span>
        <Button
          size="sm"
          className="!min-w-[110px] !text-sm !px-3"
          onClick={() => navigate(`${routes.user.ticketPlan}/${movie.id}`)}
        >
          Book Ticket
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
