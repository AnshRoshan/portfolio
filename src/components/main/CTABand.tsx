import { IconArrowUpRight, IconMail } from "@tabler/icons-react";
import PillButton from "@/components/sub/PillButton";
import Reveal from "@/components/sub/Reveal";
import { siteConfig } from "@/config/site";

const EMAIL = siteConfig.email;

/**
 * Closing call-to-action band: a deep quiet panel (no grain, no grid noise),
 * statement on the left, actions on the right. Sits above the footer on key
 * pages.
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
                <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(160deg,var(--surface)_0%,var(--ink)_70%)] shadow-elev-1">
                    {/* Accent hairline across the top edge */}
                    <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                    />

                    <div className="grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-16 lg:px-14 lg:py-20">
                        {/* Statement */}
                        <div className="flex flex-col gap-5">
                            <span className="font-mono text-[11px] text-accent/80 uppercase tracking-[0.24em]">
                                Next step
                            </span>
                            <h2 className="max-w-[18ch] font-display font-semibold text-4xl text-paper leading-[1.05] tracking-tight sm:text-5xl">
                                {title}
                            </h2>
                            <p className="max-w-[52ch] text-[15px] text-muted leading-relaxed">
                                {body}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-start gap-6 lg:items-end">
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
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-line border-t pt-5 font-mono text-[10px] text-muted uppercase tracking-[0.18em] lg:w-full lg:justify-end">
                                <span>Replies within 24h</span>
                                <span className="h-3 w-px bg-line" />
                                <span>IST · Bengaluru</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
