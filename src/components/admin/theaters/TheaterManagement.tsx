import { useState, useMemo } from "react";
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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";
import SeatLayoutViewer from "./SeatLayoutViewer";
import { useForm } from "@mantine/form";
import type { TheaterType } from "@/types/AdminTypes";

// Mock data
const mockTheaters: TheaterType[] = [
  {
    id: 1,
    name: "Theater 1",
    location: "Downtown Mall",
    capacity: 150,
    seatLayout: {
      rows: 10,
      seatsPerRow: 15,
      aisles: [5, 10],
      disabledSeats: ["A1", "A15", "J1", "J15"],
    },
    isActive: true,
  },
  {
    id: 2,
    name: "Theater 2",
    location: "City Center",
    capacity: 200,
    seatLayout: {
      rows: 12,
      seatsPerRow: 18,
      aisles: [6, 12],
      disabledSeats: [],
    },
    isActive: true,
  },
  {
    id: 3,
    name: "VIP Theater",
    location: "Premium Wing",
    capacity: 50,
    seatLayout: {
      rows: 5,
      seatsPerRow: 10,
      aisles: [5],
      disabledSeats: [],
    },
    isActive: false,
  },
];

const TheaterManagement = () => {
  const [theaters, setTheaters] = useState<TheaterType[]>(mockTheaters);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [editingTheater, setEditingTheater] = useState<TheaterType | null>(
    null,
  );

  const form = useForm({
    initialValues: {
      name: "",
      location: "",
      capacity: 0,
      rows: 0,
      seatsPerRow: 0,
      aisles: "",
      disabledSeats: "",
      isActive: true,
    },
  });

  // Memoize filtered theaters to prevent unnecessary recalculations
  const filteredTheaters = useMemo(() => {
    return theaters.filter(
      (theater) =>
        theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theater.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [theaters, searchTerm]);

  const handleAddTheater = () => {
    setEditingTheater(null);
    form.reset();
    open();
  };

  const handleEditTheater = (theater: TheaterType) => {
    setEditingTheater(theater);
    form.setValues({
      name: theater.name,
      location: theater.location,
      capacity: theater.capacity,
      rows: theater.seatLayout.rows,
      seatsPerRow: theater.seatLayout.seatsPerRow,
      aisles: theater.seatLayout.aisles.join(", "),
      disabledSeats: theater.seatLayout.disabledSeats.join(", "),
      isActive: theater.isActive,
    });
    open();
  };

  const handleSubmit = (values: typeof form.values) => {
    const aislesArray = values.aisles
      .split(",")
      .map((a) => parseInt(a.trim()))
      .filter((a) => !isNaN(a));

    const disabledSeatsArray = values.disabledSeats
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const theaterData: Omit<TheaterType, "id"> = {
      name: values.name,
      location: values.location,
      capacity: values.capacity,
      seatLayout: {
        rows: values.rows,
        seatsPerRow: values.seatsPerRow,
        aisles: aislesArray,
        disabledSeats: disabledSeatsArray,
      },
      isActive: values.isActive,
    };

    if (editingTheater) {
      setTheaters((prev) =>
        prev.map((theater) =>
          theater.id === editingTheater.id
            ? { ...theaterData, id: editingTheater.id }
            : theater,
        ),
      );
    } else {
      const newTheater: TheaterType = {
        ...theaterData,
        id: Date.now(),
      };
      setTheaters((prev) => [...prev, newTheater]);
    }
    close();
  };

  const handleDeleteTheater = (id: number) => {
    setTheaters((prev) => prev.filter((theater) => theater.id !== id));
  };

  const toggleTheaterStatus = (id: number) => {
    setTheaters((prev) =>
      prev.map((theater) =>
        theater.id === id
          ? { ...theater, isActive: !theater.isActive }
          : theater,
      ),
    );
  };
  const inputStyle = {
    input: "dashboard-input",
    label: "!mb-2 !text-text",
  };

  const numInputStyle = {
    ...inputStyle,
    control: "input-control",
  };
  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Theater Management</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          className="dashboard-btn"
          onClick={handleAddTheater}
        >
          Add Theater
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
            placeholder="Search theaters..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
            classNames={{
              input: "!bg-transparent !border-surface-hover",
            }}
          />
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Theater Name</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Capacity</Table.Th>
              <Table.Th>Layout</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredTheaters.map((theater) => (
              <Table.Tr key={theater.id}>
                <Table.Td>
                  <Text size="sm" fw={500}>
                    {theater.name}
                  </Text>
                </Table.Td>
                <Table.Td>{theater.location}</Table.Td>
                <Table.Td>{theater.capacity} seats</Table.Td>
                <Table.Td>
                  <Text size="xs" c="dimmed" className="!text-blueGray">
                    {theater.seatLayout.rows} rows ×{" "}
                    {theater.seatLayout.seatsPerRow} seats
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={theater.isActive ? "green" : "red"}
                    // variant="light"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleTheaterStatus(theater.id)}
                  >
                    {theater.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      //   variant="light"
                      color="orange"
                      onClick={() => handleEditTheater(theater)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      //   variant="light"
                      color="red"
                      onClick={() => handleDeleteTheater(theater.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* Seat Layout Viewers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTheaters.slice(0, 2).map((theater) => (
          <SeatLayoutViewer
            key={theater.id}
            layout={theater.seatLayout}
            theaterName={theater.name}
          />
        ))}
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title={editingTheater ? "Edit Theater" : "Add New Theater"}
        size="lg"
        classNames={{
          header: "dashboard-bg",
          content: "dashboard-bg",
          close: "!text-text hover:!bg-surface-hover",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Theater Name"
                placeholder="Enter theater name"
                required
                {...form.getInputProps("name")}
                classNames={inputStyle}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                classNames={inputStyle}
                label="Location"
                placeholder="Enter theater location"
                required
                {...form.getInputProps("location")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Total Capacity"
                placeholder="Enter total capacity"
                required
                min={1}
                {...form.getInputProps("capacity")}
                classNames={numInputStyle}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <label htmlFor="active" className="text-sm font-[500]">
                Active Status
              </label>
              <Switch
                description="Theater is available for scheduling"
                id="active"
                classNames={{
                  root: "mt-4",
                  body: "!flex !items-center",
                  description: "!py-0 !m-0",
                }}
                styles={(_theme, params) => ({
                  track: {
                    backgroundColor: params.checked
                      ? "var(--color-primary)"
                      : "var(--color-surface-hover)", // ON: blue, OFF: gray
                  },
                })}
                {...form.getInputProps("isActive", { type: "checkbox" })}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Number of Rows"
                placeholder="Enter number of rows"
                required
                min={1}
                classNames={numInputStyle}
                {...form.getInputProps("rows")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Seats per Row"
                placeholder="Enter seats per row"
                required
                min={1}
                classNames={numInputStyle}
                {...form.getInputProps("seatsPerRow")}
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
          </Grid>
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={close} className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              {editingTheater ? "Update" : "Add"} Theater
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default TheaterManagement;
