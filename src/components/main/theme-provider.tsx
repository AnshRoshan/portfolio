"use client";

import { MotionConfig } from "framer-motion";

/**
 * Theming is a tiny inline script in app/layout.tsx (reads localStorage
 * "portfolio-theme", defaults dark, toggles the `dark` class on <html>
 * before first paint) + the ThemeToggle component. next-themes was tried and
 * removed: its injected pre-hydration script misbehaves under Turbopack +
 * React 19 in this repo (hydration mismatch), so we do the 10-line version
 * ourselves. MotionConfig reducedMotion="never" forces every framer-motion
 * animation to run regardless of the OS reduced-motion setting — a deliberate
 * owner choice so the motion is always visible; the GSAP layer is un-gated to
 * match (see Reveal / SplitReveal / Parallax / Marquee).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
