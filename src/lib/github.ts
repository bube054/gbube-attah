/**
 * Live data inferred from GitHub.
 *
 * The open-source repos (and their star counts, descriptions, languages) plus
 * the About stats (repo count, total stars, years shipping) are pulled straight
 * from the GitHub REST API, so they stay current with no manual edits. Results
 * are ISR-cached for an hour and fall back to local content if the API is down
 * or rate-limited. Set GITHUB_TOKEN to raise the unauthenticated rate limit.
 */
import { cache } from "react";
import { REPOS } from "@/content/home";
import type { Repo } from "@/types/content";

const API = "https://api.github.com";

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    "User-Agent": "gbube-portfolio",
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

interface GhUser {
  public_repos: number;
  created_at: string;
}
interface GhRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
}

export interface GithubData {
  /** True when the live fetch succeeded; false means values below are fallbacks. */
  ok: boolean;
  repoCount: number;
  totalStars: number;
  yearsShipping: number;
  repos: Repo[];
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: headers(), next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Map a GitHub repo to our card shape. */
function toRepo(r: GhRepo): Repo {
  return {
    name: r.name,
    label: r.language ? `${r.language} module` : "Repository",
    stars: r.stargazers_count,
    description: r.description ?? "",
    href: r.html_url,
  };
}

export const getGithubData = cache(async (username: string): Promise<GithubData> => {
  const [user, repos] = await Promise.all([
    fetchJson<GhUser>(`${API}/users/${username}`),
    fetchJson<GhRepo[]>(`${API}/users/${username}/repos?per_page=100&sort=pushed`),
  ]);

  if (!user || !repos) {
    // Live data unavailable — fall back to the curated repos + the local stats.
    return { ok: false, repoCount: 0, totalStars: 0, yearsShipping: 0, repos: REPOS };
  }

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const createdYear = new Date(user.created_at).getFullYear();
  const yearsShipping = Math.max(1, new Date().getFullYear() - createdYear);

  // Feature real, original projects developers actually use: skip forks,
  // archived repos, the portfolio repo itself, and anything without a
  // description or stars; surface the most-starred.
  const featured = repos
    .filter((r) => !r.fork && !r.archived && r.description && r.stargazers_count > 0 && r.name !== "gbube-attah")
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map(toRepo);

  return {
    ok: true,
    repoCount: user.public_repos,
    totalStars,
    yearsShipping,
    repos: featured.length > 0 ? featured : REPOS,
  };
});
