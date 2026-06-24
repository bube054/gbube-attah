/**
 * Content types for the Gbubemi Attah portfolio.
 *
 * Every piece of editable copy/data on the site is described here. The defaults
 * live in `src/content/*` as typed constants; when Sanity is configured the same
 * shapes are returned from GROQ queries and overlaid onto the defaults, so the
 * components that consume them never change.
 *
 * Some copy strings support inline emphasis: wrap a phrase in *asterisks* and it
 * renders in the mint accent colour (see `Accented` in src/components/Accented.tsx).
 */

/** A lucide-react icon name in kebab-case, e.g. "arrow-right". */
export type IconName = string;

export interface NavItem {
  label: string;
  /** In-page anchor, e.g. "#work". */
  href: string;
}

export interface SocialLink {
  /** Lowercase key used for the footer label and ordering. */
  platform: string;
  label: string;
  url: string;
}

/** Per-document SEO overrides; all optional (fall back to page content). */
export interface SeoData {
  title?: string;
  description?: string;
  ogImage?: string;
}

/** Global chrome — nav + footer, shown on the page. */
export interface SiteSettings {
  name: string;
  role: string;
  email: string;
  resumeUrl: string;
  githubUrl: string;
  /** cal.com / Calendly scheduling link + the CTA label. Empty hides the button. */
  bookingUrl: string;
  bookingLabel: string;
  /** Handles used to pull live data — repos from GitHub, posts from dev.to/Medium. */
  githubUsername: string;
  devtoUsername: string;
  mediumUsername: string;
  /** Status pill text ("Available for work"). */
  availableLabel: string;
  available: boolean;
  nav: NavItem[];
  socials: SocialLink[];
  /** Name shown after "©  {year}" in the footer. */
  footerCopyright: string;
  seo: SeoData;
}

/** A labelled stat in the About sidebar. */
export interface AboutStat {
  label: string;
  value: string;
  /** Render the value in the accent colour. */
  accent?: boolean;
}

export interface Project {
  title: string;
  description: string;
  href: string;
  tags: string[];
  /** Optional screenshot URL; falls back to a styled placeholder. */
  image?: string;
  /** Grouping shown under the "Corporate" / "Community" sub-labels. */
  group: "corporate" | "community";
}

export interface Repo {
  name: string;
  /** Small uppercase label above the name, e.g. "Go module". */
  label: string;
  stars: number;
  description: string;
  href: string;
}

export interface SkillGroup {
  heading: string;
  items: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  org: string;
  description: string;
  /** Short tag on the right, e.g. "Full-time", "OSS". */
  kind: string;
}

export interface WritingPlatform {
  name: string;
  handle: string;
  href: string;
  /** Letters shown in the round/square badge, e.g. "M", "DEV". */
  glyph: string;
  /** Square (rounded) badge instead of a circle. */
  square?: boolean;
}

export interface Article {
  platform: string;
  title: string;
  href: string;
}

/** Hero + per-section headings and copy for the single page. */
export interface HomeCopy {
  /* Hero */
  heroEyebrowLeft: string;
  heroEyebrowRight: string;
  heroTitleTop: string;
  heroTitleBottom: string;
  heroLead: string;
  heroPrimaryCta: string;
  heroPortrait?: string;
  marquee: string[];

  /* About (01) */
  aboutLabel: string;
  aboutLeadOne: string;
  aboutLeadTwo: string;
  /* About stats — labels are editorial; values are inferred from GitHub except
     the primary stack, which is editorial. */
  statReposLabel: string;
  statStarsLabel: string;
  statYearsLabel: string;
  statStackLabel: string;
  primaryStack: string;

  /* Selected Work (02) */
  workLabel: string;
  workNote: string;
  workCorporateLabel: string;
  workCommunityLabel: string;

  /* Open Source (03) */
  osLabel: string;
  osGithubLabel: string;
  osGithubUrl: string;
  osTitle: string;

  /* Stack & Tooling (04) */
  skillsLabel: string;

  /* Experience (05) */
  expLabel: string;

  /* Writing (06) */
  writingLabel: string;
  writingNote: string;
  writingArticlesLabel: string;

  /* Contact (07) */
  contactLabel: string;
  contactTitleTop: string;
  contactTitleBottom: string;
  contactEmailCta: string;
  contactResumeCta: string;
  contactGithubCta: string;
}
