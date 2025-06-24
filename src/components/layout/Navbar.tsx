import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { navbarMenus } from "../../constants/layoutConstants";
import { twMerge } from "tailwind-merge";
import { routes } from "../../routes";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    for (let menu of navbarMenus) {
      if (location?.pathname === menu?.path) {
        setActiveMenu(menu?.label);
        return;
      }
      setActiveMenu(null);
    }
  }, [location.pathname]);

  return (
    <div className="navbar w-full h-[80px] bg-surface/70 z-10 text-text flex items-center justify-between px-10">
      <div className="text-base font-semibold uppercase">Logo</div>
      <ul className="flex items-center justify-start gap-10 text-base font-semibold z-10">
        {navbarMenus.map((menu) => (
          <NavLink to={menu.path} key={menu.label}>
            <li
              className={twMerge(
                "border-b-2 border-transparent py-7 px-3 transition-300 hover:text-accent",
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
        <div className="">Login</div>
      </NavLink>
    </div>
  );
};

export default Navbar;
