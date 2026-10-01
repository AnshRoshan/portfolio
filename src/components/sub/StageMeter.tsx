const STAGES = ["Idea", "Prototype", "Alpha", "Beta", "Live"] as const;

/** Five-segment progress meter (Idea → Live) for in-flight projects. */
export function StageMeter({ stage }: { stage: string }) {
    const filled = STAGES.indexOf(stage as (typeof STAGES)[number]) + 1;
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex gap-1.5" aria-hidden>
                {STAGES.map((_, i) => (
                    <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                            i < filled
                                ? "bg-gradient-to-r from-accent to-accent-2"
                                : "bg-line-2"
                        }`}
                    />
                ))}
            </div>
            <div className="flex gap-1.5">
                {STAGES.map((s, i) => (
                    <span
                        key={s}
                        className={`flex-1 text-center font-mono text-[9px] uppercase tracking-[0.14em] ${
                            i === filled - 1 ? "text-accent" : "text-muted/60"
                        }`}
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    );
}
