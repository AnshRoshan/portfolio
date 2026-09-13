import Link from "next/link";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
    IconMail,
} from "@tabler/icons-react";
import { siteConfig } from "@/config/site";

const Footer = () => {
    return (
        <footer className="relative z-40 mt-24 border-t border-line bg-ink/60 backdrop-blur-xl">
            <div className="mx-auto w-full max-w-[1400px] px-6 py-12 md:px-10">

                {/* Top row */}
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

                    {/* Left - wordmark + tagline + mail */}
                    <div className="flex flex-col gap-3">
                        <Link href="/" aria-label="Ansh Roshan, home">
                            <span className="font-display text-lg font-semibold text-paper">
                                Ansh<span className="text-accent">.</span>
                            </span>
                        </Link>

                        <p className="font-mono text-xs text-muted">
                            Gen AI developer. Building AI products, end to end.
                        </p>

                        <a
                            href="mailto:ianshroshan@gmail.com"
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
                        >
                            <IconMail size={16} stroke={1.6} />
                            ianshroshan@gmail.com
                        </a>
                    </div>

                    {/* Right - nav links + social icons */}
                    <div className="flex flex-col gap-6">

                        {/* Nav links */}
                        <nav aria-label="Footer navigation">
                            <ul className="flex flex-wrap gap-6">
                                {[
                                    { label: "About", href: "/about" },
                                    { label: "Projects", href: "/projects" },
                                    { label: "Blog", href: "https://blog.anshroshan.com" },
                                    { label: "Contact", href: "/contact" },
                                ].map(({ label, href }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="rounded-sm font-mono text-xs uppercase tracking-[0.22em] text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            <a
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="text-muted transition-colors duration-200 hover:text-accent"
                            >
                                <IconBrandGithub size={20} stroke={1.6} />
                            </a>
                            <a
                                href={siteConfig.links.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="text-muted transition-colors duration-200 hover:text-accent"
                            >
                                <IconBrandLinkedin size={20} stroke={1.6} />
                            </a>
                            <a
                                href={siteConfig.links.twitter}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X (Twitter)"
                                className="text-muted transition-colors duration-200 hover:text-accent"
                            >
                                <IconBrandX size={20} stroke={1.6} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="mt-10 border-t border-line pt-6">
                    <p className="font-mono text-xs text-muted">
                        &copy; 2026 Ansh Roshan
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
