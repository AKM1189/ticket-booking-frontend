import type { TheaterType } from "./AdminTypes";
import type { ImageType } from "./MovieTypes";

export type AuthType = {
  id: number;
  name: string;
  email: string;
  role: Role;
  image: ImageType;
  phoneNo: string;
  theatre?: TheaterType;
};

export enum Role {
  admin = "admin",
  user = "user",
  guest = "guest",
  staff = "staff",
}
