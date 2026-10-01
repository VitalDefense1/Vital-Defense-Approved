"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Pause, Play } from "lucide-react"

const DEFAULT_STILL = "/photos/rifle-scoped.png"

/**
 * The opening frame holds a supplied still. Pass `src` when there is real
 * footage. Nothing here is a generated firearm video.
 * The frame reaches the top of the page, under the header, without moving
 * the sections below.
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
      aria-label="Opening photograph"
      className="relative w-full bg-white"
    >
      <div className="px-3 pt-5 pb-16 sm:px-8 sm:pt-8" aria-hidden="true">
        <div className="mx-auto aspect-[1180/563] w-full max-w-6xl" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 -top-[4.75rem] bottom-0 overflow-hidden sm:-top-28 lg:-top-36">
        <div className={`vd-still absolute inset-0${holding ? " vd-still-paused" : ""}`}>
          <Image
            src={poster}
            alt="Black scoped rifle with a camouflage sling, from the supplied photographs."
            fill
            quality={90}
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {src ? (
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay={!motionOff && !paused}
            preload="metadata"
          />
        ) : null}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/80 via-white/35 to-transparent sm:h-36 lg:h-44" />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pt-4 pb-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <p className="max-w-xs pb-3 text-sm leading-5 text-[#1A1917]">
            Still photograph. Your video replaces this frame.
          </p>
          {src ? (
            <button
              type="button"
              className="mb-3 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-[#1A1917] disabled:cursor-not-allowed disabled:opacity-70"
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
          ) : null}
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-px bg-gold" />
    </section>
  )
}
