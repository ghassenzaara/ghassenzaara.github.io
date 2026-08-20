import { useRef } from 'react'
import { TextLink } from '../components/TextLink'
import { Todo } from '../components/Todo'
import { gsap, useGSAP, MQ, DUR } from '../lib/motion'
import { profile, contact, colophon } from '../content/profile'
import './Contact.css'

/**
 * The only full-bleed element on the page, and the only appearance of
 * --surface-inverse. Its weight is the whole point of holding it back.
 *
 * Every accented element in here resolves to --accent-light, because --accent
 * on this surface is 2.2:1 and unreadable. That is handled once, by remapping
 * the token for the whole subtree in Contact.css, rather than at each call site.
 */
export function Contact() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // The band arrives rather than being cut in: the one moment on the page
        // worth making slightly theatrical. Animating backgroundColor is a paint
        // and not a layout, so it is the exception the transform-only rule can
        // afford — there is no transform that produces this.
        gsap.fromTo(
          el,
          { backgroundColor: 'var(--bg)' },
          {
            backgroundColor: 'var(--surface-inverse)',
            duration: DUR.mid,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <footer className="contact-band" id="contact" ref={ref}>
      <div className="container contact-band__inner">
        <p className="t-mono-label contact-band__eyebrow">Contact</p>
        <h2 className="t-section contact-band__title">{contact.heading}</h2>

        <p className="t-body contact-band__line">{contact.line}</p>
        <Todo of={contact.lineTodo} />

        <ul className="contact-band__links">
          <li>
            <TextLink href={`mailto:${profile.email}`} className="t-lead">
              {profile.email}
            </TextLink>
          </li>
        </ul>

        <ul className="contact-band__links contact-band__links--social">
          <li>
            <TextLink href={profile.github} external className="t-mono-label">
              GitHub ↗
            </TextLink>
          </li>
          <li>
            <TextLink href={profile.linkedin} external className="t-mono-label">
              LinkedIn ↗
            </TextLink>
          </li>
        </ul>

        <div className="contact-band__foot">
          <ul className="contact-band__colophon">
            {colophon.map((entry) => (
              <li key={entry.name} className="t-fine contact-band__colophon-row">
                <span
                  className="contact-band__swatch"
                  style={{ background: `var(${entry.token})` }}
                  aria-hidden="true"
                />
                <span className="contact-band__swatch-name">{entry.name}</span>
                <span>{entry.note}</span>
              </li>
            ))}
          </ul>

          <p className="t-fine contact-band__legal">{contact.footer}</p>
        </div>
      </div>
    </footer>
  )
}
