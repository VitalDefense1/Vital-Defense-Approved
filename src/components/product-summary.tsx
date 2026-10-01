"use client"

import { useEffect, useState } from "react"

const REVEAL_MS = 1438

export function ProductSummary({ text }: { text: string }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (text.length === 0) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let start = 0
    let frame = 0
    let cancelled = false

    const tick = (now: number) => {
      if (cancelled) return
      if (!start) start = now
      const progress = Math.min((now - start) / REVEAL_MS, 1)
      setShown(Math.ceil(progress * text.length))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [text])

  if (!text) return null

  return (
    <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground" data-product-summary="">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <span key={index} className="vd-type-char" data-revealed={index < shown ? "true" : "false"}>
            {char}
          </span>
        ))}
      </span>
    </p>
  )
}
