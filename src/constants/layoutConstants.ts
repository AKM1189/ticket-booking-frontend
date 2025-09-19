import { routes } from "../routes";

export const navbarMenus = [
  {
    label: "Home",
    path: routes.user.home,
  },
  {
    label: "Movies",
    path: routes.user.movies + "/sortBy/now-showing",
  },
  {
    label: "About us",
    path: routes.user.about,
  },
  {
    label: "Contact",
    path: routes.user.contact,
  },
  {
    label: "Admin Demo",
    path: routes.admin.demo,
  },
];
