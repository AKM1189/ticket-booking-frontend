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
    autoClose: 3000,
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
        top: "70px",
        position: "relative",
        backgroundColor: "var(--color-search-bg)",
        display: "flex",
      },
      title: {
        color: "var(--color-text)",
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
