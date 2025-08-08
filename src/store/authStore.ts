import type { AuthType } from "@/types/AuthType";
import { create } from "zustand";

interface AuthStore {
  user: AuthType | null;
  setUser: (user: AuthType | null) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: any) => set({ user: userFromJson(user) }),
  logout: () => set({ user: null }),
}));

const userFromJson = (data: any) => {
  if (!data) return;
  const { name, email, role } = data;
  return {
    name,
    email,
    role,
  };
};
