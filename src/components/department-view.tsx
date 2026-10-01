import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Department, NavGroup } from "@/lib/navigation"

const departmentPhotos: Record<
  string,
  { src: string; width: number; height: number; alt: string; wide: boolean }
> = {
  rifles: {
    src: "/photos/rifle-camo.png",
    width: 1260,
    height: 590,
    alt: "Camouflage rifle with a sling, from the supplied photographs.",
    wide: true,
  },
  handguns: {
    src: "/photos/pistol-chevron.png",
    width: 780,
    height: 655,
    alt: "Black semi-automatic handgun with a red-dot sight, from the supplied photographs.",
    wide: false,
  },
}

function LayeredIntro({
  kicker,
  title,
  summary,
  photo,
}: {
  kicker: ReactNode
  title: string
  summary: string
  photo?: (typeof departmentPhotos)[string]
}) {
  return (
    <header className="relative px-6 pt-16 pb-4 md:pt-24 md:pb-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-[8%] h-40 w-[42%] bg-[#ebe4d8] md:top-14 md:h-52 md:w-[30%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-[8%] hidden h-px w-16 bg-gold md:block"
      />
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={photo.wide ? "340px" : "240px"}
          className={`vd-float pointer-events-none absolute top-16 right-[6%] z-10 hidden h-auto min-[1280px]:block ${
            photo.wide ? "w-[280px] xl:w-[320px]" : "w-[200px] xl:w-[230px]"
          }`}
        />
      ) : null}
      <div className="relative z-20 mx-auto max-w-3xl text-center">
        <p className="text-sm text-muted-foreground">{kicker}</p>
        <h1 className="mt-4 font-heading text-4xl leading-[1.05] md:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">{summary}</p>
      </div>
      {photo ? (
        <div className="relative mx-auto mt-12 max-w-3xl min-[1280px]:hidden">
          <div
            aria-hidden="true"
            className="absolute top-4 right-[4%] bottom-3 left-[14%] bg-[#ebe4d8]"
          />
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 768px) 640px, 100vw"
            className="vd-float relative z-10 h-auto w-full"
          />
        </div>
      ) : null}
    </header>
  )
}

export function DepartmentView({ department }: { department: Department }) {
  const photo = departmentPhotos[department.slug]

  return (
    <main>
      <LayeredIntro
        kicker="Vital Defense"
        title={department.label}
        summary={department.summary}
        photo={photo}
      />
      <div className="relative z-20 mx-auto max-w-xl px-6 pt-8 pb-24">
        <ul className="border-y border-border">
          {department.groups.map((group) => (
            <li key={group.slug} className="border-b border-border last:border-b-0">
              <Link
                href={`/${department.slug}/${group.slug}`}
                className="vd-link flex py-5 font-heading text-2xl"
              >
                {group.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export function GroupView({
  department,
  group,
}: {
  department: Department
  group: NavGroup
}) {
  return (
    <main>
      <LayeredIntro
        kicker={
          <Link href={`/${department.slug}`} className="vd-link">
            {department.label}
          </Link>
        }
        title={group.label}
        summary={group.summary}
        photo={departmentPhotos[department.slug]}
      />
      <div className="h-16 md:h-24" />
    </main>
  )
}
