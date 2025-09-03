import type { Role } from "./AuthType";

export type UserType = {
  id: number;
  name: string;
  email: string;
  profile: string;
  phoneNo: string;
  role: Role;
  active: boolean;
};

export type UserInputType = {
  name: string;
  email: string;
  phoneNo: string;
};
