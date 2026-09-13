import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import PillButton from "@/components/sub/PillButton";
import Reveal from "@/components/sub/Reveal";
import { SkillIcon } from "@/components/sub/SkillIcon";
import SplitReveal from "@/components/sub/SplitReveal";

/**
 * Home-page "The stack" — the AI-first skills summary. Leaner than the
 * /about breakdown: group titles plus chips, core skills lit, one CTA to
 * the full story. Lives right after the project work so the homepage reads
 * work-first, then proof-of-skill.
 */
export default function Stack() {
    const [genai, ...rest] = skillGroups;
    const shipped = projects.filter((p) => p.status !== "building");

    return (
        <section
            id="stack"
            className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-6 py-16 md:px-10 md:py-24"
        >
            <div className="mb-12 md:mb-16">
                <Reveal y={24}>
                    <span className="font-mono inline-flex items-center gap-2.5 text-sm uppercase tracking-[0.22em] text-[#9a9aa4]">
                        <span className="h-px w-8 bg-[#22d3ee]" />
                        Stack
                    </span>
                </Reveal>
                <SplitReveal className="mt-6">
                    <h2 className="text-gradient font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        The stack, AI first.
                    </h2>
                </SplitReveal>
                <Reveal delay={0.18} y={20}>
                    <p className="mt-4 max-w-[58ch] text-base text-[#9a9aa4]">
                        Everything below is exercised by the {shipped.length}{" "}
                        shipped projects above and the work in flight — not a
                        wish list.
                    </p>
                </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 md:grid-cols-2">
                {/* Gen AI group spans full width — it is the headline act */}
                <Reveal className="md:col-span-2">
                    <div className="relative flex h-full flex-col gap-5 bg-[#131316]/70 p-8 backdrop-blur-xl">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    "radial-gradient(120% 100% at 0% 0%, rgba(34,211,238,0.10), transparent 55%)",
                            }}
                        />
                        <div className="relative flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <span className="font-mono mb-2 inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-[#22d3ee]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                                    Primary focus
                                </span>
                                <h3 className="font-display text-lg font-medium text-[#e7e7ea]">
                                    {genai.title}
                                </h3>
                                <p className="mt-1 text-sm text-[#9a9aa4]">
                                    {genai.blurb}
                                </p>
                            </div>
                            <PillButton
                                href="/about"
                                variant="ghost"
                                className="shrink-0"
                            >
                                Full breakdown
                            </PillButton>
                        </div>
                        <div className="relative flex flex-wrap gap-2">
                            {genai.skills.map((skill) => (
                                <span
                                    key={skill.name}
                                    className={
                                        "font-mono inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs " +
                                        (skill.level === "core"
                                            ? "border-[#22d3ee]/25 bg-[#22d3ee]/[0.06] text-[#e7e7ea]"
                                            : "border-white/10 text-[#9a9aa4]")
                                    }
                                >
                                    <SkillIcon skill={skill} size={14} />
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {rest.map((group, i) => (
                    <Reveal key={group.title} delay={0.06 * (i + 1)}>
                        <div className="flex h-full flex-col gap-4 bg-[#131316]/70 p-8 backdrop-blur-xl">
                            <div>
                                <h3 className="font-display text-lg font-medium text-[#e7e7ea]">
                                    {group.title}
                                </h3>
                                <p className="mt-1 text-sm text-[#9a9aa4]">
                                    {group.blurb}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs text-[#9a9aa4]"
                                    >
                                        <SkillIcon skill={skill} size={14} />
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
