import {
  ActionIcon,
  Button,
  Card,
  Container,
  Group,
  Modal,
  NumberInput,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconUserStar,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/useLoading";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import type { SeatTypeTypes } from "@/types/SeatTypeTypes";
import { useForm } from "@mantine/form";
import { numInputStyle } from "@/constants/styleConstants";
import { useSeatTypeQuery } from "@/api/query/admin/seatTypeQuery";
import {
  useAddSeatTypeMutation,
  useDeleteSeatTypeMutation,
  useUpdateSeatTypeMutation,
} from "@/api/mutation/admin/seatTypeMutation";

const SeatTypeManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingType, setEditingType] = useState<SeatTypeTypes | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [types, setTypes] = useState<SeatTypeTypes[]>([]);
  const { showLoading } = useLoadingStore();
  const { open: openConfirm } = useConfirmModalStore();

  const { data, isLoading } = useSeatTypeQuery();

  const { mutate: deleteCastMutation } = useDeleteSeatTypeMutation();
  const { mutate: addSeatTypeMutation } = useAddSeatTypeMutation();

  const { mutate: updateSeatTypeMutation } = useUpdateSeatTypeMutation();

  const form = useForm({
    initialValues: {
      name: "",
      price: 0,
    },
  });

  useEffect(() => {
    setTypes(data?.data);
  }, [data]);

  // const filteredCasts = casts?.filter(
  //   (cast: CastType) =>
  //     cast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     cast.role.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  const handleAddCast = () => {
    form.reset();
    setEditingType(null);
    open();
  };

  const handleEditCast = (type: SeatTypeTypes) => {
    setEditingType(type);
    form.setValues({
      name: type.name,
      price: parseFloat(String(type.price)),
    });
    open();
  };

  const handleSubmit = (values: { name: string; price: number }) => {
    showLoading(true);
    const body = {
      name: values.name,
      price: parseFloat(String(values.price)).toFixed(2),
    };
    if (editingType) {
      updateSeatTypeMutation(
        { data: body, id: editingType?.id },
        {
          onSuccess: () => {
            close();
            showLoading(false);
          },
          onError: () => showLoading(false),
        },
      );
    } else {
      addSeatTypeMutation(
        { data: body },
        {
          onSuccess: () => {
            close();
            showLoading(false);
          },
          onError: () => showLoading(false),
        },
      );
    }
  };

  const handleDeleteCast = (id: number) => {
    showLoading(true);
    deleteCastMutation(
      { id },
      {
        onSuccess: () => showLoading(false),
        onError: () => showLoading(false),
      },
    );
  };
  const inputStyle = {
    input: "dashboard-input max-w-md",
    label: "!mb-2 !text-text",
  };
  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={2}>Seat Type Management</Title>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAddCast}
            className="dashboard-btn"
          >
            Add Seat Type
          </Button>
        </Group>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="dashboard-bg lg:w-[70%]"
        >
          <TextInput
            placeholder="Search seat type..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            classNames={inputStyle}
          />

          <Table striped highlightOnHover mt={"md"}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Seat Type</Table.Th>
                <Table.Th className="w-[100px]">Base Price</Table.Th>
                <Table.Th className="!ps-[50px]">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {types?.map((type) => (
                <Table.Tr key={type.id}>
                  <Table.Td>
                    <Group gap={"sm"} align="center">
                      <Text fw={500} lineClamp={1} size="sm">
                        {type.name}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td align="right">$ {type.price}</Table.Td>
                  <Table.Td className="!ps-[50px]">
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="orange"
                        onClick={() => handleEditCast(type)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() =>
                          openConfirm({
                            title: "Delete Movie",
                            message:
                              "Are you sure you want to delete this cast?",
                            onConfirm: () => handleDeleteCast(type.id),
                          })
                        }
                        style={{
                          "--mantine-color-disabled": "var(--color-darkGray)", // your desired border color (e.g. blue)
                        }}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {/* </SimpleGrid> */}

          {types?.length === 0 && !isLoading && (
            <Text ta="center" c="dimmed" py="xl">
              <div className="flex justify-center mb-2">
                <IconUserStar size={30} />
              </div>
              No cast found
            </Text>
          )}
        </Card>
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        title={editingType ? "Edit Seat Type" : "Add New Seat Type"}
        size="md"
        classNames={{
          header: "dashboard-bg",
          content: "dashboard-bg",
          close: "!text-text hover:!bg-surface-hover",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="space-y-4">
            <TextInput
              label="Name"
              placeholder="Enter seat type name"
              {...form.getInputProps("name")}
              classNames={inputStyle}
            />
            <NumberInput
              label="Price"
              placeholder="Enter price"
              {...form.getInputProps("price")}
              classNames={numInputStyle}
              min={0}
            />
          </div>

          <Group justify="flex-end" mt="lg">
            <Button variant="outline" onClick={close} className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              {editingType ? "Update" : "Add"} Seat Type
            </Button>
          </Group>
        </form>
      </Modal>

      {/* <CastModal opened={opened} onClose={close} cast={editingType} /> */}
    </Container>
  );
};

export default SeatTypeManagement;
