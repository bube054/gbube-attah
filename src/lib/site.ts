/**
 * Global site settings (nav + footer + profile), sourced from the Sanity
 * `siteSettings` singleton with a local fallback. Fetched in the root layout.
 */
import { cache } from "react";
import { SITE_SETTINGS } from "@/content/site";
import type { SiteSettings } from "@/types/content";
import { mergeDefaults, sanityFetch } from "./sanity";

const QUERY = `*[_type == "siteSettings"][0]{
  name, role, email, resumeUrl, githubUrl, bookingUrl, bookingLabel,
  githubUsername, devtoUsername, mediumUsername,
  availableLabel, available, footerCopyright,
  seo{ title, description, "ogImage": ogImage.asset->url },
  "nav": nav[]{ label, href },
  "socials": socials[]{ platform, label, url }
}`;

// cache() dedupes within a request: metadata, layout and components share one call.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await sanityFetch<Partial<SiteSettings>>(QUERY);
  const merged = mergeDefaults(SITE_SETTINGS, data);
  if (data?.seo) merged.seo = mergeDefaults(SITE_SETTINGS.seo, data.seo);
  return merged;
});
