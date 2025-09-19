import { SortType } from "@/types/MovieTypes";

export const movieType = {
  showing: "Now Showing",
  coming: "Coming Soon",
  available: "Ticket Available",
};

export enum MovieType {
  showing = "Now Showing",
  coming = "Coming Soon",
  available = "Ticket Available",
}

export const sortList = [
  SortType.showing,
  SortType.comingSoon,
  SortType.trending,
];

//////////////
