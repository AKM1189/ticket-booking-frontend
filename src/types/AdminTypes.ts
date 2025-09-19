import type { MovieType } from "./MovieTypes";

export type TheaterType = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  seatLayout: SeatLayoutType;
  isActive: boolean;
};

export type SeatLayoutType = {
  rows: number;
  seatsPerRow: number;
  aisles: number[];
  disabledSeats: string[];
};

export type SeatType = {
  id: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "vip";
  price: number;
  isBooked: boolean;
  isDisabled: boolean;
};

export type ScheduleType = {
  id: number;
  movieId: number;
  theaterId: number;
  showDate: string;
  showTime: string;
  priceList: number;
  availableSeats: number;
  totalSeats: number;
  isActive: boolean;
  movie?: MovieType;
  theater?: TheaterType;
};

export type AdminStatsType = {
  totalMovies: number;
  totalTheaters: number;
  totalSchedules: number;
  totalBookings: number;
  revenue: number;
  activeMovies: number;
};

export type BookingType = {
  id: number;
  userId: number;
  scheduleId: number;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: "confirmed" | "cancelled" | "pending";
  customerName: string;
  customerEmail: string;
  schedule?: ScheduleType;
};

export enum AdminTabType {
  DASHBOARD = "dashboard",
  MOVIES = "movies",
  THEATERS = "theaters",
  SCHEDULES = "schedules",
  GENRES = "genres",
  CASTS = "casts",
  BOOKINGS = "bookings",
  SEATTYPE = "seatType",
  SCREENS = " screens",
  USERS = "users",
}
