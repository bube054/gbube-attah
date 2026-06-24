/**
 * Seed the Sanity dataset with the curated, editorial content (the source of
 * truth the CMS owns): site settings, page copy, projects, skill groups,
 * experience and the writing platform cards.
 *
 * NOT seeded — these are pulled live at request time and never stored here:
 *   • open-source repos + About stats  → GitHub        (src/lib/github.ts)
 *   • articles                          → dev.to/Medium (src/lib/articles.ts)
 *
 * Uses createOrReplace, so it's idempotent — safe to re-run. Reads config from
 * the environment (source .env.local first):
 *   set -a && source .env.local && set +a && node scripts/sanity-seed.mjs
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN. Source .env.local first.");
  process.exit(1);
}

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  name: "Gbubemi Attah",
  role: "Fullstack Software Engineer",
  email: "hello@gbubemi.dev",
  resumeUrl: "/Gbubemi-Attah-Resume.pdf",
  githubUrl: "https://github.com/bube054",
  githubUsername: "bube054",
  devtoUsername: "gbubemi_attah_8220489db16",
  mediumUsername: "attahgbube",
  availableLabel: "Available for work",
  available: true,
  footerCopyright: "Gbubemi Attah",
  seo: {
    description:
      "Gbubemi Attah — fullstack software engineer. Go on the back end, React & Next.js up front. Building products at Amorserv and shipping open-source Go libraries.",
  },
  nav: [
    { _key: "work", label: "Work", href: "#work" },
    { _key: "opensource", label: "Open Source", href: "#opensource" },
    { _key: "about", label: "About", href: "#about" },
    { _key: "writing", label: "Writing", href: "#writing" },
    { _key: "contact", label: "Contact", href: "#contact" },
  ],
  socials: [
    { _key: "github", platform: "github", label: "GitHub", url: "https://github.com/bube054" },
    { _key: "medium", platform: "medium", label: "Medium", url: "https://medium.com/@attahgbube" },
    { _key: "devto", platform: "devto", label: "dev.to", url: "https://dev.to/gbubemi_attah_8220489db16" },
    { _key: "linkedin", platform: "linkedin", label: "LinkedIn", url: "#" },
    { _key: "x", platform: "x", label: "X", url: "#" },
    { _key: "youtube", platform: "youtube", label: "YouTube", url: "https://www.youtube.com/@gbube054" },
  ],
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroEyebrowLeft: "(Fullstack Software Engineer)",
  heroEyebrowRight: "Golang / JavaScript — Est. 2021",
  heroTitleTop: "Fullstack",
  heroTitleBottom: "Engineer",
  heroLead:
    "I solve problems with code — Go on the back end, React & Next.js up front. Currently building products full-stack at *Amorserv*, and shipping open-source Go libraries on the side.",
  heroPrimaryCta: "View Selected Work",
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
  workLabel: "Selected Work",
  workNote: "Client & product builds",
  workCorporateLabel: "Corporate",
  workCommunityLabel: "Non-Corporate & Community",
  osLabel: "Open Source",
  osGithubLabel: "github.com/bube054",
  osGithubUrl: "https://github.com/bube054",
  osTitle: "Go libraries developers actually *depend on.*",
  skillsLabel: "Stack & Tooling",
  expLabel: "Experience",
  writingLabel: "Writing",
  writingNote: "Notes on Go, JS & building",
  writingArticlesLabel: "Latest articles",
  contactLabel: "Contact",
  contactTitleTop: "Let's build",
  contactTitleBottom: "something.",
  contactEmailCta: "Email Me",
  contactResumeCta: "Download Résumé",
  contactGithubCta: "GitHub",
};

const projects = [
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
].map((p, i) => ({
  _id: `project-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  _type: "project",
  order: i,
  ...p,
}));

const skillGroups = [
  { heading: "Backend", items: ["Go (Golang)", "Gin", "Node.js", "REST APIs", "PostgreSQL"] },
  { heading: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"] },
  { heading: "Infra & Tools", items: ["Docker", "Git & GitHub", "CI / CD", "Vercel", "Linux"] },
  { heading: "Practice", items: ["Testing & TDD", "API Design", "Open Source", "Code Review", "Docs"] },
].map((g, i) => ({
  _id: `skill-${g.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  _type: "skillGroup",
  order: i,
  ...g,
}));

const experience = [
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
    org: "Various clients",
    description:
      "Delivered React & Next.js sites and web apps for businesses, non-profits and ministries — design to deployment.",
    kind: "Contract",
  },
].map((e, i) => ({ _id: `exp-${i + 1}`, _type: "experienceItem", order: i, ...e }));

const writingPlatforms = [
  { name: "Medium", handle: "@attahgbube", href: "https://medium.com/@attahgbube", glyph: "M", square: false },
  {
    name: "dev.to",
    handle: "@gbubemi_attah_8220489db16",
    href: "https://dev.to/gbubemi_attah_8220489db16",
    glyph: "DEV",
    square: true,
  },
].map((p, i) => ({
  _id: `platform-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  _type: "writingPlatform",
  order: i,
  ...p,
}));

const docs = [siteSettings, homePage, ...projects, ...skillGroups, ...experience, ...writingPlatforms];

const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}?returnIds=true`;

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
  body: JSON.stringify({ mutations: docs.map((d) => ({ createOrReplace: d })) }),
});

const json = await res.json();
if (!res.ok) {
  console.error("Seed failed:", res.status, JSON.stringify(json));
  process.exit(1);
}
console.log(`Seeded ${json.results?.length ?? docs.length} documents into ${PROJECT_ID}/${DATASET}.`);
