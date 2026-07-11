# Design

Design system for jackreichert.com — a **revival of the 2020 jackreichert.com design** (archived at web.archive.org/web/20200919022300/https://www.jackreichert.com/), which the user loved and only abandoned because that stack lacked the WordPress backend. This rebuild keeps the WP backend (content syncs via `scripts/sync.mjs`) and restores the design with modern craft. Identity-preservation governs: these fonts and colors are the brand; do not swap them for trendier choices.

## Color

The 2020 palette, converted to OKLCH:

| Token | Value | Origin | Role |
|---|---|---|---|
| `--paper` | `oklch(1 0 0)` | white | Body background |
| `--ink` | `oklch(0.2 0 0)` | ~#000 | Body text |
| `--ink-soft` | `oklch(0.42 0 0)` | — | Meta, captions, tags (≥7:1) |
| `--teal` | `oklch(0.459 0.086 224)` | **#06617b** | Static titles, day numeral, doublebars, rules, blockquotes, link hover (7:1) |
| `--vermillion` | `oklch(0.531 0.2 31.5)` | **#c62004** | Links (bold), linked titles, cite (5.8:1) |
| `--bar` | `oklch(0.32 0 0)` | **#333** | Site header bar |
| `--wash` / `--rule` | `oklch(0.955 0 0)` / `oklch(0.84 0 0)` | — | Code bg / hairlines |

**The color logic:** linked titles are vermillion and hover to teal; static titles (post pages, page titles, archive years) are teal. Links everywhere are bold vermillion → teal on hover. This inversion is original to the 2020 site.

## Typography

- **Body: Cormorant Garamond** 500, `1.3125rem/1.6` — the 2020 body face, bumped one weight (was 400) and one size for screen readability. Italics for all meta ("By Jack Reichert", dates on mobile, tags, footer).
- **Display: Montserrat**, loaded in exactly **100 / 300 / 800** — the thin-vs-black contrast IS the voice. 800 for titles and archive years; 100 for the site brand; 300 for nav and small labels.
- **Mono:** system stack, code only.

Do not substitute these families. Cormorant Garamond appears on generic-font ban lists for *new* projects; here it is the committed brand identity and wins.

## Signature moves (all from the 2020 original)

- **The letterboxed photograph.** Featured images run full-bleed at a fixed letterbox height (`clamp(13rem, 34vh, 21rem)` on lists, taller on posts), `object-fit: cover` — the modern equivalent of the original's `clip-path: inset(8rem 0)` trick.
- **The overlapping title card.** A white card (`min(90ch, 100% − gutters)`) pulls up over the photo (`margin-top: -5.25rem`). On mobile the overlap releases (as in the original).
- **The vertical date.** Thin month over a huge teal 800 day numeral, with the year in serif **rotated −90°** beside it. Below 44rem it collapses to inline italic "Month Day, Year" (original behavior at <1050px).
- **The doublebar.** Twin 1px teal rules (a 5px-tall element with top+bottom borders) flanking a centered italic label — closes every entry ("Published in *Category*") and the homepage ("169 essays since 2010 — browse the archive"). Also the `hr` treatment inside prose.
- **The dark bar.** Slim `#333` site header: thin white Montserrat brand + tracked uppercase "FULL STACK PHILOSOPHER" description, thin nav right.
- **Pull-quotes.** Blockquotes get heavy teal rules top and bottom (adapted from the original's `aside`), Montserrat 300 text, and a giant serif open-quote in teal. (The original's colored `border-left` was retired deliberately.)
- **"Continue reading…"** in italic vermillion closes every excerpt; "By Jack Reichert" in italic opens every entry.
- **The drop cap** *(new in the revival)*: a teal Cormorant 600 initial (3.4em, two lines) opens each essay via `.single .post-body > p:first-child::first-letter`. Posts that open with a figure skip it by construction.
- **More essays** *(new)*: after 6 full entries, the homepage continues with a compact rule-separated list of 10 (italic date + serif title) between doublebars, so the archive's depth is scannable.
- **The plate** *(literary-magazine evolution)*: on essay pages the featured photograph runs full and uncropped (`height: auto; max-height: min(82vh, 52rem)`), never the letterbox strip — that stays on browsing surfaces. Optional `featured_caption` frontmatter renders a right-aligned italic credit line and doubles as the image's alt text.
- **The editorial axis** *(evolution)*: on wide screens, essay title, deck, meta, body, and tags all share one left axis inside the 56rem frame (`padding-left: 8.5rem`), with the vertical date hanging in the margin. Body text caps at 62ch; images, figures, and code blocks break out to the full frame width — inline plates.
- **The essay opener** *(evolution)*: title → deck (hand-written `description`, shown only when it ends in terminal punctuation — auto-excerpts are suppressed by the `deckLine` filter) → "By Jack Reichert · N min read".
- **The end mark** *(evolution)*: a small teal ■ centered on the text measure closes every essay, before the tags colophon.
- **The cover story** *(evolution)*: the homepage lead entry (`.entry--lead`) gets a taller letterbox (48vh) and larger title (up to 2.75rem); entries 2–6 keep standard scale.
- Tokens `--card: 56rem` / `--measure: 41rem` are deliberately rem, not ch — they frame elements with different fonts, and ch resolves per-font (this caused a real axis misalignment once).

## Layout

- Home is **stacked full entries** (photo → title card → excerpt column → doublebar), 8 per page — not a card grid. Entry rhythm: `margin-bottom: clamp(3rem, 7vw, 4.5rem)`.
- Reading column `--measure: 65ch`; card width `--card: 90ch`; gutter `clamp(1.25rem, 4vw, 2.5rem)`.
- Archive: teal Montserrat-800 year numerals in a `minmax(5rem, 8rem) 1fr` grid, serif titles, thin-sans dates.
- No shadows, no radii, no cards-with-borders. Print, not UI.

## Motion

Essentially still — the 2020 site had no entrance animation and stillness is part of the voice. Only color/border transitions (0.2s ease-out), plus a 0.22s cross-document view transition (`@view-transition`, progressive enhancement) so page turns cross-fade. `prefers-reduced-motion: reduce` collapses everything, including the view transition (it's inside the no-preference media block).

## Conventions

- Fonts from Google Fonts: `Cormorant+Garamond:ital,wght@0,400..700;1,400;1,500` + `Montserrat:wght@100;300;800`, `display=swap`.
- "Uncategorized" is filtered via `realCategories`; WP excerpt "[…]" markers are cleaned via `excerptClean` (eleventy.config.js).
- Focus: 2px teal outline. Skip-link to `#main`. Body text ≥15:1; all accents pass WCAG AA.
- `main` gets class `single` on non-home pages (taller post letterbox, per the original's `.single` scoping).
