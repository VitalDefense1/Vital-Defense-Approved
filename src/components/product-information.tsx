"use client"

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react"
import { ReviewForm } from "@/components/review-form"
import { StarReadout } from "@/components/star-rating"
import type { ProductReview, ProductSpecification } from "@/lib/sample-products"

const tabs = [
  { id: "description", label: "Description" },
  { id: "information", label: "Additional information" },
  { id: "reviews", label: "Reviews" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function ProductInformation({
  productId,
  description,
  specifications,
  reviews,
}: {
  productId: string
  description: string
  specifications: ProductSpecification[]
  reviews: ProductReview[]
}) {
  const [selected, setSelected] = useState<TabId>("description")
  const listRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const indicatorReady = useRef(false)
  const selectedIndex = tabs.findIndex((tab) => tab.id === selected)

  useLayoutEffect(() => {
    const list = listRef.current
    const indicator = indicatorRef.current
    if (!list || !indicator) return

    const measure = () => {
      const tab = tabRefs.current[selectedIndex]
      if (!tab) return
      indicator.style.width = `${tab.offsetWidth}px`
      indicator.style.transform = `translateX(${tab.offsetLeft}px)`
      if (!indicatorReady.current) {
        indicatorReady.current = true
        indicator.classList.add("vd-tab-indicator-ready")
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [selectedIndex])

  function selectTab(index: number) {
    const next = tabs[index]
    if (!next) return
    setSelected(next.id)
    tabRefs.current[index]?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      selectTab((selectedIndex + 1) % tabs.length)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      selectTab((selectedIndex - 1 + tabs.length) % tabs.length)
    } else if (event.key === "Home") {
      event.preventDefault()
      selectTab(0)
    } else if (event.key === "End") {
      event.preventDefault()
      selectTab(tabs.length - 1)
    }
  }

  return (
    <section className="mt-16 md:mt-24" aria-label="Product information">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Product information"
        className="relative flex border-b border-border"
      >
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selected
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`${productId}-tab-${tab.id}`}
              aria-controls={`${productId}-panel-${tab.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className="vd-text-link relative z-10 min-w-0 flex-1 px-1 pb-3 text-center text-[0.62rem] leading-tight font-semibold tracking-[0.03em] whitespace-nowrap text-muted-foreground aria-selected:text-foreground min-[380px]:text-xs sm:text-sm sm:tracking-[0.06em]"
              onClick={() => setSelected(tab.id)}
              onKeyDown={onKeyDown}
            >
              {tab.label}
            </button>
          )
        })}
        <span
          ref={indicatorRef}
          className="vd-tab-indicator pointer-events-none absolute bottom-0 left-0 h-0.5 bg-gold"
          aria-hidden="true"
        />
      </div>
      <div className="pt-8">
        <div
          role="tabpanel"
          id={`${productId}-panel-description`}
          aria-labelledby={`${productId}-tab-description`}
          hidden={selected !== "description"}
          tabIndex={0}
        >
          {description ? (
            <p className="max-w-3xl text-base leading-7">{description}</p>
          ) : null}
        </div>
        <div
          role="tabpanel"
          id={`${productId}-panel-information`}
          aria-labelledby={`${productId}-tab-information`}
          hidden={selected !== "information"}
          tabIndex={0}
        >
          {specifications.length > 0 ? (
            <dl className="max-w-3xl border-t border-border">
              {specifications.map((spec, index) => (
                <div
                  key={`${spec.label}-${index}`}
                  className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-border py-3 text-sm sm:grid-cols-[12rem_1fr]"
                >
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <div
          role="tabpanel"
          id={`${productId}-panel-reviews`}
          aria-labelledby={`${productId}-tab-reviews`}
          hidden={selected !== "reviews"}
          tabIndex={0}
        >
          {reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">NO REVIEWS YET</p>
          ) : (
            <ul className="max-w-3xl space-y-8">
              {reviews.map((review) => (
                <li key={review.id}>
                  <p className="font-semibold">{reviewName(review)}</p>
                  {review.verifiedPurchaser ? (
                    <p className="mt-1 text-sm text-muted-foreground">Verified purchaser</p>
                  ) : null}
                  {typeof review.rating === "number" ? (
                    <div className="mt-2">
                      <StarReadout rating={review.rating} />
                    </div>
                  ) : null}
                  <p className="mt-2 max-w-3xl text-base leading-7 whitespace-pre-wrap text-muted-foreground">
                    {review.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <ReviewForm productId={productId} />
        </div>
      </div>
    </section>
  )
}

function reviewName(review: ProductReview) {
  const first = review.firstName?.trim() ?? ""
  const initial = (review.lastInitial ?? "").trim().replace(/\.$/, "").charAt(0)
  if (first) {
    if (!/^[A-Za-z]$/.test(initial)) return first
    return `${first} ${initial}.`
  }
  const author = review.author?.trim() ?? ""
  if (!author || author.includes("@")) return ""
  const parts = author.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0]
  const last = parts[parts.length - 1].replace(/\.$/, "")
  if (last.length === 1 && /^[A-Za-z]$/.test(last)) return `${parts[0]} ${last}.`
  return parts[0]
}
