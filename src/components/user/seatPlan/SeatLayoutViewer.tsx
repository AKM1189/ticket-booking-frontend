import { Card, Text, Alert } from "@mantine/core";
import { type SeatLayoutType } from "@/types/AdminTypes";
import { useCallback, useEffect, useState, type JSX } from "react";
import { twMerge } from "tailwind-merge";
import io from "socket.io-client";
import { useAuthStore } from "@/store/authStore";
import type { SelectedSeatType } from "@/pages/user/SeatPlan";
import type { ScheduleWithSeatList } from "@/types/ScheduleTypes";
import { IconInfoCircle } from "@tabler/icons-react";
import SeatLists from "./SeatList";
import SeatLegend from "./SeatLegend";

interface SeatLayoutViewerProps {
  layout: SeatLayoutType;
  schedule: ScheduleWithSeatList;
  setSelectedSeats: (value: SelectedSeatType[]) => void;
  selectedSeats: SelectedSeatType[];
}

export const socket = io(import.meta.env.VITE_BASE_URL);
const SeatLayoutViewer = ({
  layout,
  schedule,
  selectedSeats,
  setSelectedSeats,
}: SeatLayoutViewerProps) => {
  // const [socket, setSocket] = useState<any>(null);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [tempSeats, setTempSeats] = useState<any[]>([]);

  const { user } = useAuthStore();

  const { screen } = schedule;

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      console.log("socket connected");
      setIsConnected(true);

      if (schedule) {
        socket.emit("join schedule", String(schedule?.id));
      }
    }

    function onDisconnect() {
      console.log("socket disconnected");

      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // updateSelectedInfo("seats", tempSeats);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newList = selectedSeats.map((seat) => {
        // Find the corresponding temp seat for this schedule
        const temp = tempSeats?.find((s) => s.seatId === seat.label);

        if (temp) {
          const remaining = Math.max(
            0,
            Math.ceil((temp.expiresAt - Date.now()) / 1000),
          );

          return { ...seat, countDown: remaining, expiresAt: temp.expiresAt };
        }

        // If seat is no longer in tempSeats, treat it as expired
        return { ...seat, countDown: 0, expiresAt: Date.now() };
      });

      // Filter out seats whose countdown reached 0
      const filteredList = newList?.filter((seat) => seat.countDown > 0);

      setSelectedSeats(filteredList);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedSeats, tempSeats]);

  useEffect(() => {
    if (!socket || !schedule) return;

    socket.on("booked seats", (booked: any[]) => {
      setBookedSeats(booked);
    });

    socket.on("update temp seats", (temp: any[]) => {
      const updateList = selectedSeats?.filter((s) =>
        temp.some((t) => t.userId === user?.id && t?.seatId === s?.label),
      );
      console.log("use.....temp", updateList);
      console.log("selected seats", selectedSeats);
      // setSelectedSeats(updateList);
      setTempSeats(temp);
    });
    socket.emit("join schedule", String(schedule?.id));

    return () => {
      socket.off("booked seats");
      socket.off("update temp seats");
    };
  }, [socket, schedule, selectedSeats]);

  const addSeatsToBooking = (seatId: string, selectedType: any) => {
    const seatExists = selectedSeats.find((item) => item.label === seatId);
    const typeDetail = schedule?.priceList?.find(
      (item) => item.id === selectedType?.seatType?.id,
    );
    const newSeat = {
      label: seatId,
      type: selectedType?.seatType?.name,
      price: typeDetail?.price || "",
      countDown: 300,
    };

    if (seatExists) {
      const newList = selectedSeats.filter(
        (seat) => seat.label !== seatExists.label,
      );
      setSelectedSeats(newList);
      setSelectedSeats(newList);

      socket.emit("deselect seat", {
        scheduleId: schedule?.id,
        seatId,
        userId: user?.id,
      });
    } else {
      if (selectedSeats?.length < 10) {
        const newList = [...selectedSeats, newSeat];
        setSelectedSeats(newList);
        setSelectedSeats(newList);

        socket.emit("select seat", {
          scheduleId: schedule?.id,
          seatId,
          userId: user?.id,
        });
      }
    }
  };
  const generateSeatGrid = useCallback(() => {
    const rows: JSX.Element[] = [];
    const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let row = 0; row < layout.rows; row++) {
      const rowLabel = rowLabels[row];
      const seats: JSX.Element[] = [];

      const selectedType: any = screen?.seatTypes?.find((item) => {
        return item?.seatList?.find((i) => i === rowLabel);
      });
      for (let seat = 1; seat <= layout.seatsPerRow; seat++) {
        const seatId = `${rowLabel}${seat}`;
        const isDisabled = layout?.disabledSeats.includes(seatId);
        const hasAisleAfter = layout.aisles.includes(seat);
        const isBooked =
          schedule?.bookedSeats?.includes(seatId) ||
          bookedSeats?.includes(seatId);

        const isTemp =
          tempSeats?.length > 0 &&
          tempSeats?.some(
            (s: any) => s?.userId !== user?.id && s?.seatId === seatId,
          );

        // const selectedSeat =
        //   tempSeats?.length > 0 &&
        //   tempSeats?.some(
        //     (s: any) => s?.userId === user?.id && s?.seatId === seatId,
        //   );

        // selectedSeatList?.find(
        //   (seat) => seat?.label === seatId,
        // );
        seats.push(
          <div key={seatId} className="flex items-center">
            <div
              className={twMerge(
                (isDisabled || isTemp || isBooked) &&
                  "cursor-default pointer-events-none",
              )}
              title={`Seat ${seatId} ${
                isDisabled ? "(Disabled)" : "(Available)"
              }`}
              onClick={() => addSeatsToBooking(seatId, selectedType)}
            >
              {/* {seatId} */}
              <SeatLists
                seat={{ isBooked, id: seatId, price: 0 }}
                isSelected={selectedSeats.some((seat) => seat.label === seatId)}
                isDisabled={isDisabled}
                isBooked={isBooked}
                isTemp={isTemp}
                seatType={selectedType}
              />
            </div>
            {hasAisleAfter && <div className="w-10" />}
          </div>,
        );
      }

      rows.push(
        <div
          key={row}
          className="seat-row flex items-center gap-1 mb-1 select-none"
        >
          <div className="flex gap-1">{seats}</div>
        </div>,
      );
    }

    return rows;
  }, [layout, tempSeats, selectedSeats, schedule]);

  // const getSeatLabel = (typeName: string): string => {
  //   const seatType = schedule?.priceList?.find(
  //     (item) => item.name === typeName,
  //   );
  //   if (seatType) {
  //     return `${seatType.name} ($${seatType.price})`;
  //   }
  //   return typeName;
  // };

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-[300px] flex items-center justify-center">
  //       <Loader type="dots" size={40} />
  //     </div>
  //   );
  // }

  // const stats = getSeatStats();

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      {!isConnected && (
        <Alert
          icon={<IconInfoCircle size={16} />}
          title="Connection Status"
          color="orange"
          className="!bg-surface !border-surface-hover !text-text"
        >
          Reconnecting to live seat updates...
        </Alert>
      )}

      {/* Seat Legend */}
      <SeatLegend priceList={schedule?.priceList} />

      {/* Seat Grid */}
      <Card padding="xl" className="!bg-surface !text-text">
        <div className="text-center mb-8">
          <Text size="lg" fw={600} className="!text-text mb-2">
            Select Your Seats
          </Text>
          <Text size="sm" className="text-muted">
            Maximum 10 seats can be selected. Click on available seats to
            select/deselect.
          </Text>
        </div>

        {/* <div className="flex justify-center">
          <div className="seat-grid-container inline-flex flex-col items-center justify-center space-y-2">
            {generateSeatGrid()}
          </div>
        </div> */}
        <div className="max-sm:max-w-full max-w-[1100px] mx-auto overflow-x-auto p-2">
          <div className="">{generateSeatGrid()}</div>
        </div>
      </Card>
    </div>
  );
};

export default SeatLayoutViewer;
