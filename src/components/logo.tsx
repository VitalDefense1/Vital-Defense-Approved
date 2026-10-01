import { cn } from "@/lib/utils"

/**
 * The mark is the original artwork. White has been removed and the empty
 * margin cropped, which you authorized. The shield, skull, and lettering
 * are not redrawn.
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    // Served as the prepared file so the footer does not show a white box.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/vital-defense-logo.png"
      alt="Vital Defense"
      width={736}
      height={626}
      draggable={false}
      fetchPriority={priority ? "high" : undefined}
      className={cn("block h-auto w-auto shrink-0 select-none", className)}
    />
  )
}
