"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * GSAP scroll-reveal. Drop-in replacement for the framer-motion FadeIn:
 * same props (x, y, delay, className). The element fades + slides in once as it
 * enters the viewport. Motion runs regardless of the OS reduced-motion setting
 * (deliberate: the owner wants the motion visible on this portfolio).
 * useGSAP handles cleanup on unmount.
 */
export default function Reveal({
    children,
    x = 0,
    y = 32,
    delay = 0,
    className,
    start = "top 90%",
    fade = true,
}: {
    children: React.ReactNode;
    x?: number;
    y?: number;
    delay?: number;
    className?: string;
    start?: string;
    /**
     * When false, the element keeps full opacity and only slides in. Use for
     * above-the-fold LCP elements so they paint immediately instead of being
     * hidden (opacity:0) until GSAP runs.
     */
    fade?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;
            gsap.from(el, {
                ...(fade ? { opacity: 0 } : {}),
                x,
                y,
                duration: 0.9,
                delay,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start, once: true },
            });
        },
        { scope: ref }
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
