import { StatusType, type ResponseType } from "@/types/NotificationType";
import { showNotification } from "./showNotification";
import { AxiosError } from "axios";

export const getSuccessNoti = (
  title: string,
  data: ResponseType,
  defaultMsg: string,
) => {
  const successMessage = data?.message || defaultMsg;
  showNotification({
    title,
    message: successMessage,
    type: StatusType.success,
  });
};

export const getErrorNoti = (title: string, error: any, defaultMsg: string) => {
  if (error instanceof AxiosError) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error[0].message ||
      defaultMsg;
    showNotification({
      title,
      message: errorMessage,
      type: StatusType.error,
    });
  }
};
