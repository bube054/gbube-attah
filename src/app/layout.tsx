import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Resolve a valid absolute site URL. Tolerates a scheme-less value (Vercel's
 * VERCEL_URL is bare, and NEXT_PUBLIC_SITE_URL is sometimes set without
 * "https://") and never throws — a bad value would otherwise crash every page's
 * metadata at build time.
 */
function siteUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://gbubemi.dev";
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme);
  } catch {
    return new URL("https://gbubemi.dev");
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    metadataBase: siteUrl(),
    title: { default: `${s.name} — ${s.role}`, template: `%s · ${s.name}` },
    description: s.seo.description,
    applicationName: s.name,
    openGraph: {
      siteName: s.name,
      type: "website",
      ...(s.seo.ogImage ? { images: [s.seo.ogImage] } : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
