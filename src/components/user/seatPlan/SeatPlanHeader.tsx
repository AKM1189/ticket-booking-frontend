import { Button, Badge, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import type { ScheduleType } from "@/types/ScheduleTypes";
import { useNavigate } from "react-router";
import { routes } from "@/routes";
import {
  IconArrowLeft,
  IconClock,
  IconMapPin,
  IconLanguage,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface SeatPlanHeaderProps {
  schedule: ScheduleType;
  onTimeExpired?: () => void;
}

const SeatPlanHeader = ({ schedule, onTimeExpired }: SeatPlanHeaderProps) => {
  const { movie, screen, theatre } = schedule;
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          // Timer just reached 0, call the callback
          onTimeExpired?.();
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/movie_detail_bg.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {movie?.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge
                size="lg"
                variant="light"
                color="purple"
                className="!text-white !bg-white/20 !border-white/30"
              >
                {screen?.type}
              </Badge>

              <Badge
                size="lg"
                variant="light"
                color="green"
                leftSection={<IconLanguage size={16} />}
                className="!text-white !bg-white/20 !border-white/30"
              >
                {schedule?.language}{" "}
                {schedule?.subtitle && `(Sub: ${schedule.subtitle})`}
              </Badge>

              <Badge
                size="lg"
                variant="light"
                color="blue"
                leftSection={<IconMapPin size={16} />}
                className="!text-white !bg-white/20 !border-white/30"
              >
                {theatre?.location}
              </Badge>
            </div>

            <Text size="lg" className="text-blue-200">
              Choose your perfect seats for the ultimate movie experience
            </Text>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-surface-light/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <Button
              leftSection={<IconArrowLeft size={18} />}
              variant="light"
              color="blue"
              size="md"
              onClick={() =>
                navigate(`/${routes.user.ticketPlan}?movieId=${movie.id}`)
              }
              className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 max-w-[230px]"
            >
              Back to Showtimes
            </Button>

            <Group gap="xl" className="text-white">
              <div className="text-center">
                <Text size="sm" className="text-blue-200 mb-1">
                  Show Date
                </Text>
                <Text size="lg" fw={600}>
                  {dayjs(schedule?.showDate).format("DD MMM YYYY")}
                </Text>
              </div>

              <div className="text-center">
                <Text size="sm" className="text-blue-200 mb-1">
                  Show Time
                </Text>
                <Text size="lg" fw={600}>
                  {dayjs(`2025-09-25 ${schedule?.showTime}`).format("HH:mm A")}
                </Text>
              </div>
            </Group>

            <div className="flex flex-col items-center w-[230px]">
              <div className="flex items-center gap-2 mb-1">
                <IconClock size={16} className="text-orange-400" />
                <Text size="sm" className="text-orange-200">
                  Time Left
                </Text>
              </div>
              <div
                className={`text-2xl font-bold ${
                  timeLeft < 60 ? "text-red-400" : "text-orange-400"
                }`}
              >
                {formatTime(timeLeft)}
              </div>
              {timeLeft < 60 && (
                <Text size="xs" className="text-red-300 animate-pulse">
                  Hurry up!
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPlanHeader;
