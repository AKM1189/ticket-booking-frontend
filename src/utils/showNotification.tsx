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
    autoClose: 5000,
    icon:
      type === StatusType.success ? (
        <IoCheckmarkCircleSharp className="icon text-green-500" size="2rem" />
      ) : (
        <IoIosCloseCircle className="icon text-red-500" size="2rem" />
      ),
    withCloseButton: true,
    position: "top-right",
    styles: {
      root: {
        position: "relative",
        backgroundColor: "var(--color-notification)",
      },
      title: {
        color: "white",
      },
      description: {
        color: "var(--color-text)",
      },
      body: {
        marginLeft: 30,
      },
      closeButton: {
        position: "absolute",
        top: 17,
        right: 10,
        color: "var(--color-text)",
        "&:hover": {
          background: "rgba(0, 0, 0, 0.1)",
        },
      },
      icon: {
        position: "absolute",
        top: 17,
        left: 10,
        width: "2.5rem",
        height: "2.5rem",
        fontSize: "1.5rem",
      },
    },
  });
};
