# Evolve AI — Website (prototype)

A from-scratch redesign of the Evolve AI website — the student AI community at
Chitkara University. This is a **visual prototype** of the complete homepage,
establishing the design language. It is not production-ready yet.

**v2 — calm pass.** The first version tried everything at once. This version
keeps only what means something: no looping or ticking animation, no
scroll-jacking, no decorative shapes, and about half the scrolling (≈ 9 screens
on a laptop instead of ≈ 20).

## Run it

No build step, no dependencies to install.

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173>. (Opening `index.html` directly also works.)
Append `?reduced-motion` to preview the no-animation version.

## Stack

Plain HTML, CSS and JavaScript. One optional library from a CDN:
[Lenis](https://lenis.darkroom.engineering) for gentle mouse-wheel smoothing
(touch scrolling stays native). If it fails to load, nothing breaks.

## How motion is used

Motion happens only in three moments, never on its own in the background:

1. **Once, on load** — the hero word rises and settles into its width; the
   A and I are revealed.
2. **Once, on reveal** — headings slide up and text fades in the first time
   each section is seen.
3. **When you ask** — hovers, the FAQ accordion, the archive and testimonial
   arrows.

The only continuous movement is one slow row of partner names, which pauses on
hover and stops entirely with reduced motion.

## Structure

```
index.html              all sections, semantic markup, SVG symbols
css/
  tokens.css            palette, type scale, spacing, motion
  base.css              reset, type primitives, reveal system, reduced motion
  shapes.css            the (deliberately small) geometry: the two-halves O
  components.css        nav, buttons, mobile menu
  sections/*.css        one file per section
js/
  core.js               namespace, env flags, helpers, module registry
  main.js               boot: fonts → modules → intro
  hero.js, archive.js … one small module per behaviour
assets/
  favicon.svg           the mark: arch (A) + pill (I) + node
  gallery/              drop event photos here
  logos/                drop partner logos here
```

## Design system

**Palette** — purple `#54246F`, deep purple `#35205C`, orange `#FF6333`,
cream `#F5F1E8`, blue `#5755D9`, light blue `#C9C8FF`, dark `#17151C`.
Cream is the resting colour; each section gets at most one colour block.

**Type** — *Archivo* (variable, width axis 62–125) for titles and text, with one
title size everywhere; *Instrument Serif* italic for a single accent word;
*JetBrains Mono* for small labels. The hero solves for the width that lets
EVOLVE fill the screen, and chooses one line or EVO / LVE.

**Geometry — every shape must mean something:**

- Every **O / 0** in display type is a *two-halves circle* (hero, 2021, footer).
- The mark is an **arch + pill** = **A + I**.
- Event photos sit in arches (the A), and the colour of each photo's type pill
  encodes the event type: orange hackathon, blue expert talk, purple
  competition, light blue workshop, deep purple flagship, sand community,
  dark projects.

## Adding real content

**Event photos** — the archive uses real photos from the club's gallery (see
`assets/gallery/README.md` for what each shows and how it was identified).
To add one, copy an existing `<li class="event event--TYPE">` and swap the image,
alt text and caption; use `object-position` on the `<img>` to keep the subject
in frame:

```html
<div class="event__frame">
  <img src="assets/gallery/finvasia-hackathon-2026.webp" alt="Teams presenting at the Finvasia Innovation Hackathon" width="1500" height="1000" loading="lazy" decoding="async">
  <span class="event__type label">Hackathon</span>
</div>
```

**Partner logos** — the marquee uses typographic names for now. Replace any
`<li class="logo">Name</li>` with `<li class="logo"><img src="assets/logos/name.svg" alt=""></li>`
(single-colour SVGs in cream look best on the blue block).

## Known gaps / next iterations

- The contact form validates but is **not connected** to anything yet.
- Footer **GitHub** link and **email** are placeholders (`TODO` in `index.html`).
- Four archive photos have no visible event name and are captioned by what
  they show — confirm which events they're from. Recent events without photos
  (Finvasia hackathon, Intellex 2.0, PixelFlow…) aren't in the row yet.
- Only the homepage exists; Teams, Alumni, Events, Projects pages are next.
- Fonts and Lenis load from CDNs; self-host before launch.
