import { useUserQuery } from "@/api/query/admin/userQuery";
import { inputStyle } from "@/constants/styleConstants";
import { Role } from "@/types/AuthType";
import type { UserType } from "@/types/UserType";
import {
  ActionIcon,
  Button,
  Card,
  FileInput,
  Group,
  Modal,
  Pagination,
  SegmentedControl,
  Table,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const UserManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<Role>(Role.user);

  const [users, setUsers] = useState<UserType[]>([]);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const { data, refetch } = useUserQuery(activeTab, pagination.page);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phoneNo: "",
    },
  });

  useEffect(() => {
    if (data) {
      setUsers(data?.data);
      setPagination(data?.pagination);
    }
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [activeTab, pagination]);

  const handleSubmit = (values: any) => {
    const data = {
      ...values,
    };
    console.log("data", data);
  };

  const handleEditUser = (user: UserType) => {
    setEditingUser(user);
    form.setValues({
      name: user.name,
      email: user.email,
      phoneNo: user.phoneNo,
    });
    open();
  };
  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Genre Management</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={open}>
          Add Admin
        </Button>
      </Group>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="dashboard-bg"
      >
        <Group mb="md" justify="space-between">
          <TextInput
            placeholder="Search users..."
            leftSection={<IconSearch size={16} />}
            //   value={}
            //   onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, maxWidth: 400 }}
            classNames={inputStyle}
          />
        </Group>

        <Tabs defaultValue="user" onChange={(val: any) => setActiveTab(val)}>
          <Tabs.List>
            <Tabs.Tab value="user">User</Tabs.Tab>
            <Tabs.Tab value="admin">Admin</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={activeTab} py={"lg"}>
            <div className="overflow-scroll">
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>No</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Phone No</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {users &&
                    users?.map((user, index) => (
                      <Table.Tr key={user.id}>
                        <Table.Td>
                          {data?.pagination?.page > 1
                            ? index +
                              1 +
                              (data?.pagination?.page - 1) *
                                data?.pagination?.limit
                            : index + 1}
                        </Table.Td>
                        <Table.Td>{user.name}</Table.Td>
                        <Table.Td>{user.email}</Table.Td>
                        <Table.Td>{user.phoneNo}</Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon
                              variant="light"
                              color="orange"
                              onClick={() => handleEditUser(user)}
                            >
                              <IconEdit size={16} />
                            </ActionIcon>
                            <ActionIcon
                              variant="light"
                              color="red"
                              onClick={() => {
                                //   setEditingMovie(movie);
                                // setDeleteModalOpen(true);
                                //   openConfirm({
                                //     title: "Delete Movie",
                                //     message:
                                //       "Are you sure you want to delete this movie?",
                                //   });
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
            </div>
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
          </Tabs.Panel>
        </Tabs>
      </Card>

      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
        title={editingUser ? "Edit Admin" : "Add New Admin"}
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
              placeholder="Enter admin name"
              required
              {...form.getInputProps("name")}
              classNames={inputStyle}
            />
            <TextInput
              label="Email"
              placeholder="Enter admin email"
              required
              {...form.getInputProps("email")}
              classNames={inputStyle}
            />
            {/* <TextInput
              label="Phone No"
              placeholder="Enter admin phone no"
              required
              {...form.getInputProps("phoneNo")}
              classNames={inputStyle}
            /> */}
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
              />
              <p className="text-xs text-red-400 mt-1">{form.errors.phoneNo}</p>
            </div>
          </div>
          <Group justify="flex-end" mt="lg">
            <Button
              variant="outline"
              className="dashboard-btn"
              //   onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              //   loading={isSubmitting}
              className="dashboard-btn"
            >
              {editingUser ? "Update" : "Add"} Admin
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
