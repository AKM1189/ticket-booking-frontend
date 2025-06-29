import { Route, Routes } from "react-router";
import UserLayout from "@/components/layout/UserLayout";
import { routes } from "@/routes";
import { Home, About, Movies } from "@/pages";
import MovieDetail from "@/pages/user/MovieDetail";
import TicketPlan from "@/pages/user/TicketPlan";
import SeatPlan from "@/pages/user/SeatPlan";

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={routes.user.home} element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path={routes.user.about} element={<About />} />
          <Route
            path={routes.user.movies + "/sortBy/:type?"}
            element={<Movies />}
          />
          <Route path={routes.user.movies + "/:id"} element={<MovieDetail />} />
          <Route
            path={routes.user.ticketPlan + "/:id"}
            element={<TicketPlan />}
          />
          <Route path={routes.user.seatPlan + "/:id"} element={<SeatPlan />} />
        </Route>
      </Routes>
    </div>
  );
};

export default UserRoutes;
