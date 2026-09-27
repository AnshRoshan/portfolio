"use client";

import {
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import MagneticSocial from "../sub/MagneticSocial";
import { MobileNav } from "./MobileNav";
import NavItems from "./NavItems";
import { ThemeToggle } from "./ThemeToggle";

const socials = [
    { name: "GitHub", href: siteConfig.links.github, icon: IconBrandGithub },
    {
        name: "LinkedIn",
        href: siteConfig.links.linkedin,
        icon: IconBrandLinkedin,
    },
    { name: "X (Twitter)", href: siteConfig.links.twitter, icon: IconBrandX },
    {
        name: "Instagram",
        href: siteConfig.links.instagram,
        icon: IconBrandInstagram,
    },
];

/**
 * Floating, transparent header with a console signature: a mono wordmark with
 * a blinking cyan caret, decode-on-hover nav links (NavItems), and magnetic
 * social icons. A blurred scrim + hairline fades in after the fold. Plain
 * scroll listener + CSS page-in — no framer-motion in the critical path.
 */
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={
                "page-in sticky top-0 z-50 w-full border-b transition-colors duration-300" +
                (scrolled
                    ? "border-line bg-ink/60 backdrop-blur-xl"
                    : "border-transparent")
            }
        >
            <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6 md:px-10">
                {/* Wordmark: mono name + blinking terminal caret */}
                <Link
                    href="/"
                    aria-label="Ansh Roshan, home"
                    className="group inline-flex items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
                >
                    <span className="font-mono text-paper text-sm tracking-tight transition-colors group-hover:text-accent">
                        Ansh Roshan
                    </span>
                    <span
                        aria-hidden
                        className="ml-0.5 inline-block h-[15px] w-[7px] translate-y-px bg-accent caret-blink"
                    />
                </Link>

                {/* Center: decode-on-hover nav (desktop) */}
                <div className="hidden lg:flex">
                    <NavItems />
                </div>

                {/* Right: magnetic social icons (desktop) / menu (mobile) */}
                <div className="flex items-center">
                    <div className="hidden items-center gap-1.5 lg:flex">
                        {socials.map(({ name, href, icon: Icon }) => (
                            <MagneticSocial key={name} href={href} label={name}>
                                <Icon size={19} stroke={1.5} />
                            </MagneticSocial>
                        ))}
                        <ThemeToggle className="ml-2" />
                    </div>
                    <div className="lg:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
