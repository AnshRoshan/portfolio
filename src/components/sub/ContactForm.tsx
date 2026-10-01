"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EMAIL_MAX = 600;

const TOPICS = [
    "Gen AI system",
    "RAG / retrieval",
    "Full-stack product",
    "Something else",
] as const;

// Inputs sit on --surface-2, not a translucent surface: on a light card a
// `bg-surface/60` field is the same value as the card behind it and the form
// reads as a blank panel.
const inputClasses =
    "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-paper placeholder:text-muted/70 outline-none transition focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/40";

const Label = ({
    htmlFor,
    children,
}: {
    htmlFor: string;
    children: React.ReactNode;
}) => (
    <label
        htmlFor={htmlFor}
        className="mb-2 block font-mono text-muted text-xs uppercase tracking-[0.22em]"
    >
        {children}
    </label>
);

/**
 * The native rake.red form, kept as a real POST (no fetch, no JS submit path)
 * with the reference design's extras layered on: topic chips that prefix the
 * subject line into the message, and a live character counter.
 */
export default function ContactForm() {
    const [topic, setTopic] = useState<string | null>(null);
    const [message, setMessage] = useState("");

    return (
        <form
            method="post"
            action="https://rake.red/api/anshroshan/me"
            className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2"
            onSubmit={(e) => {
                if (!topic || message.startsWith(`[${topic}]`)) return;
                setMessage(`[${topic}] ${message}`);
                const el =
                    e.currentTarget.querySelector<HTMLTextAreaElement>(
                        "#message"
                    );
                if (el) el.value = `[${topic}] ${el.value}`;
            }}
        >
            {/* Honeypot - hidden from humans, visible to bots */}
            <div style={{ display: "none" }}>
                <input
                    type="text"
                    name="honeypot"
                    id="honeypot"
                    autoComplete="off"
                    tabIndex={-1}
                />
            </div>

            {/* Topic chips */}
            <fieldset className="sm:col-span-2">
                <legend className="mb-2.5 font-mono text-muted text-xs uppercase tracking-[0.22em]">
                    What is this about?
                </legend>
                <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => {
                        const isActive = topic === t;
                        return (
                            <button
                                key={t}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setTopic(isActive ? null : t)}
                                className={cn(
                                    "rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                                    isActive
                                        ? "border-accent/60 bg-accent/15 text-accent"
                                        : "border-line text-muted hover:border-accent/40 hover:text-paper"
                                )}
                            >
                                {t}
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            <div>
                <Label htmlFor="first-name">First name</Label>
                <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    required
                    placeholder="Ada"
                    className={inputClasses}
                />
            </div>

            <div>
                <Label htmlFor="last-name">Last name</Label>
                <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    placeholder="Lovelace"
                    className={inputClasses}
                />
            </div>

            <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    className={inputClasses}
                />
            </div>

            <div className="sm:col-span-2">
                <Label htmlFor="company">
                    Company{" "}
                    <span className="normal-case tracking-normal opacity-60">
                        (optional)
                    </span>
                </Label>
                <input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className={inputClasses}
                />
            </div>

            <div className="sm:col-span-2">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                    <Label htmlFor="message">Message</Label>
                    <span
                        className={cn(
                            "mb-2 font-mono text-[10px] tracking-[0.08em]",
                            message.length > EMAIL_MAX
                                ? "text-rose-400"
                                : "text-muted"
                        )}
                    >
                        {message.length}/{EMAIL_MAX}
                    </span>
                </div>
                <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    maxLength={EMAIL_MAX}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                        topic
                            ? `Tell me about the ${topic.toLowerCase()}…`
                            : "What are you building?"
                    }
                    className={cn(inputClasses, "resize-none")}
                />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 sm:col-span-2">
                <p className="max-w-[34ch] font-mono text-[11px] text-muted leading-relaxed tracking-[0.08em]">
                    Lands straight in my inbox. I reply within a day, no
                    newsletter.
                </p>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 font-medium text-ink text-sm uppercase tracking-[0.12em] transition-colors hover:bg-accent-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.97]"
                >
                    Send message
                    <IconArrowUpRight size={16} stroke={1.9} />
                </button>
            </div>
        </form>
    );
}
