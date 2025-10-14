import { useCancelBookingMutation } from "@/api/mutation/admin/bookingMutation";
import { useLoadingStore } from "@/store/useLoading";
import { Button, Group, Modal, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDownload } from "@tabler/icons-react";

type CancelBookingProps = {
    bookingId: number;
    setCancelBookingId: (value: number | null) => void;
    cancelOpen: boolean;
    setCancelOpen: (value: boolean) => void;
}
const CancelBooking = ({ bookingId, setCancelBookingId, cancelOpen, setCancelOpen }: CancelBookingProps) => {
    const { mutate: cancelBooking } = useCancelBookingMutation();
    const { showLoading } = useLoadingStore();

    const form = useForm({
        initialValues: {
            reason: ""
        },
        validate: {
            reason: (value) => !value ? "Please enter valid reason!" : null
        }
    })

    const handleSubmit = (values: typeof form.values) => {
        showLoading(true)
        const data = {
            reason: values.reason
        }

        cancelBooking({ id: bookingId, data }, {
            onSuccess: () => {
                setCancelBookingId(null);
                showLoading(false)
            },
            onError: () => showLoading(false)
        })
    }

    return (
        <Modal
            opened={cancelOpen}
            onClose={() => setCancelOpen(false)}
            title={`Cancel Booking`}
            centered
            // size="full"
            // overlayProps={{ backgroundOpacity: 1, color: "var(--color-surface)" }}
            // shadow="0"
            classNames={{
                header: "dashboard-bg",
                content: "dashboard-bg h-full !min-w-[480px]",
                close: "!text-text hover:!bg-surface-hover",
            }}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Textarea
                    label={<div>Reason</div>}
                    placeholder="Write a reason for your cancellation"
                    minRows={8}
                    autosize
                    resize="vertical"
                    classNames={{
                        input:
                            "!bg-transparent !text-text !border-surface-hover focus:!border-primary !p-3",
                        label: "!mb-2 !text-text",
                    }}
                    {...form.getInputProps("reason")}
                />

                <Text c={'var(--color-muted)'} size="xs" mt={10}>
                    Full refunds are available for cancellations made at least 2 hours before showtime. Processing takes 5-7 business days.
                </Text>

                <Group justify="end" mt={15} mb={5}>
                    <Button
                        variant="outline"
                        size="sm"
                        color="var(--color-primary)"
                        className="dashboard-btn"
                        leftSection={<IconDownload size={16} />}
                        onClick={() => {
                            setCancelOpen(false)
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        // variant="light"
                        type="submit"
                        size="sm"
                        color="red"
                        className="dashboard-btn"
                        leftSection={<IconDownload size={16} />}
                    >
                        Confirm
                    </Button>
                </Group>
            </form>
        </Modal>
    )
}

export default CancelBooking;