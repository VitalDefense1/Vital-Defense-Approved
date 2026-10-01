import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { getCatalogCategory, getDepartment } from "@/lib/navigation"
import { getSampleProduct, sampleProducts } from "@/lib/sample-products"

export function generateStaticParams() {
  return sampleProducts.map((product) => ({ id: product.id }))
}

export const dynamicParams = false

function categoryLabel(slug: string) {
  return getDepartment(slug)?.label ?? getCatalogCategory(slug)?.label ?? slug
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getSampleProduct(id)
  if (!product) return { title: "Not found" }
  return {
    title: product.title,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getSampleProduct(id)
  if (!product) notFound()
  const label = categoryLabel(product.category)

  return (
    <main className="px-6 pt-16 pb-24 md:pt-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex aspect-[4/3] items-center justify-center bg-[#f7f5f1] p-6">
          <Image
            src={product.image.src}
            alt={product.title}
            width={product.image.width}
            height={product.image.height}
            quality={90}
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <Link href={`/${product.category}`} className="vd-link text-sm tracking-wide text-gold">
            {label}
          </Link>
          <h1 className="mt-4 font-heading text-[2rem] leading-[1.12] font-bold text-balance sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  )
}
