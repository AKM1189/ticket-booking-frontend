import { routes } from "@/routes";
import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to={routes.auth.login} replace />;
  }

  if (!allowedRoles?.includes(user?.role)) {
    return <Navigate to={routes.admin.unauthorized} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
