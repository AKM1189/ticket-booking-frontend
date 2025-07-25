import { useState, useMemo, useCallback } from "react";
import {
  Title,
  Button,
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
  NumberInput,
  Switch,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconCalendar,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import type { ScheduleType } from "@/types/AdminTypes";
import type { MovieType } from "@/types/MovieTypes";

// Mock data
const mockMovies: MovieType[] = [
  {
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
  {
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
];

const mockTheaters = [
  { id: 1, name: "Theater 1", capacity: 150 },
  { id: 2, name: "Theater 2", capacity: 200 },
  { id: 3, name: "VIP Theater", capacity: 50 },
];

const mockSchedules: ScheduleType[] = [
  {
    id: 1,
    movieId: 1,
    theaterId: 1,
    showDate: "2025-01-25",
    showTime: "14:30",
    price: 12.5,
    availableSeats: 120,
    totalSeats: 150,
    isActive: true,
    movie: mockMovies[0],
    theater: {
      id: 1,
      name: "Theater 1",
      location: "Downtown Mall",
      capacity: 150,
      seatLayout: { rows: 10, seatsPerRow: 15, aisles: [], disabledSeats: [] },
      isActive: true,
    },
  },
  {
    id: 2,
    movieId: 2,
    theaterId: 2,
    showDate: "2025-01-25",
    showTime: "19:00",
    price: 15.0,
    availableSeats: 180,
    totalSeats: 200,
    isActive: true,
    movie: mockMovies[1],
    theater: {
      id: 2,
      name: "Theater 2",
      location: "City Center",
      capacity: 200,
      seatLayout: { rows: 12, seatsPerRow: 18, aisles: [], disabledSeats: [] },
      isActive: true,
    },
  },
];

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState<ScheduleType[]>(mockSchedules);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleType | null>(
    null,
  );

  const form = useForm({
    initialValues: {
      movieId: "",
      theaterId: "",
      showDate: "",
      showTime: "",
      price: 0,
      isActive: true,
    },
  });

  // Memoize filtered schedules to prevent unnecessary recalculations
  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const matchesSearch =
        schedule.movie?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schedule.theater?.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !dateFilter || schedule.showDate === dateFilter;
      return matchesSearch && matchesDate;
    });
  }, [schedules, searchTerm, dateFilter]);

  const handleAddSchedule = () => {
    setEditingSchedule(null);
    form.reset();
    open();
  };

  const handleEditSchedule = (schedule: ScheduleType) => {
    setEditingSchedule(schedule);
    form.setValues({
      movieId: schedule.movieId.toString(),
      theaterId: schedule.theaterId.toString(),
      showDate: schedule.showDate,
      showTime: schedule.showTime,
      price: schedule.price,
      isActive: schedule.isActive,
    });
    open();
  };

  const handleSubmit = (values: typeof form.values) => {
    const selectedMovie = mockMovies.find(
      (m) => m.id === parseInt(values.movieId),
    );
    const selectedTheater = mockTheaters.find(
      (t) => t.id === parseInt(values.theaterId),
    );

    const scheduleData = {
      movieId: parseInt(values.movieId),
      theaterId: parseInt(values.theaterId),
      showDate: values.showDate,
      showTime: values.showTime,
      price: values.price,
      isActive: values.isActive,
      availableSeats: selectedTheater?.capacity || 0,
      totalSeats: selectedTheater?.capacity || 0,
      movie: selectedMovie,
      theater: selectedTheater
        ? {
            id: selectedTheater.id,
            name: selectedTheater.name,
            location: "Location",
            capacity: selectedTheater.capacity,
            seatLayout: {
              rows: 10,
              seatsPerRow: 15,
              aisles: [],
              disabledSeats: [],
            },
            isActive: true,
          }
        : undefined,
    };

    if (editingSchedule) {
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === editingSchedule.id
            ? { ...scheduleData, id: editingSchedule.id }
            : schedule,
        ),
      );
    } else {
      const newSchedule: ScheduleType = {
        ...scheduleData,
        id: Date.now(),
      };
      setSchedules((prev) => [...prev, newSchedule]);
    }
    close();
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id));
  };

  const toggleScheduleStatus = (id: number) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id
          ? { ...schedule, isActive: !schedule.isActive }
          : schedule,
      ),
    );
  };

  const getOccupancyColor = (available: number, total: number) => {
    const percentage = ((total - available) / total) * 100;
    if (percentage < 50) return "green";
    if (percentage < 80) return "yellow";
    return "red";
  };

  const inputStyle = {
    input: "dashboard-input",
    label: "!mb-2 !text-text",
  };

  const numInputStyle = {
    ...inputStyle,
    control: "input-control",
  };
  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Schedule Management</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={handleAddSchedule}
          className="dashboard-btn"
        >
          Add Schedule
        </Button>
      </Group>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="dashboard-bg"
      >
        <Group mb="md">
          <TextInput
            placeholder="Search by movie or theater..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
            classNames={{ input: "dashboard-input" }}
          />
          <TextInput
            type="date"
            placeholder="Filter by date"
            leftSection={<IconCalendar size={16} />}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            classNames={{ input: "dashboard-input" }}
          />
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Movie</Table.Th>
              <Table.Th>Theater</Table.Th>
              <Table.Th>Date & Time</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Occupancy</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredSchedules.map((schedule) => (
              <Table.Tr key={schedule.id}>
                <Table.Td>
                  <Text size="sm" fw={500}>
                    {schedule.movie?.name}
                  </Text>
                </Table.Td>
                <Table.Td>{schedule.theater?.name}</Table.Td>
                <Table.Td>
                  <div>
                    <Text size="sm">
                      {new Date(schedule.showDate).toLocaleDateString()}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {schedule.showTime}
                    </Text>
                  </div>
                </Table.Td>
                <Table.Td>${schedule.price}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Badge
                      color={getOccupancyColor(
                        schedule.availableSeats,
                        schedule.totalSeats,
                      )}
                      variant="outline"
                    >
                      {schedule.totalSeats - schedule.availableSeats}/
                      {schedule.totalSeats}
                    </Badge>
                    <Text size="xs" className="!text-blueGray" c="dimmed">
                      {Math.round(
                        ((schedule.totalSeats - schedule.availableSeats) /
                          schedule.totalSeats) *
                          100,
                      )}
                      %
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={schedule.isActive ? "green" : "red"}
                    // variant="light"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleScheduleStatus(schedule.id)}
                  >
                    {schedule.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      // variant="light"
                      color="orange"
                      onClick={() => handleEditSchedule(schedule)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      // variant="light"
                      color="red"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
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
        title={editingSchedule ? "Edit Schedule" : "Add New Schedule"}
        size="md"
        classNames={{
          header: "!bg-surface text-text",
          content: "!bg-surface text-text",
          close: "!text-text hover:!bg-surface-hover",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <Select
                label="Movie"
                placeholder="Select a movie"
                data={mockMovies.map((movie) => ({
                  value: movie.id.toString(),
                  label: movie.name,
                }))}
                classNames={inputStyle}
                required
                {...form.getInputProps("movieId")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                label="Theater"
                placeholder="Select a theater"
                data={mockTheaters.map((theater) => ({
                  value: theater.id.toString(),
                  label: `${theater.name} (${theater.capacity} seats)`,
                }))}
                required
                classNames={inputStyle}
                {...form.getInputProps("theaterId")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Show Date"
                type="date"
                required
                classNames={inputStyle}
                {...form.getInputProps("showDate")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Show Time"
                type="time"
                required
                classNames={inputStyle}
                {...form.getInputProps("showTime")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Ticket Price ($)"
                placeholder="Enter ticket price"
                required
                classNames={numInputStyle}
                min={0}
                step={0.25}
                {...form.getInputProps("price")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <label htmlFor="active" className="text-sm font-[500]">
                Active Status
              </label>
              <Switch
                description="Schedule is available for booking"
                classNames={{
                  root: "mt-3",
                  body: "!flex !items-center",
                  description: "!py-0 !m-0",
                }}
                styles={(theme, params) => ({
                  track: {
                    backgroundColor: params.checked
                      ? "var(--color-primary)"
                      : "var(--color-surface-hover)", // ON: blue, OFF: gray
                  },
                })}
                {...form.getInputProps("isActive", { type: "checkbox" })}
              />
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={close} className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              {editingSchedule ? "Update" : "Add"} Schedule
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default ScheduleManagement;
