import type { NavItem, SiteSettings, SocialLink } from "@/types/content";

/** Primary navigation — in-page anchors that match the section ids. */
export const NAV: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Open Source", href: "#opensource" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const SOCIALS: SocialLink[] = [
  { platform: "github", label: "GitHub", url: "https://github.com/bube054" },
  { platform: "medium", label: "Medium", url: "https://medium.com/@attahgbube" },
  { platform: "devto", label: "dev.to", url: "https://dev.to/gbubemi_attah_8220489db16" },
  { platform: "linkedin", label: "LinkedIn", url: "#" },
  { platform: "x", label: "X", url: "#" },
  { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/@gbube054" },
];

/** Default global chrome — overridden by the `siteSettings` Sanity singleton. */
export const SITE_SETTINGS: SiteSettings = {
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
  nav: NAV,
  socials: SOCIALS,
  footerCopyright: "Gbubemi Attah",
  seo: {
    description:
      "Gbubemi Attah — fullstack software engineer. Go on the back end, React & Next.js up front. Building products at Amorserv and shipping open-source Go libraries.",
    ogImage: "",
  },
};
