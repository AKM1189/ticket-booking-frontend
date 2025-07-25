import { sortList } from "@/constants/movieConstants";
import { Pagination } from "@mantine/core";
import { twMerge } from "tailwind-merge";
import { ListIcon, GridIcon } from "@/assets/svgs/DisplayIcons";
import { MovieGrid, MovieList, FilterCard } from "@/components/user/movies";
import { SortType, type LabelType } from "@/types/MovieTypes";
import { useMovieStore } from "@/store/useMovieStore";
import { motion } from "motion/react";
import { useState, useMemo, useCallback } from "react";

const MovieFrame = ({ type }: { type: string | undefined }) => {
  const langList = [
    { id: 1, label: "English" },
    { id: 2, label: "Tamil" },
    { id: 3, label: "Hindi" },
    { id: 4, label: "Telegu" },
  ];

  const expList = [
    { id: 1, label: "2D" },
    { id: 2, label: "3D" },
    { id: 3, label: "IMax" },
    { id: 4, label: "4DX" },
  ];

  const genreList = [
    { id: 1, label: "Thriller" },
    { id: 2, label: "Adventure" },
    { id: 3, label: "Horror" },
    { id: 4, label: "Action" },
  ];

  const movieList = [
    {
      id: 1,
      name: "ALONE",
      duration: "2 hrs 50 mins",
      genres: [
        { id: 2, label: "Adventure" },
        { id: 4, label: "Action" },
      ],
      releaseDate: "8 Nov, 2025",
      rating: "8.0",
      status: "Now Showing",
      posterUrl: "/movie03.jpg",
      trailerId: "o2T2V1jrLY0",
    },
    {
      id: 2,
      name: "AKM",
      duration: "2 hrs 50 mins",
      genres: [
        { id: 1, label: "Thriller" },
        { id: 4, label: "Action" },
      ],
      releaseDate: "8 Nov, 2025",
      rating: "8.0",
      status: "Coming Soon",
      posterUrl: "/movie03.jpg",
      trailerId: "o2T2V1jrLY0",
    },
    {
      id: 3,
      name: "HEROS",
      duration: "2 hrs 50 mins",
      genres: [
        { id: 1, label: "Thriller" },
        { id: 4, label: "Action" },
      ],
      releaseDate: "8 Nov, 2025",
      rating: "8.0",
      status: "Now Showing",
      posterUrl: "/movie03.jpg",
      trailerId: "o2T2V1jrLY0",
    },
  ];

  const { filterList, setFilterList } = useMovieStore();

  const [sortBy, setSortBy] = useState<SortType>(
    type === "now-showing" ? SortType.showing : SortType.comingSoon,
  );
  const [activeDisplay, setActiveDisplay] = useState(1);

  const [pagination, setPagination] = useState({
    totalPages: 10,
    currentPage: 1,
  });

  // Memoize display icons to prevent recreation on every render
  const displayIcons = useMemo(
    () => [
      {
        id: 1,
        icon: (
          <ListIcon
            color={
              activeDisplay === 1 ? "var(--color-accent)" : "var(--color-muted)"
            }
          />
        ),
      },
      {
        id: 2,
        icon: (
          <GridIcon
            color={
              activeDisplay === 2 ? "var(--color-accent)" : "var(--color-muted)"
            }
          />
        ),
      },
    ],
    [activeDisplay],
  );
  return (
    <div className="w-full grid grid-cols-10">
      <div className="col-span-2">
        <div className="text-3xl font-bold h-[70px] mb-10 flex items-center uppercase">
          Filter By
        </div>
        <div className="flex flex-col gap-10">
          <FilterCard
            title="Language"
            data={langList}
            filterList={filterList}
            setFilterList={setFilterList}
            filterListByCategory={filterList?.lang}
            type="lang"
          />
          <FilterCard
            title="Experience"
            data={expList}
            filterList={filterList}
            setFilterList={setFilterList}
            filterListByCategory={filterList?.exp}
            type="exp"
          />
          <FilterCard
            title="Genre"
            data={genreList}
            filterList={filterList}
            setFilterList={setFilterList}
            filterListByCategory={filterList?.genre}
            type="genre"
          />
        </div>
      </div>
      <div className=" col-span-8 px-10">
        <div className="h-[70px] w-full border border-surface-hover rounded-md flex gap-5 items-center justify-between px-5 mb-10">
          <div className="flex gap-5 items-center">
            <div>Sort By:</div>

            {sortList?.map((item) => (
              <span
                key={item}
                className={twMerge(
                  "p-5 py-2 cursor-pointer text-sm transition-300 border border-surface-hover rounded-full select-none text-nowrap",
                  item === sortBy
                    ? "bg-primary/100 rounded-full"
                    : "bg-primary/0",
                )}
                onClick={() => setSortBy(item)}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex gap-5">
            {displayIcons?.map((item) => (
              <div
                className="px-3 h-[36px] rounded-full bg-background border border-surface-hover min-w-14 flex justify-center items-center cursor-pointer select-none"
                onClick={() => setActiveDisplay(item.id)}
                key={item.id}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: activeDisplay === 1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: activeDisplay === 1 ? "block" : "none" }}
        >
          <MovieList movieList={movieList} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: activeDisplay === 2 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: activeDisplay === 2 ? "block" : "none" }}
        >
          <MovieGrid movieList={movieList} />
        </motion.div>
        <div className="mt-16 flex justify-center">
          <Pagination
            total={pagination?.totalPages}
            value={pagination?.currentPage}
            onChange={(page) =>
              setPagination((prev) => ({ ...prev, currentPage: page }))
            }
            size="md"
            classNames={{
              root: "!flex gap-3 !bg-red",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieFrame;
