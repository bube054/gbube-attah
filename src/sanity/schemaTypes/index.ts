import { defineArrayMember, defineField, defineType } from "sanity";

/** Shared factory helpers — fresh field configs per type. */
const orderField = () =>
  defineField({
    name: "order",
    title: "Order",
    type: "number",
    description: "Lower numbers appear first.",
    initialValue: 0,
  });

const str = (name: string, title: string, group?: string) =>
  defineField({ name, title, type: "string", group });
const txt = (name: string, title: string, group?: string, rows = 3) =>
  defineField({ name, title, type: "text", rows, group });

/* ---------------- Shared objects ---------------- */

const seo = defineType({
  name: "seo",
  title: "SEO & social",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "Meta title", type: "string", description: "≤ 60 chars. Falls back to the name + role." }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 2, description: "≤ 160 chars." }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", options: { hotspot: true }, description: "1.91:1 recommended." }),
  ],
});

/* ---------------- Singletons ---------------- */

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    str("name", "Name"),
    str("role", "Role / title"),
    str("email", "Email"),
    str("resumeUrl", "Résumé URL"),
    str("githubUrl", "GitHub URL"),
    str("bookingUrl", "Booking URL (cal.com / Calendly) — leave empty to hide the Book button"),
    str("bookingLabel", "Booking button label (e.g. Book a call)"),
    str("githubUsername", "GitHub username (powers live repos & stats)"),
    str("devtoUsername", "dev.to username (powers live articles)"),
    str("mediumUsername", "Medium username (powers live articles)"),
    str("availableLabel", "Availability label"),
    defineField({ name: "available", title: "Available for work", type: "boolean", initialValue: true }),
    str("footerCopyright", "Footer copyright name"),
    defineField({ name: "seo", title: "Default SEO & social", type: "seo" }),
    defineField({
      name: "nav",
      title: "Navigation",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Anchor", type: "string", description: "In-page anchor, e.g. #work" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform key", type: "string", description: "github / medium / devto / linkedin / x / youtube" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

const homePage = defineType({
  name: "homePage",
  title: "Page copy",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "work", title: "Work" },
    { name: "opensource", title: "Open Source" },
    { name: "sections", title: "Section labels" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    str("heroEyebrowLeft", "Hero · eyebrow (left)", "hero"),
    str("heroEyebrowRight", "Hero · eyebrow (right)", "hero"),
    str("heroTitleTop", "Hero · title (top line)", "hero"),
    str("heroTitleBottom", "Hero · title (bottom line, accent)", "hero"),
    txt("heroLead", "Hero · lead (wrap a phrase in *asterisks* for accent)", "hero"),
    str("heroPrimaryCta", "Hero · primary button", "hero"),
    defineField({ name: "heroPortrait", title: "Hero · portrait", type: "image", options: { hotspot: true }, group: "hero" }),
    defineField({ name: "marquee", title: "Hero · marquee words", type: "array", of: [{ type: "string" }], group: "hero" }),

    str("aboutLabel", "About · section label", "about"),
    txt("aboutLeadOne", "About · paragraph 1 (*asterisks* = accent)", "about"),
    txt("aboutLeadTwo", "About · paragraph 2", "about"),
    str("statReposLabel", "About · stat 1 label — value is the live GitHub repo count", "about"),
    str("statStarsLabel", "About · stat 2 label — value is live total GitHub stars", "about"),
    str("statYearsLabel", "About · stat 3 label — value is years since the GitHub join date", "about"),
    str("statStackLabel", "About · stat 4 label", "about"),
    str("primaryStack", "About · primary stack value (e.g. Go · TS)", "about"),

    str("workLabel", "Work · section label", "work"),
    str("workNote", "Work · note (top-right)", "work"),
    str("workCorporateLabel", "Work · corporate sub-label", "work"),
    str("workCommunityLabel", "Work · community sub-label", "work"),

    str("osLabel", "Open Source · section label", "opensource"),
    str("osGithubLabel", "Open Source · GitHub link label", "opensource"),
    str("osGithubUrl", "Open Source · GitHub URL", "opensource"),
    txt("osTitle", "Open Source · heading (*asterisks* = accent)", "opensource", 2),

    str("skillsLabel", "Skills · section label", "sections"),
    str("expLabel", "Experience · section label", "sections"),
    str("writingLabel", "Writing · section label", "sections"),
    str("writingNote", "Writing · note (top-right)", "sections"),
    str("writingArticlesLabel", "Writing · articles sub-label", "sections"),

    str("contactLabel", "Contact · section label", "contact"),
    str("contactTitleTop", "Contact · title (top line)", "contact"),
    str("contactTitleBottom", "Contact · title (bottom line, accent)", "contact"),
    str("contactEmailCta", "Contact · email button", "contact"),
    str("contactResumeCta", "Contact · résumé button", "contact"),
    str("contactGithubCta", "Contact · GitHub button", "contact"),

    defineField({ name: "seo", title: "SEO & social", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Page copy" }) },
});

/* ---------------- Repeatable documents ----------------
   Note: open-source repos, the About stats, and the articles list are NOT
   modelled here — they're pulled live from GitHub / dev.to / Medium. */

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    str("title", "Title"),
    txt("description", "Description", undefined, 2),
    str("href", "Link"),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      initialValue: "corporate",
      options: {
        list: [
          { title: "Corporate", value: "corporate" },
          { title: "Non-Corporate & Community", value: "community" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "image", title: "Screenshot", type: "image", options: { hotspot: true } }),
    orderField(),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "group" } },
});

const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill group",
  type: "document",
  fields: [
    str("heading", "Heading"),
    defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
    orderField(),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "heading" } },
});

const experienceItem = defineType({
  name: "experienceItem",
  title: "Experience",
  type: "document",
  fields: [
    str("period", "Period (e.g. 2023 — Now)"),
    str("role", "Role"),
    str("org", "Organisation"),
    txt("description", "Description", undefined, 2),
    str("kind", "Kind (e.g. Full-time)"),
    orderField(),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "role", subtitle: "org" } },
});

const writingPlatform = defineType({
  name: "writingPlatform",
  title: "Writing · Platform",
  type: "document",
  fields: [
    str("name", "Name"),
    str("handle", "Handle"),
    str("href", "Link"),
    str("glyph", "Badge letters (e.g. M, DEV)"),
    defineField({ name: "square", title: "Square badge", type: "boolean", initialValue: false }),
    orderField(),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "handle" } },
});

export const schemaTypes = [
  seo,
  siteSettings,
  homePage,
  project,
  skillGroup,
  experienceItem,
  writingPlatform,
];

/** Document types that are singletons (one editable doc, no create/delete). */
export const singletonTypes = new Set(["siteSettings", "homePage"]);
