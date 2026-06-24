/**
 * Live writing, pulled from dev.to and Medium.
 *
 * dev.to exposes a public JSON API; Medium only publishes an RSS feed, which we
 * parse minimally. Posts from both are merged and sorted newest-first. If both
 * sources are empty (e.g. nothing published yet) or unreachable, we fall back to
 * the curated list — so the section is always populated and updates itself the
 * moment a new post goes live. ISR-cached for an hour.
 */
import { cache } from "react";
import { ARTICLES } from "@/content/home";
import type { Article } from "@/types/content";

type DatedArticle = Article & { date: number };

async function fromDevto(username: string): Promise<DatedArticle[]> {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${username}&per_page=12`, {
      headers: { "User-Agent": "gbube-portfolio" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const arr = (await res.json()) as Array<{ title: string; url: string; published_at?: string }>;
    return arr.map((a) => ({
      platform: "dev.to",
      title: a.title,
      href: a.url,
      date: a.published_at ? Date.parse(a.published_at) : 0,
    }));
  } catch {
    return [];
  }
}

async function fromMedium(username: string): Promise<DatedArticle[]> {
  try {
    const res = await fetch(`https://medium.com/feed/@${username}`, {
      headers: { "User-Agent": "Mozilla/5.0 gbube-portfolio" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const decode = (s: string) => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
    const pick = (seg: string, re: RegExp) => decode((seg.match(re) || [])[1] ?? "");
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map((m) => {
        const seg = m[1];
        return {
          platform: "Medium",
          title: pick(seg, /<title>([\s\S]*?)<\/title>/),
          href: pick(seg, /<link>([\s\S]*?)<\/link>/).split("?")[0],
          date: Date.parse(pick(seg, /<pubDate>([\s\S]*?)<\/pubDate>/)) || 0,
        };
      })
      .filter((a) => a.title && a.href);
  } catch {
    return [];
  }
}

export const getArticles = cache(
  async (opts: { devto?: string; medium?: string; limit?: number }): Promise<Article[]> => {
    const [devto, medium] = await Promise.all([
      opts.devto ? fromDevto(opts.devto) : Promise.resolve([]),
      opts.medium ? fromMedium(opts.medium) : Promise.resolve([]),
    ]);
    const merged = [...devto, ...medium].sort((a, b) => b.date - a.date);
    if (merged.length === 0) return ARTICLES;
    return merged.slice(0, opts.limit ?? 6).map(({ platform, title, href }) => ({ platform, title, href }));
  },
);
