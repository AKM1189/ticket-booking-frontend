import { getCurrentUser } from "@/api/function/authApi";
import { ForgotPassword, Login, OTP, ResetPassword, Signup } from "@/pages";
import Unauthorized from "@/pages/admin/Unauthorized";
import AuthLayout from "@/pages/auth/AuthLayout";
import { routes } from "@/routes";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/AuthType";
import { useCallback, useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedAuthRoutes />}>
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

const ProtectedAuthRoutes = () => {
  //   const { user, setUser } = useAuthStore();
  //   const getUser = useCallback(async () => {
  //     const data = await getCurrentUser();
  //     setUser(data);
  //     console.log("user...", data);
  //   }, [user]);

  //   useEffect(() => {
  //     getUser();
  //   }, []);

  //   if (!user) {
  //     return <Outlet />;
  //   } else {
  //     return user?.role === Role.admin ? (
  //       <Navigate to={routes.admin.dashboard} replace />
  //     ) : (
  //       <Navigate to={routes.user.home} replace />
  //     );
  //   }
  return <Outlet />;
};
