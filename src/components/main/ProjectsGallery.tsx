"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/sub/ProjectCard";
import type { Project } from "@/data/projects";

/**
 * Scalable projects browser: category filter chips + an animated responsive
 * grid (1 / 2 / 3 columns). Built to stay tidy from a handful of projects up
 * to 20+ — categories are derived from the data, so new ones appear on their
 * own as the list grows. Filtering reflows with a smooth layout animation.
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
                (a, b) => b.count - a.count,
            ),
        ];
    }, [projects]);

    const [active, setActive] = useState("All");

    const filtered =
        active === "All"
            ? projects
            : projects.filter((p) => p.category === active);

    return (
        <div>
            {/* Filter chips */}
            <div className="mb-10 flex flex-wrap gap-2">
                {categories.map(({ label, count }) => {
                    const isActive = active === label;
                    return (
                        <button
                            key={label}
                            type="button"
                            onClick={() => setActive(label)}
                            aria-pressed={isActive}
                            className={`font-mono inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                                isActive
                                    ? "border-accent/40 bg-accent/10 text-accent"
                                    : "border-line text-muted hover:border-accent/40 hover:text-accent"
                            }`}
                        >
                            {label}
                            <span className="text-[10px] opacity-60">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Animated grid */}
            <motion.div
                layout
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((project, idx) => (
                        <motion.div
                            key={project.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <ProjectCard project={project} index={idx} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filtered.length === 0 ? (
                <p className="mt-10 text-muted">
                    No projects in this category yet.
                </p>
            ) : null}
        </div>
    );
}
