import { ClockIcon, SubtitleIcon } from "@/assets/svgs";
import SeatIcon from "@/assets/svgs/SeatsIcon";
import { routes } from "@/routes";
import type { MovieDetailType } from "@/types/MovieTypes";
import { Button, Modal } from "@mantine/core";
import React from "react";
import { NavLink, useNavigate } from "react-router";

type TicketPlanModal = {
  movie: MovieDetailType;
  opened: boolean;
  close: () => void;
};
const TicketPlanModal = ({ movie, opened, close }: TicketPlanModal) => {
  const navigate = useNavigate();
  return (
    <Modal
      opened={opened}
      onClose={close}
      // title="Confirm Movie"
      centered
      classNames={{
        content: "!bg-surface !min-w-[650px] pb-10",
        header: "!bg-surface !text-text",
        title: "!text-xl !font-semibold",
        close: "!text-blueGray hover:!bg-surface-hover",
      }}
    >
      {/* Modal content */}
      <div className="text-text flex gap-15 p-5">
        <img src="/movie03.jpg" className="rounded-md w-[250px]" />
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-3xl font-semibold">ALONE</div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5 mt-5 text-sm">
                <div className="flex gap-2 items-center">
                  <ClockIcon color={"var(--color-blueGray)"} size={20} />2 hrs
                  50 min
                </div>
                <div className="flex gap-2 items-center">
                  <SubtitleIcon color={"var(--color-blueGray)"} size={20} />
                  English
                </div>
              </div>
              <div className="flex gap-16 mt-3 text-sm">
                <div className="flex flex-col gap-5">
                  <div className="">
                    <span className="text-xs text-muted">Cinema</span>
                    <div className="mt-1">Kantharyar</div>
                  </div>
                  <div className="">
                    <span className="text-xs text-muted">Date</span>
                    <div className="mt-1">26/6/2025</div>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <span className="text-xs text-muted">Theatre</span>
                    <div className="mt-1">Theatre 1</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted">Time</span>
                    <div className="mt-1">10:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <NavLink
            to={"/" + routes.user.seatPlan + "/" + movie.id}
            className="text-center"
          > */}
          <Button
            leftSection={<SeatIcon color="var(--color-blueGray)" />}
            onClick={() => {
              close();
              navigate(`/${routes.user.seatPlan}/${movie.id}`);
            }}
          >
            Select Seats
          </Button>
          {/* </NavLink> */}
        </div>
      </div>
    </Modal>
  );
};

export default TicketPlanModal;
