"use client"

import { useState } from "react"
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
      <div className="flex aspect-[4/3] flex-col bg-[#f7f5f1]">
        <div className="flex min-h-0 flex-1 items-center justify-center px-4 pt-4 sm:px-6 sm:pt-6">
          <Image
            src={image.src}
            alt={image.alt ?? title}
            width={image.width}
            height={image.height}
            quality={90}
            priority={index === 0}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <p className="pointer-events-none bg-white/85 px-3 py-2 text-center text-[0.65rem] leading-snug font-semibold text-[#1a1917] sm:text-xs">
          {PRODUCT_IMAGE_DISCLAIMER}
        </p>
      </div>
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
