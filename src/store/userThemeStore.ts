import { Theme } from "@/types/ThemeType";
import { create } from "zustand";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem("theme") as Theme) || Theme.dark,
  setTheme: (theme) => set({ theme }),
}));
