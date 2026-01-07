"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: "light",
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    // Load initial theme from localStorage or system preference
    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme;

        if (stored) {
            setTheme(stored);
            document.documentElement.classList.toggle("dark", stored === "dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const defaultTheme = prefersDark ? "dark" : "light";
            setTheme(defaultTheme);
            document.documentElement.classList.toggle("dark", defaultTheme === "dark");
        }
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newTheme: Theme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeStore = () => useContext(ThemeContext);
