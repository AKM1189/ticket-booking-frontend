import { useGetUser } from "@/api/query/authQuery";
import { ForgotPassword, Login, OTP, ResetPassword, Signup } from "@/pages";
import Unauthorized from "@/pages/admin/Unauthorized";
import AuthLayout from "@/pages/auth/AuthLayout";
import { routes } from "@/routes";
import { Role } from "@/types/AuthType";
import { LoadingOverlay } from "@mantine/core";
import { Navigate, Outlet, Route, Routes } from "react-router";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<AuthLayout />}>
          <Route path={routes.auth.login} element={<Login />} />
          <Route path={routes.auth.signup} element={<Signup />} />
          <Route
            path={routes.auth.forgotPassword}
            element={<ForgotPassword />}
          />
          <Route path={routes.auth.otp} element={<OTP />} />
          <Route path={routes.auth.resetPassword} element={<ResetPassword />} />
        </Route>
      </Route>
      <Route path={routes.admin.unauthorized} element={<Unauthorized />} />
    </Routes>
  );
};

export default AuthRoutes;

const PublicRoute = () => {
  const { data: user, isLoading } = useGetUser();
  console.log("user", user);
  if (isLoading)
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

  // If already logged in → redirect to correct dashboard
  if (user?.role === Role.admin || user?.role === Role.staff)
    return <Navigate to={routes.admin.dashboard} replace />;
  if (user?.role === Role.user)
    return <Navigate to={routes.user.home} replace />;
  return <Outlet />;
};
