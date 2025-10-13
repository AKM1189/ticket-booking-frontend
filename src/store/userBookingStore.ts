import { BookingStage } from "@/constants/bookingConstants";
import type { SelectedSeatType } from "@/pages/user/SeatPlan";
import type { ScheduleWithSeatList } from "@/types/ScheduleTypes";
import { create } from "zustand";

type State = {
  bookingId: number | null;
  schedule: ScheduleWithSeatList | null;
  selectedSeats: SelectedSeatType[];
  activeStage: string;
};

type Action = {
  setBookingId: (value: number | null) => void;
  setSchedule: (value: ScheduleWithSeatList | null) => void;
  setSelectedSeats: (seats: SelectedSeatType[]) => void;
  setActiveStage: (stage: string) => void;
};

export const useUserBookingStore = create<State & Action>((set) => ({
  bookingId: null,
  schedule: null,
  selectedSeats: [],
  activeStage: BookingStage.seatPlan,
  setBookingId: (value) => set({ bookingId: value }),
  setSchedule: (schedule) => set({ schedule }),
  setSelectedSeats: (seats) => set({ selectedSeats: seats }),
  setActiveStage: (stage) => set({ activeStage: stage }),
}));
