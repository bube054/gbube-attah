import { BookButton } from "@/components/BookButton";
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
  bookingUrl,
  bookingLabel = "Book a call",
}: {
  copy?: HomeCopy;
  email: string;
  resumeUrl: string;
  githubUrl: string;
  bookingUrl: string;
  bookingLabel?: string;
}) {
  const hasBooking = hasLink(bookingUrl);
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
          {hasBooking && <BookButton bookingUrl={bookingUrl} label={bookingLabel} className="btn btn-primary btn-lg" />}
          {!!email?.trim() && (
            <a href={`mailto:${email}`} className={`btn ${hasBooking ? "btn-ghost" : "btn-primary"} btn-lg`.trim()}>
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
