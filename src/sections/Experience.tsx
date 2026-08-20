import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { Figure } from '../components/Figure'
import { EmptyFrame } from '../components/EmptyFrame'
import { experience, experienceNote } from '../content/experience'
import './Experience.css'

/**
 * Three blocks with the same internal structure, separated by hairlines. Not a
 * timeline, not a list. The photo alternates sides down the section.
 */
export function Experience() {
  return (
    <section className="section section--bg" id="experience">
      <div className="container">
        <SectionHeading label="Experience" title="Where I've worked" />

        <div className="experience">
          {experience.map((role, i) => (
            <Reveal as="article" key={role.id} variant="fade" className="experience__item">
              <Reveal className="experience__media" variant={i % 2 === 1 ? 'right' : 'left'}>
                {role.photo ? (
                  <Figure
                    image={role.photo.image}
                    alt={role.photo.alt}
                    sizes="(max-width: 900px) 92vw, 42vw"
                    caption={role.photo.caption}
                    index={i}
                  />
                ) : (
                  <EmptyFrame label={role.emptyLabel ?? 'Coming soon'} />
                )}
              </Reveal>

              <Reveal
                className="experience__body"
                variant={i % 2 === 1 ? 'left' : 'right'}
                index={1}
              >
                <h3 className="t-project">{role.title}</h3>
                <p className="t-mono-tag u-muted experience__meta">{role.meta}</p>
                {role.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)} className="t-body experience__para">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </Reveal>
          ))}
        </div>

        <Reveal className="experience__note">
          <p className="t-body-strong">{experienceNote}</p>
        </Reveal>
      </div>
    </section>
  )
}
