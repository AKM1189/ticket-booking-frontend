import { Route, Routes } from "react-router";
import { routes } from "../routes";
import { useGetUser } from "../api/query/authQuery";
import { Login, Signup, ForgotPassword, OTP, ResetPassword } from "@/pages";

const AuthRoutes = () => {
  const { data } = useGetUser();
  console.log("data", data);
  return (
    <div>
      <Routes>
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.signup} element={<Signup />} />
        <Route path={routes.auth.forgotPassword} element={<ForgotPassword />} />
        <Route path={routes.auth.otp} element={<OTP />} />
        <Route path={routes.auth.resetPassword} element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
