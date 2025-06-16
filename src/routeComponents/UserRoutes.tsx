import { Route, Routes } from "react-router";
import UserLayout from "@/components/layout/UserLayout";
import { routes } from "@/routes";
import { Home, About, Movies } from "@/pages";

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={routes.user.home} element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path={routes.user.about} element={<About />} />
          <Route path={routes.user.movies} element={<Movies />} />
        </Route>
      </Routes>
    </div>
  );
};

export default UserRoutes;
