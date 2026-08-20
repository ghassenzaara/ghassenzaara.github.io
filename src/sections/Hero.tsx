import { useRef } from 'react'
import { profile } from '../content/profile'
import { images, fallbackSrc } from '../lib/images'
import { gsap, useGSAP, MQ, DUR, EASE, WIPES } from '../lib/motion'
import './Hero.css'

/**
 * Full-screen, centred, with the header photograph sitting behind the type.
 *
 * The photograph is a real <img> rather than a CSS background so it can carry a
 * srcset and intrinsic dimensions; a background-image would download one size
 * for every viewport and reserve no space. It is masked back hard behind the
 * name, because the name has to stay the loudest thing on the page.
 *
 * The headline is split into lines, each inside an overflow-hidden wrapper, so
 * they rise into place with an 80ms stagger. This is the only heading on the
 * page that gets the treatment.
 *
 * Two scrubbed tweens run as the hero leaves. The photograph drifts down at
 * about half the speed of the page, which is the oldest trick there is and
 * still the one that makes a screen feel like it has depth; the type lifts and
 * fades out over it. Both are pure transform and opacity, both are scrubbed
 * rather than played, and neither exists under reduced motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = ref.current
      const bg = section?.querySelector('.hero__bg-img')
      const inner = section?.querySelector('.hero__inner')
      if (!section || !bg || !inner) return

      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // The overscale is what gives the drift room to travel: at 1.16 there
        // is 8% of picture past each edge, and the drift only uses 6.
        gsap.fromTo(
          bg,
          { yPercent: -6, scale: 1.16 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
          },
        )

        gsap.to(inner, {
          yPercent: -14,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  /* --- Arrival -------------------------------------------------------------
     The hero photograph is the heaviest thing on the site by an order of
     magnitude, and it is the first thing anyone sees, so it is never allowed
     to simply pop in.

     On a first visit the preloader is already holding the page shut until this
     exact image decodes, so by the time the panel lifts the picture is there.
     This covers every other route in: a returning visitor, whose loader is
     skipped by the sessionStorage flag; a connection slow enough that the
     loader ran out of patience and revealed the page anyway; a back-forward
     restore. In all of those the frame is empty for a moment, and the picture
     arrives through the same clip-path wipe every other photograph on the site
     uses.

     The wipe goes on the wrapper, not the <img>. The image already belongs to
     the scrubbed parallax above, which holds it at scale 1.16 for the whole
     section; animating it here as well would mean two tweens writing the same
     transform. */
  useGSAP(
    () => {
      const section = ref.current
      const frame = section?.querySelector('.hero__bg')
      const img = section?.querySelector<HTMLImageElement>('.hero__bg-img')
      if (!frame || !img) return

      // Already decoded — or already failed, in which case there is nothing to
      // wait for and clipping the frame would only hide the scrim behind it.
      if (img.complete) return

      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.set(frame, { clipPath: WIPES.up.from })

        const open = () => {
          gsap.to(frame, {
            clipPath: WIPES.up.to,
            duration: DUR.slow,
            ease: EASE,
            clearProps: 'clipPath',
          })
        }

        // A hero that failed to download is not a reason to leave the frame
        // clipped shut forever.
        const give = () => gsap.set(frame, { clearProps: 'clipPath' })

        img.addEventListener('load', open, { once: true })
        img.addEventListener('error', give, { once: true })

        return () => {
          img.removeEventListener('load', open)
          img.removeEventListener('error', give)
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section className="section section--bg hero" id="top" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <img
          className="hero__bg-img"
          srcSet={images.headerBg.srcset}
          src={fallbackSrc(images.headerBg.srcset)}
          sizes="100vw"
          width={images.headerBg.width}
          height={images.headerBg.height}
          alt=""
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
      </div>

      <div className="container hero__inner">
        <p className="t-mono-label hero__eyebrow">{profile.eyebrow}</p>

        <h1 className="hero__headline">
          <span className="t-hero hero__name">
            {profile.nameLines.map((line, i) => (
              <span className="hero__line" key={line}>
                <span className="hero__line-inner" style={{ '--i': i } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </span>
          <span className="t-section hero__tagline">
            {profile.taglineLines.map((line, i) => (
              <span className="hero__line" key={line}>
                <span
                  className="hero__line-inner"
                  style={{ '--i': i + profile.nameLines.length } as React.CSSProperties}
                >
                  {line}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p className="t-lead hero__subline">{profile.subline}</p>

        <div className="hero__links">
          <a className="text-link t-mono-label" href="#projects">
            Selected work ↓
          </a>
          <a className="text-link t-mono-label" href="#contact">
            Get in touch ↗
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="t-mono-label">(Scroll)</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
