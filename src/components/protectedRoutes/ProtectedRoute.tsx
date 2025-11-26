import { useGetUser } from "@/api/query/authQuery";
import { routes } from "@/routes";
import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ allowedRoles }) => {
  const { data: user, isLoading } = useGetUser();
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);
  if (isLoading) {
    return (
      <div>
        {/* <Login /> */}
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{
            radius: "sm",
            blur: 1,
            backgroundOpacity: 1,
            color: "var(--color-surface)",
          }}
          loaderProps={{
            color: "var(--color-blueGray)",
            type: "dots",
            size: "lg",
          }}
        />
      </div>
    );
  }
  if (!user) return <Navigate to={routes.auth.login} replace />;

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={routes.admin.unauthorized} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
