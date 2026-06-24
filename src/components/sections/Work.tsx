import { PHImage } from "@/components/PHImage";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { HOME_COPY, PROJECTS } from "@/content/home";
import { hasLink } from "@/lib/links";
import type { HomeCopy, Project } from "@/types/content";

function ProjectCard({ p, delay }: { p: Project; delay: number }) {
  const linked = hasLink(p.href);
  const body = (
    <>
      <PHImage className="project-shot" icon="image" label={p.title} src={p.image} />
      <div className="project-body">
        <div className="project-title-row">
          <span className="project-title">{p.title}</span>
          {linked && <span className="project-arrow">↗</span>}
        </div>
        <p className="project-desc">{p.description}</p>
        <div className="project-tags">
          {p.tags.map((t) => (
            <span className="project-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );
  return (
    <Reveal className="card-cell" delay={delay}>
      {linked ? (
        <a className="project-card" href={p.href} target="_blank" rel="noopener noreferrer">
          {body}
        </a>
      ) : (
        <div className="project-card">{body}</div>
      )}
    </Reveal>
  );
}

export function Work({ copy = HOME_COPY, projects = PROJECTS }: { copy?: HomeCopy; projects?: Project[] }) {
  const corporate = projects.filter((p) => p.group === "corporate");
  const community = projects.filter((p) => p.group === "community");

  return (
    <section id="work" className="work">
      <div className="work-head">
        <Reveal>
          <SectionLabel num="02" name={copy.workLabel} />
        </Reveal>
        <Reveal>
          <span className="work-note">{copy.workNote}</span>
        </Reveal>
      </div>

      <Reveal>
        <div className="work-sublabel">↳ {copy.workCorporateLabel}</div>
      </Reveal>
      <div className="work-grid corporate">
        {corporate.map((p, i) => (
          <ProjectCard key={p.title} p={p} delay={i * 80} />
        ))}
      </div>

      <Reveal>
        <div className="work-sublabel">↳ {copy.workCommunityLabel}</div>
      </Reveal>
      <div className="work-grid">
        {community.map((p, i) => (
          <ProjectCard key={p.title} p={p} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
