import {
    IconArrowUpRight,
    IconClock,
    IconLocation,
    IconMail,
} from "@tabler/icons-react";

import Reveal from "@/components/sub/Reveal";
import SplitReveal from "@/components/sub/SplitReveal";
import { siteConfig } from "@/config/site";

export const metadata = {
    title: "Contact",
};

const EMAIL = "ianshroshan@gmail.com";

const inputClasses =
    "w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-paper placeholder:text-muted/60 outline-none transition focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/40";

export default function ContactPage() {
    return (
        <section className="relative min-h-[100dvh] bg-transparent">
            <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pt-12 md:pt-16 pb-28">
                {/* Statement header */}
                <div className="flex max-w-3xl flex-col gap-7">
                    <Reveal y={16}>
                        <span className="font-mono inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.22em] text-muted">
                            <span className="h-px w-8 bg-accent" />
                            Contact
                        </span>
                    </Reveal>
                    <SplitReveal delay={0.05}>
                        <h1 className="text-gradient font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                            Let&rsquo;s build something that holds up in
                            production.
                        </h1>
                    </SplitReveal>
                    <Reveal y={20} delay={0.1}>
                        <p className="max-w-[52ch] text-base leading-relaxed text-muted">
                            Agentic systems, RAG pipelines, AI-powered internal
                            tools, or full products around them — if it needs
                            to survive real traffic, I&rsquo;m interested.
                            Email is the fastest way to reach me.
                        </p>
                    </Reveal>
                    <Reveal y={16} delay={0.13}>
                        <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                            </span>
                            Available for new projects
                        </span>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                    {/* LEFT COLUMN — direct channels */}
                    <div className="flex flex-col gap-4">
                        {/* Primary: email */}
                        <Reveal y={20} delay={0.05}>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                            >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                                    <IconMail size={19} strokeWidth={1.5} />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="font-mono block text-[10px] uppercase tracking-[0.22em] text-muted">
                                        Email — fastest
                                    </span>
                                    <span className="mt-0.5 block truncate font-mono text-sm tracking-wide text-paper transition-colors group-hover:text-accent">
                                        {EMAIL}
                                    </span>
                                </span>
                                <IconArrowUpRight
                                    size={16}
                                    strokeWidth={1.5}
                                    className="shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                                />
                            </a>
                        </Reveal>

                        {/* Context rows */}
                        <Reveal y={20} delay={0.1}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-xl">
                                    <IconLocation
                                        size={18}
                                        strokeWidth={1.5}
                                        className="text-accent"
                                    />
                                    <p className="font-mono mt-3 text-[10px] uppercase tracking-[0.22em] text-muted">
                                        Based in
                                    </p>
                                    <p className="mt-1 text-sm text-paper">
                                        Bengaluru, India
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-xl">
                                    <IconClock
                                        size={18}
                                        strokeWidth={1.5}
                                        className="text-accent"
                                    />
                                    <p className="font-mono mt-3 text-[10px] uppercase tracking-[0.22em] text-muted">
                                        Replies in
                                    </p>
                                    <p className="mt-1 text-sm text-paper">
                                        ~24 hours
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        {/* Socials */}
                        <Reveal y={20} delay={0.15}>
                            <div className="rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-xl">
                                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                                    Elsewhere
                                </p>
                                <div className="mt-3 flex flex-col">
                                    {[
                                        {
                                            label: "GitHub",
                                            sub: "Code, tools, and open source",
                                            href: siteConfig.links.github,
                                        },
                                        {
                                            label: "LinkedIn",
                                            sub: "The professional record",
                                            href: siteConfig.links.linkedin,
                                        },
                                        {
                                            label: "X / Twitter",
                                            sub: "Notes and updates",
                                            href: siteConfig.links.twitter,
                                        },
                                    ].map(({ label, sub, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-between gap-4 border-t border-line py-3 first:border-t-0 first:pt-0 last:pb-0"
                                        >
                                            <span>
                                                <span className="block text-sm font-medium text-paper transition-colors group-hover:text-accent">
                                                    {label}
                                                </span>
                                                <span className="block text-xs text-muted">
                                                    {sub}
                                                </span>
                                            </span>
                                            <IconArrowUpRight
                                                size={15}
                                                strokeWidth={1.5}
                                                className="shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT COLUMN — form */}
                    <Reveal y={28} delay={0.12}>
                        <div className="relative h-full">
                            {/* Mint glow behind the form card */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -inset-x-4 -top-10 bottom-0 -z-10 rounded-[32px] opacity-60 blur-3xl"
                                style={{
                                    background:
                                        "radial-gradient(60% 50% at 70% 0%, rgba(34,211,238,0.16), transparent 70%)",
                                }}
                            />
                            <div className="h-full rounded-[24px] border border-line bg-surface/70 p-8 backdrop-blur-xl md:p-10">
                                <h2 className="font-display text-xl font-semibold tracking-tight text-paper">
                                    Write me directly
                                </h2>
                                <p className="mt-1.5 text-sm text-muted">
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
                                            className="font-mono mb-2 block text-xs uppercase tracking-[0.22em] text-muted"
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
                                            className="font-mono mb-2 block text-xs uppercase tracking-[0.22em] text-muted"
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
                                            className="font-mono mb-2 block text-xs uppercase tracking-[0.22em] text-muted"
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
                                            className="font-mono mb-2 block text-xs uppercase tracking-[0.22em] text-muted"
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
                                            className="font-mono mb-2 block text-xs uppercase tracking-[0.22em] text-muted"
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
                                                inputClasses + " resize-none"
                                            }
                                        />
                                    </div>

                                    <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-1">
                                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                                            No spam. No newsletters.
                                        </p>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-accent-2 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                                        >
                                            Send message
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
