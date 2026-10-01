"use client"

import { useState, type KeyboardEvent } from "react"

const STAR_PATH =
  "M12 2.4 14.7 8.3 21.1 9.1 16.4 13.5 17.6 19.8 12 16.7 6.4 19.8 7.6 13.5 2.9 9.1 9.3 8.3 12 2.4Z"

function halvesToLabel(halves: number) {
  const value = halves / 2
  return Number.isInteger(value) ? `${value} / 5` : `${value.toFixed(1)} / 5`
}

function starFill(halves: number | null, star: number): 0 | 0.5 | 1 {
  if (halves == null) return 0
  const value = halves / 2
  if (value >= star) return 1
  if (value + 0.5 >= star) return 0.5
  return 0
}

function StarShape({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
      <path
        d={STAR_PATH}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.25}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarFace({ fill }: { fill: 0 | 0.5 | 1 }) {
  return (
    <span className="relative block size-8 text-gold">
      <StarShape filled={false} />
      {fill > 0 ? (
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: fill === 1 ? "100%" : "50%" }}
        >
          <StarShape filled />
        </span>
      ) : null}
    </span>
  )
}

export function StarReadout({ rating }: { rating: number }) {
  const halves = Math.round(rating * 2)
  return (
    <span className="inline-flex items-center gap-2">
      <span className="sr-only">{halvesToLabel(halves).replace(" / ", " out of ")}</span>
      <span aria-hidden="true" className="inline-flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarFace key={star} fill={starFill(halves, star)} />
        ))}
      </span>
    </span>
  )
}

export function StarRating({
  value,
  onChange,
  labelledBy,
  describedBy,
  invalid,
}: {
  value: number | null
  onChange: (value: number) => void
  labelledBy: string
  describedBy?: string
  invalid?: boolean
}) {
  const selected = value == null ? null : Math.round(value * 2)
  const [hover, setHover] = useState<number | null>(null)
  const active = hover ?? selected

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next = selected
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      next = selected == null ? 1 : Math.min(10, selected + 1)
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      next = selected == null ? 10 : Math.max(1, selected - 1)
    } else if (event.key === "Home") {
      next = 1
    } else if (event.key === "End") {
      next = 10
    } else {
      return
    }
    event.preventDefault()
    onChange(next / 2)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        role="slider"
        tabIndex={0}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        aria-valuemin={0.5}
        aria-valuemax={5}
        aria-valuenow={selected == null ? undefined : selected / 2}
        aria-valuetext={selected == null ? "No rating selected" : halvesToLabel(selected)}
        className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
        onKeyDown={onKeyDown}
        onPointerLeave={() => setHover(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="relative block size-8">
            <StarFace fill={starFill(active, star)} />
            <span
              className="absolute inset-y-0 left-0 w-1/2"
              onPointerEnter={() => setHover(star * 2 - 1)}
              onClick={() => onChange(star - 0.5)}
            />
            <span
              className="absolute inset-y-0 right-0 w-1/2"
              onPointerEnter={() => setHover(star * 2)}
              onClick={() => onChange(star)}
            />
          </span>
        ))}
      </div>
      <p className="min-w-14 text-sm font-semibold text-gold" aria-hidden="true">
        {active == null ? "" : halvesToLabel(active)}
      </p>
    </div>
  )
}
