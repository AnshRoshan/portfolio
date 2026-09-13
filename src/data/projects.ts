/**
 * Project list. Single source of truth for the homepage "Selected work"
 * section and the full /projects page.
 *
 * To add a project: copy one object below, drop a screenshot in
 * /public/projects/, and set `featured: true` to surface it on the homepage.
 * `image` is optional; when omitted the card renders a mint gradient panel.
 */
export type ProjectStatus = "shipped" | "building";

/** Progress meter for in-flight work, shown in the "Now building" rail. */
export type ProjectStage = "Idea" | "Prototype" | "Alpha" | "Beta" | "Live";

export type Project = {
    slug: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    image?: string;
    live?: string;
    github?: string;
    year: string;
    featured?: boolean;
    /** Defaults to "shipped"; "building" surfaces in the Now-building rail. */
    status?: ProjectStatus;
    /** Only meaningful while status === "building". */
    stage?: ProjectStage;
};

export type ProjectMetric = { value: string; label: string };

/**
 * A project plus its optional case-study content, used by /projects/[slug].
 * Everything beyond `Project` is optional: a project with no case study still
 * renders a clean overview page. Authored in src/data/projects.ts.
 */
export type ProjectDetail = Project & {
    problem?: string;
    approach?: string;
    outcome?: string;
    metrics?: ProjectMetric[];
    gallery?: { url: string; alt?: string }[];
    body?: unknown[];
};

export const projects: Project[] = [
    {
        slug: "loupe",
        title: "Loupe — AI PR Reviewer",
        category: "Gen AI",
        description:
            "Open-source AI pull-request reviewer: a zero-dependency review engine with GitHub Action and Cloudflare Workers adapters, plus a full-stack Next.js workspace that scans repos and PRs.",
        tags: ["TypeScript", "Next.js", "GitHub Actions", "Cloudflare Workers"],
        image: "/projects/og-loupe.png",
        github: "https://github.com/AnshRoshan/loupe",
        year: "2026",
        featured: true,
    },
    {
        slug: "llm-benchmark",
        title: "LLM Benchmark",
        category: "Gen AI",
        description:
            "Any model in, one dashboard out. A 5-pillar LLM benchmarking platform with full-fidelity run recording, a CLI/TUI tester, and a community board of verified results.",
        tags: ["TypeScript", "Benchmarking", "CLI", "Dashboards"],
        image: "/projects/og-llm-benchmark.png",
        live: "https://anshroshan.github.io/llm-benchmark/",
        github: "https://github.com/AnshRoshan/llm-benchmark",
        year: "2026",
        featured: true,
    },
    {
        slug: "ragstack",
        title: "RAGStack",
        category: "Gen AI",
        description:
            "Hybrid Agentic RAG under one tool-calling agent: vectorless lexical index, vector RAG, GraphRAG, and text-to-SQL. Local-first and MIT licensed.",
        tags: ["Python", "RAG", "GraphRAG", "Text-to-SQL"],
        image: "/projects/og-ragstack.png",
        live: "https://anshroshan.github.io/ragstack/",
        github: "https://github.com/AnshRoshan/ragstack",
        year: "2026",
        featured: true,
    },
    {
        slug: "aisdlc",
        title: "AISDLC",
        category: "Tooling",
        description:
            "Agents write code, AISDLC runs the process: harness-agnostic Agent Skills plus a zero-dependency CLI for EARS specs, evidence gates G1–G6, and hash-bound approvals.",
        tags: ["Agent Skills", "CLI", "SDLC", "EARS"],
        image: "/projects/og-aisdlc.png",
        live: "https://anshroshan.github.io/aisdlc/",
        github: "https://github.com/AnshRoshan/aisdlc",
        year: "2026",
    },
    {
        slug: "forge-agentic-codegen",
        title: "Forge — Agentic Codegen",
        category: "Gen AI",
        description:
            "Describe a product and seven specialist agents — Orchestrator, Architect, Database, Backend, Frontend, QA, DevOps — plan, build, verify, and ship a Next.js + PostgreSQL codebase, with human approval on the risky steps.",
        tags: ["Next.js", "PostgreSQL", "Drizzle", "Vercel AI SDK"],
        image: "/projects/og-agentic-codegen.png",
        github: "https://github.com/AnshRoshan/agentic-codegen",
        year: "2026",
    },
    {
        slug: "cortex",
        title: "Cortex",
        category: "Full-stack",
        description:
            "Self-hostable, real-time collaborative code editor: multi-file, multi-user, auth-gated. Rust + WASM (operational transforms) backend, React + Monaco frontend, shipped as a single Docker image on SQLite.",
        tags: ["Rust", "WASM", "React", "Monaco", "Docker"],
        image: "/projects/og-cortex.png",
        github: "https://github.com/AnshRoshan/cortex",
        year: "2026",
    },
    {
        slug: "create-reactor",
        title: "Create Reactor",
        category: "Tooling",
        description:
            "Interactive CLI that scaffolds modern React apps — Vite, TypeScript, Tailwind v4, shadcn/ui, TanStack Router, Convex/Supabase, Clerk, and the AI SDK. Run it with npm create reactor@latest.",
        tags: ["CLI", "Vite", "Tailwind v4", "shadcn/ui"],
        image: "/projects/og-create-reactor.png",
        live: "https://www.npmjs.com/package/create-reactor",
        github: "https://github.com/AnshRoshan/create-reactor",
        year: "2026",
    },
    {
        slug: "ar-notes",
        title: "AR Notes",
        category: "Full-stack",
        description:
            "A notes application for text sharing and conversion — write once, share anywhere, convert between formats.",
        tags: ["TypeScript", "Notes", "Vercel"],
        image: "/projects/og-ar-notes.png",
        live: "https://ar-note.vercel.app",
        github: "https://github.com/AnshRoshan/ar-notes",
        year: "2026",
    },
    {
        slug: "anshflix",
        title: "AnshFlix",
        category: "Full-stack",
        description:
            "A movie database with login and signup, personal watchlists, and comments — a full product from auth to UI.",
        tags: ["JavaScript", "Auth", "MovieDB"],
        image: "/projects/og-anshflix.png",
        live: "https://anshflix.vercel.app",
        github: "https://github.com/AnshRoshan/anshflix",
        year: "2024",
    },
    {
        slug: "heart-disease-prediction",
        title: "Heart Disease Prediction",
        category: "Machine Learning",
        description:
            "A classification model that predicts heart-failure risk from clinical features, with data cleaning, feature engineering, and model evaluation in a reproducible notebook.",
        tags: ["Python", "scikit-learn", "Pandas"],
        image: "/projects/heart-disease.jpg",
        live: "https://colab.research.google.com/drive/1FiQ-stb81wMvrwq-94k5bpvVK8D5MS55?usp=sharing",
        github:
            "https://colab.research.google.com/drive/1FiQ-stb81wMvrwq-94k5bpvVK8D5MS55?usp=sharing",
        year: "2024",
    },
    {
        slug: "cosmos-portfolio",
        title: "Cinematic Portfolio",
        category: "Web",
        description:
            "This site. A cinematic developer portfolio on Next.js 16 and Tailwind v4, with WebGL accents, scroll-driven motion, and a video-backed dark interface.",
        tags: ["Next.js", "TypeScript", "Tailwind", "Motion"],
        image: "/projects/portfolio.webp",
        live: "https://anshroshan.vercel.app/",
        github: "https://github.com/AnshRoshan/portfolio",
        year: "2026",
    },
    {
        slug: "social-app",
        title: "Social Media App",
        category: "Full-stack",
        description:
            "A social platform with authentication, posts, and feeds, built on Next.js and MongoDB with a focus on a fast, responsive interface.",
        tags: ["Next.js", "MongoDB", "Tailwind"],
        image: "/projects/social-app.jpg",
        live: "https://anshmeta.netlify.app/",
        github: "https://github.com/AnshRoshan/social-app",
        year: "2024",
    },
    {
        slug: "ecommerce-store",
        title: "Ecommerce Store",
        category: "Commerce",
        description:
            "A storefront with cart, checkout, and Stripe payments on Next.js and MongoDB, from product browsing through to a completed order.",
        tags: ["Next.js", "Stripe", "MongoDB"],
        image: "/projects/ecommerce.webp",
        live: "https://anshstore.vercel.app/",
        github: "https://github.com/AnshRoshan/eshop",
        year: "2023",
    },
    {
        slug: "react-projects",
        title: "React Projects Collection",
        category: "Frontend",
        description:
            "A collection of React builds spanning UI experiments and small apps, used as a sandbox for patterns and component ideas.",
        tags: ["React", "TypeScript", "Tailwind"],
        image: "/projects/react-projects.jpeg",
        live: "https://anshroshan.github.io/React-Projects/",
        github: "https://github.com/AnshRoshan/React-Projects",
        year: "2023",
    },
    /* ───────────── In flight — surfaced in the "Now building" rail ───────────── */
    {
        slug: "multi-agent-research",
        title: "Multi-agent research assistant",
        category: "Gen AI",
        description:
            "A LangGraph crew that plans, searches, verifies, and drafts a sourced brief. Human-in-the-loop checkpoints before anything is finalised.",
        tags: ["LangGraph", "Claude", "FastAPI", "Postgres"],
        year: "2026",
        status: "building",
        stage: "Alpha",
        github: "https://github.com/anshroshan",
    },
    {
        slug: "rag-eval-harness",
        title: "RAG evaluation harness",
        category: "Gen AI",
        description:
            "Retrieval and answer-quality evals that run in CI, tracking faithfulness, context precision, and regressions across chunking strategies.",
        tags: ["Python", "LlamaIndex", "pgvector"],
        year: "2026",
        status: "building",
        stage: "Prototype",
    },
    {
        slug: "claude-code-toolkit",
        title: "Claude Code agent toolkit",
        category: "Tooling",
        description:
            "Reusable skills, hooks, and MCP servers that make Claude Code a reliable teammate on real repos. Grown out of the certification work.",
        tags: ["Claude Code", "MCP", "TypeScript"],
        year: "2026",
        status: "building",
        stage: "Beta",
    },
];

export const featuredProjects: Project[] = projects.filter(
    (p) => p.featured && p.status !== "building",
);

/** In-flight projects for the Now-building rail, newest stage first. */
export const buildingProjects: Project[] = projects.filter(
    (p) => p.status === "building",
);
