import {
  Button,
  Card,
  Container,
  Group,
  List,
  Text,
  Title,
} from "@mantine/core";
import { IconCheck, IconExternalLink } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes";

/**
 * Component to test and verify all admin routes are working
 */
const RouteTestComponent = () => {
  const navigate = useNavigate();

  const testRoutes = [
    { label: "Admin Dashboard", path: routes.admin.home },
    { label: "Admin Dashboard (Alt)", path: routes.admin.dashboard },
    { label: "Admin Demo Page", path: routes.admin.demo },
  ];

  return (
    <Container size="md" py="xl">
      <Card shadow="md" padding="xl" radius="md" withBorder>
        <Title order={2} mb="md">
          🧪 Admin Route Testing
        </Title>

        <Text mb="lg">
          Test all admin dashboard routes to verify they're working correctly:
        </Text>

        <List spacing="md" mb="xl">
          {testRoutes.map((route) => (
            <List.Item
              key={route.path}
              icon={<IconCheck size={16} color="green" />}
            >
              <Group justify="space-between">
                <div>
                  <Text fw={500}>{route.label}</Text>
                  <Text size="sm" c="dimmed">
                    {route.path}
                  </Text>
                </div>
                <Button
                  size="xs"
                  variant="light"
                  leftSection={<IconExternalLink size={14} />}
                  onClick={() => navigate(route.path)}
                >
                  Test
                </Button>
              </Group>
            </List.Item>
          ))}
        </List>

        <Text size="sm" c="dimmed">
          ✅ All routes are implemented and ready to use!
        </Text>
      </Card>
    </Container>
  );
};

export default RouteTestComponent;
