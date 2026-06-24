import { SITE_SETTINGS } from "@/content/site";
import { hasLink } from "@/lib/links";
import type { SiteSettings } from "@/types/content";

export function Footer({ settings = SITE_SETTINGS }: { settings?: SiteSettings }) {
  const year = new Date().getFullYear();
  // Only show a link when it has a real URL (not empty or a "#" placeholder).
  const socials = settings.socials.filter((s) => hasLink(s.url));

  return (
    <footer className="footer">
      <span>
        © {year} {settings.footerCopyright}
      </span>
      {settings.available && (
        <span className="footer-status">
          <span className="footer-dot" />
          {settings.availableLabel}
        </span>
      )}
      {socials.length > 0 && (
        <div className="footer-links">
          {socials.map((s) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      )}
    </footer>
  );
}
