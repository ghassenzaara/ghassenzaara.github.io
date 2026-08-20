import './EmptyFrame.css'

/**
 * A hairline block where a photo would sit.
 *
 * Used where no image exists yet. The empty frame in the photo's position is
 * the design — it is not a gap to be filled with a company logo or a stock
 * image, and it should not be quietly removed to close the layout up.
 */
export function EmptyFrame({ label }: { label: string }) {
  return (
    <div className="empty-frame">
      <span className="t-mono-label empty-frame__label">{label}</span>
    </div>
  )
}
