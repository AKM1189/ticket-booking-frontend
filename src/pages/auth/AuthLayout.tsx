import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen h-full min-w-screen bg-background">
      <div className="text-text max-w-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
