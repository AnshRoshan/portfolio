"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cycles through a list of words, sliding/fading each in turn (adapted from a
 * word-rotator we liked). Uses inline-grid so swaps don't jump vertically.
 */
export default function RotatingText({
    words,
    className,
    interval = 2200,
}: {
    words: string[];
    className?: string;
    interval?: number;
}) {
    const [i, setI] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setI((prev) => (prev + 1) % words.length),
            interval
        );
        return () => clearInterval(id);
    }, [words.length, interval]);

    return (
        <span className="relative inline-grid align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={i}
                    initial={{ y: "55%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-55%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={className}
                    style={{ gridArea: "1 / 1" }}
                >
                    {words[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
