# CONTENT.md

Site content and section structure. Companion to `CONTEXT.md` — that file defines *how* things look and move, this one defines *what is on the page and in what order*.

Where the two disagree, `CONTEXT.md` wins on design tokens, motion rules and the tech stack. This file wins on structure and copy.

> **`TODO` markers are mine to fill.** Don't invent values for them, don't write around them, leave them visible in the code as comments.

---

## Page order

```
0.  Preloader          (first visit only)
1.  Hero
2.  Projects           (4, sticky-scroll)
3.  Experience         (3 entries)
4.  Hackathons         (2 wins)
5.  Community          (HackathonHub ambassador)
6.  Skills             (5 named groups)
7.  Out of Scope       (horizontal photo scroll)
8.  Contact            (inverted band + colophon)
```

**Every section opens the same way**, per `CONTEXT.md` section 9: a small uppercase mono label, then a large centred `--t-display` header, then left-aligned content beneath. The section labels and headers:

| Section | Label | Header |
|---|---|---|
| Projects | `WORK` | Selected work |
| Experience | `EXPERIENCE` | Where I've worked |
| Hackathons | `AWARDS` | Hackathons |
| Community | `COMMUNITY` | Building the room |
| Skills | `TOOLKIT` | What I work with |
| Out of Scope | `PERSONAL` | Out of scope |
| Contact | `CONTACT` | Let's talk |

This repetition is the point. The same opening shape on every section is what makes a long page navigable — a reader always knows where a section starts and what it is. Do not vary it for visual interest.

Background alternation, per `CONTEXT.md` section 9:

| Section | Background |
|---|---|
| Hero | `--bg` |
| Projects | `--surface` |
| Experience | `--bg` |
| Hackathons | `--surface` |
| Community | `--bg` |
| Skills | `--surface` |
| Out of Scope | `--bg` |
| Contact | `--surface-inverse` (full bleed, once) |

---

## 1. Hero

**Structure:** eyebrow → headline → subline → two links → scroll indicator.

**Eyebrow** — `--t-label`, uppercase, `--muted`:
```
DARMSTADT, DE — CS @ TU DARMSTADT
```

**Headline** — `--t-hero`, three lines, each in its own `overflow: hidden` wrapper for the line-reveal animation:

```
Ghassen Zaara
A man who doesn't sleep until he solves the problem in question
```

**Subline** — `--t-lead`, `--muted`, max 480px wide:

```
Computer science student at TU Darmstadt. I like problems where the
constraint is real. I love participating in Hackathons and I'm interested 
in every field Computer Science has to offer. Focused on Software Engineering
trying to improve my ML and Cybersecurity Skills. 

```

**Links** — `text-link`, mono labels, side by side:
```
SELECTED WORK ↓        GET IN TOUCH ↗
```

**Scroll indicator** — bottom of the viewport, `--t-label`, `--muted`, with a 1px vertical line beneath it that loops a slow downward wipe:
```
(SCROLL)
```

>

---

## 2. My Projects


### Layout and scroll behaviour

Two columns on desktop, stacked on mobile.

- **Left column (45%):** the text for each project, in normal document flow. Four blocks stacked vertically, each roughly 80vh tall.
- **Right column (55%):** `position: sticky; top: 20vh`. Contains all four image sets, absolutely positioned on top of each other. Only one is visible at a time.

As the user scrolls, each text block passing the viewport midpoint activates its matching image set. The previous set animates out, the new one animates in.

**Text transition:** the outgoing block fades to `opacity: 0.15` and stays in flow (it doesn't disappear — it recedes). The incoming block goes from `opacity: 0.15` to `1`. 400ms. This gives the "text fades and changes" effect without content jumping.

**Image transition:** the outgoing set translates `-8%` on X and fades out; the incoming set enters from `+8%` and fades in. 600ms, standard easing. Do not cross-fade in place — the lateral movement is what makes it read as a deliberate swap rather than a glitch.

**Within one project's image set:** a small carousel. 2–3 images per project, navigated by dots below the frame in `--t-number` (`01 02 03`), plus swipe on touch. Slides move horizontally, 400ms. Autoplay is off — the user drives it.

**Mobile (<834px):** the sticky column collapses. Each project becomes a normal stacked block: text, then its carousel directly below. No sticky, no cross-fade — the effect doesn't survive a narrow viewport and forcing it produces jank.

**Implementation:** one shared `IntersectionObserver` for the four text blocks. No scroll event listener, no library.

---

### 01 / 05 — BrückenPilot
*Interview project · 2026*

**Hook:** German bridge inspection PDFs, turned into decisions.

**Body:**
```
Every German bridge inspection produces a 30-page PDF under DIN 1076. The
data exists; nobody turns it into decisions.

BrückenPilot reads the PDF and returns a map. Condition scores, ranked
damage with the inspector's own photos, and the inspection trend projected
forward. Extraction runs against Pydantic schemas at temperature 0.
```

**Tags:** `FastAPI` `React 19` `TypeScript` `Supabase` `Gemini 2.0 Flash` `MapLibre GL` `PyMuPDF`

**Link:** `TODO — repo or live URL`

**Images:** `TODO — no images exist for this project yet.` Needed: the map view with the sidebar open (strongest), the damage cards view, the inspection history chart. Take three screenshots at 1600px wide.

---

### 02 / 05 — ARIVA
*Black Forest Hackathon · 2026 · team project*

**Hook:** On-premise document processing for public administration.

**Body:**
```
Legal aid documents for Regierungspräsidium Freiburg, against a real
requirements spec. No data could leave the premises under DSGVO, which
ruled out every commercial API.

So the whole pipeline runs local. A vision-language model reads scanned
PDFs and fills the legacy case forms. Pitched afterwards to
Regierungspräsidium Offenburg as paid work.
```

**Tags:** `Qwen3-VL` `Ollama` `FastAPI` `Spring Boot` `React 19` `OpenCV` `PostgreSQL`

**Link:** `TODO`

**Images:** `presenting-ariva-2` (the audience view), plus `TODO — one screenshot or architecture diagram of the pipeline`. Two minimum.

---

### 03 / 05 — VC AI Copilot
*TUM.ai × Yellow Hackathon · 2026*

**Hook:** One question, answered across four disconnected systems.

**Body:**
```
A VC firm's knowledge sits in four places at once — CRM, meeting notes,
Slack, email — and no system can answer what the current state of a
company is, or what's missing.

Affinity, Granola, Slack and Gmail collapse into one company object with
source attribution and explicit gap detection. Every LLM call runs inside
Supabase Edge Functions. No backend service.
```

**Tags:** `Supabase` `pgvector` `Edge Functions` `RAG` `Affinity API` `Gmail API`

**Link:** `TODO`

**Images:** `TODO — no conventional screenshot exists.` Best option is an architecture diagram as SVG showing the four sources collapsing into the unified company object. Second option: the market map view.

---

### 04 / 05 — Viegtor
*Futury Build Days · 2026 · 1st place*

**Hook:** Strategic AI for patent and regulatory analysis.

**Body:**
```
Patents, regulations, tenders and competitor moves arrive as separate
streams and get read by separate people. Viegtor distils all of it into
one decision: build, invest, or ignore.

TODO — two or three sentences on what you actually built. Where did the
data come from, and what did the analysis do? Keep it to the same length
as the others.
```

05 / 05 — San Fo 薪火

EuroTech × HKTE Hackathon, Munich · 2026 · team project

Hook: Crowdfunding the Hong Kong shops that are quietly disappearing.

Body:

Hong Kong loses another family business every week — an ageing owner, no
successor, shutters down for good. Banks won't lend without collateral and
there is no legal route to raise equity from the public.

San Fo lets a neighbourhood fund the shop it doesn't want to lose:
revenue-share agreements for individuals, tokenized SPVs for professional
investors. KYC and KYB on both ends of every deal.

Tags: Swift Rust JavaScript Tokenized SPV KYC / KYB

Links: san-fo.com · github.com/San-Fo

Images: sanfo-hackathon-desk plus TODO — two screenshots of the app flow (the shop discovery grid and the revenue-share confirmation screen). The landing page already has clean device mockups of both; screenshot those rather than rebuilding anything.

**Tags:** `TODO — fill in`

**Link:** `TODO`

**Images:** `viegtor-slide` **uncropped** — the full frame with the team, the projected product and the crutches. Plus `futury-viega-1st-place`. Two images, this order.

**Note:** since `viegtor-slide` is kept whole as a story photo, this project still has no product visual. A screenshot or diagram would be a third image.

---

## 3. Experience

Three entries, each a separate block with its own photo. Not a timeline, not a list — three blocks with the same internal structure, separated by hairlines.

**Block structure:** photo on one side, text on the other, alternating sides down the section.

### Tutor — Rechnerorganisation
*TU Darmstadt, Fachbereich Informatik · Summer semester 2026*

**Photo:** `ro-tutor`
**Caption:** `Cache addressing, Übung 12`

```

Weekly exercise sessions with 20+ students in my fourth language on RISC-V assembly and calling conventions,
single-cycle and multicycle datapaths, ALU control decoding, pipeline
hazards and flush penalties, cache addressing. I wrote the slide decks,
ran the Testat scheduling and answered the course forum.
```

### Tutor — Algorithmen und Datenstrukturen
*TU Darmstadt, Fachbereich Informatik · Summer semester 2026*

**Photo:** `aud-blackboard`
**Caption:** `NP-completeness, reduction proofs`

```Teaching 30+ students in my fourth language, marking 20+ assignments a
week, and writing new coding exercises to push them past surface-level
understanding.
Sorting and divide-and-conquer, radix sort, abstract data types, binary
search trees, AVL and red-black trees, complexity and reductions. I
redesigned one practical assignment on tree operations — black-height
computation, join, AVL conversion, sorted merge — into a single unified
12-point exercise.
```

**One line, placed between or beneath the two blocks, in `--t-body-strong`:**
```
Both modules ran in the same semester.
```
That is the fact worth stating. Two courses at once is the part that carries weight.

**Note on the photo:** `aud-blackboard` has no person in it, which makes it weaker than `ro-tutor`. It's acceptable here because the two blocks sit side by side and the pairing reads as "the two boards". If it looks flat in build, crop tighter on the reduction proof.

### Research Assistant — Fraunhofer SIT / ATHENE
*Starting October 2026*

**Photo:** none. Use a `--surface` block with a hairline border where the photo would sit, containing only:
```
COMING SOON
```
in `--t-label`, `--accent`, centred. The empty frame in the photo's position is the design — don't substitute a logo or stock image.

```
Studentische Hilfskraft in NLP research: authorship analysis, attribution
and verification, style change detection, AI-generated text detection and
LLM attribution. Classical feature engineering alongside embeddings,
one-class and binary classification, ensemble methods.
```

---

## 4. Hackathons

**Important:** this section must not re-describe the products. Viegtor and Agnes are covered elsewhere or not at all — here the subject is the *result and the room*, not the build. Two entries, photo-led, short copy.

Layout: two blocks side by side on desktop, stacked on mobile. Each is a photo with a caption block beneath.

### 1st place — Futury Build Days, Viega Challenge
*Frankfurt · 2026*

**Photo:** `viegtor-slide`

```
Won the Viega challenge with Viegtor. Presented on crutches — broken ankle
a week earlier.
```

Two sentences. The photo carries the rest.

### 2nd place — TUM.ai Makeathon, Spherecast Challenge
*Munich · 2026 · 40+ teams, 500+ participants*

**Photo:** `tumai-agnes-presenting`
**Caption:** `Pitching Agnes to the jury`

```
Second place on the Spherecast challenge with Agnes — semantic supplier
matching with a RAG pipeline and Pareto-front estimation across competing
sourcing criteria. My first hackathon.
```

"My first hackathon" earns its place — second of forty-plus on a first attempt is the point.

---

## 5. Community

Single block, photo and text side by side.

### Ambassador — HackathonHub Europe
*Frankfurt*

**Photo:** `TODO — no image yet.` Until it exists, use the same empty-frame treatment as the Fraunhofer block.

```
Regional ambassador for Frankfurt. HackathonHub connects student builders
across Europe to hackathons and the teams running them.

TODO — two or three sentences on what you actually do in the role. Running
meetups? Recruiting teams? Point of contact for organisers? Right now this
reads as a title with nothing behind it.
```

`TODO — confirm scope: Frankfurt only, or Frankfurt and Darmstadt? And the start date.`

---

## 6. Skills

**This section must be the clearest on the page. Read this whole block before building it.**

The failure mode is a tag cloud — thirty pills in a grey blob that nobody reads and that tells a recruiter nothing. That is what most generated portfolios produce and it is explicitly rejected here.

### The rule

**Five named groups. Each group has a loud title. The title is not optional and it is not small.**

Group titles are `--t-subtitle` (22px, Switzer 500, `--fg`) — the same size as a sub-heading anywhere else on the site, **not** the size of a label. A recruiter scanning at speed should be able to read only the five titles and know what you do.

Above each title sits its number in `--t-number` (`--accent`): `01` through `05`. The numbering ties this section to the projects section and gives the eye a rail to follow.

### Layout

Desktop: a 5-column grid, one group per column, separated by 1px `--border` vertical hairlines. Each column is a stack — number, title, then the items.

Tablet (834–1023px): 3 columns, wrapping to a second row.
Mobile (<834px): single column, each group separated by a horizontal hairline with 32px of space above and below. **Not an accordion.** Everything is visible at once.

Items within a group: `--t-body` (17px, `--muted`), one per line, stacked vertically with 8px between them. **Not pills, not tags, not badges.** A plain vertical list is more legible and more honest than a wall of rounded rectangles.

No icons. No logos. No proficiency bars, no star ratings, no percentages, no "5 years" annotations.

### The content

```
01   LANGUAGES
     Python
     TypeScript
     Java
     SQL
     Rust
     Swift

02   AI & MACHINE LEARNING
     JAX / Flax / Optax
     RAG pipelines
     Embeddings & vector search
     Local LLM serving (Ollama)
     Structured LLM output
     Vision-language models
     OpenCV

03   BACKEND
     FastAPI
     Spring Boot
     REST API design
     Async pipelines
     Pydantic

04   DATA & INFRASTRUCTURE
     PostgreSQL
     Supabase
     pgvector
     FalkorDB
     Docker
     Git

05   FRONTEND
     React
     Vite
     HTML / CSS
     MapLibre GL
```

**Order matters.** Languages first because it's the fastest signal. AI second because it's the thesis of the site. Frontend last because it's genuinely your weakest of the five, and putting it last is more honest than padding it.

**Ordering within a group is by strength, not alphabet.** Python before Swift. Don't let the build sort these.

**Group count is fixed at five.** If something doesn't fit one of the five, it doesn't go on the site.

---

## 7. Out of Scope

The personal section. Named "Out of Scope" — a small joke that lands for the technical audience and doesn't need explaining.

**Intro** — two or three lines, `--t-lead`, left-aligned, max 560px:

```
TODO — write these yourself. Do not generate them.

Raw material: coffee, seriously enough to own the grinder and the scale.
The sea, which is where I'm from. Trees and hiking. Photography, mostly
architecture and coastlines, rarely people. Travel.

Three or four sentences, first person, dry. This is the most personal
writing on the site and it will read as generated if it is.
```

### Horizontal photo scroll

Below the intro, a full-bleed horizontal strip.

**Implementation — native scroll, not JS:**
```css
.gallery {
  display: flex;
  gap: var(--space-6);
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-padding-left: var(--space-6);
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.gallery::-webkit-scrollbar { display: none; }
.gallery > figure { flex: 0 0 auto; scroll-snap-align: start; }
```

Rationale: native horizontal scroll works with trackpads, shift+wheel, touch swipe and keyboard for free. A JS-driven version that hijacks vertical scroll and translates the strip breaks all four and is the single most common cause of "this site feels broken on my laptop".

**Mixed widths.** Don't uniform-size the frames — let portrait images be narrow and landscape images wide, all at a fixed height (roughly 60vh desktop, 40vh mobile). The varied rhythm is what makes it read as a considered gallery rather than a carousel widget.

**Order** (portrait/landscape alternation is deliberate):

| # | Image | Caption |
|---|---|---|
| 1 | `archway-sea` | `Sidi Bou Said` |
| 2 | `coffee-setup` | `The daily ritual` |
| 3 | `street-trees` | `Somewhere with better trees` |
| 4 | `cagliari-street` | `Cagliari` |
| 5 | `beach-cave` | `Sardinia` |
| 6 | `aschaffenburg-towers` | `Aschaffenburg` |
| 7 | `headland-dusk` | `Dusk` |
| 8 | `boat-sea` | `Off the coast` |
| 9 | `brutalist-facade` | `Concrete, catching light` |
| 10 | `street-cap` | `Sardinia, evening` |

Captions in `--t-label`, `--muted`, beneath each frame. Keep them short and dry — no exclamation marks, no wistfulness.

**A hint that it scrolls.** Let the tenth image be visibly cut off at the right edge of the viewport at rest. Nobody scrolls a strip that looks complete. Optionally add `SCROLL →` in `--t-label` at the far left.

**Images animate on entry** using the standard reveal from `CONTEXT.md` — but only on first paint, not every time one scrolls into the horizontal viewport. Re-triggering on horizontal scroll is nauseating.

---

## 8. Contact

Full-bleed `--surface-inverse` band. Every accented element inside uses `--accent-light` — `--accent` is unreadable here.

**Heading** — `--t-display`, `--bg`:
```
Let's talk.
```

**Line beneath** — `--t-body`, `--bg` at 80%:
```
Open to working student roles, thesis collaborations, and hackathon teams.
```
`TODO — confirm this is what you actually want to receive.`

**Links** — `--accent-light`, `--t-body`:
```
zaaraghassen@gmail.com
GITHUB ↗    LINKEDIN ↗
```

**Colophon** — bottom of the band, `--t-fine`, `--accent-light` at reduced opacity, four lines with a small swatch square before each:
```
Baltic Blue    the sea
Dark Coffee    I'm a coffee nerd
Olive Leaf     trees
Pitch Black    the default
```

No heading above it, no explanation. Four pairings and stop.

**Footer line:**
```
© 2026 Ghassen Zaara — built in Darmstadt
```

---

## 9. Preloader

First visit only. Set a `sessionStorage` flag and skip it entirely on subsequent navigations — a loader a returning visitor sits through twice is a tax, not an effect.

**Design:**
- Full-viewport panel, `--surface-inverse` (Dark Coffee).
- Counter bottom-right, `--t-hero` size in Geist Mono, `--accent-light`, **zero-padded to three digits**: `000 → 100`. The three-digit padding ties it to the `01 / 04` project numbering — that's the personalization, and it's why it isn't a generic loader.
- Wordmark top-left, `--t-title`, `--bg`: `Ghassen Zaara®`
- A 1px hairline across the bottom in `--accent-light` at 30%, with a fill that tracks the counter.
- The panel lifts upward. The hero underneath is already rendered and scaled to 1.04, easing to 1 as the panel clears.

**Timing — total 1.6s, not 2.5s.** The pasted GSAP version runs 1.6s of counting plus 0.9s of lift before the hero even starts. That's a long time to look at a number. 1.1s counting, 0.5s lift, hero settling underneath during the lift.

**Accessibility:** skip the whole thing under `prefers-reduced-motion: reduce`. Remove the panel immediately and restore scroll.

### `src/preloader.ts`

```ts
const DURATION = 1100;   // counter run, ms
const LIFT = 500;        // panel lift, ms
const HOLD = 120;        // pause at 100 before lifting, ms

export function initPreloader(onComplete: () => void): void {
  const panel = document.getElementById('preloader');
  const count = document.getElementById('preloader-count');
  const bar = document.getElementById('preloader-bar');

  const finish = () => {
    panel?.remove();
    document.body.style.overflow = '';
    onComplete();
  };

  // Bail out cleanly if the markup is missing, the loader has already run
  // this session, or the visitor has asked for reduced motion.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem('gz-preloaded') === '1';

  if (!panel || !count || !bar || reduced || seen) {
    finish();
    return;
  }

  sessionStorage.setItem('gz-preloaded', '1');
  document.body.style.overflow = 'hidden';

  const easeInOut = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const start = performance.now();

  const tick = (now: number): void => {
    const t = Math.min((now - start) / DURATION, 1);
    const eased = easeInOut(t);
    const value = Math.round(eased * 100);

    count.textContent = String(value).padStart(3, '0');
    bar.style.transform = `scaleX(${eased})`;

    if (t < 1) {
      requestAnimationFrame(tick);
      return;
    }

    window.setTimeout(() => {
      panel.style.transform = 'translateY(-100%)';
      document.documentElement.classList.add('is-revealing');
      window.setTimeout(finish, LIFT);
    }, HOLD);
  };

  requestAnimationFrame(tick);
}
```

### Matching CSS

```css
#preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--surface-inverse);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-8);
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

#preloader-count {
  align-self: flex-end;
  font-family: 'Geist Mono', monospace;
  font-size: clamp(48px, 12vw, 96px);
  color: var(--accent-light);
  font-variant-numeric: tabular-nums; /* stops the digits jittering */
  line-height: 1;
}

#preloader-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
  background: var(--accent-light);
  transform: scaleX(0);
  transform-origin: left;
}

.hero { transform: scale(1.04); transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1); }
.is-revealing .hero { transform: scale(1); }

@media (prefers-reduced-motion: reduce) {
  #preloader { display: none; }
  .hero { transform: none; transition: none; }
}
```

`font-variant-numeric: tabular-nums` is the detail that matters most — without it the counter's width shifts on every digit change and the whole thing looks amateur.

### Markup

```html
<div id="preloader">
  <span class="preloader__mark">Ghassen Zaara®</span>
  <span id="preloader-count">000</span>
  <span id="preloader-bar"></span>
</div>
```

The hero must be fully rendered in the HTML behind the panel from the start — the preloader covers content that already exists, it doesn't gate it. If JavaScript fails, `#preloader` is a static coffee-coloured div sitting over the page, so give it `display: none` by default in CSS and have the script set it visible. That way a JS failure means no loader rather than a permanently blocked page.

---

## 10. Open TODOs

**Blocking — the site can't ship without these:**
1. Viegtor description and tech stack (currently a placeholder)
2. Project links — all four
3. Images for BrückenPilot (3 screenshots) and VC AI Copilot (1 diagram)
4. A second image for ARIVA
5. The "Out of Scope" intro paragraph, in your own words
6. HackathonHub role description, scope and start date
7. CV PDF

**Non-blocking:**
8. Language levels, if they go on the site
9. `hiking-sea.mov` conversion, or drop it
10. Whether the contact line is the right ask
