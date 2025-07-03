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
    cols: number = 8,
    booked: string[] = [],
  ): Seat[] => {
    const seats: Seat[] = [];
    for (let row = 0; row < rows; row++) {
      const rowLabel = String.fromCharCode(65 + row); // A, B, C, ...
      for (let col = 1; col <= cols; col++) {
        const seatId = `${rowLabel}${col}`;
        seats.push({
          id: seatId,
          isBooked: booked.includes(seatId),
        });
      }
    }
    return seats;
  };

  const seats: Seat[] = generateSeats(5, 8, ["A2", "B5", "C3"]);
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
    <div>
      <h2>Select Your Seats</h2>
      <div className="seat-grid">
        {seats.map((seat) => (
          // <button
          //   key={seat.id}
          //   disabled={seat.isBooked}
          //   className={`seat ${
          //     seat.isBooked
          //       ? "booked"
          //       : selectedSeats.includes(seat.id)
          //       ? "selected"
          //       : ""
          //   }`}
          //   onClick={() => handleSeatClick(seat.id)}
          // >
          //   {seat.id}
          // </button>
          <div
            onClick={() => handleSeatClick(seat)}
            className={twMerge(!seat.isBooked && "cursor-pointer")}
          >
            <SeatIcon
              color={
                seat.isBooked
                  ? "var(--color-surface-hover)"
                  : // : selectedSeats.includes(seat.id)
                    // ? "var(--color-primary)"
                    "var(--color-primary)"
              }
              size="50"
              isSelected={selectedSeats.includes(seat.id)}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Selected Seats: {selectedSeats.join(", ") || "None"}</h4>
      </div>
    </div>
  );
};

export default SeatPlan;
