import { inputStyle, modalStyle } from "@/constants/styleConstants";
import { useAuthStore } from "@/store/authStore";
import type { Role } from "@/types/AuthType";
import {
  Avatar,
  Button,
  FileInput,
  Grid,
  Group,
  Image,
  Menu,
  Modal,
  PasswordInput,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPencil, IconUpload } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from "@/api/mutation/admin/profileMutation";

const Profile = () => {
  const { user } = useAuthStore();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  return (
    <div>
      <Menu width={180} position="bottom-start">
        <Menu.Target>
          <Group gap={"xs"} className="cursor-pointer">
            <Avatar radius="xl" color="var(--color-blueGray)" />
            <Text color="var(--color-blueGray)">{user?.name}</Text>
          </Group>
        </Menu.Target>

        <Menu.Dropdown
          classNames={{
            dropdown: "!bg-surface !text-text !border-0",
          }}
        >
          <Menu.Item
            className="!text-sm !text-text hover:!bg-surface-hover"
            onClick={() => setOpenProfileModal(true)}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            className="!text-sm !text-text hover:!bg-surface-hover"
            onClick={() => setOpenPasswordModal(true)}
          >
            Change Password
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <UpdateProfile
        openProfileModal={openProfileModal}
        setOpenProfileModal={setOpenProfileModal}
      />

      <ChangePassword
        openPasswordModal={openPasswordModal}
        setOpenPasswordModal={setOpenPasswordModal}
      />
    </div>
  );
};

export type ProfileInputType = {
  name: string;
  email: string;
  role: Role;
  image: File | null;
  phoneNo: string;
};

const UpdateProfile = ({ openProfileModal, setOpenProfileModal }) => {
  const { user } = useAuthStore();
  const [imagePreview, setImagePreivew] = useState<string | null>(null);
  const profileRef = useRef(null);

  const { mutate } = useUpdateProfileMutation();

  const form = useForm<ProfileInputType>({
    initialValues: {
      name: user?.name as string,
      email: user?.email as string,
      role: user?.role as Role,
      image: null,
      phoneNo: user?.phoneNo as string,
    },
    validate: {
      name: (value) => (!value ? "Please enter your name" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email is not valid"),
      phoneNo: (value) => (!value ? "Please enter your phone number" : null),
    },
  });

  useEffect(() => {
    form.reset();
    setImagePreivew(null);
  }, [openProfileModal]);

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setImagePreivew(user?.image || null);
      return;
    }
    form.setFieldValue("image", file);

    const reader = new FileReader();

    reader.onload = (e) => {
      setImagePreivew(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (values: typeof form.values) => {
    console.log("profile", values);
    if (user) {
      mutate({
        userId: user.id,
        data: values,
      });
    }
  };
  return (
    <div>
      <Modal
        opened={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
        title="Admin Profile"
        centered
        classNames={modalStyle}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid mb={30}>
            <Grid.Col>
              <Group justify="center" mb={10} align="end">
                <Avatar size={"100px"} src={imagePreview} />
                <ThemeIcon
                  variant="light"
                  className="ms-[-20px] cursor-pointer"
                >
                  <IconPencil
                    size={20}
                    onClick={() => profileRef?.current?.click()}
                  />
                </ThemeIcon>
              </Group>
              {/* <Image /> */}
              <FileInput
                ref={profileRef}
                hidden
                accept="image/*"
                classNames={inputStyle}
                onChange={handleImageChange}
              />
            </Grid.Col>
            <Grid.Col>
              <TextInput
                label="Name"
                placeholder="Enter you name"
                classNames={inputStyle}
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col>
              <TextInput
                label="Email"
                placeholder="Enter you email"
                classNames={inputStyle}
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
            </Grid.Col>
            <Grid.Col>
              <div className="mt-5">
                <label className="text-sm text-text font-medium">
                  Phone Number
                </label>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="MM"
                  value={form.values.phoneNo}
                  onChange={(val: any) => {
                    console.log("val", val);
                    form.setFieldValue("phoneNo", val);
                  }}
                />
                <p className="text-xs text-red-400 mt-1">
                  {form.errors.phoneNo}
                </p>
              </div>
            </Grid.Col>
            <Grid.Col>
              <TextInput
                label="Role"
                disabled
                classNames={inputStyle}
                {...form.getInputProps("role")}
              />
            </Grid.Col>
          </Grid>
          <Group justify="end">
            <Button variant="outline" className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export type PasswordInputType = {
  currentPassword: string;
  newPassword: string;
};

const ChangePassword = ({ openPasswordModal, setOpenPasswordModal }) => {
  const { user } = useAuthStore();
  const { mutate } = useChangePasswordMutation();

  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      currentPassword: (value) =>
        !value ? "Please enter your current password" : null,
      newPassword: (value) => {
        if (!value) return "Please enter new password";
        else if (value.length < 8)
          return "Password must be at least 8 characters";
        else if (!/[A-Z]/.test(value))
          return "Password must contain an uppercase letter";
        else if (!/[a-z]/.test(value))
          return "Password must contain a lowercase letter";
        else if (!/[0-9]/.test(value)) return "Password must contain a number";
      },
      confirmPassword: (value, values) =>
        value !== values.newPassword ? "Password do not match" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("passowrd", values);
    if (user) {
      mutate({
        userId: user.id,
        data: values,
      });
    }
  };

  return (
    <div>
      <Modal
        opened={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        title="Change Password"
        centered
        classNames={modalStyle}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="flex flex-col gap-5 mb-8">
            <PasswordInput
              label="Current Password"
              placeholder="Enter current password"
              classNames={inputStyle}
              {...form.getInputProps("currentPassword")}
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              classNames={inputStyle}
              {...form.getInputProps("newPassword")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-type new password"
              classNames={inputStyle}
              {...form.getInputProps("confirmPassword")}
            />
          </div>
          <Group justify="end">
            <Button variant="outline" className="dashboard-btn">
              Cancel
            </Button>
            <Button type="submit" className="dashboard-btn">
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
