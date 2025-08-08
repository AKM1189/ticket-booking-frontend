import { useState, useRef, useCallback, useEffect } from "react";
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
  Textarea,
  Loader,
  Popover,
  NumberInput,
  LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconUpload,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import type { MovieType, MovieInputType } from "@/types/MovieTypes";
import type { CastSelectionType } from "@/types/CastTypes";
import { useMovieQuery } from "@/api/query/admin/movieQuery";
import CreatableMultiSelect from "@/ui/multiSelect/CreatableMultiSelect";
import {
  useAddMovie,
  useDeleteMovie,
  useUpdateMovie,
} from "@/api/mutation/admin/movieMutation";
import { useGenreQuery } from "@/api/query/admin/genreQuery";
import ImagePreview from "./ImagePreview";
import { CastSelector } from "../casts";
import { urlToFile } from "@/utils/imageUploads";
import { useLoadingStore } from "@/store/useLoading";

const languages = ["English", "Tamil", "Hindi", "Telugu", "Chinese"];
const subtitles = ["English", "Tamil", "Hindi", "Telugu", "Chinese"];

const MovieManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<MovieType | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSubtitles, setSelectedSubtitles] = useState<string[]>([]);
  const [selectedCasts, setSelectedCasts] = useState<CastSelectionType[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [posterPreviewUrl, setPosterPreviewUrl] = useState<string[]>([]);
  const [selectedPoster, setSelectedPoster] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: genres } = useGenreQuery();
  const genreList = genres?.data;

  const [languageError, setLanguageError] = useState(false);
  const [subtitleError, setSubtitlError] = useState(false);

  const [isImageUploading, setImageUploading] = useState(false);

  const { data } = useMovieQuery();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const { showLoading } = useLoadingStore();

  const { mutate: addMovieMutation } = useAddMovie();
  const { mutate: updateMovieMutation } = useUpdateMovie();
  const { mutate: deleteMovieMutation } = useDeleteMovie();

  useEffect(() => {
    setMovies(data?.data);
  }, [data]);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      duration: "",
      genres: [] as string[],
      experience: [] as string[],
      releaseDate: "",
      status: "",
      poster: null,
      trailerId: "",
    },
  });

  const handleImageUpload = useCallback((files: File[]) => {
    if (!files || files.length === 0) return;
    setSelectedImages((prev) => [...prev, ...files]);

    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newUrls]);
  }, []);

  const handlePosterUpload = useCallback((file: File | null) => {
    if (!file) return;
    setSelectedPoster(file);

    const newUrl = URL.createObjectURL(file);
    setPosterPreviewUrl([newUrl]);
  }, []);

  const removePoster = useCallback(() => {
    setSelectedPoster(null);
    setPosterPreviewUrl([]);
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
    form.reset();
    resetFormValues();
    setFormModalOpen(true);
  };

  const resetFormValues = () => {
    setEditingMovie(null);
    setSelectedPoster(null);
    setSelectedLanguages([]);
    setSelectedSubtitles([]);
    setSelectedCasts([]);
    setPosterPreviewUrl([]);
    clearAllImages();
  };

  const handleEditMovie = async (movie: MovieType) => {
    setEditingMovie(movie);
    const releaseDate = movie.releaseDate
      ? new Date(movie.releaseDate).toISOString().split("T")[0]
      : "";
    form.setValues({
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      genres: movie.genres.map((g: any) => g.id.toString()),
      releaseDate,
      status: movie.status,
      trailerId: movie.trailerId,

      experience: movie.experience,
    });
    setFormModalOpen(true);

    setImagePreviewUrls(movie.photos);
    setPosterPreviewUrl([movie.posterUrl]);
    const getPhotoFiles = movie.photos.map((url, index) =>
      urlToFile(url, "image_" + index, "image/jpeg"),
    );
    const photoFiles = await Promise.all(getPhotoFiles);
    const posterFile = await urlToFile(
      movie.posterUrl,
      "poster.jpg",
      "image/jpeg",
    );
    setSelectedImages(photoFiles);
    setSelectedPoster(posterFile);
    setSelectedLanguages(movie.language);
    setSelectedSubtitles(movie.subtitle);
    // Set selected casts if movie has cast data
    if (movie?.casts) {
      setSelectedCasts(
        movie?.casts?.map((cast) => ({
          id: cast.id,
          name: cast.name,
          role: cast.role,
          imageUrl: cast.imageUrl,
        })),
      );
    }
  };

  useEffect(() => {
    if (selectedLanguages.length > 0) {
      setLanguageError(false);
    }
    if (selectedSubtitles.length > 0) {
      setSubtitlError(false);
    }
  }, [selectedLanguages, selectedSubtitles]);

  const handleSubmit = async (values: typeof form.values) => {
    showLoading(true);
    if (selectedLanguages.length === 0) {
      setLanguageError(true);
      return;
    }
    if (selectedSubtitles.length === 0) {
      setSubtitlError(true);
      return;
    }
    setImageUploading(true);
    const data: MovieInputType = {
      ...values,
      poster: selectedPoster,
      language: selectedLanguages,
      subtitle: selectedSubtitles,
      photos: selectedImages,
      casts:
        selectedCasts?.length > 0 ? selectedCasts.map((cast) => cast.id) : [],
    };
    if (editingMovie) {
      updateMovieMutation(
        { data, id: editingMovie.id },
        {
          onSuccess: () => {
            showLoading(false);
            setFormModalOpen(false);
            resetFormValues();
            setImageUploading(false);
          },
          onError: () => {
            setImageUploading(false);
          },
        },
      );
    } else {
      console.log("add movie mutation", data);
      addMovieMutation(
        { data },
        {
          onSuccess: () => {
            showLoading(false);

            setFormModalOpen(false);
            resetFormValues();
            setImageUploading(false);
          },
          onError: () => {
            setImageUploading(false);
          },
        },
      );
    }
  };

  const handleDeleteMovie = () => {
    showLoading(true);

    deleteMovieMutation(
      { id: editingMovie?.id },
      {
        onSuccess: () => {
          showLoading(false);
          setEditingMovie(null);
        },
      },
    );
    setDeleteModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Now Showing":
        return "#28a745";
      case "Coming Soon":
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

  const modalStyle = {
    header: "!bg-surface text-text",
    content: "!bg-surface text-text",
    close: "!text-text hover:!bg-surface-hover",
  };
  return (
    <div className="space-y-6">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{
          radius: "sm",
          blur: 1,
          backgroundOpacity: 0.3,
          color: "var(--color-primary)",
        }}
        loaderProps={{
          color: "var(--color-blueGray)",
          type: "dots",
          size: "lg",
        }}
      />
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
              {movies?.map((movie) => (
                <Table.Tr key={movie.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        w={40}
                        h={60}
                        radius="sm"
                        fallbackSrc="/movie-bg.jpg"
                      />
                      <div>
                        <Text size="sm" fw={500}>
                          {movie.title}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>{movie.duration}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      {movie?.genres.map(
                        (genre: any, index: number) =>
                          index < 2 && (
                            <Badge
                              key={genre.id}
                              variant="outline"
                              color={genre.color}
                              size="sm"
                            >
                              {genre.name}
                            </Badge>
                          ),
                      )}
                      {movie?.genres.length > 2 && (
                        <Popover
                          width={200}
                          position="bottom"
                          withArrow
                          shadow="md"
                        >
                          <Popover.Target>
                            <Badge
                              size="sm"
                              variant="outline"
                              color="var(--color-secondary)"
                              className="!cursor-pointer"
                            >
                              +{movie?.genres.length - 2}
                            </Badge>
                          </Popover.Target>
                          <Popover.Dropdown className="!bg-surface !py-3 !w-[100px] !flex !flex-col !items-center">
                            {movie?.genres.map(
                              (genre: any, index: number) =>
                                index >= 2 && (
                                  <Badge
                                    key={genre.id}
                                    // variant="outline"
                                    color={genre.color}
                                    size="sm"
                                  >
                                    {genre.name}
                                  </Badge>
                                ),
                            )}
                          </Popover.Dropdown>
                        </Popover>
                      )}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    {movie?.releaseDate &&
                      new Date(movie?.releaseDate).toLocaleDateString()}
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
                        variant="light"
                        color="orange"
                        onClick={() => handleEditMovie(movie)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        color="red"
                        onClick={() => {
                          setEditingMovie(movie);
                          setDeleteModalOpen(true);
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
      </Card>

      {/* <FileInput onChange={(file) => setTestImage(file)} label="Test Image" />
      <Button onClick={handleSubmitImage}>Submit</Button>
      <Image src="https://i.ibb.co/ZpwMRRBC/c1f1951d7c84.jpg" /> */}
      <Modal
        opened={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        title={editingMovie ? "Edit Movie" : "Add New Movie"}
        size="lg"
        classNames={modalStyle}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                classNames={inputStyle}
                label="Movie Name"
                placeholder="Enter movie name"
                required
                {...form.getInputProps("title")}
              />

              <Textarea
                classNames={inputStyle}
                label="Description"
                placeholder="Enter description"
                required
                rows={5}
                // resize="vertical"
                {...form.getInputProps("description")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                classNames={inputStyle}
                label="Duration (min)"
                placeholder="e.g., 120"
                required
                {...form.getInputProps("duration")}
                hideControls
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
            <Grid.Col span={12}>
              <MultiSelect
                label="Genres"
                placeholder="Select genres"
                classNames={{
                  ...inputStyle,
                  options: "!text-red",
                  pill: "!bg-primary !text-text",
                }}
                data={
                  genreList?.length > 0
                    ? genreList?.map((g) => ({
                        value: g.id.toString(),
                        label: g.name,
                      }))
                    : []
                }
                required
                {...form.getInputProps("genres")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" fw={500} mb="xs">
                Languages <span className="text-red-400">*</span>
              </Text>
              <CreatableMultiSelect
                value={selectedLanguages}
                setValue={setSelectedLanguages}
                dataList={languages}
              />
              {languageError && (
                <p className="text-[12px] mt-1 text-red-500">
                  Please select language
                </p>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" fw={500} mb="xs">
                Subtitles <span className="text-red-400">*</span>
              </Text>
              <CreatableMultiSelect
                value={selectedSubtitles}
                setValue={setSelectedSubtitles}
                dataList={subtitles}
              />
              {subtitleError && (
                <p className="text-[12px] mt-1 text-red-500">
                  Please select subtitle
                </p>
              )}
            </Grid.Col>

            <Grid.Col span={6}>
              <MultiSelect
                label="Experience"
                placeholder="Select experiences"
                classNames={{
                  ...inputStyle,
                  options: "!text-red",
                  pill: "!bg-primary !text-text",
                }}
                data={["2D", "3D", "IMAX"]}
                required
                {...form.getInputProps("experience")}
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
              <FileInput
                label="Poster"
                classNames={{
                  input: "dashboard-input",
                }}
                required
                accept="image/*"
                value={selectedPoster}
                placeholder="Select Movie Poster"
                onChange={handlePosterUpload}
              />
            </Grid.Col>
            <ImagePreview
              imagePreviewUrls={posterPreviewUrl}
              removeImage={removePoster}
              clearAllImages={clearAllImages}
              selectedImages={selectedImages}
            />

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
                value={selectedImages}
                accept="image/*"
                onChange={handleImageUpload}
                classNames={{ ...inputStyle, description: "!text-blueGray" }}
                description="Upload multiple images for the movie (posters, stills, behind-the-scenes)"
              />
            </Grid.Col>
            {/* Image Preview Section */}

            <ImagePreview
              imagePreviewUrls={imagePreviewUrls}
              isClearAll={true}
              removeImage={removeImage}
              clearAllImages={clearAllImages}
              selectedImages={selectedImages}
            />

            <Grid.Col span={12}>
              <CastSelector
                selectedCasts={selectedCasts || []}
                onCastChange={setSelectedCasts}
                label="Cast Members"
                placeholder="Select cast members for this movie"
              />
            </Grid.Col>

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
            <Button
              variant="outline"
              onClick={() => setFormModalOpen(false)}
              className="dashboard-btn"
            >
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn min-w-[120px]">
              {isImageUploading ? (
                <Loader color="var(--color-blueGray)" size={20} />
              ) : (
                (editingMovie ? "Update" : "Add") + "Movie"
              )}
            </Button>
          </Group>
        </form>
      </Modal>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Movie"
        centered
        classNames={modalStyle}
      >
        <Text size="sm">
          Are you sure you want to delete{" "}
          <span className="text-base font-semibold text-accent uppercase">
            {editingMovie?.title}
          </span>{" "}
          movie?
        </Text>
        <div className="flex justify-end mt-5 gap-5">
          <Button
            className="dashboard-btn !text-text !text-sm"
            variant="outline"
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className="dashboard-btn !text-sm"
            color="red"
            onClick={handleDeleteMovie}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MovieManagement;
