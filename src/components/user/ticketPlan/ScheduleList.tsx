import { useState, useCallback } from "react";
import { useDisclosure } from "@mantine/hooks";
import TicketPlanModal from "./TicketPlanModal";
import type { MovieDetailType } from "@/types/MovieTypes";
import { IconMapPinFilled } from "@tabler/icons-react";
import type { ShowDetailType } from "@/pages/user/TicketPlan";
import dayjs from "dayjs";

type ScheduleListType = {
  location: string;
  shows: ShowDetailType[];
  movie: MovieDetailType | null;
  selectedDate: string;
};

const ScheduleList = ({
  location,
  shows,
  movie,
  selectedDate,
}: ScheduleListType) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [showTime, setShowTime] = useState("");

  const handleScheduleClick = useCallback(
    (time: string) => {
      setShowTime(time);
      open();
    },
    [open],
  );

  return (
    <div className="group w-full border-b border-search-bg">
      <div className="flex items-center h-[100px]">
        {/* Theatre Info */}
        <div className="w-[400px] h-full border-r border-search-bg flex items-center justify-between px-10">
          <div className="font-medium">{location}</div>
          <div className="bg-search-bg rounded-full p-2">
            <IconMapPinFilled color="var(--color-blueGray)" />
          </div>
        </div>

        {/* Horizontal Showtimes */}
        <div className="flex-1 flex flex-wrap gap-6 px-10">
          {shows.map((show) => (
            <div
              key={show.id}
              className="w-24 h-10 bg-search-bg flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 select-none"
              onClick={() => handleScheduleClick(show.showTime)}
            >
              {dayjs(`${selectedDate} ${show.showTime}`).format("hh:mm A")}
            </div>
          ))}
        </div>
      </div>

      <TicketPlanModal
        movie={movie}
        schedule={shows[0]} // representative schedule
        opened={opened}
        close={close}
        showDate={selectedDate}
        showTime={showTime}
      />
    </div>
  );
};

export default ScheduleList;
