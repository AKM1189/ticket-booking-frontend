import { useState, useMemo, useCallback } from "react";
import {
  Title,
  Table,
  Badge,
  Group,
  ActionIcon,
  TextInput,
  Select,
  Card,
  Text,
  Modal,
  Button,
  Grid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconEye,
  IconX,
  IconCheck,
  IconCalendar,
  IconTicket,
  IconClock,
  IconBan,
} from "@tabler/icons-react";
import type { BookingType } from "@/types/AdminTypes";

// Mock data
const mockBookings: BookingType[] = [
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
    schedule: {
      id: 1,
      movieId: 1,
      theaterId: 1,
      showDate: "2025-01-25",
      showTime: "14:30",
      price: 12.5,
      availableSeats: 120,
      totalSeats: 150,
      isActive: true,
      movie: {
        id: 1,
        name: "Avatar: The Way of Water",
        duration: "192 min",
        genres: [],
        releaseDate: "2022-12-16",
        rating: "7.6",
        status: "Now Showing",
        posterUrl: "/movie-bg.jpg",
        trailerId: "abc123",
      },
      theater: {
        id: 1,
        name: "Theater 1",
        location: "Downtown Mall",
        capacity: 150,
        seatLayout: {
          rows: 10,
          seatsPerRow: 15,
          aisles: [],
          disabledSeats: [],
        },
        isActive: true,
      },
    },
  },
  {
    id: 2,
    userId: 2,
    scheduleId: 2,
    seats: ["B5"],
    totalAmount: 15.0,
    bookingDate: "2025-01-24T09:15:00Z",
    status: "pending",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    schedule: {
      id: 2,
      movieId: 2,
      theaterId: 2,
      showDate: "2025-01-25",
      showTime: "19:00",
      price: 15.0,
      availableSeats: 180,
      totalSeats: 200,
      isActive: true,
      movie: {
        id: 2,
        name: "Top Gun: Maverick",
        duration: "130 min",
        genres: [],
        releaseDate: "2022-05-27",
        rating: "8.3",
        status: "Now Showing",
        posterUrl: "/movie-bg-2.jpg",
        trailerId: "def456",
      },
      theater: {
        id: 2,
        name: "Theater 2",
        location: "City Center",
        capacity: 200,
        seatLayout: {
          rows: 12,
          seatsPerRow: 18,
          aisles: [],
          disabledSeats: [],
        },
        isActive: true,
      },
    },
  },
  {
    id: 3,
    userId: 3,
    scheduleId: 1,
    seats: ["C10", "C11", "C12"],
    totalAmount: 37.5,
    bookingDate: "2025-01-23T16:45:00Z",
    status: "cancelled",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    schedule: {
      id: 1,
      movieId: 1,
      theaterId: 1,
      showDate: "2025-01-25",
      showTime: "14:30",
      price: 12.5,
      availableSeats: 120,
      totalSeats: 150,
      isActive: true,
      movie: {
        id: 1,
        name: "Avatar: The Way of Water",
        duration: "192 min",
        genres: [],
        releaseDate: "2022-12-16",
        rating: "7.6",
        status: "Now Showing",
        posterUrl: "/movie-bg.jpg",
        trailerId: "abc123",
      },
      theater: {
        id: 1,
        name: "Theater 1",
        location: "Downtown Mall",
        capacity: 150,
        seatLayout: {
          rows: 10,
          seatsPerRow: 15,
          aisles: [],
          disabledSeats: [],
        },
        isActive: true,
      },
    },
  },
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState<BookingType[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(
    null,
  );

  // Memoize filtered bookings to prevent unnecessary recalculations
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.schedule?.movie?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || booking.status === statusFilter;
      const matchesDate =
        !dateFilter || booking.bookingDate.startsWith(dateFilter);
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bookings, searchTerm, statusFilter, dateFilter]);

  // Memoize expensive calculations
  const { totalRevenue, stats } = useMemo(() => {
    const total = filteredBookings.length;
    let confirmed = 0;
    let pending = 0;
    let cancelled = 0;
    let revenue = 0;

    // Single loop to calculate all stats
    filteredBookings.forEach((booking) => {
      switch (booking.status) {
        case "confirmed":
          confirmed++;
          revenue += booking.totalAmount;
          break;
        case "pending":
          pending++;
          break;
        case "cancelled":
          cancelled++;
          break;
      }
    });

    return {
      totalRevenue: revenue,
      stats: { total, confirmed, pending, cancelled },
    };
  }, [filteredBookings]);

  const handleViewBooking = useCallback(
    (booking: BookingType) => {
      setSelectedBooking(booking);
      open();
    },
    [open],
  );

  const handleUpdateStatus = useCallback(
    (bookingId: number, newStatus: "confirmed" | "cancelled") => {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: newStatus }
            : booking,
        ),
      );
    },
    [],
  );

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "pending":
        return "yellow";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  }, []);

  const inputStyle = {
    input: "dashboard-input",
    label: "!mb-2 !text-text",
  };

  const labelStyle = "!text-blueGray";

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Booking Management</Title>
        <Group>
          <Text size="sm" c="dimmed">
            Total Revenue:{" "}
            <Text span fw={700} c="green">
              ${totalRevenue.toFixed(2)}
            </Text>
          </Text>
        </Group>
      </Group>

      {/* Stats Cards */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            className="dashboard-bg"
          >
            <Group justify="space-between" align="flex-start">
              <div>
                <Text
                  size="xs"
                  c="dimmed"
                  className="!text-text"
                  tt="uppercase"
                  fw={700}
                >
                  Total Bookings
                </Text>
                <Text size="xl" fw={700}>
                  {stats.total}
                </Text>
              </div>
              <IconTicket size={24} color="var(--mantine-color-blue-6)" />
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            className="dashboard-bg"
          >
            <Group justify="space-between" align="flex-start">
              <div>
                <Text
                  size="xs"
                  c="dimmed"
                  className="!text-text"
                  tt="uppercase"
                  fw={700}
                >
                  Confirmed
                </Text>
                <Text size="xl" fw={700} c="green">
                  {stats.confirmed}
                </Text>
              </div>
              <IconCheck size={24} color="var(--mantine-color-green-6)" />
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            className="dashboard-bg"
          >
            <Group justify="space-between" align="flex-start">
              <div>
                <Text
                  size="xs"
                  c="dimmed"
                  className="!text-text"
                  tt="uppercase"
                  fw={700}
                >
                  Pending
                </Text>
                <Text size="xl" fw={700} c="yellow">
                  {stats.pending}
                </Text>
              </div>
              <IconClock size={24} color="var(--mantine-color-yellow-6)" />
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 3 }}>
          <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            className="dashboard-bg"
          >
            <Group justify="space-between" align="flex-start">
              <div>
                <Text
                  size="xs"
                  c="dimmed"
                  className="!text-text"
                  tt="uppercase"
                  fw={700}
                >
                  Cancelled
                </Text>
                <Text size="xl" fw={700} c="red">
                  {stats.cancelled}
                </Text>
              </div>
              <IconBan size={24} color="var(--mantine-color-red-6)" />
            </Group>
          </Card>
        </Grid.Col>
      </Grid>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="dashboard-bg"
      >
        <Group mb="md">
          <TextInput
            placeholder="Search by customer, email, or movie..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            classNames={inputStyle}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Filter by status"
            data={["confirmed", "pending", "cancelled"]}
            value={statusFilter}
            onChange={setStatusFilter}
            classNames={inputStyle}
            clearable
          />
          <TextInput
            type="date"
            placeholder="Filter by date"
            leftSection={<IconCalendar size={16} />}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            classNames={inputStyle}
          />
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Booking ID</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Movie & Theater</Table.Th>
              <Table.Th>Show Details</Table.Th>
              <Table.Th>Seats</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredBookings.map((booking) => (
              <Table.Tr key={booking.id}>
                <Table.Td>
                  <Text size="sm" fw={500}>
                    #{booking.id}
                  </Text>
                </Table.Td>
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
                <Table.Td>
                  <div>
                    <Text size="sm" fw={500}>
                      {booking.schedule?.movie?.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {booking.schedule?.theater?.name}
                    </Text>
                  </div>
                </Table.Td>
                <Table.Td>
                  <div>
                    <Text size="sm">
                      {new Date(
                        booking.schedule?.showDate || "",
                      ).toLocaleDateString()}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {booking.schedule?.showTime}
                    </Text>
                  </div>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    {booking.seats.map((seat) => (
                      <Badge key={seat} variant="outline" size="sm">
                        {seat}
                      </Badge>
                    ))}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={500}>
                    ${booking.totalAmount}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleViewBooking(booking)}
                    >
                      <IconEye size={16} />
                    </ActionIcon>
                    {/* {booking.status === "pending" && (
                      <>
                        <ActionIcon
                          variant="light"
                          color="green"
                          onClick={() =>
                            handleUpdateStatus(booking.id, "confirmed")
                          }
                        >
                          <IconCheck size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() =>
                            handleUpdateStatus(booking.id, "cancelled")
                          }
                        >
                          <IconX size={16} />
                        </ActionIcon>
                      </>
                    )} */}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title="Booking Details"
        size="lg"
        classNames={{
          header: "dashboard-bg",
          content: "dashboard-bg",
          close: "!text-text hover:!bg-surface-hover",
        }}
      >
        {selectedBooking && (
          <div className="space-y-4">
            <Grid>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Booking ID
                </Text>
                <Text fw={500}>#{selectedBooking.id}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Status
                </Text>
                <Badge
                  color={getStatusColor(selectedBooking.status)}
                  // variant="light"
                >
                  {selectedBooking.status}
                </Badge>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Customer Name
                </Text>
                <Text fw={500}>{selectedBooking.customerName}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Email
                </Text>
                <Text>{selectedBooking.customerEmail}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Movie
                </Text>
                <Text fw={500}>{selectedBooking.schedule?.movie?.name}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Theater
                </Text>
                <Text>{selectedBooking.schedule?.theater?.name}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Show Date
                </Text>
                <Text>
                  {new Date(
                    selectedBooking.schedule?.showDate || "",
                  ).toLocaleDateString()}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Show Time
                </Text>
                <Text>{selectedBooking.schedule?.showTime}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Seats
                </Text>
                <Group gap="xs">
                  {selectedBooking.seats.map((seat) => (
                    <Badge key={seat} variant="outline">
                      {seat}
                    </Badge>
                  ))}
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Total Amount
                </Text>
                <Text size="lg" fw={700} c="green">
                  ${selectedBooking.totalAmount}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Booking Date
                </Text>
                <Text>
                  {new Date(selectedBooking.bookingDate).toLocaleString()}
                </Text>
              </Grid.Col>
            </Grid>

            {/* {selectedBooking.status === "pending" && (
              <Group justify="center" mt="md">
                <Button
                  color="green"
                  onClick={() => {
                    handleUpdateStatus(selectedBooking.id, "confirmed");
                    close();
                  }}
                >
                  Confirm Booking
                </Button>
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => {
                    handleUpdateStatus(selectedBooking.id, "cancelled");
                    close();
                  }}
                >
                  Cancel Booking
                </Button>
              </Group>
            )} */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingManagement;
