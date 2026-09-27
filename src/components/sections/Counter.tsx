"use client";

import { useEffect, useRef } from "react";
import { useInViewOnce } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Number that counts up once as it scrolls into view. The rAF loop writes
 * textContent directly instead of re-rendering React per frame.
 */
export default function Counter({
    value,
    suffix = "",
    label,
    className,
}: {
    value: number;
    suffix?: string;
    label: string;
    className?: string;
}) {
    const { ref: wrapRef, inView } = useInViewOnce<HTMLDivElement>();
    const numRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!inView) return;
        const el = numRef.current;
        if (!el) return;
        let frame = 0;
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            el.textContent = String(Math.round(value * eased));
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, value]);

    return (
        <div ref={wrapRef} className={cn("flex flex-col gap-1.5", className)}>
            <span className="font-display font-semibold text-3xl text-paper tabular-nums sm:text-4xl">
                <span ref={numRef}>0</span>
                <span className="text-accent">{suffix}</span>
            </span>
            <span className="font-mono text-[10.5px] text-muted uppercase tracking-[0.16em]">
                {label}
            </span>
        </div>
    );
}
