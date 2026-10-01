import type { Metadata } from "next";
import CTABand from "@/components/main/CTABand";
import NowBuilding from "@/components/main/NowBuilding";
import ProjectsGallery from "@/components/main/ProjectsGallery";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/sub/Reveal";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
    title: "Projects",
    description:
        "Selected work by Ansh Roshan, from Gen AI models to full-stack products.",
    path: "/projects",
});

// Shipped work in the gallery; in-flight projects get the stage-meter rail.
export default function ProjectsPage() {
    const shipped = projects.filter((p) => p.status !== "building");
    const inFlight = projects.length - shipped.length;
    const domains = new Set(projects.map((p) => p.category)).size;

    return (
        <>
            <PageHeader
                eyebrow="Projects"
                title="Things I have built"
                description="AI models, agentic systems, and the full-stack products around them. This list grows as I ship."
                crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
                meta={[
                    { label: "Shipped", value: `${shipped.length} projects` },
                    { label: "In flight", value: `${inFlight} building` },
                    { label: "Domains", value: `${domains} categories` },
                    {
                        label: "Case studies",
                        value: "Problem → approach → outcome",
                    },
                ]}
            />

            <NowBuilding />

            <section className="relative mx-auto w-full max-w-[1400px] px-6 pt-14 pb-24 md:px-10 md:pt-16 md:pb-32">
                <Reveal y={24}>
                    <ProjectsGallery projects={shipped} />
                </Reveal>
            </section>

            <CTABand
                title={
                    <>
                        Want one of these to be{" "}
                        <span className="text-accent">your system</span>?
                    </>
                }
                body="Every project here started as a message from someone with a problem worth solving. Yours can too."
            />
        </>
    );
}
