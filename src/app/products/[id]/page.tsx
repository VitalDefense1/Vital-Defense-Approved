import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInformation } from "@/components/product-information"
import { ProductSummary } from "@/components/product-summary"
import { getCatalogCategory, getDepartment } from "@/lib/navigation"
import { productShortDescription } from "@/lib/product-summary"
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
    description: productShortDescription(product),
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
  const images = product.images?.length ? product.images : [product.image]

  return (
    <main className="px-4 pt-16 pb-24 sm:px-6 md:pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <ProductGallery images={images} title={product.title} />
          <div>
            <Link href={`/${product.category}`} className="vd-link text-sm tracking-wide text-gold">
              {label}
            </Link>
            <h1 className="mt-4 font-heading text-[2rem] leading-[1.12] font-bold text-balance sm:text-5xl">
              {product.title}
            </h1>
            <ProductSummary key={product.id} text={productShortDescription(product)} />
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
        <ProductInformation
          productId={product.id}
          description={product.details ?? product.description}
          specifications={product.specifications ?? []}
          reviews={product.reviews ?? []}
        />
      </div>
    </main>
  )
}
