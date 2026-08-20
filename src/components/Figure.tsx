import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, MQ, photoIn, photoDrift, wipeFor, type Wipe } from '../lib/motion'
import { fallbackSrc, type ImageSource } from '../lib/images'
import './Figure.css'

type FigureProps = {
  image: ImageSource
  alt: string
  /** Responsive `sizes`. Wrong sizes is the usual cause of an oversized download. */
  sizes: string
  caption?: ReactNode
  /** Above-the-fold images load eagerly and at high priority. */
  priority?: boolean
  /**
   * Which wipe the frame opens through. Pass an index instead of naming one
   * and consecutive figures down a section vary on their own.
   */
  wipe?: Wipe
  index?: number
  className?: string
}

/**
 * The image reveal carries the "smooth" feeling more than anything else on the
 * page, so it is worth stating how it works.
 *
 * Three things resolve together. The frame opens along one of the shapes in
 * `WIPES`; the picture inside eases down from scale(1.14) as it does; and once
 * it is there, a scrubbed 6% zoom runs for as long as the figure is crossing
 * the viewport. One thing fading in reads as cheap. Three things resolving
 * together reads as expensive.
 *
 * The zoom lives on its own wrapper rather than on the <img>, because the
 * entrance already owns the image's scale and two tweens on one property is
 * how a reveal ends up fighting itself.
 *
 * Every start state is set by GSAP at runtime — the figure ships visible.
 */
export function Figure({
  image,
  alt,
  sizes,
  caption,
  priority = false,
  wipe,
  index = 0,
  className,
}: FigureProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      const clip = root?.querySelector('.figure__clip')
      const zoom = root?.querySelector('.figure__zoom')
      const img = root?.querySelector('.figure__img')
      if (!root || !clip || !zoom || !img) return

      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        photoIn(clip, img, { variant: wipe ?? wipeFor(index), trigger: root })
        photoDrift(zoom, root)
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [wipe, index] },
  )

  return (
    <figure ref={ref} className={className ? `figure ${className}` : 'figure'}>
      <div className="figure__frame">
        <div className="figure__clip">
          <div className="figure__zoom">
            <img
              className="figure__img"
              srcSet={image.srcset}
              src={fallbackSrc(image.srcset)}
              sizes={sizes}
              width={image.width}
              height={image.height}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding={priority ? 'sync' : 'async'}
              {...(priority ? { fetchPriority: 'high' as const } : {})}
            />
          </div>
        </div>
      </div>
      {caption ? (
        <figcaption className="figure__caption t-caption u-muted">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
