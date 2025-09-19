import {
  Avatar,
  Button,
  FileInput,
  Group,
  Modal,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { CastInputType, CastType } from "@/types/CastTypes";
import {
  useAddCastMutation,
  useUpdateCastMutation,
} from "@/api/mutation/admin/castMutation";
import { useLoadingStore } from "@/store/useLoading";
import { showNotification } from "@/utils/showNotification";
import { StatusType } from "@/types/NotificationType";

interface CastModalProps {
  opened: boolean;
  onClose: () => void;
  cast?: CastType | null;
}

const CastModal = ({ opened, onClose, cast }: CastModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: addCastMutation } = useAddCastMutation();
  const { mutate: updateCastMutation } = useUpdateCastMutation();
  const { showLoading } = useLoadingStore();
  const [selectedImg, setSelectedImg] = useState<File | null>(null);

  const form = useForm<CastInputType>({
    initialValues: {
      name: "",
      role: "",
      image: null,
    },
    validate: {
      name: (value) => (!value ? "Name is required" : null),
      role: (value) => (!value ? "Role is required" : null),
    },
  });

  useEffect(() => {
    if (cast) {
      form.setValues({
        name: cast.name,
        role: cast.role,
        image: null,
      });
      setImagePreview(cast.image?.url);
    } else {
      form.reset();
      setImagePreview(null);
    }
  }, [cast, opened]);

  const handleImageChange = (file: File | null) => {
    form.setFieldValue("image", file);
    setSelectedImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(cast?.image?.url || null);
    }
  };

  const handleSubmit = async (values: CastInputType) => {
    // setIsSubmitting(true);

    try {
      if (cast) {
        if (
          cast.name === values.name &&
          cast.role === values.role &&
          !selectedImg
        ) {
          showNotification({
            title: "Cast Didn't Update",
            message: "No changes have been made",
            type: StatusType.error,
          });
          return;
        }
        showLoading(true);

        updateCastMutation(
          {
            data: { ...values, image: selectedImg },
            id: cast.id,
          },
          {
            onSuccess: () => {
              onClose();
              showLoading(false);
              form.reset();
              setImagePreview(null);
              setSelectedImg(null);
            },
            onError: () => {
              showLoading(false);
            },
          },
        );
      } else {
        addCastMutation(
          { data: values },
          {
            onSuccess: () => {
              onClose();
              showLoading(false);
              form.reset();
              setImagePreview(null);
              setSelectedImg(null);
            },
            onError: () => {
              showLoading(false);
            },
          },
        );
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to save cast member",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const inputStyle = {
    input: "dashboard-input max-w-md",
    label: "!mb-2 !text-text",
  };
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setSelectedImg(null);
        onClose();
      }}
      title={cast ? "Edit Cast Member" : "Add Cast Member"}
      size="md"
      classNames={{
        header: "dashboard-bg",
        content: "dashboard-bg",
        close: "!text-text hover:!bg-surface-hover",
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Group justify="center">
            <Avatar
              src={imagePreview}
              alt="Cast preview"
              size={120}
              radius="md"
            />
          </Group>

          <FileInput
            label="Profile Image"
            placeholder="Upload image"
            leftSection={<IconUpload size={16} />}
            accept="image/*"
            onChange={handleImageChange}
            classNames={inputStyle}
          />

          <TextInput
            label="Name"
            placeholder="Enter cast member name"
            required
            classNames={inputStyle}
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Role"
            placeholder="e.g., Actor, Director, Producer"
            required
            classNames={inputStyle}
            {...form.getInputProps("role")}
          />

          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              className="dashboard-btn"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              className="dashboard-btn"
            >
              {cast ? "Update" : "Add"} Cast
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default CastModal;
