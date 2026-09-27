import {
    IconArrowUpRight,
    IconAward,
    IconBriefcase,
    IconCertificate,
    IconCloudUpload,
    IconCode,
    IconDownload,
    IconRobot,
    IconSchool,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import GithubStats from "@/components/main/GithubStats";
import PillButton from "@/components/sub/PillButton";
import Reveal from "@/components/sub/Reveal";
import { SkillIcon } from "@/components/sub/SkillIcon";
import SplitReveal from "@/components/sub/SplitReveal";
import { skillGroups } from "@/data/skills";
import { getGithubContributions, getGithubStats } from "@/lib/github";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
    title: "About",
    description:
        "AI Engineer at TCS in Bengaluru. Building agentic workflows, RAG chatbots, and LLM-powered enterprise applications that ship to production.",
    path: "/about",
});

const focusItems = [
    {
        icon: IconRobot,
        label: "Gen AI",
        detail: "Multi-agent systems and retrieval pipelines that stay reliable under real traffic: evaluations, guardrails, and graceful failure, not just happy-path demos.",
    },
    {
        icon: IconCode,
        label: "Full-stack",
        detail: "Owning the whole path: typed FastAPI and Node services, React and Next.js front ends, and the contracts that hold them together.",
    },
    {
        icon: IconCloudUpload,
        label: "Delivery",
        detail: "Containerised, observable, reproducible: Docker and Kubernetes on AWS with infra as code, so a model becomes a product that stays up.",
    },
] as const;

// Career + education timeline, newest first (top) → oldest (bottom).
// Each entry branches off the central stem in its own colour.
// University / school entries still carry [bracketed] placeholders.
const journey = [
    {
        period: "Apr 2026 — Present",
        title: "Full-stack AI Engineer",
        org: "TCS · Bengaluru",
        detail: "Fully focused on end-to-end Generative AI delivery: agentic backends, RAG pipelines, evaluations, and the interfaces on top. Enterprise knowledge assistants that give employees reliable answers, AI automation that streamlines SDLC workflows, proof-of-concept to production on React, Python, PostgreSQL, Docker, and GitHub Actions.",
        accent: "#22d3ee", // cyan
        icon: IconRobot,
        current: true,
        tags: ["Agentic systems", "RAG", "Evals", "AWS"],
    },
    {
        period: "Apr 2025 — Apr 2026",
        title: "Web Developer · AI engineering team",
        org: "TCS · Bengaluru",
        detail: "Embedded in the AI engineering track owning the front end of enterprise GenAI applications: chatbot and knowledge-assistant interfaces, streaming LLM responses, dashboards. Learned the model side from inside the product, and widened the work into the backend along the way.",
        accent: "#a78bfa", // violet
        icon: IconCode,
        current: false,
        tags: ["React", "Next.js", "Streaming UI"],
    },
    {
        period: "Jan 2025 — Apr 2025",
        title: "System Engineer",
        org: "TCS · Bengaluru",
        detail: "Onboarded into TCS and moved into the AI engineering track within four months by shipping work end to end on my own stack.",
        accent: "#60a5fa", // blue
        icon: IconBriefcase,
        current: false,
        tags: ["Foundations"],
    },
    {
        period: "2022 — 2024",
        title: "Full-stack Developer",
        org: "Freelance & open source",
        detail: "Shipped storefronts, social apps, and internal tools on Next.js and MongoDB — a Stripe-backed ecommerce store from catalogue to completed order, and a social platform with auth, feeds, and a responsive interface. The foundations I now use for AI products.",
        accent: "#34d399", // emerald
        icon: IconBriefcase,
        current: false,
        tags: ["Next.js", "MongoDB", "Stripe"],
    },
    {
        period: "Mar 2023 — Apr 2023",
        title: "Summer Intern",
        org: "Bihar State Power Transmission Co. Ltd. · Naugachhia",
        detail: "Worked on grid equipment and daily grid operations, and the communication flow between the grid and the Load Dispatch Center.",
        accent: "#fbbf24", // amber
        icon: IconCloudUpload,
        current: false,
        tags: ["Grid ops"],
    },
    {
        period: "2021 — 2024",
        title: "B.Tech, Electrical Engineering",
        org: "Bhagalpur College of Engineering",
        detail: "The degree that started the self-taught software path: from React and Node.js into Python and Go, then into the GenAI stack. Final-year work on clinical risk prediction.",
        accent: "#fb7185", // rose
        icon: IconSchool,
        current: false,
        tags: ["Electrical", "Self-taught SWE"],
    },
] as const;

// Certifications & achievements. Add `url` (credential link) to make a card
// clickable; leave "" if none.
type Certification = {
    name: string;
    issuer: string;
    year: string;
    url?: string;
    credentialId?: string;
    skills?: string[];
};

const certifications: Certification[] = [
    {
        name: "Claude Certified Architect — Professional",
        issuer: "Anthropic",
        year: "2026",
        url: "https://www.credly.com/badges/911b0cc0-846a-4b78-b0f7-c63381e4f213/public_url",
        skills: [
            "AI Governance",
            "Context engineering",
            "Enterprise Architecture",
            "Evaluation & optimization",
            "Integration Architecture",
            "Solution Design",
        ],
    },
    {
        name: "Claude Certified Developer — Foundations",
        issuer: "Anthropic",
        year: "2026",
        url: "https://www.credly.com/badges/ba1c2fee-97a5-4b6b-8daa-870c3159e8e0/public_url",
        skills: [
            "Agent development",
            "Claude API integration",
            "MCP Server Development",
            "Prompt Engineering",
            "Eval & debugging",
        ],
    },
    {
        name: "AWS Cloud Solutions Architect Specialization",
        issuer: "Amazon Web Services · Coursera",
        year: "Mar 2024",
        credentialId: "QPX5VKLV99FJ",
    },
    {
        name: "DevOps on AWS Specialization",
        issuer: "Amazon Web Services · Coursera",
        year: "Jan 2024",
        credentialId: "MGKVVZBNDBD9",
    },
    {
        name: "Prompt Design in Vertex AI Skill Badge",
        issuer: "Google Cloud",
        year: "Apr 2025",
    },
];

export default async function AboutPage() {
    const [githubStats, githubContributions] = await Promise.all([
        getGithubStats(),
        getGithubContributions(),
    ]);

    return (
        <main className="relative min-h-[100dvh] bg-transparent pt-12 md:pt-16">
            {/* ─── SECTION 1 · INTRO ─────────────────────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
                <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1fr] lg:gap-12 xl:gap-20">
                    {/* Text column (right on desktop) */}
                    <div className="flex flex-col gap-8 lg:order-2">
                        {/* Eyebrow - counts as 1 of max 2 */}
                        <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                            <span className="h-px w-8 bg-accent" />
                            About
                        </span>

                        {/* Hero headline via SplitReveal */}
                        <SplitReveal>
                            <h1 className="font-display font-semibold text-4xl text-paper leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                                I build AI that makes it to{" "}
                                <span className="text-accent">production.</span>
                            </h1>
                        </SplitReveal>

                        {/* Bio */}
                        <Reveal
                            delay={0.1}
                            className="flex max-w-[580px] flex-col gap-5"
                        >
                            <p className="text-base text-muted leading-relaxed">
                                Gen AI Developer at TCS. I design and ship
                                end-to-end AI products, from the agentic backend
                                to the interface users actually touch. My work
                                spans LangChain, LangGraph, RAG architectures,
                                and multi-model orchestration, with full
                                ownership of deployment on the other end.
                            </p>
                            <p className="text-base text-muted leading-relaxed">
                                I care about one thing: building AI systems that
                                are reliable in the real world. Not demos, not
                                prototypes sitting in a notebook. Shipped
                                products, running in production, used by real
                                people.
                            </p>
                        </Reveal>

                        {/* CTAs */}
                        <Reveal delay={0.2}>
                            <div className="flex flex-wrap items-center gap-3">
                                <PillButton href="/contact">
                                    Get in touch
                                </PillButton>
                                <PillButton
                                    href="https://drive.google.com/file/d/1TF-POXkJmb7m69R3nLEwOrxdDkywTBfc/view"
                                    variant="ghost"
                                    external
                                >
                                    Download resume{" "}
                                    <IconDownload size={18} stroke={1.8} />
                                </PillButton>
                            </div>
                        </Reveal>
                    </div>

                    {/* Portrait (left on desktop) — floating cutout over a soft glow */}
                    <Reveal
                        x={-24}
                        y={0}
                        delay={0.15}
                        className="flex justify-center lg:order-1 lg:justify-start"
                    >
                        <div className="relative w-full max-w-[460px] lg:max-w-none">
                            {/* Soft mint glow */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-[2%] -z-10 rounded-full blur-2xl"
                                style={{
                                    background:
                                        "radial-gradient(circle at 50% 44%, rgba(34,211,238,0.22) 0%, transparent 64%)",
                                }}
                            />
                            {/* Faint uniform ring for subtle structure */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-[6%] -z-10 rounded-full border border-line"
                            />
                            {/* Transparent cutout, floating with depth */}
                            <Image
                                src="/ansh-pro.webp"
                                alt="Ansh Roshan"
                                width={520}
                                height={520}
                                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 460px"
                                className="relative aspect-square w-full object-contain object-bottom drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
                                priority
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ─── SECTION 2 · FOCUS (editorial label / description rows) ────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
                <Reveal className="mb-10 md:mb-12">
                    <h2 className="font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl">
                        What I do
                    </h2>
                </Reveal>

                <div className="divide-y divide-line border-line border-y">
                    {focusItems.map(({ icon: Icon, label, detail }, i) => (
                        <Reveal key={label} delay={i * 0.06}>
                            <div className="group grid items-start gap-3 py-7 md:grid-cols-[260px_1fr] md:gap-12 md:py-8">
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={22}
                                        stroke={1.6}
                                        className="shrink-0 text-accent"
                                    />
                                    <h3 className="font-display font-medium text-paper text-xl tracking-tight">
                                        {label}
                                    </h3>
                                </div>
                                <p className="max-w-2xl text-base text-muted leading-relaxed transition-colors duration-300 group-hover:text-paper/90">
                                    {detail}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 3 · STACK (no eyebrow) ───────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
                <Reveal className="mb-12">
                    <h2 className="font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl">
                        The stack
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2">
                    {skillGroups.map((group, i) => {
                        const isPrimary = i === 0;
                        return (
                            <Reveal
                                key={group.title}
                                delay={i * 0.07}
                                className={isPrimary ? "md:col-span-2" : ""}
                            >
                                <div className="relative flex h-full flex-col gap-5 bg-surface/70 p-8 backdrop-blur-xl">
                                    {isPrimary && (
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0"
                                            style={{
                                                background:
                                                    "radial-gradient(120% 100% at 0% 0%, rgba(34,211,238,0.10), transparent 55%)",
                                            }}
                                        />
                                    )}
                                    <div className="relative flex flex-col gap-5">
                                        <div className="flex flex-col gap-1.5">
                                            {isPrimary && (
                                                <span className="mb-1 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10.5px] text-accent uppercase tracking-[0.18em]">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                                    Primary focus
                                                </span>
                                            )}
                                            <h3 className="font-display font-medium text-lg text-paper">
                                                {group.title}
                                            </h3>
                                            <p className="text-muted text-sm">
                                                {group.blurb}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {group.skills.map((skill) => (
                                                <span
                                                    key={skill.name}
                                                    className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-muted text-xs"
                                                >
                                                    <SkillIcon
                                                        skill={skill}
                                                        size={14}
                                                    />
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* ─── SECTION · GITHUB (data cached once per day, see lib/github.ts) ── */}
            {githubStats ? (
                <GithubStats
                    stats={githubStats}
                    contributions={githubContributions}
                />
            ) : null}

            {/* ─── SECTION 4 · JOURNEY (center-stem timeline, colored branches) ── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
                <Reveal className="mb-14 md:mb-20">
                    <h2 className="font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl">
                        How I got here
                    </h2>
                </Reveal>

                <ol className="relative mx-auto max-w-5xl">
                    {/* Central multi-colour stem (mobile-left, centered on desktop) */}
                    <span
                        aria-hidden
                        className="absolute top-2 bottom-2 left-[17px] w-[2px] -translate-x-1/2 rounded-full opacity-70 md:left-1/2"
                        style={{
                            background:
                                "linear-gradient(180deg,#22d3ee,#a78bfa,#60a5fa,#34d399,#fbbf24,#fb7185)",
                        }}
                    />

                    {journey.map((it, i) => {
                        const left = i % 2 === 0; // desktop column
                        const Icon = it.icon;
                        return (
                            <li
                                key={it.title}
                                className="relative pb-10 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-x-14 md:pl-0"
                            >
                                {/* Node on the stem: a coloured glyph for this chapter */}
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

                                {/* Explicit grid placement: no calc() widths, no
                                    auto-margin tricks — the empty cell collapses
                                    on its own, so alternation cannot break. */}
                                <div
                                    className={
                                        left
                                            ? "md:col-start-1 md:row-start-1 md:pr-2 md:text-right"
                                            : "md:col-start-2 md:row-start-1 md:pl-2"
                                    }
                                >
                                    <Reveal delay={i * 0.06} y={24}>
                                        <article
                                            className="group relative flex flex-col gap-3.5 rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-surface/90 sm:p-6"
                                            style={{
                                                boxShadow: `0 18px 50px -28px ${it.accent}`,
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
            </section>

            {/* ─── SECTION · CERTIFICATIONS & ACHIEVEMENTS ──────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
                <Reveal className="mb-10 md:mb-12">
                    <h2 className="font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl">
                        Certifications & achievements
                    </h2>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {certifications.map((c, i) => {
                        const Icon =
                            i === certifications.length - 1
                                ? IconAward
                                : IconCertificate;
                        const cls =
                            "flex h-full items-start gap-4 rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/40";
                        const inner = (
                            <>
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2">
                                    <Icon
                                        size={20}
                                        stroke={1.6}
                                        className="text-accent"
                                    />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-display font-semibold text-paper text-sm leading-snug">
                                        {c.name}
                                    </h3>
                                    <p className="mt-0.5 text-muted text-xs">
                                        {c.issuer}
                                        {c.year ? ` · ${c.year}` : ""}
                                    </p>
                                    {c.skills ? (
                                        <div className="mt-2.5 flex flex-wrap gap-1">
                                            {c.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                    {c.credentialId ? (
                                        <p className="mt-2 font-mono text-[10px] text-muted/70 tracking-[0.08em]">
                                            ID {c.credentialId}
                                        </p>
                                    ) : null}
                                    {c.url ? (
                                        <span className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-accent uppercase tracking-[0.14em]">
                                            Verify
                                            <IconArrowUpRight
                                                size={12}
                                                stroke={1.8}
                                            />
                                        </span>
                                    ) : null}
                                </div>
                            </>
                        );
                        return (
                            <Reveal
                                key={`${c.name}-${i}`}
                                delay={i * 0.06}
                                y={20}
                                className="group h-full"
                            >
                                {c.url ? (
                                    <a
                                        href={c.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`${cls} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink`}
                                    >
                                        {inner}
                                    </a>
                                ) : (
                                    <div className={cls}>{inner}</div>
                                )}
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* ─── SECTION 5 · CTA BAND ──────────────────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-32 md:px-10 md:pb-40">
                <Reveal>
                    <div className="flex flex-col items-center gap-8 rounded-[24px] border border-line bg-surface/70 px-8 py-16 text-center backdrop-blur-xl md:px-16 md:py-20">
                        <h2 className="max-w-2xl font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl lg:text-5xl">
                            Have an AI product to build?
                        </h2>
                        <PillButton href="/contact">Get in touch</PillButton>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
