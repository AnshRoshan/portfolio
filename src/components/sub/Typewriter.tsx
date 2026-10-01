"use client";

import { useEffect, useState } from "react";

/** Cycles mono phrases with a type/delete effect and a blinking caret. */
export function Typewriter({ phrases }: { phrases: readonly string[] }) {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const full = phrases[index % phrases.length];
        if (!deleting && text === full) {
            const hold = setTimeout(() => setDeleting(true), 1600);
            return () => clearTimeout(hold);
        }
        if (deleting && text === "") {
            setDeleting(false);
            setIndex((i) => (i + 1) % phrases.length);
            return;
        }
        const tick = setTimeout(
            () =>
                setText(
                    deleting
                        ? full.slice(0, text.length - 1)
                        : full.slice(0, text.length + 1)
                ),
            deleting ? 32 : 72
        );
        return () => clearTimeout(tick);
    }, [text, deleting, index, phrases]);

    return (
        <span className="font-mono text-accent">
            {text}
            <span
                aria-hidden
                className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-accent caret-blink"
            />
        </span>
    );
}
