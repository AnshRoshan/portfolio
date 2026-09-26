"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * A social icon that leans toward the cursor (magnetic) and lights up with a
 * cyan glow on hover. Position is driven by motion values + springs, never
 * React state, so it stays at 60fps and never re-renders the tree on move.
 */
export default function MagneticSocial({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, { stiffness: 300, damping: 18, mass: 0.4 });
    const y = useSpring(my, { stiffness: 300, damping: 18, mass: 0.4 });

    function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) * 0.45);
        my.set((e.clientY - (r.top + r.height / 2)) * 0.45);
    }
    function reset() {
        mx.set(0);
        my.set(0);
    }

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            onMouseMove={onMove}
            onMouseLeave={reset}
            style={{ x, y }}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
            <span
                aria-hidden
                className="absolute inset-0 rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:bg-accent/10 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.28)] group-hover:ring-accent/30"
            />
            <span className="relative">{children}</span>
        </motion.a>
    );
}
