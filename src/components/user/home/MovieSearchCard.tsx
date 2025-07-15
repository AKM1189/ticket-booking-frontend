import DateIcon from "@/assets/svgs/DateIcon";
import { LocationIcon } from "@/assets/svgs";
import MovieIcon from "@/assets/svgs/MovieIcon";
import { Autocomplete, Button, Select } from "@mantine/core";

interface MovieSearchBoxProps {
  selectedMovie?: string | undefined;
  setSelectedMovie?: (value: string) => void;
}

const MovieSearchCard = ({
  selectedMovie,
  setSelectedMovie,
}: MovieSearchBoxProps) => {
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

  return (
    <div className="absolute left-[50%] translate-x-[-50%] top-[50px] sm:top-[-60%] mt-[-50px] min-h-[200px] w-full bg-surface-hover sm:rounded-lg p-8 sm:p-10">
      <div className="text-lg md:text-2xl mb-2 uppercase">
        Welcome to <span className="text-accent font-bold">Movie Palace</span>
      </div>
      <div className="text-sm md:text-base uppercase mb-5">
        Are you looking for movies?
      </div>
      <div className="form flex max-lg:flex-col justify-center lg:items-end gap-5 lg:gap-10 bg-background/30 p-8 sm:p-10 rounded-lg">
        <div className="flex gap-5 lg:gap-10 justify-between max-md:flex-col">
          {/* location */}
          <Select
            label={
              <div className="flex gap-2 max-md:text-sm">
                <LocationIcon color="var(--color-accent)" />
                Location
              </div>
            }
            placeholder="Select Location"
            size="md"
            data={["React", "Angular", "Vue", "Native", "PHP", "NodeJs"]}
            styles={selectBoxStyle}
            className="max-sm:!w-full"
            classNames={{
              input: "max-md:!text-sm",
              option: "max-md:!text-sm",
            }}
          />

          {/* date */}
          <Select
            label={
              <div className="flex gap-2 max-md:text-sm">
                <DateIcon color="var(--color-accent)" />
                Date
              </div>
            }
            size="md"
            placeholder="Select Date"
            data={["React", "Angular", "Vue", "Native", "PHP", "NodeJs"]}
            styles={selectBoxStyle}
            className="max-md:!w-full"
            classNames={{
              input: "max-md:!text-sm",
              option: "max-md:!text-sm",
            }}
          />

          <Autocomplete
            label={
              <div className="flex gap-1 max-md:text-sm">
                <MovieIcon color="var(--color-accent)" />
                Movies
              </div>
            }
            placeholder="Search Movies"
            data={["React", "Angular", "Vue", "Svelte"]}
            value={selectedMovie}
            onChange={setSelectedMovie}
            size="md"
            styles={autoCompleteStyle}
            className="max-md:!w-full"
            classNames={{
              input: "max-md:!text-sm",
              option: "max-md:!text-sm",
            }}
          />
        </div>

        <div className="w-full md:w-[100px]">
          <Button type="submit" className="!w-full max-md:!text-sm">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieSearchCard;
