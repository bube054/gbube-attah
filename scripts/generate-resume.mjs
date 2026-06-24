/**
 * Generate the résumé PDF from LIVE content — the same sources the site uses:
 *   • Sanity  (settings, summary copy, experience, skills, projects)
 *   • GitHub  (open-source repos + stats)
 *
 * Output: public/Gbubemi-Attah-Resume.pdf  (wired to the "Download Résumé" button).
 * Re-run anytime after editing in Studio:  npm run resume
 */
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import sharp from "sharp";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "v8s8lath";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://gbubemi.dev").replace(/\/$/, "");

const strip = (s = "") => s.replace(/\*(.+?)\*/g, "$1").trim();
const host = (u = "") => u.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

/* ---------------- data ---------------- */
async function getSanity() {
  const q = `{
    "settings": *[_type=="siteSettings"][0]{name,role,email,githubUrl,socials[]{platform,label,url}},
    "copy": *[_type=="homePage"][0]{heroLead,aboutLeadTwo,primaryStack},
    "projects": *[_type=="project"]|order(order asc){title,description,href,tags,group},
    "skills": *[_type=="skillGroup"]|order(order asc){heading,items},
    "experience": *[_type=="experienceItem"]|order(order asc){period,role,org,description,kind}
  }`;
  // Use the token + live API for fresh PUBLISHED data (CDN can lag a CMS edit).
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const apiHost = token ? "api" : "apicdn";
  const url = `https://${PROJECT_ID}.${apiHost}.sanity.io/v2024-01-01/data/query/${DATASET}?perspective=published&query=${encodeURIComponent(q)}`;
  const r = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  if (!r.ok) throw new Error("Sanity fetch failed " + r.status);
  return (await r.json()).result;
}

async function getGithub(username) {
  const h = { "User-Agent": "gbube-resume", Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const [user, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers: h }).then((r) => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers: h }).then((r) => r.json()),
    ]);
    const list = Array.isArray(repos) ? repos : [];
    const totalStars = list.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const featured = list
      .filter((r) => !r.fork && !r.archived && r.description && r.stargazers_count > 0 && r.name !== "gbube-attah")
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((r) => ({ name: r.name, stars: r.stargazers_count, lang: r.language, desc: r.description, url: r.html_url }));
    return { ok: true, repoCount: user.public_repos, totalStars, repos: featured };
  } catch {
    return { ok: false, repoCount: 0, totalStars: 0, repos: [] };
  }
}

/* ---------------- layout helpers ---------------- */
const INK = "#111111";
const INK2 = "#3c3c3c";
const INK3 = "#727272";
const MINT = "#1faa72"; // readable on white; the bright brand mint is used for rules
const MINT_BAR = "#34E5A1";
const M = 48;
const PW = 612;
const W = PW - M * 2;
const BOTTOM = 792 - M;

function ensure(doc, need) {
  if (doc.y + need > BOTTOM) doc.addPage();
}

function section(doc, title) {
  ensure(doc, 54);
  doc.moveDown(0.7);
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(11).text(title.toUpperCase(), M, doc.y, {
    characterSpacing: 1.6,
  });
  const ly = doc.y + 3;
  doc.moveTo(M, ly).lineTo(M + W, ly).lineWidth(1).strokeColor(MINT_BAR).stroke();
  doc.moveDown(0.55);
}

/* ---------------- build ---------------- */
async function build() {
  const data = await getSanity();
  const s = data.settings;
  const gh = await getGithub("bube054");

  const socialByPlatform = Object.fromEntries((s.socials || []).map((x) => [x.platform, x.url]));
  const linkedin = socialByPlatform.linkedin && socialByPlatform.linkedin !== "#" ? socialByPlatform.linkedin : null;

  const doc = new PDFDocument({ size: "LETTER", margins: { top: M, bottom: M, left: M, right: M }, info: { Title: `${s.name} — Résumé`, Author: s.name } });
  const outPath = path.resolve("public/Gbubemi-Attah-Resume.pdf");
  doc.pipe(fs.createWriteStream(outPath));

  /* Header: name + role + contacts (left), circular headshot (right) */
  const photoSize = 78;
  const px = M + W - photoSize;
  const py = M;
  try {
    const buf = await sharp("public/portrait.jpg").resize(360, 360, { fit: "cover", position: "top" }).jpeg().toBuffer();
    doc.save();
    doc.circle(px + photoSize / 2, py + photoSize / 2, photoSize / 2).clip();
    doc.image(buf, px, py, { width: photoSize, height: photoSize });
    doc.restore();
    doc.circle(px + photoSize / 2, py + photoSize / 2, photoSize / 2).lineWidth(1.5).strokeColor(MINT_BAR).stroke();
  } catch {
    /* photo optional */
  }

  const colW = W - photoSize - 18;
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(27).text(s.name, M, py + 2, { width: colW, characterSpacing: -0.5 });
  doc.fillColor(MINT).font("Helvetica").fontSize(12).text(s.role, M, doc.y + 2, { width: colW });
  doc.moveDown(0.5);

  // contact line with clickable links
  const contacts = [
    { t: s.email, link: `mailto:${s.email}` },
    { t: host(SITE), link: SITE },
    { t: host(s.githubUrl), link: s.githubUrl },
    ...(linkedin ? [{ t: host(linkedin), link: linkedin }] : []),
  ];
  doc.fontSize(9.2).font("Helvetica");
  const cy = doc.y;
  doc.fillColor(INK3).text("", M, cy, { continued: true, width: colW, lineGap: 2 });
  contacts.forEach((c, i) => {
    if (i > 0) doc.fillColor(INK3).font("Helvetica").text("  ·  ", { continued: true });
    doc.fillColor(MINT).font("Helvetica").text(c.t, { continued: i < contacts.length - 1, link: c.link });
  });
  doc.y = Math.max(doc.y, py + photoSize) + 8;
  doc.moveTo(M, doc.y).lineTo(M + W, doc.y).lineWidth(1.4).strokeColor(INK).stroke();
  doc.moveDown(0.7);

  /* Summary */
  doc.fillColor(INK2).font("Helvetica").fontSize(10.3).text(strip(data.copy.heroLead), M, doc.y, { width: W, lineGap: 2 });

  /* Experience */
  section(doc, "Experience");
  (data.experience || []).forEach((e) => {
    ensure(doc, 60);
    doc.fillColor(INK3).font("Helvetica").fontSize(8.6).text(`${e.period}   ·   ${e.kind}`, M, doc.y, { characterSpacing: 0.3 });
    doc.font("Helvetica-Bold").fontSize(11.5).fillColor(INK).text(e.role, M, doc.y + 1, { continued: true });
    doc.font("Helvetica").fillColor(INK2).text(`   —   ${e.org}`);
    doc.fillColor(INK2).font("Helvetica").fontSize(9.8).text(e.description, M, doc.y + 1.5, { width: W, lineGap: 1.5 });
    doc.moveDown(0.55);
  });

  /* Open source */
  section(doc, "Open Source");
  if (gh.ok) {
    doc.fillColor(MINT).font("Helvetica-Bold").fontSize(9.6).text(
      `${gh.repoCount} public repositories  ·  ${gh.totalStars} GitHub stars  ·  github.com/bube054`,
      M, doc.y, { link: s.githubUrl, width: W },
    );
    doc.moveDown(0.4);
  }
  (gh.repos.length ? gh.repos : []).forEach((r) => {
    ensure(doc, 42);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(r.name, M, doc.y, { continued: true, link: r.url });
    doc.font("Helvetica").fillColor(INK3).fontSize(9).text(`   ${r.stars} stars${r.lang ? "  ·  " + r.lang : ""}`);
    doc.fillColor(INK2).font("Helvetica").fontSize(9.6).text(r.desc, M, doc.y + 1, { width: W, lineGap: 1 });
    doc.moveDown(0.45);
  });

  /* Skills */
  section(doc, "Skills");
  (data.skills || []).forEach((g) => {
    ensure(doc, 24);
    doc.font("Helvetica-Bold").fontSize(9.8).fillColor(INK).text(`${g.heading}:  `, M, doc.y, { continued: true });
    doc.font("Helvetica").fillColor(INK2).text(g.items.join("  ·  "), { width: W });
    doc.moveDown(0.25);
  });

  /* Selected projects */
  section(doc, "Selected Projects");
  (data.projects || []).forEach((p) => {
    ensure(doc, 40);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(p.title, M, doc.y, { continued: true, link: p.href });
    doc.font("Helvetica").fillColor(INK3).fontSize(8.8).text(`   ${(p.tags || []).join(" · ")}`);
    doc.fillColor(INK2).font("Helvetica").fontSize(9.6).text(p.description, M, doc.y + 1, { width: W, lineGap: 1 });
    doc.moveDown(0.4);
  });

  doc.end();
  await new Promise((res) => doc.on("end", res)); // flush
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`Wrote ${outPath} (${kb} KB) — ${data.experience.length} roles, ${gh.repos.length} repos, ${data.projects.length} projects.`);
}

build().catch((e) => {
  console.error("Resume generation failed:", e.message);
  process.exit(1);
});
