/**
 * Minimal, expensive-reading backdrop: a flat blue-tinted ink field with one
 * barely-there horizon glow at the top edge. The experimental alternative to
 * the video backdrop — zero decode, zero bandwidth, best LCP. Swap
 * SiteChrome's <Backdrop /> for <BackgroundVideo /> to bring the video back.
 */
export default function Backdrop() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-20 bg-ink"
        >
            {/* Horizon: a single whisper of accent light at the top edge */}
            <div className="absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(ellipse_70%_100%_at_50%_-20%,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_70%)]" />
        </div>
    );
}
