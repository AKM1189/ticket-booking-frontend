import { Outlet, useLocation } from "react-router";

import { Navbar, Footer } from "@/components/layout";
import { useEffect, useState } from "react";
import { useWindowScroll } from "@mantine/hooks";
import { IconChevronUp } from "@tabler/icons-react";
import { ThemeIcon } from "@mantine/core";
import { twMerge } from "tailwind-merge";

const UserLayout = () => {
  const location = useLocation();
  const [scroll, scrollTo] = useWindowScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen h-full min-w-screen bg-background">
      {!isScrolled && (
        <div className="absolute w-full z-10">
          <Navbar />
        </div>
      )}
      <div
        className={`max-md:hidden fixed top-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          isScrolled ? "translate-y-0 shadow-md" : "-translate-y-full"
        }`}
      >
        <Navbar />
      </div>
      <div className="pt-[80px]">
        <div className="text-text max-w-screen">
          <Outlet />
        </div>
        <Footer />
        {/* {scroll.y > 100 && ( */}
        <div
          className={twMerge(
            "fixed bottom-10 right-10 cursor-pointer transition-transform duration-300 ease-in-out",
            scroll.y > 300 ? "translate-y-0" : "translate-y-20",
          )}
          onClick={() => scrollTo({ y: 0 })}
        >
          <ThemeIcon radius={"xl"} size={"lg"} color={"var(--color-primary)"}>
            <IconChevronUp color="white" />
          </ThemeIcon>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default UserLayout;
