import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { OpenSource } from "@/components/sections/OpenSource";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Writing } from "@/components/sections/Writing";
import { getArticles } from "@/lib/articles";
import { getGithubData } from "@/lib/github";
import { aboutStatsFrom, getHomeContent } from "@/lib/home";
import { getSiteSettings } from "@/lib/site";

export default async function Page() {
  // Site settings first — they hold the GitHub / dev.to / Medium handles.
  const settings = await getSiteSettings();
  const [home, github, articles] = await Promise.all([
    getHomeContent(),
    getGithubData(settings.githubUsername),
    getArticles({ devto: settings.devtoUsername, medium: settings.mediumUsername }),
  ]);

  const { copy } = home;
  const stats = aboutStatsFrom(copy, github);

  return (
    <main>
      <Hero copy={copy} githubUrl={settings.githubUrl} name={settings.name} />
      <About copy={copy} stats={stats} />
      <Work copy={copy} projects={home.projects} />
      <OpenSource copy={copy} repos={github.repos} />
      <Skills copy={copy} skills={home.skills} />
      <Experience copy={copy} experience={home.experience} />
      <Writing copy={copy} platforms={home.platforms} articles={articles} />
      <Contact
        copy={copy}
        email={settings.email}
        resumeUrl={settings.resumeUrl}
        githubUrl={settings.githubUrl}
      />
    </main>
  );
}
