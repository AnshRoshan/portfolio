import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import ProjectCard from "@/components/sub/ProjectCard";
import Reveal from "@/components/sub/Reveal";
import SplitReveal from "@/components/sub/SplitReveal";
import { projects } from "@/data/projects";

export default function Projects() {
    // Homepage shows a tight, curated set — at most three. The full list lives
    // on /projects. Control which three via `featured` in src/data/projects.ts.
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

    return (
        <section
            id="projects"
            className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24"
        >
            <div className="mb-14 md:mb-20">
                <Reveal y={24}>
                    <span className="font-mono inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.22em] text-muted">
                        <span className="h-px w-8 bg-accent" />
                        Work
                    </span>
                </Reveal>
                <SplitReveal className="mt-6">
                    <h2 className="text-gradient font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        Selected work
                    </h2>
                </SplitReveal>
                <Reveal delay={0.18} y={20}>
                    <p className="mt-4 max-w-[52ch] text-base text-muted">
                        A few things I have built and shipped, from AI models to
                        full products. More on the way.
                    </p>
                </Reveal>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {featuredProjects.map((project, i) => (
                    <Reveal key={project.slug} delay={i * 0.08} y={36}>
                        <ProjectCard project={project} index={i} />
                    </Reveal>
                ))}
            </div>

            <Reveal delay={0.1} y={20}>
                <div className="mt-14 flex justify-center">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-paper transition-colors hover:text-accent"
                    >
                        View all projects
                        <IconArrowRight
                            size={18}
                            stroke={1.8}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </Reveal>
        </section>
    );
}
