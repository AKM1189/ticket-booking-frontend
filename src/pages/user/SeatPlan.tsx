import { ReverseSeatIcon } from "@/assets/svgs";
import React, { useState } from "react";
import "@/styles/css/seatStyle.css";
import { twMerge } from "tailwind-merge";
import SeatLists from "@/components/user/ticketPlan/SeatList";
import { Tooltip } from "@mantine/core";

export interface Seat {
  id: string;
  isBooked: boolean;
}
const SeatPlan = () => {
  const generateSeats = (
    rows: number = 8,
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

  const seatGrid = generateSeats(8, 14, ["A2", "B5", "C3"]);
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
  console.log("seat grid", seatGrid);
  return (
    <div className="mt-50">
      <div className="flex justify-center mb-20">
        <img src="/screen-thumb.png" className="w-[800px]" alt="Screen" />
      </div>

      {/* <div className="flex flex-col gap-3 items-center">
        {seatGrid.map((row, rowIndex) => (
          <div key={rowIndex} className=" flex gap-10">
            <div className="grid grid-cols-4 gap-x-3 gap-y-6">
              {row.slice(0, 4).map((seat) => (
                <SeatLists
                  seat={seat}
                  selectedSeats={selectedSeats}
                  handleSeatClick={handleSeatClick}
                />
              ))}
            </div>

            <div className="grid grid-cols-6 gap-x-3 gap-y-6">
              {row.slice(4, 10).map((seat) => (
                <SeatLists
                  seat={seat}
                  selectedSeats={selectedSeats}
                  handleSeatClick={handleSeatClick}
                />
              ))}
            </div>

            <div className="grid grid-cols-4 gap-x-3 gap-y-6">
              {row.slice(10, 14).map((seat) => (
                <SeatLists
                  seat={seat}
                  selectedSeats={selectedSeats}
                  handleSeatClick={handleSeatClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div> */}

      <div className="grid grid-rows-3 gap-y-0 items-center">
        {/* 3 rows: front, middle, back */}
        {[0, 1, 2].map((rowGroupIndex) => {
          // slice the seatGrid into groups: rows 0-1, 2, 3-4
          const startRow =
            rowGroupIndex === 0 ? 0 : rowGroupIndex === 1 ? 2 : 6;
          const endRow = rowGroupIndex === 0 ? 2 : rowGroupIndex === 1 ? 6 : 10;
          const rowGroup = seatGrid.slice(startRow, endRow);

          return (
            <div key={rowGroupIndex} className="flex gap-20 justify-center">
              {/* Column 1: First 4 seats */}
              <div className="grid grid-rows-2 gap-y-4">
                {rowGroup.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-x-5 gap-y-3">
                    {row.slice(0, 4).map((seat) => (
                      <SeatLists
                        key={seat.id}
                        seat={seat}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Column 2: Middle 6 seats */}
              <div className="grid grid-rows-2 gap-y-4">
                {rowGroup.map((row, i) => (
                  <div key={i} className="grid grid-cols-6 gap-x-5 gap-y-3">
                    {row.slice(4, 10).map((seat) => (
                      <SeatLists
                        key={seat.id}
                        seat={seat}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Column 3: Last 4 seats */}
              <div className="grid grid-rows-2 gap-y-4">
                {rowGroup.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-x-5 gap-y-3">
                    {row.slice(10, 14).map((seat) => (
                      <SeatLists
                        key={seat.id}
                        seat={seat}
                        selectedSeats={selectedSeats}
                        handleSeatClick={handleSeatClick}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Tooltip label="7500">
        <button>Hello</button>
      </Tooltip>
      <div className="mt-6 text-center">
        <h4>Selected Seats: {selectedSeats.join(", ") || "None"}</h4>
      </div>
    </div>
  );
};

export default SeatPlan;
