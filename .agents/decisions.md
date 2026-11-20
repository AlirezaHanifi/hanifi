# Decisions

Newest first. One entry per decision: what, why, and what it rules out.

## 2026-11-20: Repo is AlirezaHanifi/hanifi; agent files in .agents/; git workflow

- The owner set aside <https://github.com/AlirezaHanifi/hanifi> for this project. The local
  folder was renamed from `life/alirezahanifi.github.io` to `life/hanifi` and the docs use the
  repo name `hanifi`. This replaces the earlier plan of a `hanifi/hanifi.github.io` repo.
- The public address is now <https://alirezahanifi.github.io/hanifi/>, GitHub Pages' default for
  a repo named `hanifi` on the `AlirezaHanifi` account. The owner chose it over a custom
  domain. Astro has `base: '/hanifi'`, and templates prefix root paths with `asset()`. This
  replaces "Address is hanifi.github.io" below.
- The original photos and the photo scripts are git-ignored. Only the finished images in
  `site/public/` go to git; the originals stay on the owner's machine.
- Agent material (the guide, decision log and design brief) moved to `.agents/` to keep the
  root clean. `.claude/CLAUDE.md` imports `.agents/AGENTS.md`; the rest of `.claude/` is local.
- Git workflow: a branch per change named `type/branch-name`, a pull request to `main`, squash
  merge, and `type(scope): message` for commits and PR titles. Details in `.agents/AGENTS.md`.

## 2026-11-20: Approximate figures, not exact ones

Internal metrics are shown rounded: "500+ tables", "30+ schemas", "about seven months". They
are never exact counts. The owner approved this level of detail.

## 2026-11-20: Calm site, both themes, a human section

The owner asked for:

- a calm site with no easter eggs;
- light and dark themes;
- their name in Persian as well;
- no blog;
- a professional page with a small human side (cinema, literature, music, training, latte).

## 2026-11-20: Public title is "Analytics Team Lead"

The owner's current role (since 1 Esfand 1404, which is 20 Feb 2026) combines analytics team
lead and head of data. The owner chose to present only **Analytics Team Lead** publicly.
"Head of Data" must not appear in the résumé or on the site, and highlights stay within the
scope of an analytics team lead.

## 2026-11-20: One repo for site and résumé, one data file

The website and the résumé live together and both read `content/profile.yaml`. Any fact
changes in one place only.

- The résumé moves from LaTeX (the `MyResume` repo, which is kept and not deleted) to Typst.
  Typst is installed locally, compiles in milliseconds and reads YAML natively. No LaTeX
  toolchain is installed.
- The site will use Astro. It is static, works without JavaScript and can read YAML, which
  suits GitHub Pages.

## 2026-11-20: Address is hanifi.github.io (superseded)

- The owner chose `https://hanifi.github.io`: shorter and easier to remember than
  `alirezahanifi.github.io`.
- GitHub Pages serves `<name>.github.io` only from a repo named `<name>.github.io` owned by the
  account or organization `<name>`. So this needs a GitHub user or a (free) organization named
  `hanifi`. An organization keeps the personal account `AlirezaHanifi` and its links unchanged.
- If `hanifi` is taken on GitHub, the fallback is a custom domain (for example `hanifi.ir`) with
  a `site/public/CNAME` file.
- The résumé downloads as `alireza-hanifi-resume-en.pdf`; `-en` marks the English version.

## 2026-11-20: Hosting and repo plan (superseded, see "Repo is AlirezaHanifi/hanifi")

- The GitHub repo `AlirezaHanifi/AlirezaHanifi.github.io` is currently a fork of a template,
  so contributions to it do not count on the profile.
- The plan is to push this folder as a fresh, non-fork repo `hanifi/hanifi.github.io` (see the
  entry above), then archive the old fork.
- Nothing has been created, deleted or pushed yet.
- The local folder is `life/alirezahanifi.github.io`. It was named like the GitHub repo because this
  is the owner's official page (first named `personal-site`, which sounded like a diary). It
  should be renamed to `hanifi.github.io` to match the new address.

## 2026-11-20: Magazine cover and tidier portrait, without AI

- The "Off the clock" cover now uses the whole original photo (the old VOGUE text removed from
  the wall), with only the head and hand layered above the new masthead. A cut-out on flat paper
  showed rough edges; in the original room there is no edge to see.
- Cover type: Bodoni Moda (a free Didone, close to Didot) for the masthead and headlines, and
  Montserrat (geometric sans) for small lines, both self-hosted through `@fontsource`.
- The two park snapshots were removed at the owner's request.
- The owner asked for a tidier collar or a better camera angle. Both would need generative image
  editing, which the photo rule forbids. Instead the shirt is darkened to a deep, low-contrast
  charcoal (tone only), which hides the crumpled collar. A new angle needs a new photo.
- All original photos are kept in `assets/photos/originals/` so every image can be rebuilt.


## 2026-11-20: New homepage portrait, unused photos removed

- The homepage portrait is now built from a new straight-on headshot against a plain wall
  (`studio-wall-headshot.jpg`), with the same black-and-white studio treatment. The crop stops
  above the T-shirt print, so no brand name shows.
- The owner asked for the shirt creases to go and a more professional look. The old shirt step
  left blotches (it told skin from shirt by warmth only, and the grey T-shirt is warm too). It was
  rewritten: skin is warm *and* light, the mask is smooth and stops at a curved neckline so the
  beard is never touched, and inside it the broad crease shading is flattened to an even charcoal
  while the fine weave stays. Face and hair are unchanged; no generative tools.
- Unused originals were deleted (the two wall selfies and the two park photos). Only the photos
  the site uses remain: the headshot and the magazine-cover chair photo.
- The local folder is now a git repo with `origin` set to
  <https://github.com/AlirezaHanifi/hanifi>. Nothing is committed or pushed yet.
