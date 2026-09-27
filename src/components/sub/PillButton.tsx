import Link from "next/link";
import { cn } from "@/lib/utils";
import ZigzagBorder from "./ZigzagBorder";

/**
 * Pill-button system. `primary` = solid mint; `ghost` = hairline outline;
 * `electric` = a conic gradient spins around the border behind a dark inner
 * pill (hero CTA). `sweep` adds a left→right mint shine on hover (ghost/primary).
 */
export default function PillButton({
    href,
    children,
    variant = "primary",
    external = false,
    sweep = false,
    className,
}: {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "ghost" | "electric";
    external?: boolean;
    sweep?: boolean;
    className?: string;
}) {
    // ── Electric: jagged rainbow zigzag outline + a filled pill ─────────────
    // The fill comes from the `.electric-pill` token pair, not `bg-ink`: on
    // light paper an ink-filled pill is a near-white hole with a rainbow
    // outline around it, which reads as a broken button. Light mode fills
    // with the accent; dark mode keeps the near-black pill.
    if (variant === "electric") {
        const cls = cn(
            "electric-pill group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-medium uppercase tracking-[0.12em] transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
            className
        );
        const inner = (
            <>
                <ZigzagBorder />
                <span
                    aria-hidden
                    className="btn-glare pointer-events-none absolute inset-y-0 left-0 z-[1] w-[45%] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-md"
                />
                <span className="electric-label relative z-10 inline-flex items-center gap-2">
                    {children}
                </span>
            </>
        );
        return external ? (
            <a href={href} target="_blank" rel="noreferrer" className={cls}>
                {inner}
            </a>
        ) : (
            <Link href={href} className={cls}>
                {inner}
            </Link>
        );
    }

    // ── Primary / ghost ─────────────────────────────────────────────────────
    const base =
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
    const variants = {
        primary:
            "bg-accent text-ink hover:bg-accent-2 shadow-[0_8px_30px_rgba(34,211,238,0.25)]",
        ghost: "border border-line-2 text-paper hover:bg-fill hover:border-line-2",
    } as const;
    const cls = cn(
        base,
        variants[variant],
        sweep && "overflow-hidden",
        className
    );

    const inner = (
        <>
            {sweep ? (
                <span
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-[-60%] h-full w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-md transition-all duration-[1600ms] ease-in-out group-hover:left-[120%]"
                />
            ) : null}
            <span className="relative z-10 inline-flex items-center gap-2">
                {children}
            </span>
        </>
    );

    if (external) {
        return (
            <a href={href} target="_blank" rel="noreferrer" className={cls}>
                {inner}
            </a>
        );
    }
    return (
        <Link href={href} className={cls}>
            {inner}
        </Link>
    );
}
