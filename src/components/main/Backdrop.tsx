/**
 * Minimal, expensive-reading backdrop: a flat blue-tinted ink field with a
 * barely-there horizon glow at the top edge and a cooler bloom low on the
 * right. Both blooms are accent-tinted, so in light mode the page still
 * carries the brand colour instead of reading as a flat grey slab. The
 * experimental alternative to the video backdrop — zero decode, zero
 * bandwidth, best LCP. Swap SiteChrome's <Backdrop /> for
 * <BackgroundVideo /> to bring the video back.
 */
export default function Backdrop() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-20 bg-ink"
        >
            {/* Horizon: a single whisper of accent light at the top edge */}
            <div className="absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(ellipse_70%_100%_at_50%_-20%,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_70%)]" />
            {/* Low bloom, right of centre. Doubles as a tint on the light
                theme, where nothing else would break up the ground. Sized so
                the gradient reaches transparent before the element's own box
                edge — otherwise the box clips it and leaves a visible seam. */}
            <div className="absolute right-[-8%] bottom-[-10%] h-[70vh] w-[70vw] bg-[radial-gradient(58%_58%_at_58%_58%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)] blur-3xl" />
        </div>
    );
}
