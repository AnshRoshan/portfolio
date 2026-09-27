"use client";

import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/projects";

/**
 * Compact project card for the homepage "Selected work" 3-up and the full
 * /projects gallery. Image-led, with a cursor-following mint spotlight (adapted
 * from a pattern we liked), hover-revealed action buttons, and a 2-line clamped
 * description so long copy never blows up the card. Cool Ink + Mint.
 */
export default function ProjectCard({
    project,
    index,
}: {
    project: Project;
    index?: number;
}) {
    const {
        slug,
        title,
        category,
        description,
        tags,
        image,
        live,
        github,
        year,
    } = project;
    const ref = useRef<HTMLElement>(null);

    function onMove(e: React.MouseEvent<HTMLElement>) {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        // 3D tilt: rotate toward the cursor, capped so it reads as depth, not
        // gimmick. Sits on top of the group-hover translate via a wrapper var.
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", `${(-py * 4).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(px * 6).toFixed(2)}deg`);
    }

    function onLeave() {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
    }

    return (
        <div className="group h-full">
            <article
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                style={{
                    transform:
                        "perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--ty, 0px))",
                    transition:
                        "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, background-color 0.3s",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
                className="glow-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-elev-1 backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-surface hover:shadow-elev-2 group-hover:[--ty:-4px]"
            >
                {/* Cursor-following mint spotlight */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background:
                            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), rgba(34,211,238,0.12), transparent 70%)",
                    }}
                />

                {/* Media */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                    ) : (
                        <div className="grid h-full w-full place-items-center bg-[radial-gradient(120%_120%_at_30%_0%,rgba(34,211,238,0.20),transparent_55%)]">
                            <span className="px-6 text-center font-display font-semibold text-paper/90 text-xl tracking-tight">
                                {title}
                            </span>
                        </div>
                    )}
                    <div className="img-scrim absolute inset-0" />

                    {/* Hover action buttons */}
                    <div className="absolute top-3 right-3 z-30 flex translate-y-1 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {live ? (
                            <a
                                href={live}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${title} live site`}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ink transition-colors hover:bg-accent-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                            >
                                <IconArrowUpRight size={16} stroke={2} />
                            </a>
                        ) : null}
                        {github ? (
                            <a
                                href={github}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${title} on GitHub`}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-media-chip-line bg-media-chip text-media-chip-fg backdrop-blur-md transition-colors hover:border-accent/60 hover:bg-media-chip focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                            >
                                <IconBrandGithub size={16} stroke={2} />
                            </a>
                        ) : null}
                    </div>

                    {/* Category badge. On-media plate, not a light pill: these
                        covers fade to white across their bottom third, which is
                        exactly where this badge sits. */}
                    <span className="absolute bottom-3 left-3 z-10 rounded-full border border-media-chip-line bg-media-chip px-3 py-1 font-mono text-[10px] text-media-chip-fg uppercase tracking-[0.18em] backdrop-blur-md">
                        {category}
                    </span>
                </div>

                {/* Faint index watermark */}
                {typeof index === "number" ? (
                    <span
                        aria-hidden
                        className="pointer-events-none absolute right-3 bottom-0 z-[5] font-display font-semibold text-7xl text-fill leading-none"
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>
                ) : null}

                {/* Body */}
                <div className="relative z-10 flex flex-1 flex-col gap-2.5 p-5">
                    <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display font-semibold text-lg text-paper tracking-tight transition-colors group-hover:text-accent">
                            <Link
                                href={`/projects/${slug}`}
                                className="rounded-sm before:absolute before:inset-0 before:z-10 before:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                            >
                                {title}
                            </Link>
                        </h3>
                        <span className="shrink-0 font-mono text-muted text-xs">
                            {year}
                        </span>
                    </div>

                    <p className="line-clamp-2 text-muted text-sm leading-relaxed">
                        {description}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
                        {tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                            >
                                {tag}
                            </span>
                        ))}
                        {tags.length > 3 ? (
                            <span className="font-mono text-[10px] text-muted">
                                +{tags.length - 3}
                            </span>
                        ) : null}
                    </div>
                </div>
            </article>
        </div>
    );
}
