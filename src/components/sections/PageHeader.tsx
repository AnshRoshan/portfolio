import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import Reveal from "@/components/sub/Reveal";
import { cn } from "@/lib/utils";

/**
 * Shared page opening: grid-line wash, optional breadcrumbs, hairline eyebrow,
 * display title, lede, and an optional meta strip. Used by /about, /projects,
 * /contact so every page enters with the same beat.
 */
export default function PageHeader({
    eyebrow,
    title,
    description,
    crumbs,
    meta,
    className,
}: {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    crumbs?: { label: string; href?: string }[];
    meta?: { label: string; value: string }[];
    className?: string;
}) {
    return (
        <header
            className={cn(
                "relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14",
                className
            )}
        >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_20%_0%,#000,transparent)]" />
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 animate-drift rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_66%)] blur-2xl"
            />

            <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
                {crumbs && (
                    <Reveal y={14}>
                        <nav
                            aria-label="Breadcrumb"
                            className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[10.5px] text-muted uppercase tracking-[0.16em]"
                        >
                            {crumbs.map((c, i) => (
                                <span
                                    key={c.label}
                                    className="flex items-center gap-2"
                                >
                                    {c.href ? (
                                        <Link
                                            href={c.href}
                                            className="transition-colors hover:text-accent"
                                        >
                                            {c.label}
                                        </Link>
                                    ) : (
                                        <span className="text-paper">
                                            {c.label}
                                        </span>
                                    )}
                                    {i < crumbs.length - 1 && (
                                        <IconChevronRight
                                            size={12}
                                            stroke={1.8}
                                            className="text-muted/50"
                                        />
                                    )}
                                </span>
                            ))}
                        </nav>
                    </Reveal>
                )}

                <div className="flex max-w-3xl flex-col gap-6">
                    <Reveal y={14}>
                        <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                            <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
                            {eyebrow}
                        </span>
                    </Reveal>

                    <Reveal y={20} delay={0.08} fade={false}>
                        <h1 className="font-display font-semibold text-4xl text-paper leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            {title}
                        </h1>
                    </Reveal>

                    {description && (
                        <Reveal y={16} delay={0.16}>
                            <p className="max-w-[56ch] text-base text-muted leading-relaxed sm:text-lg">
                                {description}
                            </p>
                        </Reveal>
                    )}
                </div>

                {meta && (
                    <Reveal
                        y={16}
                        delay={0.24}
                        className="mt-10 grid grid-cols-2 gap-6 border-line border-t pt-8 sm:grid-cols-4"
                    >
                        {meta.map((m) => (
                            <div
                                key={m.label}
                                className="flex flex-col gap-1.5"
                            >
                                <span className="font-mono text-[10px] text-muted uppercase tracking-[0.18em]">
                                    {m.label}
                                </span>
                                <span className="font-display font-medium text-[15px] text-paper">
                                    {m.value}
                                </span>
                            </div>
                        ))}
                    </Reveal>
                )}
            </div>
        </header>
    );
}
