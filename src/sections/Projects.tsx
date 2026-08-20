import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectCarousel } from '../components/ProjectCarousel'
import { TechTags } from '../components/TechTag'
import { TextLink } from '../components/TextLink'
import { Todo } from '../components/Todo'
import { projects } from '../content/projects'
import { isTodo } from '../content/types'
import { gsap, ScrollTrigger, useGSAP, MQ, DUR, STAGGER } from '../lib/motion'
import './Projects.css'

/** Screens of scroll each project holds before the next takes over. */
const SCREENS_PER_PROJECT = 1

/** Where in a project's screen the hand-off begins, and how long it takes. */
const HANDOFF_AT = 0.55
const HANDOFF = 0.5

/**
 * The pinned projects stage. The main event of the site.
 *
 * ScrollTrigger pins the stage for one screen per project. Nothing on that
 * screen scrolls: the text is replaced where it stands and only the
 * photographs travel.
 *
 * The two halves get deliberately different vocabularies, and that split is
 * the point of the treatment:
 *
 *   Text  — replaced in place. The outgoing paragraph lifts 12px as it goes
 *           and the incoming one settles from 20px below, line by line at 50ms
 *           apart. It is the same distance a scroll reveal travels: enough to
 *           read as arriving, small enough that nobody is asked to track a
 *           moving target while reading. Between hand-offs it is perfectly
 *           still, which is the part that matters.
 *   Photo  — the house image reveal, used as a transition. The incoming frame
 *           opens downward through a clip-path while the picture inside eases
 *           down from scale(1.12); the outgoing one closes upward and pushes
 *           slightly away. Two things resolving together is what reads as
 *           expensive, and it is the same mechanism every other photograph on
 *           the site arrives through.
 *
 * A segmented rail above the text fills as each project holds its screen, so
 * the reader can see how much of the section is left without counting.
 *
 * All of it is one timeline, scrubbed by the pin. `scrub: 0.6` is what keeps
 * it from feeling wheel-locked: the timeline takes 0.6s to catch up to the
 * scroll position, so the shutter still eases rather than tracking the hand
 * frame for frame.
 *
 * Below 900px `matchMedia` never builds any of this and every project is an
 * ordinary stacked block with its carousel underneath.
 */
export function Projects() {
  // Only used to decide which DOM to render; the animation never sets state.
  const [pinned, setPinned] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLElement | null)[]>([])
  const setRefs = useRef<(HTMLDivElement | null)[]>([])
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([])

  /**
   * Deciding whether to pin has to happen in its own effect, before the GSAP
   * setup runs. An earlier version called setPinned inside the matchMedia
   * callback, which meant GSAP wired itself to the DOM as it existed *before*
   * the re-render — the media column did not exist yet and the refs were
   * stale, so the pin silently never built.
   */
  useEffect(() => {
    const mq = window.matchMedia(MQ.desktop)
    const sync = () => setPinned(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useGSAP(
    () => {
      const root = rootRef.current
      const stage = stageRef.current
      if (!root || !stage) return

      const blocks = blockRefs.current.filter(Boolean) as HTMLElement[]

      /* --- Unpinned: an ordinary stacked list, revealed on the way past. --- */
      if (!pinned) {
        const mm = gsap.matchMedia()
        mm.add(MQ.motion, () => {
          for (const block of blocks) {
            gsap.from(block.children, {
              autoAlpha: 0,
              y: 24,
              duration: DUR.mid,
              stagger: STAGGER,
              scrollTrigger: { trigger: block, start: 'top 85%', once: true },
            })
          }
        })
        return () => mm.revert()
      }

      const sets = setRefs.current.filter(Boolean) as HTMLElement[]
      const fills = fillRefs.current.filter(Boolean) as HTMLElement[]
      if (blocks.length !== projects.length || sets.length !== projects.length) return

      /** The picture inside each frame. Scaled by the swap; never by React. */
      const frames = sets.map((set) => set.querySelector('.carousel__frame') as HTMLElement)

      /** Everything inside a text block, in reading order. */
      const linesOf = (block: HTMLElement) => Array.from(block.children) as HTMLElement[]

      /** Only the visible project is reachable by tab or by a screen reader. */
      const expose = (active: number) => {
        blocks.forEach((el, k) => el.setAttribute('aria-hidden', String(k !== active)))
        sets.forEach((el, k) => {
          el.setAttribute('aria-hidden', String(k !== active))
          for (const b of el.querySelectorAll('button')) b.tabIndex = k === active ? 0 : -1
        })
      }

      // Everything but the first starts shut. Set at runtime, never authored in
      // CSS, so the page is readable without JavaScript.
      gsap.set(blocks.slice(1), { autoAlpha: 0 })
      gsap.set(sets.slice(1), { autoAlpha: 0, clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(sets[0] as HTMLElement, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(fills, { scaleX: 0, transformOrigin: '0% 50%' })
      expose(0)

      // One timeline, scrubbed by the pin. An earlier version drove the swap
      // from a scroll-progress callback instead; the pin worked but the
      // callback never fired, and a scrubbed timeline is the pattern
      // ScrollTrigger is actually built around, so this is both simpler and
      // the one the library guarantees.
      //
      // The timeline's unit is one project: project i holds the stage from t=i
      // to t=i+1, and hands over at t = i + HANDOFF_AT.
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${window.innerHeight * projects.length * SCREENS_PER_PROJECT}`,
          pin: stage,
          pinSpacing: true,
          // Deliberately no anticipatePin.
          //
          // It exists because browsers scroll off the main thread, so a pin can
          // land a frame late and flicker. It buys that back by pinning early,
          // in proportion to scroll velocity: ScrollTrigger multiplies the
          // value by 45ms and forces the trigger active if the projected
          // scroll position that far ahead is already past the start. At
          // anticipatePin: 1 and a hard trackpad flick — call it 3000px/s —
          // that is the stage snapping to the top of the viewport up to 135px
          // before it should, then correcting when the scroll catches up.
          //
          // A one-frame flicker on entry is cheaper than a visible jump every
          // time somebody scrolls quickly out of the hero.
          scrub: 0.6,
          invalidateOnRefresh: true,
          // This pin is built late — `pinned` starts false and only flips
          // after the first paint — so it is created *after* every reveal
          // further down the page, and it adds several screens of spacer
          // above them. It has to be the first thing measured on any refresh
          // or those reveals keep start positions from the shorter page and
          // fire while the stage is still pinned, which is exactly what makes
          // the rest of the site look dead on the way down.
          //
          // Higher refreshes earlier: ScrollTrigger.sort() orders by
          // `refreshPriority * -1e6 + positionOnPage` ascending. A negative
          // value here would put the pin last, which is the bug this replaces.
          refreshPriority: 1,
        },
      })

      // The rail. One segment per project, each filling across its own screen.
      fills.forEach((fill, i) => {
        tl.to(fill, { scaleX: 1, duration: 1 }, i)
      })

      for (let i = 1; i < projects.length; i++) {
        // Each hand-off occupies its own slot, with a hold either side, so a
        // project is readable for most of its screen rather than continuously
        // cross-fading into the next.
        const at = i - 1 + HANDOFF_AT
        const out = blocks[i - 1] as HTMLElement
        const into = blocks[i] as HTMLElement

        tl
          // Text out: the block fades where it stands while its lines lift.
          .to(out, { autoAlpha: 0, duration: HANDOFF * 0.8 }, at)
          .to(linesOf(out), { y: -12, duration: HANDOFF * 0.8, stagger: 0.03 }, at)
          // Text in: lines settle from below, in reading order.
          .set(into, { autoAlpha: 1 }, at)
          .fromTo(
            linesOf(into),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: HANDOFF, stagger: 0.05 },
            at + 0.12,
          )
          // Photo out: the frame closes upward and the picture pushes away.
          .to(sets[i - 1] as HTMLElement, { clipPath: 'inset(0% 0% 100% 0%)', duration: HANDOFF }, at)
          .to(frames[i - 1] as HTMLElement, { scale: 1.08, duration: HANDOFF }, at)
          .set(sets[i - 1] as HTMLElement, { autoAlpha: 0 }, at + HANDOFF)
          // Photo in: the frame opens downward over it, and the picture inside
          // eases down from an overscale as it opens. Same reveal as every
          // other photograph on the site.
          .set(sets[i] as HTMLElement, { autoAlpha: 1 }, at)
          .fromTo(
            sets[i] as HTMLElement,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: HANDOFF },
            at,
          )
          .fromTo(
            frames[i] as HTMLElement,
            { scale: 1.12 },
            { scale: 1, duration: HANDOFF * 1.1 },
            at,
          )
          .add(() => expose(i), at + HANDOFF)
      }

      // The last project needs its own screen to hold, rather than ending on
      // the final hand-off.
      tl.to({}, { duration: HANDOFF }, projects.length - 1 + HANDOFF_AT)

      // Creating the pin changes the document height by several screens. Every
      // trigger created before it — all the reveals below — still holds start
      // and end values measured against the shorter page.
      ScrollTrigger.refresh()
    },
    { scope: rootRef, dependencies: [pinned], revertOnUpdate: true },
  )

  return (
    <section className="section section--surface" id="projects">
      <div className="container">
        <SectionHeading label="Work" title="Selected work" />
      </div>

      <div className={pinned ? 'projects projects--pinned' : 'projects'} ref={rootRef}>
        <div className="projects__stage" ref={stageRef}>
          <div className="container projects__grid">
            <div className="projects__text">
              {/* One segment per project, filling across its own screen. It
                  says how much of the section is left without anyone having
                  to count, and it is the only thing on the stage that moves
                  continuously rather than at the hand-offs. */}
              {pinned ? (
                <div className="projects__rail" aria-hidden="true">
                  {projects.map((project, i) => (
                    <span className="projects__rail-seg" key={project.id}>
                      <span
                        className="projects__rail-fill"
                        ref={(el) => {
                          fillRefs.current[i] = el
                        }}
                      />
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="projects__stack">
                {projects.map((project, i) => (
                  <article
                    key={project.id}
                    className="projects__block"
                    ref={(el) => {
                      blockRefs.current[i] = el
                    }}
                  >
                    <p className="t-mono-number projects__number">
                      {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </p>
                    <h3 className="t-project projects__title">{project.title}</h3>
                    <p className="t-mono-tag projects__meta">{project.meta}</p>
                    <p className="t-lead projects__hook">{project.hook}</p>

                    {project.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="t-body projects__para">
                        {paragraph}
                      </p>
                    ))}

                    {project.copyTodo ? <Todo of={project.copyTodo} /> : null}

                    {isTodo(project.tags) ? (
                      <Todo of={project.tags} />
                    ) : (
                      <TechTags items={project.tags} label={`${project.title} stack`} />
                    )}

                    <div className="projects__links">
                      {isTodo(project.links) ? (
                        <Todo of={project.links} />
                      ) : (
                        project.links.map((link) => (
                          <TextLink key={link.href} href={link.href} external>
                            {link.label}
                          </TextLink>
                        ))
                      )}
                    </div>

                    {/* Unpinned, each project carries its own carousel inline. */}
                    {!pinned ? (
                      <div className="projects__inline-media">
                        <ProjectCarousel project={project} active />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>

            {pinned ? (
              <div className="projects__media">
                {projects.map((project, i) => (
                  <div
                    key={project.id}
                    className="projects__set"
                    ref={(el) => {
                      setRefs.current[i] = el
                    }}
                  >
                    <ProjectCarousel project={project} active />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
