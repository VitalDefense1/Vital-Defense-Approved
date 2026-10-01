import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { departments } from "@/lib/navigation"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="px-6 pt-14">
        <div className="mx-auto w-fit">
          <Image
            src="/photos/illustration-rifle.png"
            alt="Still drawing of a rifle. The file is a picture, not an animation."
            width={996}
            height={400}
            quality={90}
            sizes="240px"
            className="relative z-10 h-auto w-40 sm:w-52"
          />
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block rounded-sm">
            <Logo className="h-16" />
          </Link>
          <p className="mt-6 text-sm leading-6">
            {site.name}
            <br />
            {site.place}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-semibold text-lg tracking-[0.06em]">Categories</p>
          <ul className="mt-4 space-y-2">
            {departments.map((department) => (
              <li key={department.slug}>
                <Link href={`/${department.slug}`} className="vd-link text-sm">
                  {department.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="vd-link text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="font-semibold text-lg tracking-[0.06em]">Published contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={site.phoneHref} className="vd-link">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="vd-link">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.currentWebsite}
                className="vd-link"
                rel="noreferrer"
              >
                Current website
              </a>
            </li>
          </ul>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            Phone and email are the details on the current public contact page.
            Confirm them before launch.
          </p>
        </div>
      </div>
      <div className="border-t border-border px-6 py-6 text-center">
        <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground">
          Design preview for Vital Defense. This does not replace{" "}
          {site.currentWebsite.replace("https://", "")}. Search engines are asked
          to skip this preview. That request is not a password.
        </p>
      </div>
    </footer>
  )
}
