import type { FilterListType } from "@/types/MovieTypes";
import { create } from "zustand";

type MovieStoreType = {
  filterList: FilterListType;
  setFilterList: (filterList: FilterListType) => void;
};

export const useMovieStore = create<MovieStoreType>((set) => ({
  filterList: {
    lang: [],
    exp: [],
    genre: [],
  },
  setFilterList: (filterList) => set({ filterList }),
}));
