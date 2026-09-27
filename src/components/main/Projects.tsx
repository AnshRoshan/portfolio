import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/sub/Reveal";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Homepage "Selected work": the featured projects as large alternating
 * case-study rows (cover + narrative), replacing the small 3-card grid —
 * the full grid lives on /projects. Control the set via `featured` in
 * src/data/projects.ts.
 */
export default function Projects() {
    const featured = projects.filter((p) => p.featured).slice(0, 3);

    return (
        <section
            id="projects"
            className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-16 md:px-10 md:py-24"
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
                description="The projects that best show how I think: an AI code reviewer, a model evaluation harness, and a hybrid retrieval engine."
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

            <div className="mt-14 flex flex-col gap-6 lg:gap-8">
                {featured.map((project, i) => {
                    const reverse = i % 2 === 1;
                    return (
                        <Reveal key={project.slug} delay={0.05} y={36}>
                            <Link
                                href={`/projects/${project.slug}`}
                                className="group block"
                                aria-label={`${project.title}: read the case study`}
                            >
                                <article
                                    className={cn(
                                        "glow-card relative grid overflow-hidden rounded-[2rem] border border-line bg-surface/50 backdrop-blur-sm transition-colors duration-700 hover:border-line-2 lg:grid-cols-[1.08fr_1fr]",
                                        reverse && "lg:grid-cols-[1fr_1.08fr]"
                                    )}
                                >
                                    {/* Cover */}
                                    <div
                                        className={cn(
                                            "relative min-h-[240px] overflow-hidden lg:min-h-[380px]",
                                            reverse && "lg:order-2"
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
                                        <span className="absolute top-4 left-4 rounded-full border border-line bg-ink/70 px-2.5 py-1 font-mono text-[9.5px] text-paper uppercase tracking-[0.16em] backdrop-blur-md">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div
                                        className={cn(
                                            "flex flex-col justify-center gap-5 p-7 sm:p-9 lg:p-10",
                                            reverse && "lg:order-1"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-[10px] text-accent/70 uppercase tracking-[0.28em]">
                                                {project.category}
                                            </span>
                                            <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
                                            <span className="font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
                                                {project.year}
                                            </span>
                                        </div>

                                        <h3 className="font-display font-semibold text-2xl text-paper leading-[1.1] tracking-tight transition-colors group-hover:text-accent sm:text-3xl lg:text-4xl">
                                            {project.title}
                                        </h3>

                                        <p className="max-w-[56ch] text-muted text-sm leading-relaxed sm:text-[15px]">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags
                                                .slice(0, 5)
                                                .map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 pt-1">
                                            <span className="inline-flex items-center gap-2 font-medium text-[13px] text-paper transition-colors group-hover:text-accent">
                                                Read the case study
                                                <IconArrowUpRight
                                                    size={15}
                                                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                />
                                            </span>
                                            {project.github && (
                                                <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[12px] text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                                                    <IconBrandGithub
                                                        size={14}
                                                        stroke={1.8}
                                                    />
                                                    Source
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
