import { useMemo, useCallback, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import TicketPlanModal from "./TicketPlanModal";
import type { MovieDetailType } from "@/types/MovieTypes";
import { IconMapPinFilled } from "@tabler/icons-react";
import type { ShowDetailType } from "@/pages/user/TicketPlan";
import dayjs from "dayjs";

type ScheduleListType = {
  schedule: ShowDetailType;
  movie: MovieDetailType | null;
  selectedDate: string;
};

const ScheduleList = ({ schedule, movie, selectedDate }: ScheduleListType) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [showTime, setShowTime] = useState("");

  // Memoize the schedule click handler to prevent recreation on every render
  const handleScheduleClick = useCallback(
    (item: string) => {
      open();
      setShowTime(item);
    },
    [open],
  );

  // Memoize schedule elements to prevent recreation on every render
  // const scheduleElements = useMemo(() => {
  //   return schedule?.showTimes?.map((item: string, index: number) => (
  //     <div
  //       className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-colors duration-200 select-none"
  //       onClick={() => handleScheduleClick(item)}
  //       key={`${item}-${index}`}
  //     >
  //       {dayjs(`${selectedDate} ${item}`).format("hh:mm A")}
  //     </div>
  //   ));
  // }, [schedule, handleScheduleClick]);

  return (
    <div>
      <div className="group w-full h-[100px] flex items-center border-b border-surface-hover">
        <div className="w-[400px] h-full border-r border-surface-hover flex items-center justify-between px-10">
          <div>{schedule?.theatre?.location}</div>
          <div className="bg-surface-hover transition-colors duration-200 group-hover:bg-primary rounded-full p-2">
            <IconMapPinFilled color="var(--color-blueGray)" />
          </div>
        </div>
        <div className="flex-1 flex gap-10 px-10">
          <div
            className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-colors duration-200 select-none"
            onClick={() => handleScheduleClick(schedule?.showTime)}
          >
            {dayjs(`${selectedDate} ${schedule?.showTime}`).format("hh:mm A")}
          </div>
        </div>
      </div>
      <TicketPlanModal
        movie={movie}
        schedule={schedule}
        opened={opened}
        close={close}
        showDate={selectedDate}
        showTime={showTime}
      />
    </div>
  );
};

export default ScheduleList;
