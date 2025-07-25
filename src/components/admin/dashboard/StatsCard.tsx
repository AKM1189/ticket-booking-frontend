import { Card, Text, Group, ThemeIcon } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
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
}

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  color = "blue",
}: StatsCardProps) => {
  return (
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

      {trend && (
        <Group gap="xs">
          <ThemeIcon
            color={trend.isPositive ? "green" : "red"}
            variant="light"
            size="sm"
          >
            {trend.isPositive ? (
              <IconTrendingUp size={12} />
            ) : (
              <IconTrendingDown size={12} />
            )}
          </ThemeIcon>
          <Text size="xs" c={trend.isPositive ? "green" : "red"} fw={500}>
            {trend.value}%
          </Text>
        </Group>
      )}
    </Card>
  );
};

export default StatsCard;
