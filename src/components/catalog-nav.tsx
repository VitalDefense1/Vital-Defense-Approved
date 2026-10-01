import Link from "next/link"
import { catalog, mainCategories, type CatalogNode } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function CatalogStrip() {
  return (
    <nav aria-label="Categories" className="px-6 py-12 md:py-16">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-y-3">
        {mainCategories.map((item) => (
          <li
            key={item.label}
            className="font-heading px-2 text-sm leading-none font-bold tracking-[0.12em] whitespace-nowrap after:ml-4 after:text-gold after:content-['·'] last:after:ml-0 last:after:content-none sm:px-2.5 sm:text-base"
          >
            {item.href ? (
              <Link href={item.href} className="vd-link">
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function CatalogMenu() {
  return (
    <ul>
      {catalog.map((item) => (
        <CatalogBranch key={item.label} node={item} depth={0} />
      ))}
    </ul>
  )
}

function CatalogBranch({ node, depth }: { node: CatalogNode; depth: number }) {
  if (!node.children?.length) {
    return (
      <li>
        <span className="flex min-h-11 items-center text-sm tracking-[0.04em]">
          {node.label}
        </span>
      </li>
    )
  }

  const top = depth === 0

  return (
    <li className={top ? "border-b border-border" : undefined}>
      <details className="vd-disclosure">
        <summary
          className={cn(
            "flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden",
            top ? "min-h-14 py-3" : "min-h-11",
          )}
        >
          <span
            className={
              top
                ? "font-heading text-xl font-bold tracking-[0.06em]"
                : "font-semibold tracking-[0.05em]"
            }
          >
            {node.label}
          </span>
          <span
            className={cn("vd-plus leading-none text-gold", top ? "text-2xl" : "text-xl")}
            aria-hidden="true"
          >
            +
          </span>
        </summary>
        <ul className={cn("pb-3", top ? undefined : "pl-4")}>
          {node.children.map((child) => (
            <CatalogBranch key={child.label} node={child} depth={depth + 1} />
          ))}
        </ul>
      </details>
    </li>
  )
}
