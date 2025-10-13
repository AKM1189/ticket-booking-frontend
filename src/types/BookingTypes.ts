import type { SelectedSeatType } from "@/pages/user/SeatPlan";

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface BookingSummary {
  scheduleId: number;
  selectedSeats: string[];
  totalAmount: number;
  taxes: number;
  grandTotal: number;
  seatDetails: SelectedSeatType[];
}

export interface BookingRequest {
  customerInfo: CustomerInfo;
  paymentInfo: PaymentInfo;
  bookingSummary: BookingSummary;
}

export enum BookingStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  FAILED = "failed",
}

export interface BookingResponse {
  id: string;
  bookingNumber: string;
  status: BookingStatus;
  qrCode?: string;
  createdAt: string;
}
