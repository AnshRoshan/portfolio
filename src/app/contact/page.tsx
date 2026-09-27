import {
    IconArrowUpRight,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
    IconClock,
    IconDownload,
    IconLocation,
    IconMail,
    IconRss,
} from "@tabler/icons-react";

import type { Metadata } from "next";
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

// Inputs sit on --surface-2, not a translucent surface: on a light card a
// `bg-surface/60` field is the same value as the card behind it and the form
// reads as a blank panel.
const inputClasses =
    "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-paper placeholder:text-muted/70 outline-none transition focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/40";

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
                        {/* Primary: email */}
                        <Reveal y={20} delay={0.05}>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="group flex items-center gap-4 rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                                    <IconMail size={19} strokeWidth={1.5} />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block font-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                                        Email — fastest
                                    </span>
                                    <span className="mt-0.5 block truncate font-mono text-paper text-sm tracking-wide transition-colors group-hover:text-accent">
                                        {EMAIL}
                                    </span>
                                </span>
                                <IconArrowUpRight
                                    size={16}
                                    strokeWidth={1.5}
                                    className="shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                                />
                            </a>
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

                        {/* Socials */}
                        <Reveal y={20} delay={0.15}>
                            <div className="rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl">
                                <p className="font-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                                    Elsewhere
                                </p>
                                <div className="mt-3 flex flex-col">
                                    {elsewhere.map(
                                        ({ label, sub, href, Icon }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="group flex items-center gap-3 border-line border-t py-3 first:border-t-0 first:pt-0 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                            >
                                                <Icon
                                                    size={15}
                                                    strokeWidth={1.7}
                                                    className="shrink-0 text-accent"
                                                />
                                                <span className="min-w-0 flex-1">
                                                    <span className="block font-medium text-paper text-sm transition-colors group-hover:text-accent">
                                                        {label}
                                                    </span>
                                                    <span className="block text-muted text-xs">
                                                        {sub}
                                                    </span>
                                                </span>
                                                <IconArrowUpRight
                                                    size={15}
                                                    strokeWidth={1.5}
                                                    className="shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                                                />
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
                                <form
                                    method="post"
                                    action="https://rake.red/api/anshroshan/me"
                                    className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2"
                                >
                                    {/* Honeypot - hidden from humans, visible to bots */}
                                    <div style={{ display: "none" }}>
                                        <input
                                            type="text"
                                            name="honeypot"
                                            id="honeypot"
                                            autoComplete="off"
                                            tabIndex={-1}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="first-name"
                                            className="mb-2 block font-mono text-muted text-xs uppercase tracking-[0.22em]"
                                        >
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            required
                                            placeholder="Ada"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="last-name"
                                            className="mb-2 block font-mono text-muted text-xs uppercase tracking-[0.22em]"
                                        >
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            placeholder="Lovelace"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block font-mono text-muted text-xs uppercase tracking-[0.22em]"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            required
                                            placeholder="you@company.com"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="company"
                                            className="mb-2 block font-mono text-muted text-xs uppercase tracking-[0.22em]"
                                        >
                                            Company{" "}
                                            <span className="normal-case tracking-normal opacity-60">
                                                (optional)
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            id="company"
                                            autoComplete="organization"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block font-mono text-muted text-xs uppercase tracking-[0.22em]"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={5}
                                            required
                                            placeholder="What are you building?"
                                            className={
                                                inputClasses + "resize-none"
                                            }
                                        />
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1 sm:col-span-2">
                                        <p className="max-w-[34ch] font-mono text-[11px] text-muted leading-relaxed tracking-[0.08em]">
                                            Lands straight in my inbox. I reply
                                            within a day, no newsletter.
                                        </p>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 font-medium text-ink text-sm uppercase tracking-[0.12em] transition-colors hover:bg-accent-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.97]"
                                        >
                                            Send message
                                            <IconArrowUpRight
                                                size={16}
                                                stroke={1.9}
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
