import type { Todo as TodoValue } from '../content/types'
import './Todo.css'

/**
 * A visible placeholder chip.
 *
 * Deliberately loud. A placeholder that blends in is a placeholder that ships.
 * lint:content fails the production build while any of these remain, so this is
 * only ever seen in development.
 */
export function Todo({ of }: { of: TodoValue }) {
  return (
    <span className="todo-chip t-mono-tag" role="note">
      TODO · {of.__todo}
    </span>
  )
}
