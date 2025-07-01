import SeatIcon from "@/assets/svgs/SeatsIcon";
import React from "react";

const SeatPlan = () => {
  const rows = 8;
  const cols = 10;
  const seatSize = 50;
  const seats = [];
  const rowGap = 0;
  const colGap = 50;

  // for (let y = 0; y < rows; y++) {
  //   for (let x = 0; x < cols; x++) {
  //     seats.push(
  //       <div
  //         key={`${x}-${y}`}
  //         style={{
  //           position: "absolute",
  //           left: x * (seatSize + colGap),
  //           top: y * (seatSize + rowGap),
  //           width: seatSize,
  //           height: seatSize,
  //         }}
  //       >
  //         <SeatIcon size={seatSize} color="var(--color-primary)" />
  //       </div>,
  //     );
  //   }
  // }
  return (
    <div>Seat Plan</div>
    // <div className="relative">
    //   <div
    //     className={`relative w-full h-[600px] bg-[url("/movie-bg-3.jpg")] bg-no-repeat bg-cover`}
    //   >
    //     <div className="relative w-full h-full bg-background/70 flex flex-col gap-5 justify-center">
    //       <div className="flex items-center justify-center gap-10 relative bottom-20">
    //         <div>
    //           <div className="text-6xl font-bold mb-5">Venus</div>
    //           <div>English - 2D</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // {
    //   /* SeatPlan
    //   <div
    //     style={{
    //       position: "relative",
    //       width: cols * (seatSize + colGap),
    //       height: rows * (seatSize + rowGap),
    //     }}
    //   >
    //     {seats}
    //   </div> */
    // }
    // </div>
  );
};

export default SeatPlan;
