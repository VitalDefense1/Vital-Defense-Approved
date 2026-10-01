"use client"

import { useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatPrice, useCart, type CartItem } from "@/components/cart-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSampleProduct, productPath, type ProductImage } from "@/lib/sample-products"

type Line = {
  id: string
  title: string
  price: number
  qty: number
  image?: ProductImage
}

const SAMPLE_IDS = [
  { id: "scoped-rifle", qty: 1 },
  { id: "pistol-optic", qty: 1 },
] as const

function lineFromProduct(id: string, qty: number): Line | null {
  const product = getSampleProduct(id)
  if (!product) return null
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    qty,
    image: product.image,
  }
}

const INITIAL_SAMPLE = SAMPLE_IDS.map((item) => lineFromProduct(item.id, item.qty)).filter(
  (line): line is Line => line !== null,
)

function lineFromCart(item: CartItem): Line {
  const product = getSampleProduct(item.id)
  return {
    id: item.id,
    title: item.title,
    price: item.price,
    qty: item.qty,
    image: product?.image,
  }
}

function subscribeToClient() {
  return () => {}
}

function clientSnapshot() {
  return true
}

function serverSnapshot() {
  return false
}

export function CartView() {
  const { items, setQty, removeItem } = useCart()
  const [sample, setSample] = useState<Line[]>(INITIAL_SAMPLE)
  const [hidSample, setHidSample] = useState(false)
  const [promoNote, setPromoNote] = useState("")
  const [checkoutNote, setCheckoutNote] = useState("")
  const client = useSyncExternalStore(subscribeToClient, clientSnapshot, serverSnapshot)
  const showingSaved = client && items.length > 0
  const lines = showingSaved ? items.map(lineFromCart) : hidSample ? [] : sample
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0)

  function changeQty(id: string, qty: number) {
    const next = Math.max(1, qty)
    if (showingSaved) {
      setQty(id, next)
      return
    }
    setSample((current) =>
      current.map((line) => (line.id === id ? { ...line, qty: next } : line)),
    )
  }

  function remove(id: string) {
    if (showingSaved) {
      if (items.length === 1) setHidSample(true)
      removeItem(id)
      return
    }
    setSample((current) => current.filter((line) => line.id !== id))
  }

  const sourceCopy = showingSaved
    ? "Showing the items saved in this browser."
    : hidSample
      ? "Nothing is saved in this browser."
      : "Showing sample products so this layout can be reviewed."

  return (
    <div className="px-4 pt-16 pb-24 sm:px-6 md:pt-24">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm tracking-wide text-gold">Vital Defense</p>
        <span className="mx-auto mt-6 block h-px w-12 bg-gold" aria-hidden="true" />
        <h1 className="mt-6 font-heading text-[2rem] leading-[1.12] font-bold text-balance sm:text-5xl">
          Cart
        </h1>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">{sourceCopy}</p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          Demonstration only. Changing a quantity, removing a line, applying a promo code, and
          proceeding to checkout do not place an order, check a code, or take payment. Discount,
          shipping, and tax are placeholders.
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-6xl items-start gap-12 md:mt-16 md:grid-cols-[minmax(0,1fr)_22rem] md:gap-16">
        <section aria-labelledby="cart-items-heading">
          <h2 id="cart-items-heading" className="sr-only">
            Items
          </h2>
          {lines.length === 0 ? (
            <p className="border-y border-border py-16 text-center text-sm leading-6 text-muted-foreground">
              No items to show on this page.
            </p>
          ) : (
            <ul className="border-t border-border">
              {lines.map((line) => (
                <li key={line.id} className="border-b border-border py-6">
                  <div className="flex gap-4 sm:gap-6">
                    <Link
                      href={productPath(line.id)}
                      className="vd-product-media flex h-24 w-24 shrink-0 items-center justify-center bg-[#f7f5f1] p-2 sm:h-28 sm:w-32"
                    >
                      {line.image ? (
                        <Image
                          src={line.image.src}
                          alt=""
                          width={line.image.width}
                          height={line.image.height}
                          quality={90}
                          sizes="128px"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="sr-only">{line.title}</span>
                      )}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-heading text-lg leading-tight font-bold sm:text-xl">
                          <Link href={productPath(line.id)} className="vd-text-link">
                            {line.title}
                          </Link>
                        </h3>
                        <p className="shrink-0 text-sm font-semibold tracking-wide text-gold">
                          {formatPrice(line.price * line.qty)}
                        </p>
                      </div>
                      {line.qty > 1 ? (
                        <p className="mt-1 text-right text-xs text-muted-foreground">
                          {formatPrice(line.price)} each
                        </p>
                      ) : null}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div
                          className="inline-flex h-11 items-stretch overflow-hidden rounded-lg border border-border"
                          role="group"
                          aria-label={`Quantity for ${line.title}`}
                        >
                          <button
                            type="button"
                            className="w-11 cursor-pointer text-lg hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Decrease quantity of ${line.title}`}
                            disabled={line.qty <= 1}
                            onClick={() => changeQty(line.id, line.qty - 1)}
                          >
                            −
                          </button>
                          <span className="flex w-10 items-center justify-center border-x border-border text-sm font-semibold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            className="w-11 cursor-pointer text-lg hover:text-gold"
                            aria-label={`Increase quantity of ${line.title}`}
                            onClick={() => changeQty(line.id, line.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="vd-text-link cursor-pointer text-sm text-gold"
                          onClick={() => remove(line.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="border border-border bg-white p-6 sm:p-8 md:sticky md:top-6 md:self-start">
          <span className="mb-6 block h-px w-12 bg-gold" aria-hidden="true" />
          <h2 className="font-heading text-2xl leading-tight font-bold">Order summary</h2>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
            <SummaryRow label="Discount" value="—" detail="Not applied" />
            <SummaryRow label="Shipping" value="—" detail="Not calculated" />
            <SummaryRow label="Tax" value="—" detail="Not calculated" />
          </dl>

          <form
            className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-2"
            onSubmit={(event) => {
              event.preventDefault()
              setPromoNote("Promo codes are not checked in this preview. No discount was applied.")
            }}
          >
            <Label htmlFor="promo-code" className="col-span-2">
              Promo code
            </Label>
            <Input
              id="promo-code"
              name="promo"
              autoComplete="off"
              placeholder="Enter code"
              className="h-11 bg-white"
            />
            <Button type="submit" variant="outline" className="h-11 cursor-pointer px-4">
              Apply
            </Button>
          </form>
          {promoNote ? (
            <p role="status" className="mt-3 text-sm leading-6 text-muted-foreground">
              {promoNote}
            </p>
          ) : null}

          <Button
            type="button"
            className="mt-6 h-11 w-full cursor-pointer bg-gold px-5 text-white hover:bg-[#7a623c]"
            onClick={() =>
              setCheckoutNote(
                "Checkout is not connected. This preview does not take payment or place an order.",
              )
            }
          >
            Proceed to checkout
          </Button>
          {checkoutNote ? (
            <p role="status" className="mt-3 text-sm leading-6 text-muted-foreground">
              {checkoutNote}
            </p>
          ) : null}

          <p className="mt-6">
            <Link href="/" className="vd-text-link text-sm font-semibold tracking-[0.07em]">
              Continue shopping
            </Link>
          </p>
        </aside>
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-sm">{label}</dt>
      <dd className="text-right text-sm font-semibold tracking-wide">
        {value}
        {detail ? (
          <span className="mt-1 block text-xs font-medium tracking-[0.04em] text-muted-foreground">
            {detail}
          </span>
        ) : null}
      </dd>
    </div>
  )
}
