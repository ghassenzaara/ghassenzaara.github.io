import { useEffect, useState } from 'react'
import './Nav.css'

const LINKS = [
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#hackathons', label: 'Awards' },
  { href: '#skills', label: 'Toolkit' },
  { href: '#out-of-scope', label: 'Personal' },
  { href: '#contact', label: 'Contact' },
] as const

/**
 * Sticky, 56px, translucent with a backdrop blur. Its bottom hairline appears
 * only once the page has scrolled past 40px, so the nav sits on an unbroken
 * field at the top. No shadow, ever.
 *
 * The active-section indicator rides an IntersectionObserver rather than a
 * scroll listener. Unlike the reveal observer this one never unobserves — it
 * has to keep tracking as the reader moves up and down the page.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    // A zero-height sentinel at 40px is cheaper and smoother than reading
    // scrollY on every scroll event, and it never touches layout.
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:40px;height:1px;width:1px'
    sentinel.setAttribute('aria-hidden', 'true')
    document.body.prepend(sentinel)

    const io = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting), {
      threshold: 0,
    })
    io.observe(sentinel)

    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    )
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      // A band across the upper middle of the viewport: whichever section
      // occupies it is the one being read.
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    for (const s of sections) io.observe(s)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link t-mono-label" href="#main">
        Skip to main content
      </a>
      <header className={scrolled ? 'nav is-scrolled' : 'nav'}>
        <div className="nav__inner container">
          <a className="nav__mark t-project" href="#top">
            Ghassen Zaara
          </a>
          <nav aria-label="Sections">
            <ul className="nav__links">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    className="nav__link t-mono-label"
                    href={link.href}
                    {...(active === link.href ? { 'aria-current': 'true' as const } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
