import {
    IconArrowUpRight,
    IconBrandAws,
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandLinkedin,
    IconBrandX,
    IconMail,
    IconRobot,
    IconRss,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import CTABand from "@/components/main/CTABand";
import GithubStats from "@/components/main/GithubStats";
import Journey from "@/components/main/Journey";
import Reveal from "@/components/sub/Reveal";
import { SkillIcon } from "@/components/sub/SkillIcon";
import SplitReveal from "@/components/sub/SplitReveal";
import { siteConfig } from "@/config/site";
import { skillGroups } from "@/data/skills";
import { getGithubContributions, getGithubStats } from "@/lib/github";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "About",
    description:
        "AI Engineer at TCS in Bengaluru. Building agentic workflows, RAG chatbots, and LLM-powered enterprise applications that ship to production.",
    path: "/about",
});

// Credentials. `url` makes a card verifiable; `credentialId` shows the raw
// receipt when there's no public link.
const certifications = [
    {
        name: "Claude Certified Architect — Professional",
        issuer: "Anthropic",
        year: "2026",
        url: "https://www.credly.com/badges/911b0cc0-846a-4b78-b0f7-c63381e4f213/public_url",
        badge: "/certs/claude-architect-pro.png",
        issuerKind: "anthropic" as const,
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
        badge: "/certs/claude-developer-foundations.png",
        issuerKind: "anthropic" as const,
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
        issuerKind: "aws" as const,
    },
    {
        name: "DevOps on AWS Specialization",
        issuer: "Amazon Web Services · Coursera",
        year: "Jan 2024",
        credentialId: "MGKVVZBNDBD9",
        issuerKind: "aws" as const,
    },
    {
        name: "Prompt Design in Vertex AI Skill Badge",
        issuer: "Google Cloud",
        year: "Apr 2025",
        issuerKind: "google" as const,
    },
];

// Real issuer brand colors for the credential tiles
const BRAND = {
    anthropic: "#d97757",
    aws: "#ff9900",
    google: "#4285f4",
} as const;

function IssuerMark({ kind }: { kind: "anthropic" | "aws" | "google" }) {
    const c = BRAND[kind];
    const base = "grid h-11 w-11 shrink-0 place-items-center rounded-xl border";
    const style = {
        borderColor: `${c}44`,
        background: `${c}14`,
        color: c,
    };
    if (kind === "aws")
        return (
            <span className={base} style={style}>
                <IconBrandAws size={20} stroke={1.6} />
            </span>
        );
    if (kind === "google")
        return (
            <span className={base} style={style}>
                <IconBrandGoogle size={20} stroke={1.6} />
            </span>
        );
    // Anthropic's mark is a stylized asterisk
    return (
        <span className={base} style={style}>
            <span aria-hidden className="font-display text-xl">
                ✳
            </span>
        </span>
    );
}

export default async function AboutPage() {
    const [githubStats, githubContributions] = await Promise.all([
        getGithubStats(),
        getGithubContributions(),
    ]);

    return (
        <main className="relative min-h-[100dvh] bg-transparent pt-12 md:pt-16">
            {/* ─── INTRO ────────────────────────────────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
                <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start lg:gap-16">
                    {/* Left: the story, all left-aligned */}
                    <div>
                        <Reveal y={16}>
                            <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                                <span className="h-px w-8 bg-accent" />
                                About
                            </span>
                        </Reveal>

                        <SplitReveal className="mt-6">
                            <h1 className="font-display font-semibold text-4xl text-paper leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                                I build AI that makes it to{" "}
                                <span className="text-accent">production.</span>
                            </h1>
                        </SplitReveal>

                        <Reveal delay={0.12} y={18}>
                            <div className="mt-7 flex max-w-[62ch] flex-col gap-4">
                                <p className="text-base text-muted leading-relaxed sm:text-lg">
                                    Gen AI Developer at TCS. I design and ship
                                    end-to-end AI products, from the agentic
                                    backend to the interface users actually
                                    touch — LangChain, LangGraph, RAG
                                    architectures, and multi-model
                                    orchestration, with full ownership of
                                    deployment on the other end.
                                </p>
                                <p className="text-base text-muted leading-relaxed sm:text-lg">
                                    I care about one thing: AI systems that stay
                                    reliable in the real world. Not demos.
                                    Shipped products, running in production,
                                    used by real people.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: a detail card in the same language as the
                        hero portrait card — identity, key facts, real handles */}
                    <Reveal delay={0.18} y={22} className="lg:pt-14">
                        <aside className="glow-card relative overflow-hidden rounded-[1.75rem] border border-line bg-[linear-gradient(165deg,var(--surface)_0%,var(--ink)_78%)]">
                            <span
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                            />
                            <div className="flex flex-col gap-6 p-6 sm:p-7">
                                {/* Name plate */}
                                <div className="flex items-center justify-between gap-3">
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
                                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10"
                                    >
                                        <IconRobot
                                            size={17}
                                            stroke={1.7}
                                            className="text-accent"
                                        />
                                    </span>
                                </div>

                                {/* Key facts */}
                                <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
                                    {[
                                        {
                                            k: "Based in",
                                            v: "Bengaluru, India",
                                        },
                                        {
                                            k: "Focus",
                                            v: "Agentic systems · RAG · Evals",
                                        },
                                        {
                                            k: "Experience",
                                            v: "4+ years shipping software",
                                        },
                                    ].map((row) => (
                                        <div
                                            key={row.k}
                                            className="flex items-center justify-between gap-4 bg-ink/90 px-4 py-3"
                                        >
                                            <dt className="font-mono text-[10px] text-muted uppercase tracking-[0.18em]">
                                                {row.k}
                                            </dt>
                                            <dd className="text-right font-medium text-[13px] text-paper">
                                                {row.v}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>

                                {/* Real handles */}
                                <div className="flex flex-col gap-0.5 border-line border-t pt-5">
                                    <span className="mb-2 font-mono text-[11px] text-muted uppercase tracking-[0.24em]">
                                        Elsewhere
                                    </span>
                                    {[
                                        {
                                            name: "GitHub",
                                            handle: "github.com/anshroshan",
                                            href: siteConfig.links.github,
                                            Icon: IconBrandGithub,
                                        },
                                        {
                                            name: "LinkedIn",
                                            handle: "in/anshroshan",
                                            href: siteConfig.links.linkedin,
                                            Icon: IconBrandLinkedin,
                                        },
                                        {
                                            name: "X",
                                            handle: "@anshzero",
                                            href: siteConfig.links.twitter,
                                            Icon: IconBrandX,
                                        },
                                        {
                                            name: "Blog",
                                            handle: "blog.anshroshan.com",
                                            href: siteConfig.links.blog,
                                            Icon: IconRss,
                                        },
                                        {
                                            name: "Email",
                                            handle: "ianshroshan@gmail.com",
                                            href: "mailto:ianshroshan@gmail.com",
                                            Icon: IconMail,
                                        },
                                    ].map(({ name, handle, href, Icon }) => (
                                        <a
                                            key={name}
                                            href={href}
                                            target={
                                                href.startsWith("mailto")
                                                    ? undefined
                                                    : "_blank"
                                            }
                                            rel="noreferrer noopener"
                                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-accent/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                        >
                                            <Icon
                                                size={16}
                                                stroke={1.7}
                                                className="shrink-0 text-accent"
                                            />
                                            <span className="font-medium text-[13px] text-paper">
                                                {name}
                                            </span>
                                            <span className="ml-auto truncate font-mono text-[11px] text-muted transition-colors group-hover:text-paper">
                                                {handle}
                                            </span>
                                            <IconArrowUpRight
                                                size={13}
                                                className="shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </Reveal>
                </div>
            </section>

            {/* ─── CREDENTIALS ───────────────────────────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
                <Reveal y={16}>
                    <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                        <span className="h-px w-8 bg-accent" />
                        Credentials
                    </span>
                </Reveal>
                <Reveal y={20} delay={0.06}>
                    <h2 className="mt-5 font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl">
                        Certified, verifiable
                    </h2>
                </Reveal>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                    {certifications.map((c, i) => (
                        <Reveal
                            key={c.name}
                            delay={i * 0.06}
                            y={26}
                            className={
                                i < 2 ? "lg:col-span-3" : "lg:col-span-2"
                            }
                        >
                            <article className="glow-card relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm transition-colors duration-500 hover:bg-surface/90 sm:p-6">
                                {/* Official badge as a background flourish,
                                    top-right corner */}
                                {c.badge && (
                                    <Image
                                        src={c.badge}
                                        alt={`${c.name} official badge`}
                                        width={112}
                                        height={112}
                                        aria-hidden
                                        className="pointer-events-none absolute -top-5 -right-5 h-28 w-28 rotate-6 object-contain opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                                    />
                                )}
                                <div className="flex items-start gap-4">
                                    <IssuerMark kind={c.issuerKind} />
                                    <div className="flex min-w-0 flex-col gap-1">
                                        <h3 className="font-display font-semibold text-[17px] text-paper leading-snug tracking-tight">
                                            {c.name}
                                        </h3>
                                        <p className="font-mono text-[11px] text-muted tracking-[0.08em]">
                                            {c.issuer} · {c.year}
                                        </p>
                                    </div>
                                </div>

                                {c.skills && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {c.skills.slice(0, 4).map((s) => (
                                            <span
                                                key={s}
                                                className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                        {c.skills.length > 4 && (
                                            <span className="font-mono text-[10px] text-muted">
                                                +{c.skills.length - 4}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="mt-auto flex items-center justify-between gap-3 border-line border-t pt-4">
                                    {c.credentialId ? (
                                        <span className="font-mono text-[10px] text-muted tracking-[0.08em]">
                                            ID {c.credentialId}
                                        </span>
                                    ) : (
                                        <span className="font-mono text-[10px] text-muted tracking-[0.08em]">
                                            Credly badge
                                        </span>
                                    )}
                                    {c.url ? (
                                        <a
                                            href={c.url}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="group inline-flex items-center gap-1.5 font-mono text-[10.5px] text-accent uppercase tracking-[0.16em] hover:text-accent-2"
                                        >
                                            Verify
                                            <IconArrowUpRight
                                                size={13}
                                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 font-mono text-[10.5px] text-muted uppercase tracking-[0.16em]">
                                            <span
                                                aria-hidden
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{
                                                    background:
                                                        BRAND[c.issuerKind],
                                                }}
                                            />
                                            Earned
                                        </span>
                                    )}
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ─── TIMELINE (three recent + expand) ──────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
                <Reveal y={16}>
                    <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                        <span className="h-px w-8 bg-accent" />
                        Timeline
                    </span>
                </Reveal>
                <Reveal y={20} delay={0.06}>
                    <h2 className="mt-5 mb-10 font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl">
                        How I got here
                    </h2>
                </Reveal>
                <Journey />
            </section>

            {/* ─── STACK ─────────────────────────────────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
                <Reveal y={16}>
                    <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                        <span className="h-px w-8 bg-accent" />
                        Stack
                    </span>
                </Reveal>
                <Reveal y={20} delay={0.06}>
                    <h2 className="mt-5 mb-10 font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl">
                        The tools
                    </h2>
                </Reveal>

                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2">
                    {skillGroups.map((group, i) => {
                        const isPrimary = i === 0;
                        return (
                            <Reveal
                                key={group.title}
                                delay={i * 0.06}
                                className={isPrimary ? "md:col-span-2" : ""}
                            >
                                <div className="relative flex h-full flex-col gap-4 bg-surface/70 p-6 backdrop-blur-xl sm:p-7">
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
                                    <div className="relative flex flex-col gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            {isPrimary && (
                                                <span className="mb-1 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10.5px] text-accent uppercase tracking-[0.18em]">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                                    Primary focus
                                                </span>
                                            )}
                                            <h3 className="font-display font-semibold text-lg text-paper">
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

            {/* ─── GITHUB (cached once per day, see lib/github.ts) ───────────── */}
            {githubStats ? (
                <GithubStats
                    stats={githubStats}
                    contributions={githubContributions}
                />
            ) : null}

            <CTABand
                title={
                    <>
                        Have an AI product to{" "}
                        <span className="text-accent">build?</span>
                    </>
                }
                body="From architecture review to a shipped agentic system — the fastest way to find out if we're a fit is a conversation."
            />
        </main>
    );
}
