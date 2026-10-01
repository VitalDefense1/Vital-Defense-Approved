import { cn } from "@/lib/utils"

/**
 * The artwork is the original file. White has been removed and empty margin
 * cropped. The header uses only the shield and skull, cropped from that file.
 * Nothing in the mark is redrawn.
 */
export function Logo({
  className,
  priority = false,
  mark = false,
}: {
  className?: string
  priority?: boolean
  /** Shield and skull only. The wordmark stays on the full logo. */
  mark?: boolean
}) {
  return (
    // Served as the prepared file so the footer does not show a white box.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mark ? "/brand/shield-symbol.png" : "/brand/vital-defense-logo.png"}
      alt="Vital Defense"
      width={mark ? 293 : 736}
      height={mark ? 248 : 626}
      draggable={false}
      fetchPriority={priority ? "high" : undefined}
      className={cn("block h-auto w-auto shrink-0 select-none", className)}
    />
  )
}
