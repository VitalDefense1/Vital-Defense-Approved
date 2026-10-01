import Link from "next/link"
import type { Department, NavGroup } from "@/lib/navigation"

export function DepartmentView({ department }: { department: Department }) {
  return (
    <main>
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center md:pt-24">
        <p className="text-sm text-muted-foreground">Vital Defense</p>
        <h1 className="mt-4 font-heading text-4xl leading-[1.1] md:text-6xl">
          {department.label}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
          {department.summary}
        </p>
      </header>
      <div className="mx-auto max-w-xl px-6 pb-24">
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
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-20 text-center md:pt-24 md:pb-28">
        <p className="text-sm">
          <Link href={`/${department.slug}`} className="vd-link text-muted-foreground">
            {department.label}
          </Link>
        </p>
        <h1 className="mt-4 font-heading text-4xl leading-[1.1] md:text-6xl">
          {group.label}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">
          {group.summary}
        </p>
      </header>
    </main>
  )
}
