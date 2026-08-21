import { useRef, useState } from 'react'
import { gsap, useGSAP, MQ, DUR } from '../lib/motion'
import { fallbackSrc } from '../lib/images'
import type { Project, Slide } from '../content/projects'
import './ProjectCarousel.css'

/**
 * One project's image set: two to four slides, driven by the arrows on the frame.
 *
 * Autoplay is deliberately off — the reader drives it. Slides move
 * horizontally rather than cross-fading in place, because the lateral movement
 * is what makes a change read as a deliberate swap rather than a glitch.
 *
 * Pending slides get the same frame as real ones, so dropping screenshots in
 * changes what is inside the frame and nothing else.
 *
 * The track slides on a CSS transition, because a two-state change is what CSS
 * transitions are for. The one thing GSAP does here is settle the arriving
 * picture down from a 6% overscale as it lands, so a slide change resolves the
 * same way every other photograph on the site arrives.
 */
export function ProjectCarousel({ project, active }: { project: Project; active: boolean }) {
  const [index, setIndex] = useState(0)
  const frameRef = useRef<HTMLDivElement>(null)
  const count = project.slides.length
  const current = Math.min(index, count - 1)

  useGSAP(
    () => {
      const img = frameRef.current?.querySelectorAll('.carousel__img')[current]
      if (!img) return

      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: DUR.slow })
      })
      return () => mm.revert()
    },
    { scope: frameRef, dependencies: [current] },
  )

  return (
    <div className="carousel">
      <div className="carousel__frame" ref={frameRef}>
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {project.slides.map((slide, i) => (
            <SlideView
              key={slideKey(slide, i)}
              slide={slide}
              // Only the visible slide of the visible project is reachable, so
              // tabbing never lands on something the reader cannot see.
              hidden={!active || i !== current}
            />
          ))}
        </div>

        {/* Arrows sit on the image itself, quietly. They only appear on hover
            or keyboard focus, so the picture is never competing with its own
            controls. Wrapping at both ends means neither is ever a dead
            control the reader has to discover is disabled. */}
        {count > 1 ? (
          <>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--prev"
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              tabIndex={active ? 0 : -1}
              aria-label={`Previous image of ${project.title}`}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              className="carousel__arrow carousel__arrow--next"
              onClick={() => setIndex((i) => (i + 1) % count)}
              tabIndex={active ? 0 : -1}
              aria-label={`Next image of ${project.title}`}
            >
              <Chevron direction="right" />
            </button>
            <span className="visually-hidden" aria-live="polite">
              Image {current + 1} of {count}
            </span>
          </>
        ) : null}
      </div>
    </div>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function slideKey(slide: Slide, i: number): string {
  return slide.kind === 'image' ? slide.alt.slice(0, 24) : `pending-${i}`
}

function SlideView({ slide, hidden }: { slide: Slide; hidden: boolean }) {
  if (slide.kind === 'image') {
    return (
      <div className="carousel__slide" aria-hidden={hidden}>
        <img
          className="carousel__img"
          srcSet={slide.image.srcset}
          src={fallbackSrc(slide.image.srcset)}
          sizes="(max-width: 833px) 92vw, 52vw"
          width={slide.image.width}
          height={slide.image.height}
          alt={slide.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  return (
    <div className="carousel__slide" aria-hidden={hidden}>
      <div className="carousel__pending">
        <span className="t-mono-label carousel__pending-label">Image pending</span>
        <span className="t-caption carousel__pending-note">{slide.intent}</span>
      </div>
    </div>
  )
}
