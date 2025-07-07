import { ReverseSeatIcon } from "@/assets/svgs";
import React, { useState } from "react";
import "@/styles/css/seatStyle.css";
import { twMerge } from "tailwind-merge";
import SeatLists from "@/components/user/ticketPlan/SeatList";
import { Button, Tooltip } from "@mantine/core";
import { useParams } from "react-router";
import dayjs from "dayjs";

export interface Seat {
  id: string;
  isBooked: boolean;
}
const SeatPlan = () => {
  const { id } = useParams();

  const movie = {
    id: 1,
    name: "ALONE",
    duration: "2 hrs 50 mins",
    genres: [
      { id: 2, label: "Adventure" },
      { id: 4, label: "Action" },
    ],
    languages: ["English", "Tamil", "Hindi"],
    subtitle: ["Myanmar"],
    releaseDate: "8 Nov, 2025",
    rating: "8.0",
    status: "Now Showing",
    posterUrl: "/movie03.jpg",
    trailerId: "o2T2V1jrLY0",
    casts: [
      {
        id: 1,
        name: "Aung Kaung Myat",
        role: "Actor",
        imageUrl: null,
      },
      {
        id: 2,
        name: "John Wick",
        role: "Actor",
        imageUrl: null,
      },
      {
        id: 2,
        name: "John Wick",
        role: "Actor",
        imageUrl: null,
      },
    ],
    images: [
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
    ],
    reviews: [
      {
        id: 1,
        username: "Aung Kaung Myat",
        rating: "8.0",
        reviewedDate: "2 days ago",
        review:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, alias! Cum ipsam voluptate molestias aliquam quos, vitae commodi, ex facere magnam, amet nesciunt nisi accusamus libero architecto cupiditate! Culpa possimus ipsa id fugiat odio iusto ea inventore quidem, similique magnam eaque architecto, voluptas voluptatibus, nesciunt maxime molestias laborum eveniet! Quod!",
      },
      {
        id: 2,
        username: "Aung Kaung Myat",
        rating: "8.9",
        reviewedDate: "2 months ago",
        review:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, alias! Cum ipsam voluptate molestias aliquam quos, vitae commodi, ex facere magnam, amet nesciunt nisi accusamus libero architecto cupiditate! Culpa possimus ipsa id fugiat odio iusto ea inventore quidem, similique magnam eaque architecto, voluptas voluptatibus, nesciunt maxime molestias laborum eveniet! Quod!",
      },
    ],
  };
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
    <div className="relative">
      <div
        className={`relative w-full h-[600px] bg-[url("/movie-bg-6.jpg")] bg-no-repeat bg-cover`}
      >
        <div className="relative w-full h-full bg-background/90 flex flex-col gap-5 justify-center">
          <div className="flex justify-center items-center gap-10 relative bottom-20">
            <div className="ms-10">
              <div className="text-6xl font-bold mb-5">
                {movie.name} {id}
              </div>
              <div className="text-blueGray text-center text-xl">
                English - 2D
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full text-center h-[150px] flex items-center justify-between bg-surface/90 px-[150px]">
            <Button>Back</Button>
            <div className="flex gap-2 items-center">
              <div className="uppercase">
                {dayjs().format("ddd, MMM DD YYYY")}
              </div>
              <div>09:40</div>
            </div>
            <div className="text-left">
              <div className="text-lg font-semibold">05:00</div>
              Mins Left
            </div>
          </div>
        </div>
      </div>
      <div className="mt-50">
        <div className="text-center uppercase text-3xl font-semibold mb-20">
          <hr className="mx-auto text-blueGray w-[200px] mb-3" />
          <div className="inline py-3 px-20 border-b border-blueGray">
            Screen
          </div>
        </div>
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
            const endRow =
              rowGroupIndex === 0 ? 2 : rowGroupIndex === 1 ? 6 : 10;
            const rowGroup = seatGrid.slice(startRow, endRow);

            return (
              <div key={rowGroupIndex} className="flex gap-20 justify-center">
                {/* Column 1: First 4 seats */}
                <div className="grid grid-rows-2 gap-y-2">
                  {rowGroup.map((row, i) => (
                    <div key={i} className="grid grid-cols-4">
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
                <div className="grid grid-rows-2 gap-y-2">
                  {rowGroup.map((row, i) => (
                    <div key={i} className="grid grid-cols-6">
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
                <div className="grid grid-rows-2 gap-y-2">
                  {rowGroup.map((row, i) => (
                    <div key={i} className="grid grid-cols-4">
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
    </div>
  );
};

export default SeatPlan;
