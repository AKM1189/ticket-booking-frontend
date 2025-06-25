import type { FilterListType, LabelType } from "@/types/MovieTypes";
import { Checkbox } from "@mantine/core";

interface FilterCardProps {
  title: string;
  data: LabelType[];
  filterList: FilterListType;
  setFilterList: (value: FilterListType) => void;
  filterListByCategory: LabelType[];
  type: string;
}
const FilterCard = ({
  title,
  data,
  filterList,
  setFilterList,
  filterListByCategory,
  type,
}: FilterCardProps) => {
  //
  // handle checkbox
  const handleFilterList = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedItem: LabelType,
  ) => {
    if (event.currentTarget.checked) {
      filterListByCategory.push(selectedItem);
      setFilterList({ ...filterList, [type]: filterListByCategory });
    } else {
      setFilterList({
        ...filterList,
        [type]: filterListByCategory.filter(
          (item) => item.id !== selectedItem.id,
        ),
      });
    }
  };

  return (
    <div className="filter-card w-full bg-surface rounded-md px-7 pt-3">
      <div className="py-5 border-b border-surface-hover text-xl font-semibold uppercase">
        {title}
      </div>
      <ul className="py-5">
        {data?.length > 0 &&
          data?.map((item) => (
            <li className="mb-5">
              <Checkbox
                key={item.id}
                label={item.label}
                color="var(--color-accent)"
                classNames={{
                  input: "!bg-transparent",
                  label: "!cursor-pointer",
                }}
                onChange={(event) => handleFilterList(event, item)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FilterCard;
