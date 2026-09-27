"use client";

import { gsap } from "gsap";
import { useRef } from "react";

/**
 * A social icon that leans toward the cursor (magnetic) and lights up with a
 * cyan glow on hover. Driven by gsap.quickTo writing the transform directly,
 * so it never re-renders React. GSAP is already on every page; this keeps
 * framer-motion out of the initial bundle.
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
    const tweens = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(
        null
    );

    function ensure(el: HTMLAnchorElement) {
        if (!tweens.current) {
            tweens.current = {
                x: gsap.quickTo(el, "x", {
                    duration: 0.35,
                    ease: "power3.out",
                }),
                y: gsap.quickTo(el, "y", {
                    duration: 0.35,
                    ease: "power3.out",
                }),
            };
        }
    }

    function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
        const el = ref.current;
        if (!el) return;
        ensure(el);
        const r = el.getBoundingClientRect();
        tweens.current?.x((e.clientX - (r.left + r.width / 2)) * 0.45);
        tweens.current?.y((e.clientY - (r.top + r.height / 2)) * 0.45);
    }
    function reset() {
        tweens.current?.x(0);
        tweens.current?.y(0);
    }

    return (
        <a
            ref={ref}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
            <span
                aria-hidden
                className="absolute inset-0 rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:bg-accent/10 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.28)] group-hover:ring-accent/30"
            />
            <span className="relative">{children}</span>
        </a>
    );
}
