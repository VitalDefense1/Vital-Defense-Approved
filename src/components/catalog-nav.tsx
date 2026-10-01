import Link from "next/link"
import { catalog, mainCategories, type CatalogNode } from "@/lib/navigation"

export function CatalogStrip() {
  return (
    <nav aria-label="Categories" className="px-6 py-12 md:py-16">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-y-3">
        {mainCategories.map((item) => (
          <li
            key={item.label}
            className="font-heading px-2 text-sm leading-none font-bold tracking-[0.12em] whitespace-nowrap after:ml-4 after:text-gold after:content-['·'] last:after:ml-0 last:after:content-none sm:px-2.5 sm:text-base"
          >
            <Link href={item.href} className="vd-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function CatalogMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul>
      {catalog.map((item) => (
        <CatalogBranch key={item.label} node={item} depth={0} onNavigate={onNavigate} />
      ))}
    </ul>
  )
}

function CatalogBranch({
  node,
  depth,
  onNavigate,
}: {
  node: CatalogNode & { slug?: string }
  depth: number
  onNavigate?: () => void
}) {
  if (!node.children?.length) {
    return (
      <li>
        <span className="flex min-h-11 items-center text-sm tracking-[0.04em]">{node.label}</span>
      </li>
    )
  }

  const top = depth === 0

  if (top && node.slug) {
    return (
      <li className="relative border-b border-border">
        <Link
          href={`/${node.slug}`}
          className="vd-link inline-flex min-h-14 items-center py-3 pr-14 font-heading text-xl font-bold tracking-[0.06em]"
          onClick={onNavigate}
        >
          {node.label}
        </Link>
        <details className="vd-disclosure">
          <summary
            className="absolute top-0 right-0 flex size-14 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
            aria-label={`Show ${node.label} subcategories`}
          >
            <span className="vd-plus text-2xl leading-none text-gold" aria-hidden="true">
              +
            </span>
          </summary>
          <ul className="pb-3">
            {node.children.map((child) => (
              <CatalogBranch key={child.label} node={child} depth={depth + 1} />
            ))}
          </ul>
        </details>
      </li>
    )
  }

  return (
    <li>
      <details className="vd-disclosure">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <span className="font-semibold tracking-[0.05em]">{node.label}</span>
          <span className="vd-plus text-xl leading-none text-gold" aria-hidden="true">
            +
          </span>
        </summary>
        <ul className="pb-3 pl-4">
          {node.children.map((child) => (
            <CatalogBranch key={child.label} node={child} depth={depth + 1} />
          ))}
        </ul>
      </details>
    </li>
  )
}
