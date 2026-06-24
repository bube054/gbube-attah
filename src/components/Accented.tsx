import { Fragment } from "react";

/**
 * Renders a copy string with inline emphasis: any phrase wrapped in *asterisks*
 * is shown in the mint accent (default) or a brighter ink (`tone="bright"`).
 */
export function Accented({ text, tone = "accent" }: { text: string; tone?: "accent" | "bright" }) {
  const parts = text.split(/\*([^*]+)\*/g); // even index = plain, odd = emphasised
  const cls = tone === "bright" ? "hl-bright" : "hl-accent";
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={cls}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
