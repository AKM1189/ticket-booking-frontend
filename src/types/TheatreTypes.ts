export type TheatreType = {
  id: number;
  name: string;
  location: string;
  region: string;
  city: string;
  phoneNo: string;
  totalScreens: number;
  active: boolean;
};

export type TheatreInputType = {
  name: string;
  location: string;
  region: string;
  city: string;
  phoneNo: string;
};
