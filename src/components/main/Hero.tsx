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
import { heroStats } from "@/data/content";
import { useTilt } from "@/lib/hooks";
import Counter from "../sections/Counter";
import PillButton from "../sub/PillButton";
import Reveal from "../sub/Reveal";

/**
 * Minimal hero: one signal, one headline, one line, two exits, one proof
 * strip, and the portrait card. The long story lives on /about.
 */
const Hero = () => {
    const tiltRef = useTilt<HTMLDivElement>(6);

    return (
        <section className="relative mx-auto w-full max-w-[1200px] px-6 py-14 md:px-10 md:py-20">
            {/* One card, same language as the portrait + About detail cards */}
            <div className="glow-card relative overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(165deg,var(--surface)_0%,var(--ink)_78%)]">
                <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
                />
                {/* Soft cyan light behind the portrait half */}
                <div
                    aria-hidden
                    className="absolute inset-y-0 right-0 w-[45%] bg-[radial-gradient(ellipse_60%_55%_at_65%_45%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_70%)]"
                />
                <div className="relative grid items-center gap-10 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-12">
                    {/* Left: copy */}
                    <div className="order-2 lg:order-1">
                        <Reveal y={-12}>
                            <span className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-1.5 font-mono text-[11px] text-muted uppercase tracking-[0.18em]">
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
                                <span className="text-accent">end to end.</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.22} y={16}>
                            <p className="mt-6 max-w-[40ch] text-base text-muted leading-relaxed sm:text-lg">
                                Agentic systems, RAG pipelines, and the products
                                around them, shipped at TCS.
                            </p>
                        </Reveal>

                        <Reveal delay={0.32} y={20}>
                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <PillButton href="/contact" variant="electric">
                                    Get in touch
                                </PillButton>
                                <PillButton
                                    href="https://drive.google.com/file/d/1TF-POXkJmb7m69R3nLEwOrxdDkywTBfc/view"
                                    variant="ghost"
                                    external
                                    sweep
                                >
                                    Download resume
                                    <IconDownload size={18} stroke={1.8} />
                                </PillButton>
                            </div>
                        </Reveal>

                        {/* Proof strip — numbers derive from src/data */}
                        <Reveal delay={0.42} y={20}>
                            <div className="mt-12 grid grid-cols-2 gap-6 border-line border-t pt-8 sm:grid-cols-4">
                                {heroStats.map((s) => (
                                    <Counter
                                        key={s.label}
                                        value={s.value}
                                        suffix={s.suffix}
                                        label={s.label}
                                    />
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: portrait card — photo, location pill, name plate, cert */}
                    <Reveal
                        delay={0.1}
                        x={28}
                        fade={false}
                        className="order-1 flex justify-center lg:order-2 lg:justify-end"
                    >
                        <div className="relative w-full max-w-[380px] [perspective:1200px] lg:max-w-[440px]">
                            <div
                                ref={tiltRef}
                                className="glow-card relative overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(165deg,var(--surface)_0%,var(--ink)_78%)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:rotateY(-7deg)_rotateX(3deg)]"
                            >
                                {/* Accent hairline across the top edge */}
                                <span
                                    aria-hidden
                                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                                />
                                {/* Soft cyan light behind the subject */}
                                <div
                                    aria-hidden
                                    className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_60%_50%_at_50%_38%,color-mix(in_srgb,var(--accent)_13%,transparent),transparent_70%)]"
                                />

                                <Image
                                    src="/ansh-pro.webp"
                                    alt="Ansh Roshan"
                                    width={520}
                                    height={650}
                                    priority
                                    sizes="(max-width: 768px) 86vw, 440px"
                                    className="relative aspect-[4/5] w-full object-cover object-top"
                                />

                                {/* Bottom scrim keeps the name plate legible */}
                                <div
                                    aria-hidden
                                    className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink via-ink/75 to-transparent"
                                />

                                {/* Location pill */}
                                <span className="absolute bottom-[6.5rem] left-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink/70 px-3.5 py-1.5 font-mono text-[10px] text-paper uppercase tracking-[0.18em] backdrop-blur-md">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                                    </span>
                                    Bengaluru
                                </span>

                                {/* Name plate */}
                                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-6 pb-6">
                                    <div>
                                        <p className="font-display font-semibold text-2xl text-paper tracking-tight">
                                            Ansh Roshan
                                        </p>
                                        <p className="mt-1.5 font-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                                            Artificial Intelligence Engineer @
                                            TCS
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

                            {/* Floating credential badge */}
                            <div className="absolute -top-5 -right-2 rounded-2xl border border-line bg-surface/95 px-4 py-3 backdrop-blur-xl sm:-right-6">
                                <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted uppercase tracking-[0.2em]">
                                    <IconCertificate
                                        size={12}
                                        stroke={2}
                                        className="text-accent"
                                    />
                                    Certified
                                </span>
                                <p className="mt-1 font-semibold text-paper text-sm">
                                    Claude Architect · Pro
                                </p>
                            </div>

                            {/* Left: AWS credential */}
                            <div className="absolute top-[15%] -left-3 animate-float rounded-2xl border border-line bg-surface/95 px-3.5 py-2.5 backdrop-blur-xl [-rotate:4deg] [animation-delay:1.4s] sm:-left-7">
                                <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted uppercase tracking-[0.2em]">
                                    <IconBrandAws
                                        size={12}
                                        stroke={2}
                                        className="text-accent"
                                    />
                                    Certified
                                </span>
                                <p className="mt-1 font-semibold text-[13px] text-paper">
                                    AWS · Solutions Architect
                                </p>
                            </div>

                            {/* Bottom: agentic stack chip */}
                            <div className="absolute -bottom-6 left-6 inline-flex animate-float items-center gap-2 rounded-full border border-line bg-surface/95 px-4 py-2 backdrop-blur-xl [animation-delay:2.3s] [rotate:2deg]">
                                <IconBrain
                                    size={14}
                                    stroke={1.8}
                                    className="text-accent"
                                />
                                <span className="font-mono text-[10px] text-paper uppercase tracking-[0.16em]">
                                    LangGraph · RAG · Evals
                                </span>
                            </div>

                            {/* Right: Google Cloud credential */}
                            <div className="absolute top-[56%] -right-3 animate-float rounded-2xl border border-line bg-surface/95 px-3.5 py-2.5 backdrop-blur-xl [-rotate:3deg] [animation-delay:2.9s] sm:-right-7">
                                <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted uppercase tracking-[0.2em]">
                                    <IconBrandGoogle
                                        size={12}
                                        stroke={2}
                                        className="text-accent"
                                    />
                                    Google Cloud
                                </span>
                                <p className="mt-1 font-semibold text-[13px] text-paper">
                                    Prompt Design · Vertex AI
                                </p>
                            </div>

                            {/* Bottom right: open-source chip */}
                            <div className="absolute right-5 -bottom-5 inline-flex animate-float items-center gap-2 rounded-full border border-line bg-surface/95 px-4 py-2 backdrop-blur-xl [animation-delay:3.6s] [rotate:-2deg]">
                                <IconScale
                                    size={14}
                                    stroke={1.8}
                                    className="text-accent"
                                />
                                <span className="font-mono text-[10px] text-paper uppercase tracking-[0.16em]">
                                    Open source · MIT
                                </span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Hero;
