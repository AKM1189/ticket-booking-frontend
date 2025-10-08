import { useEffect, useState } from "react";
import "@/styles/css/seatStyle.css";
import {
  Button,
  Card,
  Text,
  Group,
  Badge,
  Alert,
  Loader,
  Modal,
} from "@mantine/core";
import { NavLink, useParams, useNavigate } from "react-router";
import SeatPlanHeader from "@/components/user/seatPlan/SeatPlanHeader";
import { routes } from "@/routes";
import type { ScheduleWithSeatList } from "@/types/ScheduleTypes";
import { getScheduleDetail } from "@/api/function/user/scheduleApi";
import SeatLayoutViewer from "@/components/user/seatPlan/SeatLayoutViewer";
import {
  IconTicket,
  IconClock,
  IconInfoCircle,
  IconAlertTriangle,
} from "@tabler/icons-react";

export interface Seat {
  id: string;
  isBooked: boolean;
  price: number;
}

export type SelectedSeatType = {
  label: string;
  type: string;
  price: string;
  countDown: number;
};

const SeatPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleWithSeatList | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatType[]>([]);
  const [showTimeExpiredModal, setShowTimeExpiredModal] = useState(false);

  useEffect(() => {
    // setLoading(true);
    const getSchedule = async () => {
      if (id) {
        const data = await getScheduleDetail(parseInt(id));
        setSchedule(data?.data);
        setLoading(false);
      }
    };
    getSchedule();
  }, []);

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      return total + (parseInt(seat.price) || 0);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const handleTimeExpired = () => {
    setShowTimeExpiredModal(true);
    // Clear any selected seats when time expires
    setSelectedSeats([]);
  };

  const handleBackToShowtimes = () => {
    navigate(`/${routes.user.ticketPlan}?movieId=${schedule?.movie?.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader size="xl" className="mb-4" />
          <Text size="lg" className="text-gray-600">
            Loading seat plan...
          </Text>
        </div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert
          icon={<IconInfoCircle size={16} />}
          title="Schedule Not Found"
          color="red"
          className="max-w-md"
        >
          The requested schedule could not be found. Please try again or contact
          support.
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <SeatPlanHeader schedule={schedule} onTimeExpired={handleTimeExpired} />

      <div className="container mx-auto px-4 py-8 mt-10">
        {/* Screen Indicator */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <Text
              size="xl"
              fw={600}
              className="!text-text mb-6 uppercase tracking-wider"
            >
              Screen
            </Text>
            <div className="screen-indicator w-[500px] h-3 mx-auto mb-6"></div>
            <img
              src="/screen-thumb.png"
              alt="Screen"
              className="w-100 mx-auto opacity-90 drop-shadow-lg"
            />
            {/* <Text size="sm" className="text-muted mt-2">
              All seats face this direction
            </Text> */}
          </div>
        </div>

        {/* Seat Layout */}
        <div className="max-w-6xl mx-auto">
          <SeatLayoutViewer
            layout={{
              rows: schedule.screen?.rows || 8,
              seatsPerRow: schedule.screen?.cols || 14,
              disabledSeats:
                schedule.screen?.disabledSeats?.map((seat) => seat?.trim()) ||
                [],
              aisles: schedule.screen?.aisles?.map((aisle: any) =>
                parseInt(aisle),
              ) || [4, 10],
            }}
            schedule={schedule}
            setSelectedSeats={setSelectedSeats}
            selectedSeats={selectedSeats}
          />
        </div>

        {/* Selection Summary */}
        <Card className="mt-8 max-w-4xl mx-auto !bg-surface !border-surface-hover shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Selected Seats */}
            <div className="text-center md:text-left">
              <Group gap="xs" className="mb-2 justify-center md:justify-start">
                <IconTicket size={20} className="text-blue-400" />
                <Text size="lg" fw={600} className="!text-text">
                  Selected Seats
                </Text>
              </Group>

              {selectedSeats.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {selectedSeats.map((seat, index) => (
                      <Badge
                        key={index}
                        size="lg"
                        variant="light"
                        color="blue"
                        className="!bg-surface-hover !text-accent"
                      >
                        {seat.label}
                        {seat.countDown > 0 && (
                          <span className="ml-1 text-xs">
                            ({seat.countDown}s)
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                  <Text size="sm" className="!text-muted">
                    {selectedSeats.length} seat
                    {selectedSeats.length !== 1 ? "s" : ""} selected
                  </Text>
                </div>
              ) : (
                <Text size="md" className="!text-muted">
                  No seats selected
                </Text>
              )}
            </div>

            {/* Total Price */}
            <div className="text-center">
              <Group gap="xs" justify="center" className="mb-2 justify-center">
                <Text size="lg" fw={600} className="!text-text">
                  Total Price
                </Text>
              </Group>

              <Text size="xl" fw={700} className="!text-green-400">
                $ {formatPrice(getTotalPrice())}
              </Text>

              {/* {selectedSeats.length > 0 && (
                <Text size="sm" className="!text-muted">
                  Average:{" "}
                  {formatPrice(
                    Math.round(getTotalPrice() / selectedSeats.length),
                  )}{" "}
                  per seat
                </Text>
              )} */}
            </div>

            {/* Action Button */}
            <div className="text-center md:text-right">
              {selectedSeats.length > 0 ? (
                <NavLink to={`/${routes.user.checkout}/${id}`}>
                  <Button
                    size="lg"
                    className="!bg-accent hover:!bg-accent/90 !text-black !rounded-xl px-8"
                    leftSection={<IconTicket size={20} />}
                  >
                    Proceed to Checkout
                  </Button>
                </NavLink>
              ) : (
                <Button
                  size="lg"
                  disabled
                  variant="light"
                  className="!rounded-xl px-8 !bg-surface-hover !text-muted"
                >
                  Select Seats First
                </Button>
              )}
            </div>
          </div>

          {/* Timer Warning */}
          {selectedSeats.some((seat) => seat.countDown < 30) && (
            <Alert
              icon={<IconClock size={16} />}
              title="Time Running Out!"
              color="orange"
              className="mt-4 !bg-surface-hover !border-surface-hover !text-text"
              classNames={{
                title: "!text-red-400",
              }}
            >
              <div className="!text-text">
                Some of your selected seats will expire soon. Complete your
                booking quickly!
              </div>
            </Alert>
          )}
        </Card>
      </div>

      {/* Time Expired Modal */}
      <Modal
        opened={showTimeExpiredModal}
        onClose={() => {}} // No close function - user must click button
        withCloseButton={false}
        centered
        size="md"
        overlayProps={{
          backgroundOpacity: 0.8,
          blur: 3,
        }}
        classNames={{
          content: "!bg-surface !border-surface-hover",
          body: "!p-8",
        }}
      >
        <div className="text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <IconAlertTriangle size={32} className="text-red-400" />
            </div>
            <Text size="xl" fw={700} className="!text-text mb-2">
              Time Expired!
            </Text>
            <Text size="md" className="!text-muted !text-sm">
              Your seat selection time has expired. Please return to showtimes
              to select a new session.
            </Text>
          </div>

          <div className="space-y-4">
            <Alert
              icon={<IconInfoCircle size={16} />}
              color="orange"
              className="!bg-surface-hover !border-surface-hover !text-text"
              classNames={{
                title: "!text-orange-400",
                message: "!text-muted",
              }}
            >
              <div>
                <Text size="sm" fw={600} className="!text-orange-400 mb-1">
                  What happened?
                </Text>
                <Text size="sm" className="!text-muted">
                  To ensure fair access to seats, we limit selection time to 5
                  minutes. Your selected seats have been released for other
                  customers.
                </Text>
              </div>
            </Alert>

            <Button
              size="lg"
              fullWidth
              onClick={handleBackToShowtimes}
              className="!bg-primary hover:!bg-primary/90 !text-text !rounded-xl"
              leftSection={<IconClock size={20} />}
            >
              Back to Showtimes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SeatPlan;
