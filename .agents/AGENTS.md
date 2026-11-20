# AGENTS.md

Guide for AI coding agents (and humans) working in this repository. Everything for agents lives
in `.agents/` to keep the root clean; `.claude/CLAUDE.md` imports this file.

## What this repo is

Alireza Hanifi's personal website and résumé, built from one data file.

- The repo is `hanifi`: <https://github.com/AlirezaHanifi/hanifi> (remote `origin`, branch
  `main`), cloned locally as `life/hanifi`.
- The website publishes to GitHub Pages at <https://alirezahanifi.github.io/hanifi/> (a project
  page, so Astro's `base` is `/hanifi`). In templates, wrap every root path (`/portrait.webp`,
  `work[].logo`, PDF and agent links) in `asset()` from `src/lib/profile.ts`, or it breaks on
  the live site.
- The résumé builds to a PDF that the website also serves.

Everything in this repo is written in **English**: code, content, comments, commit messages
and docs.

## Layout

```text
content/profile.yaml   Single source of truth: basics, work, education, skills, courses
resume/resume.typ      Typst résumé template; reads content/profile.yaml
site/                  Astro website; reads content/profile.yaml (src/lib/profile.ts)
  src/pages/index.astro      The one-page site
  src/pages/llms.txt.ts      /llms.txt for AI agents
  src/pages/resume.json.ts   /resume.json (JSON Resume)
  src/styles/global.css      Design tokens (light + dark) and all styles
  public/portrait.webp       Studio B&W portrait; the monogram shows if it is missing
  public/logos/              Employer logo marks (SVG), referenced by `work[].logo`
  public/photos/             "Off the clock" cover layers (cover-bg.webp, cover-fg.webp)
assets/photos/originals/     The owner's original photos, untouched (local only, git-ignored)
scripts/make-portrait.swift  Builds the portrait from an original (local only, git-ignored)
scripts/make-cover.swift     Builds the two cover layers from an original (local only, git-ignored)
.github/workflows/deploy.yml  Builds résumé + site, deploys to GitHub Pages
.agents/AGENTS.md      This guide
.agents/design-brief.md   Visual direction, references and the owner's answers
.agents/decisions.md      Short decision log (why things are the way they are)
.claude/               Claude Code: CLAUDE.md is tracked, local settings are git-ignored
build/                 Generated output (git-ignored)
Makefile               `make resume|watch|dev|site|clean`
```

## Commands

| Task                 | Command                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Build résumé PDF     | `make resume` → `build/alireza-hanifi-resume-en.pdf` (also its download name on the site) |
| Live-rebuild résumé  | `make watch`                                                                              |
| Site dev server      | `make dev` → <http://localhost:4321> (first time: `cd site && npm install`)               |
| Production build     | `make site` → `site/dist/`                                                                |
| Preview pages as PNG | `typst compile --root . --format png resume/resume.typ "build/page-{p}.png"`              |

Requires `typst` ≥ 0.12. The template uses the bundled "New Computer Modern" font, so the
build does not depend on system fonts.

## Content model (`content/profile.yaml`)

- `basics`: name, headline, tagline, contact details, profiles, summary.
- `work[]`: one entry per employer, with `url`, an optional `logo` (path under
  `site/public/logos/`) and `roles[]` (newest first). Each role has `title`,
  `start` and `end` as `YYYY-MM` strings (`end: null` means present), plus `highlights[]`.
- `education[]`, `skills[]` (`name`, `keywords[]`), `languages[]`.
- `certificates[]` (shown on the résumé only). There is deliberately no projects section.
- `basics.statement`, `basics.intro`, `basics.glance[]` and `personal` are used by the website
  only. `personal.cover` is the mock magazine cover in "Off the clock": masthead, issue line,
  `image` (full photo) and `figure` (the person, layered above the masthead), kicker, lead and
  `lines[]` of `head` + `deck`.
  In `statement`, the `**bold**` word is shown as the accent word.
- In text fields, `**bold**` is the only markup. Keep everything else plain.
- `url: null` means there is no public link, for example a private repo.

The field names follow [JSON Resume](https://jsonresume.org/schema) where they can, so the
site can later emit a standard `resume.json`.

## Rules

1. **Edit facts only in `content/profile.yaml`.** Templates never hard-code personal data.
2. **Title policy:** the public title is **Analytics Team Lead**. Never write "Head of Data"
   (or similar) anywhere in this repo, the résumé or the site, even though it appears in
   internal employer documents.
3. **Employer confidentiality:** the employer (Bankino) is real and its internal material
   lives elsewhere and is confidential. Describe work at the level already in
   `profile.yaml`. Rounded figures ("500+ tables") are approved. Do not add exact internal
   metrics, headcount, budgets, roadmap items, internal system names beyond those listed, or
   anything else from employer documents unless the owner approves it explicitly.
4. **Privacy:** `basics.phone` appears on the PDF only. The website must not render it.
5. After changing `profile.yaml` or `resume.typ`, run `make resume` and check that the PDF
   still fits on 2 pages and that no section heading is stranded at the bottom of a page.
6. Do not create or delete GitHub repositories, commit, push or merge without the owner's
   go-ahead. When you have it, follow "Git workflow" below.
7. Names of new files and folders use lowercase `kebab-case`.

## Git workflow

- **Never commit to `main` directly.** Every change goes on its own branch, opened as a pull
  request (merge request) against `main`, and is merged with **squash and merge**, so each
  change is one commit on `main`. Delete the branch after the merge.
- **Branch names:** `type/branch-name`, in lowercase `kebab-case`, for example
  `feat/dark-theme-toggle`, `fix/stranded-heading`, `docs/git-workflow`.
- **Commit messages and PR titles:** `type(scope): message` ([Conventional
  Commits](https://www.conventionalcommits.org)). The message is in the imperative, lowercase,
  with no full stop, for example `fix(resume): keep courses heading with its list`. The PR
  title becomes the squash commit, so it follows the same format.
- **Types:** `feat` (new feature or section), `fix` (bug or broken layout), `content` (facts or
  wording in `profile.yaml`), `style` (look only: CSS, typography, images), `refactor`, `perf`,
  `docs` (README, `.agents/`), `build` (Makefile, dependencies), `ci` (GitHub Actions), `chore`.
- **Scopes:** `resume`, `site`, `content`, `photos`, `ci`, `agents`, or leave it out when a
  change spans the whole repo: `chore: update dependencies`.
- The branch type matches the type of its main commit.

## Website

- Calm, editorial "data sheet" look: one cobalt accent, serif display headings (Instrument
  Serif), Inter for body text, JetBrains Mono for labels, Vazirmatn for the Persian name. Fonts
  are self-hosted through `@fontsource`. Do not add Google Fonts or other CDNs.
- Light and dark themes: the OS picks by default, and the header toggle remembers the choice.
  Every color is a token in `global.css`. Change both themes together.
- The site is calm by design: no scroll animations, parallax or autoplay. Motion respects
  `prefers-reduced-motion`.
- It must work without JavaScript. JS only drives the theme toggle.
- It must also serve agents: `/llms.txt`, `/resume.json`, `/alireza-hanifi-resume-en.pdf` and JSON-LD `Person`
  in `<head>`. All are generated from `profile.yaml`.
- Before handing off, check it at 375 px wide (no horizontal scroll) and in both themes.

## Portrait and photos

- The site's images and everything under `assets/photos/originals/` must stay faithful photos of
  the owner. **Never use generative or AI image tools on them** (no face or body edits, clothing
  swaps, new camera angles, upscaling "enhancement", inpainting or style transfer). The owner's
  rule is that the face must look exactly like them, with no AI distortions.
- Allowed changes: crop, resize, background removal or replacement, tone and color adjustment
  (including darkening clothing), and removing printed text from a background by filling it
  from the surrounding wall pixels.
- Keep the originals in `assets/photos/originals/` and rebuild with the scripts in `scripts/`
  (Apple Vision + Core Image, on-device); each script's header has the exact command. Both
  folders are local only and git-ignored: only the finished images in `site/public/` are
  tracked, so never delete the local copies. After a rebuild, check the
  ears, hair and hand edges at 2x zoom.
- `make-portrait.swift`: refined subject mask, black-and-white studio tone and the wall replaced
  by a plain grey gradient, and the T-shirt evened out to a deep charcoal (crease shading
  flattened, weave kept; never above a curved neckline, so the beard is untouched). Face and hair
  keep their pixels. Built from `studio-wall-headshot.jpg`; the crop stops above the shirt print.
- `make-cover.swift`: the old cover text is removed from the wall and chair; the person keeps
  their pixels. It writes the full photo plus a top-band layer of the person, so the head can
  overlap the site's masthead with no cut-out edge elsewhere.
