import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { Todo } from '../components/Todo'
import { albums, outOfScopeIntro, type Album } from '../content/gallery'
import { isTodo } from '../content/types'
import { fallbackSrc } from '../lib/images'
import {
  gsap,
  useGSAP,
  Flip,
  ScrollTrigger,
  MQ,
  DUR,
  EASE,
  STAGGER,
  photoIn,
  wipeFor,
  prefersReduced,
} from '../lib/motion'
import './OutOfScope.css'

/**
 * The personal section. Named "Out of Scope" — a small joke that lands for the
 * technical audience and does not need explaining.
 *
 * Ten photographs in one long strip is a filmstrip: you scroll it once, at
 * speed, and remember none of it. So they are three piles of prints on a table
 * instead, named for what they are of rather than where they were taken. You
 * pick one up and it deals itself out.
 *
 * **How the deal works.** Both states are plain CSS layout: a pile is a grid
 * with every card in the same cell, fanned by a rotation; an open album is a
 * flex row that scrolls. Nothing computes a position. GSAP's Flip plugin
 * records where every frame is *before* React re-renders, and after the render
 * it animates each one from where it was to where it now is. That is the whole
 * mechanism, and it is why the photographs travel rather than cut.
 *
 * **What is deliberately not GSAP.** An open album scrolls natively —
 * `overflow-x: auto` with scroll-snap. Native scroll gets trackpad, shift+wheel,
 * touch swipe, keyboard and the scrollbar for free; every JavaScript
 * reimplementation gives at least one of those up. An earlier version of this
 * section drove a horizontal track from a per-frame rAF loop and starved GSAP's
 * own ticker badly enough to lock the renderer.
 *
 * **Without JavaScript** the piles are piles and the labels still say what is
 * in them, because every hidden state here is CSS the server also ships. Under
 * `prefers-reduced-motion` the albums still open; they just cut instead of
 * travelling.
 */
export function OutOfScope() {
  const ref = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  /**
   * The Flip snapshot, taken in the click handler — before React re-renders —
   * and consumed by the effect below, after it. This ref is the entire bridge
   * between the two states: nothing else knows where anything was.
   */
  const snapshot = useRef<Flip.FlipState | null>(null)

  const frames = useCallback(
    () => gsap.utils.toArray<HTMLElement>('.album__clip', ref.current),
    [],
  )

  const toggle = useCallback(
    (id: string) => {
      const next = openId === id ? null : id
      // `props: 'opacity'` is what carries the frames buried in the pile: they
      // sit at zero behind the cover and fade up as they deal out.
      if (!prefersReduced()) snapshot.current = Flip.getState(frames(), { props: 'opacity' })
      setOpenId(next)
    },
    [openId, frames],
  )

  /** Escape closes, from anywhere. Standard for anything that expands in place. */
  useEffect(() => {
    if (!openId) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!prefersReduced()) snapshot.current = Flip.getState(frames(), { props: 'opacity' })
        setOpenId(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openId, frames])

  /* --- The deal ------------------------------------------------------------
     Runs after every open or close, and only when a snapshot is waiting. */
  useGSAP(
    () => {
      const state = snapshot.current
      const root = ref.current
      if (!state || !root) return
      snapshot.current = null

      // The fan is a CSS transform with a 200ms transition on it, which would
      // otherwise be easing the card underneath while Flip eases the frame on
      // top of it. Held off for the duration of the flight.
      root.dataset.flipping = '1'

      Flip.from(state, {
        duration: DUR.slow,
        ease: EASE,
        // Deliberately not scale:true. A frame changes shape between the two
        // states (4:5 in the pile, its own proportions once open), so width and
        // height have to animate independently. The crop reframes; the
        // photograph inside it is never stretched.
        stagger: 0.04,
        onComplete: () => {
          delete root.dataset.flipping
          // Opening adds most of a screen of height. Every trigger below this
          // section is holding positions measured against the shorter page.
          ScrollTrigger.refresh()
        },
      })

      /* Captions belong to an open album only. In a pile they are noise, so
         they arrive behind the frames rather than with them.

         Every caption is handed back to the stylesheet first. The fade below
         leaves inline opacity, visibility and transform on the element, and an
         inline style outranks `.album:not([data-state='open']) .album__caption`
         — so without this, closing an album left all four captions sitting
         visible on top of the pile. Killing first matters too: the fade is
         delayed, so opening and closing quickly would otherwise start a tween
         on an album that is already shut. */
      const captions = root.querySelectorAll<HTMLElement>('.album__caption')
      gsap.killTweensOf(captions)
      gsap.set(captions, { clearProps: 'opacity,visibility,transform' })

      const open = root.querySelector('.album[data-state="open"]')
      if (open) {
        gsap.fromTo(
          open.querySelectorAll('.album__caption'),
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DUR.mid,
            stagger: STAGGER,
            delay: DUR.mid,
            // Landed. Give the element back so the next close is a pure CSS
            // state change again.
            clearProps: 'opacity,visibility,transform',
          },
        )
      }
    },
    { scope: ref, dependencies: [openId] },
  )

  /* --- Entrance ------------------------------------------------------------
     Once, on the way past. The cover opens through its own wipe and the rest
     of the pile rises under it, which is what makes it read as a stack of
     prints rather than three cropped images. */
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        root.querySelectorAll<HTMLElement>('.album').forEach((album, i) => {
          const cards = album.querySelectorAll<HTMLElement>('.album__card')
          const cover = cards[0]
          const clip = cover?.querySelector('.album__clip')
          const img = cover?.querySelector('.album__img')

          if (clip && img) photoIn(clip, img, { variant: wipeFor(i), trigger: album })

          if (cards.length > 1) {
            gsap.from(Array.from(cards).slice(1), {
              y: 26,
              autoAlpha: 0,
              duration: DUR.mid,
              stagger: STAGGER,
              // The fan lives in CSS. Clearing the transform hands it back the
              // moment the tween is done, so the hover fan and Flip both find
              // the element where the stylesheet says it is.
              clearProps: 'transform',
              scrollTrigger: { trigger: album, start: 'top 85%', once: true },
            })
          }
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section className="section section--bg oos" id="out-of-scope" ref={ref}>
      <div className="container">
        <SectionHeading label="Personal" title="Out of scope" />

        <Reveal className="oos__intro">
          {isTodo(outOfScopeIntro) ? (
            <Todo of={outOfScopeIntro} />
          ) : (
            outOfScopeIntro.map((line) => (
              <p key={line.slice(0, 30)} className="t-lead oos__line">
                {line}
              </p>
            ))
          )}
        </Reveal>
      </div>

      <div className="oos__hint container">
        <span className="t-mono-label u-muted">
          {openId ? 'Scroll the album →' : 'Three piles. Open one.'}
        </span>
      </div>

      <div className="albums" data-open={openId ?? undefined}>
        {albums.map((album, i) => (
          <AlbumPile
            key={album.id}
            album={album}
            state={openId === album.id ? 'open' : openId ? 'aside' : 'shut'}
            eager={i === 0}
            onToggle={() => toggle(album.id)}
          />
        ))}
      </div>
    </section>
  )
}

type AlbumState = 'shut' | 'open' | 'aside'

/**
 * One pile.
 *
 * Every photograph is in the DOM in every state — that is what lets Flip match
 * a frame in the pile to the same frame in the open strip. The two states
 * differ only in layout, and the layout is entirely CSS.
 */
function AlbumPile({
  album,
  state,
  eager,
  onToggle,
}: {
  album: Album
  state: AlbumState
  eager: boolean
  onToggle: () => void
}) {
  const open = state === 'open'
  const panelId = `album-${album.id}`

  return (
    <section className="album" data-state={state}>
      <div className="album__meta">
        <button
          type="button"
          className="album__trigger"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span className="t-lead album__name">{album.name}</span>
          <span className="t-mono-label album__count">
            {open ? 'Close' : `${album.photos.length} frames`}
          </span>
        </button>
        <p className="t-body album__note">{album.note}</p>
      </div>

      {/* The pile itself is clickable, because a pile of prints obviously is.
          The button above is the control a keyboard and a screen reader use,
          so this handler is an affordance rather than the only way in. */}
      <ul
        className="album__cards"
        id={panelId}
        onClick={open ? undefined : onToggle}
      >
        {album.photos.map((photo, i) => (
          <li
            className="album__card"
            key={photo.id}
            style={
              {
                '--i': i,
                // The photograph's own proportions, which the frame takes on
                // the moment the album opens. In the pile every frame is the
                // same 4:5 print; opening is partly the crop coming off.
                '--ar': `${photo.image.width} / ${photo.image.height}`,
              } as CSSProperties
            }
          >
            <figure className="album__fig">
              <div className="album__clip">
                <img
                  className="album__img"
                  srcSet={photo.image.srcset}
                  src={fallbackSrc(photo.image.srcset)}
                  sizes="(max-width: 833px) 46vh, 58vh"
                  width={photo.image.width}
                  height={photo.image.height}
                  alt={photo.alt}
                  loading={eager && i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
              <figcaption className="t-mono-label album__caption">{photo.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
