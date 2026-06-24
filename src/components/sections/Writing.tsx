import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { ARTICLES, HOME_COPY, WRITING_PLATFORMS } from "@/content/home";
import { hasLink } from "@/lib/links";
import type { Article, HomeCopy, WritingPlatform } from "@/types/content";

export function Writing({
  copy = HOME_COPY,
  platforms = WRITING_PLATFORMS,
  articles = ARTICLES,
}: {
  copy?: HomeCopy;
  platforms?: WritingPlatform[];
  articles?: Article[];
}) {
  return (
    <section id="writing" className="writing">
      <div className="writing-head">
        <Reveal>
          <SectionLabel num="06" name={copy.writingLabel} />
        </Reveal>
        <Reveal>
          <span className="writing-note">{copy.writingNote}</span>
        </Reveal>
      </div>

      <div className="platform-grid">
        {platforms.filter((p) => hasLink(p.href)).map((p, i) => (
          <Reveal className="card-cell" delay={i * 80} key={p.name}>
            <a className="platform-card" href={p.href} target="_blank" rel="noopener noreferrer">
              <div className="platform-left">
                <span className={`platform-badge ${p.square ? "square" : ""}`.trim()}>{p.glyph}</span>
                <div>
                  <div className="platform-name">{p.name}</div>
                  <div className="platform-handle">{p.handle}</div>
                </div>
              </div>
              <span className="platform-follow">Follow ↗</span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="articles-label">↳ {copy.writingArticlesLabel}</div>
      </Reveal>
      <div className="article-list">
        {articles.map((a, i) => (
          <Reveal delay={i * 70} key={a.title}>
            <a className="article-row" href={a.href} target="_blank" rel="noopener noreferrer">
              <span className="article-platform">{a.platform}</span>
              <span className="article-title">{a.title}</span>
              <span className="article-arrow">↗</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
