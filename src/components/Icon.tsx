import { Code2, Image as ImageIcon, Terminal, UserRound, type LucideIcon } from "lucide-react";
import type { IconName } from "@/types/content";

/** kebab-case name → lucide-react component. Used for placeholder graphics. */
const ICONS: Record<string, LucideIcon> = {
  image: ImageIcon,
  user: UserRound,
  code: Code2,
  terminal: Terminal,
};

export function Icon({
  name,
  size = 30,
  strokeWidth = 1.6,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const Glyph = ICONS[name];
  if (!Glyph) return null;
  return <Glyph width={size} height={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
