/**
 * Pure-CSS cinematic backdrop: drifting aurora blooms in the accent hue, a
 * masked structural grid, a horizon glow, film grain, and a vignette. Replaces
 * the old looping-video background — zero decode/bandwidth cost, no poster
 * flash on route change, and every layer is theme-aware through the token
 * variables so light mode gets the same composition at light intensity.
 */
export default function Backdrop() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-ink"
        >
            {/* Aurora fields */}
            <div className="absolute -top-[22%] -left-[14%] h-[62vw] w-[62vw] animate-drift rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_13%,transparent),transparent_62%)] blur-[10px]" />
            <div className="absolute top-[18%] -right-[18%] h-[58vw] w-[58vw] animate-drift-slow rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent-2)_11%,transparent),transparent_64%)] blur-[10px]" />
            <div className="absolute bottom-[-18%] left-[22%] h-[52vw] w-[52vw] animate-drift rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_66%)] blur-[10px]" />

            {/* Structural grid, faded toward the top third */}
            <div className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_88%_62%_at_50%_18%,#000_35%,transparent_100%)]" />

            {/* Horizon glow */}
            <div className="absolute inset-x-0 top-0 h-[46vh] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_72%)]" />

            {/* Film grain */}
            <div className="grain-overlay absolute inset-0 opacity-[0.05] mix-blend-soft-light" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_50%,transparent_38%,rgba(var(--ink-rgb),0.5)_100%)]" />
        </div>
    );
}
