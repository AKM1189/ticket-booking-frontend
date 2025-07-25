import { Card, Title } from "@mantine/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock revenue data for the last 7 days
const revenueData = [
  { date: "Jan 18", revenue: 3200 },
  { date: "Jan 19", revenue: 4100 },
  { date: "Jan 20", revenue: 2800 },
  { date: "Jan 21", revenue: 5200 },
  { date: "Jan 22", revenue: 4800 },
  { date: "Jan 23", revenue: 6100 },
  { date: "Jan 24", revenue: 5900 },
];

const RevenueChart = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="!bg-surface !border-0 !text-text"
    >
      <Title order={3} mb="md">
        Revenue Trend (Last 7 Days)
      </Title>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface-hover)",
                border: "0",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              formatter={(value) => [`$${value}`, "Revenue"]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
