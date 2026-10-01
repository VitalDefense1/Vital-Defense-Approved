import type { CatalogCategory, CatalogNode } from "@/lib/navigation"

export function CatalogCategoryView({ category }: { category: CatalogCategory }) {
  return (
    <main>
      <header className="px-6 pt-16 pb-4 md:pt-24 md:pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm tracking-wide text-gold">Vital Defense</p>
          <span className="mx-auto mt-6 block h-px w-12 bg-gold" aria-hidden="true" />
          <h1 className="mt-6 font-heading text-[2rem] leading-[1.12] font-bold text-balance sm:text-5xl md:text-6xl">
            {category.label}
          </h1>
        </div>
      </header>
      {category.children?.length ? (
        <div className="relative z-20 mx-auto max-w-xl px-6 pt-8 pb-24">
          <ul className="border-y border-border">
            {category.children.map((child) => (
              <CategoryRow key={child.label} node={child} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="h-16 md:h-24" />
      )}
    </main>
  )
}

function CategoryRow({ node }: { node: CatalogNode }) {
  return (
    <li className="border-b border-border py-5 last:border-b-0">
      <p className="font-semibold text-xl leading-snug tracking-[0.05em] sm:text-2xl">{node.label}</p>
      {node.children?.length ? (
        <ul className="mt-3 space-y-2">
          {node.children.map((child) => (
            <li key={child.label} className="text-sm tracking-[0.04em]">
              {child.label}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  )
}
