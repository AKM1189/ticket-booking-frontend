import { Route, Routes } from "react-router-dom";
import { routes } from "@/routes";
import { AdminPanel } from "@/pages";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path={routes.admin.home} element={<AdminPanel />} />
      <Route path={routes.admin.dashboard} element={<AdminPanel />} />
    </Routes>
  );
};

export default AdminRoutes;
