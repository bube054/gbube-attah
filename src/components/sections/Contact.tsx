import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { HOME_COPY } from "@/content/home";
import { hasLink } from "@/lib/links";
import type { HomeCopy } from "@/types/content";

export function Contact({
  copy = HOME_COPY,
  email,
  resumeUrl,
  githubUrl,
}: {
  copy?: HomeCopy;
  email: string;
  resumeUrl: string;
  githubUrl: string;
}) {
  return (
    <section id="contact" className="contact">
      <Reveal>
        <SectionLabel num="07" name={copy.contactLabel} />
      </Reveal>
      <Reveal>
        <h2 className="contact-title">
          {copy.contactTitleTop}
          <br />
          <span className="accent">{copy.contactTitleBottom}</span>
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div className="contact-actions">
          {!!email?.trim() && (
            <a href={`mailto:${email}`} className="btn btn-primary btn-lg">
              {copy.contactEmailCta} →
            </a>
          )}
          {hasLink(resumeUrl) && (
            <a href={resumeUrl} className="btn btn-ghost btn-lg" download>
              {copy.contactResumeCta} ↓
            </a>
          )}
          {hasLink(githubUrl) && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
              {copy.contactGithubCta} ↗
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
