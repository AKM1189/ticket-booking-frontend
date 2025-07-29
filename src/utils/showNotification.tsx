import { notifications } from "@mantine/notifications";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { StatusType, type NotificationType } from "../types/NotificationType";

export const showNotification = ({
  title,
  message,
  type,
}: NotificationType) => {
  notifications.show({
    title,
    message,
    autoClose: true,
    icon:
      type === StatusType.success ? (
        <IoCheckmarkCircleSharp className="icon text-green-500" size="2rem" />
      ) : (
        <IoIosCloseCircle className="icon text-red-500" size="2rem" />
      ),
    withCloseButton: true,
    position: "top-center",
    styles: {
      root: {
        position: "relative",
        backgroundColor: "var(--color-surface-hover)",
        display: "flex",
      },
      title: {
        color: "white",
      },
      description: {
        color: "var(--color-text)",
        fontSize: "12px",
      },
      closeButton: {
        color: "var(--color-text)",
        "&:hover": {
          background: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  });
};
