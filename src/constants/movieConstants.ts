import { SortType } from "@/types/MovieTypes";

export const movieType = {
  showing: "Now Showing",
  coming: "Coming Soon",
  available: "Ticket Available",
};

export enum MovieStatus {
  showing = "Now Showing",
  coming = "Coming Soon",
  available = "Ticket Available",
  trending = "Trending",
  ended = "Ended",
}

export const sortList = [
  MovieStatus.showing,
  // MovieStatus.trending,
  MovieStatus.available,
  MovieStatus.coming,
];

export enum MovieRequestType {
  showing = "now-showing",
  coming = "coming-soon",
  available = "ticket-available",
}

//////////////
