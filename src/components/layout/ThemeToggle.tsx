import { Switch } from "@mantine/core"
import { IconMoonStars, IconSun } from "@tabler/icons-react"
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value) setMode(value == "dark" ? "light" : "dark");
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", mode);
        localStorage.setItem("theme", mode); // Persist choice
    }, [mode]);

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
                value={mode}
                defaultChecked={mode === "dark"}
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
    )
}

export default ThemeToggle