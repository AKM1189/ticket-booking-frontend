import { getScheduleDetail } from "@/api/function/user/scheduleApi";
import SeatPlanHeader from "@/components/user/seatPlan/SeatPlanHeader";
import { routes } from "@/routes";
import { useUserBookingStore } from "@/store/userBookingStore";
import {
  Alert,
  Button,
  Loader,
  LoadingOverlay,
  Modal,
  Text,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconClock,
  IconInfoCircle,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SeatPlan from "./SeatPlan";
import ConfirmBooking from "./ConfirmBooking";
import { BookingStage } from "@/constants/bookingConstants";
import { useLoadingStore } from "@/store/useLoading";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { schedule, setSchedule, setSelectedSeats, activeStage } =
    useUserBookingStore();
  const [showTimeExpiredModal, setShowTimeExpiredModal] = useState(false);
  const { showLoading } = useLoadingStore();

  useEffect(() => {
    showLoading(true);
    const getSchedule = async () => {
      if (id) {
        const data = await getScheduleDetail(parseInt(id));
        setSchedule(data?.data);
        showLoading(false);
      }
    };
    getSchedule();
  }, []);

  const handleTimeExpired = () => {
    setShowTimeExpiredModal(true);
    // Clear any selected seats when time expires
    setSelectedSeats([]);
  };

  const handleBackToShowtimes = () => {
    navigate(`/${routes.user.ticketPlan}?movieId=${schedule?.movie?.id}`);
  };

  if (schedule)
    return (
      <div>
        <SeatPlanHeader schedule={schedule} onTimeExpired={handleTimeExpired} />

        {activeStage === BookingStage.seatPlan ? (
          <SeatPlan />
        ) : (
          <ConfirmBooking />
        )}

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

export default Booking;
