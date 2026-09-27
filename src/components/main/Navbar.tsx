"use client";

import {
    IconArrowUpRight,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
} from "@tabler/icons-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
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
 * Floating, transparent header with a console signature: a mono wordmark with a
 * blinking cyan caret, decode-on-hover nav links (NavItems), and magnetic
 * social icons for one-click direct access. A blurred scrim + hairline fades in
 * after the fold so everything stays legible over scrolling content.
 */
const Navbar = () => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

    return (
        <motion.header
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={
                "sticky top-0 z-50 w-full border-b transition-colors duration-300" +
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
                    <span className="font-medium font-mono text-paper text-sm tracking-tight transition-colors group-hover:text-accent">
                        ansh roshan
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

                {/* Right: CTA + magnetic social icons (desktop) / menu (mobile) */}
                <div className="flex items-center">
                    <div className="hidden items-center gap-1.5 lg:flex">
                        <Link
                            href="/contact"
                            className="group mr-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-semibold text-[13px] text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_var(--accent)]"
                        >
                            Let&apos;s talk
                            <IconArrowUpRight
                                size={14}
                                stroke={2}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>
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
        </motion.header>
    );
};

export default Navbar;
