import Image from "next/image"
import Link from "next/link"
import { ContactPanel } from "@/components/contact-panel"
import { FeatureVideo } from "@/components/feature-video"
import { departments, proposedHome } from "@/lib/navigation"

/**
 * Layered composition is a lasting requirement for this preview.
 * Photographs overlap panels and cross into neighboring sections.
 * Headings stay centered. Imagery stays asymmetric.
 * The three-rifle photograph is alone in its frame.
 * Do not redraw the logo, the firearms, or the accessories.
 */

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

      <section className="relative px-6 pt-16 pb-6 md:pt-24 md:pb-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-8 h-72 w-[46%] bg-[#ebe4d8] sm:h-96 md:top-16 md:h-[28rem] md:w-[32%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-8 left-[8%] hidden h-px w-16 bg-gold md:block"
        />
        <Image
          src="/photos/pistol-optic.png"
          alt="Black semi-automatic handgun with a red-dot sight, from the supplied photographs."
          width={760}
          height={695}
          quality={90}
          sizes="250px"
          className="pointer-events-none absolute top-6 right-10 z-10 hidden h-auto w-[200px] min-[1500px]:block xl:w-[240px]"
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
          <ul className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-14">
            {departments.map((department, index) => (
              <li key={department.slug}>
                <Link href={`/${department.slug}`} className="group inline-flex items-baseline gap-3">
                  <span className="text-sm text-gold">0{index + 1}</span>
                  <span className="text-left">
                    <span className="block font-heading text-2xl group-hover:text-gold">
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
        <div className="relative z-10 mx-auto mt-16 max-w-lg min-[1500px]:hidden">
          <div
            aria-hidden="true"
            className="absolute top-5 right-[8%] bottom-4 left-[18%] bg-[#ebe4d8]"
          />
          <Image
            src="/photos/pistol-optic.png"
            alt="Black semi-automatic handgun with a red-dot sight, from the supplied photographs."
            width={760}
            height={695}
            quality={90}
            sizes="(min-width: 768px) 420px, 86vw"
            className="relative z-10 ml-auto h-auto w-[84%]"
          />
        </div>
      </section>

      <section className="relative px-0 pt-8 md:px-8 md:pt-14" aria-label="Shield and rifle">
        <Image
          src="/photos/shield-rifle.jpg"
          alt="Supplied composition of a rifle passing through the Vital Defense shield and skull."
          width={1536}
          height={1024}
          quality={90}
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="mx-auto h-auto w-full max-w-6xl"
        />
      </section>

      <section className="relative px-6 pt-16 pb-4 md:pt-24" aria-labelledby="featured-brands">
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
            These marks are placeholders. No brand is shown as a partner, and no
            logo file has been authorized yet.
          </p>
        </div>
        <div className="relative mx-auto mt-16 max-w-6xl lg:mt-20">
          <div
            aria-hidden="true"
            className="absolute top-2 right-[6%] hidden h-28 w-[42%] bg-[#ebe4d8] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute top-10 right-0 left-0 hidden h-px bg-border lg:block"
          />
          <ul className="relative grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
            {brandSlots.map((slot) => (
              <li key={slot} className="flex flex-col items-center">
                <span className="relative z-10 flex size-20 items-center justify-center rounded-full border border-border bg-white font-heading text-xl transition-colors hover:border-gold">
                  {slot}
                </span>
                <span className="mt-4 text-sm text-muted-foreground">Placeholder</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto mt-20 max-w-6xl md:mt-28">
          <div
            aria-hidden="true"
            className="absolute top-[18%] right-[2%] -bottom-8 left-[16%] bg-[#ebe4d8] md:right-[6%] md:-bottom-16 md:left-[30%]"
          />
          <div
            aria-hidden="true"
            className="absolute top-[18%] left-[18%] h-px w-14 bg-gold md:left-[32%]"
          />
          <Image
            src="/photos/pdw.png"
            alt="Black compact firearm with an optic, from the supplied photographs."
            width={1140}
            height={496}
            quality={90}
            sizes="(min-width: 768px) 780px, 100vw"
            className="relative z-10 -mb-14 h-auto w-full md:-mb-24 md:w-[70%]"
          />
        </div>
      </section>

      <section
        className="relative px-5 pt-24 pb-6 md:px-8 md:pt-40 md:pb-10"
        aria-labelledby="composite"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-[8%] h-36 w-[46%] bg-[#ebe4d8] md:h-48 md:w-[32%]"
        />
        <div className="relative z-20 mx-auto max-w-4xl text-center">
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

        <div className="relative z-10 mx-auto mt-12 max-w-6xl md:mt-16">
          <div
            aria-hidden="true"
            className="absolute top-[8%] right-[8%] bottom-[16%] left-[14%] bg-[#ebe4d8] md:right-[16%] md:left-[26%]"
          />
          <div
            aria-hidden="true"
            className="absolute top-[7%] left-[14%] h-px w-14 bg-gold md:left-[22%]"
          />
          <figure className="showcase-frame relative z-10 -mx-5 w-[calc(100%+2.5rem)] md:mx-0 md:ml-[1%] md:w-[98%]">
            <Image
              src="/photos/three-rifles.png"
              alt="Three black rifles in one photograph. The top rifle has a scope and a camouflage sling."
              width={1358}
              height={1562}
              quality={90}
              sizes="(min-width: 1152px) 1120px, 100vw"
              loading="eager"
              className="h-auto w-full"
            />
            <figcaption className="mt-6 flex flex-col gap-1 px-5 text-left text-sm leading-6 text-muted-foreground md:px-2 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-gold">Supplied photograph</span>
              <span className="max-w-md">
                Shown together, in the proportions of the original picture.
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <ContactPanel titleAs="h2" />
    </main>
  )
}
