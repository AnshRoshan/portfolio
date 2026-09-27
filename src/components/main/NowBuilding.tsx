import { IconBrandGithub } from "@tabler/icons-react";
import TerminalCard from "@/components/sections/TerminalCard";
import Reveal from "@/components/sub/Reveal";
import SplitReveal from "@/components/sub/SplitReveal";
import { buildingProjects, type ProjectStage } from "@/data/projects";

const STAGES: ProjectStage[] = ["Idea", "Prototype", "Alpha", "Beta", "Live"];

function StageMeter({ stage }: { stage?: ProjectStage }) {
    const idx = stage ? STAGES.indexOf(stage) : 0;
    return (
        <div
            className="flex items-center gap-3"
            aria-label={`Stage: ${stage ?? "Idea"}`}
        >
            <div className="flex gap-1" aria-hidden>
                {STAGES.map((s, i) => (
                    <span
                        key={s}
                        className={
                            "h-1.5 w-6 rounded-full transition-colors" +
                            (i <= idx ? "bg-accent" : "bg-fill")
                        }
                    />
                ))}
            </div>
            <span className="font-mono text-[11px] text-muted uppercase tracking-[0.18em]">
                {stage ?? "Idea"}
            </span>
        </div>
    );
}

/**
 * "Now building" — the work-in-progress board. Header spans the top; the
 * cards take the full width below in an even grid. Recruiter signal: the
 * bench is active, and each effort carries an honest stage meter
 * (Idea → Live). Driven entirely by projects with status "building" in
 * src/data/projects.ts.
 */
export default function NowBuilding() {
    if (!buildingProjects.length) return null;

    return (
        <section
            id="now"
            className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-16 md:px-10 md:py-24"
        >
            <div className="relative overflow-hidden rounded-[24px] border border-line bg-[linear-gradient(135deg,var(--surface-2)_0%,var(--ink)_60%)] p-6 sm:p-10 lg:p-14">
                {/* Soft mint bloom, matching the About portrait glow */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]"
                />

                {/* Header row: eyebrow + heading left, intro right */}
                <div className="relative flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
                    <div>
                        <Reveal y={24}>
                            <span className="inline-flex items-center gap-2.5 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                                <span className="h-px w-8 bg-accent" />
                                In flight
                            </span>
                        </Reveal>
                        <SplitReveal className="mt-5">
                            <h2 className="font-display font-semibold text-4xl text-gradient tracking-tight sm:text-5xl">
                                Now building
                            </h2>
                        </SplitReveal>
                    </div>
                    <Reveal delay={0.18} y={20}>
                        <p className="max-w-[46ch] pb-1 text-base text-muted">
                            AI systems currently on the bench. Each one moves
                            from prototype to live here as it matures — same
                            pipeline as everything above.
                        </p>
                    </Reveal>
                </div>

                {/* Cards: full width grid; the live agent trace closes the row */}
                <div className="relative mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {buildingProjects.map((p, i) => (
                        <Reveal
                            key={p.slug}
                            delay={0.08 * i}
                            y={28}
                            className="h-full"
                        >
                            <article className="glow-card group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur transition-colors duration-300 hover:border-accent/40 sm:p-7">
                                <div className="flex items-start justify-between gap-3">
                                    <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent uppercase tracking-[0.14em]">
                                        {p.category}
                                    </span>
                                    {p.github ? (
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            aria-label={`${p.title} on GitHub`}
                                            className="rounded-md p-1.5 text-muted transition-colors hover:text-accent"
                                        >
                                            <IconBrandGithub
                                                size={18}
                                                stroke={1.6}
                                            />
                                        </a>
                                    ) : (
                                        <span className="font-mono text-[11px] text-muted uppercase tracking-[0.18em]">
                                            {p.year}
                                        </span>
                                    )}
                                </div>

                                <h3 className="mt-4 font-display font-semibold text-2xl text-paper tracking-tight transition-colors group-hover:text-accent">
                                    {p.title}
                                </h3>
                                <p className="mt-2.5 max-w-[62ch] text-muted text-sm leading-relaxed sm:text-[15px]">
                                    {p.description}
                                </p>

                                <div className="mt-auto pt-6">
                                    <div className="flex flex-wrap gap-1.5">
                                        {p.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-5 border-line border-t pt-4">
                                        <StageMeter stage={p.stage} />
                                    </div>
                                </div>
                            </article>
                        </Reveal>
                    ))}

                    <Reveal
                        delay={0.24}
                        y={28}
                        className="flex h-full flex-col justify-center gap-3"
                    >
                        <TerminalCard />
                        <p className="text-center font-mono text-[10.5px] text-muted uppercase tracking-[0.16em]">
                            Illustrative trace · RAGStack pipeline
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
