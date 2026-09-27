"use client";

import { useEffect, useRef } from "react";

/**
 * A soft accent glow that trails the pointer. Decorative only: skipped for
 * touch input and when the OS asks for reduced motion.
 */
export default function CursorGlow() {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(hover: none)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        let raf = 0;
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let tx = x;
        let ty = y;

        const onMove = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            el.style.opacity = "1";
        };
        const onLeave = () => {
            el.style.opacity = "0";
        };

        const loop = () => {
            x += (tx - x) * 0.08;
            y += (ty - y) * 0.08;
            el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden
            className="mix-blend-[var(--cursor-blend)] pointer-events-none fixed top-0 left-0 z-[5] h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-700"
            style={{
                background:
                    "radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent), color-mix(in srgb, var(--accent-2) 7%, transparent) 42%, transparent 68%)",
                filter: "blur(24px)",
            }}
        />
    );
}
