import type { MovieType } from "./MovieTypes";
import type { ScreenType } from "./ScreenTypes";
import type { TheatreType } from "./TheatreTypes";

export type ScheduleType = {
  id: number;
  movie: MovieType;
  theatre: TheatreType;
  screen: ScreenType;
  showDate: string;
  showTime: string;
  multiplier: string;
  availableSeats: number;
  totalSeats: number;
  language: string;
  subtitle: string;
  isActive: boolean;
  bookedSeats: string[];
  priceList: {
    id: number;
    name: string;
    price: string;
  }[];
};

export type ScheduleInputType = {
  movieId: number;
  theatreId: number;
  screenId: number;
  showDate: string;
  showTime: string;
  language: string;
  subtitle: string;
  multiplier: string;
  availableSeats: number;
  totalSeats: number;
  isActive: boolean;
};
