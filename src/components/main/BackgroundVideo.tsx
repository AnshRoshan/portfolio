"use client";

import { usePathname } from "next/navigation";

/**
 * Cinematic looping video backdrop, fixed behind all content, on the ink base
 * with a dark scrim and a side vignette for text contrast. Per-route: the
 * About page runs the abstract "vex" clip; every other page the "space"
 * voyage. WebM first; the mp4 is the fallback for browsers without
 * VP9-in-WebM support.
 */
const SOURCES = {
    space: {
        webm: "/hero-bg.webm",
        mp4: "/hero-bg.mp4",
        poster: "/hero-bg-poster.webp",
    },
    vex: {
        webm: "/bg-vex.webm",
        poster: "/bg-vex-poster.webp",
    },
} as const;

export default function BackgroundVideo() {
    const pathname = usePathname();
    const variant = pathname?.startsWith("/about") ? "vex" : "space";
    const src = SOURCES[variant];

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-ink"
        >
            {/* key forces a remount so the source swaps on route change */}
            <video
                key={variant}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={src.poster}
                className="h-full w-full bg-video object-cover"
            >
                <source src={src.webm} type="video/webm" />
                {"mp4" in src ? (
                    <source src={src.mp4} type="video/mp4" />
                ) : null}
            </video>

            {/* Readability scrim: strength is theme-aware via tokens so the
                backdrop stays clearly visible in both light and dark */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(var(--ink-rgb), var(--scrim-top)), rgba(var(--ink-rgb), var(--scrim-mid)), rgba(var(--ink-rgb), var(--scrim-bottom)))",
                }}
            />
            {/* Side vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(120% 80% at 50% 35%, transparent 45%, rgba(var(--ink-rgb), var(--vignette)) 100%)",
                }}
            />
        </div>
    );
}
