import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { Figure } from '../components/Figure'
import { hackathons } from '../content/experience'
import './Hackathons.css'

/**
 * The subject here is the result and the room, not the build.
 *
 * Viegtor is described in full in the projects section and Agnes is not a
 * project entry at all, so this section deliberately does not re-describe
 * either product. Photo-led, two sentences each.
 */
export function Hackathons() {
  return (
    <section className="section section--surface" id="hackathons">
      <div className="container">
        <SectionHeading label="Awards" title="Hackathons" />

        <div className="hackathons">
          {hackathons.map((award, i) => (
            <Reveal as="article" key={award.id} index={i} className="hackathons__item">
              <Figure
                image={award.photo.image}
                alt={award.photo.alt}
                sizes="(max-width: 833px) 92vw, 46vw"
                caption={award.photo.caption}
                index={i + 1}
              />
              <div className="hackathons__body">
                <p className="t-mono-number hackathons__place">{award.place}</p>
                <h3 className="t-project">{award.event}</h3>
                <p className="t-mono-tag u-muted">{award.meta}</p>
                <p className="t-body hackathons__para">{award.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
