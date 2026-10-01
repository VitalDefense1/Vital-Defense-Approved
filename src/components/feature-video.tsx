"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Pause, Play } from "lucide-react"

const DEFAULT_STILL = "/photos/rifle-scoped.png"

/**
 * The opening frame holds a supplied still. Pass `src` when there is real
 * footage. Nothing here is a generated firearm video.
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
      className="relative w-full overflow-hidden bg-white"
    >
      <div className={`vd-still px-3 pt-5 pb-16 sm:px-8 sm:pt-8 sm:pb-20${holding ? " vd-still-paused" : ""}`}>
        <Image
          src={poster}
          alt="Black scoped rifle with a camouflage sling, from the supplied photographs."
          width={1180}
          height={563}
          quality={90}
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="mx-auto h-auto w-full max-w-6xl"
        />
      </div>
      {src ? (
        <video
          className="absolute inset-0 h-full w-full bg-white object-contain"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={!motionOff && !paused}
          preload="metadata"
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 px-4 py-4 sm:px-6">
        <div className="mb-3 h-px w-10 bg-gold" aria-hidden="true" />
        <div className="flex items-end justify-between gap-4">
        <p className="max-w-xs text-sm leading-5 text-[#1A1917]">
          Still photograph. Your video replaces this frame.
        </p>
        {src ? (
          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-[#1A1917] disabled:cursor-not-allowed disabled:opacity-70"
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
    </section>
  )
}
