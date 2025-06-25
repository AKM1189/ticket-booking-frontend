import SeatIcon from "@/assets/svgs/SeatsIcon";
import React from "react";

const SeatPlan = () => {
  const rows = 8;
  const cols = 10;
  const seatSize = 50;
  const seats = [];
  const rowGap = 0;
  const colGap = 50;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      seats.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x * (seatSize + colGap),
            top: y * (seatSize + rowGap),
            width: seatSize,
            height: seatSize,
          }}
        >
          <SeatIcon size={seatSize} color="var(--color-primary)" />
        </div>,
      );
    }
  }
  return (
    <div>
      SeatPlan
      <div
        style={{
          position: "relative",
          width: cols * (seatSize + colGap),
          height: rows * (seatSize + rowGap),
        }}
      >
        {seats}
      </div>
    </div>
  );
};

export default SeatPlan;
