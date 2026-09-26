/**
 * GitHub profile stats, fetched through Next's data cache so the GitHub API is
 * hit at most once per `revalidate` window (here: once a day) no matter how many
 * visitors load the page. The numbers are baked into the statically-rendered
 * page; we never call the API per request, so there's no rate-limit / abuse risk.
 *
 * Optionally set GITHUB_TOKEN in the environment to lift the 60 req/hr
 * unauthenticated limit (not required for a once-a-day public fetch).
 */

const USER = "anshroshan";
const REVALIDATE_SECONDS = 86_400; // 24h

export type GithubStats = {
    username: string;
    profileUrl: string;
    repos: number;
    stars: number;
    followers: number;
    following: number;
    joinedYear: number;
    topLanguages: { name: string; pct: number }[];
};

type Repo = {
    fork: boolean;
    stargazers_count: number;
    language: string | null;
};

export async function getGithubStats(): Promise<GithubStats | null> {
    try {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
        };
        if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }
        const opts = {
            headers,
            next: { revalidate: REVALIDATE_SECONDS },
        } as const;

        const userRes = await fetch(
            `https://api.github.com/users/${USER}`,
            opts
        );
        if (!userRes.ok) return null;
        const user = await userRes.json();

        const reposRes = await fetch(
            `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`,
            opts
        );
        const repos: Repo[] = reposRes.ok ? await reposRes.json() : [];

        let stars = 0;
        const langCount: Record<string, number> = {};
        for (const r of repos) {
            if (r.fork) continue;
            stars += r.stargazers_count || 0;
            if (r.language) {
                langCount[r.language] = (langCount[r.language] || 0) + 1;
            }
        }
        const totalLangged =
            Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
        const topLanguages = Object.entries(langCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({
                name,
                pct: Math.round((count / totalLangged) * 100),
            }));

        return {
            username: USER,
            profileUrl: user.html_url ?? `https://github.com/${USER}`,
            repos: user.public_repos ?? 0,
            stars,
            followers: user.followers ?? 0,
            following: user.following ?? 0,
            joinedYear: new Date(user.created_at).getFullYear(),
            topLanguages,
        };
    } catch {
        return null;
    }
}

export type ContribDay = { date: string; count: number; level: number };
export type GithubContributions = { total: number; days: ContribDay[] };

/**
 * Contribution calendar (the green-squares heatmap) for the last year. Uses the
 * public, no-auth jogruber contributions API and is cached the same once-a-day
 * way as the profile stats. Returns null on any failure so the UI can hide it.
 */
export async function getGithubContributions(): Promise<GithubContributions | null> {
    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
            { next: { revalidate: REVALIDATE_SECONDS } }
        );
        if (!res.ok) return null;
        const data = await res.json();
        const days: ContribDay[] = (data.contributions ?? []).map(
            (d: { date: string; count: number; level: number }) => ({
                date: d.date,
                count: d.count,
                level: d.level,
            })
        );
        if (!days.length) return null;
        const total =
            data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);
        return { total, days };
    } catch {
        return null;
    }
}
