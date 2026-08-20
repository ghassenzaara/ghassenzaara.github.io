import type { ReactNode } from 'react'
import './Button.css'

type ButtonProps = {
  children: ReactNode
  href: string
  variant?: 'primary' | 'ghost'
  /** Renders a trailing arrow that travels 4px on hover while the label holds. */
  arrow?: boolean
  external?: boolean
  download?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  arrow = false,
  external = false,
  download = false,
}: ButtonProps) {
  return (
    <a
      className={`button button--${variant}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...(download ? { download: '' } : {})}
    >
      <span className="button__label">{children}</span>
      {arrow ? (
        <span className="button__arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </a>
  )
}
