import { useState } from "react";
import "@/styles/css/seatStyle.css";
import SeatLists from "@/components/user/ticketPlan/SeatList";
import { Button } from "@mantine/core";
import { NavLink, useParams } from "react-router";
import SeatPlanHeader from "@/components/user/seatPlan/SeatPlanHeader";
import { routes } from "@/routes";

export interface Seat {
  id: string;
  isBooked: boolean;
  price: number;
}
const SeatPlan = () => {
  const { id } = useParams();

  const movie = {
    id: 1,
    title: "ALONE",
    description: "adfasdf",
    duration: "2 hrs 50 mins",
    genres: [
      { id: 2, label: "Adventure" },
      { id: 4, label: "Action" },
    ],
    language: ["English"],
    experience: "2d",
    subtitle: ["Myanmar"],
    releaseDate: "8 Nov, 2025",
    rating: "8.0",
    status: "Now Showing",
    poster: { id: 1, url: "/movie03.jpg" },
    trailerId: "o2T2V1jrLY0",
    photos: [],
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
    seatsPerRow: any[], // seat count for A, B, C, ...
    booked: string[] = [],
  ): Seat[][] => {
    const seatGrid: Seat[][] = [];

    for (let row = 0; row < seatsPerRow.length; row++) {
      // const rowLabel = String.fromCharCode(65 + row); // A, B, C...
      const rowSeats: Seat[] = [];

      for (let col = 1; col <= seatsPerRow[row].seatCount; col++) {
        const seatId = `${seatsPerRow[row].rowLabel}${col}`;
        rowSeats.push({
          id: seatId,
          isBooked: booked.includes(seatId),
          price: seatsPerRow[row].price, // or vary per row if needed
        });
      }

      seatGrid.push(rowSeats);
    }

    return seatGrid;
  };
  const seatGrid = generateSeats(
    [
      {
        rowLabel: "A",
        seatCount: 14,
        price: 5000,
      },
      {
        rowLabel: "B",
        seatCount: 14,
        price: 5000,
      },
      {
        rowLabel: "C",
        seatCount: 14,
        price: 7000,
      },
      {
        rowLabel: "D",
        seatCount: 14,
        price: 7000,
      },
      {
        rowLabel: "E",
        seatCount: 14,
        price: 7000,
      },
      {
        rowLabel: "F",
        seatCount: 14,
        price: 7000,
      },
      {
        rowLabel: "G",
        seatCount: 14,
        price: 10000,
      },
      {
        rowLabel: "H",
        seatCount: 14,
        price: 10000,
      },
    ], // A has 10 seats, B has 12, etc.
    ["A2", "B5", "C3"],
  );
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

  const getTotalPrice = () => {
    return seatGrid
      .flat()
      .filter((seat) => selectedSeats.includes(seat.id))
      .reduce((total, seat) => total + seat.price, 0);
  };
  const numGroups = 3;

  const groupSize = Math.ceil(seatGrid.length / numGroups);

  return (
    <div className="relative">
      <SeatPlanHeader movie={movie} id={id} />
      <div className="mt-32">
        <div className="text-center uppercase text-3xl font-semibold mb-20">
          <hr className="mx-auto text-blueGray w-[200px] mb-3" />
          <div className="inline py-3 px-20 border-b border-blueGray text-blueGray">
            Screen
          </div>
        </div>
        <div className="flex justify-center mb-20">
          <img src="/screen-thumb.png" className="w-[800px]" alt="Screen" />
        </div>

        <div className="grid grid-rows-3 gap-y-0 items-center">
          {[...Array(numGroups)].map((_, groupIndex) => {
            const startRow = groupIndex * groupSize;
            const endRow = startRow + groupSize;
            const rowGroup = seatGrid.slice(startRow, endRow);

            return (
              <div
                key={groupIndex}
                className="flex gap-12 mt-12 justify-center"
              >
                {/* Column 1: First seats */}
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

                {/* Column 2: Middle seats */}
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

                {/* Column 3: Last seats */}
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
        <div className="mt-6 p-5 px-10 bg-surface max-w-[1100px] min-h-[120px] mx-auto flex justify-between items-center rounded-sm">
          <div>
            <h4 className="mb-2">Selected Seats </h4>
            <div className="text-accent text-2xl font-bold max-w-[300px] text-wrap">
              {selectedSeats.join(", ") || "None"}
            </div>
          </div>

          <div>
            <h4 className="mb-2"> Total Price</h4>
            <div className="text-2xl text-accent font-bold">
              {getTotalPrice()} Ks
            </div>
          </div>

          <div>
            <NavLink to={"/" + routes.user.checkout + "/" + id}>
              <Button className="!rounded-full">Proceed</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPlan;
