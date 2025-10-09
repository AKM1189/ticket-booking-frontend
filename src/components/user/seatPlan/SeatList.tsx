import { ReverseSeatIcon } from "@/assets/svgs/SeatIcon";
import type { Seat } from "@/pages/user/SeatPlan";
import { Tooltip } from "@mantine/core";
import { twMerge } from "tailwind-merge";

interface SeatListType {
  seat: Seat;
  isSelected: boolean;
  isDisabled: boolean;
  isBooked: boolean;
  isTemp: boolean;
  seatType: any;
}

const SeatLists = ({
  seat,
  isSelected,
  isDisabled,
  isBooked,
  isTemp,
  seatType,
}: SeatListType) => {
  const getSeatColors = () => {
    const seatTypeName = seatType?.seatType?.name;

    // Define elegant color schemes for different seat types
    const colorSchemes = {
      VIP: {
        available: { fill: "var(--color-user-vip)", stroke: "#fbbf24" }, // Deep purple with gold border
        selected: { fill: "#fbbf24", stroke: "#f59e0b" },
        disabled: { fill: "#374151", stroke: "#6b7280" },
        booked: { fill: "var(--color-surface-light", stroke: "#4b5563" },
        temp: { fill: "#991b1b", stroke: "#f87171" },
      },
      Premium: {
        available: { fill: "var(--color-user-premium)", stroke: "#34d399" }, // Deep emerald with mint border
        // selected: { fill: "#10b981", stroke: "#6ee7b7" },
        selected: { fill: "#fbbf24", stroke: "#f59e0b" },

        disabled: { fill: "#374151", stroke: "#6b7280" },
        booked: { fill: "var(--color-surface-light", stroke: "#4b5563" },
        temp: { fill: "#991b1b", stroke: "#f87171" },
      },
      Standard: {
        available: { fill: "var(--color-user-standard)", stroke: "#60a5fa" }, // Rich blue with sky border
        // selected: { fill: "#3b82f6", stroke: "#93c5fd" },
        selected: { fill: "#fbbf24", stroke: "#f59e0b" },

        disabled: { fill: "#374151", stroke: "#6b7280" },
        booked: { fill: "var(--color-surface-light", stroke: "#4b5563" },
        temp: { fill: "#991b1b", stroke: "#f87171" },
      },
    };

    const scheme =
      colorSchemes[seatTypeName as keyof typeof colorSchemes] ||
      colorSchemes.Standard;

    if (isBooked) return scheme.booked;
    if (isTemp) return scheme.temp;
    if (isSelected) return scheme.selected;
    if (isDisabled) return scheme.disabled;
    return scheme.available;
  };

  const colors = getSeatColors();
  const seatTypeName = seatType?.seatType?.name || "Standard";
  const price = seatType?.price || seat.price;

  return (
    <div
      className={twMerge(
        "seat-container relative",
        !isBooked && !isTemp && !isDisabled && "cursor-pointer",
        isDisabled && "disabled",
        isBooked && "booked",
        isTemp && "temp-reserved",
        isSelected && "selected",
      )}
    >
      <ReverseSeatIcon
        color={"var(--color-surface)"}
        fill={colors.fill}
        size="55"
        isSelected={isSelected}
      />

      {/* Seat ID Label */}
      <div
        className={twMerge(
          "absolute inset-0 flex items-center justify-center text-xs font-medium select-none pointer-events-none",
          isSelected ? "text-gray-900" : "text-gray-300",
          isBooked && "text-gray-500",
          isTemp && "text-red-300",
        )}
      >
        {!isBooked && seat.id}
      </div>

      {/* Status indicators */}
      {isBooked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">✕</span>
          </div>
        </div>
      )}

      {isTemp && (
        <div className="absolute -top-1 -right-1">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default SeatLists;
