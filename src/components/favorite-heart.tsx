"use client"

import type { MouseEvent } from "react"
import { Heart } from "lucide-react"
import { useFavorites } from "@/components/favorites-state"
import { cn } from "@/lib/utils"

export function FavoriteHeart({
  productId,
  title,
  className,
  onToggled,
}: {
  productId: string
  title: string
  className?: string
  onToggled?: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const { has, toggle } = useFavorites()
  const selected = has(productId)

  return (
    <button
      type="button"
      data-favorite-heart=""
      data-product-id={productId}
      className={cn(
        "inline-flex size-11 items-center justify-center bg-transparent text-[#1a1917] hover:text-gold [filter:drop-shadow(0_0_1px_#fff)_drop-shadow(0_0_2px_#fff)]",
        selected && "text-gold",
        className,
      )}
      aria-pressed={selected}
      aria-label={selected ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggle(productId)
        onToggled?.(event)
      }}
    >
      <Heart
        className="size-5"
        strokeWidth={1.75}
        fill={selected ? "currentColor" : "none"}
        aria-hidden
      />
    </button>
  )
}
