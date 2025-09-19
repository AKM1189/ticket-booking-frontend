import { Button, Card, Container, Group, Text, Title } from "@mantine/core";
import { IconDashboard, IconExternalLink } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes";

/**
 * Demo component to provide easy access to the Admin Dashboard
 * This can be used for testing or as a temporary navigation aid
 */
const AdminAccessDemo = () => {
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate(routes.admin.home);
  };

  return (
    <Container size="sm" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Group justify="center" mb="md">
          <IconDashboard size={48} color="var(--mantine-color-blue-6)" />
        </Group>

        <Title order={2} ta="center" mb="md">
          Cinema Admin Dashboard
        </Title>

        <Text ta="center" c="dimmed" mb="xl">
          Access the comprehensive admin panel to manage movies, theaters,
          schedules, genres, and bookings.
        </Text>

        <Group justify="center">
          <Button
            size="lg"
            leftSection={<IconExternalLink size={20} />}
            onClick={handleNavigateToAdmin}
          >
            Open Admin Dashboard
          </Button>
        </Group>

        <Text size="sm" ta="center" c="dimmed" mt="md">
          Navigate to: <code>{routes.admin.home}</code>
        </Text>
      </Card>
    </Container>
  );
};

export default AdminAccessDemo;
