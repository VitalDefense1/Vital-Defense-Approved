"use client"

import { useRef, type MouseEvent, type RefObject } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import { formatPrice } from "@/components/cart-state"
import { FavoriteHeart } from "@/components/favorite-heart"
import { useFavorites } from "@/components/favorites-state"
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { getSampleProduct, productPath, type SampleProduct } from "@/lib/sample-products"

export function FavoritesOverlay({
  open,
  onOpenChange,
  resolveOpener,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  resolveOpener: () => HTMLElement | null
}) {
  const { ids } = useFavorites()
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreOpener = useRef(true)
  const products = ids.flatMap((id) => {
    const product = getSampleProduct(id)
    return product ? [product] : []
  })

  function closeFromItem() {
    restoreOpener.current = false
    onOpenChange(false)
  }

  function focusAfterRemoval(event: MouseEvent<HTMLButtonElement>) {
    const item = event.currentTarget.closest("li")
    const next =
      item?.nextElementSibling?.querySelector<HTMLElement>("a, button") ??
      item?.previousElementSibling?.querySelector<HTMLElement>("a, button") ??
      closeRef.current
    requestAnimationFrame(() => {
      if (next?.isConnected) next.focus()
      else closeRef.current?.focus()
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) restoreOpener.current = true
        onOpenChange(next)
      }}
    >
      <DialogPortal>
        <DialogOverlay className="vd-favorites-overlay bg-[#1a1917]/45 duration-200 motion-reduce:animate-none" />
        <DialogPrimitive.Popup
          id="favorites-overlay"
          data-favorites-overlay=""
          finalFocus={() => {
            if (!restoreOpener.current) {
              restoreOpener.current = true
              return false
            }
            return resolveOpener()
          }}
          initialFocus={closeRef as RefObject<HTMLElement | null>}
          className="vd-favorites-panel fixed top-1/2 left-1/2 z-50 flex w-[min(calc(100%-1.5rem),46rem)] max-h-[calc(100dvh-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden bg-white p-4 text-[#1a1917] shadow-[0_16px_50px_rgb(26_25_23/0.12)] ring-1 ring-border outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none sm:p-6"
        >
          <DialogPrimitive.Close
            ref={closeRef}
            className="absolute top-2 right-2 inline-flex size-11 items-center justify-center rounded-full hover:text-gold"
            aria-label="Close"
          >
            <XIcon className="size-5" aria-hidden />
          </DialogPrimitive.Close>
          <div className="pr-12">
            <DialogTitle className="font-heading text-2xl leading-tight font-bold">
              Favorites
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Saved in this browser only.
            </DialogDescription>
          </div>
          {products.length === 0 ? (
            <p className="px-6 py-16 text-center text-sm text-muted-foreground">NO FAVORITES YET</p>
          ) : (
            <ul className="vd-favorites-grid mt-4">
              {products.map((product) => (
                <FavoriteItem
                  key={product.id}
                  product={product}
                  onOpen={closeFromItem}
                  onRemoved={focusAfterRemoval}
                />
              ))}
            </ul>
          )}
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}

function FavoriteItem({
  product,
  onOpen,
  onRemoved,
}: {
  product: SampleProduct
  onOpen: () => void
  onRemoved: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <li className="vd-favorites-item relative min-w-0 bg-white">
      <Link
        href={productPath(product.id)}
        className="vd-product-card flex h-full min-h-0 flex-col"
        onClick={onOpen}
      >
        <span className="relative block h-[6.25rem] shrink-0 bg-[#f7f5f1]">
          <Image
            src={product.image.src}
            alt=""
            fill
            quality={80}
            sizes="(min-width: 768px) 20rem, 90vw"
            className="object-contain p-2"
          />
        </span>
        <span className="flex min-h-0 flex-1 flex-col px-3 pt-2 pb-3">
          <span className="line-clamp-2 font-heading text-sm leading-tight font-bold">
            {product.title}
          </span>
          <span className="mt-auto pt-1 text-sm font-semibold tracking-wide text-gold">
            {formatPrice(product.price)}
          </span>
        </span>
      </Link>
      <FavoriteHeart
        productId={product.id}
        title={product.title}
        className="absolute top-0.5 right-0.5 z-10"
        onToggled={onRemoved}
      />
    </li>
  )
}
