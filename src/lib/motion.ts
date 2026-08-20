import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'
import { useGSAP } from '@gsap/react'

/**
 * The one place plugins are registered and motion tokens are defined.
 *
 * CONTEXT.md section 9 fixes one easing curve and three durations for the whole
 * site. Those were CSS custom properties; here they are the same values in
 * GSAP's terms, exported so no animation anywhere has to restate them.
 *
 * `useGSAP` is registered alongside the plugins so its cleanup runs on unmount:
 * every tween and every ScrollTrigger created inside a `useGSAP` scope is
 * reverted automatically, which is what stops stale triggers accumulating
 * across re-renders.
 *
 * Flip is here for the photo albums. It is the one plugin that can animate a
 * layout change — a pile of prints becoming a strip of them — without anyone
 * having to hand-compute the two positions.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, Flip)

/**
 * The site's easing curve, cubic-bezier(0.16, 1, 0.3, 1): fast start, long soft
 * settle. Registered as a named ease so it reads the same at every call site
 * and cannot drift into an approximation.
 */
export const EASE = CustomEase.create('site', '0.16, 1, 0.3, 1')

/** Three durations, in seconds. Nothing else exists. */
export const DUR = {
  /** User-triggered: hover, focus, click. */
  fast: 0.2,
  /** Self-triggered: text reveal, section entry. */
  mid: 0.6,
  /** Image reveals only. */
  slow: 0.9,
} as const

/** Grouped items offset by this much, capped by STAGGER_MAX in total. */
export const STAGGER = 0.07
export const STAGGER_MAX = 0.4

/** Applied to every tween that does not say otherwise. */
gsap.defaults({ ease: EASE, duration: DUR.mid })

/**
 * Where the pinned treatments are allowed to exist.
 *
 * A viewport-height pin plus 3D transforms is a bad trade on a phone, so
 * anything pinned is scoped to `desktop`. `motion` is the umbrella condition
 * for everything that should simply not run when the visitor has asked for
 * reduced motion.
 */
export const MQ = {
  desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const

/** Read once, at the moment of an interaction. Never cached. */
export function prefersReduced(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(MQ.reduced).matches
}

/* -----------------------------------------------------------------------------
   Photographs
   -------------------------------------------------------------------------- */

/**
 * The shapes a photograph is allowed to arrive through.
 *
 * Every one of these is a `clip-path` on the frame, which the compositor
 * handles like a transform — no layout, no reflow, whatever the shape is. The
 * frame opens; the picture inside eases down from a slight overscale at the
 * same time. Two things resolving together is what reads as expensive.
 *
 * The set exists so that a run of photographs down a page does not arrive the
 * same way six times. `wipeFor(index)` walks it, so a strip varies without any
 * component having to choose.
 */
export const WIPES = {
  /** The house default: the frame opens upward from its bottom edge. */
  up: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
  /** Opens downward. Reads as the picture dropping into the frame. */
  down: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  /** Opens from the left edge across. */
  right: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
  /** Opens outward from a smaller frame inside the real one. */
  iris: { from: 'inset(16% 10% 16% 10%)', to: 'inset(0% 0% 0% 0%)' },
  /**
   * A slanted edge sweeping across. Both polygons carry four points in the
   * same order, which is what lets GSAP interpolate between them; the
   * out-of-bounds coordinates simply mean the final shape covers the frame.
   */
  diagonal: {
    from: 'polygon(0% 0%, 0% 0%, -45% 100%, -45% 100%)',
    to: 'polygon(0% 0%, 145% 0%, 100% 100%, 0% 100%)',
  },
} as const

export type Wipe = keyof typeof WIPES

/** The order a run of photographs cycles through. */
const WIPE_ORDER: readonly Wipe[] = ['up', 'diagonal', 'iris', 'down', 'up', 'right']

/** The wipe belonging to the nth photograph in a run. */
export function wipeFor(index: number): Wipe {
  return WIPE_ORDER[index % WIPE_ORDER.length] as Wipe
}

type PhotoInOptions = {
  variant?: Wipe
  /** Defaults to the frame itself. */
  trigger?: Element
  start?: string
  delay?: number
  /** Set when the reveal is part of a larger timeline rather than scroll-fired. */
  scroll?: boolean
}

/**
 * The photograph entrance, in one place.
 *
 * `clip` is the frame that opens; `img` is the picture inside it, which eases
 * down from an overscale as the frame opens around it. Both live on one
 * timeline so they cannot drift apart, and both start states are set here at
 * runtime rather than in CSS — the picture ships visible, so a page without
 * JavaScript is a page with photographs on it.
 */
export function photoIn(
  clip: Element,
  img: Element,
  { variant = 'up', trigger, start = 'top 88%', delay = 0, scroll = true }: PhotoInOptions = {},
): gsap.core.Timeline {
  const shape = WIPES[variant]
  const tl = gsap.timeline({
    delay,
    ...(scroll
      ? { scrollTrigger: { trigger: trigger ?? clip, start, once: true } }
      : {}),
  })

  tl.fromTo(
    clip,
    { clipPath: shape.from, willChange: 'clip-path' },
    { clipPath: shape.to, duration: DUR.slow, clearProps: 'willChange' },
    0,
  ).fromTo(
    img,
    { scale: 1.14, autoAlpha: 0, transformOrigin: '50% 50%' },
    { scale: 1, autoAlpha: 1, duration: DUR.slow },
    0,
  )

  return tl
}

/**
 * The slow zoom a photograph carries while it crosses the viewport.
 *
 * Scrubbed off scroll, 6% over the whole crossing, on an element inside the
 * frame's `overflow: hidden` — so it can never expose an edge, and it never
 * touches the same property as the entrance above. It is small enough that
 * nobody will name it and large enough that the page feels alive under the
 * hand.
 */
export function photoDrift(el: Element, trigger: Element, amount = 0.06): gsap.core.Tween {
  return gsap.fromTo(
    el,
    { scale: 1 },
    {
      scale: 1 + amount,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
}

export { gsap, ScrollTrigger, Flip, useGSAP }
