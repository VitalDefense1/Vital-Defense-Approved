"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { formatPrice, useCart } from "@/components/cart-state"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: "scoped-rifle",
    src: "/photos/rifle-scoped.png",
    width: 1180,
    height: 563,
    title: "Scoped rifle, camouflage sling",
    price: 2450,
  },
  {
    id: "camo-rifle",
    src: "/photos/rifle-camo.png",
    width: 1197,
    height: 575,
    title: "Camouflage rifle, desert sling",
    price: 2180,
  },
  {
    id: "dot-rifle",
    src: "/photos/rifle-dot.jpg",
    width: 1512,
    height: 2016,
    title: "Black rifle with a dot sight",
    price: 1640,
  },
  {
    id: "rail-rifle",
    src: "/photos/rifle-rail.jpg",
    width: 1512,
    height: 2016,
    title: "Black rifle with optic and light",
    price: 1890,
  },
  {
    id: "compact",
    src: "/photos/pdw.png",
    width: 1140,
    height: 496,
    title: "Compact firearm with an optic",
    price: 1520,
  },
  {
    id: "pistol-optic",
    src: "/photos/pistol-optic.png",
    width: 760,
    height: 695,
    title: "Pistol with a red-dot optic",
    price: 1275,
  },
  {
    id: "pistol-chevron",
    src: "/photos/pistol-chevron.png",
    width: 760,
    height: 641,
    title: "Pistol with chevron slide cuts",
    price: 1340,
  },
  {
    id: "pistol-mag",
    src: "/photos/pistol-mag.jpg",
    width: 1320,
    height: 1320,
    title: "Pistol with an extended magazine",
    price: 1410,
  },
] as const

const loopSlides = (["prev", "current", "next"] as const).flatMap((copy) =>
  slides.map((slide) => ({ ...slide, copy, key: `${copy}-${slide.id}` })),
)

function lookFor(distance: number, reduceMotion: boolean) {
  const abs = Math.abs(distance)
  const t = Math.min(abs, 1)
  const extra = Math.min(Math.max(abs - 1, 0), 1)
  return {
    scale: 1 - 0.1 * t - 0.05 * extra,
    opacity: 1 - 0.38 * t - 0.2 * extra,
    blur: reduceMotion ? 0 : 2 * t + 1.25 * extra,
    active: abs < 0.45,
  }
}

export function ProductShowcase() {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
  const faceRefs = useRef<Array<HTMLDivElement | null>>([])
  const positionRef = useRef<number>(slides.length)
  const lockRef = useRef(false)
  const animatingRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const { items, addItem } = useCart()

  const measure = useCallback(() => {
    const track = trackRef.current
    const nodes = slideRefs.current
    if (!track || nodes.length < loopSlides.length || nodes.some((node) => !node)) return null
    const typed = nodes as HTMLDivElement[]
    const step = typed[1].offsetLeft - typed[0].offsetLeft
    if (step <= 0) return null
    const setWidth = step * slides.length
    const first = typed[slides.length]
    const base = first.offsetLeft + first.offsetWidth / 2 - track.clientWidth / 2
    return { track, nodes: typed, step, setWidth, base }
  }, [])

  const normalize = useCallback(() => {
    if (lockRef.current) return
    const metrics = measure()
    if (!metrics) return
    const { track, base, setWidth } = metrics
    const left = track.scrollLeft
    let next = left
    if (left < base - 0.5) next = left + setWidth
    else if (left >= base + setWidth - 0.5) next = left - setWidth
    if (Math.abs(next - left) < 0.5) return
    lockRef.current = true
    const previous = track.style.scrollBehavior
    track.style.scrollBehavior = "auto"
    track.scrollTo({ left: next, behavior: "instant" })
    track.style.scrollBehavior = previous
    lockRef.current = false
  }, [measure])

  const apply = useCallback(() => {
    const metrics = measure()
    if (!metrics) return
    const { track, nodes, step } = metrics
    const mid = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    let closestDistance = Number.POSITIVE_INFINITY
    nodes.forEach((node, i) => {
      const center = node.offsetLeft + node.offsetWidth / 2
      const distance = (center - mid) / step
      const look = lookFor(distance, reduceMotion)
      const face = faceRefs.current[i]
      if (face) {
        face.style.transform = `scale(${look.scale})`
        face.style.opacity = String(look.opacity)
        face.style.filter = look.blur < 0.05 ? "none" : `blur(${look.blur}px)`
        face.style.pointerEvents = look.active ? "auto" : "none"
      }
      const abs = Math.abs(distance)
      if (abs < closestDistance) {
        closestDistance = abs
        closest = i
      }
    })
    positionRef.current = closest
    const real = closest % slides.length
    setIndex((current) => (current === real ? current : real))
  }, [measure, reduceMotion])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const metrics = measure()
    if (metrics) {
      track.style.scrollBehavior = "auto"
      track.scrollTo({ left: metrics.base, behavior: "instant" })
      track.style.scrollBehavior = ""
    }
    apply()

    let frame = 0
    const onScroll = () => {
      if (!animatingRef.current) normalize()
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(apply)
    }
    const onScrollEnd = () => {
      animatingRef.current = false
      normalize()
      apply()
    }
    const releaseAnimation = () => {
      animatingRef.current = false
    }
    const onResize = () => {
      const next = measure()
      if (!next) return
      const real = ((positionRef.current % slides.length) + slides.length) % slides.length
      const node = slideRefs.current[real + slides.length]
      if (!node) return
      next.track.scrollTo({
        left: node.offsetLeft + node.offsetWidth / 2 - next.track.clientWidth / 2,
        behavior: "instant",
      })
      apply()
    }
    track.addEventListener("scroll", onScroll, { passive: true })
    track.addEventListener("scrollend", onScrollEnd)
    track.addEventListener("pointerdown", releaseAnimation)
    track.addEventListener("wheel", releaseAnimation, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener("scroll", onScroll)
      track.removeEventListener("scrollend", onScrollEnd)
      track.removeEventListener("pointerdown", releaseAnimation)
      track.removeEventListener("wheel", releaseAnimation)
      window.removeEventListener("resize", onResize)
    }
  }, [apply, measure, normalize])

  function go(direction: number) {
    const metrics = measure()
    if (!metrics) return
    animatingRef.current = !reduceMotion
    metrics.track.scrollBy({
      left: direction * metrics.step,
      behavior: reduceMotion ? "instant" : "smooth",
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      go(1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      go(-1)
    }
  }

  return (
    <section
      className="overflow-x-clip py-16 md:py-24"
      aria-roledescription="carousel"
      aria-labelledby="product-showcase"
      onKeyDown={onKeyDown}
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="mx-auto mb-6 block h-px w-12 bg-gold" aria-hidden="true" />
        <h2
          id="product-showcase"
          className="font-heading text-[2.15rem] leading-[1.02] font-medium sm:text-5xl"
        >
          FEATURED ITEMS
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
          Photographs from the supplied files. Prices are for this preview, not a
          published list.
        </p>
      </div>

      <div className="relative mt-12 md:mt-16">
        <button
          type="button"
          className="absolute top-[22%] left-4 z-20 hidden size-11 items-center justify-center rounded-full border border-border bg-white text-[#1A1917] hover:text-gold md:inline-flex"
          aria-label="Previous photograph"
          onClick={() => go(-1)}
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} aria-hidden />
        </button>
        <button
          type="button"
          className="absolute top-[22%] right-4 z-20 hidden size-11 items-center justify-center rounded-full border border-border bg-white text-[#1A1917] hover:text-gold md:inline-flex"
          aria-label="Next photograph"
          onClick={() => go(1)}
        >
          <ChevronRight className="size-5" strokeWidth={1.5} aria-hidden />
        </button>

        <div
          ref={trackRef}
          tabIndex={0}
          className={cn(
            "vd-showcase relative flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain py-2 outline-none [--vd-slide:min(64vw,38rem)] [--vd-peek:calc((100%_-_var(--vd-slide))_/_2)] scroll-px-[var(--vd-peek)] px-[var(--vd-peek)] md:gap-10",
            reduceMotion ? "scroll-auto" : "scroll-smooth",
          )}
          aria-label="Photograph showcase"
        >
          {loopSlides.map((slide, slideIndex) => {
            const qty = items.find((item) => item.id === slide.id)?.qty ?? 0
            const realIndex = slideIndex % slides.length
            const hiddenCopy = slide.copy !== "current"
            return (
              <div
                key={slide.key}
                ref={(node) => {
                  slideRefs.current[slideIndex] = node
                }}
                className="w-[var(--vd-slide)] shrink-0 snap-center snap-always"
                role="group"
                aria-roledescription="slide"
                aria-hidden={hiddenCopy || undefined}
                aria-label={
                  hiddenCopy ? undefined : `${realIndex + 1} of ${slides.length}`
                }
                onClick={(event) => {
                  if (event.target !== event.currentTarget) return
                  const track = trackRef.current
                  const node = slideRefs.current[slideIndex]
                  if (!track || !node) return
                  const delta =
                    node.offsetLeft + node.offsetWidth / 2 - (track.scrollLeft + track.clientWidth / 2)
                  animatingRef.current = !reduceMotion
                  track.scrollBy({
                    left: delta,
                    behavior: reduceMotion ? "instant" : "smooth",
                  })
                }}
              >
                <div
                  ref={(node) => {
                    faceRefs.current[slideIndex] = node
                  }}
                  data-slide-face
                  data-copy={slide.copy}
                  className="origin-center text-center will-change-[transform,filter,opacity]"
                >
                  <div className="flex h-52 items-center justify-center sm:h-64 md:h-72">
                    <Image
                      src={slide.src}
                      alt={hiddenCopy ? "" : slide.title}
                      width={slide.width}
                      height={slide.height}
                      quality={90}
                      sizes="(min-width: 768px) 608px, 64vw"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-medium tracking-[0.06em] uppercase sm:text-2xl">
                    {slide.title}
                  </h3>
                  <p className="mt-2 text-sm tracking-wide text-gold">
                    {formatPrice(slide.price)}
                  </p>
                  <Button
                    type="button"
                    tabIndex={hiddenCopy ? -1 : 0}
                    className="mt-4 h-11 bg-gold px-5 text-white hover:bg-[#7a623c]"
                    onClick={() =>
                      addItem({ id: slide.id, title: slide.title, price: slide.price })
                    }
                  >
                    Add to cart
                  </Button>
                  <p className="mt-3 min-h-5 text-sm text-muted-foreground" role="status">
                    {qty > 0 ? `In the cart · ${qty}` : ""}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {slides[index].title}, slide {index + 1} of {slides.length}.
        </p>
      </div>
    </section>
  )
}
