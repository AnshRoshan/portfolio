import {
    IconArrowLeft,
    IconArrowUpRight,
    IconBrandGithub,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import PillButton from "@/components/sub/PillButton";
import ProjectCard from "@/components/sub/ProjectCard";
import Reveal from "@/components/sub/Reveal";
import { type ProjectDetail, projects } from "@/data/projects";
import {
    absoluteUrl,
    breadcrumbSchema,
    pageMetadata,
    projectSchema,
} from "@/lib/seo";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

function getProject(slug: string): ProjectDetail | undefined {
    return projects.find((p) => p.slug === slug);
}

export function generateStaticParams(): { slug: string }[] {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};

    const meta = pageMetadata({
        title: project.title,
        description: project.description,
        path: `/projects/${project.slug}`,
        type: "article",
    });
    if (!project.image) return meta;

    const image = project.image.startsWith("http")
        ? project.image
        : absoluteUrl(project.image);
    return {
        ...meta,
        openGraph: {
            ...meta.openGraph,
            images: [
                { url: image, width: 1200, height: 630, alt: project.title },
            ],
        },
        twitter: { ...meta.twitter, images: [image] },
    };
}

function CaseSection({ title, body }: { title: string; body: string }) {
    return (
        <Reveal y={20} className="mt-12">
            <h2 className="font-display font-semibold text-2xl text-paper tracking-tight sm:text-3xl">
                {title}
            </h2>
            <p className="mt-4 max-w-3xl whitespace-pre-line text-base text-muted leading-relaxed">
                {body}
            </p>
        </Reveal>
    );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();

    const moreProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

    const {
        title,
        category,
        year,
        description,
        image,
        tags,
        live,
        github,
        problem,
        approach,
        outcome,
        metrics,
        gallery,
    } = project;

    return (
        <article className="relative mx-auto w-full max-w-6xl px-6 pt-12 pb-24 md:px-10 md:pt-16">
            <JsonLd data={projectSchema(project)} />
            <JsonLd
                data={breadcrumbSchema([
                    { name: "Home", path: "/" },
                    { name: "Projects", path: "/projects" },
                    { name: title, path: `/projects/${slug}` },
                ])}
            />

            <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 rounded-sm font-mono text-muted text-xs uppercase tracking-[0.18em] transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
                <IconArrowLeft size={15} stroke={1.8} /> Back to projects
            </Link>

            {/* Header: full width, at the top */}
            <header className="mt-8 border-line border-b pb-10">
                <p className="font-mono text-accent text-xs uppercase tracking-[0.2em]">
                    {category} · {year}
                </p>
                <h1 className="mt-3 font-display font-semibold text-4xl text-paper leading-tight tracking-tight sm:text-5xl">
                    {title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg text-muted leading-relaxed">
                    {description}
                </p>

                {tags?.length ? (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}

                {live || github ? (
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        {live ? (
                            <PillButton href={live} external>
                                Live site
                                <IconArrowUpRight size={18} stroke={1.8} />
                            </PillButton>
                        ) : null}
                        {github ? (
                            <PillButton href={github} variant="ghost" external>
                                Source
                                <IconBrandGithub size={18} stroke={1.8} />
                            </PillButton>
                        ) : null}
                    </div>
                ) : null}
            </header>

            {/* Cover */}
            {image ? (
                <Image
                    src={image}
                    alt={title}
                    width={1600}
                    height={900}
                    priority
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="mt-10 aspect-[16/9] w-full rounded-2xl border border-line object-cover"
                />
            ) : null}

            {/* Metrics */}
            {metrics?.length ? (
                <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
                    {metrics.map((m) => (
                        <div
                            key={`${m.label}-${m.value}`}
                            className="bg-surface-2/80 p-6"
                        >
                            <div className="font-display font-semibold text-3xl text-accent tracking-tight">
                                {m.value}
                            </div>
                            <div className="mt-1 font-mono text-[11px] text-muted uppercase tracking-[0.18em]">
                                {m.label}
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            {/* Case-study prose sections */}
            {problem ? (
                <CaseSection title="The problem" body={problem} />
            ) : null}
            {approach ? (
                <CaseSection title="Approach & architecture" body={approach} />
            ) : null}
            {outcome ? <CaseSection title="Outcome" body={outcome} /> : null}

            {/* Gallery */}
            {gallery?.length ? (
                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                    {gallery.map((g) => (
                        <Image
                            key={g.url}
                            src={g.url}
                            alt={g.alt || title}
                            width={1200}
                            height={800}
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="w-full rounded-2xl border border-line object-cover"
                        />
                    ))}
                </div>
            ) : null}

            {/* More projects */}
            {moreProjects.length ? (
                <div className="mt-20 border-line border-t pt-12">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <h2 className="font-display font-semibold text-2xl text-paper tracking-tight">
                            More projects
                        </h2>
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-1.5 rounded-sm font-mono text-muted text-xs uppercase tracking-[0.16em] transition-colors hover:text-accent"
                        >
                            View all
                            <IconArrowUpRight
                                size={14}
                                stroke={1.8}
                                className="transition-transform group-hover:translate-x-0.5"
                            />
                        </Link>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {moreProjects.map((p, i) => (
                            <ProjectCard key={p.slug} project={p} index={i} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-16 border-line border-t pt-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-1.5 rounded-sm font-mono text-muted text-xs uppercase tracking-[0.18em] transition-colors hover:text-accent"
                    >
                        <IconArrowLeft size={15} stroke={1.8} /> All projects
                    </Link>
                </div>
            )}
        </article>
    );
}
