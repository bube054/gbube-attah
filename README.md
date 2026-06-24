# Gbubemi Attah — Portfolio

A single-page developer portfolio built with **Next.js 16 (App Router)**, **Sanity** (embedded Studio + GROQ reads), and **Tailwind CSS v4**. Dark theme with a mint (`#34E5A1`) accent, Archivo + JetBrains Mono type.

The architecture mirrors the Bales of Mercy site: every piece of copy/data lives in typed
local content (`src/content/*`) and is overlaid by matching Sanity documents when the CMS is
configured. **The site runs with or without Sanity** — no env vars are required to develop.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Optional — wire up Sanity for live editing:

```bash
cp .env.example .env.local   # fill in NEXT_PUBLIC_SANITY_PROJECT_ID
npm run dev                  # Studio at http://localhost:3000/studio
```

## Project layout

```
src/
  app/
    layout.tsx                 # fonts (Archivo, JetBrains Mono) + metadata
    globals.css                # design tokens, keyframes, all section styles
    (site)/
      layout.tsx               # Nav + Footer chrome
      page.tsx                 # assembles every section
    studio/[[...tool]]/page.tsx # embedded Sanity Studio at /studio
  components/                  # Nav, Footer, Reveal, Icon, Marquee, PHImage, sections/*
  content/                     # typed local fallback content (site.ts, home.ts)
  lib/                         # sanity.ts (read client), site.ts, home.ts,
                               #   github.ts, articles.ts (live data + merge)
  sanity/                      # schemaTypes/, structure.ts
  types/                       # content.ts (shared shapes)
scripts/sanity-seed.mjs        # idempotent seed for the curated Sanity docs
```

## Where each piece of content comes from

Content is split across three sources by what it *is*, so nothing is maintained twice:

| Source | Owns | How |
| --- | --- | --- |
| **Sanity** (source of truth) | Site settings, all section copy, the client/product **projects**, **skills**, **experience**, writing **platform cards** | Edited at `/studio`; read via GROQ in `lib/site.ts` + `lib/home.ts`, overlaid onto local defaults with `mergeDefaults`/`useList` |
| **GitHub** (live) | Open-source **repos** (stars, language, description) + the **About stats** (repo count, total stars, years shipping) | `lib/github.ts` — REST API, top starred non-fork repos, ISR-cached 1h |
| **dev.to + Medium** (live) | The **Latest articles** list | `lib/articles.ts` — dev.to JSON API + Medium RSS, merged newest-first, ISR-cached 1h |

Everything degrades gracefully: if Sanity isn't configured, or a live API is down or empty, the
matching local content in `src/content/*` is shown instead — the site never renders blank. The
GitHub / dev.to / Medium handles live in Site settings, so the integrations are repointed without
touching code.

### Seeding Sanity

```bash
set -a && source .env.local && set +a && npm run seed   # idempotent (createOrReplace)
```

Requires `NEXT_PUBLIC_SANITY_PROJECT_ID` + `SANITY_API_WRITE_TOKEN` in `.env.local`.
Set an optional `GITHUB_TOKEN` to raise the GitHub API rate limit.
