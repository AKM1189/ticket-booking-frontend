import { inputStyle } from "@/constants/styleConstants";
import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  Select,
  Text,
  TextInput,
  Title,
  Stack,
  Paper,
  Badge,
  Divider,
  Textarea,
  Stepper,
  Container,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  IconChevronLeft,
  IconTicket,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUser,
  IconMail,
  IconPhone,
  IconCheck,
  IconMovie,
  IconDeviceTv,
  IconBuilding,
  IconLanguage,
  IconBadgeCc,
} from "@tabler/icons-react";
import SeatLayoutViewer from "./SeatLayoutViewer";
import { useShowingMovieQuery } from "@/api/query/admin/movieQuery";
import type { MovieType } from "@/types/MovieTypes";
import { getTheatresByShow } from "@/api/function/admin/theatreApi";
import { getScreensByShow } from "@/api/function/admin/screenApi";
import type { TheatreType } from "@/types/TheatreTypes";
import type { ScreenType } from "@/types/ScreenTypes";
import { getShowDates, getShowTimes } from "@/api/function/admin/scheduleApi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { minsToHMin } from "@/utils/timeFormatter";
import { useAuthStore } from "@/store/authStore";
import type { ScheduleType } from "@/types/ScheduleTypes";
import { useAddBookingMutation } from "@/api/mutation/admin/bookingMutation";
import { useLoadingStore } from "@/store/useLoading";
import { BookingCompType } from "./BookingPage";
import { useBookingStore } from "@/store/bookingStore";

dayjs.extend(customParseFormat);

export type SelectedSeatType = {
  label: string;
  type: string;
  price: string;
  countDown: number;
};

export type SelectedInfoType = {
  movie: MovieType | null;
  theatre: TheatreType | null;
  screen: ScreenType | null;
  schedule: ScheduleType | null;
  seats: SelectedSeatType[];
  showDate: string | null;
  showTime: string | null;
};

const BookingForm = ({
  setCurrentComp,
}: {
  setCurrentComp: (value: BookingCompType) => void;
}) => {
  // const [seatModalOpened, { open: openSeatModal, close: closeSeatModal }] =
  //   useDisclosure();
  const [activeStep, setActiveStep] = useState(0);

  const [movies, setMovies] = useState<MovieType[]>([]);
  const { data: movieData } = useShowingMovieQuery();

  const [theatres, setTheatres] = useState<TheatreType[]>([]);
  const [screens, setScreens] = useState<ScreenType[]>([]);
  const [showDates, setShowDates] = useState<string[]>([]);
  const [showTimes, setShowTimes] = useState<string[]>([]);

  const [selectedInfo, setSelectedInfo] = useState<SelectedInfoType>({
    movie: null,
    theatre: null,
    screen: null,
    schedule: null,
    seats: [],
    showDate: null,
    showTime: null,
  });

  const [seatError, setSeatError] = useState<string | null>(null);

  const { user } = useAuthStore();

  const { mutate: addBookingMutation } = useAddBookingMutation();

  const { showLoading } = useLoadingStore();
  const { setCurrentBooking } = useBookingStore();

  const updateSelectedInfo = <K extends keyof SelectedInfoType>(
    key: K,
    value: SelectedInfoType[K],
  ) => {
    setSelectedInfo((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const form = useForm({
    initialValues: {
      movieId: "",
      theatreId: "",
      screenId: "",
      showDate: "",
      selectedSeats: [],
      showTime: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      notes: "",
    },
    validate: {
      movieId: (value) => (!value ? "Please select a movie" : null),
      theatreId: (value) => (!value ? "Please select a theatre" : null),
      screenId: (value) => (!value ? "Please select a screen" : null),
      showDate: (value) => (!value ? "Please select a show date" : null),
      showTime: (value) => (!value ? "Please select a show time" : null),
      customerName: (value) => (!value ? "Customer name is required" : null),
    },
  });
  const { movieId, theatreId, screenId, showDate, showTime, customerName } =
    form.values;

  const getTheatres = async () => {
    await getTheatresByShow(movieId).then((data) => setTheatres(data?.data));
  };

  const getScreens = async () => {
    await getScreensByShow(theatreId, movieId).then((data) =>
      setScreens(data?.data),
    );
  };

  const getDateList = async () => {
    await getShowDates(movieId, theatreId, screenId).then((data) =>
      setShowDates(data?.data),
    );
  };

  const getTimeList = async () => {
    const formattedDate = dayjs(showDate, "DD-MM-YYYY").format("YYYY-MM-DD");
    await getShowTimes(movieId, theatreId, screenId, formattedDate).then(
      (data) => setShowTimes(data?.data),
    );
  };

  useEffect(() => {
    setMovies(movieData?.data);
  }, [movieData]);

  useEffect(() => {
    if (movieId) {
      const choseMovie = movies.find((movie) => movie.id.toString() == movieId);
      updateSelectedInfo("movie", choseMovie || null);
      if (movieId != selectedInfo?.movie?.id.toString()) {
        form.resetField("theatreId");
        form.resetField("screenId");
        form.resetField("showDate");
        form.resetField("showTime");
      }
      getTheatres();
    }

    if (theatreId) {
      const choseTheatre = theatres.find(
        (theatre) => theatre.id.toString() == theatreId,
      );
      updateSelectedInfo("theatre", choseTheatre || null);
      if (theatreId != selectedInfo?.theatre?.id.toString()) {
        form.resetField("screenId");
        form.resetField("showDate");
        form.resetField("showTime");
      }
      getScreens();
    }

    if (screenId) {
      const choseScreen = screens.find(
        (screen) => screen.id.toString() == screenId,
      );
      updateSelectedInfo("screen", choseScreen || null);
      updateSelectedInfo("seats", []);
      if (screenId != selectedInfo?.screen?.id.toString()) {
        form.resetField("showDate");
        form.resetField("showTime");
      }
      getDateList();
    }
    if (showDate) {
      updateSelectedInfo("showDate", showDate);
      if (showDate !== selectedInfo?.showDate) {
        form.resetField("showTime");
        console.log("show time 1", showTime);
        updateSelectedInfo("showTime", null);
      }
      getTimeList();
    }
    if (showTime) {
      console.log("show time 2", showTime);

      updateSelectedInfo("showTime", showTime);
    }
  }, [movieId, theatreId, screenId, showDate, showTime]);

  const calculateTotal = () => {
    let totalPrice = 0;
    selectedInfo.seats?.map((seat) => {
      totalPrice += parseFloat(seat.price);
    });
    return totalPrice;
  };

  const handleSubmit = (values: typeof form.values) => {
    showLoading(true);

    const data = {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
      scheduleId: selectedInfo.schedule?.id.toString() || "",
      note: values.notes,
      userId: user?.id.toString() || "",
      selectedSeats: selectedInfo.seats?.map((seat) => seat.label),
      totalAmount: calculateTotal().toString(),
    };
    addBookingMutation(
      { data },
      {
        onSuccess: (data) => {
          showLoading(false);
          console.log("booking success", data);
          setCurrentBooking(data?.data);
          setCurrentComp(BookingCompType.ticket);
        },
        onError: () => showLoading(false),
      },
    );
  };

  const nextStep = () => {
    if (activeStep === 0) {
      // ✅ validate only step 0 fields
      const step0Fields = [
        "movieId",
        "theatreId",
        "screenId",
        "showDate",
        "showTime",
      ];
      let hasError = false;

      step0Fields.forEach((field) => {
        form.validateField(field); // runs validation
        if (form.errors[field]) {
          hasError = true;
          console.log("error in field:", field, form.errors[field]);
        }
      });
      if (selectedInfo.seats?.length == 0) {
        setSeatError("Please select seats to book!");
      } else {
        setSeatError(null);
      }
      console.log("hasErrors", hasError);
      if (!hasError && selectedInfo.seats?.length > 0) {
        setActiveStep(1);
      }
    } else {
      const errors = form.validate();
      if (
        activeStep === 1 &&
        !errors.hasErrors &&
        selectedInfo.seats?.length > 0
      ) {
        handleSubmit(form.values);
      }
      if (selectedInfo.seats?.length == 0) {
        setSeatError("Please select seats to book!");
      }
    }
  };

  const prevStep = () => setActiveStep(activeStep - 1);
  return (
    <Container size="xl" px={0}>
      <Group mb="xl">
        <Group
          className="p-2 cursor-pointer hover:bg-surface-hover rounded-md transition-colors"
          onClick={() => setCurrentComp(BookingCompType.bookingHome)}
          gap="xs"
          c="dimmed"
        >
          <IconChevronLeft size={24} />
          <Text size="sm">Back to Bookings</Text>
        </Group>
        <Title order={2} className="flex items-center gap-2">
          Create New Booking
        </Title>
      </Group>

      <Stepper active={activeStep} onStepClick={setActiveStep} className="mb-8">
        <Stepper.Step label="Show & Seats" icon={<IconTicket size={18} />}>
          <Paper shadow="sm" p="xl" radius="md" className="dashboard-bg mt-6">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 7 }}>
                <Stack gap="md">
                  <Select
                    label="Movie"
                    placeholder="Select a movie"
                    data={movies?.map((movie) => ({
                      value: movie.id.toString(),
                      label: movie.title,
                    }))}
                    leftSection={<IconTicket size={16} />}
                    classNames={inputStyle}
                    {...form.getInputProps("movieId")}
                  />

                  <Select
                    label="theatre"
                    placeholder="Select a theatre"
                    data={theatres?.map((theatre) => ({
                      value: theatre.id.toString(),
                      label: theatre.name,
                    }))}
                    leftSection={<IconBuilding size={16} />}
                    classNames={inputStyle}
                    {...form.getInputProps("theatreId")}
                  />

                  <Select
                    label="Screen"
                    placeholder="Select a screen"
                    data={screens?.map((screen) => ({
                      value: screen.id.toString(),
                      label: screen.name,
                    }))}
                    leftSection={<IconDeviceTv size={16} />}
                    classNames={inputStyle}
                    {...form.getInputProps("screenId")}
                  />

                  <Grid>
                    <Grid.Col span={6}>
                      <Select
                        label="Show Date"
                        placeholder="Select date"
                        data={showDates}
                        leftSection={<IconCalendar size={16} />}
                        classNames={inputStyle}
                        {...form.getInputProps("showDate")}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Select
                        label="Show Time"
                        placeholder="Select time"
                        data={showTimes}
                        leftSection={<IconClock size={16} />}
                        classNames={inputStyle}
                        {...form.getInputProps("showTime")}
                      />
                    </Grid.Col>
                  </Grid>

                  {selectedInfo.movie &&
                    selectedInfo.theatre &&
                    selectedInfo.screen &&
                    selectedInfo.showDate &&
                    selectedInfo.showTime &&
                    movieId &&
                    theatreId &&
                    screenId &&
                    showDate &&
                    showTime && (
                      <div>
                        <label className="!text-text text-sm mt-5">
                          Select Seats
                        </label>
                        <SeatLayoutViewer
                          key={selectedInfo.screen.id}
                          layout={{
                            rows: selectedInfo.screen?.rows,
                            seatsPerRow: selectedInfo.screen?.cols,
                            disabledSeats: selectedInfo.screen?.disabledSeats,
                            aisles: selectedInfo.screen?.aisles.map(
                              (aisle: any) => parseInt(aisle),
                            ),
                          }}
                          selectedInfo={selectedInfo}
                          updateSelectedInfo={updateSelectedInfo}
                        />

                        {seatError && (
                          <p className="text-xs text-red-400 mt-4">
                            {seatError}
                          </p>
                        )}
                      </div>
                    )}

                  {selectedInfo.seats?.length > 0 && (
                    <Paper p="md" className="!bg-transparent !shadow-none">
                      <Text size="sm" fw={500} mb="xs">
                        Selected Seats: ({selectedInfo.seats?.length})
                      </Text>
                      {/* <Group gap="xs" flex={"col"}> */}
                      <div className="flex flex-col gap-2">
                        {selectedInfo.seats?.map((seat) => {
                          return (
                            <Group gap={4}>
                              <Badge
                                key={seat.label}
                                w={"60px"}
                                variant="filled"
                                color="blue"
                                size="lg"
                              >
                                {seat.label}
                              </Badge>{" "}
                              <Text size="sm">- $ {seat.price}</Text>
                              <Text size="sm">- {seat.countDown}</Text>
                            </Group>
                          );
                        })}
                      </div>
                      {/* </Group> */}
                    </Paper>
                  )}
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 5 }}>
                {selectedInfo.movie ? (
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="dashboard-bg"
                  >
                    <Group align="flex-start" gap="md">
                      <Image
                        src={selectedInfo.movie?.poster?.url}
                        alt={selectedInfo.movie?.title}
                        // className="h-[200px]"
                        radius="md"
                        fit="cover"
                      />
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Group>
                          <Title order={3}>
                            {selectedInfo.movie?.title} (
                            {selectedInfo.screen?.type})
                          </Title>{" "}
                          {/* <div className="text-md">
                            ({" "}
                            {minsToHMin(parseInt(selectedInfo.movie?.duration))}{" "}
                            )
                          </div> */}
                          <Badge variant="outline" size="md" className="">
                            {minsToHMin(parseInt(selectedInfo.movie?.duration))}{" "}
                          </Badge>
                        </Group>
                        <Group gap="xs">
                          {selectedInfo.movie?.genres?.map((item) => (
                            <Badge
                              variant="light"
                              size="sm"
                              color={item?.color}
                            >
                              {item?.name}
                            </Badge>
                          ))}
                        </Group>
                        {selectedInfo.theatre && (
                          <Group gap="xs" mt="sm">
                            <IconMapPin size={16} />
                            <Text size="sm">
                              {selectedInfo.theatre?.name}
                              {selectedInfo.screen?.name
                                ? " (" + selectedInfo.screen?.name + ")"
                                : ""}
                            </Text>
                          </Group>
                        )}
                        {selectedInfo?.showDate && (
                          <Group gap="xs">
                            <IconCalendar size={16} />
                            <Text size="sm">{selectedInfo?.showDate}</Text>
                          </Group>
                        )}
                        {selectedInfo.showTime && (
                          <Group gap="xs">
                            <IconClock size={16} />
                            <Text size="sm">{selectedInfo.showTime}</Text>
                          </Group>
                        )}
                        {selectedInfo.schedule && (
                          <Group gap="xs">
                            <IconLanguage size={16} />
                            <Text size="sm">
                              {selectedInfo.schedule.language}
                            </Text>
                            <IconBadgeCc size={16} />
                            <Text size="sm">
                              {selectedInfo.schedule.subtitle}
                            </Text>
                          </Group>
                        )}
                        {selectedInfo.seats?.length > 0 && (
                          <Box mt="md">
                            <Divider mb="sm" />
                            <Group justify="space-between">
                              <Text size="sm">
                                {selectedInfo.seats?.length} seat
                                {selectedInfo.seats?.length > 1 ? "s" : ""}
                              </Text>
                              <Text size="lg" fw={700} c="green">
                                ${calculateTotal().toFixed(2)}
                              </Text>
                            </Group>
                          </Box>
                        )}
                      </Stack>
                    </Group>
                  </Card>
                ) : (
                  <div className="text-center flex flex-col items-center justify-center h-full select-none">
                    <IconMovie size={30} />
                    <h4 className="text-sm mt-2">No Movie Selected</h4>
                  </div>
                )}
              </Grid.Col>
            </Grid>
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="Customer Details" icon={<IconUser size={18} />}>
          <Paper shadow="sm" p="xl" radius="md" className="dashboard-bg mt-6">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="md">
                  <TextInput
                    label="Customer Name"
                    placeholder="Enter customer name"
                    leftSection={<IconUser size={16} />}
                    classNames={inputStyle}
                    {...form.getInputProps("customerName")}
                  />

                  <TextInput
                    label="Email Address"
                    placeholder="Enter email address (optional)"
                    leftSection={<IconMail size={16} />}
                    classNames={inputStyle}
                    {...form.getInputProps("customerEmail")}
                  />

                  <TextInput
                    label="Phone Number"
                    placeholder="Enter phone number (optional)"
                    leftSection={<IconPhone size={16} />}
                    classNames={inputStyle}
                    {...form.getInputProps("customerPhone")}
                  />

                  <Textarea
                    label="Notes"
                    placeholder="Any special requests or notes (optional)"
                    rows={3}
                    classNames={inputStyle}
                    {...form.getInputProps("notes")}
                  />
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  className="dashboard-bg"
                >
                  <Title order={4} mb="md">
                    Booking Summary
                  </Title>

                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">Movie:</Text>
                      <Text size="sm" fw={500}>
                        {selectedInfo.movie?.title}
                      </Text>
                    </Group>

                    <Group justify="space-between">
                      <Text size="sm">Theatre:</Text>
                      <Text size="sm">{selectedInfo.theatre?.name}</Text>
                    </Group>

                    <Group justify="space-between">
                      <Text size="sm">Date & Time:</Text>
                      <Text size="sm">
                        {selectedInfo.showDate?.split(" - ")} at{" "}
                        {selectedInfo.showTime}
                      </Text>
                    </Group>

                    <Group justify="space-between">
                      <Text size="sm">Seats:</Text>
                      <Text size="sm">
                        {selectedInfo.seats?.length > 0 &&
                          selectedInfo.seats?.map(
                            (item) =>
                              item.label +
                              (item.label !==
                              selectedInfo.seats[selectedInfo.seats.length - 1]
                                ?.label
                                ? " ,"
                                : ""),
                          )}
                      </Text>
                    </Group>

                    <Divider my="sm" />

                    <Group justify="space-between">
                      <Text fw={500}>Total Amount:</Text>
                      <Text size="xl" fw={700} c="green">
                        ${calculateTotal().toFixed(2)}
                      </Text>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Paper>
        </Stepper.Step>
      </Stepper>

      <Group justify="space-between" mt="xl">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={activeStep === 0}
          className="dashboard-btn disabled:!bg-darkGray !bg-primary !text-white"
        >
          Previous
        </Button>

        <Button
          onClick={nextStep}
          className="dashboard-btn"
          leftSection={activeStep === 1 ? <IconCheck size={16} /> : undefined}
        >
          {activeStep === 1 ? "Create Booking" : "Next Step"}
        </Button>
      </Group>

      {/* <Modal
        opened={seatModalOpened}
        onClose={closeSeatModal}
        title="Select Seats"
        size="lg"
        classNames={modalStyle}
      >
        
      </Modal> */}
    </Container>
  );
};

export default BookingForm;
