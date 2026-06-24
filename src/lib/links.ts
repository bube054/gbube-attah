/** True when a URL field points to a real destination — not blank, whitespace,
 *  or a "#" placeholder. Used to hide CTAs/links whose target isn't set in the CMS. */
export function hasLink(url?: string | null): boolean {
  return !!(url && url.trim() && url.trim() !== "#");
}
