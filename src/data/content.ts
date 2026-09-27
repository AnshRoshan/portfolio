import { projects } from "./projects";
import { skillGroups } from "./skills";

/**
 * Homepage editorial content. Everything here is real: stats derive from
 * projects.ts, focus/process copy mirrors the /about page.
 */

const shipped = projects.filter((p) => p.status !== "building").length;

export const heroStats = [
    { value: projects.length, suffix: "+", label: "Projects built" },
    { value: shipped, suffix: "", label: "Shipped to production" },
    { value: skillGroups.length, suffix: "", label: "Toolchain domains" },
    { value: 3, suffix: "", label: "AI specialisations" },
];

export const focusAreas = [
    {
        key: "gen-ai",
        label: "Gen AI",
        title: "Agents that stay reliable under real traffic",
        detail:
            "Multi-agent systems and retrieval pipelines with evaluations, guardrails, and graceful failure, not just happy-path demos.",
        bullets: [
            "LangChain / LangGraph orchestration",
            "Hybrid RAG: text-to-SQL, graph, BM25",
            "Citation-first answer contracts",
        ],
    },
    {
        key: "full-stack",
        label: "Full-stack",
        title: "Model to API to interface, one owner",
        detail:
            "Owning the whole path: typed FastAPI and Node services, React and Next.js front ends, and the contracts that hold them together.",
        bullets: [
            "Python + TypeScript end to end",
            "Streaming UIs for LLM output",
            "Postgres, Redis, vector stores",
        ],
    },
    {
        key: "delivery",
        label: "Delivery",
        title: "A model becomes a product that stays up",
        detail:
            "Containerised, observable, reproducible: Docker and Kubernetes on AWS with infra as code and CI that catches regressions.",
        bullets: [
            "Docker · Kubernetes · AWS",
            "Terraform-managed environments",
            "GitHub Actions CI/CD",
        ],
    },
] as const;

export const processSteps = [
    {
        step: "01",
        title: "Frame",
        detail:
            "Start from the failure mode: what happens when this is wrong, and how fast will we know? Success criteria before solutions.",
    },
    {
        step: "02",
        title: "Prototype",
        detail:
            "The thinnest slice that touches real data: a working loop in days, not a plan for quarters. Ugly on purpose until proven.",
    },
    {
        step: "03",
        title: "Evaluate",
        detail:
            "Harnesses and regression suites around the model: golden sets, traces, cost and latency budgets. Numbers, not vibes.",
    },
    {
        step: "04",
        title: "Ship",
        detail:
            "Containerised, monitored, documented. Handover that lets the next engineer (or future me) run it cold.",
    },
] as const;
