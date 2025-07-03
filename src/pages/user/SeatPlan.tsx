import SeatIcon from "@/assets/svgs/SeatsIcon";
import React, { useState } from "react";
import "@/styles/css/seatStyle.css";
import { twMerge } from "tailwind-merge";

const SeatPlan = () => {
  interface Seat {
    id: string;
    isBooked: boolean;
  }

  const generateSeats = (
    rows: number = 5,
    cols: number = 14, // 4 + 6 + 4
    booked: string[] = [],
  ): Seat[][] => {
    const seatGrid: Seat[][] = [];
    for (let row = 0; row < rows; row++) {
      const rowLabel = String.fromCharCode(65 + row); // A, B, C, ...
      const rowSeats: Seat[] = [];
      for (let col = 1; col <= cols; col++) {
        const seatId = `${rowLabel}${col}`;
        rowSeats.push({
          id: seatId,
          isBooked: booked.includes(seatId),
        });
      }
      seatGrid.push(rowSeats);
    }
    return seatGrid;
  };

  const seatGrid = generateSeats(5, 14, ["A2", "B5", "C3"]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (!seat.isBooked) {
      setSelectedSeats((prev) =>
        prev.includes(seat.id)
          ? prev.filter((id) => id !== seat.id)
          : [...prev, seat.id],
      );
    }
  };

  return (
    <div className="mt-50">
      <div className="flex justify-center mb-20">
        <img src="/screen-thumb.png" className="w-[800px]" alt="Screen" />
      </div>

      <div className="flex flex-col gap-3 items-center">
        {seatGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-10">
            {/* Block 1: First 4 seats */}
            <div className="grid grid-cols-4 gap-x-3 gap-y-6">
              {row.slice(0, 4).map((seat) => (
                <div
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  className={twMerge(
                    "relative",
                    !seat.isBooked && "cursor-pointer",
                  )}
                >
                  <SeatIcon
                    color={
                      seat.isBooked || selectedSeats.includes(seat.id)
                        ? "var(--color-surface-hover)"
                        : "var(--color-surface)"
                    }
                    fill={
                      seat.isBooked
                        ? "#152145"
                        : selectedSeats.includes(seat.id)
                        ? "var(--color-primary)"
                        : "var(--color-surface-hover)"
                    }
                    size="50"
                    isSelected={selectedSeats.includes(seat.id)}
                  />
                  {!seat.isBooked && (
                    <div
                      className={twMerge(
                        "text-center absolute top-3 w-full text-xs z-99 select-none",
                        selectedSeats.includes(seat.id)
                          ? "text-white"
                          : "text-blueGray",
                      )}
                    >
                      {" "}
                      {seat.id}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Block 2: Middle 6 seats */}
            <div className="grid grid-cols-6 gap-x-3 gap-y-6">
              {row.slice(4, 10).map((seat) => (
                <div
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  className={twMerge(
                    "relative",
                    !seat.isBooked && "cursor-pointer",
                  )}
                >
                  <SeatIcon
                    color={
                      seat.isBooked || selectedSeats.includes(seat.id)
                        ? "var(--color-surface-hover)"
                        : "var(--color-surface)"
                    }
                    fill={
                      seat.isBooked
                        ? "#152145"
                        : selectedSeats.includes(seat.id)
                        ? "var(--color-primary)"
                        : "var(--color-surface-hover)"
                    }
                    size="50"
                    isSelected={selectedSeats.includes(seat.id)}
                  />
                  {!seat.isBooked && (
                    <div
                      className={twMerge(
                        "text-center absolute top-3 w-full text-xs z-99 select-none",
                        selectedSeats.includes(seat.id)
                          ? "text-white"
                          : "text-blueGray",
                      )}
                    >
                      {" "}
                      {seat.id}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Block 3: Last 4 seats */}
            <div className="grid grid-cols-4 gap-x-3 gap-y-6">
              {row.slice(10, 14).map((seat) => (
                <div
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  className={twMerge(
                    "relative",
                    !seat.isBooked && "cursor-pointer",
                  )}
                >
                  <SeatIcon
                    color={
                      seat.isBooked || selectedSeats.includes(seat.id)
                        ? "var(--color-surface-hover)"
                        : "var(--color-surface)"
                    }
                    fill={
                      seat.isBooked
                        ? "#152145"
                        : selectedSeats.includes(seat.id)
                        ? "var(--color-primary)"
                        : "var(--color-surface-hover)"
                    }
                    size="50"
                    isSelected={selectedSeats.includes(seat.id)}
                  />
                  {!seat.isBooked && (
                    <div
                      className={twMerge(
                        "text-center absolute top-3 w-full text-xs z-99 select-none",
                        selectedSeats.includes(seat.id)
                          ? "text-white"
                          : "text-blueGray",
                      )}
                    >
                      {" "}
                      {seat.id}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <h4>Selected Seats: {selectedSeats.join(", ") || "None"}</h4>
      </div>
    </div>
  );
};

export default SeatPlan;
