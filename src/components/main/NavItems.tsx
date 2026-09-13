"use client";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin);

const navItems = [
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Blogs", link: "https://blog.anshroshan.com" },
    { name: "Contact", link: "/contact" },
];

/**
 * Desktop nav. Each link decodes on hover: a GSAP scramble shuffles the glyphs
 * through `01<>/[]#$` and resolves back to the label, with a cyan underline
 * drawing in underneath. The "decode" reads as a Gen-AI/terminal signature
 * rather than a generic sliding pill. Active route stays lit + underlined.
 */
const NavItems = () => {
    const pathname = usePathname();
    return (
        <nav className="flex items-center gap-8">
            {navItems.map((item) => {
                const active =
                    pathname === item.link ||
                    pathname?.startsWith(`${item.link}/`);
                return (
                    <ScrambleLink
                        key={item.name}
                        name={item.name}
                        link={item.link}
                        active={!!active}
                    />
                );
            })}
        </nav>
    );
};

function ScrambleLink({
    name,
    link,
    active,
}: {
    name: string;
    link: string;
    active: boolean;
}) {
    const textRef = useRef<HTMLSpanElement>(null);
    const hovering = useRef(false);
    const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );

    function decode() {
        if (!textRef.current) return;
        gsap.to(textRef.current, {
            duration: 0.5,
            ease: "none",
            scrambleText: { text: name, chars: "01<>/[]#$", speed: 1.4 },
        });
    }

    // Decode only on a genuine hover. The debounced leave means tiny cursor
    // jitter at the link's edge is not treated as leaving + re-entering, so the
    // scramble never re-fires on and off.
    function onEnter() {
        clearTimeout(leaveTimer.current);
        if (hovering.current) return;
        hovering.current = true;
        decode();
    }
    function onLeave() {
        leaveTimer.current = setTimeout(() => {
            hovering.current = false;
        }, 140);
    }

    return (
        <Link
            href={link}
            target={link.startsWith("http") ? "_blank" : undefined}
            rel={link.startsWith("http") ? "noreferrer" : undefined}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onFocus={decode}
            className={
                "group relative rounded-md px-2 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink " +
                (active
                    ? "text-accent"
                    : "text-muted hover:text-paper")
            }
        >
            <span ref={textRef}>{name}</span>
            <span
                aria-hidden
                className={
                    "absolute bottom-1 left-2 right-2 h-px origin-left bg-accent transition-transform duration-300 ease-out " +
                    (active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100")
                }
            />
        </Link>
    );
}

export default NavItems;
