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

// Heatmap intensity ramp, tinted to the site cyan. Level 0 is the unlit floor
// and has to come from a token: a white cell is invisible on a light panel.
const LEVEL_BG = [
    "var(--heat-0)",
    "rgba(34,211,238,0.30)",
    "rgba(34,211,238,0.52)",
    "rgba(34,211,238,0.78)",
    "#22d3ee",
];

const nf = new Intl.NumberFormat("en-US");

/* 53 columns at 20px + 3px gap = 1216px, which fills the full-width panel at
   1400px and scrolls horizontally below that. */
const CELL = 20;
const PITCH = CELL + 3;
/** Month ticks are ~22px wide; anything closer than this collides. */
const MONTH_MIN_GAP = 3;

function Heatmap({ days }: { days: ContribDay[] }) {
    // Pad the front so weekday rows line up (0 = Sunday). UTC for determinism.
    const offset = new Date(days[0].date).getUTCDay();
    return (
        <div
            className="grid grid-flow-col grid-rows-7 gap-[3px]"
            style={{ gridAutoColumns: `${CELL}px` }}
        >
            {Array.from({ length: offset }).map((_, i) => (
                <span key={`pad-${i}`} style={{ height: CELL, width: CELL }} />
            ))}
            {days.map((d) => (
                <span
                    key={d.date}
                    title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                    className="rounded-[2px]"
                    style={{
                        height: CELL,
                        width: CELL,
                        backgroundColor: LEVEL_BG[d.level] ?? LEVEL_BG[0],
                    }}
                />
            ))}
        </div>
    );
}

/** Month ticks above the calendar. Day i sits in column floor(i / 7), so a
    label lands at column * pitch without measuring the DOM. Ticks closer than
    MONTH_MIN_GAP columns to the previous one are dropped so they never
    overlap. */
function MonthScale({ days }: { days: ContribDay[] }) {
    const months: { key: string; label: string; col: number }[] = [];
    let last = "";
    let lastCol = -MONTH_MIN_GAP;
    days.forEach((d, i) => {
        const dt = new Date(d.date);
        const key = `${dt.getUTCFullYear()}-${dt.getUTCMonth()}`;
        if (key === last) return;
        last = key;
        const col = Math.floor(i / 7);
        if (col - lastCol < MONTH_MIN_GAP) return;
        lastCol = col;
        months.push({
            key,
            label: dt.toLocaleString("en-US", {
                month: "short",
                timeZone: "UTC",
            }),
            col,
        });
    });

    return (
        <div
            className="relative h-3.5"
            style={{ width: Math.ceil(days.length / 7) * PITCH }}
            aria-hidden
        >
            {months.map((m) => (
                <span
                    key={m.key}
                    className="absolute top-0 font-mono text-[9.5px] text-muted uppercase tracking-[0.1em]"
                    style={{ left: m.col * PITCH }}
                >
                    {m.label}
                </span>
            ))}
        </div>
    );
}

/**
 * GitHub panel. The heatmap leads (it is the activity signal worth showing) in
 * a wide panel; a spec column beside it carries the profile numbers and the
 * language spread as ranked bars. Data is fetched and cached upstream
 * (lib/github.ts), so this renders into static HTML.
 */
export default function GithubStats({
    stats,
    contributions,
}: {
    stats: Stats;
    contributions: GithubContributions | null;
}) {
    const figures = [
        { k: "Public repos", v: nf.format(stats.repos) },
        { k: "Stars", v: nf.format(stats.stars) },
        { k: "Followers", v: nf.format(stats.followers) },
    ];

    return (
        <div className="flex flex-col gap-5">
            {/* Heatmap — the lead panel, full width so the calendar can be
                large enough to actually read */}
            <Reveal y={26}>
                <div className="glow-card relative flex flex-col gap-7 overflow-hidden rounded-[1.5rem] border border-line bg-[linear-gradient(160deg,var(--surface)_0%,var(--ink)_82%)] p-6 shadow-elev-1 sm:p-7">
                    <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                    />

                    <div className="relative flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                        <div>
                            <span className="font-mono text-[10px] text-muted uppercase tracking-[0.24em]">
                                Contribution year
                            </span>
                            <p className="mt-2 font-display font-semibold text-4xl text-paper tabular-nums tracking-tight sm:text-5xl">
                                {contributions ? (
                                    <>
                                        <span className="text-accent">
                                            {nf.format(contributions.total)}
                                        </span>
                                        <span className="ml-3 align-middle font-mono text-muted text-xs tracking-normal">
                                            in the last 12 months
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl text-muted">
                                        Heatmap unavailable
                                    </span>
                                )}
                            </p>
                        </div>
                        <a
                            href={stats.profileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 font-mono text-muted text-xs transition-all duration-300 hover:border-accent/45 hover:text-paper"
                        >
                            <IconBrandGithub
                                size={15}
                                stroke={1.7}
                                className="text-accent"
                            />
                            @{stats.username}
                            <IconArrowUpRight
                                size={12}
                                className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                            />
                        </a>
                    </div>

                    {contributions ? (
                        <>
                            <div className="relative -mb-1 overflow-x-auto pb-1">
                                <div className="flex flex-col gap-2">
                                    <MonthScale days={contributions.days} />
                                    <Heatmap days={contributions.days} />
                                </div>
                            </div>
                            <div className="relative flex items-center justify-between gap-4 border-line border-t pt-4">
                                <span className="font-mono text-[10.5px] text-muted uppercase tracking-[0.18em]">
                                    {nf.format(stats.repos)} public repositories
                                </span>
                                <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                                    Less
                                    {LEVEL_BG.map((c) => (
                                        <span
                                            key={c}
                                            className="rounded-[3px]"
                                            style={{
                                                height: CELL - 5,
                                                width: CELL - 5,
                                                backgroundColor: c,
                                            }}
                                        />
                                    ))}
                                    More
                                </span>
                            </div>
                        </>
                    ) : null}
                </div>
            </Reveal>

            {/* Profile figures + language spread */}
            <div className="grid gap-5 sm:grid-cols-2">
                <Reveal y={24} delay={0.08}>
                    <div className="flex h-full flex-col rounded-[1.5rem] border border-line bg-surface/70 p-6 shadow-elev-1 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <IconBrandGithub
                                size={20}
                                stroke={1.6}
                                className="text-accent"
                            />
                            <h3 className="font-display font-semibold text-base text-paper tracking-tight">
                                Profile
                            </h3>
                        </div>
                        <dl className="mt-5 flex flex-col gap-3">
                            {figures.map(({ k, v }) => (
                                <div
                                    key={k}
                                    className="flex items-center gap-2.5"
                                >
                                    <dt className="shrink-0 font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                                        {k}
                                    </dt>
                                    <span
                                        aria-hidden
                                        className="h-px min-w-6 flex-1 bg-[repeating-linear-gradient(90deg,var(--line-2)_0_2px,transparent_2px_6px)]"
                                    />
                                    <dd className="shrink-0 font-medium text-[13px] text-paper tabular-nums">
                                        {v}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-auto border-line border-t pt-4 font-mono text-[10px] text-muted uppercase tracking-[0.16em]">
                            On GitHub since {stats.joinedYear}
                        </p>
                    </div>
                </Reveal>

                {stats.topLanguages.length > 0 && (
                    <Reveal y={24} delay={0.16}>
                        <div className="flex h-full flex-col rounded-[1.5rem] border border-line bg-surface/70 p-6 shadow-elev-1 backdrop-blur-xl">
                            <h3 className="font-mono text-[10px] text-muted uppercase tracking-[0.24em]">
                                Repos by language
                            </h3>
                            <div className="mt-5 flex flex-1 flex-col justify-between gap-3.5">
                                {stats.topLanguages.map((l) => (
                                    <div
                                        key={l.name}
                                        className="flex flex-col gap-1.5"
                                    >
                                        <div className="flex items-baseline justify-between gap-3">
                                            <span className="inline-flex items-center gap-2 font-medium text-[13px] text-paper">
                                                <span
                                                    className="h-2 w-2 shrink-0 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            LANG_COLOR[
                                                                l.name
                                                            ] ?? "var(--muted)",
                                                    }}
                                                />
                                                {l.name}
                                            </span>
                                            <span className="font-mono text-[10.5px] text-muted tabular-nums">
                                                {l.pct}%
                                            </span>
                                        </div>
                                        <span className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                                            <span
                                                className="block h-full rounded-full"
                                                style={{
                                                    width: `${l.pct}%`,
                                                    backgroundColor:
                                                        LANG_COLOR[l.name] ??
                                                        "var(--muted)",
                                                }}
                                            />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
