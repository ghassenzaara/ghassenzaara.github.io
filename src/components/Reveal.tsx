import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useGSAP, MQ, DUR, STAGGER, STAGGER_MAX } from '../lib/motion'
import './Reveal.css'

/**
 * Which way the element travels in from.
 *
 * `up` is the default. `left` and `right` are what make a section feel like it
 * arrives rather than fades: pairing them across a two-column block means the
 * halves converge as you reach them.
 *
 * `fade` moves nothing. It exists for wrappers whose children already travel —
 * nesting two transforming reveals multiplies their transforms and the inner
 * element lands somewhere neither intended.
 */
export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'fade'

const FROM: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 40 },
  // Capped well short of the viewport edge. The point is that two halves
  // converge, not that anything flies in from off-screen.
  left: { x: -56 },
  right: { x: 56 },
  scale: { scale: 0.96, y: 24 },
  fade: {},
}

type RevealProps = {
  children: ReactNode
  /** Stagger index. Clamped so the group never exceeds STAGGER_MAX. */
  index?: number
  variant?: RevealVariant
  as?: ElementType
  className?: string
}

/**
 * A scroll reveal, fired once.
 *
 * The hidden start state is set by GSAP at runtime, never authored in CSS.
 * That is the whole no-JS contract: the element ships visible in the HTML, and
 * if the bundle never arrives it simply stays visible. `gsap.from()` would
 * leave the element visible on the server too, but it also re-reads the current
 * value on refresh, so `fromTo` is used with an explicit end state to keep
 * ScrollTrigger refreshes idempotent.
 */
export function Reveal({
  children,
  index = 0,
  variant = 'up',
  as: Tag = 'div',
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const delay = Math.min(index * STAGGER, STAGGER_MAX)
        gsap.fromTo(
          el,
          { autoAlpha: 0, ...FROM[variant] },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: DUR.mid,
            delay,
            scrollTrigger: {
              trigger: el,
              // Starts a little before the element is fully in view.
              start: 'top 90%',
              once: true,
            },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [index, variant] },
  )

  return (
    <Tag ref={ref} className={className ? `reveal ${className}` : 'reveal'}>
      {children}
    </Tag>
  )
}
