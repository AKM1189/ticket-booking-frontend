import {
  Grid,
  Title,
  Card,
  Text,
  Table,
  Badge,
  Group,
  Select,
  Skeleton,
  Loader,
} from "@mantine/core";
import {
  IconMovie,
  IconBuilding,
  IconCalendar,
  IconTicket,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import StatsCard from "./StatsCard";

import { BarChart, LineChart } from "@mantine/charts";
import {
  useCardInfoQuery,
  useUpcomingSchedulesQuery,
} from "@/api/query/admin/dashboardQuery";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MovieStatus } from "@/constants/movieConstants";
import { AdminTabType } from "@/types/AdminTypes";
import type { StatusType } from "@/types/NotificationType";
import { getScheduleStatusColor } from "../schedules/ScheduleManagement";
import { usePermisson } from "@/hooks/usePermisson";
import { permissionList } from "@/constants/permissons";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/AuthType";

type StatType = {
  totalMovies: number;
  activeMovies: number;
  totalTheatres: number;
  totalSchedules: number;
  totalRevenue: number;
  todayTicketSales: number;
};

type SevenDayRevenue = {
  date: string;
  revenue: number;
};

type MonthlyRevenue = {
  month: string;
  revenue: number;
};

enum RevenueType {
  last7Day = "last7Day",
  monthly = "monthly",
}

type RevenueChartType = {
  activeChart: RevenueType;
  sevenDayRevenue: SevenDayRevenue[];
  monthlyRevenue: MonthlyRevenue[];
};

type BookingChartType = {
  activeChart: MovieStatus;
  showingMovieBookings: BookingCount[];
  availableMovieBookings: BookingCount[];
};

type BookingCount = {
  movieTitle: string;
  bookingCount: string;
};

type UpcomingScheduleType = {
  availableSeats: number;
  bookedSeats: string;
  id: number;
  status: StatusType;
  movieTitle: string;
  screenName: string;
  showDate: string;
  showTime: string;
  theatreName: string;
};

type RecentBookingsType = {
  bookingDate: string;
  customerEmail: string;
  customerName: string;
  id: number;
  movieTitle: string;
  seatList: string;
  showDate: string;
  showTime: string;
  status: string;
  totalAmount: number;
};

type TableRecordType = {
  upcomingSchedules: UpcomingScheduleType[];
  recentBookings: RecentBookingsType[];
};

type AdminDashboardProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<AdminTabType>>;
  setOpenMovieModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenScheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminDashboard = ({
  setActiveTab,
  setOpenMovieModal,
  setOpenScheduleModal,
}: AdminDashboardProps) => {
  const { data: cardInfo, isPending: isCardPending } = useCardInfoQuery();
  const {
    data: tableData,
    isPending,
    isLoading,
    isFetching,
  } = useUpcomingSchedulesQuery();

  const [stats, setStats] = useState<StatType | null>(null);
  const [revenueChart, setRevenueChart] = useState<RevenueChartType>({
    activeChart: RevenueType.last7Day,
    sevenDayRevenue: [],
    monthlyRevenue: [],
  });

  const [bookingChart, setBookingChart] = useState<BookingChartType>({
    activeChart: MovieStatus.showing,
    showingMovieBookings: [],
    availableMovieBookings: [],
  });

  const [tableRecords, setTableRecords] = useState<TableRecordType>({
    upcomingSchedules: [],
    recentBookings: [],
  });

  const { hasAccess } = usePermisson();
  const { user } = useAuthStore();

  const updateRevenueChart = <K extends keyof RevenueChartType>(
    key: K,
    value: RevenueChartType[K],
  ) => {
    setRevenueChart((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (cardInfo?.data) {
      const {
        totalMovies,
        activeMovies,
        totalTheatres,
        totalSchedules,
        totalRevenue,
        lastSevenDayRevenue,
        monthlyRevenue,
        showingMovieBookings,
        availableMovieBookings,
        todayTicketSales,
      } = cardInfo.data;

      setStats({
        totalMovies,
        activeMovies,
        totalTheatres,
        totalSchedules,
        totalRevenue,
        todayTicketSales,
      });

      setRevenueChart({
        activeChart: RevenueType.last7Day,
        sevenDayRevenue: lastSevenDayRevenue?.map((item: SevenDayRevenue) => {
          return {
            date: dayjs(item.date).format("MMM DD"),
            revenue: item.revenue,
          };
        }),
        monthlyRevenue: monthlyRevenue?.map((item: MonthlyRevenue) => {
          return {
            month: dayjs(item.month).format("MMM"),
            revenue: item.revenue,
          };
        }),
      });

      setBookingChart({
        activeChart: MovieStatus.showing,
        showingMovieBookings,
        availableMovieBookings,
      });
    }

    if (tableData?.data) {
      console.log("upcoming", tableData?.data);
      setTableRecords({
        upcomingSchedules: tableData?.data?.upcomingSchedules,
        recentBookings: tableData?.data?.recentBookings,
      });
    }
  }, [cardInfo]);

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

  const chartStyle = {
    tooltip: "!bg-surface !text-text !border-0",
    tooltipItemName: "!bg-surface !text-text",
    tooltipItemData: "!bg-surface !text-text",
    tooltipLabel: "!bg-surface !text-text",
  };

  const selectStyle = {
    input:
      "dashboard-input !bg-transparent !text-muted !border-surface placeholder:!text-muted",
    label: "!mb-2 !text-text",
  };

  return (
    <div className="space-y-6">
      <Title order={2} className="!mb-3">
        Dashboard Overview
      </Title>

      <Grid mt={30}>
        {user?.role === Role.staff && (
          <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
            <StatsCard
              title="Today Ticket Sales"
              value={stats?.todayTicketSales ?? "-"}
              icon={<IconTicket size={20} />}
              color="blue"
              trend={{ value: 12, isPositive: false }}
              isLoading={isCardPending}
            />
          </Grid.Col>
        )}
        {hasAccess(permissionList.readReport) && (
          <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
            <StatsCard
              title="Total Movies"
              value={stats?.totalMovies ?? "-"}
              icon={<IconMovie size={20} />}
              color="blue"
              trend={{ value: 12, isPositive: false }}
              isLoading={isCardPending}
            />
          </Grid.Col>
        )}
        <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
          <StatsCard
            title="Active Movies"
            value={stats?.activeMovies ?? "-"}
            icon={<IconMovie size={20} />}
            color="green"
            isLoading={isCardPending}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
          <StatsCard
            title="Theaters"
            value={stats?.totalTheatres ?? "-"}
            icon={<IconBuilding size={20} />}
            color="violet"
            isLoading={isCardPending}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
          <StatsCard
            title="Schedules"
            value={stats?.totalSchedules ?? "-"}
            icon={<IconCalendar size={20} />}
            color="orange"
            isLoading={isCardPending}
          />
        </Grid.Col>
        {hasAccess(permissionList.readReport) && (
          <Grid.Col span={{ base: 12, sm: 6, lg: 2.4 }}>
            <StatsCard
              title="Revenue"
              value={`$${stats?.totalRevenue?.toFixed(2)}`}
              icon={<IconCurrencyDollar size={20} />}
              color="teal"
              trend={{ value: 8.5, isPositive: true }}
              isLoading={isCardPending}
            />
          </Grid.Col>
        )}
      </Grid>

      {/* Charts Section */}
      {hasAccess(permissionList.readReport) && (
        <Grid mt={50}>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Skeleton visible={isCardPending} animate>
              <Group mb={30} className="!justify-between">
                <Title size={"xl"}>Revenue</Title>
                <Select
                  size="xs"
                  placeholder="Select Chart Type"
                  defaultValue={RevenueType.last7Day}
                  data={[
                    { label: "Last 7 Days", value: RevenueType.last7Day },
                    { label: "Monthly", value: RevenueType.monthly },
                  ]}
                  onChange={(value) =>
                    updateRevenueChart(
                      "activeChart",
                      value == RevenueType.last7Day
                        ? RevenueType.last7Day
                        : RevenueType.monthly,
                    )
                  }
                  classNames={selectStyle}
                />
              </Group>
              {revenueChart.activeChart === RevenueType.last7Day ? (
                <LineChart
                  h={300}
                  data={revenueChart.sevenDayRevenue}
                  dataKey="date"
                  series={[{ name: "revenue", label: "Revenue ($)" }]}
                  classNames={chartStyle}
                />
              ) : (
                <LineChart
                  h={300}
                  data={revenueChart.monthlyRevenue}
                  dataKey="month"
                  yAxisProps={{ domain: [0, 200] }}
                  series={[{ name: "revenue", label: "Revenue ($)" }]}
                  classNames={chartStyle}
                />
              )}
            </Skeleton>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Skeleton visible={isCardPending} animate>
              <Group mb={30} className="!justify-between">
                <Title size={"xl"}>Bookings</Title>
                <Select
                  size="xs"
                  placeholder="Select Chart Type"
                  defaultValue={MovieStatus.showing}
                  data={[
                    { label: "Now Showing", value: MovieStatus.showing },
                    {
                      label: "Ticket Available",
                      value: MovieStatus.available,
                    },
                  ]}
                  onChange={(value) =>
                    setBookingChart((prev) => ({
                      ...prev,
                      activeChart:
                        value == MovieStatus.showing
                          ? MovieStatus.showing
                          : MovieStatus.available,
                    }))
                  }
                  color={"var(--color-primary)"}
                  classNames={selectStyle}
                />
              </Group>
              <BarChart
                h={300}
                data={
                  bookingChart.activeChart === MovieStatus.showing
                    ? bookingChart.showingMovieBookings
                    : bookingChart.availableMovieBookings
                }
                dataKey="movieTitle"
                minBarSize={10}
                series={[
                  { name: "bookingCount", color: "var(--color-primary)" },
                ]}
                classNames={chartStyle}
              />
            </Skeleton>
          </Grid.Col>
        </Grid>
      )}

      {/* Upcoming Schedules Section */}
      <Grid>
        <Grid.Col span={12}>
          <Skeleton visible={isPending} animate>
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
                {isLoading ? (
                  <div className="h-full min-h-[200px] flex justify-center items-center">
                    <Loader type="dots" size={"md"} />
                  </div>
                ) : (
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Movie</Table.Th>
                        <Table.Th>Theater</Table.Th>
                        <Table.Th>Date & Time</Table.Th>
                        <Table.Th>Available Seats</Table.Th>
                        <Table.Th>Status</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {tableRecords.upcomingSchedules?.map((schedule) => (
                        <Table.Tr key={schedule.id}>
                          <Table.Td>
                            <div>
                              <Text size="sm" fw={500}>
                                {schedule.movieTitle}
                              </Text>
                              {/* <Text size="xs" c="dimmed">
                            {schedule.movie?.genres}
                          </Text> */}
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <div>
                              <Text size="sm" fw={500}>
                                {schedule.theatreName}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {schedule.screenName}
                              </Text>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <div>
                              <Text size="sm" fw={500}>
                                {new Date(
                                  schedule.showDate,
                                ).toLocaleDateString()}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {schedule.showTime}
                              </Text>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <div>
                              <Text size="sm" fw={500}>
                                {schedule.availableSeats -
                                  schedule.bookedSeats?.split(",")?.length}
                                /{schedule.availableSeats}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {Math.round(
                                  100 -
                                    (schedule.bookedSeats?.split(",")?.length /
                                      schedule.availableSeats) *
                                      100,
                                )}
                                % available
                              </Text>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <Badge
                              color={getScheduleStatusColor(schedule.status)}
                              variant="light"
                            >
                              {schedule.status}
                            </Badge>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                )}
                {tableRecords.upcomingSchedules?.length === 0 &&
                  !isLoading &&
                  !isPending &&
                  !isFetching && (
                    <Text ta="center" c="dimmed" py="60px" size="sm">
                      <div className="flex justify-center mb-2">
                        <IconCalendar size={25} />
                      </div>
                      No Upcoming Schedules
                    </Text>
                  )}
              </div>
            </Card>
          </Skeleton>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col
          span={hasAccess(permissionList.readReport) ? { base: 12, lg: 8 } : 12}
        >
          <Skeleton visible={isPending} animate>
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
                      <Table.Th>Movie</Table.Th>
                      <Table.Th>Date & Time</Table.Th>
                      <Table.Th>Seats</Table.Th>
                      <Table.Th>Amount</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Booked Date</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {tableRecords.recentBookings?.map((booking) => (
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
                        <Table.Td>{booking.movieTitle}</Table.Td>
                        <Table.Td>
                          <div>
                            <Text size="sm" fw={500}>
                              {new Date(booking.showDate).toLocaleDateString()}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {booking.showTime}
                            </Text>
                          </div>
                        </Table.Td>
                        <Table.Td>{booking.seatList}</Table.Td>
                        <Table.Td>${booking.totalAmount}</Table.Td>
                        <Table.Td>
                          {" "}
                          <Text size="sm">
                            {new Date(
                              booking.bookingDate || "",
                            ).toLocaleDateString()}
                          </Text>
                          <Text c="dimmed" size="xs">
                            {dayjs(booking.bookingDate).format("hh:mm A")}
                            {/* {new Date(
                              booking.bookingDate || "",
                            ).toLocaleTimeString()} */}
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
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
                {tableRecords.recentBookings?.length === 0 && (
                  <Text ta="center" c="dimmed" py="34px" size="sm">
                    <div className="flex justify-center mb-2">
                      <IconTicket size={25} />
                    </div>
                    No Recent Bookings
                  </Text>
                )}
              </div>
            </Card>
          </Skeleton>
        </Grid.Col>

        {hasAccess(permissionList.readReport) && (
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
                  onClick={() => {
                    setActiveTab(AdminTabType.MOVIES);
                    setOpenMovieModal(true);
                  }}
                >
                  <Group>
                    <IconMovie size={20} />
                    <Text size="sm">Add New Movie</Text>
                  </Group>
                </Card>
                <Card
                  className="cursor-pointer !bg-surface-hover !text-text hover:!bg-primary !transition-all !duration-200"
                  p="sm"
                  onClick={() => {
                    setActiveTab(AdminTabType.SCHEDULES);
                    setOpenScheduleModal(true);
                  }}
                >
                  <Group>
                    <IconCalendar size={20} />
                    <Text size="sm">Create Schedule</Text>
                  </Group>
                </Card>
                <Card
                  className="cursor-pointer !bg-surface-hover !text-text hover:!bg-primary !transition-all !duration-200"
                  p="sm"
                  onClick={() => {
                    setActiveTab(AdminTabType.BOOKINGS);
                  }}
                >
                  <Group>
                    <IconTicket size={20} />
                    <Text size="sm">View All Bookings</Text>
                  </Group>
                </Card>
              </div>
            </Card>
          </Grid.Col>
        )}
      </Grid>
    </div>
  );
};

export default AdminDashboard;
