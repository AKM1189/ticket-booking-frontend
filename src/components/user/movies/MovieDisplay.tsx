import { MovieStatus } from "@/constants/movieConstants";
import type { MovieDetailType } from "@/types/MovieTypes";
import MovieCard from "../home/MovieCard";
import { useState, useMemo } from "react";
import { NavLink } from "react-router";
import { routes } from "@/routes";
import PlayTrailer from "./PlayTrailer";
import {
  IconBrandYoutube,
  IconCalendar,
  IconClock,
  IconStarFilled,
  IconTicket,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { minsToHMin } from "@/utils/timeFormatter";
import { Badge, Image } from "@mantine/core";
import { getRating } from "@/utils/getRating";

interface MoviesProps {
  movieList: MovieDetailType[];
  type: MovieStatus;
}
export const MovieList = ({ movieList, type }: MoviesProps) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailType | null>(
    null,
  );

  // Memoize movie list elements to prevent recreation on every render
  const movieElements = useMemo(() => {
    return movieList?.length > 0
      ? movieList.map((movie) => (
          <div className="w-full">
            <div
              className="movie-grid w-full lg:h-[400px] flex flex-col lg:flex-row gap-10"
              key={movie.id}
            >
              <NavLink to={"/" + routes.user.movies + "/" + movie.id}>
                <div className="relative w-full lg:w-[300px] lg:h-[400px] rounded-t-lg overflow-hidden cursor-pointer">
                  <Image
                    src={movie?.poster?.url}
                    className="rounded-lg h-[400px] group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 border border-surface rounded-md 0 p-2 px-3 text-sm flex gap-1 items-center">
                    <IconStarFilled color="var(--color-accent)" />{" "}
                    <span>{getRating(movie.rating)}</span>
                  </div>
                </div>
              </NavLink>
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col gap-5 max-lg:pb-5">
                  <div className="flex justify-between">
                    <NavLink to={"/" + routes.user.movies + "/" + movie.id}>
                      <div className="text-3xl font-semibold">
                        {movie.title}
                      </div>
                    </NavLink>
                  </div>

                  <div className="flex gap-2">
                    {movie?.genres?.map((genre) => (
                      <div key={genre.id}>
                        <Badge size="md" variant="light" color={genre.color}>
                          {genre.name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className=" flex items-center gap-2 text-muted">
                      <IconClock color="var(--color-muted)" />
                      {minsToHMin(parseInt(movie.duration))}
                    </div>
                    {type !== MovieStatus.coming && (
                      <div className="flex items-center gap-2 text-muted">
                        <IconCalendar color="var(--color-muted)" />
                        {dayjs(movie.releaseDate).format("DD-MM-YYYY")}
                      </div>
                    )}

                    <div className="flex gap-2 items-center text-muted">
                      <label>Language:</label>
                      {movie.language?.map(
                        (i, index) =>
                          i + (movie.language.length - 1 !== index ? ", " : ""),
                      )}
                    </div>

                    <div className="flex gap-2 items-center text-muted">
                      <label>Subtitle:</label>

                      {movie.subtitle?.map(
                        (i, index) =>
                          i + (movie.subtitle.length - 1 !== index ? ", " : ""),
                      )}
                    </div>
                  </div>
                </div>

                {type !== MovieStatus.coming && type !== MovieStatus.ended && (
                  <div className="flex justify-between text-sm py-5 border-y-[1px] border-coolGray">
                    <NavLink
                      to={"/" + routes.user.ticketPlan + "?movieId=" + movie.id}
                    >
                      <span className="flex gap-2 items-center cursor-pointer">
                        <IconTicket color="var(--color-accent)" />
                        Book Ticket
                      </span>
                    </NavLink>
                    <span
                      className="flex gap-2 items-center cursor-pointer"
                      onClick={() => {
                        setSelectedMovie(movie);
                      }}
                    >
                      <IconBrandYoutube color="var(--color-accent)" />
                      Watch Trailer
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      : [];
  }, [movieList]);

  return (
    <div className="movie-grid flex flex-col gap-16 items-center max-w-screen">
      {movieElements}
      {selectedMovie && (
        <PlayTrailer
          videoId={selectedMovie.trailerId}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export const MovieGrid = ({ movieList, type }: MoviesProps) => {
  // Memoize movie grid elements to prevent recreation on every render
  const movieGridElements = useMemo(() => {
    return movieList?.length > 0
      ? movieList.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            type={type}
            isMovieList={true}
          />
        ))
      : [];
  }, [movieList]);

  return (
    <div className="movie-grid flex flex-col gap-16 items-center">
      <div className="movie-grid grid [grid-template-columns:repeat(auto-fit,_minmax(250px,_1fr))] gap-5 w-full">
        {movieGridElements}
      </div>
    </div>
  );
};
