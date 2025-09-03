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
}

const SeatLayoutViewer = ({
  layout,
  selectedInfo,
  updateSelectedInfo,
}: SeatLayoutViewerProps) => {
  const [seatTypeList, setSeatTypeList] = useState<SeatTypeTypes[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [tempSeats, setTempSeats] = useState<any[]>([]);

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
    isFetching,
    refetch,
  } = useScheduleByShowDetailQuery(
    movie?.id.toString() || "",
    theatre?.id.toString() || "",
    screen?.id.toString() || "",
    dayjs(showDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    showTime || "",
  );

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    const updatedList = selectedSeatList.filter((seat) =>
      tempSeats.some((s) => s.userId === user?.id && s.seatId === seat.label),
    );

    updateSelectedInfo("seats", updatedList);
  }, [tempSeats]);

  useEffect(() => {
    if (socket && schedule) {
      socket.on("booked seats", (booked: any[]) => {
        console.log("booked seats", bookedSeats);
        setBookedSeats(booked);
      });
      socket.on("update temp seats", (temp: any[]) => {
        console.log("temp seats", temp);

        setTempSeats(temp);
      });
      socket.emit("join schedule", schedule.id);

      return () => {
        socket.off("booked seats");
        socket.off("update temp seats");
      };
    }
  }, [socket, schedule]);

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

  const handleCountDown = (seat: SelectedSeatType) => {
    const interval = setInterval(() => {
      const updatedSeats = selectedSeatList.map((item) =>
        item.label === seat.label
          ? { ...item, countDown: item.countDown + 1 }
          : item,
      );
      updateSelectedInfo("seats", updatedSeats);
    }, 1000);

    return () => clearInterval(interval); // cleanup function
  };
  console.log("temp seats", tempSeats);

  const addSeatsToBooking = (seatId: string, selectedType: any) => {
    const seatExists = selectedSeatList.find((item) => item.label === seatId);
    const typeDetail = schedule?.priceList?.find(
      (item) => item.id === selectedType?.seatType?.id,
    );
    const newSeat = {
      label: seatId,
      type: selectedType?.seatType?.name,
      price: typeDetail?.price || "",
      countDown: 0,
    };

    if (seatExists) {
      const newList = selectedSeatList.filter(
        (seat) => seat.label !== seatExists.label,
      );
      updateSelectedInfo("seats", newList);
      socket.emit("deselect seat", {
        scheduleId: schedule?.id,
        seatId,
        userId: user?.id,
      });
    } else {
      if (selectedSeatList?.length <= 10) {
        const newList = [...selectedSeatList, newSeat];
        // console.log("new list", newList);
        updateSelectedInfo("seats", newList);
        socket.emit("select seat", {
          scheduleId: schedule?.id,
          seatId,
          userId: user?.id,
        });
      }
    }
    // handleCountDown(newSeat);
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
        const isBooked = schedule?.bookedSeats?.includes(seatId);

        const isTemp = tempSeats?.some(
          (s: any) => s?.userId !== user?.id && s?.seatId === seatId,
        );

        const selectedSeat = tempSeats?.some(
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

  if (isFetching) {
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
