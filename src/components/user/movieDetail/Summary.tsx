import { useMemo } from "react";
import type { MovieDetailType } from "@/types/MovieTypes";

interface SummaryType {
  movie: MovieDetailType | null;
}
const Summary = ({ movie }: SummaryType) => {
  console.log("summary", movie);
  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="title">Description</div>
        <p className="mt-5 text-justify">{movie?.description}</p>
      </div>

      <div>
        <div className="title">Cast</div>
        <div className="flex gap-16 mt-10">
          {useMemo(
            () =>
              movie?.casts?.map((cast) => (
                <div className="text-center" key={cast.id}>
                  <div className="border-2 border-primary inline-block rounded-full p-2">
                    <img
                      src={cast?.image?.url}
                      className="rounded-full w-32 h-32 border-4 border-primary"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="text-lg font-semibold">{cast.name}</div>
                    <div className="text-sm text-accent">{cast.role}</div>
                  </div>
                </div>
              )),
            [movie?.casts],
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
