# Evolve AI — Website (prototype)

A from-scratch redesign of the Evolve AI website — the student AI community at
Chitkara University. This is a **visual prototype** of the complete homepage,
establishing the design language. It is not production-ready yet.

**v4 — glass · purple · soft geometry.** Fun first, professional underneath:
a soft purple world with floating glass objects, one confident typeface, and a
shape language that moves — slowly, and mostly when you interact with it.

## Run it

No build step, no dependencies to install.

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173>. (Opening `index.html` directly also works.)
Append `?reduced-motion` to preview the still version.

## Stack

Plain HTML, CSS and JavaScript — no libraries. The only external request is the
font (Space Grotesk, Google Fonts).

## The design language

**Concept — a square that evolves.** Every shape on the page is a square with
some corners curved: *square → quarter → leaf → drop → circle*, plus the long
forms *arch, capsule, half*. It is the geometry of the reference pattern, made
into Evolve's own story. Because every form is just `border-radius` on a box,
any shape can morph into any other; the logo mark is the same idea (square,
quarter, drop, circle).

**Purple, in temperatures** — near-black violet `#13072E`, deep violet
`#22104F`, royal `#4520C4`, electric `#6A3BFF` (the brand colour), electric
indigo `#4B5BFF`, lavender `#B9A5FF`, periwinkle `#AAB6FF`, soft lilac
`#DCD1FF`, almost-white lilac `#F8F6FF`. Cream `#FFF8EE` is kept for the
community section, where the page talks about people.

**Type** — one family, *Space Grotesk*: huge for EVOLVE and the vision lines,
medium for section titles, small uppercase for labels. Sharp text against soft
shapes.

**Glass, used sparingly** — stacking is always *geometry → glass → type* so the
glass has something to blur: the lens over EVOLVE, the About objects, the stage
panel in What we do, the FAQ panel, the contact form, photo labels, the nav.

## How motion is used

- **On load** — EVOLVE assembles letter by letter out of a blur; shapes and
  glass settle in.
- **On scroll** — the arch rising at the bottom of the hero widens until it is
  the About section (the hero → about transition); titles rise word by word;
  photos open from a mask; the origin chart assembles; the vision section pins
  and shows one statement at a time; the footer's shapes settle into a row.
- **When you interact** — glass follows the pointer in the hero; What we do
  rearranges its nine tiles per activity; collage photos lift and push their
  neighbours away; FAQ answers move the shapes behind the glass; buttons are
  magnetic; sending the form throws a handful of shapes; on desktop the cursor
  becomes a dot / ring / label.
- **Ambient** — a few shapes drift very slowly, and the "Today" specimen in the
  origin chart keeps mutating. All of it pauses when its section is off screen.

With reduced motion (or `?reduced-motion`) everything is simply there: no
cursor, no parallax, no pinning; the vision statements stack.

## Structure

```
index.html              all sections, semantic markup, SVG symbols
css/
  tokens.css            palette, type scale, spacing, easing
  base.css              reset, type primitives, layout
  shapes.css            the shape language (.shape + forms, .mt MorphTile, .orbit)
  glass.css             the glass material
  motion.css            keyframes, scroll reveals, reduced motion
  components.css        brand, floating nav, menu, buttons, cursor
  sections/*.css        one file per section
js/
  core.js               namespace, flags, helpers, one shared rAF loop
  main.js               boots every registered module
  split.js, reveal.js … one small module per behaviour
assets/
  favicon.svg           the mark: square, quarter, drop, circle
  gallery/              event photos (see gallery/README.md)
  logos/                partner logos, if they replace the names
```

## Adding real content

**Event photos** — the collage uses real photos from the club's gallery (see
`assets/gallery/README.md`). Each photo is a `<button class="ph ph--N">` with a
glass label; its position and mask are set per `ph--N` in
`css/sections/events.css`, so a new photo can reuse a slot or get a new one.

**What we do** — each activity's tile composition is a one-line recipe in
`js/work.js` (`RECIPES`).

## Known gaps / next iterations

- The contact form validates and plays its "sent" moment but is **not
  connected** to anything yet.
- Footer **GitHub** link and **email** are placeholders (`TODO` in `index.html`).
- Four photos have no visible event name and are captioned by what they show —
  confirm which events they're from.
- Only the homepage exists; Teams, Alumni, Events, Projects pages are next.
- The font loads from Google Fonts; self-host before launch.
