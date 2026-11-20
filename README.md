# hanifi

Alireza Hanifi's personal website and résumé, both generated from
[`content/profile.yaml`](content/profile.yaml).

```bash
make resume   # → build/alireza-hanifi-resume-en.pdf
make dev      # → http://localhost:4321
make site     # → site/dist/ (static, ready for GitHub Pages)
```

- Résumé: [`resume/resume.typ`](resume/resume.typ), built with [Typst](https://typst.app).
- Website: [`site/`](site/), an Astro static site. Run `make dev` to work on it and `make site`
  to build it. Design notes: [`.agents/design-brief.md`](.agents/design-brief.md).
- Working rules for agents and contributors, including the git workflow:
  [`.agents/AGENTS.md`](.agents/AGENTS.md).

Status: the résumé and site v1 both build locally. Nothing is deployed yet; see
[`.agents/decisions.md`](.agents/decisions.md).
