"use client";

import { useEffect, useRef } from "react";

/**
 * A soft accent glow that trails the pointer, plus a tight ring cursor that
 * grows over interactive elements. Decorative only: skipped for touch input
 * and when the OS asks for reduced motion.
 */
export default function CursorGlow() {
    const ref = useRef<HTMLDivElement | null>(null);
    const ringRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        const ring = ringRef.current;
        if (!el || !ring) return;
        if (window.matchMedia("(hover: none)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        let raf = 0;
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let rx = x;
        let ry = y;
        let tx = x;
        let ty = y;

        const onMove = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            el.style.opacity = "1";
            ring.style.opacity = "1";
        };
        const onLeave = () => {
            el.style.opacity = "0";
            ring.style.opacity = "0";
        };
        /* Grow + tint the ring whenever the pointer is over something clickable */
        const INTERACTIVE =
            'a,button,input,textarea,select,label,[role="button"]';
        let target = 1;
        let scale = 1;
        const onOver = (e: PointerEvent) => {
            const hit =
                e.target instanceof Element && e.target.closest(INTERACTIVE);
            target = hit ? 2.4 : 1;
            ring.dataset.active = hit ? "1" : "0";
        };

        const loop = () => {
            x += (tx - x) * 0.08;
            y += (ty - y) * 0.08;
            rx += (tx - rx) * 0.35;
            ry += (ty - ry) * 0.35;
            scale += (target - scale) * 0.22;
            el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
            ring.style.transform = `translate3d(${rx - 9}px, ${ry - 9}px, 0) scale(${scale})`;
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onOver, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerover", onOver);
            document.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
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
            <div
                ref={ringRef}
                aria-hidden
                data-active="0"
                className="pointer-events-none fixed top-0 left-0 z-[70] h-[18px] w-[18px] rounded-full border border-accent/70 opacity-0 transition-[background-color,border-color,opacity] duration-200 data-[active=1]:border-accent/90 data-[active=1]:bg-accent/15"
            />
        </>
    );
}
