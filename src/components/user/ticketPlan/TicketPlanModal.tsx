import { SeatIcon } from "@/assets/svgs/SeatIcon";
import { BookingStage } from "@/constants/bookingConstants";
import type { ShowDetailType } from "@/pages/user/TicketPlan";
import { routes } from "@/routes";
import { useUserBookingStore } from "@/store/userBookingStore";
import type { MovieDetailType } from "@/types/MovieTypes";
import { minsToHMin } from "@/utils/timeFormatter";
import { Badge, Button, Grid, Group, Image, Modal } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

type TicketPlanModal = {
  movie: MovieDetailType | null;
  schedule: ShowDetailType;
  opened: boolean;
  showDate: string;
  showTime: string;
  close: () => void;
};
const TicketPlanModal = ({
  movie,
  schedule,
  opened,
  showDate,
  showTime,
  close,
}: TicketPlanModal) => {
  const navigate = useNavigate();
  const { setActiveStage } = useUserBookingStore();
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Show Details"
      centered
      classNames={{
        content: "!bg-surface !min-w-[650px] pb-10",
        header: "!bg-surface !text-text",
        title: "!text-xl !font-semibold",
        close: "!text-blueGray hover:!bg-surface-hover",
      }}
    >
      {/* Modal content */}
      {movie && (
        <div className="text-text flex gap-15 p-5">
          <Image
            src={movie?.poster?.url}
            className="!rounded-lg"
            h={400}
            w={250}
          />
          <div className="flex flex-col justify-between min-w-[280px]">
            <div>
              <Group>
                <div className="text-3xl font-semibold">{movie.title}</div>
                <Badge size="lg" variant="light">
                  <div className="flex gap-2 items-center">
                    <IconClock color={"var(--color-primary)"} size={20} />
                    {minsToHMin(parseInt(movie.duration))}
                  </div>
                </Badge>
              </Group>
              <div className="flex flex-col gap-5 mt-5">
                <Grid w={"100%"}>
                  <Grid.Col span={7}>
                    <div className="">
                      <span className="text-sm text-muted">Language</span>
                      <div className="mt-1 text-sm">{schedule?.language}</div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm text-muted">Show Date</span>
                      <div className="mt-1 text-sm">
                        {dayjs(showDate).format("DD-MM-YYYY")}
                      </div>
                    </div>
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <div>
                      <span className="text-sm text-muted">Subtitle</span>
                      <div className="mt-1 text-sm">{schedule?.subtitle}</div>
                    </div>
                    <div className="mt-4">
                      <span className="text-sm text-muted">Show Time</span>
                      <div className="mt-1 text-sm">
                        {dayjs(`${showDate} ${showTime}`).format("hh:mm A")}
                      </div>
                    </div>
                  </Grid.Col>
                </Grid>

                <div>
                  <span className="text-sm text-muted">Location</span>
                  <div className="mt-1 text-sm">
                    Movie Palace ({schedule?.theatre?.location})
                  </div>
                </div>
                <div className="">
                  <span className="text-sm text-muted">Screen</span>
                  <div className="mt-1 text-sm">{schedule?.screen?.name}</div>
                </div>
              </div>
            </div>
            <Button
              leftSection={<SeatIcon color="white" />}
              onClick={() => {
                close();
                setActiveStage(BookingStage.seatPlan);
                navigate(`/${routes.user.booking}/${schedule.id}`);
              }}
            >
              Select Seats
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TicketPlanModal;
