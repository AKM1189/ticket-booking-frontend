import { useMemo, useCallback } from "react";
import { LocationFillIcon } from "@/assets/svgs";
import { useDisclosure } from "@mantine/hooks";
import TicketPlanModal from "./TicketPlanModal";
import type { MovieDetailType } from "@/types/MovieTypes";

type ScheduleListType = {
  location: string;
  schedules: string[];
  movie: MovieDetailType;
};

const ScheduleList = ({ location, schedules, movie }: ScheduleListType) => {
  const [opened, { open, close }] = useDisclosure(false);

  // Memoize the schedule click handler to prevent recreation on every render
  const handleScheduleClick = useCallback(() => {
    open();
  }, [open]);

  // Memoize schedule elements to prevent recreation on every render
  const scheduleElements = useMemo(() => {
    return schedules?.map((item: string, index: number) => (
      <div
        className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300 select-none"
        onClick={handleScheduleClick}
        key={`${item}-${index}`}
      >
        {item}
      </div>
    ));
  }, [schedules, handleScheduleClick]);

  return (
    <div>
      <div className="group w-full h-[100px] flex items-center border-b border-surface-hover">
        <div className="w-[400px] h-full border-r border-surface-hover flex items-center justify-between px-10">
          <div>{location}</div>
          <div className="bg-surface-hover transition-300 group-hover:bg-primary rounded-full p-2">
            <LocationFillIcon color="var(--color-blueGray)" />
          </div>
        </div>
        <div className="flex-1 flex gap-10 px-10">{scheduleElements}</div>
      </div>
      <TicketPlanModal movie={movie} opened={opened} close={close} />
    </div>
  );
};

export default ScheduleList;
