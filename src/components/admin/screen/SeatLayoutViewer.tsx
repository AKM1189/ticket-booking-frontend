import { Card, Text, Group, Badge } from "@mantine/core";
import type { SeatLayoutType } from "@/types/AdminTypes";
import { useCallback, type JSX } from "react";
import type { SelectedTypeList } from "@/types/ScreenTypes";
import { twMerge } from "tailwind-merge";

interface SeatLayoutViewerProps {
  seatTypes: SelectedTypeList[];
  layout: SeatLayoutType;
  theaterName: string;
}

const SeatLayoutViewer = ({
  seatTypes,
  layout,
  theaterName,
}: SeatLayoutViewerProps) => {
  const generateSeatGrid = useCallback(() => {
    const rows: JSX.Element[] = [];
    const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let row = 0; row < layout.rows; row++) {
      const rowLabel = rowLabels[row];
      const seats: JSX.Element[] = [];

      const selectedType: any = seatTypes?.find((item) => {
        return item?.seatList?.find((i) => i === rowLabel);
      });

      for (let seat = 1; seat <= layout.seatsPerRow; seat++) {
        const seatId = `${rowLabel}${seat}`;
        const isDisabled = layout?.disabledSeats.includes(seatId);
        const hasAisleAfter = layout.aisles.includes(seat);

        seats.push(
          <div key={seatId} className="flex items-center">
            <div
              className={twMerge(
                "w-6 h-6 text-xs flex items-center justify-center rounded border bg-surface-light border-primary text-text",
                isDisabled && "bg-red-300 border-red-300 text-red-600",
                selectedType?.seatType.name === "Premium" &&
                  "bg-primary border-primary text-white",
                selectedType?.seatType.name === "VIP" &&
                  "bg-[#0a1b3a] border-primary text-white",
              )}
              title={`Seat ${seatId} ${
                isDisabled ? "(Disabled)" : "(Available)"
              }`}
            >
              {seat}
            </div>
            {hasAisleAfter && <div className="w-4" />}
          </div>,
        );
      }

      rows.push(
        <div key={row} className="flex items-center gap-1 mb-1 select-none">
          <div className="w-6 text-xs font-semibold text-center">
            {rowLabel}
          </div>
          <div className="flex gap-1">{seats}</div>
        </div>,
      );
    }

    return rows;
  }, [layout]);

  return (
    <Card padding="lg" radius="md" withBorder className="dashboard-bg">
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          Screen - {theaterName?.toUpperCase()}
        </Text>
        <Group gap="md">
          <Group gap="xs">
            <div className="w-4 h-4 bg-surface-light border rounded"></div>
            <Text size="xs">Standard</Text>
          </Group>
          <Group gap="xs">
            <div className="w-4 h-4 bg-primary border rounded"></div>
            <Text size="xs">Premium</Text>
          </Group>
          <Group gap="xs">
            <div className="w-4 h-4 bg-[#0a1b3a] border rounded"></div>
            <Text size="xs">VIP</Text>
          </Group>
          <Group gap="xs">
            <div className="w-4 h-4 bg-red-300 border rounded"></div>
            <Text size="xs">Disabled</Text>
          </Group>
        </Group>
      </Group>

      <div className="mb-4">
        <Group gap="md">
          <Badge variant="outline">{layout.rows} Rows</Badge>
          <Badge variant="outline">{layout.seatsPerRow} Seats/Row</Badge>
          <Badge variant="outline">
            {layout.rows * layout.seatsPerRow - layout.disabledSeats.length}{" "}
            Available
          </Badge>
          <Badge variant="outline" color="red">
            {layout.disabledSeats.length} Disabled
          </Badge>
        </Group>
      </div>

      <div className="bg-surface-hover p-4 rounded-lg overflow-scroll flex flex-col items-center">
        <div className="text-center mb-4">
          <div className="bg-surface ms-6 font-semibold text-text w-[350px] h-[30px] rounded-lg inline-block select-none">
            <div className="mt-1">SCREEN</div>
          </div>
        </div>

        <div className="">
          <div className="">{generateSeatGrid()}</div>
        </div>
      </div>
    </Card>
  );
};

export default SeatLayoutViewer;
