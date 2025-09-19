import { create } from "zustand";

type State = {
  isLoading: boolean;
};

type Action = {
  showLoading: (value: boolean) => void;
};

export const useLoadingStore = create<State & Action>((set) => ({
  isLoading: false,
  showLoading: (value) => set({ isLoading: value }),
}));
