import { permissionList } from "@/constants/permissons";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/AuthType";

export const usePermisson = () => {
  const { user } = useAuthStore();

  const {
    readMovie,
    readSchedule,
    readGenre,
    readTheatre,
    readScreen,
    readCast,
    readUser,
    createBooking,
    cancelBooking,
    readBooking,
  } = permissionList;

  const staffPermissions = [
    readMovie,
    readSchedule,
    readGenre,
    readTheatre,
    readScreen,
    readCast,
    readUser,
    createBooking,
    cancelBooking,
    readBooking,
  ];
  const hasAccess = (permission: string) => {
    if (user?.role === Role.admin) return true;
    if (user?.role === Role.staff && staffPermissions.length > 0) {
      return staffPermissions.includes(permission);
    }
    return false;
  };

  return { hasAccess };
};
