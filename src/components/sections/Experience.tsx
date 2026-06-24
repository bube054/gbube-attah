import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { EXPERIENCE, HOME_COPY } from "@/content/home";
import type { ExperienceItem, HomeCopy } from "@/types/content";

export function Experience({
  copy = HOME_COPY,
  experience = EXPERIENCE,
}: {
  copy?: HomeCopy;
  experience?: ExperienceItem[];
}) {
  return (
    <section id="experience" className="experience">
      <Reveal>
        <SectionLabel num="05" name={copy.expLabel} />
      </Reveal>
      <div className="exp-list">
        {experience.map((e, i) => (
          <Reveal delay={i * 80} key={`${e.role}-${e.period}`}>
            <div className="exp-row">
              <span className="exp-period">{e.period}</span>
              <div>
                <div className="exp-role">{e.role}</div>
                <div className="exp-org">{e.org}</div>
                <p className="exp-desc">{e.description}</p>
              </div>
              <span className="exp-kind">{e.kind}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
