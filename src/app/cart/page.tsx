import type { Metadata } from "next"
import { CartView } from "@/components/cart-view"

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Cart page design for the Vital Defense preview. Checkout, promo codes, shipping, and tax are not connected.",
}

export default function CartPage() {
  return (
    <main>
      <CartView />
    </main>
  )
}
