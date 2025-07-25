import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { navbarMenus } from "../../constants/layoutConstants";
import { twMerge } from "tailwind-merge";
import { routes } from "../../routes";
import { Button } from "@mantine/core";
import { CloseIcon, ListIcon } from "@/assets/svgs";
import { AnimatePresence, motion } from "motion/react";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount just in case
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavOpen]);

  useEffect(() => {
    setIsNavOpen(false);

    for (let menu of navbarMenus) {
      console.log("location", location?.pathname, "menu", menu?.path);
      if (
        location?.pathname === routes.user.home ||
        location?.pathname === "/" + menu?.path
      ) {
        setActiveMenu(menu?.label);
        return;
      }
      // else if () {
      //   setActiveMenu(menu?.label);
      //   return;
      // }
      console.log("location changed");
    }
    setActiveMenu(null);
  }, [location.pathname]);

  return (
    <div className="relative navbar w-full h-[80px] bg-surface-hover/70 z-10 text-text flex items-center justify-between px-10">
      <div className="text-base font-semibold uppercase">Logo</div>
      <ul className="max-md:hidden flex items-center justify-center gap-10 text-base font-semibold z-10">
        {navbarMenus.map((menu) => (
          <NavLink to={menu.path} key={menu.label}>
            <li
              className={twMerge(
                "border-b-2 border-transparent py-3 px-3 transition-300 hover:text-accent max-md:text-xl",
                menu?.label === activeMenu && "text-accent",
              )}
            >
              {menu.label}
            </li>
          </NavLink>
        ))}
      </ul>
      <NavLink
        className="max-md:hidden text-base font-semibold uppercase"
        to={routes.auth.login}
      >
        <Button className="px-10 !rounded-full">Login</Button>
      </NavLink>

      <div
        className="md:hidden absolute top-6 right-10 cursor-pointer"
        onClick={() => setIsNavOpen(true)}
      >
        <ListIcon size={30} />
      </div>

      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-background/90 flex flex-col items-center justify-center gap-20 md:hidden"
          >
            <ul className="flex flex-col items-center justify-center gap-10 text-base font-semibold z-10">
              {navbarMenus.map((menu) => (
                <NavLink to={menu.path} key={menu.label}>
                  <li
                    className={twMerge(
                      "border-b-2 border-transparent py-3 px-3 transition-300 hover:text-accent text-lg",
                      menu?.label === activeMenu && "text-accent",
                    )}
                  >
                    {menu.label}
                  </li>
                </NavLink>
              ))}
            </ul>

            <NavLink
              className="text-base font-semibold uppercase"
              to={routes.auth.login}
            >
              <Button className="!px-20 !rounded-full text-lg">Login</Button>
            </NavLink>

            <div
              className="absolute top-14 right-14 cursor-pointer"
              onClick={() => setIsNavOpen(false)}
            >
              <CloseIcon size={30} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
