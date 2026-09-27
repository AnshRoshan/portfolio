import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/sub/Reveal";
import { processSteps } from "@/data/content";

/**
 * Four-step working method as a hairline-divided grid. Giant ghost numerals,
 * accent underline sweeps in on hover.
 */
export default function Process() {
    return (
        <section className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
            <SectionHeading
                index="04"
                eyebrow="How I work"
                title={
                    <>
                        Frame, prototype,{" "}
                        <span className="text-accent">evaluate</span>, ship.
                    </>
                }
                description="The same four steps whether it's a chatbot for an enterprise or a CLI tool for one."
            />

            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((p, i) => (
                    <Reveal key={p.step} delay={i * 0.09} y={26}>
                        <div className="group relative flex h-full flex-col gap-4 bg-ink/95 p-6 transition-colors duration-500 hover:bg-surface/80 sm:p-7">
                            <span className="font-bold font-display text-4xl text-paper/10 tracking-[-0.05em] transition-colors duration-500 group-hover:text-accent/40">
                                {p.step}
                            </span>
                            <h3 className="font-display font-semibold text-lg text-paper tracking-tight">
                                {p.title}
                            </h3>
                            <p className="text-[13.5px] text-muted leading-relaxed">
                                {p.detail}
                            </p>
                            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
