import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="h-ful- min-w-screen bg-background">
      <div className="text-text max-w-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
