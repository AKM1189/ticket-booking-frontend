import { useMovieDetailQuery } from "@/api/query/user/movieQuery";
import { useSchedulesQuery } from "@/api/query/user/scheduleQuery";
import { SeatIcon } from "@/assets/svgs/SeatIcon";
import ScheduleList from "@/components/user/ticketPlan/ScheduleList";
import TicketPlanModal from "@/components/user/ticketPlan/TicketPlanModal";
import { routes } from "@/routes";
import type { MovieDetailType } from "@/types/MovieTypes";
import { minsToHMin } from "@/utils/timeFormatter";
import { Button, Image, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBadgeCc,
  IconCalendar,
  IconClock,
  IconSearch,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router";
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
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [dateList, setDateList] = useState<string[] | null>(null);
  const [searchParams] = useSearchParams();

  const movieId = searchParams.get("movieId");
  const showDate = searchParams.get("showDate");

  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [schedules, setSchedules] = useState<ShowDetailType[]>([]);

  const { data } = useMovieDetailQuery(movieId ?? "");
  const { data: scheduleData, refetch } = useSchedulesQuery(
    movieId ?? "",
    selectedDate ?? showDate,
  );

  const [opened, { close }] = useDisclosure(false);

  useEffect(() => {
    setSchedules(scheduleData?.data);
  }, [scheduleData, selectedDate]);

  useEffect(() => {
    refetch();
    console.log("selected Date", selectedDate, movieId);
  }, [selectedDate]);

  useEffect(() => {
    const days: string[] = [];
    for (let i = 0; i <= 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split("T")[0]);
    }
    setDateList(days);
    setSelectedDate(showDate ?? "");
  }, []);

  useEffect(() => {
    setMovie(data?.data);
    console.log("data", data);
  }, [data]);

  if (movie)
    return (
      <div className="relative mt-[100px]">
        <div
          className={`relative w-full h-[600px] bg-[url("/movie-bg-6.jpg")] bg-no-repeat bg-cover`}
        >
          <div className="relative w-full h-full bg-background/90 flex flex-col gap-5 justify-center">
            <div className="flex items-center gap-10 relative bottom-20 translate-x-[25%]">
              <Image
                src={movie?.poster?.url}
                className="!rounded-lg"
                h={400}
                w={300}
              />
              <div className="ms-10">
                <div className="text-4xl font-bold mb-5">{movie.title}</div>
                <div className="text-blueGray flex flex-col gap-5">
                  <div>
                    {movie.language?.map((item, index) => (
                      <span key={item}>
                        {item} {index !== movie.language.length - 1 && ","}{" "}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {movie?.genres?.map((item) => (
                      <span
                        key={item.id}
                        className="px-4 py-2 border border-surface-hover rounded-full"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-5 items-center max-md:flex-col">
                    <span className="flex items-center gap-2">
                      <IconCalendar color={"var(--color-blueGray)"} />
                      <span className="mt-1">
                        {dayjs(movie.releaseDate).format("DD-MM-YYYY")}
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <IconClock color={"var(--color-blueGray)"} />
                      <span className="mt-1">
                        {minsToHMin(parseInt(movie.duration))}
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <IconBadgeCc color={"var(--color-blueGray)"} />
                      <span className="mt-1">
                        {movie.subtitle?.map(
                          (item, index) =>
                            `${
                              item +
                              (index !== movie.subtitle.length - 1 ? ", " : "")
                            }`,
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[150px] flex items-center justify-center bg-surface/90">
              <div className="w-[950px] flex items-center justify-center gap-5">
                {dateList?.map((item) => (
                  <div
                    className={twMerge(
                      "w-[200px] h-[50px] rounded-md bg-surface-hover flex justify-center items-center cursor-pointer hover:bg-surface-light transition-colors duration-200 select-none shadow-md",
                      selectedDate === item && "bg-primary",
                    )}
                    key={item}
                    onClick={() => setSelectedDate(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 w-full flex items-center justify-center">
          <div className="w-[950px]">
            <div className="mb-10 flex items-center justify-end">
              <TextInput
                placeholder="Search Location"
                classNames={{
                  root: "!w-[300px]",
                  label: "text-[16px]",
                  input: twMerge(
                    "login-input !text-text !border-0 !border-b !border-surface-hover !w-full !h-[42px] mt-[2px] !text-base !ps-10",
                  ),
                  error: "text-red-500",
                }}
                leftSection={<IconSearch color={"var(--color-accent)"} />}
              />
            </div>
            <div className="min-h-[300px]">
              {schedules?.length > 0 ? (
                <div className="bg-surface mt-10 rounded-md overflow-hidden">
                  {schedules?.map((item) => (
                    <div key={item?.theatre?.location}>
                      <ScheduleList
                        schedule={item}
                        movie={movie}
                        selectedDate={selectedDate}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted">No show time available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default TicketPlan;
