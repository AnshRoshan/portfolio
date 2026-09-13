"use client";

import { usePathname } from "next/navigation";

/**
 * Cinematic looping video backdrop, fixed behind all content, on the ink base
 * (#0a0a0b) with a dark scrim (for text contrast), a side vignette, and a
 * film-grain veil. Per-route: the About page uses the abstract "vex" clip;
 * every other page uses the "space" voyage. WebM (VP9) is listed first for
 * bandwidth; the browser falls back to mp4 only where one is provided.
 */
const SOURCES = {
    // cosmic space voyage
    space: {
        webm: "/hero-bg.webm",
        mp4: "/hero-bg.mp4",
        poster: "/hero-bg-poster.webp",
    },
    // dark abstract (About page)
    vex: { webm: "/bg-vex.webm", poster: "/bg-vex-poster.webp" },
} as const;

function variantFor(pathname: string | null): keyof typeof SOURCES {
    return pathname?.startsWith("/about") ? "vex" : "space";
}

export default function BackgroundVideo() {
    const pathname = usePathname();
    const variant = variantFor(pathname);
    const src = SOURCES[variant];

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-ink"
        >
            {/* key forces a remount so the source swaps when the route changes */}
            <video
                key={variant}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={src.poster}
                className="bg-video h-full w-full object-cover"
            >
                <source src={src.webm} type="video/webm" />
                {"mp4" in src ? (
                    <source src={src.mp4} type="video/mp4" />
                ) : null}
            </video>

            {/* Readability scrim: darker top/bottom, lighter middle */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/65 to-ink/95" />
            {/* Side vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(120% 80% at 50% 35%, transparent 45%, rgba(var(--ink-rgb),0.65) 100%)",
                }}
            />
            {/* Film grain */}
            <div className="grain-overlay absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
        </div>
    );
}
