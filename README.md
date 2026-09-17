# poladibrahimov.com

Personal site and blog — built with [Astro](https://astro.build), no UI framework, no CSS framework.
Static output, so it deploys anywhere that serves files.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site into dist/
npm run preview  # serve the built site locally
npm run check    # type-check .astro and .ts files
```

## Where the content lives

Almost everything on the site comes from **one file**: [`src/data/site.ts`](src/data/site.ts).
Profile, bio, nav links, socials, experience, research, education, skills, languages, projects,
awards — edit that file and the whole site follows.

Blog posts are Markdown files in [`src/content/blog/`](src/content/blog/). The filename becomes the
URL: `src/content/blog/from-baku-to-bonn.md` → `/blog/from-baku-to-bonn/`.

### Adding a post

Create a new `.md` file in `src/content/blog/` with this frontmatter:

```markdown
---
title: 'Your title'
description: 'One or two sentences. Used on the blog list and in search results.'
pubDate: 2026-10-01
tags: ['Retrieval', 'Personal']
# updatedDate: 2026-10-05   # optional
# draft: true               # optional — visible in dev, hidden from the build
---

Your post, in Markdown.
```

Tags create their own pages automatically (`/tags/retrieval/`) and show up as filters on the blog
index. No other file needs to change.

## Before you deploy

A few placeholders to replace:

| What | Where |
| --- | --- |
| Domain (`https://poladibrahimov.com`) | `astro.config.mjs` → `site`, and `public/robots.txt` |
| GitHub handle | `src/data/site.ts` → `socials` |
| Repo link for the quantum RL project | `src/data/site.ts` → `projects` (`repo`) |
| Profile photo | drop a square image at `public/images/avatar.jpg`, then set `profile.avatar` in `src/data/site.ts` (leave it `null` to keep the monogram) |
| Résumé PDF | `public/Polad_Ibrahimov_CV.pdf` — replace the file when you update your CV |
| Social card | `public/images/og.png` (1200×630) |

Your phone number is deliberately **not** on the site. If you want it published, set `profile.phone`
in `src/data/site.ts` and add it to the contact page.

## Deploying

Deployed to **GitHub Pages** at <https://poladibrahim.github.io>. The repo is a GitHub *user site*
(`poladibrahim.github.io`), so it is served from the root path and needs no `base` in the Astro
config.

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. Nothing to run by hand —
the workflow pins Node 22 because Astro 7 needs >= 22.12 and the runner default may be older.

Repository **Settings -> Pages -> Source** must be set to **GitHub Actions** (not "Deploy from a
branch"), or the workflow uploads an artifact that nothing publishes.

To move to a custom domain later: add it under Settings -> Pages, then update `site` in
`astro.config.mjs` and the `Sitemap:` line in `public/robots.txt`, or the sitemap and RSS feed will
keep advertising the old URL.

## Structure

```
src/
  components/    Header, Footer, Avatar, cards, Timeline, Icon, ThemeToggle
  content/blog/  Blog posts (Markdown)
  data/site.ts   All site content — start here
  layouts/       Base.astro (head, SEO, fonts, theme bootstrap)
  lib/posts.ts   Post sorting, tags, dates, reading time
  pages/         Routes. [...slug] = blog posts, [tag] = tag pages
  styles/        global.css — design tokens live at the top
```

Theming is CSS custom properties in `src/styles/global.css`. Dark is the default; the light palette
sits under `:root[data-theme='light']`. Changing `--accent` in both blocks re-themes the whole site.
