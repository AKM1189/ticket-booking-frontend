import { Route, Routes } from "react-router";
import { routes } from "../routes";
import { useGetUser } from "../api/query/authQuery";
import { Login, Signup, ForgotPassword, OTP, ResetPassword } from "@/pages";

const AuthRoutes = () => {
  const { data } = useGetUser();
  console.log("data", data);
  return (
    <div>
      {/* <Routes> */}
      <Route path={`/${routes.auth.login}`}></Route>
      {/* // </Routes> */}
    </div>
  );
};

export default AuthRoutes;
