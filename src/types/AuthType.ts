import type { ImageType } from "./MovieTypes";

export type AuthType = {
  id: number;
  name: string;
  email: string;
  role: Role;
  image: ImageType;
  phoneNo: string;
};

export enum Role {
  admin = "admin",
  user = "user",
  guest = "guest",
  staff = "staff",
}
