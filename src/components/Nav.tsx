"use client";

import { useEffect, useState } from "react";
import { SITE_SETTINGS } from "@/content/site";
import { hasLink } from "@/lib/links";
import type { SiteSettings } from "@/types/content";

export function Nav({ settings = SITE_SETTINGS }: { settings?: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const socials = settings.socials.filter((s) => hasLink(s.url));

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`.trim()}>
        <a href="#top" className="nav-brand" onClick={close}>
          {settings.name}
        </a>
        <div className="nav-links">
          {settings.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>
        {settings.available && (
          <a href="#contact" className="nav-status">
            <span className="dot" />
            <span className="nav-status-text">{settings.availableLabel}</span>
          </a>
        )}
        <button
          type="button"
          className={`nav-toggle ${open ? "open" : ""}`.trim()}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div id="mobile-menu" className={`nav-menu ${open ? "open" : ""}`.trim()} aria-hidden={!open}>
        <nav className="nav-menu-links" aria-label="Mobile">
          {settings.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={close} tabIndex={open ? 0 : -1}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav-menu-foot">
          {settings.available && (
            <a href="#contact" className="nav-status" onClick={close} tabIndex={open ? 0 : -1}>
              <span className="dot" />
              <span>{settings.availableLabel}</span>
            </a>
          )}
          {socials.length > 0 && (
            <div className="nav-menu-socials">
              {socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
