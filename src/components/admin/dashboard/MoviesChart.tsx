import { Card, Title } from "@mantine/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock movies data by genre
const moviesData = [
  { genre: "Action", total: 12, active: 8 },
  { genre: "Comedy", total: 8, active: 6 },
  { genre: "Drama", total: 10, active: 7 },
  { genre: "Horror", total: 6, active: 4 },
  { genre: "Sci-Fi", total: 5, active: 3 },
  { genre: "Romance", total: 4, active: 4 },
];

const MoviesChart = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="!bg-surface !border-0 !text-text"
    >
      <Title order={3} mb="md">
        Movies by Genre
      </Title>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={moviesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="genre" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface-hover)",
                border: "0",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
            />
            <Bar
              dataKey="total"
              fill="#3B82F6"
              name="Total Movies"
              radius={[4, 4, 0, 0]}
              // activeBar={{ background: "var(--color-primary)" }}
            />
            <Bar
              dataKey="active"
              fill="#10B981"
              name="Active Movies"
              radius={[4, 4, 0, 0]}
              // activeBar={{ background: "var(--color-primary)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MoviesChart;
