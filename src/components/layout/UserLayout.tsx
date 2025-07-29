import { Outlet, useLocation } from "react-router";

import { Navbar, Footer } from "@/components/layout";
import { useEffect } from "react";
import { useWindowScroll } from "@mantine/hooks";
import { UpArrowIcon } from "@/assets/svgs";
import { useGetUser } from "@/api/query/authQuery";

const UserLayout = () => {
  const location = useLocation();
  const [scroll, scrollTo] = useWindowScroll();

  const { data } = useGetUser();
  // const { setUser } = useAuthStore();

  useEffect(() => {
    if (data) {
      console.log("user", data);
      // setUser(data);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen h-full min-w-screen bg-background">
      <Navbar />
      <div className="text-text max-w-[2000px] m-auto">
        <Outlet />
      </div>
      <Footer />
      {scroll.y > 100 && (
        <div
          className="fixed bottom-10 right-5 z-[99999] cursor-pointer"
          onClick={() => scrollTo({ y: 0 })}
        >
          <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full z-[-10]"></div>
          <UpArrowIcon color="var(--color-primary)" />
        </div>
      )}
    </div>
  );
};

export default UserLayout;
