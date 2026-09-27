import { IconCloudUpload, IconCode, IconRobot } from "@tabler/icons-react";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/sub/Reveal";
import { focusAreas } from "@/data/content";

const icons = {
    "gen-ai": IconRobot,
    "full-stack": IconCode,
    delivery: IconCloudUpload,
} as const;

/**
 * "Three lanes, one through-line" — the capability grid. Cards use the
 * glow-ring + pointer-spotlight treatment; content mirrors /about.
 */
export default function FocusAreas() {
    return (
        <section className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
            <SectionHeading
                index="01"
                eyebrow="What I do"
                title={
                    <>
                        Three lanes, one{" "}
                        <span className="text-accent">through-line</span>.
                    </>
                }
                description="Reliability. Every project starts with the same question: what happens when this is wrong, and how fast will we know?"
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
                {focusAreas.map((area, i) => {
                    const Icon = icons[area.key];
                    return (
                        <Reveal key={area.key} delay={i * 0.1} y={32}>
                            <article className="glow-card spotlight group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-surface/90 sm:p-7">
                                <div className="flex items-center justify-between">
                                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-accent/30 bg-accent/10">
                                        <Icon
                                            size={20}
                                            stroke={1.7}
                                            className="text-accent"
                                        />
                                    </span>
                                    <span className="font-mono text-[10px] text-muted uppercase tracking-[0.24em]">
                                        0{i + 1}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="font-mono text-[10.5px] text-accent uppercase tracking-[0.2em]">
                                        {area.label}
                                    </span>
                                    <h3 className="font-display font-semibold text-paper text-xl leading-snug tracking-tight">
                                        {area.title}
                                    </h3>
                                </div>

                                <p className="text-muted text-sm leading-relaxed sm:text-[14px]">
                                    {area.detail}
                                </p>

                                <ul className="mt-auto flex flex-col gap-2.5 border-line border-t pt-5">
                                    {area.bullets.map((b) => (
                                        <li
                                            key={b}
                                            className="flex items-start gap-2.5 text-[13px] text-muted"
                                        >
                                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </Reveal>
                    );
                })}
            </div>
        </section>
    );
}
