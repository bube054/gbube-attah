import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getSiteSettings } from "@/lib/site";

/** Chrome for the public site (nav + footer). The Studio lives outside this
 *  group, so it renders standalone without the site nav/footer. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <Nav settings={settings} />
      {children}
      <Footer settings={settings} />
    </>
  );
}
