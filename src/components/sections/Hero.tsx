import { Accented } from "@/components/Accented";
import { Marquee } from "@/components/Marquee";
import { PHImage } from "@/components/PHImage";
import { Reveal } from "@/components/Reveal";
import { HOME_COPY } from "@/content/home";
import { hasLink } from "@/lib/links";
import type { HomeCopy } from "@/types/content";

export function Hero({
  copy = HOME_COPY,
  githubUrl,
  name,
}: {
  copy?: HomeCopy;
  githubUrl: string;
  name: string;
}) {
  return (
    <header id="top" className="hero">
      <div className="hero-top">
        <div className="hero-copy">
          <div className="hero-eyebrows">
            <span>{copy.heroEyebrowLeft}</span>
            <span>{copy.heroEyebrowRight}</span>
          </div>
          <h1 className="hero-title">
            <span>{copy.heroTitleTop}</span>
            <span className="accent">{copy.heroTitleBottom}</span>
          </h1>
          <p className="hero-lead">
            <Accented text={copy.heroLead} tone="bright" />
          </p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              {copy.heroPrimaryCta} →
            </a>
            {hasLink(githubUrl) && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                GitHub ↗
              </a>
            )}
          </div>
        </div>

        <Reveal delay={120} className="hero-portrait-wrap">
          <div className="hero-portrait-frame" aria-hidden="true" />
          <PHImage className="hero-portrait" icon="user" label={name} src={copy.heroPortrait} />
        </Reveal>
      </div>

      <Marquee words={copy.marquee} />
    </header>
  );
}
