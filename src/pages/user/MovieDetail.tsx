import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router";
import {
  ImageCarousel,
  MovieInfo,
  Review,
  Summary,
} from "@/components/user/movieDetail";
import { useMovieDetailQuery } from "@/api/query/user/movieQuery";
import { useParams } from "react-router";
import type { MovieDetailType, TabType } from "@/types/MovieTypes";
import { twMerge } from "tailwind-merge";

type UnderlineStyleType = {
  left: number | undefined;
  width: number | undefined;
};

const MovieDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<null | TabType>(null);
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const { data, refetch: refetchMovies } = useMovieDetailQuery(id ?? "");

  const [underlineStyle, setUnderlineStyle] = useState<UnderlineStyleType>({
    left: undefined,
    width: undefined,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const tabs = [
    {
      id: 1,
      label: "Summary",
    },
    {
      id: 2,
      label: "User Review",
    },
  ];

  useEffect(() => {
    const activeEl = containerRef.current?.querySelector(
      `[data-id="${activeTab?.id}"]`,
    );
    if (activeEl) {
      const el = activeEl as HTMLElement;
      setUnderlineStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    setActiveTab(tabs[0]);
  }, []);

  useEffect(() => {
    setMovie(data?.data);
  }, [data]);

  if (movie)
    return (
      <div>
        <MovieInfo movie={movie} />
        <div className="px-[150px]">
          <div className="mt-40">
            <div className="text-4xl font-semibold mb-10">Photos</div>
            <ImageCarousel images={movie.photos?.map((p) => p?.url)} />
          </div>
          <div>
            <div className="mt-10 min-h-[500px]" ref={containerRef}>
              <div className="relative flex gap-10 items-center">
                {tabs.map((item: TabType) => (
                  <div
                    key={item.id}
                    data-id={item.id}
                    className={twMerge(
                      "py-2 cursor-pointer font-semibold",
                      activeTab?.id === item.id && "text-accent",
                    )}
                    onClick={() => setActiveTab(item)}
                  >
                    {item.label}
                  </div>
                ))}
                <span
                  className="absolute bottom-0 h-[2px] bg-accent transition-all duration-300"
                  style={{
                    left: underlineStyle?.left,
                    width: underlineStyle?.width,
                  }}
                />
              </div>

              <div className="mt-10">
                {activeTab?.id === 1 ? (
                  <Summary movie={movie} />
                ) : (
                  <Review movie={movie} refetchMovies={refetchMovies} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MovieDetail;
