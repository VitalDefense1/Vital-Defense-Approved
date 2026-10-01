"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Pause, Play } from "lucide-react"

const DEFAULT_STILL = "/placeholders/hero-placeholder.jpg"

/**
 * The still image is a composition placeholder, not Vital Defense footage.
 * Pass `src` later to play a real muted, looping, inline video in this frame.
 */
export function FeatureVideo({
  src,
  poster = DEFAULT_STILL,
}: {
  src?: string
  poster?: string
}) {
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduceMotion(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  const motionOff = reduceMotion
  const holding = paused || motionOff

  return (
    <section
      aria-label="Footage placeholder"
      className="vd-stage relative w-full overflow-hidden border-b border-gold bg-[#e7e1d8]"
    >
      <div className={holding ? "vd-still vd-still-paused" : "vd-still"}>
        <Image
          src={poster}
          alt="Placeholder photograph of a scoped rifle on a light surface. This is not a Vital Defense product photo."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {src ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={!motionOff && !paused}
          preload="metadata"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/25 to-transparent" />
      <div className="relative flex h-[min(78vw,720px)] items-end justify-between gap-4 px-4 py-4 sm:h-[min(52vw,760px)] sm:px-6 sm:py-6">
        <p className="max-w-xs text-sm leading-5 text-white">
          Placeholder photograph. Your video replaces this still.
        </p>
        <button
          type="button"
          className="pointer-events-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1A1917] disabled:cursor-not-allowed disabled:opacity-70"
          aria-pressed={holding}
          disabled={motionOff}
          onClick={() => setPaused((value) => !value)}
        >
          {holding ? (
            <Play className="size-[18px]" strokeWidth={1.5} aria-hidden />
          ) : (
            <Pause className="size-[18px]" strokeWidth={1.5} aria-hidden />
          )}
          <span className="sr-only">
            {motionOff
              ? "Motion is off because reduced motion is enabled"
              : paused
                ? "Play motion"
                : "Pause motion"}
          </span>
        </button>
      </div>
    </section>
  )
}
