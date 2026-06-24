import { Accented } from "@/components/Accented";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { ABOUT_STATS, HOME_COPY } from "@/content/home";
import type { AboutStat, HomeCopy } from "@/types/content";

export function About({ copy = HOME_COPY, stats = ABOUT_STATS }: { copy?: HomeCopy; stats?: AboutStat[] }) {
  return (
    <section id="about" className="about">
      <Reveal>
        <SectionLabel num="01" name={copy.aboutLabel} />
      </Reveal>
      <div className="about-grid">
        <Reveal>
          <p className="about-lead">
            <Accented text={copy.aboutLeadOne} />
          </p>
          <p className="about-lead-2">{copy.aboutLeadTwo}</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="about-stats">
            {stats.map((s) => (
              <div className="about-stat" key={s.label}>
                <span className="k">{s.label}</span>
                <span className={`v ${s.accent ? "accent" : ""}`.trim()}>{s.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
