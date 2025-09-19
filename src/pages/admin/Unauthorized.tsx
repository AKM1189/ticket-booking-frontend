import { routes } from "@/routes";
import { Button } from "@mantine/core";
import { NavLink, useNavigate } from "react-router";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-background flex items-center justify-center">
      <div className="text-text text-center">
        <h1 className="text-3xl text-primary font-bold mb-2">
          401 Unauthorized
        </h1>
        <p className="text-sm text-muted mb-5">
          You are not authorized to access this page.
        </p>
        <Button
          className="dashboard-btn"
          onClick={() => navigate(routes.user.home)}
        >
          Return Home
        </Button>
        {/* <p>
          Go To <NavLink to={routes.auth.login}>Login Page</NavLink>
        </p> */}
      </div>
    </div>
  );
};

export default Unauthorized;
