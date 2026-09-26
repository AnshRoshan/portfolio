"use client";

import { type HTMLMotionProps, motion } from "framer-motion";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "ref"> {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    /** Horizontal offset to animate from (px). */
    x?: number;
    /** Vertical offset to animate from (px). */
    y?: number;
    className?: string;
}

/**
 * Enters on scroll into view: fades + translates from (x, y) to rest, once.
 * `initial` is unconditional so the server and first client render match
 * (avoids hydration mismatch). Reduced motion is honored globally via
 * <MotionConfig reducedMotion="user">, which skips the transform and keeps
 * the opacity reveal.
 */
export default function FadeIn({
    children,
    delay = 0,
    duration = 0.7,
    x = 0,
    y = 30,
    className,
    ...rest
}: FadeInProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x, y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}
