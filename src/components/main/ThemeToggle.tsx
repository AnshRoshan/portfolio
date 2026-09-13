"use client";

import { IconMoonStars, IconSunHigh } from "@tabler/icons-react";
import { useEffect, useState } from "react";

/**
 * Light/dark switch. Toggles the `dark` class on <html> and persists to
 * localStorage ("portfolio-theme") — the same contract as the pre-paint
 * script in app/layout.tsx. Renders a neutral placeholder until mounted so
 * server and client markup agree.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
        setMounted(true);
    }, []);

    function toggle() {
        const next = !isDark;
        document.documentElement.classList.toggle("dark", next);
        try {
            localStorage.setItem("portfolio-theme", next ? "dark" : "light");
        } catch {
            /* private mode: theme just won't persist */
        }
        setIsDark(next);
    }

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={
                mounted
                    ? isDark
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    : "Toggle color theme"
            }
            title={mounted ? (isDark ? "Light mode" : "Dark mode") : "Theme"}
            className={
                "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-fill text-muted backdrop-blur-xl transition-colors duration-200 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink " +
                className
            }
        >
            {mounted ? (
                isDark ? (
                    <IconSunHigh size={18} stroke={1.6} />
                ) : (
                    <IconMoonStars size={18} stroke={1.6} />
                )
            ) : (
                <span className="h-[18px] w-[18px]" aria-hidden />
            )}
        </button>
    );
}
