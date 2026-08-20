# CONTEXT.md

Context for building my personal portfolio website. Read this fully before writing any code.

> Lines marked `TODO` are placeholders I need to fill in. Don't invent values for them — leave them as visible TODOs or ask me.

---

## 1. Who I am

**Ghassen Zaara** — B.Sc. Informatik student at TU Darmstadt, expected completion October 2027. Current GPA 1.63.

Tunisian, based in Darmstadt, Germany.

I build AI systems fast. Most of my strongest work came out of hackathons — five shipped projects in under a year, including a first place and a second place against large fields. Alongside that I taught two modules in the same semester as a university tutor, computer architecture and algorithms, and I'm starting as a research assistant at Fraunhofer SIT / ATHENE working on NLP.

The thread through all of it: I like problems where the constraint is real. On-premise because the data legally cannot leave the building. 48 hours because that's the hackathon. A benchmark that has to actually run on 8GB of VRAM.

**Contact / links**
- Email: zaaraghassen@gmail.com
- GitHub: https://github.com/ghassenzaara
- LinkedIn: https://www.linkedin.com/in/ghassen-zaara
- CV: `TODO` — PDF to be added

**Languages:** Arabic, English, French, German. `TODO — confirm levels before displaying`

---

## 2. Positioning

The site should read as: *a builder who ships under constraint*, not *a student listing coursework*.

Emphasize, in order:
1. Shipped projects with measurable outcomes
2. Real-world constraints I've worked under — DSGVO, on-premise deployment, public-sector clients, open-source review
3. Teaching — I've explained processor datapaths and red-black trees to a room of students, which is a different skill from building
4. Academics last, and briefly

Do **not** write generic student-portfolio copy. No "passionate about technology", no "eager to learn", no skill-percentage bars.

---

## 3. Projects

Four projects. This is the centre of the site — give them the most space and the most care.

### 01 — BrückenPilot
**German bridge inspection data, turned into decisions.**

German bridges are inspected under DIN 1076. Every inspection produces a *Bauwerksbuch*: a 20–30 page PDF holding the bridge's attributes, inspection history, individual damage records and maintenance record. The data exists, but it lives in PDFs, and nobody turns it into decisions. A Bauamtsleiter at Autobahn GmbH or Hessen Mobil today picks which bridges to renovate using Excel and institutional memory. In December 2021 the Rahmedetalbrücke on the A45 closed overnight; the structural decline was visible in the inspection history, and nobody connected it to an action in time.

BrückenPilot ingests a Bauwerksbuch PDF and produces an interactive map application. Upload triggers an async pipeline: text extraction, LLM-based structured extraction against Pydantic schemas at temperature 0, embedded inspector photo extraction, UTM ETRS89 → WGS84 coordinate conversion, then a marker on the map. Clicking it opens a sidebar with the bridge's condition scores (Zustandsnote and Substanznote, with a divergence indicator), a generated summary covering situation, risks and recommendation, and its maintenance history. Two further views: ranked damage cards with inspector photos, and an inspection-history chart with a linear-regression projection and confidence intervals. A separate tab surfaces PQ-qualified contractors filterable by radius, distinguishing historical contractors found in the document from active firms available to hire.

- **Stack:** FastAPI (Render), React 19 + Vite + TypeScript (Vercel), Supabase for Postgres, storage and realtime job status, Gemini 2.0 Flash for extraction and summarization, pdfplumber, PyMuPDF, pyproj, MapLibre GL, Recharts, TanStack Query, Tailwind + shadcn/ui
- **Context:** built as an interview project for a startup building infrastructure management software for German public agencies
- Links: `TODO`
- Visual: map view with sidebar open is the strongest screenshot

### 02 — ARIVA
**On-premise document processing for public administration.**

Built at the Black Forest Hackathon 2026 against a real software requirements specification from Regierungspräsidium Freiburg. Cross-border legal-aid documents needed automated processing, but no data was permitted to leave the premises under DSGVO — which ruled out every commercial API and forced the entire pipeline local.

A vision-language model reads incoming scanned PDFs and auto-fills legacy case forms. FastAPI backend calling Qwen3-VL through Ollama, OpenCV preprocessing, PostgreSQL storage, React 19 frontend, Spring Boot service layer. Structured extraction via Ollama's `format` field with JSON Schema and Pydantic models, temperature 0 for determinism.

- **Outcome:** pitched afterwards to Regierungspräsidium Offenburg as a paid freelance engagement
- **Stack:** React 19, Spring Boot, FastAPI, Qwen3-VL via Ollama, OpenCV, PostgreSQL
- **Note:** team project, built with collaborators
- Links: `TODO`

### 03 — VC AI Copilot
**One question, answered across four disconnected systems.**

Built at the TUM.ai × Yellow Hackathon. A VC firm's knowledge is scattered across its CRM, meeting notes, Slack and email, and no single system can answer "what's the current state of this company and where are the gaps".

Six components: an LLM extraction engine, a knowledge graph on Supabase with pgvector, a RAG query engine, a market map generator and a dashboard. Integrations across Affinity CRM, Granola, Slack and Gmail collapse into one unified company object carrying source attribution, derived first-contact and current-status fields, and explicit gap detection. Every LLM call runs inside Supabase Edge Functions — no separate backend service.

- **Stack:** Supabase (Postgres, pgvector, Edge Functions), embeddings and vector search, multi-source API integration
- Links: `TODO`
- Visual: architecture diagram or the market map view — there's no conventional screenshot that carries this one

### 04 — Viegtor
**Strategic AI for patent and regulatory analysis.**

Built at Futury Build Days, Frankfurt, for the Viega challenge. Analysis tool covering patents, regulations and competitor positioning.

- **Outcome: 1st place.**
- **Presented on crutches** — a broken ankle a week earlier. Worth one dry sentence in the project text, not a paragraph. The photo carries it.
- **Stack:** `TODO — fill in`
- Links: `TODO`
- `TODO — expand this description; it's currently thinner than the other three`
- `TODO` — since `viegtor-slide` stays uncropped as a story photo, this project has no clean product visual. Either a screenshot of the app or an architecture diagram is still needed.

**Cross-cutting note on project visuals:** two of these four have no conventional UI to screenshot. Use architecture diagrams as SVG rather than mocked-up interfaces. Whatever treatment is chosen, apply it identically across all four cards — mixed framing is what makes portfolios look amateur.

---

## 4. Experience

**Studentische Hilfskraft (Research Assistant) — Fraunhofer SIT / ATHENE**
From October 2026. NLP research: authorship analysis (attribution and verification), style change detection, AI-generated text detection and LLM attribution. Classical feature engineering plus embeddings, one-class and binary classification, ensemble methods.

**Tutor — TU Darmstadt, Fachbereich Informatik** — summer semester 2026

Two modules, taught in parallel in the same semester. Worth stating explicitly on the site: running two courses at once is the part that carries weight, not the tutoring itself.

- *Rechnerorganisation*: RISC-V assembly and calling conventions, single-cycle and multicycle datapaths, ALU control decoding, pipeline hazards and flush penalties, cache addressing.
- *Algorithmen und Datenstrukturen*: sorting and divide-and-conquer, radix sort, ADTs, BSTs, AVL and red-black trees.

Ran weekly exercise sessions, wrote the slide decks, managed Testat scheduling and the student forum. Redesigned a practical assignment on red-black and AVL tree operations into a single unified 12-point exercise.

---

## 5. Education

**TU Darmstadt — B.Sc. Informatik**, Oct 2024 — expected Oct 2027. GPA 1.63.

Relevant coursework: machine learning (SVMs, kernel methods, clustering), algorithms and complexity, databases, computer networks, static program analysis.

Deep Reinforcement Learning practical course: implementing C51, IQN, Rainbow and IMPALA on the JAXtari-15 benchmark in JAX/Flax/Optax.

`TODO — add secondary education if I want it on the site`

---

## 6. Skills

Group by how I actually use them, not as a flat cloud. No proficiency percentages, no star ratings.

- **Languages:** Python, TypeScript, Java, JavaScript, SQL, HTML/CSS, Rust and Swift (project-level)
- **Backend & frameworks:** FastAPI, Spring Boot, React, Node
- **ML / AI:** JAX, Flax, Optax, RAG pipelines, embeddings and vector search, local LLM serving via Ollama, structured LLM output, OpenCV
- **Data:** PostgreSQL, Supabase, pgvector, FalkorDB
- **Tools:** Git, Docker, WSL/Linux, CUDA workloads, LaTeX

---

## 7. Voice and tone

First person. Plain, direct, concrete. Specific numbers over adjectives — "2nd of 40+ teams", not "highly successful". Short sentences. No superlatives about myself.

**Avoid entirely:** "passionate", "cutting-edge", "leveraging", "synergy", "journey", "I'm a X who loves Y". Avoid em dashes in body copy.

---

## 8. Technical approach

**The stack is decided. Do not propose alternatives.**

| Piece | Choice |
|---|---|
| Build | Vite + React 19 + TypeScript |
| Prerender | `vite-react-ssg` |
| Styling | Plain CSS with custom properties. **Not Tailwind.** |
| Fonts | `@fontsource-variable` packages, self-hosted |
| Images | `vite-imagetools` |
| Animation | GSAP + ScrollTrigger, plus CSS transitions for simple state changes |
| Deploy | GitHub Actions → GitHub Pages |

`vite-react-ssg` is required, not optional. A plain React SPA serves an empty root div — no content without JavaScript, nothing for search engines or link previews. Prerendering produces real HTML at build time while the source stays ordinary React.

**No component library.** No shadcn, no Radix, no Headless UI. The eight components in section 9 are fully specified; a library would import design opinions that conflict with them.

**No Tailwind.** The design tokens are CSS custom properties by definition — 10 colours, 12 type tokens, 8 spacing values, roughly 60 lines. Utility classes in JSX would violate the "tokens defined once, nothing hardcoded elsewhere" rule.

Hard requirements:
- Deploys to **GitHub Pages** from the repo `ghassenzaara.github.io`, served at the root URL
- All content readable and usable without JavaScript — animation is progressive enhancement, never a gate on content (see Motion, section 9)
- Fonts self-hosted, not loaded from the Google Fonts CDN (render-blocking, and a GDPR issue in Germany)
- Lighthouse 100 on performance and accessibility. React costs ~45 KB gzipped, so the image pipeline has to be done properly to stay inside the budget
- Keyboard navigable, sensible focus states, real alt text
- Design tokens defined once — colours, type scale, spacing — and nothing hardcoded elsewhere

---

## 9. Design direction

**Reference site:** https://kechich.github.io

What I want to take from it: the numbered project presentation (01/04, 02/04) which forces focus onto a small set; the single-scroll structure with anchor navigation; giving each project a real paragraph instead of a one-line caption; the restrained near-black palette.

**Important:** this is a friend's site and we studied together, so do not clone it. Same skeleton, different everything else — different typeface pairing, different accent, different layout rhythm. If the two sites sit side by side the resemblance should be structural, not visual.

Avoid the default dark-mode-with-purple-gradient developer portfolio. Pick one structural idea — dense editorial grid, terminal/monospace, or single-column reading-first — and commit to it rather than mixing.

### Color

Six palette tokens plus four derived. Do not introduce an eleventh, and do not hardcode any color outside this block.

```css
--bg:              #eff7ff;  /* Alice Blue    — page background */
--fg:              #100b00;  /* Pitch Black   — primary text */
--muted:           #656839;  /* Olive Leaf    — secondary text, metadata, tech tags */
--accent:          #22577a;  /* Baltic Blue   — links, active states, project numbers */
--surface-inverse: #2e1505;  /* Dark Coffee   — one inverted band only */
--accent-light:    #88a7bc;  /* accent lightened, for use on --surface-inverse */

--surface:         #e3eef9;              /* bg darkened ~4% — cards, hover states */
--border:          rgba(16, 11, 0, 0.12); /* fg at 12% — hairlines, dividers */
--border-strong:   rgba(16, 11, 0, 0.24); /* emphasized dividers */
--focus:           #22577a;              /* 2px ring, 2px offset — accessibility */
```

Verified contrast against `--bg`: `--fg` 18.2:1, `--accent` 7.2:1, `--muted` 5.4:1 (AA — body text minimum, do not use it smaller than 14px).

**Critical:** `--accent` on `--surface-inverse` is 2.2:1 and unreadable. Inside the inverted band use `--accent-light` (6.8:1) for every accented element. Never `--accent`.

`--surface-inverse` appears exactly once on the page — the contact/footer band. It is not a section background to reuse.

The palette is warm-earth (olive, coffee) mixed with cool (blue, alice). That only works with discipline: warm tones carry secondary information, cool tones carry interaction. Don't cross them.

### Type

Three families, self-hosted as `.woff2`, Latin subset:

- **Space Grotesk** — headings, project titles, the wordmark. Weights 400 and 500 only.
- **Inter** — body copy. Weights 400 and 500 only.
- **JetBrains Mono** — project numbering (01 / 04), tech tags, metadata labels, eyebrow text. Weight 400.

**The weight ladder is 400 / 500. Nothing else exists.** No 600, no 700. Space Grotesk has enough character that 500 reads as emphatic where a neutral face would need 600. Heavier weights fight this palette.

| Token | Family | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| `--t-hero` | Space Grotesk | 56px | 500 | 1.05 | -0.03em | Hero headline only. One per page. |
| `--t-section` | Space Grotesk | 32px | 500 | 1.15 | -0.02em | Section headings |
| `--t-project` | Space Grotesk | 24px | 500 | 1.20 | -0.02em | Project titles |
| `--t-lead` | Inter | 20px | 400 | 1.50 | -0.01em | Hero subline, section intros |
| `--t-body` | Inter | 17px | 400 | 1.60 | -0.01em | Default paragraph |
| `--t-body-strong` | Inter | 17px | 500 | 1.60 | -0.01em | Inline emphasis |
| `--t-caption` | Inter | 14px | 400 | 1.50 | 0 | Photo captions, secondary notes |
| `--t-mono-label` | JetBrains Mono | 12px | 400 | 1.00 | +0.08em | Eyebrows, dates, section labels. Uppercase. |
| `--t-mono-tag` | JetBrains Mono | 12px | 400 | 1.00 | +0.04em | Tech tags. Not uppercase. |
| `--t-mono-number` | JetBrains Mono | 14px | 400 | 1.00 | +0.04em | Project numbering (01 / 04) |
| `--t-fine` | Inter | 12px | 400 | 1.50 | 0 | Colophon, legal, footer fine print |

**Body runs at 17px, not 16px.** The extra pixel changes the reading pace from scanning to reading, which is what this site needs — the project paragraphs are the evidence.

**Negative tracking above 20px, positive tracking below 14px.** Large type tightens; small mono labels open up. Never the reverse.

**Responsive type:** `--t-hero` steps 56 → 40px at 1024px → 32px at 640px. `--t-section` steps 32 → 26px at 640px. Everything else holds its size at every breakpoint.

### Spacing and layout

Base unit 8px. Every structural value is a multiple.

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;   /* section padding, desktop */
```

- **Section vertical padding:** 96px desktop → 64px tablet → 48px mobile.
- **Container max width:** 1100px, centred, with 24px side gutters that drop to 20px on mobile.
- **Prose measure:** 680px max on any paragraph. Body text never runs the full container width — long lines are the fastest way to make a portfolio unreadable.
- **Grid gutters:** 24px between cards.
- **Card padding:** 24px.

**On density.** This is an editorial layout, not a gallery. Sections are sized by their content, not padded out to fill a viewport. A visitor should reach the fourth project without feeling they've been scrolling — target the whole page at roughly 6–8 screens, not 12.

### Elevation and depth

| Level | Treatment | Where |
|---|---|---|
| Flat | No shadow, no border | Sections, buttons, nav, footer, text |
| Hairline | `1px solid var(--border)` | Card edges, dividers, tag outlines |
| Surface shift | `background: var(--surface)` | Card fills, hover states |
| Image shadow | `0 4px 24px rgba(16, 11, 0, 0.10)` | Photographs and screenshots only |

**Exactly one shadow exists, and it belongs to imagery.** Never on cards, never on buttons, never on text, never on the nav. Depth in the UI comes from surface change and hairlines. This single rule is most of what separates a considered portfolio from a templated one.

Note the shadow is built from `--fg` (#100b00), not pure black. The palette is warm; a neutral black shadow reads as dirty against it.

**No gradients anywhere.** Not on backgrounds, not on text, not on borders. Atmosphere comes from the photographs.

### Shapes

| Token | Value | Use |
|---|---|---|
| `--r-none` | 0 | Full-bleed bands (the contact footer) |
| `--r-sm` | 4px | Tech tags, small chips |
| `--r-md` | 12px | Cards, images, figures |
| `--r-pill` | 9999px | Buttons and anything that reads as an action |

**Four values, nothing in between.** Pill means "this is an action". If an element isn't clickable, it never gets the pill. Consistency here is what makes the radius grammar legible instead of arbitrary.

### Components

**`nav`** — Sticky, height 56px, background `--bg` at 85% opacity with `backdrop-filter: blur(12px) saturate(180%)`. Wordmark left in `--t-project`. Anchor links right in `--t-mono-label`. A 1px `--border` bottom edge appears only once the page has scrolled past 40px, transitioned in. No shadow, ever.

**`project-card`** — Background `--surface`, 1px `--border`, `--r-md`. Padding 24px. Contents in order: `01 / 04` in `--t-mono-number` (`--accent`) with the year right-aligned in `--t-mono-label` (`--muted`); title in `--t-project`; paragraph in `--t-body`; a row of tech tags; a link. Hover: `translateY(-2px)`, border shifts toward `--accent`, contained image scales to 1.03. All at 200ms.

**`tech-tag`** — Background transparent, 1px `--border`, `--r-sm`, `--t-mono-tag` in `--muted`, padding 4px 10px. Non-interactive, so never a pill.

**`button-primary`** — Background `--accent`, text `--bg`, `--r-pill`, padding 12px 24px, `--t-body`. Active: `transform: scale(0.97)`. Focus: `outline: 2px solid var(--focus); outline-offset: 2px`. On the inverted band, background becomes `--accent-light` with `--surface-inverse` text.

**`button-ghost`** — Transparent, 1px solid `--accent`, text `--accent`, otherwise identical to `button-primary`. Used as the second of a pair.

**`text-link`** — `--accent`, with an underline drawn by a pseudo-element using `transform: scaleX()` from `transform-origin: left`. Not `text-decoration` — that can't animate cleanly. On the inverted band: `--accent-light`.

**`figure`** — Image at `--r-md` with the image shadow, caption below in `--t-caption`, `--muted`. Always explicit `width`/`height`.

**`contact-band`** — The only full-bleed element. Background `--surface-inverse`, `--r-none`, edge to edge, 96px vertical padding. Heading in `--t-section` (`--bg` text), email and links in `--accent-light`, colophon at the bottom in `--t-fine`. **Every accented element in here uses `--accent-light`.** `--accent` is unreadable on this surface.

### Section rhythm

Alternate `--bg` and `--surface` between sections. The background change is the divider — no horizontal rules, no borders between sections.

```
hero              --bg
projects          --surface
experience        --bg
education/skills  --surface
beyond the code   --bg
contact           --surface-inverse   (full bleed, once)
```

The coffee band appears exactly once, at the end. It is not a section background to reuse — its weight is the whole point of holding it back.

### Motion

I want the site to feel modern and smooth. That means motion is a real part of the design, not an afterthought — but it must never be the reason the page feels slow or busy.

**The rules that make animation read as expensive rather than cheap:**

- **One easing curve everywhere.** `cubic-bezier(0.16, 1, 0.3, 1)` — fast start, long soft settle. Never `linear`, never the browser default `ease`.
- **Three durations, no others.** 200ms for anything the user triggered directly (hover, focus, click). 600ms for anything that happens on its own (text reveal, section entry). 900ms for image reveals only. Nothing else exceeds 600ms.
- **Animate `transform` and `opacity` only.** Never `top`, `left`, `width`, `height`, or `margin` — those trigger layout and cause jank. This one rule is most of what separates smooth from stuttery.
- **Small distances.** Scroll reveals move 12–24px, not 100px. Subtlety reads as considered; large travel reads as a template.
- **Stagger, don't cascade.** When several items enter together (project cards, photo strip), offset each by 60–80ms. Cap the total stagger at ~400ms so the last item isn't still animating when the user has already scrolled past.

**Specific moments worth animating:**

**Image reveal on scroll** — this is the one that carries the "smooth" feeling more than anything else. The mechanism:

- Wrap every image in a container with `overflow: hidden` and the container's own `--r-md` radius.
- The image starts at `scale(1.12)` and `opacity: 0`. On entry it eases to `scale(1)` and `opacity: 1` over 900ms.
- The container itself simultaneously reveals via `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)`, wiping upward over the same 900ms.
- The result is the image settling into place while the frame opens around it. It reads as expensive because two things resolve together rather than one thing fading.
- This is the only place a duration above 600ms is allowed.

**Text reveal on scroll** — fade plus a 16px upward translate over 600ms, via `IntersectionObserver` with `rootMargin: "0px 0px -10% 0px"` so elements begin before they're fully in view. Fire once, then `unobserve`. Never re-animate on scroll back up.

**Headings, optionally, by line** — split the hero headline into lines wrapped in `overflow: hidden` spans, each line translating up from 100% with a 80ms stagger. Only on the hero. Doing it to every heading is where this technique stops looking considered.

**Custom cursor** — a small dot that follows the pointer with easing, plus a larger ring that lags behind it.

- Dot: 8px, `--accent`, follows the pointer position exactly.
- Ring: 32px, 1px `--accent` border, transparent fill, lerped toward the pointer at roughly `0.15` per frame — this lag is the entire effect.
- Update both inside a single `requestAnimationFrame` loop reading a stored mouse position. Never write transforms directly in the `mousemove` handler.
- Both elements: `position: fixed`, `pointer-events: none`, `will-change: transform`, `z-index` above everything.
- On hover over any link, button or card: the ring scales to 2× and its border thickens; the dot shrinks to 4px.
- Over the inverted contact band, both switch to `--accent-light`.
- **Only when `(pointer: fine)` and `(hover: hover)` both match.** On touch devices the whole thing must never initialise.
- **Do not set `cursor: none` in CSS.** Set it from JavaScript only after the cursor elements are confirmed in the DOM — otherwise a JS failure leaves someone with no pointer at all.
- Disable entirely under `prefers-reduced-motion: reduce`.

**Project cards on hover** — a 2–4px lift, border colour shifting toward `--accent`, and the contained image scaling to 1.03. 200ms.

**Links** — an underline drawn from the left via `transform: scaleX()` on a pseudo-element with `transform-origin: left`. Not `text-decoration`, and not a border that shifts layout.

**Buttons** — background and border transition over 200ms; `transform: scale(0.97)` on `:active`. If a button has an arrow, the arrow translates 4px on hover while the label stays put.

**The inverted contact band** — as it enters the viewport, the background colour transitions in rather than appearing cut. The one moment on the page worth making slightly theatrical.

**Page load** — the hero fades in over 500ms. Nothing else animates on load; everything below waits for scroll.

**Optional: a marquee strip.** An infinitely scrolling row of short words (hobbies, or the tech you use) between two sections, moving slowly and continuously. Duplicate the content twice and translate the track by -50% on a linear loop. Pause it on `prefers-reduced-motion`. This is a nice texture between the personal section and the contact band — but only one on the page.

**Non-negotiable:**

- Honour `prefers-reduced-motion: reduce`. Wrap every animation in the media query and reduce to instant state changes. This is an accessibility requirement, not a nicety.
- Content must be visible and readable before any JavaScript runs. Reveal states start at full opacity in the base CSS and are only hidden by a class JS adds — so if JS fails, everything is simply there.
- Every scroll animation runs through ScrollTrigger, never a scroll event listener.
- Anything that follows the pointer runs in a single `requestAnimationFrame` loop, never directly in the event handler.
- No scroll-jacking. A pinned section that advances on normal scroll is fine; cancelling wheel or touch events to drive it is not.

**GSAP, and where it stops.**

GSAP core plus ScrollTrigger is roughly 35 KB gzipped. The motion on this site is the point of it, and a hand-rolled equivalent would be worse and take longer.

Use GSAP for:

- The pinned projects section — ScrollTrigger with `pin: true`, scrubbed off scroll progress. The main event of the site.
- The preloader timeline.
- Any scroll-scrubbed or multi-step sequence.
- Text and image reveals on scroll, via ScrollTrigger with `once: true`.

Keep plain CSS for:

- Hover states, focus rings, button `:active`. A CSS transition is less code and more robust than JS for a two-state change. Not a rule of principle, just the better tool.
- The horizontal photo gallery — native `overflow-x` with scroll-snap. Do not rebuild it in GSAP. Native scroll gets trackpad, shift+wheel, touch swipe and keyboard for free; a JS version breaks all four.

Everything else in this section still holds, now expressed in GSAP terms:

- One easing curve throughout. A `CustomEase` matching `cubic-bezier(0.16, 1, 0.3, 1)`, or `power4.out` / `power3.out` used consistently. Never mixed arbitrarily per animation.
- Durations: 0.2s user-triggered, 0.6s self-triggered, 0.9s image reveals.
- Animate `transform` and `opacity` only. Never `top`, `left`, `width`, `height` or `margin`.
- Stagger 0.06–0.08s between grouped items, capped around 0.4s total.
- Wrap everything in `gsap.matchMedia()`, and disable under `prefers-reduced-motion: reduce`.
- Content readable with JavaScript disabled. Reveal states start visible in base CSS; GSAP sets the hidden start state at runtime. Never author an element as `opacity: 0` in CSS.
- The pinned section is disabled below 900px via `matchMedia` — a viewport-height pin plus 3D transforms is a bad trade on a phone. It falls back to a plain stacked list.
- Lighthouse stays at 100. The image pipeline is where the budget goes, so `vite-imagetools` has to be doing its job.

### Do and don't

**Do**
- Use `--accent` for every interactive element and nothing else. One accent, no exceptions.
- Keep the weight ladder at 400 / 500. If something needs more emphasis, change the size or the family, not the weight.
- Let the background change be the section divider. No rules, no borders between sections.
- Reserve `--r-pill` for actions. If it isn't clickable, it isn't a pill.
- Apply the image shadow only to photographs and screenshots.
- Use `transform: scale(0.97)` as the press state on every button, uniformly.
- Cap every paragraph at a 680px measure regardless of container width.
- Swap to `--accent-light` for every accented element inside the contact band.

**Don't**
- Don't add a second accent colour.
- Don't put shadows on cards, buttons, text, or the nav.
- Don't use gradients — not for backgrounds, text, or borders.
- Don't reuse `--surface-inverse` for any section other than the contact band.
- Don't pad sections out to fill a viewport. Content decides height.
- Don't introduce radii between the four defined values.
- Don't set body below 17px or tighten its line-height below 1.6.
- Don't use `--muted` (#656839) below 14px — it only clears AA at body sizes.

---

## 10. Colophon

Add a short colophon at the very bottom of the page, near the copyright line. Four lines, mono, `--muted`, small. The palette is not arbitrary and saying so is the point:

- Baltic Blue — the sea
- Dark Coffee — I'm a coffee nerd
- Olive Leaf — trees
- Pitch Black — the default

Keep it dry. No heading like "About this palette", no explanation beyond the four pairings. A small swatch square beside each line works; a full design-system showcase does not.

---

## 11. Beyond the code

A short personal section, placed after experience and before contact. Three or four lines of prose, then a photo strip. Not a bulleted hobby list.

What it covers: coffee, seriously enough to own the grinder and the scale. The sea, which is where I'm from. Hiking and trees. Photography, mostly architecture and coastlines, rarely people. Travel. The gym. Futsal.

`TODO — I'll write the final three or four lines myself. Don't generate them.`

---

## 12. Image assets

All images: `.webp`, `loading="lazy"` below the fold, explicit `width` and `height` on every `<img>` to prevent layout shift, and real descriptive alt text (not "photo of Ghassen").

### Placement

| Slot | Photo | Notes |
|---|---|---|
| About / portrait | `portrait-valencia` (linen shirt, looking off-frame) | Blown-out sky blends into `--bg` — no container or border needed. He looks left, so place the photo on the RIGHT of a two-column block so the gaze points into the text. |
| Experience — Fraunhofer / hackathons | `presenting-ariva-1` (mic, team behind) | Direct eye contact, real moment. Crop to square. |
| Experience — teaching | `ro-tutor` (blackboard, RISC-V cache) | Crop tighter on him and the board. |
| Project 02 — ARIVA | `presenting-ariva-2` (audience view) | Or an architecture diagram; decide once the diagram exists. |
| Project 04 — Viegtor | `viegtor-slide` | **Do not crop.** The full frame is the point: the team presenting, the projected product on the wall, and the crutches. He pitched this one on a broken ankle and won it. Use it at full width. |
| Project 04 — supporting | `futury-viega-1st-place` (team + certificates) | Proof of the result. |
| Beyond the code | 4–6 from the personal set | See below. |
| OG image | 1200×630, built from `portrait-valencia` + name + tagline | Composed, not a raw photo. |

### Personal strip — recommended selection

In priority order: the tree-lined street walking away; the Tunisian archway framing the sea; the coffee setup from above; the Cagliari street; the beach cave looking out; the Aschaffenburg towers.

Rules for this strip:
- Favour the photos with no person, or with the person small and turned away in the frame. The architecture, coastline and tree-canopy shots say "I have an eye", which is the more useful signal here.
- Short caption under each: mono, `--muted`, three to five words. Dry, not wistful.
- The film-grain date-stamp look on `portrait-valencia` is a distinct aesthetic that the other photos don't share. Keep it to the About section rather than mixing it into this strip.

### Gaps to fill

- `TODO` — `hiking-sea.mov` needs converting: `.webm` (VP9) plus `.mp4` (H.264) fallback, a `.webp` poster frame, `muted playsinline loop`, no autoplay above 2 MB. Only worth it if the footage is genuinely good; a still usually beats a mediocre loop.
- `sanfo-hackathon-desk` (laptops, energy drinks) reads as authentic "48 hours" but is cluttered, and a Minecraft download is visible on one screen. Crop tight or skip.
- `aud-blackboard` has no person in it. `ro-tutor` is strictly better for the same purpose.

---

## 13. Open questions

- Blog section, yes or no? I have publishable material (on-prem VLM under DSGVO, structured LLM output, LLM extraction from German bureaucratic PDFs) but an empty blog is worse than none.
- Custom domain, or stay on `.github.io`?
- German version of the site, or English only?
