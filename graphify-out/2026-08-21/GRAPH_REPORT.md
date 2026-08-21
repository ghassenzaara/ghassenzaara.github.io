# Graph Report - ghassenzaara.github.io  (2026-08-21)

## Corpus Check
- 75 files · ~188,177 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 399 nodes · 552 edges · 49 communities (39 shown, 10 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 1% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.88)
- Token cost: 115,171 input · 0 output

## Community Hubs (Navigation)
- React App Shell and Nav
- Portfolio Content Copy
- Gallery and Figure Components
- Design Spec and Motion Rules
- Carousel and UI Atoms
- Runtime Dependencies
- TypeScript Compiler Config
- Build Toolchain Dev Dependencies
- Typography and Preloader Performance
- Design Lint Script
- Content Lint Script
- Image Prepare Script
- PolySans Font Build Script
- Font Fallback Generator
- Contact Band Accent Inversion
- Image Manifest: Ariva Presenting
- Community and Fraunhofer Content
- Image Manifest: AUD Blackboard
- Image Manifest: BP 1
- Image Manifest: BP 2
- Image Manifest: BP 3
- Image Manifest: Gallery 01
- Image Manifest: Gallery 02
- Image Manifest: Gallery 03
- Image Manifest: Gallery 04
- Image Manifest: Gallery 05
- Image Manifest: Gallery 06
- Image Manifest: Gallery 07
- Image Manifest: Gallery 08
- Image Manifest: Gallery 09
- Image Manifest: Gallery 10
- Image Manifest: Header Background
- Image Manifest: RO Tutor
- Image Manifest: San Fo App
- Image Manifest: San Fo Desk
- Image Manifest: TUM AI Presenting
- Image Manifest: Viegtor Slide
- Image Manifest: Viegtor Team
- Button Component
- Hero Text Wrap Conflict
- Out of Scope Content
- Ariva Project
- Custom Cursor
- Stack Decision and Gates
- Vite Env Types
- No Tailwind Decision
- Skip Link Accessibility
- Target Size Accessibility

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 19 edges
2. `scripts` - 10 edges
3. `MQ` - 10 edges
4. `fallbackSrc()` - 9 edges
5. `DUR` - 9 edges
6. `Figure()` - 7 edges
7. `Reveal()` - 7 edges
8. `SectionHeading()` - 7 edges
9. `lint:design Grep Gate` - 7 edges
10. `CV — Ghassen Zaara (English)` - 7 edges

## Surprising Connections (you probably didn't know these)
- `CV — Ghassen Zaara (English)` --conceptually_related_to--> `Ghassen Zaara — Profile and Contact`  [INFERRED]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md
- `FalkorDB-Haystack Open-Source Contribution` --conceptually_related_to--> `Four Projects Rule`  [AMBIGUOUS]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md
- `CV — Ghassen Zaara (English)` --references--> `BrückenPilot (spec)`  [EXTRACTED]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md
- `CV — Ghassen Zaara (English)` --references--> `VC AI Copilot (spec)`  [EXTRACTED]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md
- `CV — Ghassen Zaara (English)` --references--> `Viegtor (spec)`  [EXTRACTED]
  public/cv-ghassen-zaara-en.pdf → CONTEXT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **GitHub Pages Deploy Pipeline** — github_workflows_deploy_pipeline, github_workflows_deploy_build_job, github_workflows_deploy_deploy_job, github_workflows_deploy_pages_source_requirement, implementation_plan_phase1_scaffold_deploy, context_vite_react_ssg [EXTRACTED 1.00]
- **Design Rules Enforced by lint:design** — context_design_tokens, context_type_scale, context_weight_ladder, context_single_shadow_rule, context_radius_grammar, context_motion_rules, implementation_plan_lint_design [EXTRACTED 1.00]
- **Three Motion Primitives and Their Guards** — implementation_plan_usereveal, implementation_plan_cursor, implementation_plan_marquee, implementation_plan_active_nav_state, implementation_plan_no_compounding_gestures, context_reduced_motion [EXTRACTED 1.00]

## Communities (49 total, 10 thin omitted)

### Community 0 - "React App Shell and Nav"
Cohesion: 0.09
Nodes (29): App(), Cursor(), EmptyFrame(), LINKS, Nav(), FROM, Reveal(), RevealProps (+21 more)

### Community 1 - "Portfolio Content Copy"
Cohesion: 0.06
Nodes (36): Tutor — Algorithmen und Datenstrukturen, Tutor — Rechnerorganisation, Hackathons Section (result and the room, not the build), Open TODOs (blocking and non-blocking), BrückenPilot (copy), San Fo 薪火 (fifth project), VC AI Copilot (copy), Viegtor (copy) (+28 more)

### Community 2 - "Gallery and Figure Components"
Cohesion: 0.12
Nodes (27): Figure(), FigureProps, SlideView(), Album, albums, gallery, outOfScopeIntro, Photo (+19 more)

### Community 3 - "Design Spec and Motion Rules"
Cohesion: 0.07
Nodes (29): Native Horizontal Photo Scroll, Page Order (Preloader → Contact), Uniform Section Opening (label → display header → left content), Ten-Token Colour Palette, Where GSAP Stops (Native Scroll for the Gallery), Image Reveal (clip-path wipe + scale settle), One Easing Curve, Three Durations, Transform/Opacity Only, Four-Value Radius Grammar (--r-pill Means Clickable) (+21 more)

### Community 4 - "Carousel and UI Atoms"
Cohesion: 0.13
Nodes (18): ProjectCarousel(), slideKey(), TechTags(), TextLink(), TextLinkProps, Todo(), colophon, contact (+10 more)

### Community 5 - "Runtime Dependencies"
Cohesion: 0.08
Nodes (25): gsap, @gsap/react, dependencies, gsap, @gsap/react, react, react-dom, react-router-dom (+17 more)

### Community 6 - "TypeScript Compiler Config"
Cohesion: 0.08
Nodes (25): DOM, DOM.Iterable, ES2022, src, vite/client, compilerOptions, allowImportingTsExtensions, isolatedModules (+17 more)

### Community 7 - "Build Toolchain Dev Dependencies"
Cohesion: 0.08
Nodes (25): @capsizecss/metrics, @capsizecss/unpack, @fontsource-variable/geist, @fontsource-variable/geist-mono, devDependencies, @capsizecss/metrics, @capsizecss/unpack, @fontsource-variable/geist (+17 more)

### Community 8 - "Typography and Preloader Performance"
Cohesion: 0.12
Nodes (19): initPreloader (src/preloader.ts), First-Visit Preloader, font-variant-numeric: tabular-nums Counter Fix, Image Asset Placement Table, Lighthouse 100 Performance and Accessibility, prefers-reduced-motion and No-JS Progressive Enhancement, Self-Hosted Fonts (GDPR / No Google CDN), Twelve --t-* Type Tokens (Space Grotesk / Inter / JetBrains Mono) (+11 more)

### Community 9 - "Design Lint Script"
Cohesion: 0.18
Nodes (8): ALLOWED_DURATIONS, ALLOWED_RADII, ALLOWED_WEIGHTS, failures, GENERATED, root, RULES, SRC

### Community 10 - "Content Lint Script"
Cohesion: 0.22
Nodes (5): BANNED, CONTENT, root, todos, voice

### Community 11 - "Image Prepare Script"
Cohesion: 0.29
Nodes (6): GALLERY, manifest, OUT, root, SLOTS, SRC

### Community 12 - "PolySans Font Build Script"
Cohesion: 0.33
Nodes (4): OUT, root, SRC, WEIGHTS

### Community 13 - "Font Fallback Generator"
Cohesion: 0.40
Nodes (3): FALLBACKS, FAMILIES, root

### Community 14 - "Contact Band Accent Inversion"
Cohesion: 0.67
Nodes (4): Contact Band (inverted, full bleed, once), --accent-light on --surface-inverse, Palette Colophon (four dry pairings), Scoped --accent Override Inside .contact-band

### Community 15 - "Image Manifest: Ariva Presenting"
Cohesion: 0.50
Nodes (3): ariva-presenting, height, width

### Community 16 - "Community and Fraunhofer Content"
Cohesion: 0.67
Nodes (3): HackathonHub Europe Ambassador, Empty-Frame Treatment for Missing Photos, Research Assistant — Fraunhofer SIT / ATHENE

### Community 17 - "Image Manifest: AUD Blackboard"
Cohesion: 0.67
Nodes (3): aud-blackboard, height, width

### Community 18 - "Image Manifest: BP 1"
Cohesion: 0.67
Nodes (3): bp-1, height, width

### Community 19 - "Image Manifest: BP 2"
Cohesion: 0.67
Nodes (3): bp-2, height, width

### Community 20 - "Image Manifest: BP 3"
Cohesion: 0.67
Nodes (3): bp-3, height, width

### Community 21 - "Image Manifest: Gallery 01"
Cohesion: 0.67
Nodes (3): gal-01, height, width

### Community 22 - "Image Manifest: Gallery 02"
Cohesion: 0.67
Nodes (3): gal-02, height, width

### Community 23 - "Image Manifest: Gallery 03"
Cohesion: 0.67
Nodes (3): gal-03, height, width

### Community 24 - "Image Manifest: Gallery 04"
Cohesion: 0.67
Nodes (3): gal-04, height, width

### Community 25 - "Image Manifest: Gallery 05"
Cohesion: 0.67
Nodes (3): gal-05, height, width

### Community 26 - "Image Manifest: Gallery 06"
Cohesion: 0.67
Nodes (3): gal-06, height, width

### Community 27 - "Image Manifest: Gallery 07"
Cohesion: 0.67
Nodes (3): gal-07, height, width

### Community 28 - "Image Manifest: Gallery 08"
Cohesion: 0.67
Nodes (3): gal-08, height, width

### Community 29 - "Image Manifest: Gallery 09"
Cohesion: 0.67
Nodes (3): gal-09, height, width

### Community 30 - "Image Manifest: Gallery 10"
Cohesion: 0.67
Nodes (3): gal-10, height, width

### Community 31 - "Image Manifest: Header Background"
Cohesion: 0.67
Nodes (3): header-bg, height, width

### Community 32 - "Image Manifest: RO Tutor"
Cohesion: 0.67
Nodes (3): ro-tutor, height, width

### Community 33 - "Image Manifest: San Fo App"
Cohesion: 0.67
Nodes (3): sanfo-app, height, width

### Community 34 - "Image Manifest: San Fo Desk"
Cohesion: 0.67
Nodes (3): sanfo-desk, height, width

### Community 35 - "Image Manifest: TUM AI Presenting"
Cohesion: 0.67
Nodes (3): tumai-presenting, height, width

### Community 36 - "Image Manifest: Viegtor Slide"
Cohesion: 0.67
Nodes (3): viegtor-slide, height, width

### Community 37 - "Image Manifest: Viegtor Team"
Cohesion: 0.67
Nodes (3): viegtor-team, height, width

## Ambiguous Edges - Review These
- `Four Projects Rule` → `San Fo 薪火 (fifth project)`  [AMBIGUOUS]
  CONTENT.md · relation: conceptually_related_to
- `Four Projects Rule` → `FalkorDB-Haystack Open-Source Contribution`  [AMBIGUOUS]
  public/cv-ghassen-zaara-en.pdf · relation: conceptually_related_to
- `Twelve --t-* Type Tokens (Space Grotesk / Inter / JetBrains Mono)` → `PolySans Drop-In Font Swap`  [AMBIGUOUS]
  fonts-src/README.md · relation: conceptually_related_to
- `Where GSAP Stops (Native Scroll for the Gallery)` → `Phase 5 — The Motion Layer`  [AMBIGUOUS]
  IMPLEMENTATION_PLAN.md · relation: conceptually_related_to
- `Sticky-Scroll Projects Layout` → `Dense Editorial Grid`  [AMBIGUOUS]
  CONTENT.md · relation: conceptually_related_to

## Knowledge Gaps
- **168 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+163 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Four Projects Rule` and `San Fo 薪火 (fifth project)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Four Projects Rule` and `FalkorDB-Haystack Open-Source Contribution`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Twelve --t-* Type Tokens (Space Grotesk / Inter / JetBrains Mono)` and `PolySans Drop-In Font Swap`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Where GSAP Stops (Native Scroll for the Gallery)` and `Phase 5 — The Motion Layer`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Sticky-Scroll Projects Layout` and `Dense Editorial Grid`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `lint:design Grep Gate` connect `Design Spec and Motion Rules` to `Portfolio Content Copy`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Self-Hosted Fonts (GDPR / No Google CDN)` connect `Typography and Preloader Performance` to `Design Spec and Motion Rules`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._