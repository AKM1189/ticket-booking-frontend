import { useGetUser } from "@/api/query/authQuery";
import { routes } from "@/routes";
import { Role } from "@/types/AuthType";
import { Navigate, useNavigate } from "react-router";

// export const useAuth = () => {
//   const { data: user } = useGetUser();
//   const navigate = useNavigate();

//   const navigateUser = () => {

//     if (user) {
//       user?.role === Role.admin && navigate(routes.admin.dashboard);
//     } else navigate(routes.user.home);
//   };

//   return { navigateUser };
// };

export const useLoginAuth = () => {
  const { data: user } = useGetUser();

  const navigateUser = () => {
    if (user?.role === "admin")
      return <Navigate to={routes.admin.dashboard} replace />;
    if (user?.role === "user")
      return <Navigate to={routes.user.home} replace />;
  };

  return { navigateUser };
};
