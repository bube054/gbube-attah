/**
 * Minimal Sanity read client (no extra dependencies).
 *
 * Reads run server-side via the Sanity Query (GROQ) HTTP API. Configure with:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID   (required to enable Sanity)
 *   NEXT_PUBLIC_SANITY_DATASET      (default "production")
 *   NEXT_PUBLIC_SANITY_API_VERSION  (default "2024-01-01")
 *   SANITY_API_READ_TOKEN           (optional; needed for private datasets)
 *
 * When the project id is absent, callers fall back to local content, so the
 * site works with or without Sanity configured.
 */
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const TOKEN = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

export const sanityConfigured = () => Boolean(PROJECT_ID);

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, string | number>,
): Promise<T | null> {
  if (!PROJECT_ID) return null;
  try {
    // Authenticated reads hit the live API; public reads use the faster CDN.
    const host = TOKEN ? "api" : "apicdn";
    // perspective=published shows ONLY published content. Without it, a token-
    // authenticated read also returns drafts, and `*[...][0]` would pick the
    // "drafts.*" doc — leaking unpublished edits onto the live site.
    let url = `https://${PROJECT_ID}.${host}.sanity.io/v${API_VERSION}/data/query/${DATASET}?perspective=published&query=${encodeURIComponent(query)}`;
    if (params) {
      for (const [k, v] of Object.entries(params)) url += `&$${k}=${encodeURIComponent(JSON.stringify(v))}`;
    }
    const res = await fetch(url, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch {
    return null;
  }
}

/**
 * Overlay non-empty CMS values onto a complete set of defaults. Only keys that
 * exist on `defaults` are considered, so empty/missing fields keep their default
 * (and extra Sanity fields like _id/_type are ignored).
 */
export function mergeDefaults<T extends object>(defaults: T, cms: Partial<T> | null | undefined): T {
  if (!cms) return defaults;
  const out: T = { ...defaults };
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    const v = cms[key];
    if (v === null || v === undefined || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[key] = v as T[keyof T];
  }
  return out;
}

/** Pick the CMS array when it has entries, otherwise the local fallback. */
export const useList = <T,>(fromCms: T[] | undefined, fallback: T[]): T[] =>
  fromCms && fromCms.length > 0 ? fromCms : fallback;
