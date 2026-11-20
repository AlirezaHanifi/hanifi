# Design brief: hanifi

Status: **v1 built** in `site/`. The owner's answers are recorded at the end of this file.

## Goal

The site should not feel like a template. It should read as *this particular person*: a
data/analytics lead who came up through BI, thinks like a product person and writes things
down. It has to stay easy to scan for recruiters and still have one or two moments that make
people smile.

## References chosen by the owner

| Reference                                                                                                           | What to take from it                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Brittany Chiang v4](https://v4.brittanychiang.com/)                                                                | Calm dark navy base, a single sharp accent, small monospace labels, numbered section headings, an experience list with tabs per employer. Content comes first and motion is quiet.                                                                                                                                   |
| [James Parker by Panze (Dribbble)](https://dribbble.com/shots/26840259-James-Parker-Portfolio-Website-UI-UX-Design) | Warm paper background `#EBE9E5` with cobalt (`#275EDC`, `#0626A2`, `#011267`) and near-black `#040613`. Elegant serif display headings, tiny monospace metadata (city, local time, an "available now" status dot), a hairline grid that frames the hero like a printed sheet, a portrait set in a solid color block. |
| [Roman Sterling by Nexux Lab (Dribbble)](https://dribbble.com/shots/27787281-Personal-Portfolio-Website-Design)     | Bold editorial look: deep oxblood `#1A0202` with mustard gold `#E0C04C` / `#C0A244` and cream. A huge condensed display name, a large photo, and a "Built through experience" timeline with big year numbers.                                                                                                        |

**Common thread:** editorial typography with a strong display face, *one* confident accent
color, monospace "metadata" labels, generous whitespace, a real photo, and experience told as
a timeline.

## Direction (built)

**"Editorial data sheet."** A printed, magazine-like page that, looked at closely, turns out
to be built from data artifacts:

- **Hairline grid as a schema.** The hero is framed like the Panze sheet. The small labels are
  column names and types (`location: Tehran`, `local_time: 14:32 IRST`, `status: open to talk`).
- **Career as lineage.** The timeline shows Mofid → blu Bank → Bankino as a left-to-right
  lineage or DAG with big year numbers, in the spirit of the Nexux timeline. As an option, the
  stages are labeled the medallion way: raw → refined → curated.
- **One accent, two moods.** A light "paper" mood (cream with cobalt, or cream with oxblood) and
  a dark mood (navy, as in Brittany Chiang). Theme toggle; the default follows the OS.
- **One playful moment**, small and optional. Candidates:
  - a `⌘K` command palette that answers `whoami`, `ls projects` and `cat resume`;
  - a tiny live SQL box (`select * from experience`);
  - hovering a skill highlights where it was used in the timeline.
- **Typography (candidates):**
  - display: Instrument Serif / Fraunces / a condensed grotesk such as Anton or Bebas;
  - body: Inter or Geist;
  - metadata: JetBrains Mono / Geist Mono.

## Sections

1. Hero: name, title "Analytics Team Lead", one-line positioning, photo, metadata strip.
2. About: short story, BI → data engineering → analytics lead.
3. Experience: lineage timeline from `profile.yaml`.
4. Toolbox: skills as a small table. (Projects were removed at the owner's request.)
5. Writing / notes: optional, only if the owner wants to write.
6. Contact, plus "Download résumé (PDF)".

## Non-negotiables

- Content comes from `content/profile.yaml`. No phone number on the site.
- Never "Head of Data". See `.agents/AGENTS.md`.
- Fast, static, works without JavaScript, respects `prefers-reduced-motion`, accessible
  contrast in both themes, readable at 360 px width.
- Agent-friendly outputs: `/llms.txt`, `/resume.json`, `/alireza-hanifi-resume-en.pdf`, JSON-LD `Person`.

## Owner's answers (2026-11-20)

| Topic         | Answer                                                                                        | How the site reflects it                                                     |
| ------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Personality   | Patient, hard to anger, dedicated and hard-working, ambitious                                 | Trait chips in About; the calm tone overall                                  |
| Interests     | Cinema (serious), literature, music, bodybuilding, making and drinking lattes                 | "Off the clock" section, with the top-5 Letterboxd list                      |
| Photo         | Yes; the owner will send one. It should be adapted to the site's look                         | `public/photo.jpg`, shown as a cobalt duotone (grayscale + multiply)         |
| Themes        | Both light and dark                                                                           | OS default plus a toggle                                                     |
| Playfulness   | Calm                                                                                          | No easter eggs. Small data nods only: the lineage strip and the skills table |
| Persian touch | Yes, the name in Persian                                                                      | `name_fa` under the name, on the monogram and in the footer                  |
| Blog          | No                                                                                            | No writing section                                                           |
| Audience      | None in particular. The site should show the professional side and a little of the human side | Professional first; one personal section                                     |

## Still open

- The photo, and specifics for Literature and Music (authors and artists), to replace the
  generic notes.
