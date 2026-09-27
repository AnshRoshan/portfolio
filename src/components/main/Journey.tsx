"use client";

import {
    IconBriefcase,
    IconChartArrowsVertical,
    IconCloudUpload,
    IconCode,
    IconRobot,
    IconSchool,
} from "@tabler/icons-react";
import { useState } from "react";
import Reveal from "@/components/sub/Reveal";
import { journey } from "@/data/journey";
import { cn } from "@/lib/utils";

const ICONS = {
    robot: IconRobot,
    code: IconCode,
    briefcase: IconBriefcase,
    cloud: IconCloudUpload,
    school: IconSchool,
} as const;

const COLLAPSED_COUNT = 3;

/**
 * Center-stem timeline with colored branches. Shows the three most recent
 * chapters; the rest unfold behind a "Show the full journey" button so the
 * page stays tight.
 */
export default function Journey({
    className = "max-w-6xl",
}: {
    /** Measure of the timeline. Wide pages pass a larger value so the column
     *  doesn't float in the middle of a 1400px container. */
    className?: string;
}) {
    const [expanded, setExpanded] = useState(false);
    const visible = expanded ? journey : journey.slice(0, COLLAPSED_COUNT);

    return (
        <div>
            <ol className={cn("relative mx-auto", className)}>
                {/* Central multi-colour stem (mobile-left, centered on desktop) */}
                <span
                    aria-hidden
                    className="absolute top-2 bottom-2 left-[17px] w-[2px] -translate-x-1/2 rounded-full opacity-70 md:left-1/2"
                    style={{
                        background:
                            "linear-gradient(180deg,#22d3ee,#a78bfa,#60a5fa,#34d399,#fbbf24,#fb7185)",
                    }}
                />

                {visible.map((it, i) => {
                    const left = i % 2 === 0; // desktop column
                    const Icon = ICONS[it.iconKey];
                    return (
                        <li
                            key={it.title}
                            className="relative pb-10 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-x-14 md:pl-0"
                        >
                            {/* Node on the stem */}
                            <span
                                className="absolute top-1 left-[17px] z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border bg-ink md:left-1/2"
                                style={{
                                    borderColor: it.accent,
                                    boxShadow: "0 0 0 4px var(--ink)",
                                }}
                            >
                                {it.current ? (
                                    <span
                                        aria-hidden
                                        className="absolute inset-0 inline-flex animate-ping rounded-full opacity-40"
                                        style={{
                                            backgroundColor: it.accent,
                                        }}
                                    />
                                ) : null}
                                <Icon
                                    size={16}
                                    stroke={1.7}
                                    className="relative"
                                    style={{ color: it.accent }}
                                />
                            </span>

                            {/* Explicit grid placement keeps alternation robust */}
                            <div
                                className={
                                    left
                                        ? "md:col-start-1 md:row-start-1 md:pr-2 md:text-right"
                                        : "md:col-start-2 md:row-start-1 md:pl-2"
                                }
                            >
                                <Reveal delay={i * 0.06} y={24}>
                                    <article
                                        className="group relative flex flex-col gap-3.5 rounded-2xl border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-surface/90 sm:p-6"
                                        style={{
                                            /* The branch colour tints the card's
                                               cast shadow. Mixed toward the page
                                               ground in light mode, where an
                                               unmixed coloured shadow reads as a
                                               smudge rather than depth. */
                                            boxShadow: `0 18px 50px -28px color-mix(in srgb, ${it.accent} var(--tl-glow-mix), var(--ink))`,
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "flex flex-wrap items-center gap-2.5",
                                                left && "md:justify-end"
                                            )}
                                        >
                                            <span
                                                className="rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                                                style={{
                                                    borderColor: `${it.accent}3d`,
                                                    background: `${it.accent}12`,
                                                    color: it.accent,
                                                }}
                                            >
                                                {it.period}
                                            </span>
                                            {it.current && (
                                                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] text-accent uppercase tracking-[0.16em]">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <h3 className="font-display font-semibold text-[19px] text-paper leading-snug tracking-tight">
                                                {it.title}
                                            </h3>
                                            <span className="font-mono text-[11px] text-muted tracking-[0.1em]">
                                                {it.org}
                                            </span>
                                        </div>

                                        <p className="text-muted text-sm leading-relaxed">
                                            {it.detail}
                                        </p>

                                        <div
                                            className={cn(
                                                "flex flex-wrap gap-1.5",
                                                left && "md:justify-end"
                                            )}
                                        >
                                            {it.tags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </article>
                                </Reveal>
                            </div>
                        </li>
                    );
                })}
            </ol>

            {!expanded && journey.length > COLLAPSED_COUNT && (
                <div className="mt-10 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setExpanded(true)}
                        className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-6 py-3 font-mono text-paper text-xs uppercase tracking-[0.18em] backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                        Show the full journey
                        <IconChartArrowsVertical
                            size={14}
                            stroke={1.8}
                            className="transition-transform duration-300 group-hover:translate-y-0.5"
                        />
                        <span className="text-muted">
                            +{journey.length - COLLAPSED_COUNT}
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}
