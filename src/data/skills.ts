/**
 * Skill groups, Gen-AI first. Single source of truth for the homepage Marquee
 * and the About focus areas.
 *
 * To add a skill: push an object onto the right group's `skills`.
 * To add a group: push a new object onto `skillGroups`.
 * `img` is an optional logo path in /public. When omitted, the Marquee renders
 * a mono icon fallback chosen by `icon` (see ICON_MAP in Marquee.tsx).
 */
export type SkillIconKey =
    | "spark"
    | "brain"
    | "robot"
    | "graph"
    | "vector"
    | "api"
    | "message"
    | "code"
    | "database"
    | "cloud"
    | "container"
    | "openai";

export type Skill = {
    name: string;
    img?: string;
    icon?: SkillIconKey;
    /** "core" skills get a lit chip in highlight contexts. */
    level?: "core" | "working";
};

export type SkillGroup = {
    title: string;
    blurb: string;
    skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
    {
        title: "Gen AI & LLMs",
        blurb: "Agentic systems, RAG pipelines, and LLM apps shipped to production.",
        skills: [
            { name: "LangChain", icon: "spark", level: "core" },
            { name: "LangGraph", icon: "graph", level: "core" },
            { name: "LlamaIndex", icon: "brain" },
            { name: "RAG pipelines", icon: "vector", level: "core" },
            { name: "Agentic workflows", icon: "robot", level: "core" },
            { name: "OpenAI", icon: "openai" },
            { name: "Anthropic Claude", icon: "message", level: "core" },
            { name: "Hugging Face", icon: "brain" },
            { name: "Vector databases", icon: "database" },
        ],
    },
    {
        title: "Languages",
        blurb: "The languages I reach for across AI, services, and tooling.",
        skills: [
            { name: "Python", img: "/python.svg" },
            { name: "TypeScript", img: "/ts.svg" },
            { name: "Go", img: "/go.png" },
        ],
    },
    {
        title: "Backend & Data",
        blurb: "APIs and data layers behind the models and the products.",
        skills: [
            { name: "FastAPI", icon: "api" },
            { name: "Node.js", img: "/node-js.png" },
            { name: "PostgreSQL", icon: "database" },
            { name: "MongoDB", img: "/mongodb.png" },
            { name: "Redis", icon: "database" },
        ],
    },
    {
        title: "Frontend",
        blurb: "Interfaces for AI products, built with motion and care.",
        skills: [
            { name: "React", img: "/react.png" },
            { name: "Next.js", icon: "code" },
            { name: "Tailwind CSS", img: "/tailwind.png" },
            { name: "Framer Motion", img: "/framer.png" },
        ],
    },
    {
        title: "DevOps & Cloud",
        blurb: "Shipping and running it all, end to end.",
        skills: [
            { name: "Docker", img: "/docker.webp" },
            { name: "Kubernetes", img: "/kubernetes.svg" },
            { name: "AWS", img: "/aws.svg" },
            { name: "Terraform", img: "/terraform.svg" },
            { name: "Git", img: "/git.svg" },
        ],
    },
];

export const allSkills: Skill[] = skillGroups.flatMap((g) => g.skills);
