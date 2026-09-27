import { IconArrowUpRight, IconMail } from "@tabler/icons-react";
import PillButton from "@/components/sub/PillButton";
import Reveal from "@/components/sub/Reveal";

const EMAIL = "ianshroshan@gmail.com";

/**
 * Closing call-to-action band: grain + grid backdrop, one headline, two
 * exits (contact form or direct email). Sits above the footer on key pages.
 */
export default function CTABand({
    title = <>Let&apos;s build something that holds up in production.</>,
    body = "Whether it's an agentic system that needs to stop hallucinating, a retrieval pipeline that needs to actually retrieve, or a product that needs shipping? Start with a message.",
}: {
    title?: React.ReactNode;
    body?: string;
}) {
    return (
        <section className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
            <Reveal y={30}>
                <div className="glow-card grain-overlay relative overflow-hidden rounded-[2rem] border border-line bg-surface/60 px-6 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-20">
                    {/* Ambient blooms */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_65%)] blur-2xl"
                    />
                    <div className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent)]" />

                    <div className="relative flex flex-col items-center gap-7">
                        <span className="font-mono text-[11px] text-muted uppercase tracking-[0.24em]">
                            Next step
                        </span>

                        <h2 className="max-w-3xl font-display font-semibold text-3xl text-paper leading-[1.08] tracking-tight sm:text-5xl">
                            {title}
                        </h2>

                        <p className="max-w-xl text-[15px] text-muted leading-relaxed">
                            {body}
                        </p>

                        <div className="mt-2 flex flex-col items-center gap-5 sm:flex-row">
                            <PillButton href="/contact" variant="primary">
                                Start a conversation
                            </PillButton>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="group inline-flex items-center gap-2.5 text-muted text-sm transition-colors hover:text-paper"
                            >
                                <IconMail
                                    size={16}
                                    className="text-accent"
                                    stroke={1.8}
                                />
                                <span className="link-sweep">{EMAIL}</span>
                            </a>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] text-muted uppercase tracking-[0.18em]">
                            <span>Replies within 24h</span>
                            <span className="hidden h-3 w-px bg-line sm:block" />
                            <span>IST · Bengaluru</span>
                            <span className="hidden h-3 w-px bg-line sm:block" />
                            <a
                                href="/projects"
                                className="link-sweep transition-colors hover:text-accent"
                            >
                                See the work first
                            </a>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
