/** The "(01) About" monospace section marker used at the top of each section. */
export function SectionLabel({ num, name }: { num: string; name: string }) {
  return (
    <div className="sec-label">
      <span>({num})</span>
      <span className="name">{name}</span>
    </div>
  );
}
