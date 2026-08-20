import type { ReactNode } from 'react'
import './TextLink.css'

type TextLinkProps = {
  children: ReactNode
  href: string
  external?: boolean
  className?: string
}

/**
 * The underline is drawn by a pseudo-element scaled from the left, not by
 * text-decoration (which cannot animate cleanly) and not by a border (which
 * would shift layout).
 */
export function TextLink({ children, href, external = false, className }: TextLinkProps) {
  return (
    <a
      className={className ? `text-link ${className}` : 'text-link'}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
    </a>
  )
}
