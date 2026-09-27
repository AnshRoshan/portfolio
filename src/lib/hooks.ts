"use client";

import { useEffect, useRef, useState } from "react";

/** Pointer-following spotlight: sets --mx/--my for the .spotlight CSS. */
export function useSpotlight<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        };
        el.addEventListener("pointermove", onMove, { passive: true });
        return () => el.removeEventListener("pointermove", onMove);
    }, []);

    return ref;
}

/**
 * Subtle 3D tilt toward the pointer (max degrees), disabled for touch.
 * `rest` is appended to every frame so a card's resting angle survives the
 * first pointermove instead of snapping flat when the pointer touches it.
 */
export function useTilt<T extends HTMLElement>(max = 4, rest = "") {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(hover: none)").matches) return;

        const onMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            el.style.transform = `perspective(1100px) rotateX(${-py * max}deg) rotateY(${px * max}deg) ${rest}`;
        };
        const onLeave = () => {
            el.style.transform = `perspective(1100px) rotateX(0deg) rotateY(0deg) ${rest}`;
        };
        el.addEventListener("pointermove", onMove, { passive: true });
        el.addEventListener("pointerleave", onLeave);
        return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
            el.style.transform = "";
        };
    }, [max, rest]);

    return ref;
}

/** One-shot in-view detector for counters and staggered reveals. */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.35) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setInView(true);
            return;
        }
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return { ref, inView };
}
