import {
  PlayIcon,
  RatingIcon,
  TicketIcon,
  DateIcon,
  ClockIcon,
  CloseIcon,
} from "@/assets/svgs";

import { movieType } from "@/constants/movieConstants";
import type { MovieType } from "@/types/MovieTypes";
import { twMerge } from "tailwind-merge";
import MovieCard from "../home/MovieCard";

import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { routes } from "@/routes";
import PlayTrailer from "./PlayTrailer";

interface MoviesProps {
  movieList: MovieType[];
}
export const MovieList = ({ movieList }: MoviesProps) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  // useEffect(() => {
  //   if (selectedMovie) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }

  //   // Optional: clean up on unmount just in case
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [selectedMovie]);

  return (
    <div className="movie-grid flex flex-col gap-16 items-center max-w-screen">
      {movieList?.length > 0 &&
        movieList?.map((movie) => (
          <div
            className="movie-grid w-full h-[400px] flex gap-10"
            key={movie.id}
          >
            <div className="!min-w-[300px] h-[400px] rounded-md overflow-hidden">
              <img src={movie.posterUrl} className="!min-w-[300px] h-full" />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <NavLink to={routes.user.movies + "/" + movie.id}>
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
                  <ClockIcon color="var(--color-muted)" />
                  {movie.duration}
                </div>

                <div className="flex items-center gap-2 text-muted">
                  <DateIcon color="var(--color-muted)" />
                  {movie.releaseDate}
                </div>
                {movie.status === movieType.showing && (
                  <div className="flex gap-2 items-center">
                    <RatingIcon color={"var(--color-accent)"} />
                    {movie.rating}
                  </div>
                )}
              </div>
              <div className="flex justify-between text-sm py-5 border-y-[1px] border-coolGray">
                <span className="flex gap-2 items-center cursor-pointer">
                  <TicketIcon color="var(--color-accent)" />
                  Book Ticket
                </span>
                <span
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => {
                    setSelectedMovie(movie);
                  }}
                >
                  <PlayIcon color="var(--color-accent)" />
                  Watch Trailer
                </span>
              </div>
            </div>
          </div>
        ))}
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
  return (
    <div className="movie-grid flex flex-col gap-16 items-center">
      <div className="movie-grid grid [grid-template-columns:repeat(auto-fit,_minmax(150px,_1fr))] gap-5 w-full">
        {movieList?.length > 0 &&
          movieList?.map((movie) => <MovieCard movie={movie} />)}
      </div>
    </div>
  );
};
