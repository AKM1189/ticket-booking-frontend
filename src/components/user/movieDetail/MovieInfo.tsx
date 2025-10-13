import PlayTrailer from "@/components/user/movies/PlayTrailer";
import type { MovieDetailType } from "@/types/MovieTypes";
import { Badge, Button, Image } from "@mantine/core";
import { useState, useMemo } from "react";
import { NavLink } from "react-router";
import { routes } from "@/routes";
import {
  IconBrandParsinta,
  IconCalendar,
  IconClock,
  IconStarFilled,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { minsToHMin } from "@/utils/timeFormatter";
import { MovieStatus } from "@/constants/movieConstants";

interface MovieInfoType {
  movie: MovieDetailType;
  isTicketPlan?: boolean;
}
const MovieInfo = ({ movie, isTicketPlan = false }: MovieInfoType) => {
  const [showTrailer, setShowTrailer] = useState(false);

  if (movie)
    return (
      <div className="relative w-full h-[510px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="relative">
          {/* <div className="absolute inset-0 bg-black/70"></div> */}
          <div className="absolute inset-0 bg-[url('/movie_detail_bg.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

          <div className="relative flex justify-center z-10 container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start">
              {/* Movie Poster */}
              <div className="lg:col-span-1 flex justify-center">
                <div className="relative group">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl w-[280px] h-[400px]">
                    <Image
                      src={movie?.poster?.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300"
                      onClick={() => setShowTrailer(true)}
                    >
                      <IconBrandParsinta
                        color="var(--color-blueGray)"
                        size={80}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Title */}
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    {movie.title}
                  </h1>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-3">
                  {useMemo(
                    () =>
                      movie?.genres?.map((item) => (
                        <Badge
                          key={item.id}
                          color={item.color}
                          size="lg"
                          className="px-4 py-2"
                        >
                          {item.name}
                        </Badge>
                      )),
                    [movie?.genres],
                  )}
                </div>

                {/* Movie Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blueGray">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <IconClock color="var(--color-blueGray)" size={20} />
                      <span className="text-lg">
                        {minsToHMin(parseInt(movie.duration))}
                      </span>
                    </div>

                    {movie.releaseDate && (
                      <div className="flex items-center gap-3">
                        <IconCalendar color="var(--color-blueGray)" size={20} />
                        <span className="text-lg">
                          {dayjs(movie.releaseDate).format("DD-MM-YYYY")}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <IconStarFilled color="var(--color-accent)" size={20} />
                      <span className="text-lg font-semibold">
                        {movie.rating.slice(0, 3)} / 10
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-white font-semibold block mb-2">
                        Language:
                      </span>
                      <span className="text-lg">
                        {useMemo(
                          () =>
                            movie?.language?.map((item, index) => (
                              <span key={item}>
                                {item}{" "}
                                {index !== movie?.language.length - 1 && ","}{" "}
                              </span>
                            )),
                          [movie?.language],
                        )}
                      </span>
                    </div>

                    <div>
                      <span className="text-white font-semibold block mb-2">
                        Subtitle:
                      </span>
                      <span className="text-lg">
                        {movie.subtitle?.map(
                          (s, index) =>
                            `${s} ${
                              movie.subtitle.length - 1 !== index ? ", " : ""
                            }`,
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Book Ticket Button */}
                {!isTicketPlan &&
                  (movie.status === MovieStatus.showing ||
                    movie.status === MovieStatus.available) && (
                    <div className="pt-6 flex">
                      <NavLink
                        to={`/${routes.user.ticketPlan}?movieId=${movie.id}`}
                      >
                        <Button
                          size="lg"
                          className="!rounded-full !px-8 !py-0 !text-lg !font-semibold !shadow-lg hover:!shadow-xl !transition-all !duration-300"
                        >
                          Book Ticket
                        </Button>
                      </NavLink>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {showTrailer && (
          <PlayTrailer
            videoId={movie.trailerId}
            onClose={() => setShowTrailer(false)}
          />
        )}
      </div>
    );
};

export default MovieInfo;
