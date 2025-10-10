import { getScheduleDetail } from "@/api/function/user/scheduleApi";
import SeatPlanHeader from "@/components/user/seatPlan/SeatPlanHeader";
import type { ScheduleWithSeatList } from "@/types/ScheduleTypes";
import type { BookingSummary } from "@/types/BookingTypes";
import {
  Button,
  TextInput,
  Card,
  Text,
  Group,
  Stack,
  Divider,
  Badge,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import {
  IconMapPin,
  IconCalendar,
  IconClock,
  IconTicket,
} from "@tabler/icons-react";
import dayjs from "dayjs";

// Combined validation schema
const checkoutSchema = z.object({
  // Customer Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  // Payment Information
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Invalid card number"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z
    .string()
    .min(3, "CVV must be 3 digits")
    .max(4, "CVV must be 3-4 digits"),
  cardHolderName: z.string().min(2, "Card holder name is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [schedule, setSchedule] = useState<ScheduleWithSeatList | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get selected seats from URL params (normally from seat selection page)
  const selectedSeats = searchParams.get("seats")?.split(",") || ["A1", "A2"]; // Mock data
  const totalAmount = parseFloat(searchParams.get("total") || "25.00"); // Mock data

  const form = useForm<CheckoutFormData>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolderName: "",
    },
    validate: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    const getSchedule = async () => {
      if (id) {
        const data = await getScheduleDetail(parseInt(id));
        setSchedule(data?.data);
        setLoading(false);
      }
    };
    getSchedule();
  }, [id]);

  // Mock booking summary calculation
  const bookingSummary: BookingSummary = {
    scheduleId: parseInt(id || "0"),
    selectedSeats,
    totalAmount,
    taxes: totalAmount * 0.1,
    convenienceFee: 2.5,
    grandTotal: totalAmount + totalAmount * 0.1 + 2.5,
    seatDetails: selectedSeats.map((seat, index) => ({
      seatNumber: seat,
      seatType: index % 2 === 0 ? "Premium" : "Standard",
      price: index % 2 === 0 ? 15.0 : 10.0,
    })),
  };

  const handleSubmit = async (values: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // const bookingRequest = {
    //   customerInfo: {
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     email: values.email,
    //     phone: values.phone,
    //   },
    //   paymentInfo: {
    //     cardNumber: values.cardNumber,
    //     expiryDate: values.expiryDate,
    //     cvv: values.cvv,
    //     cardHolderName: values.cardHolderName,
    //   },
    //   bookingSummary,
    // };

    // const data = {
    //   customerName: values.name,
    //   customerEmail: values.email,
    //   customerPhone: values.phone,
    //   scheduleId: id,
    //   note: values.notes,
    //   userId: user?.id.toString() || "",
    //   selectedSeats: selectedInfo.seats?.map((seat) => seat.label),
    //   totalAmount: calculateTotal().toString(),
    // };
    // addBookingMutation(
    //   { data },
    //   {
    //     onSuccess: (data) => {
    //       showLoading(false);
    //       setCurrentBooking(data?.data);
    //       setCurrentComp(BookingCompType.ticket);
    //     },
    //     onError: () => showLoading(false),
    //   },
    // );

    setIsProcessing(false);

    // Show success message or redirect
    alert("Booking confirmed successfully!");
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (!schedule) {
    return <div>Schedule not found</div>;
  }

  return (
    <div>
      <SeatPlanHeader schedule={schedule} />

      <div className="px-4 md:px-20 lg:px-52 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-10">
          {/* Main Form */}
          <div className="lg:col-span-5">
            <Card className="!bg-surface !p-8 !text-text" radius="lg">
              <Text size="xl" fw={700} mb="lg" className="text-primary">
                Complete Your Booking
              </Text>

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className="auth-text-input">
                  {/* Customer Information Section */}
                  <Text size="lg" fw={600} mb="md" className="text-text">
                    Customer Information
                  </Text>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput
                      label="First Name"
                      placeholder="Enter your first name"
                      key={form.key("firstName")}
                      classNames={{
                        root: "mt-5",
                        label: "text-[16px] text-text",
                        input: twMerge(
                          "login-input",
                          form.errors.firstName && "border-red-500",
                        ),
                        error: "text-red-500",
                      }}
                      {...form.getInputProps("firstName")}
                    />

                    <TextInput
                      label="Last Name"
                      placeholder="Enter your last name"
                      key={form.key("lastName")}
                      classNames={{
                        root: "mt-5",
                        label: "text-[16px] text-text",
                        input: twMerge(
                          "login-input",
                          form.errors.lastName && "border-red-500",
                        ),
                        error: "text-red-500",
                      }}
                      {...form.getInputProps("lastName")}
                    />
                  </div>

                  <TextInput
                    label="Email Address"
                    placeholder="Enter your email"
                    key={form.key("email")}
                    classNames={{
                      root: "mt-5",
                      label: "text-[16px] text-text",
                      input: twMerge(
                        "login-input",
                        form.errors.email && "border-red-500",
                      ),
                      error: "text-red-500",
                    }}
                    {...form.getInputProps("email")}
                  />

                  <TextInput
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    key={form.key("phone")}
                    classNames={{
                      root: "mt-5",
                      label: "text-[16px] text-text",
                      input: twMerge(
                        "login-input",
                        form.errors.phone && "border-red-500",
                      ),
                      error: "text-red-500",
                    }}
                    {...form.getInputProps("phone")}
                  />

                  <Divider my="xl" />

                  {/* Payment Information Section */}
                  <Text size="lg" fw={600} mb="md" className="text-text">
                    Payment Information
                  </Text>

                  <TextInput
                    label="Card Holder Name"
                    placeholder="Name on card"
                    key={form.key("cardHolderName")}
                    classNames={{
                      root: "mt-5",
                      label: "text-[16px] text-text",
                      input: twMerge(
                        "login-input",
                        form.errors.cardHolderName && "border-red-500",
                      ),
                      error: "text-red-500",
                    }}
                    {...form.getInputProps("cardHolderName")}
                  />

                  <TextInput
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    key={form.key("cardNumber")}
                    classNames={{
                      root: "mt-5",
                      label: "text-[16px] text-text",
                      input: twMerge(
                        "login-input",
                        form.errors.cardNumber && "border-red-500",
                      ),
                      error: "text-red-500",
                    }}
                    onChange={(event) => {
                      const formatted = formatCardNumber(
                        event.currentTarget.value,
                      );
                      form.setFieldValue("cardNumber", formatted);
                    }}
                    value={form.getValues().cardNumber}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <TextInput
                      label="Expiry Date"
                      placeholder="MM/YY"
                      key={form.key("expiryDate")}
                      classNames={{
                        root: "mt-5",
                        label: "text-[16px] text-text",
                        input: twMerge(
                          "login-input",
                          form.errors.expiryDate && "border-red-500",
                        ),
                        error: "text-red-500",
                      }}
                      {...form.getInputProps("expiryDate")}
                    />

                    <TextInput
                      label="CVV"
                      placeholder="123"
                      key={form.key("cvv")}
                      classNames={{
                        root: "mt-5",
                        label: "text-[16px] text-text",
                        input: twMerge(
                          "login-input",
                          form.errors.cvv && "border-red-500",
                        ),
                        error: "text-red-500",
                      }}
                      {...form.getInputProps("cvv")}
                    />
                  </div>
                </div>

                <Group justify="flex-end" mt="xl">
                  <Button
                    type="submit"
                    size="lg"
                    loading={isProcessing}
                    className="dashboard-btn"
                  >
                    Confirm Booking
                  </Button>
                </Group>
              </form>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-3">
            <Card
              className="!bg-surface !p-6 !sticky !top-4 !text-text"
              radius="lg"
            >
              <Text
                size="xl"
                fw={700}
                mb="lg"
                className="text-primary text-center"
              >
                Booking Summary
              </Text>

              <Stack gap="md">
                {/* Movie Info */}
                <div>
                  <Group gap="sm" mb="xs">
                    <IconTicket size={16} className="text-primary" />
                    <Text fw={600} className="text-text">
                      {schedule.movie?.title}
                    </Text>
                  </Group>
                  <Text size="sm" className="text-muted">
                    {schedule.language} [Sub: {schedule.subtitle}]
                  </Text>
                </div>

                <Divider />

                {/* Theatre & Time Info */}
                <div>
                  <Group gap="sm" mb="xs">
                    <IconMapPin size={16} className="text-primary" />
                    <Text fw={600} className="text-text">
                      {schedule.theatre?.name}
                    </Text>
                  </Group>
                  <Text size="sm" className="text-muted">
                    {schedule.theatre?.location}
                  </Text>
                  <Text size="sm" className="text-muted">
                    Screen: {schedule.screen?.name}
                  </Text>
                </div>

                <Group gap="lg">
                  <div>
                    <Group gap="xs">
                      <IconCalendar size={16} className="text-primary" />
                      <Text size="sm" fw={500} className="text-text">
                        {dayjs(schedule.showDate).format("DD MMM YYYY")}
                      </Text>
                    </Group>
                  </div>
                  <div>
                    <Group gap="xs">
                      <IconClock size={16} className="text-primary" />
                      <Text size="sm" fw={500} className="text-text">
                        {dayjs(`2025-09-25 ${schedule.showTime}`).format(
                          "hh:mm A",
                        )}
                      </Text>
                    </Group>
                  </div>
                </Group>

                <Divider />

                {/* Seats */}
                <div>
                  <Text fw={600} mb="xs" className="text-text">
                    Selected Seats
                  </Text>
                  <Group gap="xs">
                    {bookingSummary.seatDetails.map((seat) => (
                      <Badge
                        key={seat.seatNumber}
                        variant="light"
                        color="blue"
                        size="lg"
                      >
                        {seat.seatNumber}
                      </Badge>
                    ))}
                  </Group>
                </div>

                <Divider />

                {/* Price Breakdown */}
                <div>
                  <Text fw={600} mb="md" className="text-text">
                    Price Details
                  </Text>

                  {bookingSummary.seatDetails.map((seat) => (
                    <Group
                      justify="space-between"
                      key={seat.seatNumber}
                      mb="xs"
                    >
                      <Text size="sm" className="text-muted">
                        {seat.seatNumber} ({seat.seatType})
                      </Text>
                      <Text size="sm" className="text-text">
                        ${seat.price.toFixed(2)}
                      </Text>
                    </Group>
                  ))}

                  <Group justify="space-between" mb="xs">
                    <Text size="sm" className="text-muted">
                      Subtotal
                    </Text>
                    <Text size="sm" className="text-text">
                      ${bookingSummary.totalAmount.toFixed(2)}
                    </Text>
                  </Group>

                  <Group justify="space-between" mb="xs">
                    <Text size="sm" className="text-muted">
                      Taxes & Fees
                    </Text>
                    <Text size="sm" className="text-text">
                      ${bookingSummary.taxes.toFixed(2)}
                    </Text>
                  </Group>

                  <Group justify="space-between" mb="xs">
                    <Text size="sm" className="text-muted">
                      Convenience Fee
                    </Text>
                    <Text size="sm" className="text-text">
                      ${bookingSummary.convenienceFee.toFixed(2)}
                    </Text>
                  </Group>

                  <Divider my="sm" />

                  <Group justify="space-between">
                    <Text fw={700} className="text-primary">
                      Total Amount
                    </Text>
                    <Text fw={700} size="lg" className="text-primary">
                      ${bookingSummary.grandTotal.toFixed(2)}
                    </Text>
                  </Group>
                </div>
              </Stack>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
