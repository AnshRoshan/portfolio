"use client";

import Image from "next/image";
import { IconArrowDownRight } from "@tabler/icons-react";
import PillButton from "../sub/PillButton";
import Reveal from "../sub/Reveal";
import RotatingText from "../sub/RotatingText";

const Hero = () => {
    return (
        <section className="relative mx-auto flex min-h-[calc(100dvh-68px)] w-full max-w-[1400px] flex-col justify-center px-6 pt-16 pb-20 md:px-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                {/* Left: copy */}
                <div className="order-2 lg:order-1">
                    {/* Availability signal for recruiters scanning the fold */}
                    <Reveal y={-12}>
                        <span className="font-mono mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/[0.08] px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#9a9aa4]">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22d3ee] opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                            </span>
                            Open to Gen AI roles and collaborations
                        </span>
                    </Reveal>
                    <Reveal y={-12}>
                        <span className="font-mono inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.22em] text-[#9a9aa4]">
                            <span className="h-px w-8 bg-[#22d3ee]" />
                            <span className="shimmer-text">AI Engineer · TCS</span>
                        </span>
                    </Reveal>

                    {/* Hero headline is the LCP element — render it visible on
                        first paint (transform-only entrance, no opacity gating)
                        instead of the masked word-reveal, so LCP isn't blocked
                        on JS. Kinetic SplitReveal stays on below-the-fold heads. */}
                    <Reveal y={20} fade={false}>
                        <h1 className="font-display mt-6 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                            Engineering AI
                            <br className="hidden sm:block" /> products,{" "}
                            <span className="text-[#22d3ee]">end to end.</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={0.22} y={16}>
                        <p className="mt-5 font-mono text-sm uppercase tracking-[0.2em] text-[#9a9aa4]">
                            Building{" "}
                            <RotatingText
                                words={[
                                    "agentic systems",
                                    "RAG pipelines",
                                    "LLM apps",
                                    "production AI",
                                ]}
                                className="font-semibold text-[#22d3ee]"
                            />
                        </p>
                    </Reveal>

                    <Reveal delay={0.28} y={20}>
                        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[#9a9aa4] sm:text-lg">
                            Gen AI developer at TCS. I design the agentic
                            backend, the interface users touch, and everything in
                            between, then ship it to production.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4} y={20}>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <PillButton href="/contact" variant="electric">
                                Get in touch
                            </PillButton>
                            <PillButton href="/#projects" variant="ghost" sweep>
                                View work
                                <IconArrowDownRight size={18} stroke={1.8} />
                            </PillButton>
                        </div>
                    </Reveal>

                </div>

                {/* Right: cutout floating in front of a glowing glass disc */}
                <Reveal
                    delay={0.1}
                    x={28}
                    fade={false}
                    className="order-1 flex justify-center lg:order-2 lg:justify-end"
                >
                    <div className="relative aspect-square w-[320px] sm:w-[420px] lg:w-[520px]">
                        {/* Soft mint bloom */}
                        <div
                            aria-hidden
                            className="absolute inset-[-4%] -z-10 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.22),transparent_62%)] blur-2xl"
                        />
                        {/* Rotating mint orb glow */}
                        <div
                            aria-hidden
                            className="hero-orb absolute inset-[12%] -z-10 rounded-full"
                        />
                        {/* Faint uniform ring — subtle structure, no hard top edge */}
                        <div
                            aria-hidden
                            className="absolute inset-[7%] -z-10 rounded-full border border-white/[0.06]"
                        />
                        {/* Static cutout — head/shoulders break the disc (no magnet drift) */}
                        <Image
                            src="/ansh-avatar.webp"
                            alt="Ansh Roshan"
                            width={560}
                            height={560}
                            priority
                            sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 520px"
                            className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-[0_28px_55px_rgba(0,0,0,0.55)]"
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Hero;
