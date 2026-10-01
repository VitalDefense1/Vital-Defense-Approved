"use client"

import { formatPrice, useCart } from "@/components/cart-state"
import { Button } from "@/components/ui/button"

export function AddToCartButton({
  product,
}: {
  product: { id: string; title: string; price: number }
}) {
  const { items, addItem } = useCart()
  const qty = items.find((item) => item.id === product.id)?.qty ?? 0

  return (
    <div>
      <p className="text-lg font-semibold tracking-wide text-gold">{formatPrice(product.price)}</p>
      <Button
        type="button"
        className="mt-6 h-11 bg-gold px-5 text-white hover:bg-[#7a623c]"
        onClick={() => addItem(product)}
      >
        Add to cart
      </Button>
      <p className="mt-3 min-h-5 text-sm text-muted-foreground" role="status">
        {qty > 0 ? `In the cart · ${qty}` : ""}
      </p>
    </div>
  )
}
