/**
 * Curated page content, sourced from Sanity with local fallbacks.
 *
 * Only the *editorial* content lives here: hero + section copy, the client/
 * product projects, skills, experience and the writing platform cards. The
 * open-source repos, the About stats and the articles list are pulled live —
 * see `lib/github.ts` and `lib/articles.ts`.
 *
 * Field names in the GROQ projections match `src/types/content.ts`, so no
 * per-field mapping is needed; anything missing falls back to `content/home.ts`.
 */
import { cache } from "react";
import { EXPERIENCE, HOME_COPY, PROJECTS, SKILLS, WRITING_PLATFORMS } from "@/content/home";
import type {
  AboutStat,
  ExperienceItem,
  HomeCopy,
  Project,
  SkillGroup,
  WritingPlatform,
} from "@/types/content";
import type { GithubData } from "./github";
import { mergeDefaults, sanityFetch, useList } from "./sanity";

export interface HomeContent {
  copy: HomeCopy;
  projects: Project[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  platforms: WritingPlatform[];
}

interface RawHome {
  copy?: Partial<HomeCopy>;
  projects?: Project[];
  skills?: SkillGroup[];
  experience?: ExperienceItem[];
  platforms?: WritingPlatform[];
}

const HOME_QUERY = `{
  "copy": *[_type == "homePage"][0]{ ..., "heroPortrait": heroPortrait.asset->url, marquee },
  "projects": *[_type == "project"] | order(order asc){ title, description, href, tags, group, "image": image.asset->url },
  "skills": *[_type == "skillGroup"] | order(order asc){ heading, items },
  "experience": *[_type == "experienceItem"] | order(order asc){ period, role, org, description, kind },
  "platforms": *[_type == "writingPlatform"] | order(order asc){ name, handle, href, glyph, square }
}`;

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const data = await sanityFetch<RawHome>(HOME_QUERY);
  return {
    copy: mergeDefaults(HOME_COPY, data?.copy),
    projects: useList(data?.projects, PROJECTS),
    skills: useList(data?.skills, SKILLS),
    experience: useList(data?.experience, EXPERIENCE),
    platforms: useList(data?.platforms, WRITING_PLATFORMS),
  };
});

/**
 * The four About stats. Repo count, stars and years are inferred live from
 * GitHub; the primary stack is editorial. Labels come from the (editable) copy.
 * If the GitHub fetch failed, fall back to representative values.
 */
export function aboutStatsFrom(copy: HomeCopy, gh: GithubData): AboutStat[] {
  return [
    { label: copy.statReposLabel, value: gh.ok ? String(gh.repoCount) : "28" },
    { label: copy.statStarsLabel, value: `${gh.ok ? gh.totalStars : 44}★`, accent: true },
    { label: copy.statYearsLabel, value: `${gh.ok ? gh.yearsShipping : 5}+` },
    { label: copy.statStackLabel, value: copy.primaryStack },
  ];
}
