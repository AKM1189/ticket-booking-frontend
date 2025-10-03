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
  NumberInput,
  LoadingOverlay,
  Pagination,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconUpload,
  IconMovie,
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
import { useAllGenreQuery, useGenreQuery } from "@/api/query/admin/genreQuery";
import ImagePreview from "./ImagePreview";
import { CastSelector } from "../casts";
import { urlToFile } from "@/utils/imageUploads";
import { useLoadingStore } from "@/store/useLoading";
import { zodResolver } from "mantine-form-zod-resolver";
import { movieSchema } from "@/schema/MovieSchema";
import dayjs from "dayjs";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/AuthType";
import { usePermisson } from "@/hooks/usePermisson";
import { permissionList } from "@/constants/permissons";
import type { PaginationType } from "@/types/PagintationType";

const languages = ["English", "Tamil", "Hindi", "Telugu", "Chinese"];
const subtitles = ["English", "Tamil", "Hindi", "Telugu", "Chinese"];

interface MovieManagementType {
  openMovieModal: boolean;
  setOpenMovieModal: (value: boolean) => void;
}
const MovieManagement = ({
  openMovieModal,
  setOpenMovieModal,
}: MovieManagementType) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [editingMovie, setEditingMovie] = useState<MovieType | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSubtitles, setSelectedSubtitles] = useState<string[]>([]);
  const [selectedCasts, setSelectedCasts] = useState<CastSelectionType[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [posterPreviewUrl, setPosterPreviewUrl] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLButtonElement>(null);
  const [isLoading, _setIsLoading] = useState(false);

  const { data: genres } = useAllGenreQuery();
  const genreList = genres?.data;

  const [isImageUploading, setImageUploading] = useState(false);

  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const { data, refetch, isPending } = useMovieQuery(
    pagination.page,
    searchTerm,
    statusFilter,
  );
  const [movies, setMovies] = useState<MovieType[]>([]);
  const { showLoading } = useLoadingStore();

  const { mutate: addMovieMutation } = useAddMovie();
  const { mutate: updateMovieMutation } = useUpdateMovie();
  const { mutate: deleteMovieMutation } = useDeleteMovie();

  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);

  const { hasAccess } = usePermisson();

  const { open: openConfirm } = useConfirmModalStore();

  useEffect(() => {
    setMovies(data?.data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, statusFilter]);

  const form = useForm({
    // mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      duration: null as number | null,
      genres: [] as string[],
      experience: [] as string[],
      releaseDate: "",
      language: [] as string[],
      subtitle: [] as string[],
      poster: null as File | null,
      photos: [] as File[],
      trailerId: "",
    },
    validate: zodResolver(movieSchema),
  });

  useEffect(() => {
    form.setFieldValue("subtitle", selectedSubtitles);
  }, [selectedSubtitles]);

  useEffect(() => {
    form.setFieldValue("language", selectedLanguages);
  }, [selectedLanguages]);

  useEffect(() => {
    if (form.values.poster) {
      const newUrl = URL.createObjectURL(form.values.poster);
      setPosterPreviewUrl([newUrl]);
    }
  }, [form.values.poster]);

  useEffect(() => {
    if (!form.values.photos || form.values.photos?.length > 0) {
      console.log("photos added");
      const newUrls = form.values.photos?.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviewUrls((prev) => [...prev, ...newUrls]);
    }
  }, [form.values.photos]);

  const handleImageUpload = useCallback((files: File[]) => {
    if (!files || files.length === 0) return;
    setSelectedImages((prev) => [...prev, ...files]);

    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newUrls]);
  }, []);

  const removePoster = useCallback(() => {
    setPosterPreviewUrl([]);
    form.setFieldValue("poster", null);
  }, []);

  const removeImage = useCallback((imageIndex: number) => {
    setSelectedImages((prev) =>
      prev.filter((_item, index) => index !== imageIndex),
    );
    setImagePreviewUrls((prev) => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[imageIndex]);
      return prev.filter((_, i) => i !== imageIndex);
    });
  }, []);

  const clearAllImages = useCallback(() => {
    setImagePreviewUrls((prev) => {
      // Revoke all URLs to prevent memory leaks
      prev.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    setSelectedImages([]);
    form.setFieldValue("photos", []);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleAddMovie = () => {
    form.reset();
    resetFormValues();
    setOpenMovieModal(true);
  };

  const resetFormValues = () => {
    setEditingMovie(null);
    setSelectedImages([]);
    setSelectedLanguages([]);
    setSelectedSubtitles([]);
    setSelectedCasts([]);
    setPosterPreviewUrl([]);
    clearAllImages();
  };

  const handleEditMovie = async (movie: MovieType) => {
    setEditingMovie(movie);
    const releaseDate = movie.releaseDate
      ? dayjs(movie.releaseDate).format("YYYY-MM-DD")
      : "";
    form.setValues({
      title: movie.title,
      description: movie.description,
      duration: parseInt(movie.duration),
      genres: movie.genres.map((g: any) => g.id.toString()),
      releaseDate,
      trailerId: movie.trailerId,
      experience: movie.experience,
      poster: await urlToFile(movie.poster?.url, "poster.jpg", "image/jpeg"),
    });
    setOpenMovieModal(true);

    setImagePreviewUrls(movie.photos?.map((img) => img.url));
    setPosterPreviewUrl([movie.poster?.url]);
    const getPhotoFiles = movie.photos.map((img, index) =>
      urlToFile(img.url, "image_" + index, "image/jpeg"),
    );
    const photoFiles = await Promise.all(getPhotoFiles);
    // const posterFile = await urlToFile(
    //   movie.poster?.url,
    //   "poster.jpg",
    //   "image/jpeg",
    // );
    setSelectedImages(photoFiles);
    setSelectedLanguages(movie.language);
    setSelectedSubtitles(movie.subtitle);
    // Set selected casts if movie has cast data
    if (movie?.casts) {
      setSelectedCasts(
        movie?.casts?.map((cast) => ({
          id: cast?.id,
          name: cast?.name,
          role: cast?.role,
          imageUrl: cast?.image.url,
        })),
      );
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    const result = form.validate();
    if (result.hasErrors) console.log("Form validation errors:", result.errors);
    // setImageUploading(true);
    const data: MovieInputType = {
      ...values,
      language: selectedLanguages,
      subtitle: selectedSubtitles,
      photos: selectedImages,
      casts:
        selectedCasts?.length > 0 ? selectedCasts.map((cast) => cast.id) : [],
    };

    if (editingMovie) {
      showLoading(true);

      updateMovieMutation(
        { data, id: editingMovie.id },
        {
          onSuccess: () => {
            showLoading(false);
            setOpenMovieModal(false);
            resetFormValues();
            setImageUploading(false);
          },
          onError: () => {
            showLoading(false);
            setImageUploading(false);
          },
        },
      );
    } else {
      showLoading(true);

      addMovieMutation(
        { data },
        {
          onSuccess: () => {
            showLoading(false);

            setOpenMovieModal(false);
            resetFormValues();
            setImageUploading(false);
          },
          onError: () => {
            showLoading(false);
            setImageUploading(false);
          },
        },
      );
    }
  };

  const handleDeleteMovie = (id: number) => {
    showLoading(true);

    deleteMovieMutation(
      { id },
      {
        onSuccess: () => {
          showLoading(false);
          setEditingMovie(null);
        },
        onError: () => {
          showLoading(false);
        },
      },
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Now Showing":
        return "#28a745";
      case "Coming Soon":
        return "#007bff";
      case "Ticket Available":
        return "#c29617";
      case "Ended":
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };
  const inputStyle = {
    input: "dashboard-input placeholder:!text-muted",
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
        {hasAccess(permissionList.createMovie) && (
          <Button
            leftSection={<IconPlus size={16} />}
            className="!text-sm"
            onClick={handleAddMovie}
          >
            Add Movie
          </Button>
        )}
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
            placeholder="Search movies by name"
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
            classNames={inputStyle}
          />
          <Select
            placeholder="Filter by status"
            data={["Now Showing", "Ticket Available", "Coming Soon", "Ended"]}
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
            classNames={inputStyle}
          />
        </Group>
        <div className="overflow-scroll">
          {isPending ? (
            <div className="h-full min-h-[200px] flex justify-center items-center">
              <Loader type="dots" size={"md"} />
            </div>
          ) : (
            <div>
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
                        <Group gap="sm" className="relative">
                          {movie.poster?.url ? (
                            <Image
                              src={movie.poster?.url}
                              alt={movie.title}
                              w={50}
                              h={60}
                              radius="sm"
                              fallbackSrc="/no_poster.jpeg"
                              className=""
                            />
                          ) : (
                            <div className=" w-[40px] h-[60px] rounded-md bg-surface-hover text-[10px] text-center text-muted flex items-center">
                              {" "}
                              No Poster
                            </div>
                          )}

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
                          {movie?.genres.map((genre: any) => (
                            <Badge
                              key={genre.id}
                              variant="light"
                              color={genre.color}
                              size="sm"
                            >
                              {genre.name}
                            </Badge>
                          ))}
                        </Group>
                      </Table.Td>
                      <Table.Td className="!text-sm">
                        {movie?.releaseDate &&
                          dayjs(movie.releaseDate).format("YYYY-MM-DD")}
                      </Table.Td>
                      <Table.Td>
                        {" "}
                        {movie.rating ? (
                          "⭐" + movie.rating
                        ) : (
                          <Text size="xs" c={"dimmed"}>
                            -
                          </Text>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={getStatusColor(movie.status)}
                          variant="light"
                        >
                          {movie.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            variant="light"
                            color="orange"
                            disabled={!hasAccess(permissionList.updateMovie)}
                            onClick={() => handleEditMovie(movie)}
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="light"
                            color="red"
                            disabled={!hasAccess(permissionList.deleteMovie)}
                            onClick={() => {
                              setEditingMovie(movie);
                              // setDeleteModalOpen(true);
                              openConfirm({
                                title: "Delete Movie",
                                message:
                                  "Are you sure you want to delete this movie?",
                                onConfirm: () => handleDeleteMovie(movie?.id),
                              });
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

        {movies?.length > 0 && (
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

        {!isPending && movies?.length === 0 && (
          <Text ta="center" c="dimmed" py="xl" size="sm">
            <div className="flex justify-center mb-2">
              <IconMovie size={30} />
            </div>
            No movie found
          </Text>
        )}
      </Card>

      {/* <FileInput onChange={(file) => setTestImage(file)} label="Test Image" />
      <Button onClick={handleSubmitImage}>Submit</Button>
      <Image src="https://i.ibb.co/ZpwMRRBC/c1f1951d7c84.jpg" /> */}
      <Modal
        opened={openMovieModal}
        onClose={() => setOpenMovieModal(false)}
        title={editingMovie ? "Edit Movie" : "Add New Movie"}
        size="lg"
        classNames={modalStyle}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Movie Name"
                placeholder="Enter movie name"
                classNames={inputStyle}
                className="mb-2"
                {...form.getInputProps("title")}
              />

              <Textarea
                classNames={inputStyle}
                label="Description"
                placeholder="Enter description"
                // required
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
                min={60}
                // // required
                {...form.getInputProps("duration")}
                hideControls
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                classNames={inputStyle}
                label="Release Date"
                type="date"
                // required
                {...form.getInputProps("releaseDate")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MultiSelect
                label="Genres"
                placeholder="Select genres"
                withErrorStyles={false}
                classNames={{
                  ...inputStyle,
                  pill: "!bg-primary !text-selected-text",
                }}
                data={
                  genreList?.length > 0
                    ? genreList?.map((g) => ({
                        value: g.id.toString(),
                        label: g.name,
                      }))
                    : []
                }
                // required
                {...form.getInputProps("genres")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" fw={500} mb="xs">
                Languages
              </Text>
              <CreatableMultiSelect
                value={selectedLanguages}
                setValue={setSelectedLanguages}
                dataList={languages}
                placeholder="Select Languages"
              />
              {form.errors.language && (
                <p className="text-[12px] mt-1 text-red-400">
                  {form.errors.language}
                </p>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="sm" fw={500} mb="xs">
                Subtitles
              </Text>
              <CreatableMultiSelect
                value={selectedSubtitles}
                setValue={setSelectedSubtitles}
                dataList={subtitles}
                placeholder="Select Subtitles"
              />
              {form.errors.subtitle && (
                <p className="text-[12px] mt-1 text-red-400">
                  {form.errors.subtitle}
                </p>
              )}
            </Grid.Col>

            <Grid.Col span={6}>
              <MultiSelect
                label="Experience"
                placeholder="Select experiences"
                withErrorStyles={false}
                classNames={{
                  ...inputStyle,
                  options: "!text-red",
                  pill: "!bg-primary !text-selected-text",
                }}
                data={["2D", "3D", "IMAX"]}
                // required
                {...form.getInputProps("experience")}
              />
            </Grid.Col>

            {/* <Grid.Col span={6}>
              <Select
                label="Status"
                placeholder="Select status"
                data={["Now Showing", "Coming Soon", "Ended"]}
                // required
                classNames={inputStyle}
                {...form.getInputProps("status")}
              />
            </Grid.Col> */}
            <Grid.Col span={12}>
              <FileInput
                label="Poster"
                classNames={{
                  input: "dashboard-input",
                  placeholder: "!text-muted !text-sm",
                }}
                // required
                accept="image/*"
                // value={selectedPoster}
                placeholder="Select Movie Poster"
                {...form.getInputProps("poster")}
                // onChange={handlePosterUpload}
              />
            </Grid.Col>
            <ImagePreview
              imagePreviewUrls={posterPreviewUrl}
              removeImage={removePoster}
              clearAllImages={clearAllImages}
              // selectedImages={selectedImages}
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
                classNames={{
                  input: "dashboard-input",
                  placeholder: "!text-muted !text-sm",
                }}
                description="Upload multiple images for the movie (posters, stills, behind-the-scenes)"
              />
            </Grid.Col>
            {/* Image Preview Section */}

            <ImagePreview
              imagePreviewUrls={imagePreviewUrls}
              isClearAll={true}
              removeImage={removeImage}
              clearAllImages={clearAllImages}
              // selectedImages={selectedImages}
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
              onClick={() => setOpenMovieModal(false)}
              className="dashboard-btn"
            >
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn min-w-[120px]">
              {isImageUploading ? (
                <Loader color="var(--color-blueGray)" size={20} />
              ) : (
                (editingMovie ? "Update" : "Add") + " Movie"
              )}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default MovieManagement;
