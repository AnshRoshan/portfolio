"use client";

import { useGSAP } from "@gsap/react";
import {
    IconApi,
    IconBrain,
    IconBrandDocker,
    IconBrandOpenai,
    IconCloud,
    IconCode,
    IconDatabase,
    IconHierarchy2,
    IconMessageChatbot,
    IconRobot,
    IconSparkles,
    IconVectorBezier2,
} from "@tabler/icons-react";
import { gsap } from "gsap";
import { useRef } from "react";
import Reveal from "@/components/sub/Reveal";
import SplitReveal from "@/components/sub/SplitReveal";
import { allSkills, type Skill, type SkillIconKey } from "@/data/skills";

gsap.registerPlugin(useGSAP);

const ICON_MAP: Record<SkillIconKey, typeof IconSparkles> = {
    spark: IconSparkles,
    brain: IconBrain,
    robot: IconRobot,
    graph: IconHierarchy2,
    vector: IconVectorBezier2,
    api: IconApi,
    message: IconMessageChatbot,
    code: IconCode,
    database: IconDatabase,
    cloud: IconCloud,
    container: IconBrandDocker,
    openai: IconBrandOpenai,
};

const mid = Math.ceil(allSkills.length / 2);
const rowA = allSkills.slice(0, mid);
const rowB = allSkills.slice(mid);

function Chip({ item }: { item: Skill }) {
    const IconCmp = item.icon ? ICON_MAP[item.icon] : null;
    return (
        <div className="group shrink-0">
            <div className="liquid-glass flex min-w-max cursor-default items-center gap-2.5 rounded-full px-5 py-3 transition-transform duration-200 group-hover:-translate-y-1">
                {item.img ? (
                    <img
                        src={item.img}
                        alt=""
                        loading="lazy"
                        style={{ height: 22, width: "auto" }}
                        className="object-contain"
                    />
                ) : IconCmp ? (
                    <IconCmp size={18} stroke={1.6} className="text-accent" />
                ) : null}
                <span className="whitespace-nowrap font-mono text-paper text-xs transition-colors group-hover:text-accent">
                    {item.name}
                </span>
            </div>
        </div>
    );
}

/**
 * Seamless GSAP marquee row. The track holds two copies of the items; GSAP
 * tweens xPercent across half the track (repeat -1, ease none) so the loop is
 * continuous and infinite. Hover pauses. Runs regardless of OS reduced-motion.
 */
function MarqueeRow({
    items,
    direction,
    duration,
}: {
    items: Skill[];
    direction: "left" | "right";
    duration: number;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const tween = useRef<gsap.core.Tween | null>(null);

    useGSAP(
        () => {
            const el = trackRef.current;
            if (!el) return;
            const from = direction === "left" ? 0 : -50;
            const to = direction === "left" ? -50 : 0;
            tween.current = gsap.fromTo(
                el,
                { xPercent: from },
                { xPercent: to, ease: "none", duration, repeat: -1 }
            );
        },
        { scope: trackRef }
    );

    return (
        <div className="overflow-hidden">
            <div
                ref={trackRef}
                className="flex w-max gap-4"
                onMouseEnter={() => tween.current?.pause()}
                onMouseLeave={() => tween.current?.play()}
            >
                {[...items, ...items].map((item, i) => (
                    <Chip key={`${item.name}-${i}`} item={item} />
                ))}
            </div>
        </div>
    );
}

export default function Marquee() {
    return (
        <section className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
            <SplitReveal>
                <h2 className="font-display font-semibold text-3xl text-gradient tracking-tight sm:text-4xl lg:text-5xl">
                    The stack I build with
                </h2>
            </SplitReveal>
            <Reveal delay={0.12} y={16}>
                <p className="mt-3 max-w-[52ch] text-muted">
                    Across Gen AI and the backend, frontend, and infrastructure
                    that turn a model into a product.
                </p>
            </Reveal>

            <div
                className="mt-12 flex flex-col gap-4 overflow-hidden md:mt-16"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    perspective: "1100px",
                }}
            >
                <div className="[transform:rotateX(9deg)]">
                    <MarqueeRow items={rowA} direction="left" duration={22} />
                </div>
                <div className="[transform:rotateX(9deg)]">
                    <MarqueeRow items={rowB} direction="right" duration={28} />
                </div>
            </div>
        </section>
    );
}
