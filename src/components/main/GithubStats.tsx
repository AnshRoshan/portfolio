import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import Reveal from "@/components/sub/Reveal";
import type {
    ContribDay,
    GithubContributions,
    GithubStats as Stats,
} from "@/lib/github";

// Brand colours for the common languages; everything else falls back to muted.
const LANG_COLOR: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    "Jupyter Notebook": "#DA5B0B",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Go: "#00ADD8",
    Rust: "#dea584",
    Java: "#b07219",
    "C++": "#f34b7d",
};

// Heatmap intensity ramp, tinted to the site cyan.
const LEVEL_BG = [
    "rgba(255,255,255,0.06)",
    "rgba(34,211,238,0.30)",
    "rgba(34,211,238,0.52)",
    "rgba(34,211,238,0.78)",
    "#22d3ee",
];

const nf = new Intl.NumberFormat("en-US");

function Heatmap({ days }: { days: ContribDay[] }) {
    // Pad the front so weekday rows line up (0 = Sunday). UTC for determinism.
    const offset = new Date(days[0].date).getUTCDay();
    return (
        <div
            className="grid grid-flow-col grid-rows-7 gap-[3px]"
            style={{ gridAutoColumns: "11px" }}
        >
            {Array.from({ length: offset }).map((_, i) => (
                <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed leading pad
                    key={`pad-${i}`}
                    className="h-[11px] w-[11px]"
                />
            ))}
            {days.map((d) => (
                <span
                    key={d.date}
                    title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                    className="h-[11px] w-[11px] rounded-[2px]"
                    style={{ backgroundColor: LEVEL_BG[d.level] ?? LEVEL_BG[0] }}
                />
            ))}
        </div>
    );
}

/**
 * GitHub panel. Leads with the contribution heatmap + the year's total (the
 * impressive, activity-based signal) instead of vanity counts. Data is fetched
 * and cached upstream (lib/github.ts), so this renders into static HTML.
 */
export default function GithubStats({
    stats,
    contributions,
}: {
    stats: Stats;
    contributions: GithubContributions | null;
}) {
    return (
        <section className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-24 md:pb-32">
            <Reveal>
                <div className="rounded-[24px] border border-line bg-surface/70 p-8 backdrop-blur-xl md:p-10">
                    {/* Header */}
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <IconBrandGithub
                                size={26}
                                stroke={1.6}
                                className="text-paper"
                            />
                            <div>
                                <h2 className="font-display text-xl font-semibold tracking-tight text-paper">
                                    On GitHub
                                </h2>
                                <a
                                    href={stats.profileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-mono group inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
                                >
                                    @{stats.username}
                                    <IconArrowUpRight
                                        size={13}
                                        stroke={1.8}
                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                    />
                                </a>
                            </div>
                        </div>
                        {contributions ? (
                            <p className="font-mono text-xs text-muted">
                                <span className="text-accent">
                                    {nf.format(contributions.total)}
                                </span>{" "}
                                contributions in the last year
                            </p>
                        ) : null}
                    </div>

                    {/* Heatmap (hero) */}
                    {contributions ? (
                        <div className="mt-7">
                            <div className="overflow-x-auto pb-2">
                                <Heatmap days={contributions.days} />
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                                    {nf.format(stats.repos)} public repositories
                                </span>
                                <span className="font-mono flex items-center gap-1.5 text-[10px] text-muted">
                                    Less
                                    {LEVEL_BG.map((c) => (
                                        <span
                                            key={c}
                                            className="h-[11px] w-[11px] rounded-[2px]"
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                    More
                                </span>
                            </div>
                        </div>
                    ) : null}

                    {/* Languages */}
                    {stats.topLanguages.length > 0 ? (
                        <div className="mt-8 border-t border-line pt-6">
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                                Most used languages
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {stats.topLanguages.map((l) => (
                                    <span
                                        key={l.name}
                                        className="font-mono inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs text-muted"
                                    >
                                        <span
                                            className="h-2 w-2 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    LANG_COLOR[l.name] ??
                                                    "#9a9aa4",
                                            }}
                                        />
                                        {l.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </Reveal>
        </section>
    );
}
