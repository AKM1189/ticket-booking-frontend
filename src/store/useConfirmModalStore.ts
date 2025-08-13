import type { FilterListType, TabType } from "@/types/MovieTypes";
import { create } from "zustand";

type State = {
  isOpen: boolean;
  title: string;
  message: string;
};

type Action = {
  onConfirm?: () => void;
  onCancel?: () => void;
  open: (options: {
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
  close: () => void;
};

export const useConfirmModalStore = create<State & Action>((set) => ({
  isOpen: false,
  title: "",
  message: "",
  onConfirm: undefined,
  onCancel: undefined,
  open: ({ title, message, onConfirm, onCancel }) =>
    set({
      isOpen: true,
      title,
      message,
      onConfirm,
      onCancel,
    }),
  close: () =>
    set({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: undefined,
      onCancel: undefined,
    }),
}));
