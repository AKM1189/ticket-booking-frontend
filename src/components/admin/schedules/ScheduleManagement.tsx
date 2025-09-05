import { useState, useEffect } from "react";
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
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconCalendar,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import type { MovieType } from "@/types/MovieTypes";
import { useTheatreQuery } from "@/api/query/admin/theatreQuery";
import type { TheatreType } from "@/types/TheatreTypes";
import { useMovieQuery } from "@/api/query/admin/movieQuery";
import type { ScreenType } from "@/types/ScreenTypes";
import { useScheduleQuery } from "@/api/query/admin/scheduleQuery";
import {
  useAddScheduleMutation,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
} from "@/api/mutation/admin/scheduleMutation";
import type { ScheduleType } from "@/types/ScheduleTypes";
import dayjs from "dayjs";
import { useLoadingStore } from "@/store/useLoading";
import { getScreenByTheatre } from "@/api/function/admin/screenApi";
import { inputStyle, numInputStyle } from "@/constants/styleConstants";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";

const showTimes = ["10:00", "13:00", "16:00", "19:00", "22:00"];

const ScheduleManagement = ({ openScheduleModal, setOpenScheduleModal }) => {
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { showLoading } = useLoadingStore();

  const [editingSchedule, setEditingSchedule] = useState<ScheduleType | null>(
    null,
  );

  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);

  const [theatres, setTheatre] = useState<TheatreType[]>([]);
  const [screens, setScreens] = useState<ScreenType[]>([]);
  const [movies, setMovies] = useState<MovieType[]>([]);

  const { open: openConfirm } = useConfirmModalStore();

  const [showTimeList, setShowTimeList] = useState(showTimes);

  const form = useForm({
    initialValues: {
      movieId: "",
      theatreId: "",
      screenId: "",
      showDate: "",
      showTime: "",
      language: "",
      subtitle: "",
      multiplier: 1,
      isActive: true,
    },
    validate: {
      movieId: (value) => (!value ? "Please select a movie" : null),
      theatreId: (value) => (!value ? "Please select a theatre" : null),
      screenId: (value) => (!value ? "Please select a screen" : null),
      showDate: (value) => (!value ? "Please select a show date" : null),
      showTime: (value) => {
        if (!value) {
          ("Please select a show time");
        }
        if (
          dayjs().isSame(form.values.showDate, "day") &&
          value < dayjs().format("HH:mm:ss")
        ) {
          return "Invalid show time";
        }
      },
      language: (value) => (!value ? "Language is required" : null),
      subtitle: (value) => (!value ? "Subtitle is required" : null),
      multiplier: (value) => (!value ? "Multiplier is required" : null),
    },
  });

  const { data: theatreData } = useTheatreQuery();
  const { data: movieData } = useMovieQuery();
  // const { data: screenData, refetch: refetchScreen } = useScreenByTheatreQuery(
  //   parseInt(form.values.theatreId || "1"),
  // );

  const { data: scheduleData } = useScheduleQuery();

  const { mutate: addScheduleMutation } = useAddScheduleMutation();
  const { mutate: updateScheduleMutation } = useUpdateScheduleMutation();
  const { mutate: deleteScheduleMutation } = useDeleteScheduleMutation();

  useEffect(() => {
    setSchedules(scheduleData?.data);
  }, [scheduleData]);

  useEffect(() => {
    setTheatre(theatreData?.data);
  }, [theatreData]);

  useEffect(() => {
    setMovies(movieData?.data);
  }, [movieData]);

  useEffect(() => {
    if (dayjs().isSame(form.values.showDate, "day")) {
      setShowTimeList((prev) =>
        prev.filter((time) => time > dayjs().format("HH:mm")),
      );
    } else if (dayjs().isBefore(form.values.showDate)) {
      setShowTimeList(showTimes);
    }
  }, [form.values.showDate]);

  // useEffect(() => {
  //   setScreens(screenData?.data);
  // }, [screenData]);

  useEffect(() => {
    if (!editingSchedule) {
      form.setFieldValue("screenId", "");
    }
  }, [form.values.theatreId]);

  useEffect(() => {
    if (form.values.movieId) {
      const movie =
        movies.find((movie) => movie.id.toString() == form.values.movieId) ||
        null;
      setSelectedMovie(movie);
    }
  }, [form.values.movieId]);

  useEffect(() => {
    if (form.values.theatreId) {
      const getScreens = async () =>
        await getScreenByTheatre(parseInt(form.values.theatreId)).then((data) =>
          setScreens(data?.data),
        );

      getScreens();
    }
  }, [form.values.theatreId]);

  const handleAddSchedule = () => {
    setEditingSchedule(null);
    form.reset();
    setOpenScheduleModal(true);
  };

  const handleEditSchedule = (schedule: ScheduleType) => {
    setEditingSchedule(schedule);
    form.setValues({
      movieId: schedule.movie.id.toString(),
      theatreId: schedule.theatre.id.toString(),
      screenId: schedule.screen.id.toString(),
      showDate: schedule.showDate,
      showTime: schedule.showTime,
      language: schedule.language,
      subtitle: schedule.subtitle,
      multiplier: parseFloat(schedule.multiplier),
      isActive: schedule.isActive,
    });
    setOpenScheduleModal(true);
  };

  const handleSubmit = (values: typeof form.values) => {
    showLoading(true);
    // const selectedMovie = movies.find((m) => m.id === parseInt(values.movieId));
    // const selectedTheater = theatres.find(
    //   (t) => t.id === parseInt(values.theaterId),
    // );
    const selectedScreen = screens.find(
      (s) => s.id === parseInt(values.screenId),
    );

    const scheduleData = {
      ...values,
      movieId: parseInt(values.movieId),
      theatreId: parseInt(values.theatreId),
      screenId: parseInt(values.screenId),
      isActive: values.isActive,
      multiplier: parseFloat(values.multiplier.toString()).toFixed(2),
      availableSeats: selectedScreen?.capacity || 0,
      totalSeats: selectedScreen?.capacity || 0,
    };

    if (editingSchedule) {
      updateScheduleMutation(
        { id: editingSchedule.id, data: scheduleData },
        {
          onSuccess: () => {
            setOpenScheduleModal(false);
            showLoading(false);
            setEditingSchedule(null);
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    } else {
      addScheduleMutation(
        { data: scheduleData },
        {
          onSuccess: () => {
            setOpenScheduleModal(false);
            showLoading(false);
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    }
  };

  const handleDeleteSchedule = (id: number) => {
    showLoading(true);
    deleteScheduleMutation(
      { id },
      {
        onSuccess: () => {
          showLoading(false);
        },
        onError: () => {
          showLoading(false);
        },
      },
    );
  };

  const toggleScheduleStatus = () => {};

  const getOccupancyColor = (available: number, total: number) => {
    const percentage = ((total - available) / total) * 100;
    if (percentage < 50) return "green";
    if (percentage < 80) return "yellow";
    return "red";
  };

  const disableActions = (schedule: ScheduleType) => {
    const hasBookings = schedule?.bookedSeats?.length > 0;
    const passedShowTime =
      dayjs().isSame(schedule?.showDate, "day") &&
      schedule?.showTime?.slice(0, 2) <= dayjs().format("HH");

    return hasBookings || passedShowTime;
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
            classNames={{ input: "dashboard-input min-w-[200px]" }}
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

        <div className="overflow-scroll">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Movie</Table.Th>
                <Table.Th>Theater</Table.Th>
                <Table.Th>Screen</Table.Th>
                <Table.Th>Show Date</Table.Th>
                <Table.Th>Show Time</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Occupancy</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {schedules?.map((schedule: ScheduleType) => (
                <Table.Tr key={schedule.id}>
                  <Table.Td>
                    <Text size="sm" fw={500}>
                      {schedule.movie?.title}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{schedule?.theatre?.name}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">
                      {schedule?.screen?.name} ({schedule?.screen?.type})
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <div>
                      <Text size="sm">
                        {new Date(schedule.showDate).toLocaleDateString()}
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{schedule.showTime}</Text>
                  </Table.Td>
                  <Table.Td>${schedule.multiplier}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Badge
                        color={getOccupancyColor(
                          schedule.availableSeats,
                          schedule.screen.capacity,
                        )}
                        variant="outline"
                      >
                        {schedule.bookedSeats?.length ?? 0}/
                        {schedule.screen.capacity}
                      </Badge>
                      <Text size="xs" className="!text-blueGray" c="dimmed">
                        {Math.round(
                          (schedule?.bookedSeats?.length /
                            schedule.screen.capacity) *
                            100,
                        ) || 0}
                        %
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={schedule.isActive ? "green" : "red"}
                      variant="light"
                      style={{ cursor: "pointer" }}
                      onClick={toggleScheduleStatus}
                    >
                      {schedule.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        disabled={disableActions(schedule)}
                        className=""
                        color="orange"
                        onClick={() => handleEditSchedule(schedule)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        disabled={disableActions(schedule)}
                        onClick={() =>
                          openConfirm({
                            title: "Delete Schedule",
                            message:
                              "Are you sure you want to delete this schedule?",
                            onConfirm: () => handleDeleteSchedule(schedule.id),
                          })
                        }
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </Card>

      <Modal
        opened={openScheduleModal}
        onClose={() => setOpenScheduleModal(false)}
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
                data={movies?.map((movie) => ({
                  value: movie.id.toString(),
                  label: movie.title.toUpperCase(),
                }))}
                classNames={inputStyle}
                {...form.getInputProps("movieId")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                label="Theater"
                placeholder="Select a theater"
                data={theatres?.map((theatre) => ({
                  value: theatre.id.toString(),
                  label: `${theatre.name} (${theatre.location})`,
                }))}
                classNames={inputStyle}
                {...form.getInputProps("theatreId")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                label="Screen"
                placeholder="Select a screen"
                data={screens
                  ?.filter((screen) =>
                    selectedMovie?.experience.includes(screen.type),
                  )
                  .map((screen) => ({
                    value: screen.id.toString(),
                    label: `${screen.name} (${screen.type})`,
                  }))}
                classNames={inputStyle}
                {...form.getInputProps("screenId")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Show Date"
                min={dayjs().format("YYYY-MM-DD")}
                type="date"
                classNames={inputStyle}
                {...form.getInputProps("showDate")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              {/* <TextInput
                label="Show Time"
                type="time"
                required
                classNames={inputStyle}
                {...form.getInputProps("showTime")}
              /> */}

              <Select
                label="Show Time"
                placeholder="Select show time"
                data={showTimeList}
                classNames={inputStyle}
                {...form.getInputProps("showTime")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Langauge"
                placeholder="Select movie language"
                data={selectedMovie?.language?.map((lang) => lang)}
                classNames={inputStyle}
                {...form.getInputProps("language")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Subtitle"
                placeholder="Select movie subtitle"
                data={selectedMovie?.subtitle?.map((sub) => sub)}
                required
                classNames={inputStyle}
                {...form.getInputProps("subtitle")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Multiplier"
                placeholder="Default is 1"
                classNames={numInputStyle}
                min={0.5}
                max={3}
                defaultValue={1}
                {...form.getInputProps("multiplier")}
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
                styles={(_theme, params) => ({
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
            <Button
              variant="outline"
              onClick={() => setOpenScheduleModal(false)}
              className="dashboard-btn"
            >
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
