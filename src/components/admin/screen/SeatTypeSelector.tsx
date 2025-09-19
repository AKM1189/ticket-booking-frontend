import { useSeatTypeQuery } from "@/api/query/admin/seatTypeQuery";
import { inputStyle, modalStyle } from "@/constants/styleConstants";
import type { SelectedTypeList } from "@/types/ScreenTypes";
import type { SeatTypeTypes } from "@/types/SeatTypeTypes";
import {
  Badge,
  Button,
  Card,
  Group,
  InputLabel,
  Modal,
  Select,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type SelectedType = {
  typeId: string;
  from: string;
  to: string;
};

const SeatTypeSelector = ({
  rowLetters,
  selectedTypeList,
  setSelectedTypeList,
  form,
}: {
  rowLetters: string[];
  selectedTypeList: SelectedTypeList[];
  setSelectedTypeList: (value: any) => void;
  form: any;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [seatTypes, setSeatTypes] = useState<SeatTypeTypes[]>([]);

  const { data: seatTypesData } = useSeatTypeQuery();

  const [selectedTypes, setSelectedTypes] = useState<SelectedType[]>(
    seatTypes?.map((t) => ({ typeId: t.id.toString(), from: "", to: "" })),
  );
  const [rowCountError, setRowCountError] = useState(false);
  const [typeError, setTypeError] = useState(false);

  useEffect(() => {
    setSeatTypes(seatTypesData?.data);
  }, [seatTypesData]);

  useEffect(() => {
    let typeList: SelectedType[] = [];
    selectedTypeList.map((item) => {
      typeList.push({
        typeId: item.typeId,
        from: item.seatList[0],
        to: item.seatList[item.seatList.length - 1],
      });
    });
    setSelectedTypes(typeList);
  }, [selectedTypeList]);

  useEffect(() => {
    console.log("selected types", selectedTypes);
  }, [selectedTypes]);

  const getSelectedSeatList = () => {
    let typeList: any[] = [];
    selectedTypes.forEach(({ typeId, from, to }) => {
      let seatList: any[] = [];

      if (from && to) {
        const start = getIndex(from);
        const end = getIndex(to);
        for (let i = start; i <= end; i++) seatList.push(rowLetters[i]);
      }
      if (seatList.length > 0) typeList.push({ typeId, seatList });
    });
    return typeList;
  };

  const handleAssign = () => {
    const usedSeats = getUsedIndexes();

    if (usedSeats.length !== rowLetters.length) {
      setTypeError(true);
      return;
    }
    setTypeError(false);
    if (selectedTypes.length > 0) {
      const seatList = getSelectedSeatList();
      console.log("seat list", seatList);
      setSelectedTypeList(seatList);
      close();
    }
  };

  const getIndex = (letter: string) => rowLetters.indexOf(letter);
  // Convert letters to Mantine Select data
  const rowLetterOptions = rowLetters.map((letter) => ({
    value: letter,
    label: letter,
  }));

  // Get letters blocked by existing ranges
  const getUsedIndexes = () => {
    let used: number[] = [];
    selectedTypes.forEach(({ from, to }) => {
      if (from && to) {
        const start = getIndex(from);
        const end = getIndex(to);
        for (let i = start; i <= end; i++) used.push(i);
      }
    });
    return used;
  };

  const handleChange = (
    typeId: string,
    field: "from" | "to",
    value: string,
  ) => {
    setSelectedTypes((prev) => {
      const exist = selectedTypes.find((item) => item.typeId === typeId);

      if (exist) {
        return prev.map((s) =>
          s.typeId === typeId
            ? { ...s, [field]: value, ...(field === "from" ? { to: "" } : {}) }
            : s,
        );
      } else {
        return [
          ...prev,
          {
            typeId,
            from: field === "from" ? value : "",
            to: field === "to" ? value : "",
          },
        ];
      }
    });
  };

  const getAvailableFromOptions = (typeId: string) => {
    const used = getUsedIndexes();
    const current = selectedTypes.find((s) => s.typeId === typeId);
    return rowLetterOptions.filter(
      (_, idx) =>
        !used.includes(idx) ||
        (current && current.from && idx === getIndex(current.from)),
    );
  };

  const getAvailableToOptions = (typeId: string, from?: string) => {
    if (!from) return [];
    const fromIndex = getIndex(from);
    let available = rowLetters.slice(fromIndex);

    selectedTypes.forEach((sel) => {
      if (sel.typeId !== typeId && sel.from && sel.to) {
        const start = getIndex(sel.from);
        const end = getIndex(sel.to);
        available = available.filter(
          (_, idx) => idx + fromIndex < start || idx + fromIndex > end,
        );
      }
    });

    return available.map((letter) => ({ value: letter, label: letter }));
  };
  return (
    <div>
      <div>
        <InputLabel mb={6}>Seat Type</InputLabel>
        <Button
          variant="outline"
          color="var(--color-surface-hover)"
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            if (rowLetters.length > 0) {
              setRowCountError(false);
              open();
            } else {
              form.setErrors("seatTypes", null);
              setRowCountError(true);
            }
          }}
          className="!block !w-full justify-start dashboard-btn !text-blueGray cast-selector"
          classNames={{ inner: "text-muted" }}
        >
          Assign Seat Type
        </Button>
        <p className="text-xs text-red-400 mt-2">
          {rowCountError && "Add Number of Rows first"}
        </p>

        {selectedTypeList.length > 0 && (
          <Card
            radius="md"
            withBorder
            className="dashboard-bg !text-sm !bg-surface-hover"
          >
            <Group gap={30}>
              {/* <div> */}
              <Table classNames={{ tr: "!border-0" }}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Seat Type</Table.Th>
                    <Table.Th className="">Base Price</Table.Th>
                    <Table.Th className="">Updated Price</Table.Th>
                    <Table.Th className="">Rows</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {selectedTypeList?.map((type) => {
                    const selected = seatTypes?.find(
                      (item) => item.id.toString() == type.typeId,
                    );

                    const updatePrice =
                      selected?.price && form.values.multiplier
                        ? parseInt(selected?.price) *
                          (form.values.multiplier ?? 1)
                        : selected?.price;

                    // if (type.seatList.length > 0)
                    return (
                      <Table.Tr>
                        <Table.Td>
                          <Text className="!text-sm !font-medium">
                            {selected?.name}
                          </Text>
                        </Table.Td>
                        <Table.Td className="font-medium">
                          $ {selected?.price}
                        </Table.Td>
                        <Table.Td className="text-green-500 font-medium">
                          ${" "}
                          {updatePrice &&
                            parseFloat(updatePrice.toString()).toFixed(2)}
                        </Table.Td>
                        <Table.Td>
                          <Badge color="var(--color-primary)" size="lg">
                            {type?.seatList?.map(
                              (item, index) =>
                                `${item}${
                                  index !== type?.seatList?.length - 1
                                    ? ", "
                                    : ""
                                }`,
                            )}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
              {/* <div className="flex items-center justify-start">
                      <div className="me-2 text-text font-semibold">
                        {selected?.name} {selected?.price}
                      </div>
                      <div>
                        -
                        <Badge
                          className="ms-2"
                          color="var(--color-primary)"
                          size="lg"
                        >
                          {type?.seatList?.map(
                            (item, index) =>
                              `${item}${
                                index !== type?.seatList?.length - 1 ? ", " : ""
                              }`,
                          )}
                        </Badge>
                      </div>
                    </div> */}
              {/* </div> */}
            </Group>
          </Card>
        )}
      </div>

      <Modal
        opened={opened}
        onClose={close}
        classNames={modalStyle}
        title="Assign Seat Type"
      >
        <Table classNames={{ tr: "!border-0" }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Seat Type</Table.Th>
              <Table.Th className="w-[150px]">From</Table.Th>
              <Table.Th className="w-[150px]">To</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {seatTypes?.map((type) => {
              const selected = selectedTypes.find(
                (s) => s.typeId === type.id.toString(),
              )!;
              return (
                <Table.Tr key={type.id}>
                  <Table.Td>
                    <div className="text-sm">{type.name}</div>
                  </Table.Td>
                  <Table.Td>
                    <Select
                      data={getAvailableFromOptions(type.id.toString())}
                      value={selected?.from || null}
                      onChange={(val) =>
                        handleChange(type.id.toString(), "from", val!)
                      }
                      w={80}
                      classNames={inputStyle}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Select
                      data={getAvailableToOptions(
                        type.id.toString(),
                        selected?.from,
                      )}
                      value={selected?.to || null}
                      onChange={(val) =>
                        handleChange(type.id.toString(), "to", val!)
                      }
                      w={80}
                      disabled={!selected?.from}
                      classNames={inputStyle}
                    />
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>

        {typeError && (
          <div className="text-red-400 text-xs">
            Some rows are missing in type assignment.
          </div>
        )}

        <div className="w-full flex justify-end mt-3">
          <Button
            className="dashboard-btn me-3"
            variant="outline"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            className="dashboard-btn"
            onClick={() => {
              handleAssign();
            }}
          >
            Assign
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SeatTypeSelector;
