import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "@/routes";
import { AdminPanel } from "@/pages";
import { setNavigate } from "@/services/navigateService";
import { useEffect } from "react";

const AdminRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return (
    <Routes>
      <Route path={routes.admin.home} element={<AdminPanel />} />
      <Route path={routes.admin.dashboard} element={<AdminPanel />} />
    </Routes>
  );
};

export default AdminRoutes;
