import { Card, Text, Group, Loader } from "@mantine/core";
import { type SeatLayoutType } from "@/types/AdminTypes";
import { useCallback, useEffect, useState, type JSX } from "react";
import { twMerge } from "tailwind-merge";
import { useSeatTypeQuery } from "@/api/query/admin/seatTypeQuery";
import { useScheduleByShowDetailQuery } from "@/api/query/admin/scheduleQuery";
import dayjs from "dayjs";
import type { SeatTypeTypes } from "@/types/SeatTypeTypes";
import type { SelectedInfoType, SelectedSeatType } from "./BookingForm";
import io from "socket.io-client";
import { useAuthStore } from "@/store/authStore";

interface SeatLayoutViewerProps {
  layout: SeatLayoutType;
  selectedInfo: SelectedInfoType;
  updateSelectedInfo: <K extends keyof SelectedInfoType>(
    key: K,
    value: SelectedInfoType[K],
  ) => void;
  setSelectedSeats: (value: SelectedSeatType[]) => void;
  selectedSeats: SelectedSeatType[];
  activeStep: number;
}

interface TempSeat {
  seatId: string;
  userId: string;
  // expiresAt: number; // timestamp when the 2 minutes expire
}
const socket = io("http://localhost:3000");
const SeatLayoutViewer = ({
  layout,
  selectedInfo,
  updateSelectedInfo,
  selectedSeats,
  setSelectedSeats,
  activeStep,
}: SeatLayoutViewerProps) => {
  const [seatTypeList, setSeatTypeList] = useState<SeatTypeTypes[]>([]);
  // const [socket, setSocket] = useState<any>(null);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [tempSeats, setTempSeats] = useState<any[]>([]);
  const [resetTimer, setResetTimer] = useState(200);

  // const { movieId, theatreId, screenId, showDate, showTime } = showDetail;
  const { data: seatTypeData } = useSeatTypeQuery();
  const { user } = useAuthStore();

  const {
    movie,
    theatre,
    screen,
    schedule,
    seats: selectedSeatList,
    showDate,
    showTime,
  } = selectedInfo;

  const {
    data: selectedSchedule,
    isLoading,
    refetch,
  } = useScheduleByShowDetailQuery(
    movie?.id.toString() || "",
    theatre?.id.toString() || "",
    screen?.id.toString() || "",
    dayjs(showDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    showTime || "",
  );

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      console.log("socket connected");
      setIsConnected(true);

      // socket.on("booked seats", (booked: any[]) => {
      //   setBookedSeats(booked);
      // });

      // socket.on("update temp seats", (temp: any[]) => {
      //   const updateList = selectedSeats?.filter((s) =>
      //     temp.some((t) => t.userId === user?.id && t?.seatId === s?.label),
      //   );
      //   updateSelectedInfo("seats", updateList);
      //   setTempSeats(temp);
      // });

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
      const newList = selectedInfo.seats?.map((seat) => {
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

      updateSelectedInfo("seats", filteredList);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedInfo.seats, tempSeats]);

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
      updateSelectedInfo("seats", updateList);
      setTempSeats(temp);
    });
    socket.emit("join schedule", String(schedule?.id));

    return () => {
      socket.off("booked seats");
      socket.off("update temp seats");
    };
  }, [socket, schedule, selectedSeats]);

  useEffect(() => {
    if (selectedSchedule) {
      updateSelectedInfo("schedule", selectedSchedule?.data);
    }
  }, [selectedSchedule]);

  useEffect(() => {
    refetch();
  }, [selectedInfo.showTime]);

  useEffect(() => {
    setSeatTypeList(seatTypeData?.data);
  }, [seatTypeData]);

  const addSeatsToBooking = (seatId: string, selectedType: any) => {
    const seatExists = selectedSeatList.find((item) => item.label === seatId);
    const typeDetail = schedule?.priceList?.find(
      (item) => item.id === selectedType?.seatType?.id,
    );
    const newSeat = {
      label: seatId,
      type: selectedType?.seatType?.name,
      price: typeDetail?.price || "",
      countDown: 120,
    };

    if (seatExists) {
      const newList = selectedSeatList.filter(
        (seat) => seat.label !== seatExists.label,
      );
      setSelectedSeats(newList);
      updateSelectedInfo("seats", newList);

      socket.emit("deselect seat", {
        scheduleId: schedule?.id,
        seatId,
        userId: user?.id,
      });
    } else {
      if (selectedSeatList?.length <= 10) {
        const newList = [...selectedSeatList, newSeat];
        console.log("new list", newList);
        setSelectedSeats(newList);
        updateSelectedInfo("seats", newList);

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

        const selectedSeat =
          tempSeats?.length > 0 &&
          tempSeats?.some(
            (s: any) => s?.userId === user?.id && s?.seatId === seatId,
          );

        // selectedSeatList?.find(
        //   (seat) => seat?.label === seatId,
        // );
        seats.push(
          <div key={seatId} className="flex items-center">
            <div
              className={twMerge(
                "w-8 h-8 text-xs font-[500] flex items-center justify-center rounded border-2  border-standard text-standard",
                selectedSeatList?.length <= 10 &&
                  "hover:bg-accent hover:text-black hover:border-accent cursor-pointer transition-color duration-100",
                isDisabled &&
                  "bg-red-300 border-red-300 text-red-600 hover:bg-red-300 hover:text-red-600 cursor-not-allowed",
                selectedType?.seatType?.name === "Premium" &&
                  " border-premium text-premium",
                selectedType?.seatType?.name === "VIP" && "border-vip text-vip",
                selectedSeat && "bg-accent text-black border-accent",
                isTemp &&
                  "bg-temp text-text/50 hover:text-text hover:bg-darkGray cursor-default pointer-events-none",
                isBooked &&
                  "bg-booked border-booked text-text/50 hover:text-text hover:bg-darkGray cursor-default pointer-events-none",
              )}
              title={`Seat ${seatId} ${
                isDisabled ? "(Disabled)" : "(Available)"
              }`}
              onClick={() => addSeatsToBooking(seatId, selectedType)}
            >
              {seatId}
            </div>
            {hasAisleAfter && <div className="w-4" />}
          </div>,
        );
      }

      rows.push(
        <div key={row} className="flex items-center gap-1 mb-1 select-none">
          <div className="flex gap-1 ">{seats}</div>
        </div>,
      );
    }

    return rows;
  }, [layout, tempSeats, selectedSeatList, schedule]);

  const getSeatLabel = (typeName: string): string => {
    const seatType = schedule?.priceList?.find(
      (item) => item.name === typeName,
    );
    if (seatType) {
      return `${seatType.name} ($${seatType.price})`;
    }
    return typeName;
  };

  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Loader type="dots" size={40} />
      </div>
    );
  }

  return (
    <Card padding="lg" radius="md" withBorder className="dashboard-bg">
      <Group justify="space-between" mb="md">
        <Group gap="md">
          <Group gap="xs">
            <div className="w-4 h-4 border-2 border-standard rounded"></div>
            <Text size="xs">{getSeatLabel("Standard")}</Text>
          </Group>
          <Group gap="xs">
            <div className="w-4 h-4 border-2 border-premium rounded"></div>
            <Text size="xs">{getSeatLabel("Premium")}</Text>
          </Group>
          <Group gap="xs">
            <div className="w-4 h-4 border-2 border-vip rounded"></div>
            <Text size="xs">{getSeatLabel("VIP")}</Text>
          </Group>
        </Group>
        <div>Reset Timer - {resetTimer}</div>
      </Group>

      <div className="bg-surface-hover p-4 rounded-lg">
        <div className="text-center mb-4 w-full">
          <div className="font-semibold text-text w-full h-[30px] rounded-lg inline-block select-none">
            <div className="mt-1">SCREEN</div>
          </div>
        </div>

        <div className="max-w-[400px] mx-auto overflow-x-auto p-2">
          <div className="">{generateSeatGrid()}</div>
        </div>
      </div>
    </Card>
  );
};

export default SeatLayoutViewer;
