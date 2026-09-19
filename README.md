# Evolve AI — Website (prototype v1)

A from-scratch redesign of the Evolve AI website — the student AI community at
Chitkara University. This first iteration is a **visual prototype**: it
establishes a new design language (bold geometry, editorial typography,
controlled motion) across the complete homepage. It is not production-ready yet.

## Run it

No build step, no dependencies to install.

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173>. (Opening `index.html` directly also works.)

Append `?reduced-motion` to the URL to preview the calm version that visitors
with *Reduce motion* enabled get.

## Stack

Plain HTML, CSS and JavaScript. Two libraries load from a CDN — both are
optional; if they fail to load, the page falls back to a complete static version:

| Library | Why |
| --- | --- |
| [GSAP](https://gsap.com) + ScrollTrigger | Hero intro timeline, pinned horizontal archive, scroll-scrubbed transitions |
| [Lenis](https://lenis.darkroom.engineering) | Smooth wheel scrolling (touch stays native) |

## Structure

```
index.html              all sections, semantic markup, SVG symbol sprite
css/
  tokens.css            design tokens: palette, type scale, spacing, motion
  base.css              reset, type primitives, reveal system, reduced motion
  shapes.css            the geometry system (tiles, primitives, arch rows…)
  components.css        nav, buttons, cursor, mobile menu
  sections/*.css        one file per section
js/
  core.js               namespace, env flags, shared helpers, module registry
  main.js               boot sequence (fonts → modules → ScrollTrigger → intro)
  hero.js, work.js …    one module per behaviour
assets/
  favicon.svg           the mark: arch (A) + pill (I) + node
  gallery/              drop event photos here
  logos/                drop partner logos here
```

## Design system

**Palette** — purple `#54246F`, deep purple `#35205C`, orange `#FF6333`,
cream `#F5F1E8`, blue `#5755D9`, light blue `#C9C8FF`, dark `#17151C`.

**Type** — *Archivo* (variable, width axis 62–125) for display and text,
*Instrument Serif* italic for single editorial accents, *JetBrains Mono* for
metadata labels. The width axis is part of the identity: the hero solves for
the width that lets EVOLVE fill the screen, titles stretch on hover, and
condensed/expanded widths create contrast between sections.

**Geometry** — one vocabulary used everywhere: arch, U, half-disc, quarter,
dome, leaf, pill, dot. Rules worth keeping:

- Every **O / 0** in display type is a *two-halves circle* (hero, 2021, footer).
- The mark is an **arch + pill** = **A + I**.
- Sections hand over with shapes, not straight edges: the hero's O becomes the
  next background, arches rise into Origin and Contact, half-discs drip into the
  testimonials, the lilac spills into the FAQ as a quarter circle.

Reusable pieces live in `css/shapes.css`: `.tile` (GeometricTile), `.g-*`
primitives, `.pattern-grid` (PatternGrid), `.arch-row` (ArcShape row),
`.scallops`, `.bshape` (ShapeMarquee glyphs).

## Adding real content

**Event photos** — each archive card has a `.memory__media` box. Add an image as
its first child and the generated placeholder art hides automatically:

```html
<div class="memory__media">
  <img src="assets/gallery/finvasia-hackathon-2026.webp" alt="Teams presenting at the Finvasia Innovation Hackathon" loading="lazy">
  <div class="art art--links" aria-hidden="true">…</div>
</div>
```

The frame shape (arch, circle, pill, U, leaf, rect) comes from the card's
`memory--*` class; size and offset come from `--h`, `--ar` and `--oy`.

**Partner logos** — the marquees use typographic wordmarks for now. Replace any
`<li class="logo">Name</li>` with `<li class="logo"><img src="assets/logos/name.svg" alt=""></li>`
(single-colour SVGs in cream look best on the blue block).

## Known gaps / next iterations

- The contact form validates but is **not connected** to anything yet.
- Footer **GitHub** link and **email** are placeholders (`TODO` in `index.html`).
- Archive images are generated placeholders — real photos needed.
- Only the homepage exists; Teams, Alumni, Events, Projects pages are next.
- Fonts and libraries load from CDNs; self-host and bundle before launch.
