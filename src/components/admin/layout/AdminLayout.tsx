import {
  AppShell,
  Burger,
  Group,
  Switch,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDashboard,
  IconMovie,
  IconBuilding,
  IconCalendar,
  IconTags,
  IconTicket,
  IconLogout,
} from "@tabler/icons-react";
import { AdminTabType } from "@/types/AdminTypes";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: AdminTabType;
  onTabChange: (tab: AdminTabType) => void;
}

const navigationItems = [
  { icon: IconDashboard, label: "Dashboard", value: AdminTabType.DASHBOARD },
  { icon: IconMovie, label: "Movies", value: AdminTabType.MOVIES },
  { icon: IconBuilding, label: "Theaters", value: AdminTabType.THEATERS },
  { icon: IconCalendar, label: "Schedules", value: AdminTabType.SCHEDULES },
  { icon: IconTags, label: "Genres", value: AdminTabType.GENRES },
  { icon: IconTicket, label: "Bookings", value: AdminTabType.BOOKINGS },
];

const AdminLayout = ({
  children,
  activeTab,
  onTabChange,
}: AdminLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();
  const [mode, setMode] = useState("dark");
  useEffect(() => {
    console.log("theme", mode);
  }, [mode]);

  const handleThemeChange = (e) => {
    const { value } = e.target;
    if (e.target)
      if (value === "dark") {
        document.body.classList.remove("dark"); // disable
        setMode("light");
      } else if (value === "light") {
        document.body.classList.add("dark"); // enable
        setMode("dark");
      }
    // document.body.classList.toggle("dark");
  };
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
      <AppShell.Header className="!bg-background !text-text">
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
          <UnstyledButton
            p="sm"
            style={{
              borderRadius: rem(8),
              "&:hover": {
                backgroundColor: "var(--mantine-color-gray-1)",
              },
            }}
          >
            <Group gap="xs">
              <div>
                <Switch
                  size="md"
                  color="var(--color-surface-hover)"
                  onLabel={
                    <IconSun
                      size={16}
                      stroke={2.5}
                      color="var(--mantine-color-yellow-4)"
                    />
                  }
                  value={mode}
                  defaultChecked
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
              <IconLogout size={16} />
              <Text size="sm">Logout</Text>
            </Group>
          </UnstyledButton>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className="!bg-background !border-red">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <UnstyledButton
              key={item.value}
              onClick={() => onTabChange(item.value)}
              className={`w-full rounded-lg transition-colors !p-3 ${
                activeTab === item.value
                  ? "!bg-primary text-white"
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
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
