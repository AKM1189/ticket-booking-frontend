import { useMovieDetailQuery } from "@/api/query/user/movieQuery";
import { useSchedulesQuery } from "@/api/query/user/scheduleQuery";
import { SeatIcon } from "@/assets/svgs/SeatIcon";
import ScheduleList from "@/components/user/ticketPlan/ScheduleList";
import type { MovieDetailType } from "@/types/MovieTypes";
import type { ScheduleType } from "@/types/ScheduleTypes";
import { minsToHMin } from "@/utils/timeFormatter";
import { Badge, Image, Skeleton, TextInput } from "@mantine/core";
import { IconCalendar, IconClock, IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
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
  const showDate = searchParams.get("showDate");

  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [schedules, setSchedules] = useState<ShowDetailType[]>([]);

  const { data, isLoading } = useMovieDetailQuery(movieId ?? "");
  const { data: scheduleData, refetch } = useSchedulesQuery(
    movieId ?? "",
    selectedDate,
  );

  useEffect(() => {
    setSchedules(scheduleData?.data);
  }, [scheduleData, selectedDate]);

  useEffect(() => {
    refetch();
  }, [selectedDate]);

  useEffect(() => {
    // const days: string[] = [];
    // for (let i = 0; i <= 4; i++) {
    //   const date = new Date();
    //   date.setDate(date.getDate() + i);
    //   days.push(date.toISOString().split("T")[0]);
    // }

    setSelectedDate(showDate ?? dayjs().format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    setMovie(data?.data);
    const showDates: string[] = [];

    data?.data?.schedules?.map((s: ScheduleType) => {
      if (!showDates.includes(s?.showDate)) {
        showDates.push(s?.showDate);
      }
    });
    const sortedDates = showDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    setDateList(sortedDates);
    setSelectedDate(sortedDates[0]);
  }, [data]);

  return (
    <div className="min-h-screen bg-background">
      <Skeleton visible={isLoading} height={"100%"}>
        {movie && (
          <div>
            {/* Movie Header */}
            <div className="relative pt-14 pb-8">
              <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Centered Movie Poster */}
                <div className="flex justify-center mb-6">
                  <Image
                    src={movie?.poster?.url}
                    className="!rounded-xl shadow-2xl"
                    h={400}
                    w={300}
                  />
                </div>

                {/* Essential Movie Info */}
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

            {/* Date Selection */}
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
                      className={twMerge(
                        "px-6 py-3 rounded-lg cursor-pointer bg-surface-hover text-text font-medium transition-all duration-200 hover:bg-surface-light hover:scale-105 shadow-sm",
                        selectedDate === item &&
                          "bg-primary text-white hover:!bg-primary hover:!scale-105",
                      )}
                      key={item}
                      onClick={() => setSelectedDate(item)}
                    >
                      {dayjs(item).format("MMM DD")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Showtimes Section */}
            <div className="py-12">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <SeatIcon />
                    <h2 className="text-2xl font-semibold text-text">
                      Available Showtimes
                    </h2>
                  </div>

                  {/* <TextInput
                  placeholder="Search by location..."
                  classNames={{
                    root: "!w-full lg:!w-[350px]",
                    input: twMerge(
                      "!text-text !bg-surface !border !border-surface-hover !rounded-lg !h-[48px] !text-base !pl-12 focus:!border-accent",
                    ),
                  }}
                  leftSection={
                    <IconSearch size={20} color={"var(--color-accent)"} />
                  }
                /> */}
                </div>

                <div className="min-h-[400px]">
                  {schedules?.length > 0 ? (
                    <div className="bg-surface rounded-xl shadow-sm border border-surface-hover">
                      {schedules?.map((item) => (
                        <div
                          key={item?.theatre?.location}
                          // className="bg-surface rounded-xl p-6 shadow-sm border border-surface-hover"
                        >
                          <ScheduleList
                            schedule={item}
                            movie={movie}
                            selectedDate={selectedDate}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <SeatIcon />
                      <div className="text-xl text-muted">
                        No showtimes available for this date
                      </div>
                      <div className="text-sm text-muted mt-2">
                        Please select a different date
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default TicketPlan;
