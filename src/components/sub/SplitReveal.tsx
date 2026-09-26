"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Kinetic-type reveal: splits the wrapped heading/text into words and rises
 * each word out of a clipping mask, staggered, as it scrolls into view.
 * Pass the real heading element as children (keeps semantics + styling):
 *   <SplitReveal><h2 className="font-display ...">Selected work</h2></SplitReveal>
 *
 * autoSplit re-splits on font load / resize. Motion runs regardless of the OS
 * reduced-motion setting (owner's choice for this portfolio). useGSAP reverts
 * the split + triggers on unmount.
 */
export default function SplitReveal({
    children,
    className,
    start = "top 88%",
    stagger = 0.045,
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    start?: string;
    stagger?: number;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = ref.current;
            if (!el) return;
            // Split the heading element itself (not the wrapper div) so SplitText's
            // generated aria-label lands on an element that allows it — a bare
            // <div> with aria-label is a prohibited-attribute a11y violation.
            const target = (el.firstElementChild as HTMLElement) ?? el;
            const split = SplitText.create(target, {
                type: "words",
                mask: "words",
                aria: "auto",
                autoSplit: true,
                onSplit(self) {
                    return gsap.from(self.words, {
                        yPercent: 115,
                        opacity: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        stagger,
                        delay,
                        scrollTrigger: { trigger: el, start, once: true },
                    });
                },
            });
            return () => split.revert();
        },
        { scope: ref }
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
