/**
 * Infinite scrolling band of tech keywords. Two identical copies sit side by
 * side and the track translates by -50%, so the loop is seamless.
 */
export function Marquee({ words }: { words: string[] }) {
  const sep = "  ✦  "; // "  ✦  " with non-breaking spaces
  const content = words.join(sep) + sep;
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}
