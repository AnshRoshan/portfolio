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
import type { Skill, SkillIconKey } from "@/data/skills";

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

/**
 * Renders a skill's logo (`img`) or, when none exists, a mono mint icon from
 * `icon`. Shared by the Marquee chips and the About stack so both stay in sync.
 */
export function SkillIcon({ skill, size = 16 }: { skill: Skill; size?: number }) {
    if (skill.img) {
        return (
            <img
                src={skill.img}
                alt=""
                loading="lazy"
                style={{ height: size, width: "auto" }}
                className="object-contain"
            />
        );
    }
    const Icon = skill.icon ? ICON_MAP[skill.icon] : null;
    return Icon ? (
        <Icon size={size} stroke={1.6} className="text-accent" />
    ) : null;
}
