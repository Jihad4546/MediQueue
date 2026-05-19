"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";


const ThemeTogol = () => {
    const { theme, setTheme } = useTheme();
    const icon = {
        darkMode: {
            off: Moon,
            on: Sun,
            selectedControlClass: "",
        },
    }
    return (
        <div className="flex gap-3">
            {Object.entries(icon).map(([key, value]) => (
                <Switch
                    onChange={() => setTheme(theme === 'dark' ? "light" : 'dark')}

                    key={key} defaultSelected size="lg">
                    {({ isSelected }) => (
                        <>
                            <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                                <Switch.Thumb>
                                    <Switch.Icon>
                                        {isSelected ? (
                                            <value.on className="size-3 text-inherit opacity-100" />
                                        ) : (
                                            <value.off className="size-3 text-inherit opacity-70" />
                                        )}
                                    </Switch.Icon>
                                </Switch.Thumb>
                            </Switch.Control>
                        </>
                    )}
                </Switch>
            ))}
        </div>

    );
};

export default ThemeTogol;