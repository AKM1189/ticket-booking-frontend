import type { MovieType } from "@/types/MovieTypes";
import { Button } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

const SeatPlanHeader = ({
  movie,
  id,
}: {
  movie: MovieType;
  id: string | undefined;
}) => {
  return (
    <div
      className={`relative w-full h-[500px] bg-[url("/movie-bg-6.jpg")] bg-no-repeat bg-cover`}
    >
      <div className="relative w-full h-full bg-background/90 flex flex-col gap-5 justify-center">
        <div className="flex justify-center items-center gap-10 relative bottom-20">
          <div className="ms-10">
            <div className="text-6xl font-bold mb-5">
              {movie.name} {id}
            </div>
            <div className="text-blueGray text-center text-xl">
              Theatre 1 | English - 2D
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full text-center h-[120px] flex items-center justify-between bg-surface/90 px-[150px]">
          <Button>Back</Button>
          <div className="flex gap-2 items-center">
            <div className="uppercase">
              {dayjs().format("ddd, MMM DD YYYY")}
            </div>
            <div>09:40</div>
          </div>
          <div className="text-left">
            <div className="text-lg font-semibold">05:00</div>
            Mins Left
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPlanHeader;
