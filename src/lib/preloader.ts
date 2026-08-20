import { gsap, EASE, DUR } from './motion'

/**
 * Seconds the counter will wait on the hero photograph before revealing the
 * page anyway. A loader that outlasts the reader's patience is worse than a
 * picture that arrives late — and when it does arrive late, Hero.tsx wipes it
 * in rather than popping it.
 */
const WAIT_CAP = 4

/**
 * Seconds the panel stays up at minimum. A cached photograph resolves on the
 * spot, and 000 flashing straight to 100 looks broken rather than fast.
 */
const FLOOR = 0.7

/**
 * Resolves when the hero photograph is actually decodable, not merely
 * requested. It is by far the heaviest asset on the page, so it is the one
 * thing the counter is honestly measuring.
 */
function heroPhotograph(): Promise<void> {
  const img = document.querySelector<HTMLImageElement>('.hero__bg-img')
  if (!img || img.complete) return Promise.resolve()
  return new Promise<void>((resolve) => {
    img.addEventListener('load', () => resolve(), { once: true })
    // A hero that 404s must not hold the page shut.
    img.addEventListener('error', () => resolve(), { once: true })
  })
}

function after(seconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

/**
 * First visit only.
 *
 * A loader a returning visitor sits through twice is a tax, not an effect, so a
 * sessionStorage flag skips it on every subsequent navigation.
 *
 * The panel covers content that already exists — the hero is fully rendered in
 * the prerendered HTML behind it. It is `display: none` in CSS and only made
 * visible here, so a JavaScript failure means no loader rather than a
 * permanently blocked page.
 *
 * The counter is not a decoration on a fixed timer any more. It runs against
 * the hero photograph, which is a 1920px-wide webp and the heaviest thing on
 * the page: a `power3.out` ease covers most of the distance in the first
 * second and then crawls, the way a real download feels, and the last few
 * digits only exist once the picture has decoded. So the number on screen is
 * telling the truth, and the panel never lifts on an empty frame.
 *
 * Two phases rather than one timeline, because the middle of the sequence is
 * of unknown length. Within each phase the counter and the bar are still the
 * same progress read two ways, so the hairline can never disagree with the
 * number above it.
 */
export function initPreloader(onComplete: () => void): void {
  const panel = document.getElementById('preloader')
  const count = document.getElementById('preloader-count')
  const bar = document.getElementById('preloader-bar')

  const finish = () => {
    panel?.remove()
    document.body.style.overflow = ''
    document.documentElement.classList.add('is-revealing')
    onComplete()
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const seen = sessionStorage.getItem('gz-preloaded') === '1'

  if (!panel || !count || !bar || reduced || seen) {
    finish()
    return
  }

  sessionStorage.setItem('gz-preloaded', '1')
  document.body.style.overflow = 'hidden'
  panel.style.display = 'flex'

  const counter = { value: 0 }

  // Zero-padded to three digits, which ties the counter to the 01 / 05 project
  // numbering. That is what stops it being a generic loader.
  const render = () => {
    count.textContent = String(Math.round(counter.value)).padStart(3, '0')
  }

  /* Phase one: toward 99, never reaching it. Stopping short is the point — the
     last digits are not this phase's to give. */
  const creep = gsap.to(counter, {
    value: 99,
    duration: WAIT_CAP,
    ease: 'power3.out',
    onUpdate: render,
  })
  const creepBar = gsap.fromTo(
    bar,
    { scaleX: 0 },
    { scaleX: 0.99, duration: WAIT_CAP, ease: 'power3.out' },
  )

  /* Phase two: the photograph has landed (or the wait ran out), so the counter
     closes out and the panel goes. */
  Promise.all([
    // Whichever comes first: the picture, or the end of our patience.
    Promise.race([heroPhotograph(), after(WAIT_CAP)]),
    after(FLOOR),
  ]).then(() => {
    creep.kill()
    creepBar.kill()

    gsap
      .timeline({ defaults: { ease: EASE }, onComplete: finish })
      .to(counter, { value: 100, duration: DUR.fast, onUpdate: render })
      .to(bar, { scaleX: 1, duration: DUR.fast }, '<')
      // A beat at 100 before the panel goes.
      .to(panel, { yPercent: -100, duration: DUR.slow }, '+=0.12')
      // The hero is already rendered underneath, scaled a touch, and settles as
      // the panel clears. Overlapping them is the whole effect.
      .add(() => document.documentElement.classList.add('is-revealing'), '<')
  })
}
