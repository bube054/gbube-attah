import type { CSSProperties } from "react";
import type { IconName } from "@/types/content";
import { Icon } from "./Icon";

interface PHImageProps {
  /** Real image URL; when absent a styled placeholder is shown. */
  src?: string;
  /** Caption shown on the placeholder + used as alt text. */
  label?: string;
  icon?: IconName;
  className?: string;
  style?: CSSProperties;
}

/**
 * Image slot with a graceful placeholder. Renders a real `<img>` when `src` is
 * provided (e.g. a Sanity asset URL), otherwise a dark gradient panel with an
 * icon + caption — so the layout looks intentional before photos are added.
 */
export function PHImage({ src, label, icon = "image", className = "", style }: PHImageProps) {
  return (
    <div className={`ph ${className}`.trim()} style={style}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="ph-img" src={src} alt={label ?? ""} />
      ) : (
        <span className="ph-inner">
          <Icon name={icon} />
          {label && <span className="ph-label">{label}</span>}
        </span>
      )}
    </div>
  );
}
