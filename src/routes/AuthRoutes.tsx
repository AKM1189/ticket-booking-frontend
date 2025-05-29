import { Route, Routes } from "react-router";
import { routes } from "../routes";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.signup} element={<Signup />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
