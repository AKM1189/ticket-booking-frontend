import { Container, Group, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { BookingCompType } from "./BookingPage";
import Ticket from "./Ticket";

const TicketPage = ({
  setCurrentComp,
}: {
  setCurrentComp: (value: BookingCompType) => void;
}) => {
  return (
    <Container size="xl" px={0}>
      <Group>
        <Group
          className="p-2 cursor-pointer hover:bg-surface-hover rounded-md transition-colors"
          onClick={() => setCurrentComp(BookingCompType.bookingHome)}
          gap="xs"
          c="dimmed"
        >
          <IconChevronLeft size={24} />
          <Text size="sm">Back to Bookings</Text>
        </Group>
      </Group>

      <Ticket />
    </Container>
  );
};

export default TicketPage;
