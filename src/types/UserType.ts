import type { Role } from "./AuthType";
import type { TheatreType } from "./TheatreTypes";

export type UserType = {
  id: number;
  name: string;
  email: string;
  profile: string;
  phoneNo: string;
  role: Role;
  theatre: TheatreType;
  active: boolean;
};

export type UserInputType = {
  name: string;
  email: string;
  phoneNo: string;
  role: Role.admin | Role.staff;
};
