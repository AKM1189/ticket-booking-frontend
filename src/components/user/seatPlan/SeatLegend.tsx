import { Card, Text, Group, Badge, Stack } from "@mantine/core";
import { ReverseSeatIcon } from "@/assets/svgs/SeatIcon";
import { IconInfoCircle } from "@tabler/icons-react";

interface SeatLegendProps {
  priceList?: Array<{
    name: string;
    price: string;
  }>;
}

const SeatLegend = ({ priceList = [] }: SeatLegendProps) => {
  const legendItems = [
    {
      type: "Standard",
      color: {
        fill: "var(--color-user-standard)",
        stroke: "var(--color-surface-hover)",
      },
      description: "Regular seating",
      price: priceList.find((p) => p.name === "Standard")?.price || 5000,
    },
    {
      type: "Premium",
      color: {
        fill: "var(--color-user-premium)",
        stroke: "var(--color-surface-hover)",
      },
      description: "Enhanced comfort",
      price: priceList.find((p) => p.name === "Premium")?.price || 7000,
    },
    {
      type: "VIP",
      color: {
        fill: "var(--color-user-vip)",
        stroke: "var(--color-surface-hover)",
      },
      description: "Luxury experience",
      price: priceList.find((p) => p.name === "VIP")?.price || 10000,
    },
  ];

  const statusItems = [
    {
      label: "Selected",
      icon: (
        <ReverseSeatIcon
          color="var(--color-surface)"
          fill="var(--color-accent)"
          size="24"
        />
      ),
      description: "Your selection",
    },
    {
      label: "Booked",
      icon: (
        <div className="relative">
          <ReverseSeatIcon
            color="#4b5563"
            fill="var(--color-surface-light)"
            size="24"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold">✕</span>
          </div>
        </div>
      ),
      description: "Unavailable",
    },
    {
      label: "Reserved",
      icon: (
        <div className="relative">
          <ReverseSeatIcon
            color="var(--color-surface)"
            fill="#991b1b"
            size="24"
          />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        </div>
      ),
      description: "Temporarily held",
    },
    {
      label: "Disabled",
      icon: (
        <ReverseSeatIcon
          color="var(--color-surface)"
          fill="#374151"
          size="24"
        />
      ),
      description: "Not available",
    },
  ];

  return (
    <Card className="!bg-surface !text-text !border-gray-200 shadow-sm">
      <div className="space-y-6">
        {/* Seat Types */}
        <div>
          <Group gap="xs" className="mb-4">
            <IconInfoCircle size={18} className="text-blue-400" />
            <Text size="md" fw={600} className="!text-text">
              Seat Types & Pricing
            </Text>
          </Group>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {legendItems.map((item) => (
              <div
                key={item.type}
                className="flex items-center gap-3 p-3 bg-surface-hover rounded-lg"
              >
                <ReverseSeatIcon
                  color={item.color.stroke}
                  fill={item.color.fill}
                  size="30"
                />
                <div className="flex-1">
                  <Group align="baseline" justify="space-between">
                    <Stack>
                      <Text size="sm" fw={600} className="!text-text">
                        {item.type}
                      </Text>
                      <Text size="xs" className="text-muted mb-1">
                        {item.description}
                      </Text>
                    </Stack>
                    <Badge
                      size="lg"
                      variant="light"
                      color="blue"
                      className="!bg-surface-hover !text-accent"
                    >
                      ${" "}
                      {new Intl.NumberFormat("en-US").format(
                        parseFloat(item.price.toString()),
                      )}{" "}
                    </Badge>
                  </Group>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seat Status */}
        <div>
          <Text size="md" fw={600} className="mb-4 !text-text">
            Seat Status
          </Text>

          <div className="flex w-full">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className="grow flex flex-col items-center text-center p-2"
              >
                <div className="mb-2">{item.icon}</div>
                <Text size="xs" fw={500} className="!text-text mb-1">
                  {item.label}
                </Text>
                <Text size="xs" className="text-muted">
                  {item.description}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        {/* <div className="bg-surface-hover p-4 rounded-lg border border-surface-hover">
          <Text size="sm" className="!text-text">
            <strong>How to select:</strong> Click on available seats to
            select/deselect. You can select up to 10 seats. Selected seats are
            held for 5 minutes.
          </Text>
        </div> */}
      </div>
    </Card>
  );
};

export default SeatLegend;
