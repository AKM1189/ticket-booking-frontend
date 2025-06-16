import {
  PlayIcon,
  RatingIcon,
  TicketIcon,
  DateIcon,
  ClockIcon,
} from "@/assets/svgs";
import { CloseIcon } from "@mantine/core";

import { movieType } from "@/constants/movieConstants";
import type { MovieType } from "@/types/MovieTypes";
import { twMerge } from "tailwind-merge";
import MovieCard from "../home/MovieCard";

import YouTube, { type YouTubeProps } from "react-youtube";
import { useEffect, useMemo, useState } from "react";

interface MoviesProps {
  movieList: MovieType[];
}
export const MovieList = ({ movieList }: MoviesProps) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts = useMemo<YouTubeProps["opts"]>(
    () => ({
      height: "390",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        // autoplay: 1,
      },
    }),
    [],
  );

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Optional: clean up on unmount just in case
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMovie]);

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
                  <div className="text-3xl font-semibold">{movie.name}</div>
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
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/20 flex items-center justify-center"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="relative w-full max-w-4xl p-20"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseIcon
              // size="10"
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setSelectedMovie(null)}
            />
            <YouTube
              videoId={selectedMovie.trailerId}
              opts={opts}
              onReady={onPlayerReady}
              className="w-full h-full"
            />
          </div>
        </div>
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
