import { movieType } from "@/constants/movieConstants";
import type { MovieType } from "@/types/MovieTypes";
import { twMerge } from "tailwind-merge";
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

interface MoviesProps {
  movieList: MovieType[];
}
export const MovieList = ({ movieList }: MoviesProps) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  // Memoize movie list elements to prevent recreation on every render
  const movieElements = useMemo(() => {
    return movieList?.length > 0
      ? movieList.map((movie) => (
          <div
            className="movie-grid w-full h-[400px] flex gap-10"
            key={movie.id}
          >
            <NavLink to={"/" + routes.user.movies + "/" + movie.id}>
              <div className="!min-w-[300px] h-[400px] rounded-md overflow-hidden">
                <img src={movie.posterUrl} className="!min-w-[300px] h-full" />
              </div>
            </NavLink>
            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <NavLink to={"/" + routes.user.movies + "/" + movie.id}>
                    <div className="text-3xl font-semibold">{movie.name}</div>
                  </NavLink>
                  <div
                    className={twMerge(
                      "text-xs",
                      movie.status === movieType.showing
                        ? "text-accent"
                        : "text-muted",
                    )}
                  >
                    {movie.status}
                  </div>
                </div>

                <div className="flex gap-2">
                  {movie?.genres?.map((genre) => (
                    <div key={genre.id}>
                      {genre.label}
                      {genre.id !==
                        movie?.genres[movie.genres.length - 1].id && (
                        <span> |</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className=" flex items-center gap-2 text-muted">
                  <IconClock color="var(--color-muted)" />
                  {movie.duration}
                </div>

                <div className="flex items-center gap-2 text-muted">
                  <IconCalendar color="var(--color-muted)" />
                  {movie.releaseDate}
                </div>
                {movie.status === movieType.showing && (
                  <div className="flex gap-2 items-center">
                    <IconStarFilled color={"var(--color-accent)"} />
                    {movie.rating}
                  </div>
                )}
              </div>
              <div className="flex justify-between text-sm py-5 border-y-[1px] border-coolGray">
                <NavLink to={"/" + routes.user.ticketPlan + "/" + movie.id}>
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

export const MovieGrid = ({ movieList }: MoviesProps) => {
  // Memoize movie grid elements to prevent recreation on every render
  const movieGridElements = useMemo(() => {
    return movieList?.length > 0
      ? movieList.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      : [];
  }, [movieList]);

  return (
    <div className="movie-grid flex flex-col gap-16 items-center">
      <div className="movie-grid grid [grid-template-columns:repeat(auto-fit,_minmax(150px,_1fr))] gap-5 w-full">
        {movieGridElements}
      </div>
    </div>
  );
};
