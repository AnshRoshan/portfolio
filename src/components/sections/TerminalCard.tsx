"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A small "live agent run" readout for the homepage — an illustrative trace
 * of how the RAGStack pipeline behaves (classify → retrieve → cite). The
 * content is a fixed demo script, clearly labelled as such.
 */

type Line = {
    prompt?: string;
    kind?: "plan" | "retrieval" | "span" | "answer";
    text: string;
};

const script: Line[] = [
    { prompt: "› ragstack.ask", text: '"Which contracts auto-renew in Q3?"' },
    { kind: "plan", text: "classify → aggregate → multi-hop" },
    { kind: "retrieval", text: "text-to-SQL · knowledge-graph · bm25" },
    { kind: "span", text: "3 sources · 11 chunks · 0 uncited claims" },
    { kind: "answer", text: "Answer ready: 4 citations attached." },
];

const toneFor = (kind?: Line["kind"]) => {
    switch (kind) {
        case "plan":
            return "text-muted";
        case "retrieval":
            return "text-accent-2";
        case "span":
            return "text-paper";
        case "answer":
            return "text-accent";
        default:
            return "text-paper";
    }
};

export default function TerminalCard() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step >= script.length) {
            const reset = setTimeout(() => setStep(0), 4200);
            return () => clearTimeout(reset);
        }
        const t = setTimeout(
            () => setStep((s) => s + 1),
            step === 0 ? 700 : 1150
        );
        return () => clearTimeout(t);
    }, [step]);

    return (
        <div className="glow-card relative overflow-hidden rounded-3xl border border-line bg-surface/70 backdrop-blur-xl">
            {/* Chrome */}
            <div className="flex items-center gap-3 border-line border-b bg-fill/40 px-4 py-3">
                <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                </div>
                <span className="ml-1 font-mono text-[10.5px] text-muted uppercase tracking-[0.16em]">
                    agent-trace · ragstack
                </span>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-accent/80 uppercase">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    live
                </span>
            </div>

            {/* Body */}
            <div className="flex min-h-[248px] flex-col gap-3 p-5 font-mono text-[12.5px] leading-relaxed sm:p-6">
                {script.slice(0, step).map((line, i) => (
                    <div
                        key={line.text}
                        className="drawer-item flex items-start gap-2.5"
                        style={{ animationDuration: "0.5s" }}
                    >
                        {line.prompt ? (
                            <span className="shrink-0 text-accent">
                                {line.prompt}
                            </span>
                        ) : (
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                        )}
                        <span className={cn("break-words", toneFor(line.kind))}>
                            {line.text}
                        </span>
                    </div>
                ))}

                {step >= script.length ? (
                    <div className="mt-1 flex items-center gap-2 text-accent">
                        <span>›</span>
                        <span className="inline-block h-3.5 w-1.5 bg-accent/80 caret-blink" />
                    </div>
                ) : (
                    <div className="shimmer-bar h-3.5 w-32 rounded-full" />
                )}
            </div>

            {/* Footer stat strip */}
            <div className="grid grid-cols-3 divide-x divide-line border-line border-t bg-fill/25">
                {[
                    { k: "latency", v: "1.4s" },
                    { k: "tokens", v: "3.1k" },
                    { k: "cost", v: "$0.006" },
                ].map((s) => (
                    <div key={s.k} className="flex flex-col gap-1 px-4 py-3">
                        <span className="font-mono text-[9.5px] text-muted uppercase tracking-[0.18em]">
                            {s.k}
                        </span>
                        <span className="font-mono text-[13px] text-paper tabular-nums">
                            {s.v}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
