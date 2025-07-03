import { ClockIcon, DateIcon, LocationFillIcon } from "@/assets/svgs";
import SearchIcon from "@/assets/svgs/SearchIcon";
import SeatIcon from "@/assets/svgs/SeatsIcon";
import SubtitleIcon from "@/assets/svgs/SubtitleIcon";
import ScheduleList from "@/components/user/ticketPlan/ScheduleList";
import { routes } from "@/routes";
import { Button, Input, Modal, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { twMerge } from "tailwind-merge";
import { date } from "zod/v4";

const TicketPlan = () => {
  const [selectedDate, setSelectedDate] = useState<string>("All");
  const [dateList, setDateList] = useState<string[] | null>(null);
  const { id } = useParams();
  const movie = {
    id: 1,
    name: "ALONE",
    duration: "2 hrs 50 mins",
    genres: [
      { id: 2, label: "Adventure" },
      { id: 4, label: "Action" },
    ],
    languages: ["English", "Tamil", "Hindi"],
    subtitle: ["Myanmar"],
    releaseDate: "8 Nov, 2025",
    rating: "8.0",
    status: "Now Showing",
    posterUrl: "/movie03.jpg",
    trailerId: "o2T2V1jrLY0",
    casts: [
      {
        id: 1,
        name: "Aung Kaung Myat",
        role: "Actor",
        imageUrl: null,
      },
      {
        id: 2,
        name: "John Wick",
        role: "Actor",
        imageUrl: null,
      },
      {
        id: 2,
        name: "John Wick",
        role: "Actor",
        imageUrl: null,
      },
    ],
    images: [
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
    ],
    reviews: [
      {
        id: 1,
        username: "Aung Kaung Myat",
        rating: "8.0",
        reviewedDate: "2 days ago",
        review:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, alias! Cum ipsam voluptate molestias aliquam quos, vitae commodi, ex facere magnam, amet nesciunt nisi accusamus libero architecto cupiditate! Culpa possimus ipsa id fugiat odio iusto ea inventore quidem, similique magnam eaque architecto, voluptas voluptatibus, nesciunt maxime molestias laborum eveniet! Quod!",
      },
      {
        id: 2,
        username: "Aung Kaung Myat",
        rating: "8.9",
        reviewedDate: "2 months ago",
        review:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, alias! Cum ipsam voluptate molestias aliquam quos, vitae commodi, ex facere magnam, amet nesciunt nisi accusamus libero architecto cupiditate! Culpa possimus ipsa id fugiat odio iusto ea inventore quidem, similique magnam eaque architecto, voluptas voluptatibus, nesciunt maxime molestias laborum eveniet! Quod!",
      },
    ],
  };

  const schedules = [
    {
      id: 1,
      location: "Kantharyar",
      schedules: ["7:00 AM", "10:30 AM", "01:30 PM", "07:30 PM"],
      movie,
    },
    {
      id: 2,
      location: "Kantharyar",
      schedules: ["7:00 AM", "10:30 AM", "01:30 PM", "07:30 PM"],
      movie,
    },
    {
      id: 3,
      location: "Kantharyar",
      schedules: ["7:00 AM", "10:30 AM", "01:30 PM", "07:30 PM"],
      movie,
    },
  ];

  const selectBoxStyle = {
    root: {
      minWidth: "300px",
    },
    label: {
      marginBottom: "10px",
    },
    input: {
      background: "transparent",
      color: "var(--color-text)",
      borderColor: "var(--color-surface-hover)",
    },
  };
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const days = ["All"];
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split("T")[0]);
    }
    setDateList(days);
  }, []);

  return (
    <div className="relative">
      <div
        className={`relative w-full h-[600px] bg-[url("/movie-bg-6.jpg")] bg-no-repeat bg-cover`}
      >
        <div className="relative w-full h-full bg-background/90 flex flex-col gap-5 justify-center">
          <div className="flex items-center gap-10 relative bottom-20 translate-x-[25%]">
            <img src="/movie03.jpg" className="rounded-md w-[250px]" />
            <div className="ms-10">
              <div className="text-4xl font-bold mb-5">
                {movie.name} {id}
              </div>
              <div className="text-blueGray flex flex-col gap-5">
                <div>
                  {movie.languages.map((item, index) => (
                    <span key={item}>
                      {item} {index !== movie.languages.length - 1 && ","}{" "}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {movie.genres.map((item, index) => (
                    <span
                      key={item.id}
                      className="px-4 py-2 border border-surface-hover rounded-full"
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
                <div className="flex gap-5 items-center max-md:flex-col">
                  <span className="flex items-center gap-2">
                    <DateIcon color={"var(--color-blueGray)"} />
                    <span className="mt-1">{movie.releaseDate}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <ClockIcon color={"var(--color-blueGray)"} />
                    <span className="mt-1">{movie.duration}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <SubtitleIcon color={"var(--color-blueGray)"} />
                    <span className="mt-1">{movie.subtitle}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full px-[300px] h-[150px] flex items-center justify-between bg-surface/90">
            {/* <div
              className="w-[150px] h-[50px] bg-surface-hover rounded-md flex justify-center items-center cursor-pointer hover:bg-primary transition-300 select-none shadow-md"
              onClick={}
            >
              All
            </div> */}
            {dateList?.map((item) => (
              <div
                className={twMerge(
                  "w-[150px] h-[50px] rounded-md bg-surface-hover flex justify-center items-center cursor-pointer hover:bg-primary transition-300 select-none shadow-md",
                  selectedDate === item && "bg-primary",
                )}
                key={item}
                onClick={() => setSelectedDate(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <MovieInfo movie={movie} isTicketPlan={true} /> */}

      <div className="px-[300px] mt-20">
        <div className="mb-10 flex items-center justify-between">
          <div className="max-w-[300px]">
            {/* <Select
              placeholder="Select Experience"
              size="md"
              data={["All", "2D", "3D", "4DX", "IMAX"]}
              styles={selectBoxStyle}
              className="max-sm:!w-full"
            /> */}
          </div>

          <TextInput
            placeholder="Search Location"
            classNames={{
              root: "!w-[300px]",
              label: "text-[16px]",
              input: twMerge(
                "login-input !text-text !border-0 !border-b !border-surface-hover !w-full !h-[42px] mt-[2px] !text-base !ps-10",
              ),
              error: "text-red-500",
            }}
            leftSection={<SearchIcon color={"var(--color-accent)"} />}
          />
        </div>
        <div className="bg-surface mt-10 rounded-md overflow-hidden">
          {schedules?.map((item) => (
            <div key={item.id}>
              <ScheduleList
                location={item.location}
                schedules={item.schedules}
                movie={item.movie}
              />
            </div>
          ))}
        </div>

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
                      <ClockIcon color={"var(--color-blueGray)"} size={20} />2
                      hrs 50 min
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
              <NavLink to={routes.user.seatPlan + "/" + movie.id}>
                <Button
                  leftSection={<SeatIcon color="var(--color-blueGray)" />}
                >
                  Select Seats
                </Button>
              </NavLink>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TicketPlan;
