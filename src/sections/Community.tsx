import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { EmptyFrame } from '../components/EmptyFrame'
import { Todo } from '../components/Todo'
import { community } from '../content/experience'
import './Community.css'

export function Community() {
  return (
    <section className="section section--bg" id="community">
      <div className="container">
        <SectionHeading label="Community" title="Building the room" />

        <div className="community">
          <Reveal className="community__media" variant="left">
            <EmptyFrame label={community.emptyLabel} />
          </Reveal>

          <Reveal className="community__body" variant="right" index={1}>
            <h3 className="t-project">{community.title}</h3>
            <p className="t-mono-tag u-muted">{community.meta}</p>
            {community.body.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="t-body community__para">
                {paragraph}
              </p>
            ))}
            <Todo of={community.roleTodo} />
            <Todo of={community.scopeTodo} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
