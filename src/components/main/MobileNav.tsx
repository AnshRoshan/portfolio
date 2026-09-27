"use client";

import {
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
    IconMenu2,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Blog", link: "https://blog.anshroshan.com" },
];

const socials = [
    { name: "GitHub", link: siteConfig.links.github, icon: IconBrandGithub },
    {
        name: "LinkedIn",
        link: siteConfig.links.linkedin,
        icon: IconBrandLinkedin,
    },
    { name: "X (Twitter)", link: siteConfig.links.twitter, icon: IconBrandX },
    {
        name: "Instagram",
        link: siteConfig.links.instagram,
        icon: IconBrandInstagram,
    },
];

export function MobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button
                    type="button"
                    aria-label="Open menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-fill text-paper backdrop-blur-xl transition-colors hover:border-line-2 hover:bg-fill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                    <IconMenu2 size={20} stroke={1.6} />
                </button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-[300px] border-line bg-ink/95 backdrop-blur-xl"
            >
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="font-display font-semibold text-lg text-paper tracking-tight"
                        >
                            Ansh Roshan
                        </Link>
                        <ThemeToggle />
                    </div>

                    <nav className="mt-10 flex flex-col gap-1">
                        {navItems.map((item) => {
                            const active =
                                pathname === item.link ||
                                pathname?.startsWith(`${item.link}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.link}
                                    onClick={() => setOpen(false)}
                                    target={
                                        item.link.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        item.link.startsWith("http")
                                            ? "noreferrer"
                                            : undefined
                                    }
                                    className={
                                        "rounded-xl px-4 py-3 font-display font-medium text-2xl tracking-tight transition-colors" +
                                        (active
                                            ? "text-accent"
                                            : "text-muted hover:bg-fill hover:text-paper")
                                    }
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-medium text-ink text-sm uppercase tracking-[0.12em] transition-colors hover:bg-accent-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                    >
                        Get in touch
                    </Link>

                    <div className="mt-auto flex items-center gap-2 pt-10">
                        {socials.map(({ name, link, icon: Icon }) => (
                            <a
                                key={name}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={name}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                            >
                                <Icon size={18} stroke={1.5} />
                            </a>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
