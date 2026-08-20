/**
 * Placeholders are typed, not written as prose.
 *
 * CONTEXT.md's opening rule is that TODO lines are never invented. Making them
 * a type means a missing value cannot be quietly filled in with something
 * plausible: it renders as a visible chip in development, and lint:content
 * fails the production build until it is replaced by a real value.
 */
export type Todo = { readonly __todo: string }

export type Maybe<T> = T | Todo

export const todo = (note: string): Todo => ({ __todo: note })

export function isTodo<T>(value: Maybe<T>): value is Todo {
  return typeof value === 'object' && value !== null && '__todo' in value
}
