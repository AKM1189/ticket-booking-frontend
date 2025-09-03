import { useUserQuery } from "@/api/query/admin/userQuery";
import { inputStyle } from "@/constants/styleConstants";
import { Role } from "@/types/AuthType";
import type { UserType } from "@/types/UserType";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Modal,
  Pagination,
  Table,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconUser,
  IconUserCancel,
  IconUserCheck,
  IconUserCog,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { zodResolver } from "mantine-form-zod-resolver";
import { userSchema } from "@/schema/UserSchema";
import { useLoadingStore } from "@/store/useLoading";
import {
  useAddUserMutation,
  useDeactivateUserMutation,
  useUpdateUserMutation,
} from "@/api/mutation/admin/userMutation";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { useAuthStore } from "@/store/authStore";
import type { PaginationType } from "@/types/PagintationType";

const UserManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<Role>(Role.user);
  const [searchTerm, setSearchTerm] = useState("");
  const { user: currentUser } = useAuthStore();

  const [users, setUsers] = useState<UserType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const { data, refetch } = useUserQuery(
    searchTerm,
    activeTab,
    pagination.page,
  );
  const { mutate: addUserMutation } = useAddUserMutation();
  const { mutate: updateUserMutation } = useUpdateUserMutation(
    editingUser?.role,
  );
  const { mutate: deleteUserMutation } = useDeactivateUserMutation(
    editingUser?.role,
  );

  const { showLoading } = useLoadingStore();
  const { open: deactivateConfirm } = useConfirmModalStore();
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phoneNo: "",
    },
    validate: zodResolver(userSchema),
  });

  useEffect(() => {
    if (data) {
      setUsers(data.data);
      setPagination(data.pagination);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [activeTab, pagination, debouncedSearchTerm]);

  const handleSubmit = (values: any) => {
    showLoading(true);
    const data = {
      ...values,
    };
    if (editingUser) {
      updateUserMutation(
        { data: { ...data, role: editingUser.role }, id: editingUser.id },
        {
          onSuccess: () => {
            showLoading(false);
            close();
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    } else {
      addUserMutation(
        { data: { ...data, role: "admin" } },
        {
          onSuccess: () => {
            showLoading(false);
            close();
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    }
  };

  const handleDeactivate = (id: number) => {
    if (editingUser) {
      deleteUserMutation(
        { id },
        {
          onSuccess: () => {
            showLoading(false);
            close();
          },
          onError: () => {
            showLoading(false);
          },
        },
      );
    }
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
        <Button
          className="dashboard-btn"
          leftSection={<IconPlus size={16} />}
          onClick={open}
        >
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
            placeholder="Search users by name, email, and phone"
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, maxWidth: 400 }}
            classNames={inputStyle}
          />
        </Group>

        <Tabs
          defaultValue="user"
          mt={15}
          onChange={(val: any) => setActiveTab(val)}
        >
          <Tabs.List>
            <Tabs.Tab value="user">
              <Group gap={5} align="center">
                <IconUser size={18} />
                User
              </Group>
            </Tabs.Tab>
            <Tabs.Tab value="admin">
              <Group gap={5} align="center">
                <IconUserCog size={18} />
                Admin
              </Group>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={activeTab} py={"lg"}>
            <div className="overflow-scroll">
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>No</Table.Th>
                    <Table.Th className="min-w-[150px]">Name</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Phone No</Table.Th>
                    <Table.Th>Status</Table.Th>
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
                        <Table.Td>
                          {user.name +
                            (user.email === currentUser?.email ? " (You)" : "")}
                        </Table.Td>
                        <Table.Td>{user.email}</Table.Td>
                        <Table.Td>{user.phoneNo}</Table.Td>
                        <Table.Td>
                          {user.active ? (
                            <Badge color="green" variant="light">
                              Active
                            </Badge>
                          ) : (
                            <Badge color="red" variant="light">
                              Deactivated
                            </Badge>
                          )}
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon
                              variant="light"
                              color="orange"
                              onClick={() => handleEditUser(user)}
                            >
                              <IconEdit size={16} />
                            </ActionIcon>

                            {user.active ? (
                              user.email !== currentUser?.email && (
                                <ActionIcon
                                  variant="light"
                                  color="red"
                                  onClick={() => {
                                    setEditingUser(user);
                                    deactivateConfirm({
                                      title: "Deactivate User",
                                      message:
                                        "Are you sure you want to deactivate this user?",
                                      onConfirm: () =>
                                        handleDeactivate(user.id),
                                    });
                                  }}
                                >
                                  <IconUserCancel size={16} />
                                </ActionIcon>
                              )
                            ) : (
                              <ActionIcon
                                variant="light"
                                color="green"
                                onClick={() => {
                                  setEditingUser(user);
                                  deactivateConfirm({
                                    title: "Activate User",
                                    message:
                                      "Are you sure you want to activate this user?",
                                    onConfirm: () => handleDeactivate(user.id),
                                  });
                                }}
                              >
                                <IconUserCheck size={16} />
                              </ActionIcon>
                            )}
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                </Table.Tbody>
              </Table>
            </div>
            {users?.length > 0 && (
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

            {users?.length === 0 && (
              <Text ta="center" c="dimmed" py="xl">
                <div className="flex justify-center mb-2">
                  {activeTab == "user" ? (
                    <IconUser size={30} />
                  ) : (
                    <IconUserCog size={30} />
                  )}
                </div>
                No {activeTab} found
              </Text>
            )}
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
              {...form.getInputProps("name")}
              classNames={inputStyle}
            />
            <TextInput
              label="Email"
              placeholder="Enter admin email"
              {...form.getInputProps("email")}
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
              {editingUser ? "Update" : "Add"}{" "}
              {editingUser?.role === Role.admin ? "Admin" : "User"}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
