import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Loader,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconUserStar,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { CastType } from "@/types/CastTypes";
import CastModal from "./CastModal";
import { useCastQuery } from "@/api/query/admin/castQuery";
import { useDeleteCastMutation } from "@/api/mutation/admin/castMutation";
import { useLoadingStore } from "@/store/useLoading";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { usePermisson } from "@/hooks/usePermisson";
import { permissionList } from "@/constants/permissons";
import type { PaginationType } from "@/types/PagintationType";

const CastManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingCast, setEditingCast] = useState<CastType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);
  const [casts, setCasts] = useState<CastType[]>([]);
  const { showLoading } = useLoadingStore();
  const { open: openConfirm } = useConfirmModalStore();

  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const { data, refetch, isPending } = useCastQuery(
    pagination.page,
    searchQuery,
  );

  const { mutate: deleteCastMutation } = useDeleteCastMutation();
  const { hasAccess } = usePermisson();

  useEffect(() => {
    setCasts(data?.data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [pagination, debouncedSearchQuery]);

  const handleAddCast = () => {
    setEditingCast(null);
    open();
  };

  const handleEditCast = (cast: CastType) => {
    setEditingCast(cast);
    open();
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
        <Group justify="space-between" w={{ lg: "70%" }}>
          <Title order={2}>Cast Management</Title>
          {hasAccess(permissionList.createCast) && (
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleAddCast}
              className="dashboard-btn"
            >
              Add Cast
            </Button>
          )}
        </Group>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="dashboard-bg"
          w={{ lg: "70%" }}
        >
          <TextInput
            placeholder="Search casts by name, role"
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            classNames={inputStyle}
          />

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
                      <Table.Th>Cast</Table.Th>
                      <Table.Th>Role</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {casts?.map((cast) => (
                      <Table.Tr key={cast.id}>
                        <Table.Td>
                          <Group gap={"sm"} align="center">
                            <Avatar
                              src={cast.image?.url}
                              alt={cast.name}
                              size={50}
                              radius="md"
                            />
                            <Text fw={500} lineClamp={1} size="sm">
                              {cast.name}
                            </Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            color="yellow"
                            variant="light"
                            size="md"
                            style={{ alignSelf: "center" }}
                          >
                            {cast.role}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon
                              variant="light"
                              color="orange"
                              disabled={!hasAccess(permissionList.updateCast)}
                              onClick={() => handleEditCast(cast)}
                            >
                              <IconEdit size={16} />
                            </ActionIcon>
                            <ActionIcon
                              variant="light"
                              color="red"
                              disabled={!hasAccess(permissionList.deleteCast)}
                              onClick={() =>
                                openConfirm({
                                  title: "Delete Movie",
                                  message:
                                    "Are you sure you want to delete this cast?",
                                  onConfirm: () => handleDeleteCast(cast.id),
                                })
                              }
                              style={{
                                "--mantine-color-disabled":
                                  "var(--color-darkGray)", // your desired border color (e.g. blue)
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
            )}
          </div>
          {/* </SimpleGrid> */}

          {casts?.length > 0 && (
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

          {casts?.length === 0 && !isPending && (
            <Text ta="center" c="dimmed" py="xl">
              <div className="flex justify-center mb-2">
                <IconUserStar size={30} />
              </div>
              No cast found
            </Text>
          )}
        </Card>
      </Stack>

      <CastModal opened={opened} onClose={close} cast={editingCast} />
    </Container>
  );
};

export default CastManagement;
