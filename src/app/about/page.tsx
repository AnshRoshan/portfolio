import {
    IconArrowUpRight,
    IconBrandAws,
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandLinkedin,
    IconBrandX,
    IconBriefcase,
    IconDownload,
    IconMail,
    IconMapPin,
    IconRobot,
    IconRss,
    IconTargetArrow,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import CTABand from "@/components/main/CTABand";
import GithubStats from "@/components/main/GithubStats";
import Journey from "@/components/main/Journey";
import SectionHeading from "@/components/sections/SectionHeading";
import PillButton from "@/components/sub/PillButton";
import Reveal from "@/components/sub/Reveal";
import { SkillIcon } from "@/components/sub/SkillIcon";
import SplitReveal from "@/components/sub/SplitReveal";
import { siteConfig } from "@/config/site";
import { type Skill, skillGroups } from "@/data/skills";
import { getGithubContributions, getGithubStats } from "@/lib/github";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

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

type IssuerKind = "anthropic" | "aws" | "google";

// Real issuer brand colors, used to tint the marks and status dots
const ISSUERS: Record<IssuerKind, { label: string; color: string }> = {
    anthropic: { label: "Anthropic", color: "#d97757" },
    aws: { label: "Amazon Web Services", color: "#ff9900" },
    google: { label: "Google Cloud", color: "#4285f4" },
};

type Credential = (typeof certifications)[number];

/* Credentials that ship an official badge image get the feature treatment;
   the rest have only a receipt ID, so they sit in a compact ledger below. */
const featuredCerts = certifications.filter(
    (c): c is Credential & { badge: string; url: string } => Boolean(c.badge)
);
const ledgerCerts = certifications.filter((c) => !c.badge);

function IssuerMark({ kind }: { kind: IssuerKind }) {
    const c = ISSUERS[kind].color;
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

const elsewhere = [
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
];

const facts = [
    {
        k: "Focus",
        v: "Agentic · RAG · Evals",
        Icon: IconTargetArrow,
    },
    {
        k: "Experience",
        v: "4+ years shipping",
        Icon: IconBriefcase,
    },
    {
        k: "Based in",
        v: "Bengaluru, India",
        Icon: IconMapPin,
    },
];

/**
 * The three commitments the lede and the pull-quote actually make, pulled out
 * so the intro has a spine instead of two grey paragraphs of equal weight.
 */
const principles = [
    {
        title: "End to end",
        body: "Agentic backend, the interface users touch, and the deployment that keeps both alive. No hand-offs in the middle.",
    },
    {
        title: "Reliable, not impressive",
        body: "Evals, guardrails, and retrieval that holds up on messy real input — the unglamorous half of shipping AI.",
    },
    {
        title: "Used by people",
        body: "Shipped and running. Real users, real traffic, real consequences when it goes wrong.",
    },
];

/**
 * Identity panel: who this is, the spec-sheet facts, and the real handles.
 * Dotted leaders tie each mono label to its value so the eye can track across
 * the row instead of losing it in the gutter.
 */
function IdentityCard() {
    return (
        <aside className="glow-card relative overflow-hidden rounded-[1.5rem] border border-line bg-[linear-gradient(168deg,var(--surface)_0%,var(--ink)_84%)] shadow-elev-1">
            <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            />
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_70%_60%_at_72%_0%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_72%)]"
            />

            <div className="relative flex flex-col p-6 sm:p-7">
                <div className="flex items-center gap-3.5">
                    <span
                        aria-hidden
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-accent/10"
                    >
                        <IconRobot
                            size={20}
                            stroke={1.6}
                            className="text-accent"
                        />
                    </span>
                    <div className="min-w-0">
                        <p className="font-display font-semibold text-paper text-xl tracking-tight">
                            Ansh Roshan
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-muted uppercase tracking-[0.18em]">
                            AI Engineer @ TCS
                        </p>
                    </div>
                </div>

                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] text-accent uppercase tracking-[0.16em]">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    Open to Gen AI roles
                </span>

                <dl className="mt-6 flex flex-col gap-3 border-line border-t pt-6">
                    {facts.map(({ k, v, Icon }) => (
                        <div key={k} className="flex items-center gap-2.5">
                            <Icon
                                size={13}
                                stroke={1.8}
                                className="shrink-0 text-accent/70"
                            />
                            <dt className="shrink-0 font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                                {k}
                            </dt>
                            <span
                                aria-hidden
                                className="h-px min-w-6 flex-1 bg-[repeating-linear-gradient(90deg,var(--line-2)_0_2px,transparent_2px_6px)]"
                            />
                            <dd className="shrink-0 text-right font-medium text-[13px] text-paper">
                                {v}
                            </dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 border-line border-t pt-5">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-[0.24em]">
                        Elsewhere
                    </span>
                    <div className="mt-1.5 flex flex-col">
                        {elsewhere.map(({ name, handle, href, Icon }) => (
                            <a
                                key={name}
                                href={href}
                                target={
                                    href.startsWith("mailto")
                                        ? undefined
                                        : "_blank"
                                }
                                rel="noreferrer noopener"
                                className="group flex items-center gap-3 rounded-lg py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                                <Icon
                                    size={15}
                                    stroke={1.7}
                                    className="shrink-0 text-accent"
                                />
                                <span className="font-medium text-[13px] text-paper">
                                    {name}
                                </span>
                                <span className="ml-auto truncate font-mono text-[10.5px] text-muted transition-colors group-hover:text-paper/80">
                                    {handle}
                                </span>
                                <IconArrowUpRight
                                    size={12}
                                    className="shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

/** `core` chips are lit (primary toolkit); the rest stay quiet. */
function SkillChip({ skill, core }: { skill: Skill; core?: boolean }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors",
                core
                    ? "border-accent/35 bg-accent/[0.08] text-paper"
                    : "border-line text-muted"
            )}
        >
            <SkillIcon skill={skill} size={14} />
            {skill.name}
        </span>
    );
}

export default async function AboutPage() {
    const [githubStats, githubContributions] = await Promise.all([
        getGithubStats(),
        getGithubContributions(),
    ]);

    // First group is the primary focus; `level: "core"` splits its skills
    // into the toolkit I reach for first and the rest.
    const [primaryGroup, ...supportingGroups] = skillGroups;
    const coreSkills = primaryGroup.skills.filter((s) => s.level === "core");
    const extraSkills = primaryGroup.skills.filter((s) => s.level !== "core");

    return (
        <main className="relative min-h-[100dvh] bg-transparent">
            {/* ─── INTRO ───────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20">
                <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_75%_60%_at_55%_0%,#000,transparent)]" />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 right-4 h-72 w-72 animate-drift rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_15%,transparent),transparent_66%)] blur-2xl"
                />

                <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
                    <Reveal y={16}>
                        <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                            <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
                            About
                        </span>
                    </Reveal>

                    {/* Story on the left, identity panel on the right */}
                    <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-14">
                        <div className="lg:col-span-7">
                            <SplitReveal>
                                <h1 className="font-display font-semibold text-4xl text-paper leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                                    I build AI that makes it to{" "}
                                    <span className="text-accent">
                                        production.
                                    </span>
                                </h1>
                            </SplitReveal>

                            <Reveal delay={0.12} y={18}>
                                <p className="mt-7 max-w-[54ch] text-base text-muted leading-relaxed sm:text-lg">
                                    Gen AI Developer at TCS. I design and ship
                                    end-to-end AI products, from the agentic
                                    backend to the interface users actually
                                    touch — LangChain, LangGraph, RAG
                                    architectures, and multi-model
                                    orchestration, with full ownership of
                                    deployment on the other end.
                                </p>
                            </Reveal>

                            <Reveal delay={0.2} y={18}>
                                <div className="mt-9 flex flex-wrap items-center gap-4">
                                    <PillButton href="/contact" sweep>
                                        Get in touch
                                    </PillButton>
                                    <PillButton
                                        href={siteConfig.links.resume}
                                        variant="ghost"
                                        external
                                    >
                                        Download resume{" "}
                                        <IconDownload size={18} stroke={1.8} />
                                    </PillButton>
                                </div>
                            </Reveal>

                            <Reveal delay={0.28} y={20}>
                                <figure className="mt-11 border-accent/60 border-l-2 pl-5 sm:pl-6">
                                    <blockquote className="font-display text-paper text-xl leading-snug tracking-tight sm:text-2xl">
                                        Not demos. Shipped products, running in
                                        production, used by real people.
                                    </blockquote>
                                    <figcaption className="mt-3 font-mono text-[10.5px] text-muted uppercase tracking-[0.2em]">
                                        The bar I hold myself to
                                    </figcaption>
                                </figure>
                            </Reveal>
                        </div>

                        <Reveal delay={0.1} y={26} className="lg:col-span-5">
                            <IdentityCard />
                        </Reveal>
                    </div>

                    {/* Principles — hairline-ruled, no card chrome */}
                    <div className="mt-16 grid gap-y-9 border-line border-t pt-10 sm:grid-cols-3 sm:gap-x-9 md:mt-20">
                        {principles.map((p, i) => (
                            <Reveal
                                key={p.title}
                                delay={i * 0.07}
                                y={20}
                                className={
                                    i > 0
                                        ? "sm:border-line sm:border-l sm:pl-9"
                                        : undefined
                                }
                            >
                                <div className="flex flex-col gap-2.5">
                                    <span className="font-mono text-[10.5px] text-accent/70 tabular-nums tracking-[0.3em]">
                                        {`0${i + 1}`}
                                    </span>
                                    <h2 className="font-display font-semibold text-lg text-paper tracking-tight">
                                        {p.title}
                                    </h2>
                                    <p className="max-w-[38ch] text-muted text-sm leading-relaxed">
                                        {p.body}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CREDENTIALS ───────────────────────────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
                <SectionHeading
                    index="01"
                    eyebrow="Credentials"
                    title="Certified, verifiable"
                    description="Every credential here is real and checkable. The two with a public badge link straight through to the issuer's page; the rest show the receipt ID you can look up yourself."
                    action={
                        <span className="font-mono text-[10.5px] text-muted uppercase tracking-[0.18em]">
                            {featuredCerts.length} public badges ·{" "}
                            {ledgerCerts.length} receipt IDs
                        </span>
                    }
                />

                {/* Feature: the two credentials with an official badge image.
                    The PNGs are the square Credly badge with its transparent
                    canvas trimmed off, so a square box shows them whole. */}
                <div className="mt-14 grid gap-5 lg:grid-cols-2">
                    {featuredCerts.map((c, i) => {
                        const brand = ISSUERS[c.issuerKind];
                        return (
                            <Reveal
                                key={c.name}
                                delay={i * 0.08}
                                y={26}
                                className="h-full"
                            >
                                <article className="glow-card group relative flex h-full flex-col gap-5 overflow-hidden rounded-[1.5rem] border border-line bg-[linear-gradient(165deg,var(--surface)_0%,var(--ink)_82%)] p-6 shadow-elev-1 sm:p-7">
                                    {/* Accent hairline in the issuer's colour */}
                                    <span
                                        aria-hidden
                                        className="absolute inset-x-0 top-0 h-px"
                                        style={{
                                            backgroundImage: `linear-gradient(90deg, transparent, ${brand.color}66, transparent)`,
                                        }}
                                    />

                                    {/* Badge sits beside the issuer and title
                                        so the heading gets real width on a
                                        phone instead of stacking into one
                                        squeezed column. */}
                                    <div className="relative flex items-start gap-4 sm:gap-5">
                                        <a
                                            href={c.url}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            tabIndex={-1}
                                            aria-hidden
                                            className="shrink-0"
                                        >
                                            <Image
                                                src={c.badge}
                                                alt=""
                                                width={352}
                                                height={352}
                                                sizes="120px"
                                                className="h-[92px] w-[92px] rounded-2xl border border-line object-contain opacity-90 transition-opacity duration-500 group-hover:opacity-100 sm:h-[124px] sm:w-[124px]"
                                            />
                                        </a>

                                        <div className="flex min-w-0 flex-col items-start gap-2.5 sm:gap-3.5">
                                            <span
                                                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                                                style={{
                                                    borderColor: `${brand.color}3d`,
                                                    background: `${brand.color}12`,
                                                    color: brand.color,
                                                }}
                                            >
                                                {brand.label} · {c.year}
                                            </span>

                                            <h3 className="font-display font-semibold text-paper text-xl leading-[1.15] tracking-tight sm:text-2xl">
                                                {c.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {c.skills && (
                                        <div className="relative flex flex-wrap gap-1.5">
                                            {c.skills.map((s) => (
                                                <span
                                                    key={s}
                                                    className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="relative mt-auto flex items-center justify-between gap-3 border-line border-t pt-4">
                                        <span className="font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                                            Public badge
                                        </span>
                                        <a
                                            href={c.url}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="link-sweep inline-flex items-center gap-1.5 font-mono text-[10.5px] text-accent uppercase tracking-[0.16em] transition-colors hover:text-accent-2"
                                        >
                                            Verify
                                            <IconArrowUpRight
                                                size={12}
                                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </a>
                                    </div>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>

                {/* Ledger: everything without a public link, as one ruled table */}
                <div className="mt-5 grid overflow-hidden rounded-[1.5rem] border border-line shadow-elev-1 md:grid-cols-3">
                    {ledgerCerts.map((c, i) => {
                        const brand = ISSUERS[c.issuerKind];
                        return (
                            <Reveal
                                key={c.name}
                                delay={0.16 + i * 0.06}
                                y={22}
                                className="h-full"
                            >
                                <div
                                    className={cn(
                                        "flex h-full flex-col gap-4 bg-surface/70 p-5 shadow-elev-1 sm:p-6",
                                        i > 0 &&
                                            "border-line border-t md:border-t-0 md:border-l"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <IssuerMark kind={c.issuerKind} />
                                        <div className="min-w-0">
                                            <p className="font-display font-semibold text-paper text-sm tracking-tight">
                                                {c.issuer}
                                            </p>
                                            <p className="font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                                                {c.year}
                                            </p>
                                        </div>
                                    </div>

                                    <h3 className="font-display font-semibold text-[15px] text-paper leading-snug tracking-tight">
                                        {c.name}
                                    </h3>

                                    <div className="mt-auto flex items-center justify-between gap-3 border-line border-t pt-3.5">
                                        <span className="font-mono text-[10px] text-muted tracking-[0.08em]">
                                            {c.credentialId
                                                ? `ID ${c.credentialId}`
                                                : "Skill badge"}
                                        </span>
                                        <span className="inline-flex items-center gap-2 font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                                            <span
                                                aria-hidden
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{
                                                    background: brand.color,
                                                }}
                                            />
                                            Earned
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* ─── TIMELINE (three recent + expand) ──────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
                <SectionHeading
                    index="02"
                    eyebrow="Timeline"
                    title="How I got here"
                    description="The chapters that actually moved the work: platform engineering, then the move into generative AI, then owning agentic systems end to end."
                />
                <div className="mt-14">
                    <Journey />
                </div>
            </section>

            {/* ─── STACK ─────────────────────────────────────────────────────── */}
            <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
                <SectionHeading
                    index="03"
                    eyebrow="Stack"
                    title="The tools"
                    description="What I reach for, roughly in the order I reach for it. Gen AI first, then the languages and infrastructure that carry it."
                />

                {/* One dominant panel for the primary focus, a 2×2 bento for
                    everything that carries it. Core skills (`level: "core"`
                    in src/data/skills) get a lit chip so the hierarchy is
                    data-driven instead of decorative. */}
                <div className="mt-14 grid gap-5 lg:grid-cols-12">
                    <Reveal y={26} className="lg:col-span-5">
                        <div className="glow-card relative flex h-full flex-col gap-6 overflow-hidden rounded-[1.5rem] border border-line bg-[linear-gradient(160deg,var(--surface)_0%,var(--ink)_82%)] p-6 shadow-elev-1 sm:p-7">
                            <span
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_90%_at_0%_0%,color-mix(in_srgb,var(--accent)_13%,transparent),transparent_58%)]"
                            />

                            <div className="relative flex flex-col gap-2.5">
                                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] text-accent uppercase tracking-[0.18em]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                    Primary focus
                                </span>
                                <h3 className="font-display font-semibold text-2xl text-paper tracking-tight">
                                    {primaryGroup.title}
                                </h3>
                                <p className="max-w-[42ch] text-muted text-sm leading-relaxed">
                                    {primaryGroup.blurb}
                                </p>
                            </div>

                            <div className="relative flex flex-col gap-3.5">
                                <span className="font-mono text-[10px] text-muted uppercase tracking-[0.24em]">
                                    Core
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {coreSkills.map((skill) => (
                                        <SkillChip
                                            key={skill.name}
                                            skill={skill}
                                            core
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="relative mt-auto flex flex-col gap-3.5 border-line border-t pt-5">
                                <span className="font-mono text-[10px] text-muted uppercase tracking-[0.24em]">
                                    Also in the box
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {extraSkills.map((skill) => (
                                        <SkillChip
                                            key={skill.name}
                                            skill={skill}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                        {supportingGroups.map((group, i) => (
                            <Reveal
                                key={group.title}
                                delay={0.08 * (i + 1)}
                                y={24}
                                className="h-full"
                            >
                                <div className="flex h-full flex-col gap-3.5 rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl transition-colors duration-500 hover:border-line-2 sm:p-6">
                                    <div className="flex flex-col gap-1.5">
                                        <h3 className="font-display font-semibold text-lg text-paper tracking-tight">
                                            {group.title}
                                        </h3>
                                        <p className="text-muted text-sm">
                                            {group.blurb}
                                        </p>
                                    </div>
                                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                                        {group.skills.map((skill) => (
                                            <SkillChip
                                                key={skill.name}
                                                skill={skill}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── GITHUB (cached once per day, see lib/github.ts) ───────────── */}
            {githubStats ? (
                <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20">
                    <SectionHeading
                        index="04"
                        eyebrow="Open source"
                        title="On GitHub"
                        description="The projects are public, the commits are real, and the calendar below is a year of it. Everything here comes straight from the GitHub API."
                    />
                    <div className="mt-14">
                        <GithubStats
                            stats={githubStats}
                            contributions={githubContributions}
                        />
                    </div>
                </section>
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
