import './TechTag.css'

/** Non-interactive, so never a pill. --r-sm marks it as a label, not an action. */
export function TechTag({ children }: { children: string }) {
  return <li className="tech-tag t-mono-tag">{children}</li>
}

export function TechTags({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="tech-tags" aria-label={label}>
      {items.map((item) => (
        <TechTag key={item}>{item}</TechTag>
      ))}
    </ul>
  )
}
