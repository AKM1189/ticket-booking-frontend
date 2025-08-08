import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { CastType } from "@/types/CastTypes";
import CastModal from "./CastModal";
import { useCastQuery } from "@/api/query/admin/castQuery";
import {
  useAddCastMutation,
  useDeleteCastMutation,
  useUpdateCastMutation,
} from "@/api/mutation/admin/castMutation";
import { useLoadingStore } from "@/store/useLoading";

const CastManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingCast, setEditingCast] = useState<CastType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [casts, setCasts] = useState<CastType[]>([]);
  const { showLoading } = useLoadingStore();

  const { data, isLoading } = useCastQuery();

  const { mutate: deleteCastMutation } = useDeleteCastMutation();

  useEffect(() => {
    console.log("casts", data);
    setCasts(data?.data);
  }, [data]);

  // const filteredCasts = casts?.filter(
  //   (cast: CastType) =>
  //     cast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     cast.role.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

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
          <Title order={2}>Cast Management</Title>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAddCast}
            className="dashboard-btn"
          >
            Add Cast
          </Button>
        </Group>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="dashboard-bg"
        >
          <TextInput
            placeholder="Search cast members..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            classNames={inputStyle}
          />

          {/* <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md"> */}
          {/* {casts?.map((cast: CastType) => (
            <Card
              key={cast.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="!bg-surface !text-text !border-0"
            >
              <Card.Section>
                <Avatar
                  src={cast.imageUrl}
                  alt={cast.name}
                  size={120}
                  mx="auto"
                  mt="md"
                  radius="md"
                />
              </Card.Section>

              <Stack gap="xs" mt="md">
                <Text fw={500} size="lg" ta="center" lineClamp={1}>
                  {cast.name}
                </Text>

                <Badge
                  color="blue"
                  variant="light"
                  size="sm"
                  style={{ alignSelf: "center" }}
                >
                  {cast.role}
                </Badge>

                <Group justify="center" mt="md">
                  <ActionIcon
                    variant="light"
                    color="blue"
                    onClick={() => handleEditCast(cast)}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => handleDeleteCast(cast.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Stack>
            </Card>
          ))} */}

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
                        src={cast.imageUrl}
                        alt={cast.name}
                        size={60}
                        radius="md"
                      />
                      <Text fw={500} size="lg" lineClamp={1}>
                        {cast.name}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color="var(--color-primary)"
                      // variant="light"
                      size="md"
                      style={{ alignSelf: "center" }}
                    >
                      {cast.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        // variant="light"
                        color="orange"
                        onClick={() => handleEditCast(cast)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        // variant="light"
                        color="red"
                        onClick={() => handleDeleteCast(cast.id)}
                        // disabled={cast.movieCount > 0}
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

          {casts?.length === 0 && !isLoading && (
            <Text ta="center" c="dimmed" py="xl">
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
