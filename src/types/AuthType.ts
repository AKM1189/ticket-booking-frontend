export type AuthType = {
  name: string;
  email: string;
  role: Role;
};

export enum Role {
  admin = "admin",
  user = "user",
}
