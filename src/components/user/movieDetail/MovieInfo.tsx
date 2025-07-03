import { ClockIcon, DateIcon, RatingIcon } from "@/assets/svgs";
import SubtitleIcon from "@/assets/svgs/SubtitleIcon";
import VideoIcon from "@/assets/svgs/VideoIcon";
import PlayTrailer from "@/components/user/movies/PlayTrailer";
import type { MovieDetailType } from "@/types/MovieTypes";
import { Button } from "@mantine/core";
import { useState } from "react";
import RatingModal from "./RatingModal";
import { NavLink } from "react-router";
import { routes } from "@/routes";

interface MovieInfoType {
  movie: MovieDetailType;
  isTicketPlan?: boolean;
}
const MovieInfo = ({ movie, isTicketPlan = false }: MovieInfoType) => {
  const [showTrailer, setShowTrailer] = useState(false);
  if (movie)
    return (
      <div className="relative">
        <div
          className={`relative w-full h-[500px] bg-[url("/detail-bg-2.png")] bg-no-repeat bg-cover`}
        >
          <div className="relative w-full h-full bg-background/70 flex flex-col gap-5 justify-center items-center">
            <div className="absolute bottom-0 left-0 ps-[475px] w-full h-[150px] bg-surface/70"></div>
          </div>
          <div className="absolute top-32 px-[150px] flex">
            <div className="relative rounded-md border-2 border-surface overflow-hidden">
              <img
                src={movie?.posterUrl}
                alt=""
                className="z-[999] w-[280px] h-[400px]"
              />
              <div
                className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer"
                onClick={() => setShowTrailer(true)}
              >
                <VideoIcon color="var(--color-blueGray)" size={100} />
              </div>
            </div>
            <div className="ms-10">
              <div className="text-4xl font-bold mb-5">{movie.name}</div>
              <div className="text-blueGray flex flex-col gap-5">
                <div>
                  {movie.languages.map((item, index) => (
                    <span key={item}>
                      {item} {index !== movie.languages.length - 1 && ","}{" "}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {movie.genres.map((item, index) => (
                    <span
                      key={item.id}
                      className="px-4 py-2 border border-surface-hover rounded-full"
                    >
                      {item.label}
                      {/* {index !== movie.genres.length - 1 && "|"}{" "} */}
                    </span>
                  ))}
                </div>
                <div className="flex gap-5 items-center">
                  <span className="flex items-center gap-2">
                    <DateIcon color={"var(--color-blueGray)"} />
                    <span className="mt-1">{movie.releaseDate}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <ClockIcon color={"var(--color-blueGray)"} />
                    <span className="mt-1">{movie.duration}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <SubtitleIcon color={"var(--color-blueGray)"} />
                    <span className="mt-1">{movie.subtitle}</span>
                  </span>
                </div>
              </div>
              {/* <div></div> */}
            </div>
          </div>
          <div className="absolute bottom-[40px] left-[475px] flex items-center w-[900px] justify-between">
            <div>
              <div className="flex gap-16 items-baseline-last">
                <div>
                  <span className="text-xl flex items-center gap-3">
                    {" "}
                    <RatingIcon color={"var(--color-accent"} size={30} />{" "}
                    {movie.rating}
                  </span>
                  <div className="mt-3 text-sm text-center">Users Rating</div>
                </div>
                <div>
                  <span className="text-xl flex items-center gap-3">
                    {" "}
                    <RatingIcon color={"var(--color-muted"} size={30} /> {0}
                  </span>
                  <RatingModal />
                </div>
              </div>
              {/* <div className="mt-3">User Rating</div> */}
            </div>
            {!isTicketPlan && (
              <div>
                <NavLink to={"/" + routes.user.ticketPlan + "/" + movie.id}>
                  <Button className="!rounded-full !w-[150px] !h-[50px]">
                    Book Ticket
                  </Button>
                </NavLink>
              </div>
            )}
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
