import { Reveal } from './Reveal'
import './SectionHeading.css'

/**
 * Every section opens the same way: a small uppercase mono label, then a large
 * centred header, then left-aligned content beneath.
 *
 * The repetition is the point. The same opening shape on every section is what
 * makes a long page navigable — a reader always knows where a section starts
 * and what it is. It is not varied for visual interest.
 */
export function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <Reveal className="section-heading">
      <p className="t-mono-label u-muted section-heading__label">{label}</p>
      <h2 className="t-section section-heading__title">{title}</h2>
    </Reveal>
  )
}
