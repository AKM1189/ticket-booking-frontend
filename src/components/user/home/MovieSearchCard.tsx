import { getSearchFilters, searchMovie } from "@/api/function/user/movieApi";
import { routes } from "@/routes";
import type { MovieType } from "@/types/MovieTypes";
import { StatusType } from "@/types/NotificationType";
import type { TheatreType } from "@/types/TheatreTypes";
import { showNotification } from "@/utils/showNotification";
import { Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendar, IconMapPin, IconMovie } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

interface MovieSearchBoxProps {
  theatres: TheatreType[];
}

const selectBoxStyle = {
  root: {
    minWidth: "150px",
  },
  label: {
    marginBottom: "10px",
  },
  input: {
    background: "transparent",
    color: "var(--color-text)",
  },
};

const autoCompleteStyle = {
  root: {
    minWidth: "150px",
  },
  label: {
    marginBottom: "10px",
  },
  input: {
    background: "transparent",
    color: "var(--color-text)",
    height: "42px",
  },
};

type FilterDataType = {
  theatres: TheatreType[];
  movies: MovieType[];
  showDates: string[];
};
const MovieSearchCard = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState<FilterDataType>({
    theatres: [],
    movies: [],
    showDates: [],
  });

  const form = useForm({
    initialValues: {
      theatreId: "",
      date: "",
      movieId: "",
    },
    validate: {
      theatreId: (value) => !value && "Location is required!",
      date: (value) => !value && "Date is required!",
      movieId: (value) => !value && "Movie is required!",
    },
  });

  useEffect(() => {
    const getFilters = async () => {
      const data = await getSearchFilters();
      setFilterData(data?.data);
    };
    getFilters();
  }, []);

  // useEffect(() => {
  //   const getFilters = async () => {
  //     const data = await getSearchFilters(
  //       form.values.theatreId,
  //       form.values.date,
  //       form.values.movieId,
  //     );

  //     setFilterData(data?.data);
  //     console.log("filters", data);
  //   };
  //   getFilters();
  // }, [form.values]);

  const handleSubmit = async (values: any) => {
    const { theatreId, date, movieId } = values;
    const data = await searchMovie(theatreId, date, movieId);
    console.log("data", data);
    if (data?.data[0]) {
      navigate(
        `${routes.user.ticketPlan}?movieId=${data?.data[0]?.id}&showDate=${form.values.date}`,
      );
    } else {
      showNotification({
        title: "No Schedule",
        message: "Not movie show time available!",
        type: StatusType.error,
      });
    }
  };

  return (
    <div className="absolute left-[50%] translate-x-[-50%] top-[50px] sm:top-[-60%] mt-[-50px] min-h-[200px] w-full bg-surface-hover sm:rounded-lg p-8 sm:p-10">
      <div className="text-lg md:text-2xl mb-2 uppercase">
        Welcome to <span className="text-accent font-bold">Movie Palace</span>
      </div>
      <div className="text-sm md:text-base uppercase mb-5">
        Are you looking for movies?
      </div>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="form flex max-lg:flex-col justify-center lg:items-end gap-5 lg:gap-10 bg-background/30 p-8 sm:p-10 rounded-lg">
          <div className="flex gap-5 lg:gap-10 justify-between max-md:flex-col">
            {/* location */}
            <Select
              label={
                <div className="flex gap-2 max-md:text-sm">
                  <IconMapPin color="var(--color-accent)" />
                  Location
                </div>
              }
              placeholder="Select Location"
              size="md"
              data={filterData?.theatres?.map((theatre) => ({
                label: `Movie Palace (${theatre?.location})`,
                value: theatre?.id.toString(),
              }))}
              styles={selectBoxStyle}
              className="max-sm:!w-full"
              classNames={{
                input: twMerge(
                  "max-md:!text-sm",
                  form.errors.theatreId &&
                    "placeholder:!text-[#9ca4b1] !border-[#9fa7b9]",
                ),
                option: "max-md:!text-sm",
                error: "placeholder:!text-white",
              }}
              {...form.getInputProps("theatreId")}
            />

            {/* date */}
            <Select
              label={
                <div className="flex gap-2 max-md:text-sm">
                  <IconCalendar color="var(--color-accent)" />
                  Date
                </div>
              }
              size="md"
              placeholder="Select Date"
              data={filterData.showDates}
              styles={selectBoxStyle}
              className="max-md:!w-full"
              classNames={{
                input: twMerge(
                  "max-md:!text-sm",
                  form.errors.date &&
                    "placeholder:!text-[#9ca4b1] !border-[#9fa7b9]",
                ),
                option: "max-md:!text-sm",
              }}
              {...form.getInputProps("date")}
            />

            <Select
              label={
                <div className="flex gap-1 max-md:text-sm">
                  <IconMovie color="var(--color-accent)" />
                  Movies
                </div>
              }
              placeholder="Search Movies"
              data={filterData?.movies?.map((movie) => ({
                label: movie?.title,
                value: movie?.id.toString(),
              }))}
              size="md"
              styles={autoCompleteStyle}
              className="max-md:!w-full"
              classNames={{
                input: twMerge(
                  "max-md:!text-sm",
                  form.errors.movieId &&
                    "placeholder:!text-[#9ca4b1] !border-[#9fa7b9]",
                ),
                option: "max-md:!text-sm",
              }}
              {...form.getInputProps("movieId")}
            />
          </div>

          <div className="w-full md:w-[100px]">
            <Button type="submit" className="!w-full max-md:!text-sm">
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MovieSearchCard;
