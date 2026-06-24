import { Accented } from "@/components/Accented";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { HOME_COPY, REPOS } from "@/content/home";
import { hasLink } from "@/lib/links";
import type { HomeCopy, Repo } from "@/types/content";

export function OpenSource({ copy = HOME_COPY, repos = REPOS }: { copy?: HomeCopy; repos?: Repo[] }) {
  return (
    <section id="opensource" className="opensource">
      <div className="os-head">
        <Reveal>
          <SectionLabel num="03" name={copy.osLabel} />
        </Reveal>
        {hasLink(copy.osGithubUrl) && (
          <Reveal>
            <a className="os-github" href={copy.osGithubUrl} target="_blank" rel="noopener noreferrer">
              {copy.osGithubLabel} ↗
            </a>
          </Reveal>
        )}
      </div>

      <Reveal>
        <h2 className="os-title">
          <Accented text={copy.osTitle} />
        </h2>
      </Reveal>

      <div className="repo-grid">
        {repos.map((r, i) => (
          <Reveal className="card-cell" delay={i * 80} key={r.name}>
            <a className="repo-card" href={r.href} target="_blank" rel="noopener noreferrer">
              <div className="repo-top">
                <span className="repo-kind">{r.label}</span>
                <span className="repo-stars">★ {r.stars}</span>
              </div>
              <div className="repo-name">{r.name}</div>
              <p className="repo-desc">{r.description}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
