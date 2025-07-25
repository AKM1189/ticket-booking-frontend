import { Grid, Title, Card, Text, Table, Badge, Group } from "@mantine/core";
import {
  IconMovie,
  IconBuilding,
  IconCalendar,
  IconTicket,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import StatsCard from "./StatsCard";
import RevenueChart from "./RevenueChart";
import MoviesChart from "./MoviesChart";
import type {
  AdminStatsType,
  BookingType,
  ScheduleType,
} from "@/types/AdminTypes";

// Mock data - replace with actual API calls
const mockStats: AdminStatsType = {
  totalMovies: 45,
  totalTheaters: 8,
  totalSchedules: 156,
  totalBookings: 1234,
  revenue: 45678,
  activeMovies: 32,
};

const mockRecentBookings: BookingType[] = [
  {
    id: 1,
    userId: 1,
    scheduleId: 1,
    seats: ["A1", "A2"],
    totalAmount: 25.5,
    bookingDate: "2025-01-24T10:30:00Z",
    status: "confirmed",
    customerName: "John Doe",
    customerEmail: "john@example.com",
  },
  {
    id: 2,
    userId: 2,
    scheduleId: 2,
    seats: ["B5"],
    totalAmount: 12.75,
    bookingDate: "2025-01-24T09:15:00Z",
    status: "pending",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
  },
];

const mockUpcomingSchedules: ScheduleType[] = [
  {
    id: 1,
    movieId: 1,
    theaterId: 1,
    showDate: "2025-01-25",
    showTime: "14:30",
    price: 12.5,
    availableSeats: 45,
    totalSeats: 100,
    isActive: true,
    movie: { id: 1, name: "Avengers: Endgame", genre: "Action" } as any,
    theater: { id: 1, name: "Theater A", location: "Downtown" } as any,
  },
  {
    id: 2,
    movieId: 2,
    theaterId: 2,
    showDate: "2025-01-25",
    showTime: "19:00",
    price: 15.0,
    availableSeats: 28,
    totalSeats: 80,
    isActive: true,
    movie: { id: 2, name: "The Batman", genre: "Action" } as any,
    theater: { id: 2, name: "Theater B", location: "Mall" } as any,
  },
  {
    id: 3,
    movieId: 3,
    theaterId: 1,
    showDate: "2025-01-26",
    showTime: "16:15",
    price: 12.5,
    availableSeats: 72,
    totalSeats: 100,
    isActive: true,
    movie: { id: 3, name: "Spider-Man: No Way Home", genre: "Action" } as any,
    theater: { id: 1, name: "Theater A", location: "Downtown" } as any,
  },
  {
    id: 4,
    movieId: 4,
    theaterId: 3,
    showDate: "2025-01-26",
    showTime: "21:30",
    price: 18.0,
    availableSeats: 15,
    totalSeats: 60,
    isActive: true,
    movie: { id: 4, name: "Dune: Part Two", genre: "Sci-Fi" } as any,
    theater: { id: 3, name: "Theater C", location: "City Center" } as any,
  },
];

const AdminDashboard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#28a745"; // green
      case "pending":
        return "#fd7e14"; // amber (dark yellow)
      case "cancelled":
        return "#dc3545"; // red
      default:
        return "#6c757d"; // gray
    }
  };

  return (
    <div className="space-y-6">
      <Title order={2} className="!mb-3">
        Dashboard Overview
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
          <StatsCard
            title="Total Movies"
            value={mockStats.totalMovies}
            icon={<IconMovie size={20} />}
            color="blue"
            trend={{ value: 12, isPositive: true }}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
          <StatsCard
            title="Active Movies"
            value={mockStats.activeMovies}
            icon={<IconMovie size={20} />}
            color="green"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
          <StatsCard
            title="Theaters"
            value={mockStats.totalTheaters}
            icon={<IconBuilding size={20} />}
            color="purple"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
          <StatsCard
            title="Schedules"
            value={mockStats.totalSchedules}
            icon={<IconCalendar size={20} />}
            color="orange"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
          <StatsCard
            title="Revenue"
            value={`$${mockStats.revenue.toLocaleString()}`}
            icon={<IconCurrencyDollar size={20} />}
            color="teal"
            trend={{ value: 8.5, isPositive: true }}
          />
        </Grid.Col>
      </Grid>

      {/* Charts Section */}
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <RevenueChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <MoviesChart />
        </Grid.Col>
      </Grid>

      {/* Upcoming Schedules Section */}
      <Grid>
        <Grid.Col span={12}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="!bg-surface !border-0 !text-text"
          >
            <Title order={3} mb="md">
              Upcoming Schedules
            </Title>
            <div className="overflow-scroll">
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Movie</Table.Th>
                    <Table.Th>Theater</Table.Th>
                    <Table.Th>Date & Time</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Available Seats</Table.Th>
                    <Table.Th>Status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {mockUpcomingSchedules.map((schedule) => (
                    <Table.Tr key={schedule.id}>
                      <Table.Td>
                        <div>
                          <Text size="sm" fw={500}>
                            {schedule.movie?.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {schedule.movie?.genres}
                          </Text>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div>
                          <Text size="sm" fw={500}>
                            {schedule.theater?.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {schedule.theater?.location}
                          </Text>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <div>
                          <Text size="sm" fw={500}>
                            {new Date(schedule.showDate).toLocaleDateString()}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {schedule.showTime}
                          </Text>
                        </div>
                      </Table.Td>
                      <Table.Td>${schedule.price}</Table.Td>
                      <Table.Td>
                        <div>
                          <Text size="sm" fw={500}>
                            {schedule.availableSeats}/{schedule.totalSeats}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {Math.round(
                              (schedule.availableSeats / schedule.totalSeats) *
                                100,
                            )}
                            % available
                          </Text>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={schedule.isActive ? "#28a745" : "#dc3545"}
                          // variant="light"
                        >
                          {schedule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="!bg-surface !border-0 !text-text"
          >
            <Title order={3} mb="md">
              Recent Bookings
            </Title>
            <div className="overflow-scroll">
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Customer</Table.Th>
                    <Table.Th>Seats</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {mockRecentBookings.map((booking) => (
                    <Table.Tr key={booking.id}>
                      <Table.Td>
                        <div>
                          <Text size="sm" fw={500}>
                            {booking.customerName}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {booking.customerEmail}
                          </Text>
                        </div>
                      </Table.Td>
                      <Table.Td>{booking.seats.join(", ")}</Table.Td>
                      <Table.Td>${booking.totalAmount}</Table.Td>
                      <Table.Td>
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={getStatusColor(booking.status)}
                          // variant="light"
                        >
                          {booking.status}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="!bg-surface !border-0 !text-text"
          >
            <Title order={3} mb="md">
              Quick Actions
            </Title>
            <div className="space-y-3">
              <Card
                className="cursor-pointer !bg-surface-hover !text-text hover:!bg-primary !transition-all !duration-200"
                p="sm"
              >
                <Group>
                  <IconMovie size={20} />
                  <Text size="sm">Add New Movie</Text>
                </Group>
              </Card>
              <Card
                className="cursor-pointer !bg-surface-hover !text-text hover:!bg-primary !transition-all !duration-200"
                p="sm"
              >
                <Group>
                  <IconCalendar size={20} />
                  <Text size="sm">Create Schedule</Text>
                </Group>
              </Card>
              <Card
                className="cursor-pointer !bg-surface-hover !text-text hover:!bg-primary !transition-all !duration-200"
                p="sm"
              >
                <Group>
                  <IconTicket size={20} />
                  <Text size="sm">View All Bookings</Text>
                </Group>
              </Card>
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
