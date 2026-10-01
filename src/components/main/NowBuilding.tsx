import { IconFlame } from "@tabler/icons-react";
import Link from "next/link";
import Reveal from "@/components/sub/Reveal";
import { StageMeter } from "@/components/sub/StageMeter";
import { buildingProjects, type Project } from "@/data/projects";

/**
 * In-flight projects rail, ported from the reference design: amber "in
 * flight" signal + per-project five-segment stage meters. Sits between the
 * page header and the shipped-work gallery on /projects.
 */
export default function NowBuilding() {
    if (buildingProjects.length === 0) return null;
    return (
        <section className="relative mx-auto w-full max-w-[1400px] px-6 pt-4 md:px-10">
            <Reveal y={24}>
                <div className="mb-6 flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                    </span>
                    <h2 className="font-mono text-[11px] text-paper uppercase tracking-[0.2em]">
                        Now building
                    </h2>
                    <span className="h-px flex-1 bg-gradient-to-r from-line-2 to-transparent" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {buildingProjects.map((p, i) => (
                        <BuildingCard key={p.slug} project={p} index={i} />
                    ))}
                </div>
            </Reveal>
        </section>
    );
}

function BuildingCard({ project, index }: { project: Project; index: number }) {
    const initials = project.title
        .split(/[\s—-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

    return (
        <Link
            href={`/projects/${project.slug}`}
            aria-label={`${project.title}: see the work in flight`}
            className="glow-card group relative flex gap-5 overflow-hidden rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-line-2 hover:shadow-elev-2 sm:p-6"
        >
            {/* Cover thumb: generated art until a real cover exists */}
            <div
                aria-hidden
                className="relative hidden h-auto w-36 shrink-0 overflow-hidden rounded-xl border border-line bg-[linear-gradient(150deg,var(--surface-2),var(--ink))] sm:block"
                style={{
                    backgroundImage: `radial-gradient(120% 90% at 15% 10%, color-mix(in srgb, var(--accent) ${26 - index * 8}%, transparent), transparent 65%), linear-gradient(150deg, var(--surface-2), var(--ink))`,
                }}
            >
                <span className="absolute right-2 bottom-1 font-bold font-display text-4xl text-paper/10">
                    {initials}
                </span>
                <span className="absolute top-2 left-2 grid h-6 w-6 place-items-center rounded-lg border border-accent/30 bg-accent/10">
                    <IconFlame size={12} stroke={1.9} className="text-accent" />
                </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[9.5px] text-amber-400 uppercase tracking-[0.18em]">
                        In flight · {project.stage}
                    </span>
                    <span className="font-mono text-[9.5px] text-muted uppercase tracking-[0.18em]">
                        {project.year}
                    </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-paper leading-tight tracking-tight transition-colors group-hover:text-accent">
                    {project.title}
                </h3>
                <p className="line-clamp-2 text-muted text-sm leading-relaxed">
                    {project.description}
                </p>
                <div className="mt-auto pt-3">
                    <StageMeter stage={project.stage ?? "Idea"} />
                </div>
            </div>
        </Link>
    );
}
