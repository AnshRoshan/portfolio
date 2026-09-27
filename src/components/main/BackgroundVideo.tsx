/**
 * Cinematic looping video backdrop, fixed behind all content, on the ink base
 * (#0a0a0b) with a dark scrim (for text contrast), a side vignette, and a
 * film-grain veil. One clip site-wide: consistent identity, no remount flash
 * between routes, and only ~135 KB of VP9 WebM over the wire. WebM is listed
 * first; the mp4 is the fallback for browsers without VP9-in-WebM support.
 * Server component — nothing here is interactive.
 */
export default function BackgroundVideo() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-ink"
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/hero-bg-poster.webp"
                className="h-full w-full bg-video object-cover"
            >
                <source src="/hero-bg.webm" type="video/webm" />
                <source src="/hero-bg.mp4" type="video/mp4" />
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
            {/* Film grain */}
            <div className="grain-overlay absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
        </div>
    );
}
