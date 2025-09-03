import { useState, useMemo, useCallback, useEffect } from "react";
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
  Grid,
  Button,
  Stack,
  Paper,
  Divider,
  Avatar,
  Tooltip,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconEye,
  IconCheck,
  IconCalendar,
  IconTicket,
  IconClock,
  IconBan,
  IconPlus,
  IconX,
  IconEdit,
  IconTrash,
  IconUser,
  IconMail,
  IconMapPin,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { useBookingQuery } from "@/api/query/admin/bookingQuery";
import type { BookingType } from "@/types/BookingType";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { useCancelBookingMutation } from "@/api/mutation/admin/bookingMutation";
import { useNavigate } from "react-router";
import { BookingCompType } from "./BookingPage";
import { useBookingStore } from "@/store/bookingStore";
import Ticket from "./Ticket";

const BookingManagement = ({
  setCurrentComp,
}: {
  setCurrentComp: (value: BookingCompType) => void;
}) => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(
    null,
  );

  const [ticketOpen, setTicketOpen] = useState(false);

  const { open: openConfirm } = useConfirmModalStore();

  const { data: bookingData } = useBookingQuery();

  const { mutate: cancelBookingMutation } = useCancelBookingMutation();

  const navigate = useNavigate();

  const { setCurrentBooking } = useBookingStore();

  useEffect(() => {
    if (bookingData) {
      console.log("bookingData", bookingData);
      setBookings(bookingData?.data);
    }
  }, [bookingData]);

  // Memoize expensive calculations
  const { totalRevenue, stats } = useMemo(() => {
    const total = bookings.length;
    let confirmed = 0;
    let pending = 0;
    let cancelled = 0;
    let revenue = 0;

    // Single loop to calculate all stats
    bookings.forEach((booking) => {
      switch (booking.status) {
        case "confirmed":
          confirmed++;
          revenue += parseFloat(booking?.totalAmount);
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
  }, [bookings]);

  const handleViewBooking = useCallback(
    (booking: BookingType) => {
      setCurrentBooking(booking.id);
      setSelectedBooking(booking);
      open();
    },
    [open],
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
        <div>
          <Title order={2}>Booking Management</Title>
          {/* <Group> */}
          <Text size="sm" c="dimmed" mt={10}>
            Total Revenue:{" "}
            <Text span fw={700} c="green">
              ${totalRevenue.toFixed(2)}
            </Text>
          </Text>
        </div>

        <Button
          leftSection={<IconPlus size={16} />}
          className="dashboard-btn"
          onClick={() => setCurrentComp(BookingCompType.bookingForm)}
        >
          Add Booking
        </Button>
        {/* </Group> */}
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

        <div className="overflow-x-auto">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Booking ID</Table.Th>

                <Table.Th>Movie</Table.Th>
                <Table.Th>Theatre</Table.Th>
                <Table.Th>Show Details</Table.Th>
                <Table.Th>Seats</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Booking Date</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {bookings.map((booking) => (
                <Table.Tr key={booking.id}>
                  <Table.Td w={100}>
                    <Text size="sm" fw={500}>
                      #{booking.id}
                    </Text>
                  </Table.Td>

                  <Table.Td>
                    <div>
                      <Text size="md" fw={700}>
                        {booking.schedule?.movie?.title}
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <div>
                      <Text size="sm" fw={500}>
                        {booking.schedule?.theatre?.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {booking.schedule?.screen?.name}
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
                        {booking.schedule?.showTime.slice(0, 5)}
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="2">
                      {booking.seatList.map((seat) => (
                        // <Badge key={seat} variant="outline" size="sm">
                        <div>
                          {seat}
                          {seat ===
                          booking.seatList[booking.seatList.length - 1]
                            ? ""
                            : ","}
                        </div>
                        // </Badge>
                      ))}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500}>
                      $ {booking.totalAmount}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={getStatusColor(booking.status)}
                      variant="light"
                    >
                      {booking.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    {" "}
                    <Text size="sm">
                      {new Date(booking.bookingDate || "").toLocaleDateString()}
                    </Text>
                    <Text c="dimmed" size="xs">
                      {new Date(booking.bookingDate || "").toLocaleTimeString()}
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
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={() => handleViewBooking(booking)}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                      {booking.status === "confirmed" && (
                        <>
                          <ActionIcon
                            variant="light"
                            color="red"
                            onClick={
                              () =>
                                openConfirm({
                                  title: "Cancel Booking",
                                  message:
                                    "Are you sure you want to cancel this booking? This action cannot be reverted.",
                                  onConfirm: () =>
                                    cancelBookingMutation({ id: booking.id }),
                                })
                              // handleUpdateStatus(booking.id, "cancelled")
                            }
                          >
                            <IconX size={16} />
                          </ActionIcon>
                        </>
                      )}
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>

        {bookings?.length === 0 && (
          <Text ta="center" c="dimmed" size="sm" py="xl">
            <div className="flex justify-center mb-2">
              <IconTicket size={30} />
            </div>
            No booking found
          </Text>
        )}
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title="Booking Details"
        classNames={{
          header: "dashboard-bg",
          content: "dashboard-bg",
          close: "!text-text hover:!bg-surface-hover",
        }}
      >
        {selectedBooking && (
          <div className="space-y-4 px-5 py-3">
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
                  variant="light"
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
                <Text>{selectedBooking.customerEmail || "-"}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Movie
                </Text>
                <Text fw={500}>{selectedBooking.schedule?.movie?.title}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Theater
                </Text>
                <Text>{selectedBooking.schedule?.theatre?.name}</Text>
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
                <Text>{selectedBooking.schedule?.showTime.slice(0, 5)}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" c="dimmed" className={labelStyle}>
                  Seats
                </Text>
                <Group gap="xs">
                  {selectedBooking.seatList.map((seat) => (
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

            <div className="flex justify-end">
              <Button
                className="dashboard-btn"
                onClick={() => {
                  setTicketOpen(true);
                  setCurrentBooking(selectedBooking.id);
                }}
              >
                Generate Ticket
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        opened={ticketOpen}
        onClose={() => setTicketOpen(false)}
        title={`Ticket for ID: #${selectedBooking?.id}`}
        size="full"
        // overlayProps={{ backgroundOpacity: 1, color: "var(--color-surface)" }}
        shadow="0"
        classNames={{
          header: "dashboard-bg",
          content: "dashboard-bg h-full",
          close: "!text-text hover:!bg-surface-hover",
        }}
      >
        <Ticket />
      </Modal>
    </div>
  );
};

export default BookingManagement;
