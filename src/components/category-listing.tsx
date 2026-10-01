"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/components/cart-state"
import { FavoriteHeart } from "@/components/favorite-heart"
import { productPath, type SampleProduct } from "@/lib/sample-products"

const MOBILE_PAGE_SIZE = 12
const DESKTOP_PAGE_SIZE = 18

export function CategoryListing({
  title,
  products,
}: {
  title: string
  products: SampleProduct[]
}) {
  return (
    <main>
      <header className="px-6 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm tracking-wide text-gold">Vital Defense</p>
          <span className="mx-auto mt-6 block h-px w-12 bg-gold" aria-hidden="true" />
          <h1 className="mt-6 font-heading text-[2rem] leading-[1.12] font-bold text-balance sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {products.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No products in this category yet.
          </p>
        ) : (
          <>
            <div className="md:hidden">
              <ProductGrid
                products={products}
                pageSize={MOBILE_PAGE_SIZE}
                listClassName="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6"
              />
            </div>
            <div className="hidden md:block">
              <ProductGrid
                products={products}
                pageSize={DESKTOP_PAGE_SIZE}
                listClassName="grid grid-cols-3 gap-x-8 gap-y-14"
              />
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function ProductGrid({
  products,
  pageSize,
  listClassName,
}: {
  products: SampleProduct[]
  pageSize: number
  listClassName: string
}) {
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)
  const pendingFocus = useRef(false)
  const pageCount = Math.max(1, Math.ceil(products.length / pageSize))
  const current = Math.min(Math.max(page, 1), pageCount)
  const start = (current - 1) * pageSize
  const visible = products.slice(start, start + pageSize)
  const end = start + visible.length

  useEffect(() => {
    if (!pendingFocus.current) return
    pendingFocus.current = false
    topRef.current?.focus()
  }, [current])

  function selectPage(next: number) {
    const clamped = Math.min(Math.max(next, 1), pageCount)
    if (clamped === current) return
    pendingFocus.current = true
    setPage(clamped)
  }

  return (
    <div ref={topRef} tabIndex={-1} className="outline-none">
      <ul className={listClassName}>
        {visible.map((product) => (
          <li key={product.id} className="relative min-w-0">
            <FavoriteHeart
              productId={product.id}
              title={product.title}
              className="absolute top-1 right-1 z-10"
            />
            <Link href={productPath(product.id)} className="vd-product-card flex h-full flex-col">
              <div className="flex aspect-[4/3] items-center justify-center bg-[#f7f5f1] p-3 sm:p-4">
                <Image
                  src={product.image.src}
                  alt=""
                  width={product.image.width}
                  height={product.image.height}
                  quality={90}
                  sizes="(min-width: 768px) 30vw, 45vw"
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="vd-product-title mt-4 line-clamp-2 min-h-[2.6em] font-heading text-base leading-tight font-bold sm:text-lg">
                {product.title}
              </h2>
              <p className="mt-2 line-clamp-2 min-h-[3rem] text-sm leading-6 text-muted-foreground">
                {product.description}
              </p>
              <p className="mt-auto pt-3 text-sm font-semibold tracking-wide text-gold">
                {formatPrice(product.price)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <ListingPagination
        current={current}
        pageCount={pageCount}
        start={start}
        end={end}
        total={products.length}
        onSelect={selectPage}
      />
    </div>
  )
}

function ListingPagination({
  current,
  pageCount,
  start,
  end,
  total,
  onSelect,
}: {
  current: number
  pageCount: number
  start: number
  end: number
  total: number
  onSelect: (page: number) => void
}) {
  return (
    <div className="mt-14 flex flex-col items-center gap-5">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {start + 1}–{end} of {total}
      </p>
      <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1">
        <button
          type="button"
          className="h-11 px-3 text-sm disabled:opacity-40"
          onClick={() => onSelect(current - 1)}
          disabled={current === 1}
        >
          Previous
        </button>
        {pageList(current, pageCount).map((entry, index) =>
          entry === "gap" ? (
            <span key={`gap-${index}`} className="px-1 text-sm text-muted-foreground" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              className={`h-11 min-w-11 px-2 text-sm ${
                entry === current ? "text-gold underline decoration-gold underline-offset-4" : ""
              }`}
              aria-label={`Page ${entry}`}
              aria-current={entry === current ? "page" : undefined}
              onClick={() => onSelect(entry)}
            >
              {entry}
            </button>
          ),
        )}
        <button
          type="button"
          className="h-11 px-3 text-sm disabled:opacity-40"
          onClick={() => onSelect(current + 1)}
          disabled={current === pageCount}
        >
          Next
        </button>
      </nav>
    </div>
  )
}

function pageList(current: number, count: number): Array<number | "gap"> {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1)
  const wanted = [1, count, current - 1, current, current + 1].filter(
    (page, index, all) => page >= 1 && page <= count && all.indexOf(page) === index,
  )
  wanted.sort((a, b) => a - b)
  const list: Array<number | "gap"> = []
  wanted.forEach((page, index) => {
    if (index > 0 && page - wanted[index - 1] > 1) list.push("gap")
    list.push(page)
  })
  return list
}
