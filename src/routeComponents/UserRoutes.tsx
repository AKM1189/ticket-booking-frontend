import { Route, Routes } from "react-router-dom";
import UserLayout from "@/components/layout/UserLayout";
import { routes } from "@/routes";
import { Home, About, Movies } from "@/pages";
import MovieDetail from "@/pages/user/MovieDetail";
import TicketPlan from "@/pages/user/TicketPlan";
import SeatPlan from "@/pages/user/SeatPlan";
import Contact from "@/pages/user/Contact";
import Checkout from "@/pages/user/Checkout";
import AdminAccessDemo from "@/components/AdminAccessDemo";
import ProtectedRoute from "@/components/protectedRoutes/ProtectedRoute";
import { Role } from "@/types/AuthType";

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
          element={<ProtectedRoute allowedRoles={[Role.user, Role.admin]} />}
        >
          <Route path={routes.user.ticketPlan} element={<TicketPlan />} />
          <Route path={routes.user.seatPlan + "/:id"} element={<SeatPlan />} />
          <Route path={routes.user.checkout + "/:id"} element={<Checkout />} />
          <Route path={routes.admin.demo} element={<AdminAccessDemo />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
