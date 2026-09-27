"use client";

import {
    IconArrowUp,
    IconArrowUpRight,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
    IconMail,
    IconMapPin,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

const EMAIL = "ianshroshan@gmail.com";

const nav = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: siteConfig.links.blog, external: true },
    { label: "Contact", href: "/contact" },
];

const socials = [
    { label: "GitHub", href: siteConfig.links.github, Icon: IconBrandGithub },
    {
        label: "LinkedIn",
        href: siteConfig.links.linkedin,
        Icon: IconBrandLinkedin,
    },
    { label: "X (Twitter)", href: siteConfig.links.twitter, Icon: IconBrandX },
    {
        label: "Instagram",
        href: siteConfig.links.instagram,
        Icon: IconBrandInstagram,
    },
];

/** Live IST clock in the bottom bar — "I'm awake, write me". */
function IstClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata",
        });
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    if (!time) return null;
    return (
        <span className="inline-flex items-center gap-2 text-accent/80">
            <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            IST {time}
        </span>
    );
}

function BackToTop() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 700);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={
                "fixed right-5 bottom-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/85 text-paper backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" +
                (show
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0")
            }
        >
            <IconArrowUp size={16} stroke={1.8} />
        </button>
    );
}

const Footer = () => {
    // Five shipped projects for the "Selected work" column, in data order.
    const featuredWork = projects
        .filter((p) => p.status !== "building")
        .slice(0, 5);

    return (
        <footer className="relative z-40 mt-8 overflow-hidden border-line border-t bg-ink/70 backdrop-blur-xl">
            {/* Accent hairline glow across the top edge */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
            />

            <div className="relative mx-auto w-full max-w-[1400px] px-6 py-16 sm:py-20 md:px-10">
                <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] lg:gap-10">
                    {/* Brand */}
                    <div className="flex flex-col gap-5">
                        <Link
                            href="/"
                            aria-label="Ansh Roshan, home"
                            className="group inline-flex w-fit items-center gap-1"
                        >
                            <span className="font-medium font-mono text-paper text-sm tracking-tight transition-colors group-hover:text-accent">
                                ansh roshan
                            </span>
                            <span
                                aria-hidden
                                className="ml-0.5 inline-block h-[15px] w-[7px] translate-y-px bg-accent caret-blink"
                            />
                        </Link>

                        <p className="max-w-sm text-muted text-sm leading-relaxed">
                            Building agentic systems, retrieval pipelines and
                            LLM products that hold up in production. Currently
                            at TCS, Bengaluru.
                        </p>

                        <a
                            href={`mailto:${EMAIL}`}
                            className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-fill/40 px-4 py-2.5 text-[13px] text-muted transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/40 hover:text-paper"
                        >
                            <IconMail
                                size={15}
                                className="text-accent"
                                stroke={1.8}
                            />
                            {EMAIL}
                            <IconArrowUpRight
                                size={13}
                                className="opacity-40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                            />
                        </a>
                    </div>

                    {/* Navigate */}
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-[11px] text-muted uppercase tracking-[0.24em]">
                            Navigate
                        </span>
                        <ul className="flex flex-col gap-2.5">
                            {nav.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        target={
                                            l.external ? "_blank" : undefined
                                        }
                                        rel={
                                            l.external
                                                ? "noreferrer"
                                                : undefined
                                        }
                                        className="link-sweep inline-block w-fit text-muted text-sm transition-colors hover:text-paper"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Selected work */}
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-[11px] text-muted uppercase tracking-[0.24em]">
                            Selected work
                        </span>
                        <ul className="flex flex-col gap-2.5">
                            {featuredWork.map((p) => (
                                <li key={p.slug}>
                                    <Link
                                        href={`/projects/${p.slug}`}
                                        className="link-sweep inline-block w-fit text-muted text-sm transition-colors hover:text-paper"
                                    >
                                        {p.title.split(" — ")[0]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Elsewhere */}
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-[11px] text-muted uppercase tracking-[0.24em]">
                            Elsewhere
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                            {socials.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    aria-label={label}
                                    className="group flex items-center gap-2.5 rounded-xl border border-line bg-fill/30 px-3 py-2.5 text-[12.5px] text-muted transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/35 hover:bg-accent/5 hover:text-paper"
                                >
                                    <Icon
                                        size={14}
                                        stroke={1.8}
                                        className="transition-colors group-hover:text-accent"
                                    />
                                    <span className="truncate">{label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Giant outline wordmark */}
                <div
                    aria-hidden
                    className="relative mt-16 select-none sm:mt-20"
                >
                    <span className="block font-bold font-display text-[clamp(2.6rem,13vw,10rem)] text-transparent leading-[0.85] tracking-[-0.055em] [-webkit-text-stroke:1px_var(--line-2)]">
                        ANSH ROSHAN
                    </span>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col gap-5 border-line border-t pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] text-muted uppercase tracking-[0.14em]">
                        <span>© {new Date().getFullYear()} Ansh Roshan</span>
                        <span className="hidden h-3 w-px bg-line sm:block" />
                        <span className="inline-flex items-center gap-1.5">
                            <IconMapPin size={12} stroke={1.8} />
                            Bengaluru, India
                        </span>
                        <span className="hidden h-3 w-px bg-line sm:block" />
                        <IstClock />
                    </div>

                    <p className="font-mono text-[10.5px] text-muted uppercase tracking-[0.14em]">
                        Next.js · Tailwind v4 · GSAP
                    </p>
                </div>
            </div>

            <BackToTop />
        </footer>
    );
};

export default Footer;
