import type { TheatreType } from "./TheatreTypes";

export type ScreenType = {
  id: number;
  name: string;
  theatre: TheatreType;
  capacity: number;
  rows: number;
  cols: number;
  type: string;
  active: boolean;
  disabledSeats: string[];
  aisles: number[] | string[];
  multiplier: number | undefined;
  seatTypes: SelectedTypeList[];
};

export type ScreenInputType = {
  name: string;
  theatreId: string;
  capacity: number;
  rows: number;
  cols: number;
  type: string;
  active: boolean;
  disabledSeats: string[];
  aisles: number[] | string[];
  multiplier: number | null;
  seatTypes: SelectedTypeList[];
};

export type SelectedTypeList = {
  typeId: string;
  seatList: string[];
};
