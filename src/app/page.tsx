import Image from "next/image"
import Link from "next/link"
import { ContactPanel } from "@/components/contact-panel"
import { FeatureVideo } from "@/components/feature-video"
import { departments, proposedHome } from "@/lib/navigation"

const brandSlots = ["01", "02", "03", "04", "05", "06"]

const departmentLines: Record<string, string> = {
  rifles: "Semi-auto through single shot.",
  handguns: "Pistols, revolvers, derringers.",
  shotguns: "Pumps, pairs, and over-unders.",
}

export default function HomePage() {
  return (
    <main>
      <FeatureVideo />

      <section className="relative overflow-x-clip px-6 pt-20 pb-8 md:pt-28 md:pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-[6%] hidden h-80 w-[42%] bg-[#ebe4d8] md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-16 left-[9%] hidden h-px w-20 bg-gold md:block"
        />
        <div className="opening-copy relative mx-auto max-w-5xl text-center">
          <p className="text-sm text-muted-foreground">Lake City, Florida</p>
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
          <ul className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-14">
            {departments.map((department, index) => (
              <li key={department.slug}>
                <Link href={`/${department.slug}`} className="group inline-flex items-baseline gap-3">
                  <span className="text-sm text-gold">0{index + 1}</span>
                  <span className="text-left">
                    <span className="block font-heading text-2xl group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
                      {department.label}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {departmentLines[department.slug]}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-x-clip px-6 py-20 md:py-32" aria-labelledby="featured-brands">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="featured-brands"
            className="font-heading text-[2.15rem] leading-[1.02] font-medium sm:text-5xl"
          >
            Featured
            <br />
            brands
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
            These marks are placeholders. No brand is shown as a partner, and no
            logo file has been authorized yet.
          </p>
        </div>
        <div className="relative mx-auto mt-16 max-w-6xl lg:mt-20">
          <div
            aria-hidden="true"
            className="absolute top-10 right-0 left-0 hidden h-px bg-border lg:block"
          />
          <ul className="relative grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
            {brandSlots.map((slot) => (
              <li key={slot} className="flex flex-col items-center">
                <span className="relative z-10 flex size-20 items-center justify-center rounded-full border border-border bg-background font-heading text-xl">
                  {slot}
                </span>
                <span className="mt-4 text-sm text-muted-foreground">Placeholder</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-x-clip px-5 pt-8 pb-24 md:px-8 md:pt-4 md:pb-36" aria-labelledby="composite">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="composite"
            className="font-heading text-[2.15rem] leading-[1.02] font-medium sm:text-5xl lg:text-6xl"
          >
            One photograph,
            <br />
            three firearms.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
            Your composite belongs in this one frame. It is not set beside other
            photos.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-6xl md:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-8 right-3 bottom-16 left-3 bg-[#ebe4d8] md:top-14 md:right-[7%] md:bottom-10 md:left-[14%]"
          />
          <div
            aria-hidden="true"
            className="absolute top-8 left-3 h-px w-14 bg-gold md:top-14 md:left-[16%]"
          />
          <figure className="showcase-frame relative z-10 -mx-5 pt-16 md:mx-0 md:ml-[4%] md:w-[94%] md:pt-24">
            <Image
              src="/placeholders/composite-placeholder.jpg"
              alt="Placeholder photograph of a rifle, a handgun, and a shotgun together. This is not Vital Defense’s own composite."
              width={1280}
              height={720}
              sizes="(min-width: 1152px) 1080px, 100vw"
              loading="eager"
              className="h-auto w-full shadow-[0_22px_44px_-26px_rgba(26,25,23,0.55)]"
            />
            <figcaption className="mt-5 flex flex-col gap-1 px-5 text-left text-sm leading-6 text-muted-foreground md:px-0 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-[#1A1917]">Placeholder</span>
              <span className="max-w-md">
                Your three-firearm photograph replaces this image. Proportions stay
                as supplied.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <ContactPanel titleAs="h2" />
    </main>
  )
}
