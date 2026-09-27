import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/sub/Reveal";
import { type Project, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Homepage "Selected work" as a bento: the lead project takes a tall
 * 7-column tile spanning two rows, two partners stack beside it, and two
 * half-width tiles close the row. Order is explicit here (the five the
 * owner wants surfaced); details live in src/data/projects.ts.
 */
const HOME_ORDER = [
    "ragstack",
    "llmrouter",
    "loupe",
    "llm-benchmark",
    "cortex",
] as const;

export default function Projects() {
    const featured = HOME_ORDER.map((slug) =>
        projects.find((p) => p.slug === slug)
    ).filter((p): p is Project => Boolean(p));
    const [lead, ...rest] = featured;

    return (
        <section
            id="projects"
            className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-16 md:px-10 md:py-20"
        >
            <SectionHeading
                index="01"
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

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
                {lead && (
                    <Reveal
                        y={32}
                        className="h-full sm:col-span-2 lg:col-span-7 lg:row-span-2"
                    >
                        <BentoCard project={lead} lead />
                    </Reveal>
                )}
                {rest.map((project, i) => (
                    <Reveal
                        key={project.slug}
                        y={32}
                        delay={0.08 * (i + 1)}
                        className={cn(
                            "h-full",
                            i < 2 ? "lg:col-span-5" : "lg:col-span-6"
                        )}
                    >
                        <BentoCard project={project} />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}

function BentoCard({
    project,
    lead = false,
}: {
    project: Project;
    lead?: boolean;
}) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            aria-label={`${project.title}: read the case study`}
            className="glow-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface/50 backdrop-blur-sm transition-colors duration-500 hover:border-line-2"
        >
            {/* Cover */}
            <div
                className={cn(
                    "relative overflow-hidden",
                    lead ? "aspect-[16/9]" : "aspect-[16/8]"
                )}
            >
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={`${project.title} cover`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="grid h-full w-full place-items-center bg-[linear-gradient(150deg,var(--surface-2),var(--ink))]">
                        <span className="font-display font-semibold text-2xl text-accent/50">
                            {project.title}
                        </span>
                    </div>
                )}
                <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent"
                />
                <span className="absolute top-4 left-4 rounded-full border border-line bg-ink/70 px-2.5 py-1 font-mono text-[9.5px] text-paper uppercase tracking-[0.16em] backdrop-blur-md">
                    {project.category}
                </span>
                <span className="absolute top-4 right-4 rounded-full border border-line bg-ink/70 px-2.5 py-1 font-mono text-[9.5px] text-paper/80 uppercase tracking-[0.16em] backdrop-blur-md">
                    {project.year}
                </span>
            </div>

            {/* Body */}
            <div
                className={cn(
                    "flex flex-1 flex-col gap-3 p-5 sm:p-6",
                    lead && "sm:gap-4 sm:p-7"
                )}
            >
                <h3
                    className={cn(
                        "font-display font-semibold text-paper leading-tight tracking-tight transition-colors group-hover:text-accent",
                        lead ? "text-2xl sm:text-3xl" : "text-xl"
                    )}
                >
                    {project.title}
                </h3>
                {project.tagline && (
                    <p className="font-mono text-[10.5px] text-accent/80 uppercase tracking-[0.18em]">
                        {project.tagline}
                    </p>
                )}
                <p className="line-clamp-2 text-muted text-sm leading-relaxed">
                    {project.description}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
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
                </div>
            </div>
        </Link>
    );
}
