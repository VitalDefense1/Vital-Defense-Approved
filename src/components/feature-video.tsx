"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useAgeConfirmed } from "@/components/age-gate"
import { useIntro } from "@/components/intro-state"
import { containedFrame, logoBoxInHeader, type FrameBox } from "@/lib/intro-logo"

/**
 * Plays the opening film once, after age confirmation.
 * The stage stays white until the first frame, then gives the header its logo.
 */
export function FeatureVideo({ src }: { src: string }) {
  const { phase, finish, setLogoBox, noteStarted } = useIntro()
  const ageConfirmed = useAgeConfirmed()
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [frame, setFrame] = useState<FrameBox | null>(null)
  const [ready, setReady] = useState(false)
  const playing = phase === "playing" && ageConfirmed

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const measure = () => {
      const header = document.querySelector("[data-site-header]")
      if (!header) return
      const stageRect = stage.getBoundingClientRect()
      setFrame(containedFrame(stageRect.width, stageRect.height))
      setLogoBox(logoBoxInHeader(stageRect, header.getBoundingClientRect()))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
      setLogoBox(null)
    }
  }, [setLogoBox])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !playing) return
    noteStarted()
    let cancelled = false
    const pending = video.play()
    if (pending) {
      pending.catch((error: unknown) => {
        if (cancelled) return
        if (error instanceof DOMException && error.name === "AbortError") return
        finish()
      })
    }
    return () => {
      cancelled = true
    }
  }, [playing, finish, noteStarted])

  const edge = frame ? Math.min(14, frame.height * (12 / 512)) : 8

  return (
    <section aria-label="Opening" data-intro={phase} className="relative w-full bg-white">
      <div className="px-3 pt-5 pb-16 sm:px-8 sm:pt-8" aria-hidden="true">
        <div className="mx-auto aspect-[1180/563] w-full max-w-6xl" />
      </div>
      <div
        ref={stageRef}
        data-intro-stage=""
        className="pointer-events-none absolute inset-x-0 -top-[4.75rem] bottom-0 overflow-hidden bg-white sm:-top-28 lg:-top-36"
      >
        {playing ? (
          <video
            ref={videoRef}
            className="absolute bg-white object-fill"
            style={
              frame
                ? {
                    left: frame.left,
                    top: frame.top,
                    width: frame.width,
                    height: frame.height,
                    opacity: ready ? 1 : 0,
                  }
                : {
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: ready ? 1 : 0,
                  }
            }
            src={src}
            muted
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            onEnded={() => finish()}
            onError={() => finish()}
          />
        ) : null}
        {playing && ready && frame ? (
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              left: frame.left,
              top: frame.top,
              width: frame.width,
              height: frame.height,
              boxShadow: `inset 0 0 ${edge}px ${Math.max(2, edge / 3)}px #fff`,
            }}
          />
        ) : null}
      </div>
      {playing ? (
        <button
          type="button"
          className="absolute right-4 bottom-3 z-20 bg-transparent text-[11px] tracking-[0.16em] text-[#1A1917]/50 uppercase hover:text-gold"
          onClick={() => finish()}
        >
          Skip intro
        </button>
      ) : null}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-px bg-gold" />
    </section>
  )
}
