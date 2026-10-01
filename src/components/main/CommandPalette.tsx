"use client";

import {
    IconArrowDownRight,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandX,
    IconClipboard,
    IconDownload,
    IconMail,
    IconRocket,
    IconRss,
    IconSearch,
    IconSunHigh,
    IconUser,
    IconWorld,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type Command = {
    group: "Navigate" | "Projects" | "Actions" | "Elsewhere";
    label: string;
    hint?: string;
    Icon: typeof IconWorld;
    run: () => void;
};

const OPEN_EVENT = "portfolio:open-palette";

/** ⌘K palette: sections, projects, and one-key actions. */
export default function CommandPalette() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const commands = useMemo<Command[]>(
        () => [
            {
                group: "Navigate",
                label: "Home",
                Icon: IconWorld,
                run: () => router.push("/"),
            },
            {
                group: "Navigate",
                label: "About",
                Icon: IconUser,
                run: () => router.push("/about"),
            },
            {
                group: "Navigate",
                label: "Projects",
                Icon: IconRocket,
                run: () => router.push("/projects"),
            },
            {
                group: "Navigate",
                label: "Contact",
                Icon: IconMail,
                run: () => router.push("/contact"),
            },
            {
                group: "Navigate",
                label: "Blog",
                hint: "anshroshan.com/blog",
                Icon: IconRss,
                run: () =>
                    window.open(siteConfig.links.blog, "_blank", "noopener"),
            },
            ...projects
                .filter((p) => p.status !== "building")
                .slice(0, 8)
                .map((p) => ({
                    group: "Projects" as const,
                    label: p.title,
                    hint: p.category,
                    Icon: IconArrowDownRight,
                    run: () => router.push(`/projects/${p.slug}`),
                })),
            {
                group: "Actions",
                label: "Toggle theme",
                Icon: IconSunHigh,
                run: () => {
                    const dark =
                        !document.documentElement.classList.contains("dark");
                    document.documentElement.classList.toggle("dark", dark);
                    try {
                        localStorage.setItem(
                            "portfolio-theme",
                            dark ? "dark" : "light"
                        );
                    } catch {
                        /* private mode */
                    }
                },
            },
            {
                group: "Actions",
                label: "Copy email",
                hint: siteConfig.email,
                Icon: IconClipboard,
                run: () =>
                    navigator.clipboard
                        ?.writeText(siteConfig.email)
                        .catch(() => {}),
            },
            {
                group: "Actions",
                label: "Download resume",
                Icon: IconDownload,
                run: () =>
                    window.open(siteConfig.links.resume, "_blank", "noopener"),
            },
            {
                group: "Elsewhere",
                label: "GitHub",
                Icon: IconBrandGithub,
                run: () =>
                    window.open(siteConfig.links.github, "_blank", "noopener"),
            },
            {
                group: "Elsewhere",
                label: "LinkedIn",
                Icon: IconBrandLinkedin,
                run: () =>
                    window.open(
                        siteConfig.links.linkedin,
                        "_blank",
                        "noopener"
                    ),
            },
            {
                group: "Elsewhere",
                label: "X / Twitter",
                Icon: IconBrandX,
                run: () =>
                    window.open(siteConfig.links.twitter, "_blank", "noopener"),
            },
            {
                group: "Elsewhere",
                label: "Instagram",
                Icon: IconBrandInstagram,
                run: () =>
                    window.open(
                        siteConfig.links.instagram,
                        "_blank",
                        "noopener"
                    ),
            },
        ],
        [router]
    );

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return commands;
        return commands.filter((c) => c.label.toLowerCase().includes(q));
    }, [commands, query]);

    const close = () => setOpen(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((o) => !o);
            }
            if (e.key === "Escape") setOpen(false);
        };
        const onOpen = () => setOpen(true);
        window.addEventListener("keydown", onKey);
        window.addEventListener(OPEN_EVENT, onOpen);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener(OPEN_EVENT, onOpen);
        };
    }, []);

    useEffect(() => {
        if (open) {
            setQuery("");
            setActive(0);
            document.body.style.overflow = "hidden";
            const t = setTimeout(() => inputRef.current?.focus(), 40);
            return () => {
                document.body.style.overflow = "";
                clearTimeout(t);
            };
        }
        document.body.style.overflow = "";
    }, [open]);

    useEffect(() => setActive(0), [query]);

    const onInputKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
        } else if (e.key === "Enter" && results[active]) {
            e.preventDefault();
            results[active].run();
            close();
        }
    };

    useEffect(() => {
        listRef.current
            ?.querySelector<HTMLElement>(`[data-cmd="${active}"]`)
            ?.scrollIntoView({ block: "nearest" });
    }, [active]);

    let flatIndex = -1;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && close()}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Command palette"
                >
                    <motion.div
                        initial={{ y: -20, scale: 0.96, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: -12, scale: 0.97, opacity: 0 }}
                        transition={{
                            duration: 0.22,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-2 bg-surface shadow-elev-2"
                    >
                        <div className="flex items-center gap-3 border-line border-b px-4">
                            <IconSearch
                                size={16}
                                stroke={1.8}
                                className="shrink-0 text-muted"
                            />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onInputKey}
                                placeholder="Jump to a page, project, or action…"
                                aria-label="Search commands"
                                className="h-14 flex-1 bg-transparent text-[15px] text-paper outline-none placeholder:text-muted/70"
                            />
                            <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">
                                ESC
                            </kbd>
                        </div>

                        <div
                            ref={listRef}
                            className="max-h-[52vh] overflow-y-auto p-2"
                        >
                            {results.length === 0 && (
                                <p className="px-3 py-8 text-center text-muted text-sm">
                                    No matches for “{query}”.
                                </p>
                            )}
                            {(
                                [
                                    "Navigate",
                                    "Projects",
                                    "Actions",
                                    "Elsewhere",
                                ] as const
                            ).map((group) => {
                                const items = results.filter(
                                    (c) => c.group === group
                                );
                                if (items.length === 0) return null;
                                return (
                                    <div key={group} className="mb-1">
                                        <p className="px-3 pt-2 pb-1 font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
                                            {group}
                                        </p>
                                        {items.map((c) => {
                                            flatIndex += 1;
                                            const i = flatIndex;
                                            return (
                                                <button
                                                    key={c.label + c.group}
                                                    type="button"
                                                    data-cmd={i}
                                                    onClick={() => {
                                                        c.run();
                                                        close();
                                                    }}
                                                    onMouseMove={() =>
                                                        setActive(i)
                                                    }
                                                    className={cn(
                                                        "flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm transition-colors",
                                                        active === i
                                                            ? "border-line-2 bg-accent/10 text-paper"
                                                            : "text-muted hover:text-paper"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "grid h-7 w-7 shrink-0 place-items-center rounded-lg border",
                                                            active === i
                                                                ? "border-accent/40 text-accent"
                                                                : "border-line text-muted"
                                                        )}
                                                    >
                                                        <c.Icon
                                                            size={14}
                                                            stroke={1.7}
                                                        />
                                                    </span>
                                                    <span className="min-w-0 flex-1 truncate">
                                                        {c.label}
                                                    </span>
                                                    {c.hint && (
                                                        <span className="hidden truncate font-mono text-[10px] text-muted/70 sm:block">
                                                            {c.hint}
                                                        </span>
                                                    )}
                                                    {active === i && (
                                                        <span className="font-mono text-[10px] text-accent">
                                                            ↵
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between border-line border-t px-4 py-2.5 font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                            <span>↑↓ navigate · ↵ select</span>
                            <span>⌘K</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function PaletteTrigger({ className = "" }: { className?: string }) {
    return (
        <button
            type="button"
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT))}
            className={cn(
                "inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-fill px-3 font-mono text-[11px] text-muted backdrop-blur-xl transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                className
            )}
        >
            <span aria-hidden>⌘</span>
            <span aria-hidden>K</span>
        </button>
    );
}
