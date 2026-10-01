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

      <section className="relative overflow-x-clip px-6 pt-16 pb-8 md:pt-24 md:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-[4%] hidden h-[28rem] w-[34%] bg-[#ebe4d8] min-[1500px]:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-16 left-[9%] hidden h-px w-20 bg-gold md:block"
        />
        <Image
          src="/photos/pistol-optic.png"
          alt="Black semi-automatic handgun with a red-dot sight, from the supplied photographs."
          width={780}
          height={709}
          sizes="240px"
          className="pointer-events-none absolute top-6 right-[2%] z-10 hidden h-auto w-[210px] min-[1500px]:block xl:w-[240px]"
        />
        <div className="opening-copy relative z-20 mx-auto max-w-5xl text-center">
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
            Three rifles from the photographs supplied for this preview, kept in
            a single frame.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-6xl md:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-[6%] right-[5%] bottom-[12%] left-[8%] bg-[#ebe4d8] md:right-[8%] md:left-[18%]"
          />
          <div
            aria-hidden="true"
            className="absolute top-[6%] left-[10%] h-px w-14 bg-gold md:left-[20%]"
          />
          <figure className="showcase-frame relative z-10 -mx-5 md:mx-0 md:ml-[4%] md:w-[94%]">
            <Image
              src="/photos/three-rifles.png"
              alt="Three black rifles in one photograph. The top rifle has a scope and a camouflage sling."
              width={1402}
              height={1580}
              sizes="(min-width: 1152px) 1080px, 100vw"
              loading="eager"
              className="h-auto w-full"
            />
            <figcaption className="mt-5 flex flex-col gap-1 px-5 text-left text-sm leading-6 text-muted-foreground md:px-0 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-[#1A1917]">Supplied photograph</span>
              <span className="max-w-md">
                Shown together, in the proportions of the original picture.
              </span>
            </figcaption>
          </figure>
        </div>
        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-end md:ml-[8%] md:mt-16">
          <Image
            src="/photos/illustration-rifle.png"
            alt="Still drawing of a rifle. The file is a picture, not an animation."
            width={1010}
            height={420}
            sizes="220px"
            className="h-auto w-40 -rotate-2 sm:w-52"
          />
          <p className="max-w-sm pb-2 text-sm leading-6 text-muted-foreground">
            Still drawing from the supplied files.
          </p>
        </div>
      </section>

      <ContactPanel titleAs="h2" />
    </main>
  )
}
