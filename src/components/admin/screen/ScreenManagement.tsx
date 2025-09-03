import { useState, useEffect } from "react";
import {
  Title,
  Button,
  Table,
  Badge,
  Group,
  ActionIcon,
  TextInput,
  Card,
  Text,
  Modal,
  Grid,
  NumberInput,
  Switch,
  Textarea,
  Select,
  Pagination,
  Loader,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconEdit,
  IconSearch,
  IconEye,
  IconCancel,
  IconDeviceTv,
} from "@tabler/icons-react";
import SeatLayoutViewer from "./SeatLayoutViewer";
import { useForm } from "@mantine/form";
import type {
  ScreenInputType,
  ScreenType,
  SelectedTypeList,
} from "@/types/ScreenTypes";
import { useTheatreQuery } from "@/api/query/admin/theatreQuery";
import type { TheatreType } from "@/types/TheatreTypes";
import { useScreenQuery } from "@/api/query/admin/screenQuery";
import {
  useAddScreenMutation,
  useDeleteScreenMutation,
  useUpdateScreenMutation,
} from "@/api/mutation/admin/screenMutation";
import { useLoadingStore } from "@/store/useLoading";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import type { PaginationType } from "@/types/PagintationType";
import { zodResolver } from "mantine-form-zod-resolver";
import { screenSchema } from "@/schema/ScreenSchema";
import { inputStyle } from "@/constants/styleConstants";
import SeatTypeSelector from "./SeatTypeSelector";

const ScreenManagement = () => {
  const [screens, setScreens] = useState<ScreenType[]>([]);
  const [theatres, setTheatres] = useState<TheatreType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editingScreen, setEditingScreen] = useState<ScreenType | null>(null);
  const { showLoading } = useLoadingStore();
  const { open: deleteConfirm } = useConfirmModalStore();
  const [statusFilter, setStatusFilter] = useState<string | null>();
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);
  const [rowTotal, setRowTotal] = useState(0);
  const [rowLetters, setRowLetters] = useState<string[]>([]);
  const [selectedTypeList, setSelectedTypeList] = useState<SelectedTypeList[]>(
    [],
  );

  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const { data: theatreData } = useTheatreQuery();

  const {
    data: screenData,
    isPending,
    refetch,
  } = useScreenQuery(searchTerm, statusFilter, pagination?.page);

  const { mutate: addScreenMutation } = useAddScreenMutation();
  const { mutate: updateScreenMutation } = useUpdateScreenMutation();
  const { mutate: deleteScreenMutation } = useDeleteScreenMutation();

  const form = useForm({
    initialValues: {
      name: "",
      theatreId: "",
      type: "",
      capacity: 0,
      rows: 0,
      cols: 0,
      aisles: "",
      disabledSeats: "",
      active: true,
      multiplier: 1,
      seatTypes: [] as SelectedTypeList[],
    },
    validate: zodResolver(screenSchema),
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, pagination, statusFilter]);

  useEffect(() => {
    form.setFieldValue("capacity", rowTotal * form.values.cols);
    form.setFieldValue("rows", rowTotal);
  }, [rowTotal, form.values.cols]);

  useEffect(() => {
    let rowLetter: string[] = [];
    for (let r = 0; r < rowTotal; r++) {
      rowLetter.push(String.fromCharCode(65 + r)); // A, B, C...
    }
    setRowLetters(rowLetter);
  }, [rowTotal]);

  const handleAddTheater = () => {
    setEditingScreen(null);
    form.reset();
    setRowTotal(0);
    open();
  };

  useEffect(() => {
    setTheatres(theatreData?.data);
  }, [theatreData]);

  useEffect(() => {
    setScreens(screenData?.data);
    setPagination(screenData?.pagination);
  }, [screenData]);

  useEffect(() => {
    if (selectedTypeList?.length > 0) {
      form.setFieldValue("seatTypes", selectedTypeList);
    }
  }, [selectedTypeList]);

  const handleEditTheater = (screen: ScreenType) => {
    setEditingScreen(screen);
    if (screen) {
      form.setValues({
        name: screen.name,
        theatreId: String(screen?.theatre?.id),
        type: screen.type,
        capacity: screen.capacity,
        rows: screen.rows,
        cols: screen.cols,
        aisles: screen.aisles.join(", "),
        disabledSeats: screen.disabledSeats.join(", "),
        active: screen.active,
        multiplier: screen.multiplier,
        seatTypes: screen.seatTypes,
      });

      let typeList: SelectedTypeList[] = [];

      screen.seatTypes.map((item: any) => {
        typeList.push({
          typeId: item.seatType.id.toString(),
          seatList: item.seatList,
        });
      });
      setRowTotal(screen?.rows);
      setSelectedTypeList(typeList);
    }
    open();
  };

  const handleSubmit = (values: typeof form.values) => {
    showLoading(true);

    let totalRows = 0;

    selectedTypeList.map((item) => {
      totalRows += item.seatList.length;
    });

    if (totalRows !== rowLetters.length) {
      form.setFieldError(
        "seatTypes",
        "Some rows are missing in type assignment.",
      );
      return;
    }

    const aislesArray = values.aisles
      .split(",")
      .map((a) => parseInt(a.trim()))
      .filter((a) => !isNaN(a));

    const disabledSeatsArray = values.disabledSeats
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const body: Omit<ScreenInputType, "id"> = {
      name: values.name,
      theatreId: values.theatreId,
      type: values.type,
      capacity: values.capacity,
      rows: values.rows,
      cols: values.cols,
      aisles: aislesArray,
      disabledSeats: disabledSeatsArray,
      active: values.active,
      multiplier: values.multiplier,
      seatTypes: selectedTypeList,
    };
    if (editingScreen) {
      updateScreenMutation(
        { data: body, id: editingScreen?.id },
        {
          onSuccess: () => {
            close();
            showLoading(false);
            setEditingScreen(null);
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    } else {
      addScreenMutation(
        { data: body },
        {
          onSuccess: () => {
            close();
            showLoading(false);
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    }
    close();
  };
  const modalStyle = {
    header: "dashboard-bg",
    content: "dashboard-bg",
    close: "!text-text hover:!bg-surface-hover",
  };
  const handleDeleteTheater = (screen: ScreenType) => {
    deleteConfirm({
      title: `${screen.active ? "Deactivate" : "Activate"} Screen`,
      message: `Are you sure you want to ${
        screen.active ? "deactivate" : "activate"
      } this screen?`,
      onConfirm: () => deleteScreenMutation({ id: screen.id }),
    });
  };

  const toggleTheaterStatus = (id: number) => {
    setScreens((prev) =>
      prev.map((screen) =>
        screen.id === id ? { ...screen, isActive: !screen.active } : screen,
      ),
    );
  };

  const numInputStyle = {
    ...inputStyle,
    control: "input-control",
  };
  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Screen Management</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          className="dashboard-btn"
          onClick={handleAddTheater}
        >
          Add Screen
        </Button>
      </Group>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="dashboard-bg"
      >
        <Group mb="md">
          <TextInput
            placeholder="Search screens by name, theatre, type..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
            classNames={{
              input: "!bg-transparent !border-surface-hover !text-text",
            }}
          />
          <Select
            placeholder="Filter by status"
            data={["Active", "Inactive"]}
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
            classNames={inputStyle}
          />
        </Group>

        <div className="overflow-x-scroll min-h-[200px]">
          {isPending ? (
            <div className="h-full min-h-[200px] flex justify-center items-center">
              <Loader size={"md"} />
            </div>
          ) : (
            <div>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="min-w-[130px]">Screen Name</Table.Th>
                    <Table.Th className="!min-w-[200px] w-[250px]">
                      Theatre
                    </Table.Th>
                    <Table.Th>Type</Table.Th>
                    <Table.Th>Capacity</Table.Th>
                    <Table.Th className="min-w-[120px]">Layout</Table.Th>
                    <Table.Th>Disabled</Table.Th>
                    <Table.Th>Multiplier</Table.Th>
                    <Table.Th className="min-w-[100px]">Status</Table.Th>
                    <Table.Th className="min-w-[120px]">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {screens?.map((screen) => (
                    <Table.Tr key={screen.id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          {screen.name}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">
                          {screen?.theatre?.name} ({screen?.theatre?.location})
                        </Text>
                      </Table.Td>
                      <Table.Td>{screen.type}</Table.Td>
                      <Table.Td>{screen.capacity} seats</Table.Td>
                      <Table.Td>
                        <Text size="xs">
                          {screen.rows} rows × {screen.cols} seats
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={
                            screen.disabledSeats?.length > 0 ? "red" : "gray"
                          }
                          variant="light"
                        >
                          {screen.disabledSeats?.length} seat
                          {screen.disabledSeats?.length > 1 && "s"}
                        </Badge>
                      </Table.Td>

                      <Table.Td>{screen.multiplier}</Table.Td>

                      <Table.Td>
                        <Badge
                          color={screen.active ? "green" : "red"}
                          variant="light"
                          onClick={() => toggleTheaterStatus(screen.id)}
                        >
                          {screen.active ? "Active" : "Inactive"}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            variant="light"
                            onClick={() => {
                              setDetailOpen(true);
                              setEditingScreen(screen);
                            }}
                          >
                            <IconEye size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            color="orange"
                            onClick={() => handleEditTheater(screen)}
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                          {/* <Tooltip
                        classNames={{
                          tooltip: "!bg-surface-hover !text-text !text-[12px]",
                        }}
                        withArrow
                        label="Deactivate"
                      > */}
                          <ActionIcon
                            variant="light"
                            color="red"
                            onClick={() => handleDeleteTheater(screen)}
                          >
                            <IconCancel size={16} />
                          </ActionIcon>
                          {/* </Tooltip> */}
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
              {screens?.length > 0 && (
                <Group justify="center" mt={"xl"}>
                  <Pagination
                    total={pagination?.totalPages}
                    size={"sm"}
                    value={pagination?.page}
                    onChange={(value) =>
                      setPagination((prev) => ({ ...prev, page: value }))
                    }
                  />
                </Group>
              )}

              {screens?.length === 0 && (
                <Text ta="center" c="dimmed" py="xl">
                  <div className="flex justify-center mb-2">
                    <IconDeviceTv size={30} />
                  </div>
                  No screen found
                </Text>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Seat Layout Viewers */}

      <Modal
        opened={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={"Seat Layout"}
        size="lg"
        classNames={{
          title: "!text-lg !font-medium",
          header: "dashboard-bg",
          content: "dashboard-bg",
          close: "!text-text hover:!bg-surface-hover",
        }}
        centered
      >
        {editingScreen && (
          <SeatLayoutViewer
            key={editingScreen.id}
            seatTypes={editingScreen?.seatTypes}
            layout={{
              rows: editingScreen?.rows,
              seatsPerRow: editingScreen?.cols,
              disabledSeats: editingScreen?.disabledSeats,
              aisles: editingScreen?.aisles.map((aisle: any) =>
                parseInt(aisle),
              ),
            }}
            theaterName={editingScreen.name}
          />
        )}
      </Modal>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {screens?.map((screen) => (
          <SeatLayoutViewer
            key={screen.id}
            layout={{
              rows: screen?.rows,
              seatsPerRow: screen?.cols,
              disabledSeats: screen?.disabledSeats,
              aisles: screen?.aisles.map((aisle: any) => parseInt(aisle)),
            }}
            theaterName={screen.name}
          />
        ))}
      </div> */}

      <Modal
        opened={opened}
        onClose={() => {
          setSelectedTypeList([]);
          close();
        }}
        title={editingScreen ? "Edit Screen" : "Add New Screen"}
        size="lg"
        classNames={modalStyle}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Name Name"
                placeholder="Enter screen name"
                {...form.getInputProps("name")}
                classNames={inputStyle}
              />
            </Grid.Col>
            <Grid.Col>
              <Select
                label="Theatre"
                placeholder="Select theatre"
                data={theatres?.map((theatre) => ({
                  value: String(theatre?.id),
                  label: `${theatre?.name} (${theatre?.location})`,
                }))}
                clearable
                classNames={inputStyle}
                {...form.getInputProps("theatreId")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NumberInput
                label="Number of Rows"
                placeholder="Enter number of rows"
                min={1}
                classNames={numInputStyle}
                // {...form.getInputProps("rows")}
                value={rowTotal}
                onChange={(value: any) => setRowTotal(value)}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Seats per Row"
                placeholder="Enter seats per row"
                min={1}
                classNames={numInputStyle}
                {...form.getInputProps("cols")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NumberInput
                label="Total Capacity"
                placeholder="Enter total capacity"
                min={1}
                readOnly
                {...form.getInputProps("capacity")}
                classNames={{
                  ...numInputStyle,
                  input: "!bg-surface-hover !border-surface-hover !text-text",
                }}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Select
                label="Screen Type"
                placeholder="Select screen type"
                data={["2D", "3D", "IMAX"]}
                clearable
                classNames={inputStyle}
                {...form.getInputProps("type")}
              />
            </Grid.Col>

            <Grid.Col>
              <SeatTypeSelector
                rowLetters={rowLetters}
                selectedTypeList={selectedTypeList}
                setSelectedTypeList={setSelectedTypeList}
                form={form}
              />
              {form.errors["seatTypes"] && (
                <p className="text-xs text-red-400">
                  {form.errors["seatTypes"]}
                </p>
              )}
            </Grid.Col>

            <Grid.Col span={12}>
              <NumberInput
                classNames={numInputStyle}
                label="Seat Price Multipliers"
                placeholder="Enter price multiplier (default: 1, min: 0.5, max: 3)"
                description="Specify number which will be multiply to the base price of each seat type"
                {...form.getInputProps("multiplier")}
                defaultValue={1.0}
                min={0.5}
                max={3}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInput
                classNames={inputStyle}
                label="Aisles"
                placeholder="Enter aisle positions (comma separated, e.g., 5, 10)"
                description="Specify which seat numbers have aisles after them"
                {...form.getInputProps("aisles")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Disabled Seats"
                classNames={inputStyle}
                placeholder="Enter disabled seat codes (comma separated, e.g., A1, A15, J1)"
                description="Specify seats that are not available for booking"
                {...form.getInputProps("disabledSeats")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <label htmlFor="active" className="text-sm font-[500]">
                Active Status
              </label>
              <Switch
                description="Theater is available for scheduling"
                id="active"
                defaultChecked
                classNames={{
                  root: "mt-3",
                  body: "!flex !items-center",
                  description: "!py-0 !m-0",
                }}
                styles={(_theme, params) => ({
                  track: {
                    backgroundColor:
                      params.checked || params.defaultChecked
                        ? "var(--color-primary)"
                        : "var(--color-surface-hover)", // ON: blue, OFF: gray
                  },
                })}
                {...form.getInputProps("active", { type: "checkbox" })}
              />
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={close} className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              {editingScreen ? "Update" : "Add"} Screen
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default ScreenManagement;
