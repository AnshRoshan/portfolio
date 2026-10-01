"use client";

import { IconCheck, IconMail } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/** Full-width copy-email slab: mono Copy label flips to Copied on click. */
export default function CopyEmail({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
        } catch {
            return;
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glow-card group flex items-center gap-4 overflow-hidden rounded-[1.5rem] border border-line bg-surface/70 p-5 shadow-elev-1 backdrop-blur-xl">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                <IconMail size={19} strokeWidth={1.5} />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                    Email — fastest
                </span>
                <span className="mt-0.5 block truncate font-mono text-paper text-sm tracking-wide">
                    {email}
                </span>
            </span>
            <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Email copied" : "Copy email"}
                className="relative grid h-9 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-line transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group-hover:border-accent/40"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={copied ? "done" : "copy"}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{
                            duration: 0.22,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                            copied
                                ? "text-emerald-400"
                                : "text-muted group-hover:text-accent"
                        }`}
                    >
                        {copied ? "Copied ✓" : "Copy"}
                    </motion.span>
                </AnimatePresence>
            </button>
        </div>
    );
}
