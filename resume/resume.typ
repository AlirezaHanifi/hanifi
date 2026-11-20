// Résumé template. All facts come from content/profile.yaml; edit those, not this file.
// Build: `make resume` (from the repo root) → build/alireza-hanifi-resume-en.pdf

#let data = yaml("/content/profile.yaml")
#let b = data.basics

// ---------- helpers ----------

#let months = ("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")

// "2024-09" → (2024, 9)
#let ym(s) = {
  let p = str(s).split("-")
  (int(p.at(0)), int(p.at(1)))
}
#let fmt-date(s) = if s == none { "Present" } else {
  let (y, m) = ym(s)
  months.at(m - 1) + " " + str(y)
}
// Inclusive month count, e.g. Sep 2024 – Feb 2026 = 1 yr 6 mos. Only for finished roles.
#let duration(start, end) = if end == none { none } else {
  let (y1, m1) = ym(start)
  let (y2, m2) = ym(end)
  let n = (y2 * 12 + m2) - (y1 * 12 + m1) + 1
  let (yrs, mos) = (calc.quo(n, 12), calc.rem(n, 12))
  let parts = ()
  if yrs > 0 { parts.push(str(yrs) + " yr" + if yrs > 1 { "s" } else { "" }) }
  if mos > 0 { parts.push(str(mos) + " mo" + if mos > 1 { "s" } else { "" }) }
  parts.join(" ")
}
#let date-range(start, end) = {
  fmt-date(start) + " – " + fmt-date(end)
  let d = duration(start, end)
  if d != none { " (" + d + ")" }
}

// Renders "**bold**" segments; everything else is literal text (no markup injection).
#let rich(s) = {
  let parts = str(s).replace("'", "’").split("**")
  for (i, p) in parts.enumerate() {
    if calc.odd(i) { strong(p) } else { p }
  }
}

#let maybe-link(url, body) = if url == none { body } else { link(url, body) }

#let strip-scheme(url) = url.replace("https://", "").replace("http://", "").trim("/")

// ---------- page ----------

#set document(title: b.name + " — Résumé", author: b.name)
#set page(
  paper: "a4",
  margin: (x: 1.5cm, top: 1.3cm, bottom: 1.5cm),
  footer: context {
    set text(8pt, fill: luma(90))
    grid(
      columns: (1fr, auto, 1fr),
      align(left, datetime.today().display("[month repr:long] [year]")),
      b.name + " · Résumé",
      align(right, counter(page).display()),
    )
  },
)
#set text(font: "New Computer Modern", size: 10pt, lang: "en")
#set par(justify: false, leading: 0.55em)
#set list(indent: 0.6em, body-indent: 0.5em, spacing: 0.5em)
#show link: set text(fill: rgb("#1f3a8a"))

// Sticky so a heading never sits alone at the bottom of a page.
#let section(title) = block(sticky: true, above: 1.1em, below: 0.6em)[
  #text(12pt, smallcaps(title))
  #v(-0.75em)
  #line(length: 100%, stroke: 0.5pt)
]

#let row(l, r) = grid(columns: (1fr, auto), l, align(right, r))

// ---------- header ----------

#align(center)[
  #text(24pt, weight: "bold", b.name) \
  #v(0.15em)
  #text(13pt, weight: "bold")[#b.headline | #b.tagline] \
  #v(0.15em)
  #b.location |
  #link("tel:" + b.phone.replace(" ", ""), b.phone) |
  #link("mailto:" + b.email, b.email) \
  #(b.profiles.map(p => link(p.url, strip-scheme(p.url))) + (link(b.website, strip-scheme(b.website)),)).join[ | ]
]

// ---------- body ----------

#section("About Me")
#rich(b.summary)

#section("Experience")
#for job in data.work {
  block(breakable: true, above: 1.1em)[
    #row(strong(maybe-link(job.url, job.company)), job.location)
    #for role in job.roles {
      v(-0.35em)
      row(emph(role.title), emph(date-range(role.start, role.end)))
      v(-0.2em)
      list(..role.highlights.map(rich))
    }
  ]
}

#section("Education")
#for e in data.education {
  row(strong(maybe-link(e.url, e.institution)), e.location)
  v(-0.35em)
  row(emph(e.degree), emph(fmt-date(e.start) + " – " + fmt-date(e.end)))
}

#section("Technical Skills")
#list(
  ..data.skills.map(s => [*#s.name:* #s.keywords.join(", ")]),
  [*Spoken Languages:* #data.languages.map(l => l.language + " (" + l.fluency + ")").join(", ")],
)

#section("Courses")
#list(
  ..data.certificates.map(c => [
    #c.name (#c.issuer)#if c.url != none [ #link(c.url)[\[Certified\]]]
  ]),
)
