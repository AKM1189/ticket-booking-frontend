import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { navbarMenus } from "../../constants/layoutConstants";
import { twMerge } from "tailwind-merge";
import { routes } from "../../routes";
import {
  Avatar,
  Button,
  Drawer,
  Popover,
  Text,
  TextInput,
} from "@mantine/core";
import { CloseIcon, ListIcon } from "@/assets/svgs";
import { AnimatePresence, motion } from "motion/react";
import { useAuthStore } from "@/store/authStore";
import {
  IconLogout,
  IconLogin2,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { useLogoutMutation } from "@/api/mutation/authMutation";
import { Role, type AuthType } from "@/types/AuthType";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { profileSchema } from "@/schema/AuthSchema";
import { zodResolver } from "mantine-form-zod-resolver";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { user } = useAuthStore();

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
      <div className="max-md:hidden">
        <Logout user={user} />
      </div>

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

            <Logout user={user} />

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

export const Logout = ({ user }: { user: AuthType | null }) => {
  const { mutate: logout } = useLogoutMutation();
  const [opened, { open, close }] = useDisclosure(false);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [enableUpdate, setEnableUpdate] = useState(false);
  const handleLogout = () => {
    logout();
  };
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: user?.name,
      email: user?.email,
    },
    validate: zodResolver(profileSchema),
  });

  return (
    <div>
      {user?.role === Role.user ? (
        // <div className="flex items-center gap-1" onClick={handleLogout}>
        <div>
          <Popover
            width={180}
            position="bottom"
            opened={popoverOpened}
            onChange={setPopoverOpened}
          >
            <Popover.Target>
              <div
                className="flex items-center gap-1 cursor-pointer select-none"
                onClick={() => setPopoverOpened((o) => !o)}
              >
                <Avatar radius="xl" />
                {/* <IconUserCircle /> */}
                <Text className="max-w-[120px] truncate">{user?.name}</Text>
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Text
                size="sm"
                className="cursor-pointer"
                p="xs"
                onClick={() => {
                  open();
                  setPopoverOpened(false);
                }}
              >
                Profile
              </Text>
              <Text
                size="sm"
                p="xs"
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </Text>
            </Popover.Dropdown>
          </Popover>
          <Drawer
            opened={opened}
            position="right"
            onClose={close}
            title="Profile"
            classNames={{
              header: "!bg-surface !text-text",
              title: "!font-bold !text-xl",
              content: "!bg-surface !text-text",
            }}
          >
            <form
              onSubmit={form.onSubmit((values) =>
                console.log("values", values),
              )}
              className="flex flex-col gap-5"
            >
              <TextInput
                label="Name"
                placeholder="Your Name"
                key={form.key("name")}
                {...form.getInputProps("name")}
                disabled={!enableUpdate}
                classNames={{
                  root: "mt-5",
                  label: "text-[16px]",
                  input: twMerge(
                    "login-input",
                    form.errors.name && "border-red-500",
                  ),
                  error: "text-red-500",
                }}
              />
              <TextInput
                label="Email"
                placeholder="Your Email"
                key={form.key("email")}
                {...form.getInputProps("email")}
                disabled={!enableUpdate}
                classNames={{
                  root: "mt-5",
                  label: "text-[16px]",
                  input: twMerge(
                    "login-input",
                    form.errors.email && "border-red-500",
                  ),
                  error: "text-red-500",
                }}
              />
              {!enableUpdate ? (
                <div>
                  <Button
                    type="button"
                    className="float-right dashboard-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setEnableUpdate(true);
                    }}
                  >
                    Update Profile
                  </Button>
                </div>
              ) : (
                <div>
                  <Button type="submit" className="float-right dashboard-btn">
                    Save
                  </Button>
                  <Button
                    className="float-right dashboard-btn me-5"
                    variant="outline"
                    onClick={() => {
                      setEnableUpdate(false);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>

            {/* Drawer content */}
          </Drawer>
        </div>
      ) : (
        //   <IconLogout size={20} />
        //   <Text>Logout</Text>
        // </div>
        <NavLink
          className="text-base flex gap-1 items-center font-semibold bg-surface-hover rounded-md p-2 px-3"
          to={routes.auth.login}
        >
          <IconLogin2 size={20} />
          <Text>Login</Text>
          {/* <Button leftSection={<IconLogin2 size={20} />}>Login</Button> */}
        </NavLink>
        // <div className="flex items-center gap-1 cursor-pointer" onClick={handleLogout}>
        //   <IconLogin2 size={20} />
        //   <Text>Logout</Text>
        // </div>
      )}
    </div>
  );
};
