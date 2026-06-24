import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { HOME_COPY, SKILLS } from "@/content/home";
import type { HomeCopy, SkillGroup } from "@/types/content";

export function Skills({ copy = HOME_COPY, skills = SKILLS }: { copy?: HomeCopy; skills?: SkillGroup[] }) {
  return (
    <section id="skills" className="skills">
      <Reveal>
        <SectionLabel num="04" name={copy.skillsLabel} />
      </Reveal>
      <div className="skills-grid">
        {skills.map((g, i) => (
          <Reveal delay={i * 70} key={g.heading}>
            <div className="skill-head">{g.heading}</div>
            <div className="skill-list">
              {g.items.map((it) => (
                <span key={it}>{it}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
