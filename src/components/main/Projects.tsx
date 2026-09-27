import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/sub/Reveal";
import { type Project, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Homepage "Selected work" as a bento: four half-width tiles in two rows,
 * closed by one full-width tile. Order is explicit here (the five the owner
 * wants surfaced); details live in src/data/projects.ts.
 */
const HOME_ORDER = [
    "loupe",
    "llm-benchmark",
    "ragstack",
    "llmrouter",
    "cortex",
] as const;

export default function Projects() {
    const featured = HOME_ORDER.map((slug) =>
        projects.find((p) => p.slug === slug)
    ).filter((p): p is Project => Boolean(p));

    return (
        <section
            id="projects"
            className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-14 md:px-10 md:py-16"
        >
            <SectionHeading
                index="02"
                eyebrow="Selected work"
                title={
                    <>
                        Systems built to be{" "}
                        <span className="text-accent">
                            judged in production
                        </span>
                        .
                    </>
                }
                description="Five systems that show how I think: retrieval, routing, evaluation, review tooling, and real-time collaboration."
                action={
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-medium text-paper text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/50 hover:text-accent"
                    >
                        All {projects.length} projects
                        <IconArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                }
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
                {featured.map((project, i) => {
                    const wide = i === featured.length - 1;
                    return (
                        <Reveal
                            key={project.slug}
                            y={32}
                            delay={0.08 * i}
                            className={cn(
                                "h-full",
                                wide
                                    ? "sm:col-span-2 lg:col-span-12"
                                    : "lg:col-span-6"
                            )}
                        >
                            <BentoCard project={project} wide={wide} />
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}

function BentoCard({
    project,
    wide = false,
}: {
    project: Project;
    wide?: boolean;
}) {
    const title = (
        <h3 className="font-display font-semibold text-paper text-xl leading-tight tracking-tight transition-colors group-hover:text-accent">
            {project.title}
        </h3>
    );
    const tagline = project.tagline && (
        <p className="font-mono text-[10.5px] text-accent/80 uppercase tracking-[0.18em]">
            {project.tagline}
        </p>
    );
    const description = (
        <p className="line-clamp-2 text-muted text-sm leading-relaxed">
            {project.description}
        </p>
    );
    const tags = (
        <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
                <span
                    key={t}
                    className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
                >
                    {t}
                </span>
            ))}
        </div>
    );
    const cta = (
        <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-muted uppercase tracking-[0.16em] transition-colors group-hover:text-accent">
            Case study
            <IconArrowUpRight
                size={13}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            {project.github && (
                <span
                    aria-hidden
                    className="ml-1 inline-flex items-center gap-1 text-muted/70"
                >
                    <IconBrandGithub size={13} stroke={1.8} />
                    code
                </span>
            )}
        </span>
    );

    return (
        <Link
            href={`/projects/${project.slug}`}
            aria-label={`${project.title}: read the case study`}
            className="glow-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface/70 shadow-elev-1 backdrop-blur-sm transition-all duration-500 hover:border-line-2 hover:shadow-elev-2"
        >
            {/* Cover: a fixed-height cinematic strip, not a ratio. Ratio
                covers gave the widest tile a 310px image that pushed the
                section past a viewport; fixed heights keep every row level
                and the whole bento scannable in one screen. */}
            <div
                className={cn(
                    "relative overflow-hidden",
                    wide ? "h-[132px] sm:h-[148px]" : "h-[146px] sm:h-[158px]"
                )}
            >
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={`${project.title} cover`}
                        fill
                        sizes={
                            wide
                                ? "(max-width: 1024px) 100vw, 92vw"
                                : "(max-width: 1024px) 100vw, 46vw"
                        }
                        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        style={
                            project.coverFocus
                                ? { objectPosition: project.coverFocus }
                                : undefined
                        }
                    />
                ) : (
                    <div className="grid h-full w-full place-items-center bg-[linear-gradient(150deg,var(--surface-2),var(--ink))]">
                        <span className="font-display font-semibold text-2xl text-accent/50">
                            {project.title}
                        </span>
                    </div>
                )}
                <div aria-hidden className="img-scrim absolute inset-0" />
                <span className="absolute top-4 left-4 rounded-full border border-media-chip-line bg-media-chip px-2.5 py-1 font-mono text-[9.5px] text-media-chip-fg uppercase tracking-[0.16em] backdrop-blur-md">
                    {project.category}
                </span>
                <span className="absolute top-4 right-4 rounded-full border border-media-chip-line bg-media-chip px-2.5 py-1 font-mono text-[9.5px] text-media-chip-fg/80 uppercase tracking-[0.16em] backdrop-blur-md">
                    {project.year}
                </span>
            </div>

            {wide ? (
                // Full-width tile: copy on the left, meta racked right, so the
                // card reads as a wide band rather than a stretched column.
                <div className="flex flex-1 flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-12 sm:p-6">
                    <div className="flex min-w-0 flex-col gap-2.5 sm:max-w-[56ch]">
                        {title}
                        {tagline}
                        {description}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:flex-nowrap sm:gap-6">
                        {tags}
                        {cta}
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                    {title}
                    {tagline}
                    {description}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                        {tags}
                        {cta}
                    </div>
                </div>
            )}
        </Link>
    );
}
