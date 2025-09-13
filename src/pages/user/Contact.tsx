import React from "react";
import {
  Container,
  Paper,
  Group,
  Text,
  TextInput,
  Textarea,
  Button,
  Grid,
  Divider,
  Title,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";

const theatreInfo = {
  name: "MoviePalace Movie Theatre",
  address: "123 Main Street, Downtown, Cityville, 12345",
  phone: "+1 (555) 123-4567",
  email: "info@moviepalace.com",
  hours: "Mon-Sun: 10:00 AM - 11:00 PM",
};

const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      message: (value) =>
        value.length < 10 ? "Message must be at least 10 characters" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setSubmitted(true);
    form.reset();
  };

  return (
    <Container size="lg" py={40} className="!text-text">
      <Title order={2} mb={24} ta="center" fw={700}>
        Contact Us
      </Title>
      <Grid gutter={40}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap={8}>
            <Title order={4} fw={600} mb={8}>
              Theatre Information
            </Title>
            <Text size="lg" fw={500}>
              {theatreInfo.name}
            </Text>
            <Group gap={8}>
              <IconMapPin size={18} />
              <Text>{theatreInfo.address}</Text>
            </Group>
            <Group gap={8}>
              <IconPhone size={18} />
              <Text>{theatreInfo.phone}</Text>
            </Group>
            <Group gap={8}>
              <IconMail size={18} />
              <Text>{theatreInfo.email}</Text>
            </Group>
            <Text c="dimmed" size="sm" mt={8}>
              <b>Hours:</b> {theatreInfo.hours}
            </Text>
            <Divider my={16} />
            <Title order={4} fw={600} mb={8}>
              Contact Address
            </Title>
            <Text>{theatreInfo.address}</Text>
            <Text size="sm" c="dimmed">
              Email: {theatreInfo.email}
            </Text>
            <Text size="sm" c="dimmed">
              Phone: {theatreInfo.phone}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper
            radius="md"
            p={32}
            shadow="md"
            withBorder
            bg="var(--color-surface)"
            className="!border-surface-hover"
          >
            <Title order={4} fw={600} mb={16}>
              Contact Form
            </Title>
            {submitted && (
              <Paper
                bg="var(--mantine-color-green-light)"
                p={12}
                radius="sm"
                mb={16}
              >
                <Text c="green" fw={500}>
                  Thank you for contacting us! We will get back to you soon.
                </Text>
              </Paper>
            )}
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap={16}>
                <TextInput
                  label="Name"
                  placeholder="Your Name"
                  withAsterisk
                  classNames={{
                    input:
                      "!bg-transparent !border-surface-hover !text-text !min-h-12",
                  }}
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  withAsterisk
                  classNames={{
                    input:
                      "!bg-transparent !border-surface-hover !text-text !min-h-12",
                  }}
                  {...form.getInputProps("email")}
                />
                <Textarea
                  label="Message"
                  placeholder="Type your message here..."
                  minRows={10}
                  withAsterisk
                  resize="vertical"
                  classNames={{
                    input:
                      "!bg-transparent !border-surface-hover !text-text !min-h-20",
                  }}
                  {...form.getInputProps("message")}
                />
                <Button
                  type="submit"
                  size="md"
                  radius="md"
                  color="primary"
                  className="!bg-primary !text-white !hover-primary-hover"
                  fw={600}
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Contact;
