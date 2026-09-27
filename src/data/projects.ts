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
    /** One-line positioning label shown on the homepage bento cards. */
    tagline?: string;
    tags: string[];
    image?: string;
    /**
     * Vertical anchor for the homepage bento cover, which is a fixed-height
     * letterbox far wider than the 16:9 artwork. Defaults to centre; set it so
     * the strip falls on the subject instead of through empty space.
     */
    coverFocus?: string;
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
        tagline: "AI Developer Tooling",
        description:
            "A self-built AI pull-request review agent in the spirit of CodeRabbit: a zero-dependency review engine that reads any diff, posts inline comments plus a summary, and runs as a GitHub Action or Cloudflare Worker with your own LLM key — no server required. Named for the jeweler's lens: close, careful inspection of every diff.",
        tags: ["TypeScript", "GitHub Actions", "Cloudflare Workers", "Next.js"],
        image: "/projects/cover-loupe.webp",
        coverFocus: "50% 38%",
        github: "https://github.com/AnshRoshan/loupe",
        year: "2026",
        featured: true,
    },
    {
        slug: "llm-benchmark",
        title: "OmniBench — LLM Benchmark",
        category: "Gen AI",
        tagline: "LLM Evaluation",
        description:
            "Point it at any model — API, aggregator, or local — and it runs a 5-pillar battery (capability, reliability, safety, agency, economics), recording every run, task, turn, span, and token. Compare models side-by-side in a full dashboard with CLI/TUI runners, three.js 3D data views, and portable run bundles that pool into community averages.",
        tags: ["TypeScript", "three.js", "CLI/TUI", "Evaluation"],
        image: "/projects/cover-llm-benchmark.webp",
        coverFocus: "50% 26%",
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
            "A hybrid agentic RAG system: it reads PDFs, Office docs, markdown, code, and web pages, builds four kinds of search indexes — BM25 vectorless, LanceDB vector, an LLM-extracted knowledge graph, and read-only text-to-SQL — and an agent decides which to chain for each question, always answering with citations. Local-first, MIT.",
        tags: ["Python", "BM25", "LanceDB", "Knowledge Graph", "Text-to-SQL"],
        image: "/projects/cover-ragstack.webp",
        coverFocus: "50% 50%",
        live: "https://anshroshan.github.io/ragstack/",
        github: "https://github.com/AnshRoshan/ragstack",
        year: "2026",
        featured: true,
        tagline: "RAG + Agents + Knowledge Systems",
    },
    {
        slug: "llmrouter",
        title: "LLM Router",
        category: "Gen AI",
        tagline: "LLM Infrastructure + Optimization",
        description:
            "A cache-aware LLM router with learned quality routing: one decision engine, two runtimes (pip + npm), zero dependencies, and an HTTP /decide sidecar that slots into LiteLLM and Bifrost to pick the best model per request on cost, latency, and quality.",
        tags: ["Python", "TypeScript", "LiteLLM", "Bifrost"],
        image: "/projects/cover-llmrouter.webp",
        coverFocus: "50% 62%",
        github: "https://github.com/AnshRoshan/llmrouter",
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
        image: "/projects/cover-aisdlc.webp",
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
        image: "/projects/cover-forge-agentic-codegen.webp",
        github: "https://github.com/AnshRoshan/agentic-codegen",
        year: "2026",
    },
    {
        slug: "cortex",
        title: "Cortex",
        category: "Full-stack",
        tagline: "Real-time Collaborative Editor",
        description:
            "A private, authenticated, multi-file collaborative workspace that presents as an AI workspace on the surface — behind the login it is a real-time collaborative code editor built on Monaco and operational transforms, with a Rust + WASM backend in a single Docker image.",
        tags: ["Rust", "WASM", "Monaco", "OT", "Docker"],
        image: "/projects/cover-cortex.webp",
        coverFocus: "50% 34%",
        github: "https://github.com/AnshRoshan/cortex",
        year: "2026",
        featured: true,
    },
    {
        slug: "create-reactor",
        title: "Create Reactor",
        category: "Tooling",
        description:
            "Interactive CLI that scaffolds modern React apps — Vite, TypeScript, Tailwind v4, shadcn/ui, TanStack Router, Convex/Supabase, Clerk, and the AI SDK. Run it with npm create reactor@latest.",
        tags: ["CLI", "Vite", "Tailwind v4", "shadcn/ui"],
        image: "/projects/cover-create-reactor.webp",
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
        image: "/projects/cover-ar-notes.webp",
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
        image: "/projects/cover-anshflix.webp",
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
        image: "/projects/heart-disease.webp",
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
        image: "/projects/social-app.webp",
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
        image: "/projects/react-projects.webp",
        live: "https://anshroshan.github.io/React-Projects/",
        github: "https://github.com/AnshRoshan/React-Projects",
        year: "2023",
    },
    /* ───────────── In flight — surfaced in the "Now building" rail ─────────────
       Private repos, so no links — the descriptions are the update. */
    {
        slug: "ams-platform",
        title: "AI AMS Platform",
        category: "Gen AI",
        description:
            "An AI-driven Application Management Services platform for enterprise support: hybrid AI triage, an SLA engine, SOP lifecycle with RAG, guarded agentic auto-resolution, ticket deflection, and effort & contract analytics.",
        tags: ["RAG", "Agentic Resolution", "SLA Engine", "Analytics"],
        year: "2026",
        status: "building",
        stage: "Alpha",
    },
    {
        slug: "hireq",
        title: "HireQ — Intelligent Recruitment",
        category: "Gen AI",
        description:
            "An intelligent recruitment platform: AI-assisted screening and hiring workflows, built end to end while it runs real processes.",
        tags: ["LLM", "Recruitment", "Full-stack"],
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
