import {
    IconArrowUpRight,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
    IconClock,
    IconDownload,
    IconLocation,
    IconRss,
} from "@tabler/icons-react";

import type { Metadata } from "next";
import ContactForm from "@/components/sub/ContactForm";
import CopyEmail from "@/components/sub/CopyEmail";
import PillButton from "@/components/sub/PillButton";
import Reveal from "@/components/sub/Reveal";
import SplitReveal from "@/components/sub/SplitReveal";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Contact",
    description:
        "Get in touch with Ansh Roshan, AI Engineer building RAG pipelines, agentic systems, and full-stack products. Open to collaborations and conversations.",
    path: "/contact",
});

const EMAIL = siteConfig.email;

/** Direct channels, in the order they answer fastest. */
const elsewhere = [
    {
        label: "GitHub",
        sub: "Code, tools, and open source",
        href: siteConfig.links.github,
        Icon: IconBrandGithub,
    },
    {
        label: "LinkedIn",
        sub: "The professional record",
        href: siteConfig.links.linkedin,
        Icon: IconBrandLinkedin,
    },
    {
        label: "X / Twitter",
        sub: "Notes and updates",
        href: siteConfig.links.twitter,
        Icon: IconBrandX,
    },
    {
        label: "Blog",
        sub: "Longer write-ups on what shipped",
        href: siteConfig.links.blog,
        Icon: IconRss,
    },
    {
        label: "Instagram",
        sub: "Occasional off-screen notes",
        href: siteConfig.links.instagram,
        Icon: IconBrandInstagram,
    },
];

export default function ContactPage() {
    return (
        <section className="relative min-h-[100dvh] bg-transparent">
            <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-12 pb-28 md:px-10 md:pt-16">
                {/* Statement header */}
                <div className="flex max-w-3xl flex-col gap-7">
                    <Reveal y={16}>
                        <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                            <span className="h-px w-8 bg-accent" />
                            Contact
                        </span>
                    </Reveal>
                    <SplitReveal delay={0.05}>
                        <h1 className="font-display font-semibold text-4xl text-paper leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                            Let&rsquo;s build something that holds up in
                            production.
                        </h1>
                    </SplitReveal>
                    <Reveal y={20} delay={0.1}>
                        <p className="max-w-[52ch] text-base text-muted leading-relaxed sm:text-lg">
                            Agentic systems, RAG pipelines, AI-powered internal
                            tools, or full products around them — if it needs to
                            survive real traffic, I&rsquo;m interested. Email is
                            the fastest way to reach me.
                        </p>
                    </Reveal>
                    <Reveal y={16} delay={0.13}>
                        <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-[11px] text-accent uppercase tracking-[0.18em]">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                            </span>
                            Available for new projects
                        </span>
                    </Reveal>
                </div>

                <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                    {/* LEFT COLUMN — direct channels. Sticky so it stays put
                        while the (much taller) form scrolls past. */}
                    <div className="flex flex-col gap-4 lg:sticky lg:top-28">
                        {/* Primary: email, with a copy-to-clipboard slab */}
                        <Reveal y={20} delay={0.05}>
                            <CopyEmail email={EMAIL} />
                        </Reveal>

                        {/* Secondary exit: the resume, for people who came to
                            check credentials rather than start a thread. */}
                        <Reveal y={20} delay={0.08}>
                            <div className="flex flex-col items-stretch gap-3 rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl sm:flex-row sm:items-center">
                                <span className="font-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                                    Or skip the intro
                                </span>
                                <PillButton
                                    href={siteConfig.links.resume}
                                    variant="ghost"
                                    external
                                    className="sm:ml-auto"
                                >
                                    Resume
                                    <IconDownload size={16} stroke={1.8} />
                                </PillButton>
                            </div>
                        </Reveal>

                        {/* Context rows */}
                        <Reveal y={20} delay={0.1}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl">
                                    <IconLocation
                                        size={18}
                                        strokeWidth={1.5}
                                        className="text-accent"
                                    />
                                    <p className="mt-3 font-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                                        Based in
                                    </p>
                                    <p className="mt-1 text-paper text-sm">
                                        Bengaluru, India
                                    </p>
                                </div>
                                <div className="rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl">
                                    <IconClock
                                        size={18}
                                        strokeWidth={1.5}
                                        className="text-accent"
                                    />
                                    <p className="mt-3 font-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                                        Replies in
                                    </p>
                                    <p className="mt-1 text-paper text-sm">
                                        ~24 hours
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        {/* Socials as pointer-tracking glow tiles */}
                        <Reveal y={20} delay={0.15}>
                            <div className="rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl">
                                <p className="mb-4 font-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                                    Elsewhere
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {elsewhere.map(
                                        ({ label, sub, href, Icon }, i) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className={`glow-card group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-line bg-ink/40 p-4 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${i === elsewhere.length - 1 && elsewhere.length % 2 === 1 ? "col-span-2" : ""}`}
                                            >
                                                <span className="flex items-center justify-between gap-2">
                                                    <Icon
                                                        size={16}
                                                        strokeWidth={1.7}
                                                        className="text-accent"
                                                    />
                                                    <IconArrowUpRight
                                                        size={14}
                                                        strokeWidth={1.5}
                                                        className="text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                                                    />
                                                </span>
                                                <span className="font-medium text-paper text-sm transition-colors group-hover:text-accent">
                                                    {label}
                                                </span>
                                                <span className="text-muted text-xs leading-snug">
                                                    {sub}
                                                </span>
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT COLUMN — form */}
                    <Reveal y={28} delay={0.12}>
                        <div className="relative">
                            {/* Accent glow behind the form card, driven by the
                                token so it also works in the light theme. */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -inset-x-4 -top-10 bottom-0 -z-10 rounded-[1.5rem] opacity-70 blur-3xl"
                                style={{
                                    background:
                                        "radial-gradient(60% 50% at 70% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)",
                                }}
                            />
                            <div className="rounded-[1.5rem] border border-line bg-surface/70 p-6 shadow-elev-2 backdrop-blur-xl sm:p-8 md:p-10">
                                <h2 className="font-display font-semibold text-paper text-xl tracking-tight">
                                    Write me directly
                                </h2>
                                <p className="mt-1.5 text-muted text-sm">
                                    A couple of lines about what you&rsquo;re
                                    building is plenty.
                                </p>
                                <ContactForm />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
