import { useMovieStore } from "@/store/useMovieStore";
import type { FilterListType } from "@/types/MovieTypes";
import { Checkbox } from "@mantine/core";

interface FilterCardProps {
  title: string;
  data: string[];
  type: keyof FilterListType;
}
const FilterCard = ({ title, data, type }: FilterCardProps) => {
  const { filterList, addFilter, removeFilter } = useMovieStore();

  const handleFilter = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedItem: string,
    type: keyof FilterListType,
  ) => {
    if (event.currentTarget.checked) {
      addFilter(type, selectedItem);
    } else {
      removeFilter(type, selectedItem);
    }
  };
  return (
    <div className="filter-card w-full bg-surface rounded-md px-4 sm:px-7 pt-2 sm:pt-0">
      <div className="py-3 sm:py-5 border-b border-surface-hover text-lg sm:text-xl font-semibold uppercase">
        {title}
      </div>
      <ul className="pt-5 pb-1">
        {data?.length > 0 &&
          data?.map((item) => (
            <li className="mb-3 sm:mb-5" key={item}>
              <Checkbox
                key={item}
                label={item}
                checked={filterList[type].some((i) => i === item)}
                color="var(--color-accent)"
                classNames={{
                  input: "!bg-transparent",
                  label: "!cursor-pointer !text-sm sm:!text-base",
                }}
                onChange={(event) => handleFilter(event, item, type)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FilterCard;
