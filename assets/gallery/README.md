# Gallery photos

Event and community photos, taken from the "memories" gallery on the current
site (evolveai.chitkara.edu.in). The originals were 6–8K camera files of up to
22 MB each; these copies are resized to 1000 px tall WebP (quality 74) with
camera metadata stripped — about 40–160 KB each.

| File | Shows | Identified from | On homepage |
| --- | --- | --- | --- |
| `hackindia-2025-winners.webp` | Winners on stage with the prize cheque | "HackIndia 2025" backdrop (with SingularityNET) | yes |
| `ai-create-2.webp` | Faculty and guests outside the main building | AI-Create 2.0 standee, 18 Oct 2023 | yes |
| `genesis-gala-performance.webp` | Student band on stage | Genesis Gala backdrop (freshers & talent hunt) | yes |
| `judging-round.webp` | A judge with a team at a "Team 2" desk | — (no event name visible) | yes |
| `ai-in-education-workshop-2024.webp` | Group with the workshop standee | "AI for Emerging Trends & Technologies in Education", 13 Mar 2024, with Microsoft & Acer | yes |
| `expert-session.webp` | A guest speaker addressing students | — | yes |
| `qa-round.webp` | Team 18 asking a question in an auditorium | — | yes |
| `project-showcase-drone.webp` | Guests examining a student-built drone | — | yes |
| `hackindia-2025-group.webp` | Participants outdoors with certificates | HackIndia shirts and cheque | spare |
| `hackindia-2025-certificates.webp` | Participants with certificates on stage | "HackIndia 2025" backdrop | spare |
| `genesis-gala-group.webp` | Group photo on the Genesis Gala stage | Genesis Gala backdrop | spare |
| `community-group-photo.webp` | Large group photo in an auditorium | — | spare |

Photos marked "—" are captioned by what they show rather than by event name.
If you know which event they are from, update the caption in `index.html`.

Adding more: prefer `.webp`, ~1000–1600 px on the long edge, named after the
event (e.g. `finvasia-hackathon-2026.webp`), and always write a real `alt` text.

```bash
cwebp -q 74 -resize 0 1000 -metadata none original.jpg -o assets/gallery/name.webp
```
