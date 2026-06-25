"use client";

import { useState } from "react";

/**
 * Email CTA that always does something visible. It keeps the mailto: link (so
 * visitors with a mail client get a compose window), and on click it copies the
 * address with "Copied ✓" feedback. If the clipboard is unavailable/blocked, it
 * falls back to revealing the address inline — so the button never appears dead,
 * which a bare mailto: link does on desktops with no mail handler.
 */
export function EmailButton({
  email,
  label,
  className = "btn btn-primary btn-lg",
}: {
  email: string;
  label: string;
  className?: string;
}) {
  const [msg, setMsg] = useState<string | null>(null);

  const flash = (text: string) => {
    setMsg(text);
    window.setTimeout(() => setMsg(null), 2600);
  };

  const onClick = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(
        () => flash("Copied ✓"),
        () => flash(email),
      );
    } else {
      flash(email);
    }
  };

  return (
    <a href={`mailto:${email}`} className={className} onClick={onClick} aria-label={`Email ${email}`}>
      {msg ?? `${label} →`}
    </a>
  );
}
