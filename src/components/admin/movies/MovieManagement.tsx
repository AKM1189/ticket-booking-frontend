import { useState, useRef, useMemo, useCallback } from "react";
import {
  Title,
  Button,
  Table,
  Badge,
  Group,
  ActionIcon,
  TextInput,
  Select,
  Card,
  Image,
  Text,
  Modal,
  Grid,
  MultiSelect,
  FileInput,
  SimpleGrid,
  CloseButton,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconEye,
  IconUpload,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import type { MovieType, LabelType } from "@/types/MovieTypes";

// Mock data
const mockMovies: MovieType[] = [
  {
    id: 1,
    name: "Avatar: The Way of Water",
    duration: "192 min",
    genres: [
      { id: 1, label: "Action" },
      { id: 2, label: "Adventure" },
    ],
    releaseDate: "2022-12-16",
    rating: "7.6",
    status: "Showing",
    posterUrl: "/movie-bg.jpg",
    trailerId: "abc123",
  },
  {
    id: 2,
    name: "Top Gun: Maverick",
    duration: "130 min",
    genres: [
      { id: 1, label: "Action" },
      { id: 3, label: "Drama" },
    ],
    releaseDate: "2022-05-27",
    rating: "8.3",
    status: "Soon",
    posterUrl: "/movie-bg-2.jpg",
    trailerId: "def456",
  },
];

const mockGenres: LabelType[] = [
  { id: 1, label: "Action" },
  { id: 2, label: "Adventure" },
  { id: 3, label: "Drama" },
  { id: 4, label: "Comedy" },
  { id: 5, label: "Horror" },
];

const MovieManagement = () => {
  const [movies, setMovies] = useState<MovieType[]>(mockMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [editingMovie, setEditingMovie] = useState<MovieType | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLButtonElement>(null);

  const form = useForm({
    initialValues: {
      name: "",
      duration: "",
      genres: [] as string[],
      releaseDate: "",
      rating: "",
      status: "",
      posterUrl: "",
      trailerId: "",
    },
  });

  // Memoize filtered movies to prevent unnecessary recalculations
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || movie.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [movies, searchTerm, statusFilter]);

  // Memoized callback functions to prevent unnecessary re-renders
  const handleImageUpload = useCallback((files: File[]) => {
    if (!files || files.length === 0) return;

    // Add new files to existing ones instead of replacing
    setSelectedImages((prev) => [...prev, ...files]);

    // Create preview URLs for new files only
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newUrls]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const clearAllImages = useCallback(() => {
    setImagePreviewUrls((prev) => {
      // Revoke all URLs to prevent memory leaks
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setSelectedImages([]);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleAddMovie = () => {
    setEditingMovie(null);
    form.reset();
    clearAllImages();
    open();
  };

  const handleEditMovie = (movie: MovieType) => {
    setEditingMovie(movie);
    form.setValues({
      name: movie.name,
      duration: movie.duration,
      genres: movie.genres.map((g) => g.id.toString()),
      releaseDate: movie.releaseDate,
      rating: movie.rating,
      status: movie.status,
      posterUrl: movie.posterUrl,
      trailerId: movie.trailerId,
    });
    open();
  };

  const handleSubmit = (values: typeof form.values) => {
    const selectedGenres = mockGenres.filter((g) =>
      values.genres.includes(g.id.toString()),
    );

    if (editingMovie) {
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === editingMovie.id
            ? { ...movie, ...values, genres: selectedGenres }
            : movie,
        ),
      );
    } else {
      const newMovie: MovieType = {
        id: Date.now(),
        ...values,
        genres: selectedGenres,
      };
      setMovies((prev) => [...prev, newMovie]);
    }
    close();
  };

  const handleDeleteMovie = (id: number) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Showing":
        return "#28a745";
      case "Soon":
        return "#007bff";
      case "Ended":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  const inputStyle = {
    input: "dashboard-input",
    label: "!mb-2 !text-text",
  };

  return (
    <div className="space-y-6">
      <Group justify="space-between">
        <Title order={2}>Movie Management</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          className="!text-sm"
          onClick={handleAddMovie}
        >
          Add Movie
        </Button>
      </Group>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="!bg-surface !text-text !border-0"
      >
        <Group mb="md">
          <TextInput
            placeholder="Search movies..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
            classNames={inputStyle}
          />
          <Select
            placeholder="Filter by status"
            data={["Now Showing", "Coming Soon", "Ended"]}
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
            classNames={inputStyle}
          />
        </Group>
        <div className="overflow-scroll">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Movie</Table.Th>
                <Table.Th>Duration</Table.Th>
                <Table.Th>Genres</Table.Th>
                <Table.Th>Release Date</Table.Th>
                <Table.Th>Rating</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredMovies.map((movie) => (
                <Table.Tr key={movie.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Image
                        src={movie.posterUrl}
                        alt={movie.name}
                        w={40}
                        h={60}
                        radius="sm"
                        fallbackSrc="/movie-bg.jpg"
                      />
                      <div>
                        <Text size="sm" fw={500}>
                          {movie.name}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>{movie.duration}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      {movie.genres.slice(0, 2).map((genre) => (
                        <Badge
                          key={genre.id}
                          variant="outline"
                          color="var(--color-secondary)"
                          size="sm"
                        >
                          {genre.label}
                        </Badge>
                      ))}
                      {movie.genres.length > 2 && (
                        <Badge
                          size="sm"
                          variant="outline"
                          color="var(--color-secondary)"
                        >
                          +{movie.genres.length - 2}
                        </Badge>
                      )}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    {new Date(movie.releaseDate).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td>⭐ {movie.rating}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(movie.status)}>
                      {movie.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        //   variant="light"
                        color="orange"
                        onClick={() => handleEditMovie(movie)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        //   variant="light"
                        color="red"
                        onClick={() => handleDeleteMovie(movie.id)}
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
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title={editingMovie ? "Edit Movie" : "Add New Movie"}
        size="lg"
        classNames={{
          header: "!bg-surface text-text",
          content: "!bg-surface text-text",
          close: "!text-text hover:!bg-surface-hover",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                classNames={inputStyle}
                label="Movie Name"
                placeholder="Enter movie name"
                required
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                classNames={inputStyle}
                label="Duration"
                placeholder="e.g., 120 min"
                required
                {...form.getInputProps("duration")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                classNames={inputStyle}
                label="Rating"
                placeholder="e.g., 8.5"
                required
                {...form.getInputProps("rating")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                classNames={inputStyle}
                label="Release Date"
                type="date"
                required
                {...form.getInputProps("releaseDate")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Status"
                placeholder="Select status"
                data={["Now Showing", "Coming Soon", "Ended"]}
                required
                classNames={inputStyle}
                {...form.getInputProps("status")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MultiSelect
                label="Genres"
                placeholder="Select genres"
                classNames={{
                  ...inputStyle,
                  options: "!text-red",
                  pill: "!bg-primary !text-text",
                }}
                data={mockGenres.map((g) => ({
                  value: g.id.toString(),
                  label: g.label,
                }))}
                required
                {...form.getInputProps("genres")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                classNames={inputStyle}
                label="Poster URL"
                placeholder="Enter poster image URL"
                {...form.getInputProps("posterUrl")}
              />
            </Grid.Col>

            {/* Multiple Image Upload Section */}
            <Grid.Col span={12}>
              <Text size="sm" fw={500} mb="xs">
                Movie Images
              </Text>
              <FileInput
                ref={fileInputRef}
                placeholder="Select multiple images"
                leftSection={
                  <IconUpload color="var(--color-blueGray)" size={16} />
                }
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                classNames={{ ...inputStyle, description: "!text-blueGray" }}
                description="Upload multiple images for the movie (posters, stills, behind-the-scenes)"
              />
            </Grid.Col>

            {/* Image Preview Section */}
            {imagePreviewUrls.length > 0 && (
              <Grid.Col span={12}>
                <Group justify="space-between" mb="xs">
                  <Text size="sm" fw={500}>
                    Image Previews ({imagePreviewUrls.length})
                  </Text>
                  <Button
                    size="xs"
                    variant="outline"
                    color="red"
                    onClick={clearAllImages}
                    className="dashboard-btn !border-0 hover:!bg-transparent"
                  >
                    Clear All
                  </Button>
                </Group>
                <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
                  {imagePreviewUrls.map((url, index) => (
                    <Box key={index} pos="relative">
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        radius="md"
                        h={120}
                        fit="cover"
                      />
                      <CloseButton
                        pos="absolute"
                        top={5}
                        right={5}
                        size="sm"
                        color="red"
                        variant="filled"
                        onClick={() => removeImage(index)}
                      />
                      <Text
                        size="xs"
                        ta="center"
                        mt={4}
                        c="dimmed"
                        truncate
                        className="!text-text"
                      >
                        {selectedImages[index]?.name}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Grid.Col>
            )}

            <Grid.Col span={12}>
              <TextInput
                label="Trailer ID"
                placeholder="Enter YouTube trailer ID"
                {...form.getInputProps("trailerId")}
                classNames={inputStyle}
              />
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={close} className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              {editingMovie ? "Update" : "Add"} Movie
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default MovieManagement;
