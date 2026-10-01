"use client";

import {
    IconArrowUpRight,
    IconLayoutGrid,
    IconList,
    IconSearch,
    IconX,
} from "@tabler/icons-react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/sub/ProjectCard";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

/**
 * Projects browser, ported from the reference design's toolbar system:
 * layoutId sliding filter pill, live search, grid/list views, and
 * load-more paging. Categories derive from data, so new ones appear alone.
 */
export default function ProjectsGallery({ projects }: { projects: Project[] }) {
    const categories = useMemo(() => {
        const counts = new Map<string, number>();
        for (const p of projects) {
            counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
        }
        return [
            { label: "All", count: projects.length },
            ...Array.from(counts, ([label, count]) => ({ label, count })).sort(
                (a, b) => b.count - a.count
            ),
        ];
    }, [projects]);

    const [active, setActive] = useState("All");
    const [query, setQuery] = useState("");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [limit, setLimit] = useState(PAGE_SIZE);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return projects.filter((p) => {
            if (active !== "All" && p.category !== active) return false;
            if (!q) return true;
            return (
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q))
            );
        });
    }, [projects, active, query]);

    const visible = filtered.slice(0, limit);
    const remaining = filtered.length - visible.length;
    const isFiltered = active !== "All" || query.trim() !== "";

    return (
        <MotionConfig reducedMotion="never">
            <div>
                {/* Toolbar: filter pills + search + view toggle */}
                <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(({ label, count }) => {
                            const isActive = active === label;
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => {
                                        setActive(label);
                                        setLimit(PAGE_SIZE);
                                    }}
                                    aria-pressed={isActive}
                                    className={cn(
                                        "relative inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
                                        isActive
                                            ? "border-transparent text-ink"
                                            : "text-muted hover:text-paper"
                                    )}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="cat-pill"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 32,
                                            }}
                                            className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                                        />
                                    )}
                                    <span className="relative z-10">
                                        {label}
                                    </span>
                                    <span className="relative z-10 text-[10px] opacity-60">
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 lg:w-64 lg:flex-none">
                            <IconSearch
                                size={15}
                                stroke={1.8}
                                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
                            />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setLimit(PAGE_SIZE);
                                }}
                                placeholder="Search projects…"
                                aria-label="Search projects"
                                className="h-11 w-full rounded-full border border-line bg-surface/70 pr-9 pl-10 text-paper text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted/70 focus:border-accent/60 [&::-webkit-search-cancel-button]:hidden"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    aria-label="Clear search"
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted transition-colors hover:text-paper"
                                >
                                    <IconX size={14} stroke={2} />
                                </button>
                            )}
                        </div>

                        {/* Grid / list capsule */}
                        <div className="flex shrink-0 items-center gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-sm">
                            {(
                                [
                                    { key: "grid", Icon: IconLayoutGrid },
                                    { key: "list", Icon: IconList },
                                ] as const
                            ).map(({ key, Icon }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setView(key)}
                                    aria-label={`${key} view`}
                                    aria-pressed={view === key}
                                    className={cn(
                                        "grid h-9 w-9 place-items-center rounded-full transition-colors",
                                        view === key
                                            ? "bg-paper text-ink"
                                            : "text-muted hover:text-paper"
                                    )}
                                >
                                    <Icon size={16} stroke={1.8} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {visible.length === 0 ? (
                    <div className="grid place-items-center rounded-[1.5rem] border border-line-2 border-dashed px-6 py-16 text-center">
                        <p className="text-muted">
                            Nothing matches that search — yet.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setActive("All");
                                setQuery("");
                            }}
                            className="mt-3 font-mono text-accent text-xs uppercase tracking-[0.16em] hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : view === "grid" ? (
                    <motion.div
                        layout
                        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        <AnimatePresence mode="popLayout">
                            {visible.map((project, idx) => (
                                <motion.div
                                    key={project.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <ProjectCard
                                        project={project}
                                        index={idx}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="overflow-hidden rounded-[1.5rem] border border-line">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {visible.map((project, idx) => (
                                <motion.div
                                    key={project.slug}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.25,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="group grid grid-cols-[2.2rem_1fr_auto] items-center gap-3 border-line border-b bg-surface/40 px-4 py-4 transition-colors last:border-b-0 hover:bg-paper/[0.03] sm:grid-cols-[2.2rem_1.6fr_2fr_5.5rem_3.5rem_2rem] sm:gap-4 sm:px-6"
                                    >
                                        <span className="font-mono text-[11px] text-muted">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-display font-semibold text-base text-paper tracking-tight transition-colors group-hover:text-accent sm:text-lg">
                                            {project.title}
                                        </span>
                                        <span className="hidden truncate font-mono text-[11px] text-muted sm:block">
                                            {project.tags
                                                .slice(0, 3)
                                                .join(" · ")}
                                        </span>
                                        <span className="hidden rounded-full border border-line px-2.5 py-1 font-mono text-[9.5px] text-muted uppercase tracking-[0.14em] sm:block">
                                            {project.category}
                                        </span>
                                        <span className="hidden font-mono text-[11px] text-muted sm:block">
                                            {project.year}
                                        </span>
                                        <IconArrowUpRight
                                            size={16}
                                            className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Load more */}
                {remaining > 0 && (
                    <div className="mt-10 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setLimit((l) => l + PAGE_SIZE)}
                            className="sweep inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-6 py-3 text-paper text-sm backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent"
                        >
                            Show more
                            <span className="font-mono text-[11px] text-muted">
                                · {remaining} remaining
                            </span>
                        </button>
                    </div>
                )}
                {isFiltered && filtered.length > PAGE_SIZE && (
                    <p className="mt-6 text-center font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                        {filtered.length} match
                        {filtered.length === 1 ? "" : "es"}
                    </p>
                )}
            </div>
        </MotionConfig>
    );
}
