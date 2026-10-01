import Image from "next/image"
import Link from "next/link"
import { ContactPanel } from "@/components/contact-panel"
import { FeatureVideo } from "@/components/feature-video"
import { ProductShowcase } from "@/components/product-showcase"
import { departments, proposedHome } from "@/lib/navigation"

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

const departmentLines: Record<string, string> = {
  rifles: "Semi-auto through single shot.",
  handguns: "Pistols, revolvers, derringers.",
  shotguns: "Pumps, pairs, and over-unders.",
}

export default function HomePage() {
  return (
    <main>
      <FeatureVideo />

      <section className="relative overflow-x-clip px-6 pt-16 pb-8 md:pt-24 md:pb-14">
        <Image
          src="/photos/shield-rifle.jpg"
          alt=""
          width={1536}
          height={1024}
          quality={90}
          sizes="(min-width: 768px) 1100px, 175vw"
          className="pointer-events-none absolute top-1/2 left-0 z-[1] h-auto w-[175vw] max-w-none -translate-x-[39.5%] -translate-y-1/2 opacity-[0.16] md:w-[1100px]"
        />
        <div className="opening-copy relative z-20 mx-auto max-w-5xl text-center">
          <p className="text-sm tracking-wide text-gold">Lake City, Florida</p>
          <span className="mx-auto mt-6 block h-px w-12 bg-gold" aria-hidden="true" />
          <h1 className="mt-7 font-heading text-[2.15rem] leading-[1.02] font-medium sm:text-6xl lg:text-[4.75rem] lg:leading-[0.96]">
            Rifles, handguns,
            <br />
            and shotguns.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8">{proposedHome.deck}</p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {proposedHome.support}
          </p>
          <ul className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-16">
            {departments.map((department) => (
              <li key={department.slug}>
                <Link href={`/${department.slug}`} className="group block text-center">
                  <span className="block font-heading text-2xl group-hover:text-gold">
                    {department.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {departmentLines[department.slug]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative px-6 pt-10 pb-12 md:pt-16 md:pb-16" aria-labelledby="featured-brands">
        <div className="relative z-20 mx-auto max-w-3xl text-center">
          <h2
            id="featured-brands"
            className="font-heading text-[2.15rem] leading-[1.02] font-medium sm:text-5xl"
          >
            Featured
            <br />
            brands
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
            Logo files supplied for this preview, shown in their original colors.
          </p>
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
          <Image
            src="/photos/pdw.png"
            alt="Black compact firearm with an optic, from the supplied photographs."
            width={1140}
            height={496}
            quality={90}
            sizes="(min-width: 768px) 780px, 100vw"
            className="relative z-10 h-auto w-full md:w-[70%]"
          />
        </div>
      </section>

      <ContactPanel titleAs="h2" />
      <ProductShowcase />
    </main>
  )
}
