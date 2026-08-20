import { useRef } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { skills } from '../content/skills'
import { profile } from '../content/profile'
import { gsap, useGSAP, MQ, DUR, EASE, STAGGER, WIPES } from '../lib/motion'
import './Skills.css'

/**
 * Six groups, each a quiet label over one flowing line of names.
 *
 * The earlier version gave every group a numbered sub-heading and a vertical
 * list, which meant tall columns of one-word lines and a section that ate
 * most of a screen to say very little. Setting the items as running text with a
 * middot between them says exactly the same thing in a third of the height, and
 * the labels stay scannable because they are the only muted line in the block.
 *
 * Still explicitly not a tag cloud: no pills, no badges, no icons, no logos, no
 * proficiency bars, no star ratings, no percentages, no year counts.
 *
 * The two downloads close the section. This is the one place on the site where
 * a reader is already reading a list of what I can do, so it is the moment they
 * are most likely to want the document version.
 */
export function Skills() {
  const ref = useRef<HTMLElement>(null)

  /* The buttons arrive through the same clip-path wipe every photograph on the
     site uses, left to right, one after the other. Nothing is authored hidden
     in CSS: if the bundle never lands they are simply there and clickable. */
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const buttons = gsap.utils.toArray<HTMLElement>('.dl', root)
        if (!buttons.length) return

        gsap.fromTo(
          buttons,
          { clipPath: WIPES.right.from },
          {
            clipPath: WIPES.right.to,
            duration: DUR.slow,
            ease: EASE,
            stagger: STAGGER,
            // Handed back afterwards, or the clip would crop the focus ring.
            clearProps: 'clipPath',
            scrollTrigger: { trigger: buttons[0] as HTMLElement, start: 'top 92%', once: true },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section className="section section--surface" id="skills" ref={ref}>
      <div className="container">
        <SectionHeading label="Toolkit" title="What I work with" />

        <div className="skills">
          {skills.map((group, i) => (
            <Reveal key={group.title} index={i} className="skills__group">
              <h3 className="t-mono-label skills__label">{group.title}</h3>
              <ul className="t-body skills__list">
                {group.items.map((item, j) => (
                  <li key={item} className="skills__item">
                    {/* A real text node rather than generated content: the
                        spaces around it are where the line is allowed to
                        break, and a list of inline items with no whitespace
                        between them cannot wrap at all. */}
                    {j > 0 && (
                      <span className="skills__sep" aria-hidden="true">
                        {' · '}
                      </span>
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="skills__downloads">
          {profile.cv.map((file) => (
            <a
              key={file.lang}
              className="dl"
              href={file.href}
              lang={file.lang}
              download
              hrefLang={file.lang}
            >
              {/* Wipes up from the bottom edge on hover, behind the label. */}
              <span className="dl__fill" aria-hidden="true" />

              <span className="dl__swap dl__swap--label">
                <span className="dl__lines">
                  <span className="t-body-strong dl__line">{file.label}</span>
                  {/* The second copy is what rises into the first one's place.
                      Hidden from assistive tech: it is the same words twice. */}
                  <span className="t-body-strong dl__line" aria-hidden="true">
                    {file.label}
                  </span>
                </span>
              </span>

              <span className="t-mono-tag dl__note">{file.note}</span>

              <span className="dl__swap dl__swap--arrow" aria-hidden="true">
                <span className="dl__lines">
                  <Arrow />
                  <Arrow />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Drawn rather than typed: the arrow glyph is outside the webfont's coverage. */
function Arrow() {
  return (
    <svg className="dl__arrow" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6 1v9M2 6.5 6 10.5l4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
