"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useAgeConfirmed } from "@/components/age-gate"
import { useIntro } from "@/components/intro-state"
import { logoBoxInHeader, MARK_FILE, MARK_VISIBLE, placedFrame, type FrameBox } from "@/lib/intro-logo"
import { cn } from "@/lib/utils"

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
  const [band, setBand] = useState<{ top: number; bottom: number } | null>(null)
  const [wordmarkCue, setWordmarkCue] = useState(false)
  const playing = phase === "playing" && ageConfirmed
  const wordmarkVisible = phase === "done" || wordmarkCue

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const measure = () => {
      const header = document.querySelector("[data-site-header]")
      if (!header) return
      const stageRect = stage.getBoundingClientRect()
      const headerRect = header.getBoundingClientRect()
      const sectionRect = stage.parentElement?.getBoundingClientRect()
      setFrame(
        placedFrame(stageRect.width, stageRect.height, headerRect.height, stageRect.top, headerRect.top),
      )
      const logo = logoBoxInHeader(stageRect, headerRect)
      setLogoBox(logo)
      if (sectionRect) {
        const visibleH = logo.height * (MARK_VISIBLE.height / MARK_FILE.height)
        const visibleBottom =
          headerRect.top +
          logo.top +
          (MARK_VISIBLE.y / MARK_FILE.height) * logo.height +
          visibleH
        const room = sectionRect.bottom - visibleBottom
        const gap = Math.max(12, Math.min(36, room * 0.08))
        setBand({
          top: visibleBottom - sectionRect.top + gap,
          bottom: gap,
        })
      }
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
    if (phase !== "playing") return
    stageRef.current?.parentElement?.setAttribute("data-intro-fade", "")
  }, [phase])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !playing) return
    const lead = 1.8
    let frameId = 0
    let cued = false
    const check = () => {
      if (cued || !Number.isFinite(video.duration) || video.duration <= lead) return
      if (video.currentTime < video.duration - lead) return
      cued = true
      window.cancelAnimationFrame(frameId)
      setWordmarkCue(true)
    }
    const tick = () => {
      check()
      if (!cued) frameId = window.requestAnimationFrame(tick)
    }
    tick()
    video.addEventListener("timeupdate", check)
    return () => {
      window.cancelAnimationFrame(frameId)
      video.removeEventListener("timeupdate", check)
    }
  }, [playing])

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
      <div
        data-intro-wordmark=""
        className={cn(
          "pointer-events-none absolute inset-x-0 z-[5] flex min-h-0 items-center justify-center px-5 sm:px-12",
          wordmarkVisible ? "opacity-100" : "opacity-0",
        )}
        style={band ? { top: band.top, bottom: band.bottom } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/vital-defense-stacked.png"
          alt="Vital Defense"
          width={1467}
          height={824}
          draggable={false}
          className="max-h-full max-w-full object-contain"
        />
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
      <div
        data-intro-gold=""
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 z-10 h-px w-screen -translate-x-1/2 bg-gold"
      />
    </section>
  )
}
