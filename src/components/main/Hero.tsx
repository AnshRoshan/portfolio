"use client";

import {
    IconBrain,
    IconBrandAws,
    IconBrandGoogle,
    IconCertificate,
    IconDownload,
    IconRobot,
    IconScale,
} from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { heroStats } from "@/data/content";
import { useTilt } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Counter from "../sections/Counter";
import PillButton from "../sub/PillButton";
import Reveal from "../sub/Reveal";
import { Typewriter } from "../sub/Typewriter";

/**
 * Minimal hero: one signal, one headline, one line, two exits, one proof
 * strip, and the portrait card. The long story lives on /about.
 */

const TRACE_LINES = [
    {
        glyph: "$",
        cls: "text-accent",
        text: 'agent.ask("hybrid vs pure vector?")',
    },
    { glyph: "→", cls: "text-muted", text: "route  bm25 + vector + graph" },
    { glyph: "~", cls: "text-muted", text: "recall 128 → rerank 24 → ctx 6" },
    { glyph: "✓", cls: "text-accent", text: "answer  grounded · 4 citations" },
];

/** Self-replaying terminal card — the agent's reasoning as hero flavour. */
const AgentTrace = () => {
    const [shown, setShown] = useState(1);

    useEffect(() => {
        const done = shown >= TRACE_LINES.length;
        const t = setTimeout(
            () => setShown(done ? 1 : shown + 1),
            done ? 2800 : shown === 1 ? 900 : 620
        );
        return () => clearTimeout(t);
    }, [shown]);

    return (
        <div className="card-edge w-full rounded-2xl border border-line bg-surface/95 p-4 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2 border-line border-b pb-2.5">
                <span aria-hidden className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                </span>
                <span className="ml-1 font-mono text-[9px] text-muted uppercase tracking-[0.18em]">
                    agent-trace.log
                </span>
            </div>
            <div className="flex flex-col gap-1.5">
                {TRACE_LINES.map((l, i) => (
                    <p
                        key={l.text}
                        className={cn(
                            "font-mono text-[10.5px] transition-all duration-300",
                            i < shown
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-1 opacity-0"
                        )}
                    >
                        <span className={cn("mr-2", l.cls)}>{l.glyph}</span>
                        <span className="text-paper/85">{l.text}</span>
                    </p>
                ))}
            </div>
        </div>
    );
};

/** Resting angle of the portrait. The class below and the `rest` argument of
 *  useTilt must stay in sync or the card snaps when the pointer enters. */
const REST_TILT = "rotateY(-6deg) rotateX(2.5deg)";

const Hero = () => {
    const tiltRef = useTilt<HTMLDivElement>(6, REST_TILT);

    return (
        <section className="relative mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 py-20 md:px-10 md:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                {/* Left: copy */}
                <div>
                    <Reveal y={-12}>
                        <span className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-1.5 font-mono text-[11px] text-accent uppercase tracking-[0.18em]">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                            </span>
                            Open to Gen AI roles
                        </span>
                    </Reveal>

                    {/* LCP headline: transform-only entrance, never opacity-gated */}
                    <Reveal y={20} fade={false}>
                        <h1 className="text-balance font-display font-semibold text-5xl text-paper leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                            Engineering AI
                            <br className="hidden sm:block" /> products,{" "}
                            <span className="whitespace-nowrap text-accent">
                                end to end.
                            </span>
                        </h1>
                    </Reveal>

                    <Reveal delay={0.22} y={16}>
                        <p className="mt-6 max-w-[40ch] text-base text-muted leading-relaxed sm:text-lg">
                            Agentic systems, RAG pipelines, and the products
                            around them, shipped at TCS.
                        </p>
                    </Reveal>

                    <Reveal delay={0.27} y={14}>
                        <p className="mt-4 font-mono text-[12px] text-muted uppercase tracking-[0.06em] sm:text-[13px]">
                            Currently building —{" "}
                            <Typewriter
                                phrases={[
                                    "Agentic systems",
                                    "RAG pipelines",
                                    "LLM evaluation",
                                    "AI-powered products",
                                ]}
                            />
                        </p>
                    </Reveal>

                    <Reveal delay={0.32} y={20}>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <PillButton
                                href="/contact"
                                variant="electric"
                                className="w-full justify-center sm:w-auto"
                            >
                                Get in touch
                            </PillButton>
                            <PillButton
                                href={siteConfig.links.resume}
                                variant="ghost"
                                external
                                sweep
                                className="w-full justify-center sm:w-auto"
                            >
                                Download resume
                                <IconDownload size={18} stroke={1.8} />
                            </PillButton>
                        </div>
                    </Reveal>

                    {/* Proof strip — numbers derive from src/data */}
                    <Reveal delay={0.42} y={20}>
                        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-line border-t pt-8 sm:grid-cols-4 sm:gap-y-0">
                            {heroStats.map((s, i) => (
                                <Counter
                                    key={s.label}
                                    value={s.value}
                                    suffix={s.suffix}
                                    label={s.label}
                                    /* Mobile runs 2×2, so the lower pair needs a
                                       rule of its own to read as a second row. */
                                    className={cn(
                                        i > 1 &&
                                            "border-line border-t pt-7 sm:border-t-0 sm:pt-0"
                                    )}
                                />
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* Right: portrait card — photo, location pill, name plate, certs */}
                <Reveal delay={0.1} x={28} fade={false}>
                    <div className="relative mx-auto w-full max-w-[380px] [perspective:1200px] lg:mx-0 lg:ml-auto lg:max-w-[440px]">
                        <div
                            ref={tiltRef}
                            className="glow-card relative overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(165deg,var(--surface)_0%,var(--ink)_78%)] shadow-elev-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:perspective(1100px)_rotateY(-6deg)_rotateX(2.5deg)]"
                        >
                            <Image
                                src="/ansh-pro.webp"
                                alt="Ansh Roshan"
                                width={520}
                                height={650}
                                priority
                                sizes="(max-width: 768px) 86vw, 440px"
                                className="relative aspect-[4/5] w-full object-cover object-top"
                            />

                            {/* Accent bloom, painted OVER the photo. This shot is
                                on a flat white sweep, so without it the card is
                                a white rectangle on a light page and reads as a
                                hole. Kept to the top and base bands so it never
                                washes over the face. */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_52%_at_50%_-10%,color-mix(in_srgb,var(--accent)_26%,transparent),transparent_72%)]"
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(95%_100%_at_50%_104%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_74%)]"
                            />

                            {/* Accent hairline across the top edge */}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
                            />

                            {/* Bottom scrim keeps the name plate legible. It fades
                                to the page ground so the photo dissolves into the
                                card instead of ending on a hard white edge. */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink via-ink/72 to-transparent"
                            />

                            {/* Location pill — on-media chip, so it survives the
                                white sweep behind it */}
                            <span className="absolute bottom-[6.5rem] left-5 inline-flex items-center gap-2 rounded-full border border-media-chip-line bg-media-chip px-3.5 py-1.5 font-mono text-[10px] text-media-chip-fg uppercase tracking-[0.18em] backdrop-blur-md">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                                </span>
                                Bengaluru
                            </span>

                            {/* Name plate */}
                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-6 pb-6">
                                <div className="min-w-0">
                                    <p className="font-display font-semibold text-paper text-xl tracking-tight sm:text-2xl">
                                        Ansh Roshan
                                    </p>
                                    <p className="mt-1.5 font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
                                        AI Engineer @ TCS
                                    </p>
                                </div>
                                <span
                                    aria-hidden
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10"
                                >
                                    <IconRobot
                                        size={16}
                                        stroke={1.7}
                                        className="text-accent"
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Three credential chips float on the card's corners,
                            far enough apart that none of them can collide at
                            any width. `card-edge` is load-bearing in light
                            mode: a translucent light chip over a light page is
                            otherwise invisible. */}
                        <div className="card-edge absolute -top-4 right-0 rounded-2xl border border-line bg-surface/95 px-3 py-2.5 backdrop-blur-xl sm:-right-6 sm:px-4 sm:py-3">
                            <span className="flex items-center gap-1.5 font-mono text-[8.5px] text-muted uppercase tracking-[0.2em] sm:text-[9px]">
                                <IconCertificate
                                    size={12}
                                    stroke={2}
                                    className="text-accent"
                                />
                                Certified
                            </span>
                            <p className="mt-1 font-semibold text-[13px] text-paper sm:text-sm">
                                Claude Architect · Pro
                            </p>
                        </div>

                        <div className="card-edge absolute top-[12%] -left-1.5 animate-float rounded-2xl border border-line bg-surface/95 px-3 py-2.5 backdrop-blur-xl [-rotate:4deg] [animation-delay:1.4s] sm:-left-7 sm:px-3.5">
                            <span className="flex items-center gap-1.5 font-mono text-[8.5px] text-muted uppercase tracking-[0.2em] sm:text-[9px]">
                                <IconBrandAws
                                    size={12}
                                    stroke={2}
                                    className="text-accent"
                                />
                                Certified
                            </span>
                            <p className="mt-1 font-semibold text-[12.5px] text-paper sm:text-[13px]">
                                AWS · Solutions Architect
                            </p>
                        </div>

                        {/* Sits below the face so it never covers it. */}
                        <div className="card-edge absolute top-[64%] -right-1.5 animate-float rounded-2xl border border-line bg-surface/95 px-3 py-2.5 backdrop-blur-xl [-rotate:3deg] [animation-delay:2.9s] sm:-right-7 sm:px-3.5">
                            <span className="flex items-center gap-1.5 font-mono text-[8.5px] text-muted uppercase tracking-[0.2em] sm:text-[9px]">
                                <IconBrandGoogle
                                    size={12}
                                    stroke={2}
                                    className="text-accent"
                                />
                                Google Cloud
                            </span>
                            <p className="mt-1 font-semibold text-[12.5px] text-paper sm:text-[13px]">
                                Prompt Design · Vertex AI
                            </p>
                        </div>

                        {/* The agent-trace terminal lives in normal flow under
                            the card: absolutely positioned it overlapped each
                            other and the name plate. */}
                        <div className="mt-7 flex flex-col items-center gap-3">
                            <div className="w-full max-w-[340px]">
                                <AgentTrace />
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-2.5">
                                <span className="card-edge inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
                                    <IconBrain
                                        size={14}
                                        stroke={1.8}
                                        className="text-accent"
                                    />
                                    <span className="font-mono text-[10px] text-paper uppercase tracking-[0.16em]">
                                        LangGraph · RAG · Evals
                                    </span>
                                </span>
                                <span className="card-edge inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
                                    <IconScale
                                        size={14}
                                        stroke={1.8}
                                        className="text-accent"
                                    />
                                    <span className="font-mono text-[10px] text-paper uppercase tracking-[0.16em]">
                                        Open source · MIT
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Hero;
