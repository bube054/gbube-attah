import type {
  AboutStat,
  Article,
  ExperienceItem,
  HomeCopy,
  Project,
  Repo,
  SkillGroup,
  WritingPlatform,
} from "@/types/content";

/**
 * Default page content — overlaid by Sanity when configured.
 * Strings may use *asterisks* to mark a phrase for the mint accent colour.
 */
export const HOME_COPY: HomeCopy = {
  /* Hero */
  heroEyebrowLeft: "(Fullstack Software Engineer)",
  heroEyebrowRight: "Golang / JavaScript — Est. 2021",
  heroTitleTop: "Fullstack",
  heroTitleBottom: "Engineer",
  heroLead:
    "I solve problems with code — Go on the back end, React & Next.js up front. Currently building products full-stack at *Amorserv*, and shipping open-source Go libraries on the side.",
  heroPrimaryCta: "View Selected Work",
  // Committed brand asset; an upload in Studio (homePage.heroPortrait) overrides it.
  heroPortrait: "/portrait.jpg",
  marquee: [
    "Go",
    "JavaScript",
    "Next.js",
    "React",
    "Node.js",
    "Gin",
    "Docker",
    "Postgres",
    "Tailwind",
    "TypeScript",
  ],

  /* About (01) */
  aboutLabel: "About",
  aboutLeadOne:
    "I'm a fullstack engineer who likes building things that *work well* and *read clearly*. I move comfortably across the stack — designing Go APIs, modeling data, and crafting React front-ends that feel fast.",
  aboutLeadTwo:
    "My day job is full-stack product work at Amorserv. After hours I maintain a small family of open-source Go libraries — parsers, validators, and Gin middleware — used by developers who need solid, well-tested building blocks.",
  statReposLabel: "Repositories",
  statStarsLabel: "Stars Earned",
  statYearsLabel: "Years Shipping",
  statStackLabel: "Primary Stack",
  primaryStack: "Go · TS",

  /* Selected Work (02) */
  workLabel: "Selected Work",
  workNote: "Client & product builds",
  workCorporateLabel: "Corporate",
  workCommunityLabel: "Non-Corporate & Community",

  /* Open Source (03) */
  osLabel: "Open Source",
  osGithubLabel: "github.com/bube054",
  osGithubUrl: "https://github.com/bube054",
  osTitle: "Go libraries developers actually *depend on.*",

  /* Stack & Tooling (04) */
  skillsLabel: "Stack & Tooling",

  /* Experience (05) */
  expLabel: "Experience",

  /* Writing (06) */
  writingLabel: "Writing",
  writingNote: "Notes on Go, JS & building",
  writingArticlesLabel: "Latest articles",

  /* Contact (07) */
  contactLabel: "Contact",
  contactTitleTop: "Let's build",
  contactTitleBottom: "something.",
  contactEmailCta: "Email Me",
  contactResumeCta: "Download Résumé",
  contactGithubCta: "GitHub",
};

export const ABOUT_STATS: AboutStat[] = [
  { label: "Repositories", value: "28" },
  { label: "Stars Earned", value: "44★", accent: true },
  { label: "Years Shipping", value: "5+" },
  { label: "Primary Stack", value: "Go · TS" },
];

export const PROJECTS: Project[] = [
  {
    title: "Amorserv",
    description: "IT services & staffing platform — full product engineering, end to end.",
    href: "https://www.amorserv.com/",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    group: "corporate",
  },
  {
    title: "DreamCare Rides",
    description: "Non-emergency medical transport booking & scheduling experience.",
    href: "https://dreamcarerides.com/",
    tags: ["React", "Node.js", "Booking"],
    group: "corporate",
  },
  {
    title: "EvoCloud",
    description: "Cloud platform marketing & product site with rich interactive UI.",
    href: "https://www.evocloud.dev/",
    tags: ["Next.js", "TypeScript", "Cloud"],
    group: "corporate",
  },
  {
    title: "Bales of Mercy",
    description: "Non-profit foundation site — donations, programs, and storytelling.",
    href: "https://www.balesofmercy.org/",
    tags: ["React", "Non-profit"],
    group: "community",
  },
  {
    title: "Right Path Ministry",
    description: "International ministry website — events, sermons, and community.",
    href: "https://the-right-path-ministry-intl-websit.vercel.app/",
    tags: ["Next.js", "Vercel"],
    group: "community",
  },
  {
    title: "Gypsy Auto",
    description: "Auto-service web app — listings, bookings, and a clean dashboard.",
    href: "https://gypsy-auto-webapp.vercel.app/",
    tags: ["React", "Web App"],
    group: "community",
  },
];

export const REPOS: Repo[] = [
  {
    name: "jsonvx",
    label: "Go module",
    stars: 11,
    description: "A configurable JSON parser & validator for Go — strict or lenient, with clear, actionable errors.",
    href: "https://github.com/bube054/jsonvx",
  },
  {
    name: "validatorgo",
    label: "Go module",
    stars: 25,
    description: "A library of string validators & sanitizers for Go, inspired by validator.js — 100+ checks.",
    href: "https://github.com/bube054/validatorgo",
  },
  {
    name: "ginvalidator",
    label: "Go module",
    stars: 8,
    description: "Express-validator-style request validation middleware for the Gin web framework.",
    href: "https://github.com/bube054/ginvalidator",
  },
];

export const SKILLS: SkillGroup[] = [
  { heading: "Backend", items: ["Go (Golang)", "Gin", "Node.js", "REST APIs", "PostgreSQL"] },
  { heading: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"] },
  { heading: "Infra & Tools", items: ["Docker", "Git & GitHub", "CI / CD", "Vercel", "Linux"] },
  { heading: "Practice", items: ["Testing & TDD", "API Design", "Open Source", "Code Review", "Docs"] },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "2023 — Now",
    role: "Fullstack Software Engineer",
    org: "Amorserv",
    description:
      "Build and maintain product features across the stack — Next.js front-ends, TypeScript APIs, and the data layer behind them.",
    kind: "Full-time",
  },
  {
    period: "2022 — Now",
    role: "Open-Source Maintainer",
    org: "Independent — Go ecosystem",
    description:
      "Author & maintain jsonvx, validatorgo and ginvalidator — well-tested Go libraries with full documentation.",
    kind: "OSS",
  },
  {
    period: "2021 — 2023",
    role: "Freelance Web Developer",
    org: "Contract — Various clients",
    description:
      "Delivered React & Next.js sites and web apps for businesses, non-profits and ministries — design to deployment.",
    kind: "Contract",
  },
];

export const WRITING_PLATFORMS: WritingPlatform[] = [
  { name: "Medium", handle: "@attahgbube", href: "https://medium.com/@attahgbube", glyph: "M" },
  {
    name: "dev.to",
    handle: "@gbubemi_attah_8220489db16",
    href: "https://dev.to/gbubemi_attah_8220489db16",
    glyph: "DEV",
    square: true,
  },
];

export const ARTICLES: Article[] = [
  {
    platform: "Medium",
    title: "Writing a configurable JSON parser in Go",
    href: "https://medium.com/@bube054",
  },
  {
    platform: "dev.to",
    title: "Request validation in Gin, the clean way",
    href: "https://dev.to/bube054",
  },
  {
    platform: "Medium",
    title: "Shipping a Next.js product solo: what I'd do again",
    href: "https://medium.com/@bube054",
  },
];
