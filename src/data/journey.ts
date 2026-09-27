/**
 * Career timeline, newest first. Single source of truth for the About page
 * Journey component. iconKey maps to a tabler icon inside the client
 * component (icons can't cross the server/client boundary as values).
 */
export type JourneyEntry = {
    period: string;
    title: string;
    org: string;
    detail: string;
    accent: string;
    iconKey: "robot" | "code" | "briefcase" | "cloud" | "school";
    current?: boolean;
    tags: readonly string[];
};

export const journey: readonly JourneyEntry[] = [
    {
        period: "Apr 2026 — Present",
        title: "Full-stack AI Engineer",
        org: "TCS · Bengaluru",
        detail:
            "Fully focused on end-to-end Generative AI delivery: agentic backends, RAG pipelines, evaluations, and the interfaces on top. Enterprise knowledge assistants that give employees reliable answers, AI automation that streamlines SDLC workflows, proof-of-concept to production on React, Python, PostgreSQL, Docker, and GitHub Actions.",
        accent: "#22d3ee", // cyan
        iconKey: "robot",
        current: true,
        tags: ["Agentic systems", "RAG", "Evals", "AWS"],
    },
    {
        period: "Apr 2025 — Apr 2026",
        title: "Web Developer · AI engineering team",
        org: "TCS · Bengaluru",
        detail:
            "Embedded in the AI engineering track owning the front end of enterprise GenAI applications: chatbot and knowledge-assistant interfaces, streaming LLM responses, dashboards. Learned the model side from inside the product, and widened the work into the backend along the way.",
        accent: "#a78bfa", // violet
        iconKey: "code",
        tags: ["React", "Next.js", "Streaming UI"],
    },
    {
        period: "Jan 2025 — Apr 2025",
        title: "System Engineer",
        org: "TCS · Bengaluru",
        detail:
            "Onboarded into TCS and moved into the AI engineering track within four months by shipping work end to end on my own stack.",
        accent: "#60a5fa", // blue
        iconKey: "briefcase",
        tags: ["Foundations"],
    },
    {
        period: "2022 — 2024",
        title: "Full-stack Developer",
        org: "Freelance & open source",
        detail:
            "Shipped storefronts, social apps, and internal tools on Next.js and MongoDB — a Stripe-backed ecommerce store from catalogue to completed order, and a social platform with auth, feeds, and a responsive interface. The foundations I now use for AI products.",
        accent: "#34d399", // emerald
        iconKey: "briefcase",
        tags: ["Next.js", "MongoDB", "Stripe"],
    },
    {
        period: "Mar 2023 — Apr 2023",
        title: "Summer Intern",
        org: "Bihar State Power Transmission Co. Ltd. · Naugachhia",
        detail:
            "Worked on grid equipment and daily grid operations, and the communication flow between the grid and the Load Dispatch Center.",
        accent: "#fbbf24", // amber
        iconKey: "cloud",
        tags: ["Grid ops"],
    },
    {
        period: "2021 — 2024",
        title: "B.Tech, Electrical Engineering",
        org: "Bhagalpur College of Engineering",
        detail:
            "The degree that started the self-taught software path: from React and Node.js into Python and Go, then into the GenAI stack. Final-year work on clinical risk prediction.",
        accent: "#fb7185", // rose
        iconKey: "school",
        tags: ["Electrical", "Self-taught SWE"],
    },
] as const;
