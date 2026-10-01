import Image from "next/image"
import Link from "next/link"
import { CatalogStrip } from "@/components/catalog-nav"
import { ContactPanel } from "@/components/contact-panel"
import { FeatureVideo } from "@/components/feature-video"
import { ProductShowcase } from "@/components/product-showcase"

/**
 * Layered composition is a lasting requirement for this preview.
 * Photographs overlap panels and cross into neighboring sections.
 * Headings stay centered. Imagery stays asymmetric.
 * Do not redraw the logo, the firearms, or the accessories.
 */

const featuredBrands = [
  {
    src: "/brands/hk.png",
    alt: "HK",
    width: 3840,
    height: 2630,
    frame: "max-h-[4.25rem] lg:max-h-20",
  },
  {
    src: "/brands/radian.png",
    alt: "Radian",
    width: 1904,
    height: 1326,
    frame: "max-h-[4.5rem] lg:max-h-20",
  },
  {
    src: "/brands/iray.png",
    alt: "InfiRay Outdoor, iRayUSA",
    width: 556,
    height: 338,
    frame: "max-h-16 lg:max-h-[4.75rem]",
  },
  {
    src: "/brands/surefire.png",
    alt: "SureFire",
    width: 1266,
    height: 373,
    frame: "max-h-[2.85rem] max-w-full lg:max-h-16 lg:max-w-[13.5rem]",
  },
  {
    src: "/brands/dark-forge.png",
    alt: "Dark Forge",
    width: 463,
    height: 373,
    frame: "max-h-20 lg:max-h-[5.75rem]",
  },
  {
    src: "/brands/atlas-gunworks.png",
    alt: "Atlas Gunworks",
    width: 303,
    height: 205,
    frame: "max-h-[4.75rem] lg:max-h-[5.5rem]",
  },
]

export default function HomePage() {
  return (
    <main>
      <FeatureVideo src="/video/opening.mp4?v=3" />

      <section className="relative overflow-x-clip px-6 py-20 md:py-28 lg:py-32">
        <Image
          src="/photos/shield-rifle.jpg"
          alt=""
          width={1536}
          height={1024}
          quality={90}
          sizes="(min-width: 768px) 1100px, 175vw"
          className="pointer-events-none absolute top-1/2 left-0 z-[1] h-auto w-[175vw] max-w-none -translate-x-[39.5%] -translate-y-1/2 opacity-[0.16] md:w-[1100px]"
        />
        <div className="opening-copy relative z-20 mx-auto max-w-4xl text-center">
          <h1 className="font-oswald text-[2.05rem] leading-[1.08] font-bold tracking-[0.045em] uppercase sm:text-5xl lg:text-[3.55rem] lg:leading-[1.02] lg:tracking-[0.06em]">
            Vital Defense.
            <br />
            Built on experience.
          </h1>
          <span className="mx-auto mt-8 block h-px w-12 bg-gold md:mt-10" aria-hidden="true" />
          <p className="mx-auto mt-8 max-w-2xl font-rajdhani text-[0.95rem] leading-7 font-medium tracking-[0.11em] uppercase sm:text-lg sm:leading-8 md:mt-10 lg:text-xl lg:leading-9 lg:tracking-[0.12em]">
            Veteran-owned and based in Lake City, Florida. Vital Defense brings a
            personal approach to a broad selection of firearms, optics, and
            accessories.
          </p>
        </div>
      </section>

      <section className="relative px-6 pt-10 pb-12 md:pt-16 md:pb-16" aria-labelledby="featured-brands">
        <div className="relative z-20 mx-auto flex w-full max-w-3xl items-center justify-center gap-3 @container sm:gap-4">
          <span
            aria-hidden="true"
            className="h-px w-[clamp(1.25rem,7cqi,4rem)] shrink-0 bg-gold"
          />
          <h2
            id="featured-brands"
            className="font-heading text-[clamp(1.2rem,8.6cqi,2.5rem)] leading-[1.15] font-bold whitespace-nowrap"
          >
            Featured brands
          </h2>
          <span
            aria-hidden="true"
            className="h-px w-[clamp(1.25rem,7cqi,4rem)] shrink-0 bg-gold"
          />
        </div>
        <div className="relative mx-auto mt-16 max-w-6xl lg:mt-20">
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 left-0 hidden h-px bg-border lg:block"
          />
          <ul className="relative grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 pt-8 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:justify-between lg:gap-x-8 lg:pt-10">
            {featuredBrands.map((brand) => (
              <li key={brand.src} className="flex h-24 w-full items-center justify-center lg:h-28 lg:w-auto">
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={brand.width}
                  height={brand.height}
                  quality={90}
                  className={`relative z-10 h-auto w-auto object-contain ${brand.frame}`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto mt-20 max-w-6xl md:mt-28">
          {/* 2.105% is how far the firearm sits right of center inside the file. */}
          <Image
            src="/photos/pdw.png"
            alt="Black compact firearm with an optic, from the supplied photographs."
            width={1140}
            height={496}
            quality={90}
            sizes="(min-width: 768px) 780px, 100vw"
            className="relative z-10 h-auto w-full md:mx-auto md:w-[70%] md:-translate-x-[2.105%]"
          />
        </div>
      </section>

      <ContactPanel titleAs="h2" />
      <ProductShowcase />
      <CatalogStrip />
      <div className="flex justify-center px-6 pt-2 pb-16 md:pb-20">
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-gold px-5 text-sm font-semibold tracking-[0.07em] whitespace-nowrap text-white transition-colors hover:bg-[#7a623c]"
        >
          Contact us
        </Link>
      </div>
    </main>
  )
}
