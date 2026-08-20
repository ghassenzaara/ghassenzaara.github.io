# Implementation Plan — ghassenzaara.github.io

Companion to `CONTEXT.md`. CONTEXT is the spec (what and why). This is the build order:
in what sequence, and verified how.

Every phase ends in a **Gate** — a check that must pass before the next phase starts. The
gates are the point. They are what stops a mistake made in phase 3 from being discovered in
phase 9.

---

## Decisions taken (2026-08-19)

| Question | Answer |
|---|---|
| Structural idea (CONTEXT §9) | **Dense editorial grid**, committed. Text and image blocks swap sides per project. |
| Blog (CONTEXT §13) | **No.** Routing seam left in place so adding it later is not a rewrite. |
| Language (CONTEXT §13) | **English only.** |
| Domain (CONTEXT §13) | **`ghassenzaara.github.io`**, Vite `base: '/'`. |

Stack is fixed by CONTEXT §8 and is not reopened: Vite + React 19 + TypeScript,
`vite-react-ssg`, plain CSS custom properties, `@fontsource-variable`, `vite-imagetools`,
CSS transitions + `IntersectionObserver` + one rAF loop, GitHub Actions → GitHub Pages.

---

## What the ui-ux-pro-max skill contributed

Run through the skill's workflow (v2.13.0): product type *portfolio*, audience *engineering
hiring managers and research leads*, style keywords *editorial, minimal, content-first*,
stack *react*.

**Confirmed by the skill, no change needed.** `--design-system` resolved the style category to
**Minimalism & Swiss Style** — `performance: cost:low, drivers:none`, `accessibility:
risk:low, requires: contrast-text-4.5, keyboard, visible-focus, reduced-motion`. The dense
editorial grid sits inside that category. The skill's font pairing independently returned
**Space Grotesk**, which CONTEXT had already chosen. The 680px prose measure checks out against
the skill's 65–75 character rule (17px Inter at 680px ≈ 72ch). Body line-height 1.6 sits inside
its 1.5–1.75 band.

**Overridden deliberately — CONTEXT wins, and the skill's own instructions say project rules
outrank its results.** Its palette (`#18181B` / `#2563EB` monochrome-plus-blue) and its
heading font (Archivo) are generic defaults; CONTEXT §9 specifies a verified ten-token
warm-earth-plus-cool palette with measured contrast ratios, and that is what ships. Its
typography output also emits a Google Fonts CDN `@import`, which CONTEXT forbids outright
(render-blocking, and a GDPR problem in Germany). Fonts are self-hosted via
`@fontsource-variable`. **Not persisting a `design-system/MASTER.md`** for the same reason —
a second, conflicting source of truth next to CONTEXT.md is worse than none.

**Genuinely new — folded into the phases below.** Seven items CONTEXT does not cover:

| # | Finding | Severity | Lands in |
|---|---|---|---|
| 1 | Skip-to-main-content link | Medium | P4 |
| 2 | Sticky nav obscures anchor targets → `scroll-margin-top` | Medium | P4 |
| 3 | Active nav state for the current section (`aria-current`) | Medium | P5 |
| 4 | `scroll-behavior: smooth`, reduced-motion guarded | High | P2 |
| 5 | Font-swap CLS → metric-matched fallbacks | Medium | P2 |
| 6 | WCAG 2.2 web target size on 12px mono nav links | High | P4 |
| 7 | "Animate 1–2 key elements per view max" vs. staggered reveals | High | P5 |

Two of these are real tensions rather than gaps, and are resolved explicitly where they land.

---

## Blockers — read this first

These stop specific pieces of work. Everything else proceeds around them.

### B1 — There are zero product screenshots (hard blocker on project visuals)

`portfolio-images/` holds 12 personal photos and 8 work photos. Not one is a UI capture.
CONTEXT §3 asks for "map view with sidebar open" for BrückenPilot; that file does not exist.

**Proposed resolution: one uniform treatment across all four projects — inline SVG
architecture diagrams.** CONTEXT §3 already leans this way ("Use architecture diagrams as SVG
rather than mocked-up interfaces… apply it identically across all four cards — mixed framing is
what makes portfolios look amateur"). With no screenshots for *any* project, diagrams-for-all-four
is the only treatment that is uniform today. Diagrams drawn from the palette tokens sit inside
the design rather than on top of it, cost no image weight, and stay crisp at every resolution.

If you later capture real screenshots for all four, they swap in wholesale. Swapping in
screenshots for *some* is the outcome CONTEXT explicitly rules out.

**Decision needed: diagrams for all four, or hold the projects section until you can capture
screenshots for all four?** Phases 1–6 do not depend on this. Phase 7 does.

### B2 — Content TODOs (soft; they render as visible chips, and fail the production build)

Never invented, per CONTEXT's instruction at the top of the file.

- Project links, all four (repo / demo / writeup)
- Viegtor: stack, and an expanded description — currently thinner than the other three
- CV PDF → `public/cv.pdf`
- Language levels (Arabic / English / French / German)
- "Beyond the code" prose, 3–4 lines — **you are writing these; I will not generate them**
- Secondary education, include or not

### B3 — `hiking-sea.mov`

Decide after Phase 3 measures it. Default is **skip** — a still usually beats a mediocre loop,
and it is not on the critical path. Only worth encoding if the footage is genuinely good and
the VP9 result lands under ~2 MB.

---

## Phase 0 — Repo hygiene (0.5 h)

1. `portfolio-images/` (52 MB of source JPEG/MOV) becomes **source-only**: git-ignored, never
   shipped. Processed derivatives live in `src/assets/`. Keep the originals somewhere durable
   outside the repo and note the location here.
2. `.gitignore`: `node_modules`, `dist`, `.vite`, `portfolio-images/`, `.idea`, `.DS_Store`.
3. Delete the placeholder `index.html` (`<h1>hi</h1>`) — Vite generates the real one.

**Gate:** `git status` clean except intended files. Tracked content under 5 MB.

---

## Phase 1 — Scaffold and deploy an empty page (2 h)

The most valuable thing to do first: prove the whole pipeline end to end while there is nothing
to debug. A broken deploy found at phase 10 costs a day; found now, an hour.

1. `npm create vite@latest . -- --template react-ts`, React 19.
2. Add `vite-react-ssg`. Entry becomes `ViteReactSSG(...)` with a single `/` route.
   **Verify the installed version supports React 19 before writing any component**, and pin it.
3. `vite.config.ts`: `base: '/'`, `vite-imagetools` registered (unused for now).
4. `tsconfig`: `strict: true`, `noUncheckedIndexedAccess: true`.
5. `.github/workflows/deploy.yml` — checkout → `setup-node` (node 24, npm cache) → `npm ci` →
   `npm run build` → `upload-pages-artifact` (`dist`) → `deploy-pages`. Permissions
   `pages: write`, `id-token: write`. Trigger on push to `main`.
6. Repo Settings → Pages → Source: **GitHub Actions**.

**Gate — all four must hold:**

- `dist/index.html` contains **real rendered text**, not an empty `<div id="root">`. Check with
  `grep`. This is the entire reason `vite-react-ssg` is non-optional.
- The Action goes green and the live URL serves that text.
- The page renders its content with JavaScript disabled.
- No 404s on assets. A `base` mistake shows up here and nowhere else.

---

## Phase 2 — The token layer (3 h)

Nothing visual is built until the tokens are the only place a value is defined. CONTEXT's
strictest rule, and the cheapest one to enforce mechanically.

**`src/styles/tokens.css`** — one file, ~70 lines, four blocks:

- **Color** — the 6 + 4 from CONTEXT §9 verbatim. No eleventh token.
- **Type** — the 11 `--t-*` tokens with their paired tracking. Responsive steps for `--t-hero`
  (56 → 40 @1024 → 32 @640) and `--t-section` (32 → 26 @640) live here, in media queries on
  `:root`, and nowhere else.
- **Space / radius / shadow** — `--space-1..24`, `--r-none|sm|md|pill`, one `--shadow-image`.
- **Motion** — `--ease: cubic-bezier(0.16, 1, 0.3, 1)`, `--dur-fast: 200ms`,
  `--dur-mid: 600ms`, `--dur-slow: 900ms`. Three durations, one curve.

**`src/styles/fonts.css`** — `@fontsource-variable/{space-grotesk,inter,jetbrains-mono}`, Latin
subset, `font-display: swap`, `<link rel="preload">` for the two faces used above the fold.

> **Skill finding #5 — font-swap CLS.** Three self-hosted families swapping in at different
> moments is a CLS source that `font-display: swap` alone does not fix. Each family gets a
> metric-matched `@font-face` fallback (`local()` system face plus `size-adjust`,
> `ascent-override`, `descent-override`) so the swap is invisible rather than a reflow.
> Cheap, and the difference between CLS 0.00 and CLS 0.06 on a page this image-heavy.

**`src/styles/base.css`** — reset, `.container` (1100 / 24 / 20), `.prose` (680px measure),
section padding (96 / 64 / 48), `:focus-visible` ring from `--focus`.

> **Skill finding #4 — smooth anchor scrolling.** `html { scroll-behavior: smooth }`, wrapped in
> `@media (prefers-reduced-motion: no-preference)`. Unguarded smooth scroll is itself a
> motion-sickness trigger, so the guard is not optional.

**Gate — a `npm run lint:design` script, wired into CI, that fails the build on:**

- any hex, `rgb(`, or `hsl(` in a `.css` or `.tsx` file that is not `tokens.css`
- any `font-weight` that is not 400 or 500
- any `border-radius` not in {0, 4px, 12px, 9999px, `var(--r-*)`}
- any `box-shadow` outside the single `--shadow-image` declaration
- any `transition-duration` not in {200ms, 600ms, 900ms, `var(--dur-*)`}
- any `linear-gradient` or `radial-gradient` anywhere

~40 lines of grep, and the highest-leverage item in this plan. It converts six of CONTEXT's
"don't" rules from things I have to remember into things the build enforces.

Manual check: render a swatch page and measure `--fg` / `--accent` / `--muted` on `--bg`, and
`--accent-light` on `--surface-inverse`. Confirm 18.2 / 7.2 / 5.4 / 6.8.

---

## Phase 3 — Image pipeline (3 h)

A separate phase because it is the single biggest risk to the Lighthouse 100 target, and because
it is pure batch work with no design judgment in it.

**1. Cull and crop** — a one-off `scripts/prepare-images.mjs` using `sharp`:

| Output | Source | Crop |
|---|---|---|
| `portrait.webp` | `portrait-valencia` | light; keep the grain and date-stamp look |
| `presenting.webp` | `presenting-ariva-1` | **square** |
| `teaching.webp` | `ro-tutor` | tight on him and the board |
| `viegtor-slide.webp` | `viegtor-slide` | **do not crop.** Full frame, full width |
| `viegtor-team.webp` | `futury-viega-1st-place` | light |
| `strip-01..06.webp` | street-trees, archway-sea, coffee-setup, cagliari-street, beach-cave, aschaffenburg-towers | 4:5 portrait, uniform |

Skipped: `aud-blackboard` (no person; `ro-tutor` is strictly better for the same slot),
`sanfo-hackathon-desk` (cluttered, and a Minecraft download is visible on one screen),
`boat-sea`, `brutalist-facade`, `headland-dusk`, `street-cap`.

**2. Encode** — widths `[480, 800, 1200, 1600]` for wide slots, `[320, 480, 720]` for the strip.
WebP q80. Every `<img>` gets `srcset` + `sizes` + explicit `width`/`height` **read from sharp
metadata, never typed by hand** — hand-typed dimensions is how CLS gets shipped.

**3. Loading** — `loading="lazy"` + `decoding="async"` below the fold; the hero portrait is
`loading="eager"` + `fetchpriority="high"`.

**4.** `hiking-sea.mov`: measure, then apply B3.

**Gate:** total shipped image bytes for a full page load < 900 KB. Every `<img>` in `dist/`
carries `width` and `height` (grep-checked). No source JPEG reaches `dist/`.

---

## Phase 4 — The eight components (4 h)

Built in isolation on a dev-only `/kitchen-sink` route — not prerendered, not linked, deleted
before launch — each with every state visible side by side. Building components against a real
page is how inconsistencies creep in; building them on one screen is how they get caught.

CONTEXT §9 specifies all eight completely, so this phase is transcription, not design:
`Nav` · `ProjectCard` · `TechTag` · `Button` (primary | ghost) · `TextLink` · `Figure` ·
`ContactBand` · plus `Section` (the `--bg` / `--surface` alternation wrapper).

Four traps worth naming rather than rediscovering:

- **`ContactBand` inversion.** Every accented element inside it uses `--accent-light`; `--accent`
  is 2.2:1 there and unreadable. Enforce structurally with a scoped override —
  `.contact-band { --accent: var(--accent-light); }` — so any component reaching for `--accent`
  is *automatically* correct inside the band. Do not rely on remembering it at each call site.
- **`--r-pill` means clickable.** `TechTag` is non-interactive and therefore `--r-sm`.

> **Skill finding #6 — target size.** WCAG 2.2 AA sets the web minimum at 24×24 CSS px, and
> the skill's own guidance prefers 44. The nav anchors render at `--t-mono-label`, 12px — the
> text box alone is roughly 12px tall. Each nav link gets vertical padding to a ≥44px hit area
> inside the 56px nav, with ≥8px between adjacent targets. The visual stays 12px mono; only the
> hit area grows. Same treatment for the colophon links and the tech tags if they ever link out.

> **Skill finding #1 — skip link.** A visually-hidden "Skip to main content" anchor as the first
> focusable element, becoming visible on focus, targeting `<main id="main">`. CONTEXT does not
> mention it and it is a real AA gap on a page with a persistent nav.

> **Skill finding #2 — sticky nav obscures anchor targets.** The nav is `position: sticky` at
> 56px, so an anchor jump lands the section heading *underneath* it. Fix with
> `scroll-margin-top: calc(56px + var(--space-4))` on every section, not with body padding —
> padding shifts the whole layout, `scroll-margin` only affects scroll landing. This also
> satisfies WCAG 2.2 "Focus Not Obscured", since keyboard anchor navigation lands the same way.

**Gate:** kitchen-sink screenshot reviewed against CONTEXT §9 line by line. Full keyboard tab
pass — every interactive element shows a visible 2px `--focus` ring at 2px offset, and the skip
link appears first. `lint:design` still green.

---

## Phase 5 — The motion layer (4 h)

Isolated from content, because motion bugs are the ones that look like content bugs.

Three primitives, ~150 lines total, no library:

**1. `useReveal`** — *one* module-level `IntersectionObserver`,
`rootMargin: "0px 0px -10% 0px"`, shared by every revealed element. Adds a class on entry, then
`unobserve`. Never re-fires on scroll back up.

- `<Reveal>`: opacity + 16px translateY over `--dur-mid`.
- `<ImageReveal>`: container `overflow: hidden` with its own `--r-md`,
  `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` while the inner image goes
  `scale(1.12)` + `opacity: 0` → `scale(1)` + `opacity: 1`, both over `--dur-slow`. Two things
  resolving together is the whole effect.
- Stagger via a `--i` custom property → `transition-delay: calc(var(--i) * 70ms)`, with the
  index **clamped** so the total never exceeds 400ms.

**2. `Cursor`** — 8px dot exact-follow, 32px ring lerped at 0.15/frame, one rAF loop reading a
stored mouse position. Both `position: fixed`, `pointer-events: none`, `will-change: transform`.

**3. `Marquee`** — content duplicated twice, track translated -50% on a linear loop. Exactly one
on the page, between "Beyond the code" and contact.

> **Skill finding #3 — active nav state.** The current section should be indicated in the nav.
> This rides the *same* shared `IntersectionObserver` rather than adding a second one: a section
> entering sets the matching nav link to `aria-current="true"`, styled with `--accent`. Unlike
> the reveal observer this one does not `unobserve` — it is the one intentional exception, and
> it costs nothing since the observer already exists.

> **Skill finding #7 — "animate 1–2 key elements per view maximum" vs. CONTEXT's staggered
> reveals.** A real tension, and the skill rates it High. The resolution: CONTEXT's stagger caps
> at ~400ms total and moves 12–24px, so a viewport-full of cards reads as *one* settling gesture,
> not six competing ones — which satisfies the intent of the rule. What it rules out is
> **compounding**: a card must not reveal *and* hover-lift *and* scale its image on first paint.
> Concretely: reveal transitions run on `opacity`/`translateY` only, hover transitions run on
> `translateY`/`border-color`/`scale`, and the hover transition is not armed until the reveal
> class has settled. One gesture at a time per element.

**Gate — the failure modes, checked deliberately:**

- **JS disabled → everything visible.** Base CSS ships elements at full opacity; JS adds the
  class that *hides* them, then the class that reveals. Verify by disabling JS: no blank page,
  no invisible text.
- **`prefers-reduced-motion: reduce` → all three primitives inert.** Cursor never mounts,
  marquee paused, reveals become instant state changes, smooth scroll off. Toggle in DevTools.
- **Touch device → the cursor never initialises.** Guarded on `(pointer: fine)` **and**
  `(hover: hover)`.
- **`cursor: none` is set from JavaScript only**, after the cursor elements are confirmed in the
  DOM. Never in CSS — a JS failure must not leave someone with no pointer. `cursor: pointer`
  stays on every interactive element so the degraded state is still correct.
- DevTools Performance: scroll the page and confirm reveals produce composite work only, no
  layout or paint. Anything animating `top`/`left`/`width`/`height`/`margin` is a bug.

---

## Phase 6 — Content as typed data (2 h)

All copy in `src/content/*.ts` behind exported interfaces. No prose inside JSX. This makes the
TODO discipline enforceable, and means a copy change can never cause a layout change.

```ts
type Todo = { __todo: string };   // renders as a visible muted mono chip
type Maybe<T> = T | Todo;         // every CONTEXT TODO is typed as Maybe
```

Files: `profile.ts`, `projects.ts` (4 entries, **stable string ids**, numbered 01–04),
`experience.ts`, `education.ts`, `skills.ts` (grouped as CONTEXT §6 — no percentages, no stars),
`personal.ts` (strip captions: mono, `--muted`, three to five words, dry), `colophon.ts` (the
four palette lines).

> **Skill, react stack.** Stable ids as React keys, never the array index — the projects list is
> the one place tempted by `key={i}`. `React.memo` only where measured; on a static prerendered
> page that is nowhere, so it is not used at all.

Voice rules from CONTEXT §7 checked here, once, against finished copy rather than policed
sentence by sentence: first person, plain, concrete, numbers over adjectives, short sentences.
**Banned tokens, grep-enforced in `lint:content`:** passionate, cutting-edge, leveraging,
synergy, journey, "eager to learn", "I'm a X who loves Y", em dashes in body copy, skill
percentages.

**Gate:** `lint:content` fails the **production** build if any `__todo` survives, and prints the
list. Dev builds render them as visible chips. Structurally impossible to ship a placeholder
without noticing, and nothing gets invented to avoid one.

---

## Phase 7 — Sections (6 h)

Assembly only. Tokens, components, motion and content all already exist and are all already
verified. Built in page order so the rhythm is visible as it accumulates.

Section backgrounds follow CONTEXT §9 exactly. The background change **is** the divider — no
horizontal rules, no borders between sections.

1. **Hero** `--bg` — `--t-hero` headline split into `overflow: hidden` line spans, each
   translating up from 100% with an 80ms stagger. **Hero only.** Subline `--t-lead`. Two buttons
   (primary + ghost). Fades in over 500ms on load; nothing else animates on load.

   > **Conflict to resolve here, not later.** The skill recommends `text-wrap: balance` with a
   > bounded measure for short multi-line headings. That is incompatible with manually splitting
   > the headline into line spans — `balance` re-flows the lines the split just fixed. **Manual
   > split wins** (CONTEXT specifies the per-line reveal), so the hero gets a hard
   > `max-inline-size` in `ch` and the line breaks are authored, verified at 1440 / 1024 / 640 /
   > 375. `text-wrap: balance` is then applied to section headings, which are *not* split.

2. **Projects** `--surface` — **the centre of the site: the most space and the most care.**
   The dense editorial grid — `01 / 04` and the year in the outer column, image block and text
   block swapping sides per project. Each project gets its real paragraph, not a caption.
   Visuals blocked on B1; the text side can be built now.
3. **Experience** `--bg` — Fraunhofer SIT / ATHENE (from Oct 2026, NLP) with `presenting.webp`;
   TU Darmstadt tutoring with `teaching.webp`. State the two-modules-in-one-semester fact
   explicitly — CONTEXT is clear that running two courses at once is the load-bearing detail,
   not the tutoring itself.
4. **Education + Skills** `--surface` — brief, and last of the substantive sections, per §2.
5. **Beyond the code** `--bg` — your 3–4 lines (B2), then the six-photo strip with captions.
   `portrait-valencia`'s grain and date-stamp aesthetic stays in the About block and out of this
   strip; it is a different look from the other six.
6. **Marquee** — the one on the page, here.
7. **Contact** `--surface-inverse` — the only full-bleed element, the only appearance of the
   coffee band, 96px vertical padding, `--r-none`. Background transitions in as it enters rather
   than appearing cut. Email, links, then the four-line colophon with a small swatch beside each.

Portrait placement, from CONTEXT §12: he looks left, so the photo sits on the **right** of the
two-column About block and the gaze points into the text. Do not mirror this.

**Gate:** whole page at **375 / 768 / 1024 / 1440** px (the skill's four checkpoints). No
horizontal scroll at any width. Total page height **6–8 screens** — if it is 12, sections are
being padded to fill viewports, which CONTEXT forbids; cut padding, not content. Every paragraph
measured at ≤680px. One `<h1>`, sequential heading levels, `<main id="main">` present with
`<nav>`, `<section>`, `<footer>` landmarks.

---

## Phase 8 — Meta, OG, launch surface (2 h)

- `<title>`, meta description, canonical `https://ghassenzaara.github.io/`.
- OG + Twitter card. **OG image, 1200×630, composed** from `portrait-valencia` + name + tagline —
  not a raw photo crop. Built as a standalone HTML page at exactly 1200×630 using the real tokens
  and the real fonts, screenshotted once, committed to `public/og.png`. Reuses the design system
  instead of inventing a second one inside an image editor.
- `robots.txt`, a one-URL `sitemap.xml`, favicon set, `theme-color: #eff7ff`.
- JSON-LD `Person`: name, email, `sameAs` GitHub and LinkedIn, affiliation TU Darmstadt.
- `public/cv.pdf` once B2 clears. Until then the CV button is a TODO chip.

**Gate:** paste the deployed URL into a card validator and into a real Slack or WhatsApp
message. Title, description and image must all render.

---

## Phase 9 — QA (3 h)

Nothing new is built here. This confirms the gates hold together on the real page.

1. **Lighthouse, mobile profile, production build: 100 performance, 100 accessibility.**
   A performance miss is almost certainly images (Phase 3), not React.
2. **axe DevTools: zero violations.** Landmarks, heading order, one `h1`, real descriptive alt
   text on every image — never "photo of Ghassen".
3. **Keyboard-only pass** of the whole page: skip link first, visible focus everywhere, logical
   order, anchor nav lands below the sticky nav, no traps, focus never obscured.
4. **JS disabled:** all content readable and usable, anchor nav still works.
5. **`prefers-reduced-motion: reduce`:** fully usable, nothing moving, no smooth scroll.
6. **Real devices:** iOS Safari and Android Chrome — `backdrop-filter` on the nav, `clip-path`
   reveals, and the confirmed absence of the custom cursor.
7. **Zoom to 200%:** no clipping, no overlap, no horizontal scroll.
8. **CLS = 0.00** in the Lighthouse trace. Anything above it is font swap (P2) or a missing
   image dimension (P3), and both have a named fix.
9. `lint:design` and `lint:content` green in CI.

---

## Phase 10 — Launch (1 h)

Merge to `main`, confirm the Action, verify the live URL against phases 7–9 once more. Delete
`/kitchen-sink`. Update the decision table above with anything that changed along the way.

---

## Effort

| Phase | Est. |
|---|---|
| 0 — Repo hygiene | 0.5 h |
| 1 — Scaffold + deploy empty | 2 h |
| 2 — Tokens + `lint:design` | 3 h |
| 3 — Image pipeline | 3 h |
| 4 — Components | 4 h |
| 5 — Motion | 4 h |
| 6 — Content | 2 h |
| 7 — Sections | 6 h |
| 8 — Meta + OG | 2 h |
| 9 — QA | 3 h |
| 10 — Launch | 1 h |
| | **~30 h** |

Phases 2–6 are independent of B1 and B2 and account for ~16 of those hours. The blockers only
bite at Phase 7, so there is a lot of runway before you need to have answered them.

---

## Why this order

Each phase produces something verifiable that the next phase depends on, so a mistake surfaces
in the phase that caused it rather than five phases later:

- **Deploy first (P1)** — pipeline bugs found while there is nothing else to blame.
- **Tokens before pixels (P2)** — a hardcoded value becomes impossible, not merely discouraged.
- **Images before layout (P3)** — the performance budget is known before it can be spent.
- **Components before pages (P4)** — inconsistency is visible on one screen instead of six.
- **Motion before content (P5)** — reveal bugs read as content bugs when the two land together.
- **Content as data before assembly (P6)** — TODOs become build failures, never silent gaps.
