import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "@/routes";
import { AdminPanel } from "@/pages";
import { setNavigate } from "@/services/navigateService";
import { useEffect } from "react";
import ProtectedRoute from "@/components/protectedRoutes/ProtectedRoute";
import { Role } from "@/types/AuthType";

const AdminRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return (
    <Routes>
      <Route
        element={<ProtectedRoute allowedRoles={[Role.admin, Role.staff]} />}
      >
        <Route path={routes.admin.home} element={<AdminPanel />} />
        <Route path={routes.admin.dashboard} element={<AdminPanel />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
