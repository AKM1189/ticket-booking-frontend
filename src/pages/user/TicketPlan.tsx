import { useMovieDetailQuery } from "@/api/query/user/movieQuery";
import { useSchedulesQuery } from "@/api/query/user/scheduleQuery";
import { SeatIcon } from "@/assets/svgs/SeatIcon";
import ScheduleList from "@/components/user/ticketPlan/ScheduleList";
import type { MovieDetailType } from "@/types/MovieTypes";
import type { ScheduleType } from "@/types/ScheduleTypes";
import { minsToHMin } from "@/utils/timeFormatter";
import { Skeleton, Image, Loader } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";

dayjs.extend(isSameOrBefore);

export type ShowDetailType = {
  id: number;
  theatre: {
    id: number;
    location: string;
  };
  screen: {
    id: number;
    name: string;
  };
  showTime: string;
  language: string;
  subtitle: string;
};

const TicketPlan = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );
  const [dateList, setDateList] = useState<string[] | null>(null);
  const [searchParams] = useSearchParams();

  const movieId = searchParams.get("movieId");
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [schedules, setSchedules] = useState<ShowDetailType[]>([]);

  const { data, isLoading: movieLoading } = useMovieDetailQuery(movieId ?? "");
  const { data: scheduleData, isFetching: scheduleLoading } = useSchedulesQuery(
    movieId ?? "",
    selectedDate,
  );

  // update schedules when fetched
  useEffect(() => {
    if (scheduleData?.data) {
      setSchedules(scheduleData.data);
    }
  }, [scheduleData]);

  // extract movie info and schedule dates
  useEffect(() => {
    if (data?.data) {
      setMovie(data.data);
      const showDates: string[] = [];

      data.data.schedules?.forEach((s: ScheduleType) => {
        if (
          !showDates.includes(s.showDate) &&
          dayjs().isSameOrBefore(dayjs(s.showDate), "day")
        ) {
          showDates.push(s.showDate);
        }
      });

      const sortedDates = showDates.sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      );

      setDateList(sortedDates);
      if (sortedDates.length > 0) setSelectedDate(sortedDates[0]);
    }
  }, [data]);

  // group schedules by theatre
  const groupedSchedules = useMemo(() => {
    if (!schedules) return {};
    return schedules.reduce((acc, schedule) => {
      const loc = schedule.theatre.location;
      if (!acc[loc]) acc[loc] = [];
      acc[loc].push(schedule);
      return acc;
    }, {} as Record<string, ShowDetailType[]>);
  }, [schedules]);

  return (
    <div className="min-h-screen bg-background">
      {/* Only skeleton while fetching movie details the first time */}
      <Skeleton visible={movieLoading} height={"100%"}>
        {movie ? (
          <div>
            {/* ===== Movie Header ===== */}
            <div className="relative pt-14 pb-8">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="flex justify-center mb-6">
                  <Image
                    src={movie.poster?.url}
                    className="!rounded-xl shadow-2xl"
                    h={400}
                    w={300}
                  />
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-text">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap items-center justify-center gap-6 text-blueGray">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted">Duration:</span>
                      <span>{minsToHMin(parseInt(movie.duration))}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted">Languages:</span>
                      <span>
                        {movie.language?.map((item, index) => (
                          <span key={item}>
                            {item}
                            {index !== movie.language.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted">Subtitles:</span>
                      <span>
                        {movie.subtitle?.map(
                          (item, index) =>
                            `${item}${
                              index !== movie.subtitle.length - 1 ? ", " : ""
                            }`,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Date Selection ===== */}
            <div className="bg-surface py-8">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-6">
                  <IconCalendar size={24} color={"var(--color-accent)"} />
                  <h2 className="text-2xl font-semibold text-text">
                    Select Date
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {dateList?.map((item) => (
                    <button
                      key={item}
                      className={twMerge(
                        "px-6 py-3 rounded-lg cursor-pointer bg-surface-hover text-text font-medium transition-all duration-200 hover:bg-surface-light hover:scale-105 shadow-sm",
                        selectedDate === item &&
                          "bg-primary text-white hover:!bg-primary hover:!scale-105",
                      )}
                      onClick={() => setSelectedDate(item)}
                    >
                      {dayjs(item).format("MMM DD")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== Showtimes Section ===== */}
            <div className="py-12">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <SeatIcon />
                    <h2 className="text-2xl font-semibold text-text">
                      Available Showtimes
                    </h2>
                  </div>
                </div>

                {/* Showtimes or loading indicator */}
                <div className="relative">
                  {scheduleLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-xl z-10">
                      <Loader color="blue" size="lg" />
                    </div>
                  )}

                  {schedules?.length > 0 ? (
                    <div className="bg-surface rounded-xl shadow-sm border border-surface-hover">
                      {Object.entries(groupedSchedules || {}).map(
                        ([location, shows]) => (
                          <ScheduleList
                            key={location}
                            location={location}
                            shows={shows}
                            movie={movie}
                            selectedDate={selectedDate}
                          />
                        ),
                      )}
                    </div>
                  ) : (
                    !scheduleLoading && (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <SeatIcon />
                        <div className="text-xl text-muted">
                          No showtimes available for this date
                        </div>
                        <div className="text-sm text-muted mt-2">
                          Please select a different date
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-muted text-lg">
            Movie not found.
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default TicketPlan;
