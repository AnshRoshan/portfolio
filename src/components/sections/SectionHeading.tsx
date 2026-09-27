import Reveal from "@/components/sub/Reveal";
import { cn } from "@/lib/utils";

/**
 * Shared numbered section header: index + hairline eyebrow, display title,
 * optional description and trailing action. Keeps every home/page section
 * opening beat consistent.
 */
export default function SectionHeading({
    index,
    eyebrow,
    title,
    description,
    action,
    className,
}: {
    index?: string;
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex flex-col gap-6 text-left",
                action &&
                    "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
                className
            )}
        >
            <div className="flex max-w-3xl flex-col gap-5">
                <Reveal y={18}>
                    <span className="inline-flex items-center gap-3 font-mono text-muted text-sm uppercase tracking-[0.22em]">
                        {index && (
                            <span className="text-[11px] text-accent/70 tracking-[0.3em]">
                                {index}
                            </span>
                        )}
                        <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
                        {eyebrow}
                    </span>
                </Reveal>
                <Reveal y={22} delay={0.08}>
                    <h2 className="font-display font-semibold text-4xl text-paper tracking-tight sm:text-5xl">
                        {title}
                    </h2>
                </Reveal>
                {description && (
                    <Reveal y={18} delay={0.16}>
                        <p className="max-w-[56ch] text-base text-muted leading-relaxed sm:text-lg">
                            {description}
                        </p>
                    </Reveal>
                )}
            </div>
            {action && (
                <Reveal y={16} delay={0.2}>
                    {action}
                </Reveal>
            )}
        </div>
    );
}
