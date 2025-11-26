import { useThemeStore } from "@/store/userThemeStore";
import { Theme } from "@/types/ThemeType";
import { Switch } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) setTheme(value == Theme.dark ? Theme.light : Theme.dark);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Persist choice
  }, [theme]);

  return (
    <div className="cursor-pointer">
      <Switch
        size="sm"
        color="var(--color-surface-hover)"
        onLabel={
          <IconSun
            size={16}
            stroke={2.5}
            color="var(--mantine-color-yellow-4)"
          />
        }
        value={theme}
        defaultChecked={theme === Theme.dark}
        className="!cursor-pointer"
        offLabel={
          <IconMoonStars
            size={16}
            stroke={2.5}
            color="var(--mantine-color-blue-6)"
          />
        }
        onChange={handleThemeChange}
      />
    </div>
  );
};

export default ThemeToggle;
