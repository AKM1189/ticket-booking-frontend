import type { FilterListType, TabType } from "@/types/MovieTypes";
import { create } from "zustand";

type State = {
  filterList: FilterListType;
  activeTab: TabType | null;
};

type Action = {
  setFilterList: (filterList: FilterListType) => void;
  setActiveTab: (tab: TabType) => void;
};

export const useMovieStore = create<State & Action>((set) => ({
  filterList: {
    lang: [],
    exp: [],
    genre: [],
  },
  activeTab: null,
  setFilterList: (filterList) => set({ filterList }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
