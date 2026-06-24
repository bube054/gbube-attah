"use client";

import Script from "next/script";

/**
 * cal.com booking trigger. Renders an anchor to the cal.com page (works with no
 * JS) that the cal embed upgrades into an on-page popup. The loader is the
 * official cal.com embed snippet; `Cal("ui", …)` themes the popup to match the
 * site (dark + mint brand). Returns null when no valid booking URL is set.
 */
const CAL_EMBED = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", {origin:"https://cal.com"});
Cal("ui", {"layout":"month_view","theme":"dark","cssVarsPerTheme":{"light":{"cal-brand":"#10b981"},"dark":{"cal-brand":"#34E5A1"}}});`;

export function BookButton({
  bookingUrl,
  label = "Book a call",
  className = "btn btn-primary btn-lg",
}: {
  bookingUrl: string;
  label?: string;
  className?: string;
}) {
  // The cal embed needs the link path (e.g. "attah-gbubemi"), not the full URL.
  let calLink = "";
  try {
    calLink = new URL(bookingUrl).pathname.replace(/^\/+/, "");
  } catch {
    calLink = "";
  }
  if (!calLink) return null;

  return (
    <>
      <Script id="cal-embed" strategy="afterInteractive">
        {CAL_EMBED}
      </Script>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view","theme":"dark"}'
      >
        {label} →
      </a>
    </>
  );
}
