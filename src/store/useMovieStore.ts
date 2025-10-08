import type {
  FilterListType,
  HomeMoviesType,
  TabType,
} from "@/types/MovieTypes";
import { create } from "zustand";

type State = {
  showingMovies: HomeMoviesType[];
  comingMovies: HomeMoviesType[];
  availableMovies: HomeMoviesType[];
  filterList: FilterListType;
  activeTab: TabType | null;
};

type Action = {
  setMovies: (
    movies: HomeMoviesType[],
    type: "showing" | "coming" | "available",
  ) => void;
  setFilterList: (filterList: FilterListType) => void;
  setActiveTab: (tab: TabType) => void;
  addFilter: (key: keyof FilterListType, value: string) => void;
  removeFilter: (key: keyof FilterListType, value: string) => void;
  clearFilter: () => void;
};

export const useMovieStore = create<State & Action>((set) => ({
  showingMovies: [],
  comingMovies: [],
  availableMovies: [],
  // searchMovie: null,
  setMovies: (movies, type) => {
    if (type === "showing") return set({ showingMovies: movies });
    else if (type === "available") return set({ availableMovies: movies });
    else if (type === "coming") return set({ comingMovies: movies });
  },
  filterList: {
    lang: [],
    exp: [],
    genre: [],
  },
  activeTab: null,
  setFilterList: (filterList) => set({ filterList }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  addFilter: (key, value) =>
    set((state) => ({
      filterList: {
        ...state.filterList,
        [key]: [...state.filterList[key], value],
      },
    })),

  removeFilter: (key, value) =>
    set((state) => ({
      filterList: {
        ...state.filterList,
        [key]: state.filterList[key].filter((v) => v !== value),
      },
    })),

  clearFilter: () =>
    set({
      filterList: {
        lang: [],
        exp: [],
        genre: [],
      },
    }),
}));
