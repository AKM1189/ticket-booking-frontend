import { Card, Text, Group, ThemeIcon, Skeleton } from "@mantine/core";
import "@/styles/css/tableStyle.css";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  isLoading: boolean;
}

const StatsCard = ({
  title,
  value,
  icon,
  color = "blue",
  isLoading,
}: StatsCardProps) => {
  return (
    <div>
      {isLoading ? (
        <Skeleton visible={true} h={127} radius={"md"} animate />
      ) : (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="!bg-surface !text-text !border-0"
        >
          <Group justify="space-between" mb="xs">
            <Text size="sm" c="dimmed" fw={500} className="!text-blueGray">
              {title}
            </Text>
            <ThemeIcon color={color} variant="light" size="lg">
              {icon}
            </ThemeIcon>
          </Group>

          <Text size="xl" fw={700} mb="xs">
            {value}
          </Text>
        </Card>
      )}
    </div>
  );
};

export default StatsCard;
