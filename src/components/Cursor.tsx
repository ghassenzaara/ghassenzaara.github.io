import { useRef } from 'react'
import { gsap, useGSAP, MQ } from '../lib/motion'
import './Cursor.css'

const INTERACTIVE = 'a, button, [role="button"], .projects__block'

/**
 * A dot that tracks the pointer exactly, and a ring that lags behind it.
 *
 * The lag is the entire effect. Both are driven by `gsap.quickTo`, which keeps
 * a single interpolating tween per property and simply retargets it on each
 * mousemove — so the write happens on GSAP's ticker at frame rate, never at
 * the event rate, and the two elements share one clock.
 *
 * Each cursor is two nested elements: the outer one is positioned, the inner
 * one is scaled. That split keeps the hover response on `scale` instead of
 * width and height. Scaling the ring to 2x also renders its 1px border at 2px,
 * so "the ring grows and its border thickens" falls out of one property.
 *
 * Never mounts without a fine, hovering pointer, and never under reduced
 * motion — both are conditions of the matchMedia below.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(
      `${MQ.motion} and (pointer: fine) and (hover: hover)`,
      () => {
        const make = (name: string) => {
          const outer = document.createElement('div')
          outer.className = name
          outer.setAttribute('aria-hidden', 'true')
          const inner = document.createElement('div')
          inner.className = `${name}__inner`
          outer.append(inner)
          document.body.append(outer)
          return outer
        }

        const dot = make('cursor-dot')
        const ring = make('cursor-ring')

        // Only now, with both elements confirmed in the DOM, is it safe to take
        // the native cursor away. Setting `cursor: none` in CSS would leave
        // anyone whose JavaScript failed with no pointer at all.
        document.documentElement.classList.add('has-custom-cursor')

        // The dot is effectively instant; the ring is deliberately slower, and
        // that difference is the whole effect.
        const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
        const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
        const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' })
        const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' })

        let visible = false

        const onMove = (e: MouseEvent) => {
          dotX(e.clientX)
          dotY(e.clientY)
          ringX(e.clientX)
          ringY(e.clientY)
          if (!visible) {
            visible = true
            gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 })
          }
        }

        const onLeave = () => {
          visible = false
          gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 })
        }

        const onOver = (e: MouseEvent) => {
          const target = e.target as Element | null
          const hot = Boolean(target?.closest?.(INTERACTIVE))
          gsap.to(ring.firstElementChild, { scale: hot ? 2 : 1, duration: 0.2 })
          gsap.to(dot.firstElementChild, { scale: hot ? 0.5 : 1, duration: 0.2 })
          // Inside the inverted contact band both switch to --accent-light,
          // since --accent is 2.2:1 there and unreadable.
          const inverse = Boolean(target?.closest?.('.contact-band'))
          dot.classList.toggle('is-inverse', inverse)
          ring.classList.toggle('is-inverse', inverse)
        }

        gsap.set([dot, ring], { autoAlpha: 0, xPercent: -50, yPercent: -50 })

        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('mouseover', onOver, { passive: true })
        document.addEventListener('mouseleave', onLeave)

        return () => {
          window.removeEventListener('mousemove', onMove)
          window.removeEventListener('mouseover', onOver)
          document.removeEventListener('mouseleave', onLeave)
          document.documentElement.classList.remove('has-custom-cursor')
          dot.remove()
          ring.remove()
        }
      },
    )

    return () => mm.revert()
  }, { scope: ref })

  return <div ref={ref} aria-hidden="true" />
}
