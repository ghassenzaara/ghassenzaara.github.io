# Graph Report - ghassenzaara.github.io  (2026-08-21)

## Corpus Check
- 46 files · ~200,840 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 419 nodes · 571 edges · 56 communities (45 shown, 11 thin omitted)
- Extraction: 93% EXTRACTED · 6% INFERRED · 1% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b90091d8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- CV — Ghassen Zaara (English)
- OutOfScope.tsx
- lint:design Grep Gate
- experience.ts
- scripts
- compilerOptions
- devDependencies
- First-Visit Preloader
- lint-design.mjs
- lint-content.mjs
- prepare-images.mjs
- build-polysans.mjs
- gen-font-fallbacks.mjs
- Contact Band (inverted, full bleed, once)
- manifest.json
- Empty-Frame Treatment for Missing Photos
- aud-blackboard
- bp-1
- bp-2
- bp-3
- gal-01
- gal-02
- gal-03
- gal-04
- gal-05
- gal-06
- gal-07
- gal-08
- gal-09
- gal-10
- header-bg
- ro-tutor
- sanfo-app
- sanfo-desk
- tumai-presenting
- viegtor-slide
- viegtor-team
- Button.tsx
- Hero Section Copy
- Out of Scope (personal section)
- ARIVA (copy)
- Custom Cursor (dot + lagged ring)
- Fixed Stack (Vite + React 19 + TS)
- vite-env.d.ts
- No Tailwind, No Component Library
- Skip-to-Main-Content Link
- WCAG 2.2 Target Size on 12px Mono Nav Links
- Page Order (Preloader → Contact)
- ariva-2
- ariva-3
- sanfo-trust
- viegtor-app-1
- viegtor-app-2
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 19 edges
2. `scripts` - 10 edges
3. `MQ` - 10 edges
4. `fallbackSrc()` - 9 edges
5. `DUR` - 9 edges
6. `Figure()` - 7 edges
7. `Reveal()` - 7 edges
8. `SectionHeading()` - 7 edges
9. `CV — Ghassen Zaara (English)` - 7 edges
10. `lint:design Grep Gate` - 7 edges

## Surprising Connections (you probably didn't know these)
- `CV — Ghassen Zaara (English)` --conceptually_related_to--> `Ghassen Zaara — Profile and Contact`  [INFERRED]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md
- `CV — Ghassen Zaara (English)` --references--> `BrückenPilot (spec)`  [EXTRACTED]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md
- `FalkorDB-Haystack Open-Source Contribution` --conceptually_related_to--> `Four Projects Rule`  [AMBIGUOUS]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md
- `CV — Ghassen Zaara (English)` --references--> `Tutor — Rechnerorganisation`  [EXTRACTED]
  public/cv-ghassen-zaara-en.pdf → CONTENT.md
- `CV — Ghassen Zaara (English)` --references--> `VC AI Copilot (spec)`  [EXTRACTED]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Design Rules Enforced by lint:design** — context_design_tokens, context_type_scale, context_weight_ladder, context_single_shadow_rule, context_radius_grammar, context_motion_rules, implementation_plan_lint_design [EXTRACTED 1.00]
- **Three Motion Primitives and Their Guards** — implementation_plan_usereveal, implementation_plan_cursor, implementation_plan_marquee, implementation_plan_active_nav_state, implementation_plan_no_compounding_gestures, context_reduced_motion [EXTRACTED 1.00]
- **GitHub Pages Deploy Pipeline** — github_workflows_deploy_pipeline, github_workflows_deploy_build_job, github_workflows_deploy_deploy_job, github_workflows_deploy_pages_source_requirement, implementation_plan_phase1_scaffold_deploy, context_vite_react_ssg [EXTRACTED 1.00]

## Communities (56 total, 11 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.09
Nodes (30): App(), Cursor(), LINKS, Nav(), FROM, RevealProps, RevealVariant, TechTags() (+22 more)

### Community 1 - "CV — Ghassen Zaara (English)"
Cohesion: 0.12
Nodes (19): Tutor — Algorithmen und Datenstrukturen, Tutor — Rechnerorganisation, Hackathons Section (result and the room, not the build), Open TODOs (blocking and non-blocking), VC AI Copilot (copy), Viegtor (copy), Two Modules Taught in One Semester, Open Questions (blog, domain, language) (+11 more)

### Community 2 - "OutOfScope.tsx"
Cohesion: 0.10
Nodes (30): Figure(), FigureProps, ProjectCarousel(), slideKey(), SlideView(), Album, albums, gallery (+22 more)

### Community 3 - "lint:design Grep Gate"
Cohesion: 0.09
Nodes (23): Native Horizontal Photo Scroll, Where GSAP Stops (Native Scroll for the Gallery), Image Reveal (clip-path wipe + scale settle), One Easing Curve, Three Durations, Transform/Opacity Only, Four-Value Radius Grammar (--r-pill Means Clickable), Exactly One Shadow, and It Belongs to Imagery, vite-react-ssg Prerendering, 400 / 500 Weight Ladder (+15 more)

### Community 4 - "experience.ts"
Cohesion: 0.18
Nodes (14): EmptyFrame(), Reveal(), SectionHeading(), Todo(), Award, community, experience, experienceNote (+6 more)

### Community 5 - "scripts"
Cohesion: 0.08
Nodes (25): gsap, @gsap/react, dependencies, gsap, @gsap/react, react, react-dom, react-router-dom (+17 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (25): DOM, DOM.Iterable, ES2022, src, vite/client, compilerOptions, allowImportingTsExtensions, isolatedModules (+17 more)

### Community 7 - "devDependencies"
Cohesion: 0.08
Nodes (25): @capsizecss/metrics, @capsizecss/unpack, @fontsource-variable/geist, @fontsource-variable/geist-mono, devDependencies, @capsizecss/metrics, @capsizecss/unpack, @fontsource-variable/geist (+17 more)

### Community 8 - "First-Visit Preloader"
Cohesion: 0.16
Nodes (14): initPreloader (src/preloader.ts), First-Visit Preloader, font-variant-numeric: tabular-nums Counter Fix, Image Asset Placement Table, Lighthouse 100 Performance and Accessibility, prefers-reduced-motion and No-JS Progressive Enhancement, scripts/gen-font-fallbacks.mjs, B3 — hiking-sea.mov (+6 more)

### Community 9 - "lint-design.mjs"
Cohesion: 0.18
Nodes (8): ALLOWED_DURATIONS, ALLOWED_RADII, ALLOWED_WEIGHTS, failures, GENERATED, root, RULES, SRC

### Community 10 - "lint-content.mjs"
Cohesion: 0.22
Nodes (5): BANNED, CONTENT, root, todos, voice

### Community 11 - "prepare-images.mjs"
Cohesion: 0.29
Nodes (6): GALLERY, manifest, OUT, root, SLOTS, SRC

### Community 12 - "build-polysans.mjs"
Cohesion: 0.33
Nodes (4): OUT, root, SRC, WEIGHTS

### Community 13 - "gen-font-fallbacks.mjs"
Cohesion: 0.40
Nodes (3): FALLBACKS, FAMILIES, root

### Community 14 - "Contact Band (inverted, full bleed, once)"
Cohesion: 0.67
Nodes (4): Contact Band (inverted, full bleed, once), --accent-light on --surface-inverse, Palette Colophon (four dry pairings), Scoped --accent Override Inside .contact-band

### Community 15 - "manifest.json"
Cohesion: 0.29
Nodes (6): ariva-1, height, width, ariva-presenting, height, width

### Community 16 - "Empty-Frame Treatment for Missing Photos"
Cohesion: 0.67
Nodes (3): HackathonHub Europe Ambassador, Empty-Frame Treatment for Missing Photos, Research Assistant — Fraunhofer SIT / ATHENE

### Community 17 - "aud-blackboard"
Cohesion: 0.67
Nodes (3): aud-blackboard, height, width

### Community 18 - "bp-1"
Cohesion: 0.67
Nodes (3): bp-1, height, width

### Community 19 - "bp-2"
Cohesion: 0.67
Nodes (3): bp-2, height, width

### Community 20 - "bp-3"
Cohesion: 0.67
Nodes (3): bp-3, height, width

### Community 21 - "gal-01"
Cohesion: 0.67
Nodes (3): gal-01, height, width

### Community 22 - "gal-02"
Cohesion: 0.67
Nodes (3): gal-02, height, width

### Community 23 - "gal-03"
Cohesion: 0.67
Nodes (3): gal-03, height, width

### Community 24 - "gal-04"
Cohesion: 0.67
Nodes (3): gal-04, height, width

### Community 25 - "gal-05"
Cohesion: 0.67
Nodes (3): gal-05, height, width

### Community 26 - "gal-06"
Cohesion: 0.67
Nodes (3): gal-06, height, width

### Community 27 - "gal-07"
Cohesion: 0.67
Nodes (3): gal-07, height, width

### Community 28 - "gal-08"
Cohesion: 0.67
Nodes (3): gal-08, height, width

### Community 29 - "gal-09"
Cohesion: 0.67
Nodes (3): gal-09, height, width

### Community 30 - "gal-10"
Cohesion: 0.67
Nodes (3): gal-10, height, width

### Community 31 - "header-bg"
Cohesion: 0.67
Nodes (3): header-bg, height, width

### Community 32 - "ro-tutor"
Cohesion: 0.67
Nodes (3): ro-tutor, height, width

### Community 33 - "sanfo-app"
Cohesion: 0.67
Nodes (3): sanfo-app, height, width

### Community 34 - "sanfo-desk"
Cohesion: 0.67
Nodes (3): sanfo-desk, height, width

### Community 35 - "tumai-presenting"
Cohesion: 0.67
Nodes (3): tumai-presenting, height, width

### Community 36 - "viegtor-slide"
Cohesion: 0.67
Nodes (3): viegtor-slide, height, width

### Community 37 - "viegtor-team"
Cohesion: 0.67
Nodes (3): viegtor-team, height, width

### Community 49 - "Page Order (Preloader → Contact)"
Cohesion: 0.07
Nodes (28): Page Order (Preloader → Contact), BrückenPilot (copy), San Fo 薪火 (fifth project), Sticky-Scroll Projects Layout, Uniform Section Opening (label → display header → left content), Five Named Skill Groups (anti-tag-cloud rule), Ten-Token Colour Palette, Positioning: Builder Who Ships Under Constraint (+20 more)

### Community 50 - "ariva-2"
Cohesion: 0.67
Nodes (3): ariva-2, height, width

### Community 51 - "ariva-3"
Cohesion: 0.67
Nodes (3): ariva-3, height, width

### Community 52 - "sanfo-trust"
Cohesion: 0.67
Nodes (3): sanfo-trust, height, width

### Community 53 - "viegtor-app-1"
Cohesion: 0.67
Nodes (3): viegtor-app-1, height, width

### Community 54 - "viegtor-app-2"
Cohesion: 0.67
Nodes (3): viegtor-app-2, height, width

## Ambiguous Edges - Review These
- `San Fo 薪火 (fifth project)` → `Four Projects Rule`  [AMBIGUOUS]
  CONTENT.md · relation: conceptually_related_to
- `Sticky-Scroll Projects Layout` → `Dense Editorial Grid`  [AMBIGUOUS]
  CONTENT.md · relation: conceptually_related_to
- `FalkorDB-Haystack Open-Source Contribution` → `Four Projects Rule`  [AMBIGUOUS]
  public/cv-ghassen-zaara-en.pdf · relation: conceptually_related_to
- `Phase 5 — The Motion Layer` → `Where GSAP Stops (Native Scroll for the Gallery)`  [AMBIGUOUS]
  IMPLEMENTATION_PLAN.md · relation: conceptually_related_to
- `Twelve --t-* Type Tokens (Space Grotesk / Inter / JetBrains Mono)` → `PolySans Drop-In Font Swap`  [AMBIGUOUS]
  fonts-src/README.md · relation: conceptually_related_to

## Knowledge Gaps
- **181 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+176 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `San Fo 薪火 (fifth project)` and `Four Projects Rule`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Sticky-Scroll Projects Layout` and `Dense Editorial Grid`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `FalkorDB-Haystack Open-Source Contribution` and `Four Projects Rule`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Phase 5 — The Motion Layer` and `Where GSAP Stops (Native Scroll for the Gallery)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Twelve --t-* Type Tokens (Space Grotesk / Inter / JetBrains Mono)` and `PolySans Drop-In Font Swap`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `lint:design Grep Gate` connect `lint:design Grep Gate` to `CV — Ghassen Zaara (English)`, `Page Order (Preloader → Contact)`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `Ten-Token Colour Palette` connect `Page Order (Preloader → Contact)` to `lint:design Grep Gate`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._