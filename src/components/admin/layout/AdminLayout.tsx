import {
  AppShell,
  Avatar,
  Burger,
  Group,
  Switch,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDashboard,
  IconMovie,
  IconBuilding,
  IconCalendar,
  IconTags,
  IconUsers,
  IconTicket,
  IconLogout,
  IconDeviceTv,
  IconUserStar,
  IconBell,
} from "@tabler/icons-react";
import { AdminTabType } from "@/types/AdminTypes";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "@/api/mutation/authMutation";
import { useConfirmModalStore } from "@/store/useConfirmModalStore";
import Profile from "../profile/Profile";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/AuthType";
import Notifications from "../notifications/Notifications";
// import { useAuth } from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: AdminTabType;
  onTabChange: (tab: AdminTabType) => void;
}

const adminNavigationItems = [
  { icon: IconDashboard, label: "Dashboard", value: AdminTabType.DASHBOARD },
  { icon: IconTicket, label: "Bookings", value: AdminTabType.BOOKINGS },
  { icon: IconMovie, label: "Movies", value: AdminTabType.MOVIES },
  { icon: IconTags, label: "Genres", value: AdminTabType.GENRES },
  { icon: IconUserStar, label: "Casts", value: AdminTabType.CASTS },
  { icon: IconCalendar, label: "Schedules", value: AdminTabType.SCHEDULES },
  { icon: IconDeviceTv, label: "Screens", value: AdminTabType.SCREENS },
  { icon: IconBuilding, label: "Theaters", value: AdminTabType.THEATERS },
  { icon: IconUsers, label: "Users", value: AdminTabType.USERS },
];

const staffNavigationItems = [
  { icon: IconDashboard, label: "Dashboard", value: AdminTabType.DASHBOARD },
  { icon: IconTicket, label: "Bookings", value: AdminTabType.BOOKINGS },
  // { icon: IconMovie, label: "Movies", value: AdminTabType.MOVIES },
  { icon: IconCalendar, label: "Schedules", value: AdminTabType.SCHEDULES },
];

const AdminLayout = ({
  children,
  activeTab,
  onTabChange,
}: AdminLayoutProps) => {
  const [opened, { toggle, close }] = useDisclosure();
  const [navigationItems, setNavigationItems] = useState<any>([]);
  const { user } = useAuthStore();
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const { mutate: logout } = useLogoutMutation();

  useEffect(() => {
    user?.role === Role.admin
      ? setNavigationItems(adminNavigationItems)
      : setNavigationItems(staffNavigationItems);
  }, [user]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode); // Persist choice
  }, [mode]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) setMode(value == "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      className="bg-background text-text"
      classNames={{
        header: "!border-b-red",
      }}
      style={{
        "--app-shell-border-color": "var(--color-coolBlue)", // your desired border color (e.g. blue)
      }}
    >
      <AppShell.Header className="!bg-background !text-text !min-w-[400px]">
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              color="var(--color-text)"
            />
            <Text size="xl" fw={700} c="primary">
              Movie Palace
            </Text>
          </Group>

          <Group gap="xl" justify="space-between">
            <div className="cursor-pointer">
              <Switch
                size="sm"
                color="var(--color-surface-hover)"
                onLabel={
                  <IconSun
                    size={16}
                    stroke={2.5}
                    color="var(--mantine-color-yellow-4)"
                  />
                }
                value={mode}
                defaultChecked={mode === "dark"}
                className="!cursor-pointer"
                offLabel={
                  <IconMoonStars
                    size={16}
                    stroke={2.5}
                    color="var(--mantine-color-blue-6)"
                  />
                }
                onChange={handleThemeChange}
              />
            </div>

            <Notifications />
            <Profile />
            {/* <div className="max-sm:hidden">
              <LogoutBtn close={close} handleLogout={handleLogout} />
            </div> */}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        className="!bg-background !border-red !min-w-[250px]"
      >
        <div className="flex flex-col flex-grow space-y-2">
          <div className="space-y-2 flex-grow">
            {navigationItems.map((item) => (
              <UnstyledButton
                key={item.value}
                onClick={() => {
                  close();
                  onTabChange(item.value);
                }}
                className={`w-full rounded-lg transition-colors !p-3 ${
                  activeTab === item.value
                    ? "!bg-primary !text-white"
                    : "hover:!bg-surface"
                }`}
              >
                <Group gap="sm">
                  <item.icon size={20} />
                  <Text size="sm" fw={500}>
                    {item.label}
                  </Text>
                </Group>
              </UnstyledButton>
            ))}
          </div>
          <div className="">
            <LogoutBtn close={close} handleLogout={handleLogout} />
          </div>
        </div>
      </AppShell.Navbar>

      <AppShell.Main className="min-w-[400px]">{children}</AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;

const LogoutBtn = ({ close, handleLogout }) => {
  const { open: logoutConfirm } = useConfirmModalStore();

  return (
    <UnstyledButton
      onClick={() => {
        close();
        logoutConfirm({
          title: "Logout",
          message: "Are you sure you want to log out?",
          onConfirm: handleLogout,
        });
      }}
      className={` w-full rounded-lg transition-colors !p-3 hover:!bg-surface`}
    >
      <Group gap="sm">
        <IconLogout size={20} color="#f04f50" />

        <Text size="sm" fw={500} color="red">
          Logout
        </Text>
      </Group>
    </UnstyledButton>
  );
};
