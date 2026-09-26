"use client";

import {
    type MotionValue,
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

/**
 * Scroll-linked word reveal (Luma / Superhuman style). Each word fades from
 * dim to full as the paragraph scrubs through the viewport — driven by scroll
 * position, not a one-shot trigger. Word-level (not per-char) for performance.
 * Color/size come from `className`; only opacity is animated here.
 */
function Word({
    children,
    progress,
    range,
}: {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    // Floor kept readable (passes contrast) so the text is legible even before
    // it scrolls into range; the reveal then lifts it to full.
    const opacity = useTransform(progress, range, [0.4, 1]);
    return (
        <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
            {children}
        </motion.span>
    );
}

export default function AnimatedText({
    text,
    className,
}: {
    text: string;
    className?: string;
}) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.85", "end 0.5"],
    });

    const words = text.split(" ");

    return (
        <p ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word
                        key={i}
                        progress={scrollYProgress}
                        range={[start, end]}
                    >
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}
