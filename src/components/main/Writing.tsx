import { IconArrowUpRight } from "@tabler/icons-react";
import SectionHeading from "@/components/sections/SectionHeading";
import Reveal from "@/components/sub/Reveal";
import { siteConfig } from "@/config/site";

type Post = {
    title: string;
    slug: string;
    description?: string;
    date?: string;
};

/**
 * Latest posts are fetched from the blog's Sanity dataset at build time when
 * NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET are configured
 * (same project the blog site uses). Without them the section degrades to an
 * honest "visit the blog" band — never fabricated post titles.
 */
async function latestPosts(): Promise<Post[]> {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
    if (!projectId) return [];

    const query = encodeURIComponent(
        `*[_type == "post" && (published == true || !defined(published))][0...3]{ title, "slug": slug.current, description, "date": publishedAt }`
    );
    try {
        const res = await fetch(
            `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return [];
        const json = (await res.json()) as { result?: Post[] };
        return Array.isArray(json.result) ? json.result : [];
    } catch {
        return [];
    }
}

function formatDate(iso?: string) {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

export default async function Writing() {
    const posts = await latestPosts();

    return (
        <section className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
            <SectionHeading
                index="05"
                eyebrow="Writing"
                title={
                    <>
                        Notes from the{" "}
                        <span className="text-accent">trenches</span>.
                    </>
                }
                description="Longer thinking lives on the blog: the parts that don't fit in a README."
                action={
                    <a
                        href={siteConfig.links.blog}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-medium text-paper text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/50 hover:text-accent"
                    >
                        Visit the blog
                        <IconArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </a>
                }
            />

            {posts.length > 0 ? (
                <div className="mt-14 grid gap-5 md:grid-cols-3">
                    {posts.map((post, i) => (
                        <Reveal key={post.slug} delay={i * 0.1} y={30}>
                            <a
                                href={`${siteConfig.links.blog}/blog/${post.slug}`}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="glow-card spotlight group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-surface/90"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10.5px] text-accent uppercase tracking-[0.09em]">
                                        Blog
                                    </span>
                                    {formatDate(post.date) && (
                                        <span className="font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                                            {formatDate(post.date)}
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-display font-semibold text-[17px] text-paper leading-snug tracking-tight transition-colors group-hover:text-accent">
                                    {post.title}
                                </h3>
                                {post.description && (
                                    <p className="text-[13.5px] text-muted leading-relaxed">
                                        {post.description}
                                    </p>
                                )}
                                <span className="mt-auto inline-flex items-center gap-2 pt-2 font-medium text-[12.5px] text-muted transition-colors group-hover:text-accent">
                                    Read on the blog
                                    <IconArrowUpRight
                                        size={14}
                                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </span>
                            </a>
                        </Reveal>
                    ))}
                </div>
            ) : (
                <Reveal y={26} className="mt-14">
                    <div className="glow-card relative overflow-hidden rounded-3xl border border-line bg-surface/50 p-8 backdrop-blur-sm sm:p-10">
                        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent)]" />
                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="font-display font-semibold text-paper text-xl tracking-tight sm:text-2xl">
                                    Deep dives on agents, retrieval and
                                    evaluation.
                                </p>
                                <p className="mt-2 max-w-[52ch] text-muted text-sm">
                                    Published at blog.anshroshan.com. Fresh
                                    writing on RAG pipelines, LLM evals and
                                    shipping AI, straight from production work.
                                </p>
                            </div>
                            <a
                                href={siteConfig.links.blog}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="group inline-flex shrink-0 items-center gap-2 font-mono text-accent text-xs uppercase tracking-[0.18em]"
                            >
                                <span className="link-sweep">Read now</span>
                                <IconArrowUpRight
                                    size={14}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </a>
                        </div>
                    </div>
                </Reveal>
            )}
        </section>
    );
}
