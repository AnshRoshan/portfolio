"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Thin mint scroll-progress bar pinned to the top of the viewport. Scrubs its
 * scaleX from 0 to 1 across full page scroll. This is positional feedback (not
 * decorative motion), so it runs regardless of reduced-motion preference.
 * Rendered once in the root layout.
 */
export default function ScrollProgress() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;
            gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
            const st = ScrollTrigger.create({
                start: 0,
                end: "max",
                onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
            });
            return () => st.kill();
        },
        { scope: ref },
    );

    return (
        <div
            ref={ref}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[60] h-0.5 w-full bg-accent"
        />
    );
}
