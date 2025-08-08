export type NotificationType = {
  title: string;
  message: string;
  type: StatusType;
};

export enum StatusType {
  success = "success",
  error = "error",
}

export type ResponseType = {
  status: number;
  message: string;
};
