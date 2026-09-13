import type { Metadata } from "next";
import Image from "next/image";
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
import GithubStats from "@/components/main/GithubStats";
import PillButton from "@/components/sub/PillButton";
import Reveal from "@/components/sub/Reveal";
import { SkillIcon } from "@/components/sub/SkillIcon";
import SplitReveal from "@/components/sub/SplitReveal";
import { getGithubContributions, getGithubStats } from "@/lib/github";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
    title: "About",
    description:
        "AI Engineer at TCS in Bengaluru. Building agentic workflows, RAG chatbots, and LLM-powered enterprise applications that ship to production.",
};

const focusItems = [
    {
        icon: IconRobot,
        label: "Gen AI",
        detail:
            "Multi-agent systems and retrieval pipelines that stay reliable under real traffic: evaluations, guardrails, and graceful failure, not just happy-path demos.",
    },
    {
        icon: IconCode,
        label: "Full-stack",
        detail:
            "Owning the whole path: typed FastAPI and Node services, React and Next.js front ends, and the contracts that hold them together.",
    },
    {
        icon: IconCloudUpload,
        label: "Delivery",
        detail:
            "Containerised, observable, reproducible: Docker and Kubernetes on AWS with infra as code, so a model becomes a product that stays up.",
    },
] as const;

// Career + education timeline, newest first (top) → oldest (bottom).
// Each entry branches off the central stem in its own colour.
// University / school entries still carry [bracketed] placeholders.
const journey = [
    {
        period: "Apr 2025 — Present",
        title: "Artificial Intelligence Engineer",
        org: "TCS · Bengaluru",
        detail:
            "Building enterprise Generative AI applications and internal platforms: RAG chatbots and knowledge assistants that give employees reliable answers from enterprise data, AI-powered automation that streamlines SDLC workflows, and end-to-end GenAI delivery from proof-of-concept to production — on React, Python, PostgreSQL, Docker, and GitHub Actions.",
        accent: "#22d3ee", // cyan
        icon: IconBriefcase,
        current: true,
    },
    {
        period: "Jan 2025 — Apr 2025",
        title: "System Engineer",
        org: "TCS · Bengaluru",
        detail:
            "Onboarded into TCS and moved into the AI engineering track within four months by shipping AI work end to end on my own stack.",
        accent: "#a78bfa", // violet
        icon: IconBriefcase,
        current: false,
    },
    {
        period: "2022 — 2024",
        title: "Full-stack Developer",
        org: "Freelance & open source",
        detail:
            "Shipped storefronts, social apps, and internal tools on Next.js and MongoDB — a Stripe-backed ecommerce store from catalogue to completed order, and a social platform with auth, feeds, and a responsive interface. The foundations I now use for AI products.",
        accent: "#34d399", // emerald
        icon: IconBriefcase,
        current: false,
    },
    {
        period: "Mar 2023 — Apr 2023",
        title: "Summer Intern",
        org: "Bihar State Power Transmission Co. Ltd. · Naugachhia",
        detail:
            "Worked on grid equipment and daily grid operations, and the communication flow between the grid and the Load Dispatch Center.",
        accent: "#fbbf24", // amber
        icon: IconCloudUpload,
        current: false,
    },
    {
        period: "2021 — 2024",
        title: "B.Tech, Electrical Engineering",
        org: "Bhagalpur College of Engineering",
        detail:
            "The degree that started the self-taught software path: from React and Node.js into Python and Go, then into the GenAI stack. Final-year work on clinical risk prediction.",
        accent: "#fb7185", // rose
        icon: IconSchool,
        current: false,
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
            <section className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-24 md:pb-32">
                <div className="grid gap-16 lg:grid-cols-[0.85fr_1fr] lg:gap-12 xl:gap-20 items-center">
                    {/* Text column (right on desktop) */}
                    <div className="flex flex-col gap-8 lg:order-2">
                        {/* Eyebrow - counts as 1 of max 2 */}
                        <span className="font-mono inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.22em] text-[#9a9aa4]">
                            <span className="h-px w-8 bg-[#22d3ee]" />
                            About
                        </span>

                        {/* Hero headline via SplitReveal */}
                        <SplitReveal>
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#e7e7ea] leading-[1.08]">
                                I build AI that makes it to{" "}
                                <span className="text-[#22d3ee]">
                                    production.
                                </span>
                            </h1>
                        </SplitReveal>

                        {/* Bio */}
                        <Reveal delay={0.1} className="flex flex-col gap-5 max-w-[580px]">
                            <p className="text-base leading-relaxed text-[#9a9aa4]">
                                Gen AI Developer at TCS. I design and ship
                                end-to-end AI products, from the agentic backend
                                to the interface users actually touch. My work
                                spans LangChain, LangGraph, RAG architectures,
                                and multi-model orchestration, with full
                                ownership of deployment on the other end.
                            </p>
                            <p className="text-base leading-relaxed text-[#9a9aa4]">
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
                                className="pointer-events-none absolute inset-[6%] -z-10 rounded-full border border-white/[0.06]"
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
            <section className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-24 md:pb-32">
                <Reveal className="mb-10 md:mb-12">
                    <h2 className="text-gradient font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                        What I do
                    </h2>
                </Reveal>

                <div className="divide-y divide-white/10 border-y border-white/10">
                    {focusItems.map(({ icon: Icon, label, detail }, i) => (
                        <Reveal key={label} delay={i * 0.06}>
                            <div className="group grid items-start gap-3 py-7 md:grid-cols-[260px_1fr] md:gap-12 md:py-8">
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={22}
                                        stroke={1.6}
                                        className="shrink-0 text-[#22d3ee]"
                                    />
                                    <h3 className="font-display text-xl font-medium tracking-tight text-[#e7e7ea]">
                                        {label}
                                    </h3>
                                </div>
                                <p className="max-w-2xl text-base leading-relaxed text-[#9a9aa4] transition-colors duration-300 group-hover:text-[#e7e7ea]/90">
                                    {detail}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 3 · STACK (no eyebrow) ───────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-24 md:pb-32">
                <Reveal className="mb-12">
                    <h2 className="text-gradient font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                        The stack
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-[24px] overflow-hidden border border-white/10">
                    {skillGroups.map((group, i) => {
                        const isPrimary = i === 0;
                        return (
                            <Reveal
                                key={group.title}
                                delay={i * 0.07}
                                className={isPrimary ? "md:col-span-2" : ""}
                            >
                                <div className="relative bg-[#131316]/70 backdrop-blur-xl p-8 h-full flex flex-col gap-5">
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
                                                <span className="font-mono mb-1 inline-flex w-fit items-center gap-2 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-[#22d3ee]">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                                                    Primary focus
                                                </span>
                                            )}
                                            <h3 className="font-display text-lg font-medium text-[#e7e7ea]">
                                                {group.title}
                                            </h3>
                                            <p className="text-sm text-[#9a9aa4]">
                                                {group.blurb}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {group.skills.map((skill) => (
                                                <span
                                                    key={skill.name}
                                                    className="font-mono inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs text-[#9a9aa4]"
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
            <section className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-24 md:pb-32">
                <Reveal className="mb-14 md:mb-20">
                    <h2 className="text-gradient font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                        How I got here
                    </h2>
                </Reveal>

                <ol className="relative mx-auto max-w-4xl">
                    {/* Central multi-colour stem (neutral on mobile-left, centered on desktop) */}
                    <span
                        aria-hidden
                        className="absolute top-2 bottom-2 left-5 w-[2px] -translate-x-1/2 rounded-full opacity-70 md:left-1/2"
                        style={{
                            background:
                                "linear-gradient(180deg,#22d3ee,#a78bfa,#34d399,#fbbf24,#fb7185)",
                        }}
                    />

                    {journey.map((it, i) => {
                        const right = i % 2 === 0; // alternate sides on desktop
                        const Icon = it.icon;
                        return (
                            <Reveal key={it.title} delay={i * 0.08} y={24}>
                                <li className="relative pb-12 last:pb-0">
                                    {/* Node on the stem: a coloured glyph for this chapter */}
                                    <span
                                        className="absolute left-5 top-0 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border bg-[#0a0a0b] md:left-1/2"
                                        style={{
                                            borderColor: it.accent,
                                            boxShadow: "0 0 0 4px #0a0a0b",
                                        }}
                                    >
                                        {it.current ? (
                                            <span
                                                aria-hidden
                                                className="absolute inset-0 inline-flex animate-ping rounded-full opacity-40"
                                                style={{ backgroundColor: it.accent }}
                                            />
                                        ) : null}
                                        <Icon
                                            size={16}
                                            stroke={1.7}
                                            className="relative"
                                            style={{ color: it.accent }}
                                        />
                                    </span>

                                    {/* Coloured branch connector (desktop only) */}
                                    <span
                                        aria-hidden
                                        className={
                                            "absolute top-4 hidden h-[2px] w-8 md:block " +
                                            (right ? "left-1/2" : "right-1/2")
                                        }
                                        style={{
                                            background: `linear-gradient(${right ? "90deg" : "270deg"}, ${it.accent}, transparent)`,
                                        }}
                                    />

                                    {/* Card, branching to one side on desktop */}
                                    <div
                                        className={
                                            "group ml-12 md:w-[calc(50%-2.5rem)] " +
                                            (right
                                                ? "md:ml-auto"
                                                : "md:ml-0 md:mr-auto md:text-right")
                                        }
                                    >
                                        <div
                                            className="rounded-2xl border border-white/10 bg-[#131316]/70 p-5 backdrop-blur-xl transition-transform duration-300 group-hover:-translate-y-1"
                                            style={{
                                                boxShadow: `0 18px 50px -28px ${it.accent}`,
                                            }}
                                        >
                                            <span
                                                className="font-mono text-xs uppercase tracking-[0.18em]"
                                                style={{ color: it.accent }}
                                            >
                                                {it.period}
                                            </span>
                                            <h3 className="font-display mt-2 text-xl font-semibold tracking-tight text-[#e7e7ea]">
                                                {it.title}
                                            </h3>
                                            <p className="mt-0.5 text-sm font-medium text-[#e7e7ea]/80">
                                                {it.org}
                                            </p>
                                            <p className="mt-2 text-sm leading-relaxed text-[#9a9aa4]">
                                                {it.detail}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </Reveal>
                        );
                    })}
                </ol>
            </section>

            {/* ─── SECTION · CERTIFICATIONS & ACHIEVEMENTS ──────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-24 md:pb-32">
                <Reveal className="mb-10 md:mb-12">
                    <h2 className="text-gradient font-display text-3xl sm:text-4xl font-semibold tracking-tight">
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
                            "flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-[#131316]/70 p-5 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#22d3ee]/40";
                        const inner = (
                            <>
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0f0f12]">
                                    <Icon
                                        size={20}
                                        stroke={1.6}
                                        className="text-[#22d3ee]"
                                    />
                                </span>
                                <div className="min-w-0">
                                    <h3 className="font-display text-sm font-semibold leading-snug text-[#e7e7ea]">
                                        {c.name}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-[#9a9aa4]">
                                        {c.issuer}
                                        {c.year ? ` · ${c.year}` : ""}
                                    </p>
                                    {c.skills ? (
                                        <div className="mt-2.5 flex flex-wrap gap-1">
                                            {c.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="font-mono rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-[#9a9aa4]"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                    {c.credentialId ? (
                                        <p className="font-mono mt-2 text-[10px] tracking-[0.08em] text-[#9a9aa4]/70">
                                            ID {c.credentialId}
                                        </p>
                                    ) : null}
                                    {c.url ? (
                                        <span className="font-mono mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[#22d3ee]">
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
                                        className={`${cls} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]`}
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
            <section className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-32 md:pb-40">
                <Reveal>
                    <div className="rounded-[24px] bg-[#131316]/70 backdrop-blur-xl border border-white/10 px-8 py-16 md:px-16 md:py-20 flex flex-col items-center gap-8 text-center">
                        <h2 className="text-gradient font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl">
                            Have an AI product to build?
                        </h2>
                        <PillButton href="/contact">Get in touch</PillButton>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}
