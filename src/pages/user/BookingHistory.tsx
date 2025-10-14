import { useGetUserBookingsQuery } from "@/api/query/user/bookingQuery";
import { useDownloadTicketMutation } from "@/api/mutation/user/bookingMutation";
import { useAuthStore } from "@/store/authStore";
import type { UserBookingType } from "@/types/UserBookingType";
import {
    Text,
    Card,
    Group,
    Badge,
    Button,
    Stack,
    Divider,
    Grid,
    Loader,
    Center,
    Box,
    Flex,
    Container,
    Title,
    Modal,
    Textarea,
} from "@mantine/core";
import { IconDownload, IconCalendar, IconMapPin, IconTicket, IconDeviceTv, IconLanguage, IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import DataNotFound from "@/ui/dataNotFound/DataNotFound";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import Ticket from "@/components/admin/bookings/Ticket";
import { useDisclosure } from "@mantine/hooks";
import { formatToLocalDate } from "@/utils/dateFormatter";
import { getBookingStatusColor, getStatusColor } from "@/utils/getMovieStatus";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // ES 2015
import { useCancelBookingMutation } from "@/api/mutation/admin/bookingMutation";
import CancelBooking from "@/components/user/booking/CancelBooking";
import { MovieStatus } from "@/constants/movieConstants";

dayjs.extend(isSameOrAfter);

const BookingHistory = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<UserBookingType[] | null>(null);
    const { data, isLoading } = useGetUserBookingsQuery(user?.id || 0);
    const { mutate: downloadTicket, isPending: isDownloading } = useDownloadTicketMutation();
    const { setCurrentBooking } = useBookingStore();
    const [opened, { open, close }] = useDisclosure(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [cancelBookingId, setCancelBookingId] = useState<number | null>(null);

    useEffect(() => {
        setBookings(data?.data)
    }, [data])

    const getStatusText = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const handleDownloadTicket = (bookingId: number) => {
        downloadTicket(bookingId);
    };

    return (
        <Container size="lg" py="xl">
            <Group mb="xl">
                <Button
                    variant="subtle"
                    leftSection={<IconArrowLeft size={16} />}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Title order={2}>My Booking History</Title>
            </Group>

            {isLoading ? (
                <Center py={40}>
                    <Loader size="md" />
                </Center>
            ) : !bookings || bookings.length === 0 ? (
                <DataNotFound data={[]} isPending={false} type="booking" />
            ) : (
                <Stack gap="md">
                    {bookings.map((booking: UserBookingType) => {
                        const today = dayjs();
                        const showDateTime = dayjs(`${booking.schedule.showDate} ${booking.schedule.showTime}`);
                        const isCancellable = booking.status === 'confirmed' && today.isBefore(showDateTime.subtract(2, 'hour'));
                        return (
                            <Card key={booking.id} className="!bg-surface !border-0 !text-text" shadow="sm" padding="lg" radius="md" withBorder>
                                <Stack gap="md">
                                    {/* Header */}
                                    <Group justify="space-between" align="flex-start">
                                        <Box>
                                            <Group align="center" mb={4}>
                                                <Text fw={600} size="lg">
                                                    {booking.movie.title}
                                                </Text>
                                                <Badge size="md" variant="light">
                                                    {booking.screen.type}
                                                </Badge>
                                            </Group>
                                            <Group gap="xs">
                                                <Text size="sm" c="dimmed">
                                                    Ticket #{booking.ticket.ticketNumber}
                                                </Text>

                                            </Group>
                                        </Box>
                                        <Badge color={getBookingStatusColor(booking.status)} variant="light">
                                            {booking.status}
                                        </Badge>
                                    </Group>

                                    {/* Movie Details */}
                                    <Grid>
                                        <Grid.Col span={6}>
                                            <Stack gap="xs">
                                                <Group gap="xs">
                                                    <IconMapPin size={16} />
                                                    <Text size="sm">
                                                        {booking.theatre.name}
                                                    </Text>
                                                </Group>
                                                <Text size="xs" c="dimmed" ml={22}>
                                                    {booking.theatre.location}, {booking.theatre.region}, {booking.theatre.city}
                                                </Text>

                                                <Group gap="xs">
                                                    <IconCalendar size={16} />
                                                    <Text size="sm">
                                                        {dayjs(booking.schedule.showDate).format("MMM DD, YYYY")} at{" "}
                                                        {dayjs(`2000-01-01 ${booking.schedule.showTime}`).format("h:mm A")}
                                                    </Text>
                                                </Group>

                                                <Group gap="xs">
                                                    <IconDeviceTv size={16} />
                                                    <Text size="sm">
                                                        Screen: {booking.screen.name} ({booking.screen.type})
                                                    </Text>
                                                </Group>

                                                <Group gap="xs">
                                                    <IconLanguage size={16} />
                                                    <Text size="sm">
                                                        {booking.schedule.language}
                                                        {booking.schedule.subtitle && ` (Subtitle: ${booking.schedule.subtitle})`}
                                                    </Text>
                                                </Group>
                                            </Stack>
                                        </Grid.Col>

                                        <Grid.Col span={6}>
                                            <Stack gap="xs">
                                                <Group gap="xs">
                                                    <IconTicket size={16} />
                                                    <Text size="sm" fw={500}>
                                                        Seats ({booking.seatList.length})
                                                    </Text>
                                                </Group>

                                                <Box ml={22}>
                                                    <Flex wrap="wrap" gap="xs">
                                                        {booking.seatList.map((seat, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="outline"
                                                                size="sm"
                                                                color={seat.type === 'VIP' ? 'var(--color-vip)' : seat.type === 'Premium' ? 'var(--color-premium)' : 'var(--color-standard)'}
                                                            >
                                                                {seat.seatId} ({seat.type})
                                                            </Badge>
                                                        ))}
                                                    </Flex>

                                                    <Text size="xs" c="dimmed" mt="xs">
                                                        Seat breakdown:
                                                    </Text>
                                                    {Object.entries(
                                                        booking.seatList.reduce((acc, seat) => {
                                                            const key = `${seat.type} - $${seat.price}`;
                                                            acc[key] = (acc[key] || 0) + 1;
                                                            return acc;
                                                        }, {} as Record<string, number>)
                                                    ).map(([type, count]) => (
                                                        <Text key={type} size="xs" c="dimmed">
                                                            {count}x {type}
                                                        </Text>
                                                    ))}
                                                </Box>
                                            </Stack>
                                        </Grid.Col>
                                        <div className="w-full flex justify-end me-2">
                                            <Text size="xs" c="dimmed">
                                                Issued: {formatToLocalDate(booking.ticket.issuedAt)}
                                            </Text>
                                        </div>
                                    </Grid>

                                    <Divider />

                                    {/* Footer */}
                                    <Group justify="space-between" align="center">
                                        <Box>
                                            <Text size="lg" fw={600} c="green">
                                                Total: ${booking.totalAmount}
                                            </Text>

                                        </Box>


                                        <Group>
                                            {isCancellable && (
                                                <Button
                                                    variant="light"
                                                    size="sm"
                                                    color="red"
                                                    className="dashboard-btn"
                                                    leftSection={<IconDownload size={16} />}
                                                    onClick={() => {
                                                        setCancelBookingId(booking.id)
                                                        setCancelOpen(true)
                                                    }}
                                                    loading={isDownloading}
                                                >
                                                    Cancel Booking
                                                </Button>

                                            )}

                                            {booking.status === 'confirmed' && (
                                                <Button
                                                    // variant="light"
                                                    size="sm"
                                                    color="var(--color-primary)"
                                                    className="dashboard-btn"
                                                    leftSection={<IconDownload size={16} />}
                                                    onClick={() => {
                                                        open()
                                                        setCurrentBooking(booking.id)
                                                    }}
                                                    loading={isDownloading}
                                                >
                                                    Download Ticket
                                                </Button>
                                            )}
                                        </Group>
                                    </Group>
                                </Stack>
                            </Card>
                        )
                    }
                    )}
                </Stack>
            )}

            {cancelBookingId && (
                <CancelBooking bookingId={cancelBookingId} setCancelBookingId={setCancelBookingId} cancelOpen={cancelOpen} setCancelOpen={setCancelOpen} />
            )}


            <Modal
                opened={opened}
                onClose={close}
                title={`Ticket`}
                size="full"
                // overlayProps={{ backgroundOpacity: 1, color: "var(--color-surface)" }}
                shadow="0"
                classNames={{
                    header: "dashboard-bg",
                    content: "dashboard-bg h-full !min-w-[480px]",
                    close: "!text-text hover:!bg-surface-hover",
                }}
            >
                <Ticket />
            </Modal>

        </Container>
    );
};

export default BookingHistory;