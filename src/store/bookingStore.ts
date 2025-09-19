import { create } from "zustand";

type State = {
  currentBooking: number | null;
};

type Action = {
  setCurrentBooking: (value: number | null) => void;
};

export const useBookingStore = create<State & Action>((set) => ({
  currentBooking: null,
  setCurrentBooking: (id) => set({ currentBooking: id }),
}));
