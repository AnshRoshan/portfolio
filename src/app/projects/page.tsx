import type { Metadata } from "next";
import ProjectsGallery from "@/components/main/ProjectsGallery";
import Reveal from "@/components/sub/Reveal";
import SplitReveal from "@/components/sub/SplitReveal";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Projects",
    description:
        "Selected work by Ansh Roshan, from Gen AI models to full-stack products.",
    path: "/projects",
});

// Shipped work only; in-flight projects live in the home page's
// "Now building" rail.
export default function ProjectsPage() {
    const shipped = projects.filter((p) => p.status !== "building");
    return (
        <section className="relative mx-auto w-full max-w-[1400px] px-6 pt-12 pb-24 md:px-10 md:pt-16 md:pb-32">
            <div className="mb-14 md:mb-20">
                <Reveal y={24}>
                    <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                        <span className="h-px w-8 bg-accent" />
                        Projects
                    </span>
                </Reveal>
                <SplitReveal className="mt-6">
                    <h1 className="font-display font-semibold text-4xl text-gradient tracking-tight sm:text-5xl lg:text-6xl">
                        Things I have built
                    </h1>
                </SplitReveal>
                <Reveal delay={0.18} y={20}>
                    <p className="mt-4 max-w-[58ch] text-base text-muted">
                        AI models, agentic systems, and the full-stack products
                        around them. This list grows as I ship.
                    </p>
                </Reveal>
            </div>

            <Reveal y={24}>
                <ProjectsGallery projects={shipped} />
            </Reveal>
        </section>
    );
}
