import { Route, Routes } from "react-router-dom";
import UserLayout from "@/components/layout/UserLayout";
import { routes } from "@/routes";
import { Home, About, Movies } from "@/pages";
import MovieDetail from "@/pages/user/MovieDetail";
import TicketPlan from "@/pages/user/TicketPlan";
import SeatPlan from "@/pages/user/SeatPlan";
import { Login, Signup, ForgotPassword, OTP, ResetPassword } from "@/pages";
import AuthLayout from "@/pages/auth/AuthLayout";
import Contact from "@/pages/user/Contact";
import Checkout from "@/pages/user/Checkout";

const UserRoutes = () => {
  return (
    // <div>
    <Routes>
      <Route path={routes.user.home} element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.user.about} element={<About />} />
        <Route path={routes.user.contact} element={<Contact />} />
        <Route path={routes.user.movies}>
          <Route index element={<Movies />} />
          <Route path="sortBy/:type?" element={<Movies />} />
          <Route path=":id" element={<MovieDetail />} />
        </Route>
        <Route
          path={routes.user.ticketPlan + "/:id"}
          element={<TicketPlan />}
        />
        <Route path={routes.user.seatPlan + "/:id"} element={<SeatPlan />} />
        <Route path={routes.user.checkout + "/:id"} element={<Checkout />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.signup} element={<Signup />} />
        <Route path={routes.auth.forgotPassword} element={<ForgotPassword />} />
        <Route path={routes.auth.otp} element={<OTP />} />
        <Route path={routes.auth.resetPassword} element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
