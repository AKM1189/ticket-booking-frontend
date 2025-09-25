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
}));
