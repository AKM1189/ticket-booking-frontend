import { useState, useMemo, useEffect } from "react";
import {
  Title,
  Button,
  Table,
  Group,
  ActionIcon,
  TextInput,
  Card,
  Text,
  Modal,
  Badge,
  Textarea,
  SegmentedControl,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconTable,
  IconTags,
  IconGrid3x3,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useGenreQuery } from "@/api/query/admin/genreQuery";
import type { GenreType } from "@/types/GenreTypes";
import {
  useAddGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
} from "@/api/mutation/admin/genreMutation";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";

const colorOptions = [
  { label: "red", value: "#dc3545" },
  { label: "orange", value: "#fd7e14" },
  { label: "yellow", value: "#ffc107" }, // may need dark text
  { label: "green", value: "#28a745" },
  { label: "blue", value: "#007bff" },
  { label: "cyan", value: "#17a2b8" },
  { label: "violet", value: "#6f42c1" },
  { label: "pink", value: "#e83e8c" },
  { label: "dark", value: "#343a40" },
  { label: "gray", value: "#6c757d" },
];

const GenreManagement = () => {
  const { data } = useGenreQuery();
  const { mutate: addGenre } = useAddGenreMutation();
  const { mutate: editGenre } = useUpdateGenreMutation();
  const { mutate: deleteGenre } = useDeleteGenreMutation();
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [editingGenre, setEditingGenre] = useState<GenreType | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const { open: deleteConfirm } = useConfirmModalStore();

  useEffect(() => {
    setGenres(data?.data);
  }, [data]);

  const form = useForm({
    initialValues: {
      label: "",
      description: "",
      color: "blue",
    },
  });

  // Memoize filtered genres to prevent unnecessary recalculations
  const filteredGenres = useMemo(() => {
    return genres?.filter(
      (genre) =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (genre.description &&
          genre.description.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [genres, searchTerm]);

  const handleAddGenre = () => {
    setEditingGenre(null);
    form.reset();
    open();
  };

  const handleEditGenre = (genre: GenreType) => {
    setEditingGenre(genre);
    form.setValues({
      label: genre.name,
      description: genre.description || "",
      color: genre.color,
    });
    open();
  };

  const handleSubmit = (values: typeof form.values) => {
    const genreData: Omit<GenreType, "id" | "movieCount"> = {
      name: values.label,
      description: values.description,
      color: values.color,
    };

    if (editingGenre) {
      editGenre({ data: genreData, id: editingGenre.id });
    } else {
      addGenre({ data: genreData });
    }
    // refetch();
    close();
  };

  const handleDeleteGenre = (id: number) => {
    deleteGenre({ id });
    // const genre = genres?.find((g) => g.id === id);
    // if (genre && genre.movieCount > 0) {
    //   alert(
    //     `Cannot delete genre "${genre.name}" as it is used by ${genre.movieCount} movies.`,
    //   );
    //   return;
    // }
    // setGenres((prev) => prev.filter((genre) => genre.id !== id));
  };

  const inputStyle = {
    input: "dashboard-input",
    label: "!mb-2 !text-text",
  };

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Genre Management</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          className="dashboard-btn"
          onClick={handleAddGenre}
        >
          Add Genre
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
            placeholder="Search genres..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, maxWidth: 400 }}
            classNames={inputStyle}
          />
          <SegmentedControl
            classNames={{
              root: "!bg-surface",
              indicator: "!bg-primary",
              label: "!text-text",
            }}
            value={viewMode}
            onChange={(value) => setViewMode(value as "grid" | "table")}
            data={[
              {
                value: "grid",
                label: (
                  <Group gap="xs">
                    {/* <IconGrid3x3 size={16} /> */}
                    <IconGrid3x3
                      color={
                        viewMode === "grid"
                          ? "var(--color-selected-text)"
                          : "var(--color-muted)"
                      }
                    />
                    {/* <span>Grid</span> */}
                  </Group>
                ),
              },
              {
                value: "table",
                label: (
                  <Group gap="xs">
                    <IconTable
                      size={24}
                      color={
                        viewMode === "table"
                          ? "var(--color-selected-text)"
                          : "var(--color-muted)"
                      }
                    />
                    {/* <span>Table</span> */}
                  </Group>
                ),
              },
            ]}
          />
        </Group>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGenres?.map((genre) => (
              <Card
                key={genre.id}
                shadow="xs"
                padding="md"
                radius="md"
                className="!bg-surface-hover"
              >
                <Group justify="space-between" mb="xs">
                  <Badge color={genre.color} size="lg">
                    {genre.name}
                  </Badge>
                  <Group gap="xs">
                    <ActionIcon
                      variant="light"
                      color="orange"
                      size="sm"
                      onClick={() => handleEditGenre(genre)}
                    >
                      <IconEdit size={14} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      size="sm"
                      onClick={() => {
                        deleteConfirm({
                          title: "Delete Genre",
                          message:
                            "Are you sure you want to delete this genre?",
                          onConfirm: () => handleDeleteGenre(genre.id),
                        });
                      }}
                      style={{
                        "--mantine-color-disabled": "var(--color-darkGray)", // your desired border color (e.g. blue)
                      }}
                      disabled={genre.movieCount > 0}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Group>
                </Group>

                {genre.description && (
                  <Text size="sm" c="dimmed" className="!text-text" mb="xs">
                    {genre.description}
                  </Text>
                )}

                <Text size="xs" c="dimmed" className="!text-muted">
                  Used in {genre.movieCount} movies
                </Text>
              </Card>
            ))}
          </div>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Genre</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Movies Count</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredGenres?.map((genre) => (
                <Table.Tr key={genre.id}>
                  <Table.Td>
                    <Badge
                      color={genre.color}
                      //  variant="light"
                    >
                      {genre.name}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text
                      size="sm"
                      c="dimmed"
                      lineClamp={2}
                      className="!text-text"
                    >
                      {genre.description || "No description"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="outline"
                      color="gray"
                      className="!text-text"
                    >
                      {genre.movieCount}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="orange"
                        onClick={() => handleEditGenre(genre)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => {
                          deleteConfirm({
                            title: "Delete Genre",
                            message:
                              "Are you sure you want to delete this genre?",
                            onConfirm: () => handleDeleteGenre(genre.id),
                          });
                        }}
                        disabled={genre.movieCount > 0}
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
        )}

        {filteredGenres?.length === 0 && (
          <Text ta="center" c="dimmed" py="xl">
            <div className="flex justify-center mb-2">
              <IconTags size={30} />
            </div>
            No genre found
          </Text>
        )}
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title={editingGenre ? "Edit Genre" : "Add New Genre"}
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
              label="Genre Name"
              placeholder="Enter genre name"
              required
              {...form.getInputProps("label")}
              classNames={inputStyle}
            />

            <Textarea
              label="Description"
              placeholder="Enter genre description"
              rows={3}
              {...form.getInputProps("description")}
              classNames={inputStyle}
            />

            <div>
              <Text size="sm" fw={500} mb="xs">
                Color Theme
              </Text>
              <Group gap="xs">
                {colorOptions.map((color) => (
                  <Badge
                    key={color.value}
                    color={color.value}
                    variant={
                      form.values.color === color.value ? "filled" : "light"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => form.setFieldValue("color", color.value)}
                  >
                    {color.label}
                  </Badge>
                ))}
              </Group>
            </div>
          </div>

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={close} className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              {editingGenre ? "Update" : "Add"} Genre
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default GenreManagement;
