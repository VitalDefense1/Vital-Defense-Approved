"use client"

import { useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"

export type GalleryImage = {
  src: string
  width: number
  height: number
  alt?: string
}

export const PRODUCT_IMAGE_DISCLAIMER =
  "FOR ILLUSTRATION PURPOSES ONLY, THIS IMAGE MAY NOT BE AN EXACT REPRESENTATION OF THE PRODUCT"

export function ProductGallery({
  images,
  title,
}: {
  images: GalleryImage[]
  title: string
}) {
  const [active, setActive] = useState(0)
  const frames = images.length > 0 ? images : []
  const index = Math.min(active, Math.max(frames.length - 1, 0))
  const image = frames[index]

  if (!image) return null

  return (
    <div>
      <GalleryFrame image={image} title={title} priority={index === 0} />
      {frames.length > 1 ? (
        <div className="mt-3 flex gap-2" role="group" aria-label="More product images">
          {frames.map((frame, frameIndex) => (
            <button
              key={`${frame.src}-${frameIndex}`}
              type="button"
              className={`flex size-16 items-center justify-center bg-[#f7f5f1] p-1 ${
                frameIndex === index ? "outline outline-1 outline-gold" : ""
              }`}
              aria-label={`Image ${frameIndex + 1} of ${frames.length}`}
              aria-pressed={frameIndex === index}
              onClick={() => setActive(frameIndex)}
            >
              <Image
                src={frame.src}
                alt=""
                width={frame.width}
                height={frame.height}
                quality={75}
                sizes="64px"
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function GalleryFrame({
  image,
  title,
  priority,
}: {
  image: GalleryImage
  title: string
  priority: boolean
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const overlay = overlayRef.current
    if (!frame || !overlay) return

    const measure = () => {
      const width = frame.clientWidth
      const height = frame.clientHeight
      if (width === 0 || height === 0 || image.width === 0 || image.height === 0) return
      const scale = Math.min(width / image.width, height / image.height)
      const fittedWidth = image.width * scale
      const fittedHeight = image.height * scale
      overlay.style.left = `${(width - fittedWidth) / 2}px`
      overlay.style.top = `${(height - fittedHeight) / 2}px`
      overlay.style.width = `${fittedWidth}px`
      overlay.style.height = `${fittedHeight}px`
      overlay.classList.remove("invisible")
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [image.width, image.height, image.src])

  return (
    <div ref={frameRef} data-gallery-frame="" className="relative aspect-[4/3] bg-[#f7f5f1]">
      <Image
        src={image.src}
        alt={image.alt ?? title}
        fill
        quality={90}
        priority={priority}
        sizes="(min-width: 768px) 40vw, 100vw"
        className="object-contain"
      />
      <div
        ref={overlayRef}
        data-gallery-overlay=""
        className="pointer-events-none invisible absolute"
      >
        <p className="absolute inset-x-2 bottom-2 bg-white/80 px-2 py-1.5 text-center text-[0.65rem] leading-snug font-semibold text-[#1a1917] sm:text-xs">
          {PRODUCT_IMAGE_DISCLAIMER}
        </p>
      </div>
    </div>
  )
}
