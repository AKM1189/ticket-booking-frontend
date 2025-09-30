import { MovieStatus, sortList } from "@/constants/movieConstants";
import { Button, Drawer, Pagination, Text, ThemeIcon } from "@mantine/core";
import { twMerge } from "tailwind-merge";
import { MovieGrid, MovieList, FilterCard } from "@/components/user/movies";
import type { MovieDetailType } from "@/types/MovieTypes";
import { useMovieStore } from "@/store/useMovieStore";
import { motion } from "motion/react";
import { useState, useMemo, useEffect } from "react";
import {
  IconAdjustmentsHorizontal,
  IconAdjustmentsOff,
  IconCross,
  IconGridDots,
  IconMenu2,
} from "@tabler/icons-react";
import {
  useMovieFilterListQuery,
  useMovieQuery,
} from "@/api/query/user/movieQuery";

const MovieFrame = ({ type }: { type: string | undefined }) => {
  const [filterDataList, setFilterDataList] = useState<any>({
    lang: [],
    exp: [],
    genre: [],
  });
  const [sortBy, setSortBy] = useState<MovieStatus>(
    type === "now-showing" ? MovieStatus.showing : MovieStatus.coming,
  );

  const [pagination, setPagination] = useState({
    totalPages: 10,
    page: 1,
    total: 0,
    limit: 10,
  });
  const { filterList, clearFilter } = useMovieStore();

  const { data, refetch } = useMovieQuery(
    sortBy ?? MovieStatus.showing,
    pagination?.page,
    pagination?.limit,
    filterList,
  );
  const [movies, setMovies] = useState<MovieDetailType[]>([]);

  const [activeDisplay, setActiveDisplay] = useState(1);

  const { data: filterData } = useMovieFilterListQuery();

  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    setMovies(data?.data);
    setPagination(data?.pagination);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [pagination, filterList]);

  useEffect(() => {
    setFilterDataList({
      lang: filterData?.data?.languages,
      exp: filterData?.data?.experiences,
      genre: filterData?.data?.genres?.reduce(
        (acc, cur) => [...acc, cur?.name],
        [],
      ),
    });
  }, [filterData]);
  // Memoize display icons to prevent recreation on every render
  const displayIcons = useMemo(
    () => [
      {
        id: 1,
        icon: (
          <IconMenu2
            color={
              activeDisplay === 1 ? "var(--color-accent)" : "var(--color-muted)"
            }
          />
        ),
      },
      {
        id: 2,
        icon: (
          <IconGridDots
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
    <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-0">
      <div className="lg:col-span-2 max-lg:hidden">
        <div className="text-2xl sm:text-3xl font-bold h-[50px] sm:h-[70px] mb-6 lg:mb-10 flex items-center uppercase">
          Filter By
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex h-[25px] -mt-5">
            <div
              className="flex items-center gap-1 text-muted cursor-pointer select-none"
              onClick={clearFilter}
            >
              <IconAdjustmentsOff />
              <Text className=""> Clear Filter</Text>
            </div>
          </div>
          <FilterCard title="Language" data={filterDataList.lang} type="lang" />
          <FilterCard title="Experience" data={filterDataList.exp} type="exp" />
          <FilterCard title="Genre" data={filterDataList.genre} type="genre" />
        </div>
      </div>

      <div className="lg:col-span-8 lg:px-10">
        <div className="min-h-[50px] sm:h-[70px] w-full rounded-md flex flex-col lg:flex-row gap-3 sm:gap-5 items-start lg:items-center lg:justify-between lg:p-3 lg:px-5 mb-10">
          <div className="flex flex-wrap gap-2 sm:gap-5 items-center w-full sm:w-auto">
            {sortList?.map((item) => (
              <span
                key={item}
                className={twMerge(
                  "px-3 sm:px-5 py-2 sm:py-2 cursor-pointer text-sm transition-300 border border-surface-hover rounded-full select-none text-nowrap",
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

          <div className="flex gap-2 sm:gap-5 self-start sm:self-auto">
            <span className="lg:hidden">
              <ThemeIcon
                color="var(--color-primary)"
                radius={"lg"}
                size={"lg"}
                w={50}
                onClick={() => setOpenFilter(true)}
              >
                <IconAdjustmentsHorizontal />
              </ThemeIcon>
            </span>

            <Drawer
              opened={openFilter}
              onClose={() => setOpenFilter(false)}
              title="Filter By"
              w={200}
              classNames={{
                root: "!text-text !bg-surface",
                content: "!text-text !bg-surface",
                header: "!text-text !bg-surface",
                title: "!text-xl !font-semibold",
                close: "!text-text hover:!bg-surface-hover",
              }}
            >
              <div className="flex flex-col gap-3">
                <div className="flex h-[25px] justify-end -mb-5 z-2">
                  <div
                    className="flex items-center ms-4 gap-1 text-muted cursor-pointer select-none"
                    onClick={clearFilter}
                  >
                    <IconAdjustmentsOff />
                    <Text className=""> Clear Filter</Text>
                  </div>
                </div>
                <FilterCard
                  title="Language"
                  data={filterDataList.lang}
                  type="lang"
                />
                <FilterCard
                  title="Experience"
                  data={filterDataList.exp}
                  type="exp"
                />
                <FilterCard
                  title="Genre"
                  data={filterDataList.genre}
                  type="genre"
                />
              </div>
            </Drawer>

            {displayIcons?.map((item) => (
              <div
                className="px-2 sm:px-3 h-[32px] sm:h-[36px] rounded-full bg-background border border-surface-hover min-w-14 sm:min-w-14 flex justify-center items-center cursor-pointer select-none"
                onClick={() => setActiveDisplay(item.id)}
                key={item.id}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="md:pt-5 max-lg:pb-[50px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeDisplay === 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: activeDisplay === 1 ? "block" : "none" }}
          >
            <MovieList movieList={movies} type={sortBy} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: activeDisplay === 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: activeDisplay === 2 ? "block" : "none" }}
          >
            <MovieGrid movieList={movies} type={sortBy} />
          </motion.div>
          {movies?.length ? (
            <div className="mt-16 flex justify-center">
              <Pagination
                total={pagination?.totalPages}
                value={pagination?.page}
                onChange={(page) =>
                  setPagination((prev) => ({ ...prev, page }))
                }
                size="md"
                classNames={{
                  root: "!flex gap-3 !bg-red",
                }}
              />
            </div>
          ) : (
            <div className="text-center mt-50 text-muted">
              No movies available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieFrame;
