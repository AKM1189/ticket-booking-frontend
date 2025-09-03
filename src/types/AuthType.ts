export type AuthType = {
  id: number;
  name: string;
  email: string;
  role: Role;
};

export enum Role {
  admin = "admin",
  user = "user",
  guest = "guest",
}
