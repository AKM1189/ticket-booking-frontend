import { Card, Text, Group, Badge } from "@mantine/core";
import type { SeatLayoutType } from "@/types/AdminTypes";
import { useCallback, type JSX } from "react";

interface SeatLayoutViewerProps {
  layout: SeatLayoutType;
  theaterName: string;
}

const SeatLayoutViewer = ({ layout, theaterName }: SeatLayoutViewerProps) => {
  const generateSeatGrid = useCallback(() => {
    const rows: JSX.Element[] = [];
    const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let row = 0; row < layout.rows; row++) {
      const rowLabel = rowLabels[row];
      const seats: JSX.Element[] = [];

      for (let seat = 1; seat <= layout.seatsPerRow; seat++) {
        const seatId = `${rowLabel}${seat}`;
        const isDisabled = layout.disabledSeats.includes(seatId);
        const hasAisleAfter = layout.aisles.includes(seat);

        seats.push(
          <div key={seatId} className="flex items-center">
            <div
              className={`w-6 h-6 text-xs flex items-center justify-center rounded border ${
                isDisabled
                  ? "bg-red-200 border-red-300 text-red-600"
                  : "bg-surface-light border-primary text-white"
              }`}
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
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="dashboard-bg"
    >
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600}>
          {theaterName} - Seat Layout
        </Text>
        <Group gap="md">
          <Group gap="xs">
            <div className="w-4 h-4 bg-surface-light border border-primary rounded"></div>
            <Text size="xs">Available</Text>
          </Group>
          <Group gap="xs">
            <div className="w-4 h-4 bg-red-200 border border-red-300 rounded"></div>
            <Text size="xs">Disabled</Text>
          </Group>
        </Group>
      </Group>

      <div className="mb-4">
        <Group gap="md">
          <Badge>{layout.rows} Rows</Badge>
          <Badge>{layout.seatsPerRow} Seats/Row</Badge>
          <Badge>
            {layout.rows * layout.seatsPerRow - layout.disabledSeats.length}{" "}
            Available
          </Badge>
          <Badge color="red">{layout.disabledSeats.length} Disabled</Badge>
        </Group>
      </div>

      <div className="bg-surface-hover p-4 rounded-lg ">
        <div className="text-center mb-4">
          <div className="bg-primary text-white px-8 py-2 rounded-lg inline-block">
            SCREEN
          </div>
        </div>

        <div className="overflow-scroll">
          <div className="flex flex-col items-center min-w-fit mx-auto">
            {generateSeatGrid()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SeatLayoutViewer;
