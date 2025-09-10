import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Loader,
  Modal,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  IconBuilding,
  IconCancel,
  IconEdit,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/useLoading";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import type { TheatreInputType, TheatreType } from "@/types/TheatreTypes";
import { useForm } from "@mantine/form";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { theatreSchema } from "@/schema/TheatreSchema";
import { zodResolver } from "mantine-form-zod-resolver";
import { inputStyle } from "@/constants/styleConstants";
import { useTheatreQuery } from "@/api/query/admin/theatreQuery";
import {
  useAddTheatreMutation,
  useDeleteTheatreMutation,
  useUpdateTheatreMutation,
} from "@/api/mutation/admin/theatreMutation";
import type { PaginationType } from "@/types/PagintationType";
import { usePermisson } from "@/hooks/usePermisson";
import { permissionList } from "@/constants/permissons";

const TheatreManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingTheatre, setEditingTheatre] = useState<TheatreType | null>(
    null,
  );
  const [theatres, setTheatres] = useState<TheatreType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { showLoading } = useLoadingStore();
  const { open: openConfirm } = useConfirmModalStore();
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const { data, isPending, refetch } = useTheatreQuery(
    searchTerm,
    statusFilter,
  );
  const { mutate: addTheatreMutation } = useAddTheatreMutation();
  const { mutate: updateTheatreMutation } = useUpdateTheatreMutation();
  const { mutate: deactivateTheatreMutation } = useDeleteTheatreMutation();

  const { hasAccess } = usePermisson();

  const form = useForm({
    initialValues: {
      name: "",
      location: "",
      region: "",
      city: "",
      phoneNo: "",
    },
    validate: zodResolver(theatreSchema),
  });

  useEffect(() => {
    setTheatres(data?.data);
    setPagination(data?.pagination);
  }, [data]);

  const handleAddTheater = () => {
    form.reset();
    setEditingTheatre(null);
    open();
  };

  useEffect(() => {
    refetch();
  }, [pagination, debouncedSearchTerm, statusFilter]);

  const handleEditTheatre = (theatre: TheatreType) => {
    setEditingTheatre(theatre);
    form.setValues({
      name: theatre.name,
      location: theatre.location,
      region: theatre.region,
      city: theatre.city,
      phoneNo: theatre.phoneNo,
    });
    open();
  };

  const handleDeactivate = (id: number) => {
    // showLoading(true);
    deactivateTheatreMutation({ id });
  };

  const handleSubmit = (values: TheatreInputType) => {
    showLoading(true);

    if (editingTheatre) {
      updateTheatreMutation(
        { data: values, id: editingTheatre.id },
        {
          onSuccess: () => {
            close();
            showLoading(false);
          },
          onError: () => showLoading(false),
        },
      );
    } else {
      addTheatreMutation(
        { data: values },
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

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Theatre Management</Title>
        {hasAccess(permissionList.createTheatre) && (
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAddTheater}
            className="dashboard-btn"
          >
            Add Theatre
          </Button>
        )}
      </Group>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="dashboard-bg"
      >
        <Group justify="space-between">
          <TextInput
            placeholder="Search theatres..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            classNames={inputStyle}
            style={{ flex: 1 }}
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

        <div className="overflow-scroll">
          {isPending ? (
            <div className="h-full min-h-[200px] flex justify-center items-center">
              <Loader size={"md"} />
            </div>
          ) : (
            <div>
              <Table striped highlightOnHover mt={"md"}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Location</Table.Th>
                    <Table.Th>Region</Table.Th>
                    <Table.Th>City</Table.Th>
                    <Table.Th>Phone</Table.Th>
                    <Table.Th>Total Screens</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {theatres?.map((theatre) => (
                    <Table.Tr key={theatre.id}>
                      <Table.Td className="min-w-[150px]">
                        {theatre.name}
                      </Table.Td>
                      <Table.Td className="min-w-[150px]">
                        {theatre.location}
                      </Table.Td>
                      <Table.Td>{theatre.region}</Table.Td>
                      <Table.Td>{theatre.city}</Table.Td>
                      <Table.Td>{theatre.phoneNo}</Table.Td>
                      <Table.Td>{theatre.totalScreens}</Table.Td>
                      <Table.Td className="min-w-[80px]">
                        {theatre.active ? (
                          <Badge color="green" variant="light">
                            Active
                          </Badge>
                        ) : (
                          <Badge color="red" variant="light">
                            Inactive
                          </Badge>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            variant="light"
                            color="orange"
                            disabled={!hasAccess(permissionList.updateTheatre)}
                            onClick={() => handleEditTheatre(theatre)}
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            color="red"
                            disabled={!hasAccess(permissionList.deleteTheatre)}
                            onClick={() =>
                              openConfirm({
                                title: `${
                                  theatre.active ? "Deactivate" : "Activate"
                                } Theatre`,
                                message: `Are you sure you want to ${
                                  theatre.active ? "deactivate" : "activate"
                                } this theatre?`,
                                onConfirm: () => handleDeactivate(theatre.id),
                              })
                            }
                            style={{
                              "--mantine-color-disabled":
                                "var(--color-darkGray)", // your desired border color (e.g. blue)
                            }}
                          >
                            <IconCancel size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          )}

          {/* <MantineReactTable */}
        </div>

        {theatres?.length === 0 && !isPending && (
          <Text ta="center" c="dimmed" py="xl">
            <div className="flex justify-center mb-2">
              <IconBuilding size={30} />
            </div>
            No theatre found
          </Text>
        )}

        {theatres?.length > 0 && (
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
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title={editingTheatre ? "Edit Theatre" : "Add New Theatre"}
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
              label="Theatre Name"
              placeholder="Enter theatre name"
              {...form.getInputProps("name")}
              classNames={inputStyle}
            />
            <TextInput
              label="Location"
              placeholder="Enter theatre location"
              {...form.getInputProps("location")}
              classNames={inputStyle}
            />
            <TextInput
              label="Region"
              placeholder="Enter theatre region"
              {...form.getInputProps("region")}
              classNames={inputStyle}
            />
            <TextInput
              label="City"
              placeholder="Enter city"
              {...form.getInputProps("city")}
              classNames={inputStyle}
            />

            <div className="mt-5">
              <label className="text-sm text-text font-medium">
                Phone Number
              </label>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="MM"
                value={form.values.phoneNo}
                onChange={(val: any) => {
                  form.setFieldValue("phoneNo", val);
                }}
                className="admin-phone-input"
              />
              <p className="text-xs text-red-400 mt-1">{form.errors.phoneNo}</p>
            </div>
          </div>

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={close} className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              {editingTheatre ? "Update" : "Add"} Genre
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default TheatreManagement;
