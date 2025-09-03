import { ReverseSeatIcon } from "@/assets/svgs/SeatIcon";
import type { Seat } from "@/pages/user/SeatPlan";
import { Tooltip } from "@mantine/core";
import { twMerge } from "tailwind-merge";

interface SeatListType {
  seat: Seat;
  selectedSeats: string[];
  handleSeatClick: (seat: Seat) => void;
}
const SeatLists = ({ seat, selectedSeats, handleSeatClick }: SeatListType) => {
  return (
    <Tooltip
      label={
        <div>
          {seat.price}
          <div>kyats</div>
        </div>
      }
      arrowOffset={20}
      arrowSize={8}
      withArrow
      hidden={seat?.isBooked}
      classNames={{
        tooltip: "!bg-surface-light !text-text font-semibold",
      }}
    >
      <div
        key={seat.id}
        onClick={() => handleSeatClick(seat)}
        className={twMerge("relative", !seat.isBooked && "cursor-pointer")}
      >
        <ReverseSeatIcon
          color={
            seat.isBooked
              ? "var(--color-background)"
              : selectedSeats.includes(seat.id)
              ? "var(--color-surface-hover)"
              : "var(--color-surface)"
          }
          fill={
            seat.isBooked
              ? "#152145"
              : selectedSeats.includes(seat.id)
              ? "var(--color-accent)"
              : "var(--color-surface-hover)"
          }
          size="60"
          isSelected={selectedSeats.includes(seat.id)}
        />
        {!seat.isBooked && (
          <div
            className={twMerge(
              "text-center absolute top-3 w-full text-xs z-99 select-none",
              selectedSeats.includes(seat.id)
                ? "text-background"
                : "text-blueGray",
            )}
          >
            {" "}
            {seat.id}
          </div>
        )}
      </div>
    </Tooltip>
  );
};

export default SeatLists;
