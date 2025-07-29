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
  IconGrid3x3,
  IconTable,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import type { LabelType } from "@/types/MovieTypes";
import { GridIcon } from "@/assets/svgs";
import { useGenreQuery } from "@/api/query/admin/genreQuery";
import { getGenre } from "@/api/function/admin/genreApi";

// Mock data with extended genre information
interface ExtendedGenre extends LabelType {
  description?: string;
  movieCount: number;
  color: string;
}

const mockGenres: ExtendedGenre[] = [
  {
    id: 1,
    label: "Action",
    description:
      "High-energy films with exciting sequences, stunts, and adventure",
    movieCount: 15,
    color: "red",
  },
  {
    id: 2,
    label: "Adventure",
    description:
      "Stories involving journeys, exploration, and exciting experiences",
    movieCount: 12,
    color: "orange",
  },
  {
    id: 3,
    label: "Drama",
    description:
      "Character-driven stories focusing on realistic situations and emotions",
    movieCount: 20,
    color: "blue",
  },
  {
    id: 4,
    label: "Comedy",
    description:
      "Light-hearted films designed to entertain and amuse audiences",
    movieCount: 18,
    color: "green",
  },
  {
    id: 5,
    label: "Horror",
    description: "Films intended to frighten, unsettle, and create suspense",
    movieCount: 8,
    color: "dark",
  },
  {
    id: 6,
    label: "Romance",
    description:
      "Stories centered around love relationships and romantic entanglements",
    movieCount: 14,
    color: "pink",
  },
  {
    id: 7,
    label: "Sci-Fi",
    description:
      "Science fiction films exploring futuristic concepts and technology",
    movieCount: 10,
    color: "cyan",
  },
  {
    id: 8,
    label: "Thriller",
    description: "Suspenseful films designed to keep audiences on edge",
    movieCount: 13,
    color: "violet",
  },
];

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
  const [genres, setGenres] = useState<ExtendedGenre[]>(mockGenres);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [editingGenre, setEditingGenre] = useState<ExtendedGenre | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // useEffect(() => {
  //   const getGenres = async () => {
  //     const data = await getGenre();
  //     return data;
  //   };
  //   console.log("genres", getGenres());
  // }, []);

  console.log("genres", data);
  const form = useForm({
    initialValues: {
      label: "",
      description: "",
      color: "blue",
    },
  });

  // Memoize filtered genres to prevent unnecessary recalculations
  const filteredGenres = useMemo(() => {
    return genres.filter(
      (genre) =>
        genre.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (genre.description &&
          genre.description.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [genres, searchTerm]);

  const handleAddGenre = () => {
    setEditingGenre(null);
    form.reset();
    open();
  };

  const handleEditGenre = (genre: ExtendedGenre) => {
    setEditingGenre(genre);
    form.setValues({
      label: genre.label,
      description: genre.description || "",
      color: genre.color,
    });
    open();
  };

  const handleSubmit = (values: typeof form.values) => {
    const genreData: Omit<ExtendedGenre, "id" | "movieCount"> = {
      label: values.label,
      description: values.description,
      color: values.color,
    };

    if (editingGenre) {
      setGenres((prev) =>
        prev.map((genre) =>
          genre.id === editingGenre.id
            ? {
                ...genreData,
                id: editingGenre.id,
                movieCount: editingGenre.movieCount,
              }
            : genre,
        ),
      );
    } else {
      const newGenre: ExtendedGenre = {
        ...genreData,
        id: Date.now(),
        movieCount: 0,
      };
      setGenres((prev) => [...prev, newGenre]);
    }
    close();
  };

  const handleDeleteGenre = (id: number) => {
    const genre = genres.find((g) => g.id === id);
    if (genre && genre.movieCount > 0) {
      alert(
        `Cannot delete genre "${genre.label}" as it is used by ${genre.movieCount} movies.`,
      );
      return;
    }
    setGenres((prev) => prev.filter((genre) => genre.id !== id));
  };

  const inputStyle = {
    input: "dashboard-input",
    label: "!mb-2 !text-text",
  };

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Genre Management</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddGenre}>
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
                    <GridIcon />
                    {/* <span>Grid</span> */}
                  </Group>
                ),
              },
              {
                value: "table",
                label: (
                  <Group gap="xs">
                    <IconTable size={24} />
                    {/* <span>Table</span> */}
                  </Group>
                ),
              },
            ]}
          />
        </Group>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGenres.map((genre) => (
              <Card
                key={genre.id}
                shadow="xs"
                padding="md"
                radius="md"
                className="!bg-surface-hover"
              >
                <Group justify="space-between" mb="xs">
                  <Badge color={genre.color} size="lg">
                    {genre.label}
                  </Badge>
                  <Group gap="xs">
                    <ActionIcon
                      // variant="light"
                      color="orange"
                      size="sm"
                      onClick={() => handleEditGenre(genre)}
                    >
                      <IconEdit size={14} />
                    </ActionIcon>
                    <ActionIcon
                      // variant="light"
                      color="red"
                      size="sm"
                      onClick={() => handleDeleteGenre(genre.id)}
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

                <Text size="xs" c="dimmed" className="!text-blueGray">
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
              {filteredGenres.map((genre) => (
                <Table.Tr key={genre.id}>
                  <Table.Td>
                    <Badge
                      color={genre.color}
                      //  variant="light"
                    >
                      {genre.label}
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
                        // variant="light"
                        color="orange"
                        onClick={() => handleEditGenre(genre)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        // variant="light"
                        color="red"
                        onClick={() => handleDeleteGenre(genre.id)}
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
