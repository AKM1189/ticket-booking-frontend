import { ClockIcon, DateIcon, LocationFillIcon } from "@/assets/svgs";
import { SearchIcon, SubtitleIcon } from "@/assets/svgs/";
import { Select, TextInput } from "@mantine/core";
import { twMerge } from "tailwind-merge";

const TicketPlan = () => {
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
  return (
    <div className="relative">
      <div
        className={`relative w-full h-[600px] bg-[url("/movie-bg-6.jpg")] bg-no-repeat bg-cover`}
      >
        <div className="relative w-full h-full bg-background/90 flex flex-col gap-5 justify-center">
          <div className="flex items-center gap-10 relative bottom-20 translate-x-[25%]">
            <img src="/movie03.jpg" className="rounded-md w-[250px]" />
            <div className="ms-10">
              <div className="text-4xl font-bold mb-5">{movie.name}</div>
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
                      {/* {index !== movie.genres.length - 1 && "|"}{" "} */}
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
              {/* <div></div> */}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full px-[300px] h-[150px] flex items-center justify-between bg-surface/90">
            {/* <div className="flex gap-20">
              <Select
                label={
                  <div className="flex gap-2">
                    <LocationIcon color="var(--color-accent)" />
                    Date
                  </div>
                }
                placeholder="Select Date"
                size="md"
                data={["React", "Angular", "Vue", "Native", "PHP", "NodeJs"]}
                styles={selectBoxStyle}
                className="max-sm:!w-full"
              />
              <Select
                label={
                  <div className="flex gap-2">
                    <LocationIcon color="var(--color-accent)" />
                    Experience
                  </div>
                }
                placeholder="Select Experience"
                size="md"
                data={["React", "Angular", "Vue", "Native", "PHP", "NodeJs"]}
                styles={selectBoxStyle}
                className="max-sm:!w-full"
              />
            </div> */}

            {/* <div className="flex "> */}
            {/* <div>Select Date:</div> */}
            <div className="w-[150px] h-[50px] bg-surface-hover rounded-md flex justify-center items-center cursor-pointer hover:bg-primary transition-300 select-none shadow-md">
              All
            </div>
            <div className="w-[150px] h-[50px] bg-surface-hover rounded-md flex justify-center items-center cursor-pointer hover:bg-primary transition-300 select-none shadow-md">
              20/03/2025
            </div>
            <div className="w-[150px] h-[50px] bg-surface-hover rounded-md flex justify-center items-center cursor-pointer hover:bg-primary transition-300 select-none shadow-md">
              20/03/2025
            </div>
            <div className="w-[150px] h-[50px] bg-surface-hover rounded-md flex justify-center items-center cursor-pointer hover:bg-primary transition-300 select-none shadow-md">
              20/03/2025
            </div>
            <div className="w-[150px] h-[50px] bg-surface-hover rounded-md flex justify-center items-center cursor-pointer hover:bg-primary transition-300 select-none shadow-md">
              20/03/2025
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* <MovieInfo movie={movie} isTicketPlan={true} /> */}

      <div className="px-[300px] mt-20">
        <div className="mb-10 flex items-center justify-between">
          <div className="max-w-[300px]">
            <Select
              placeholder="Select Experience"
              size="md"
              data={["All", "2D", "3D", "4DX", "IMAX"]}
              styles={selectBoxStyle}
              className="max-sm:!w-full"
            />
          </div>

          <TextInput
            placeholder="Search Location"
            // key={form.key("email")}
            classNames={{
              root: "!w-[300px]",
              label: "text-[16px]",
              input: twMerge(
                "login-input !text-text !border-0 !border-b !border-surface-hover !w-full !h-[42px] mt-[2px] !text-base !ps-10",
                // form.errors.email && "border-red-500"
              ),
              error: "text-red-500",
            }}
            leftSection={<SearchIcon color={"var(--color-accent)"} />}
            // {...form.getInputProps("email")}
          />
          {/* </div> */}
        </div>
        <div className="bg-surface mt-10 rounded-md">
          <div className="group w-full h-[100px] flex items-center border-b border-surface-hover">
            <div className="w-[400px] h-full border-r border-surface-hover flex items-center justify-between px-10">
              <div>akm</div>
              <div className="bg-surface-hover group-hover:bg-primary rounded-full p-2">
                <LocationFillIcon color="var(--color-blueGray)" />
              </div>
            </div>
            <div className="flex-1 flex gap-10 px-10">
              <div className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300 select-none">
                7:30 AM
              </div>
              <div className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300">
                7:30 AM
              </div>
              <div className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300">
                7:30 AM
              </div>
              <div className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300">
                10:30 AM
              </div>
            </div>
          </div>
          <div className="w-full h-[100px] flex items-center">
            <div className="w-[400px] h-full border-r border-surface-hover flex items-center px-10">
              akm
            </div>
            <div className="flex-1 flex gap-10 px-10">
              <div className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300 select-none">
                7:30 AM
              </div>
              <div className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300">
                7:30 AM
              </div>
              <div className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300">
                7:30 AM
              </div>
              <div className="w-24 h-10 bg-surface-hover flex items-center justify-center rounded-md shadow-md text-sm cursor-pointer hover:bg-primary transition-300">
                10:30 AM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPlan;
