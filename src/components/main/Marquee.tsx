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
import SectionHeading from "@/components/sections/SectionHeading";
import {
    allSkills,
    type Skill,
    type SkillGroup,
    type SkillIconKey,
    skillGroups,
} from "@/data/skills";
import Reveal from "../sub/Reveal";

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
        // py-1 is load-bearing: the clip below hides the chip's 4px hover
        // lift, and without headroom the hovered chip loses its top border.
        <div className="overflow-hidden">
            <div
                ref={trackRef}
                className="flex w-max gap-4 py-1"
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
        <section className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
            <SectionHeading
                index="01"
                eyebrow="Stack"
                title="The stack I build with"
                description="Across Gen AI and the backend, frontend, and infrastructure that turn a model into a product."
            />

            <div
                className="mt-12 flex flex-col gap-2 overflow-hidden md:mt-16"
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

            <SkillBento />
        </section>
    );
}

/* Bento of skill groups under the marquee — the reference layout's
   6/3/3/3/3 span pattern, translated to our tokens. */
const SPANS = [
    "lg:col-span-6",
    "lg:col-span-3",
    "lg:col-span-3",
    "lg:col-span-3",
    "lg:col-span-3",
];

function GroupChip({ item }: { item: Skill }) {
    const IconCmp = item.icon ? ICON_MAP[item.icon] : null;
    const core = item.level === "core";
    return (
        <span
            className={
                core
                    ? "flex items-center gap-2 rounded-xl border border-accent/35 bg-accent/[0.08] px-3 py-2 text-[13px] text-paper transition-transform duration-200 hover:-translate-y-0.5"
                    : "flex items-center gap-2 rounded-xl border border-line bg-ink/40 px-3 py-2 text-[13px] text-muted transition-colors duration-200 hover:-translate-y-0.5 hover:text-paper"
            }
        >
            {item.img ? (
                <img
                    src={item.img}
                    alt=""
                    loading="lazy"
                    className="h-4 w-auto object-contain"
                />
            ) : IconCmp ? (
                <IconCmp
                    size={15}
                    stroke={1.7}
                    className={core ? "text-accent" : "text-muted"}
                />
            ) : null}
            {item.name}
            {core && (
                <span
                    aria-hidden
                    className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
                />
            )}
        </span>
    );
}

function GroupCard({ group, span }: { group: SkillGroup; span: string }) {
    return (
        <article
            className={`glow-card relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.5rem] border border-line bg-[linear-gradient(160deg,var(--surface)_0%,var(--ink)_82%)] p-6 shadow-elev-1 transition-shadow duration-500 hover:shadow-elev-2 sm:p-7 ${span}`}
        >
            <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display font-semibold text-paper text-xl tracking-tight">
                    {group.title}
                </h3>
                <span className="font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
                    {String(group.skills.length).padStart(2, "0")}
                </span>
            </div>
            <p className="max-w-[46ch] text-muted text-sm leading-relaxed">
                {group.blurb}
            </p>
            <div className="mt-auto grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.skills.map((s) => (
                    <GroupChip key={s.name} item={s} />
                ))}
            </div>
        </article>
    );
}

function SkillBento() {
    return (
        <Reveal y={28} className="mt-14 md:mt-20">
            <div className="mb-5 flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
                    Five domains, one stack
                </p>
                <p className="flex items-center gap-2 font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
                    <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
                    />
                    Core daily drivers
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
                {skillGroups.map((g, i) => (
                    <GroupCard
                        key={g.title}
                        group={g}
                        span={SPANS[i] ?? "lg:col-span-3"}
                    />
                ))}
            </div>
        </Reveal>
    );
}
