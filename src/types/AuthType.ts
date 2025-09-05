export type AuthType = {
  id: number;
  name: string;
  email: string;
  role: Role;
  image: string;
  phoneNo: string;
};

export enum Role {
  admin = "admin",
  user = "user",
  guest = "guest",
}
