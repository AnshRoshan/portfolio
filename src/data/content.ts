import { projects } from "./projects";
import { skillGroups } from "./skills";

/**
 * Homepage editorial content. Everything here is real: stats derive from
 * projects.ts and skills.ts.
 */

const shipped = projects.filter((p) => p.status !== "building").length;

export const heroStats = [
    { value: projects.length, suffix: "+", label: "Projects built" },
    { value: shipped, suffix: "", label: "Shipped to production" },
    { value: skillGroups.length, suffix: "", label: "Toolchain domains" },
    { value: 3, suffix: "", label: "AI specialisations" },
];
