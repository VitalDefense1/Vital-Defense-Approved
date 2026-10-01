import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CatalogCategoryView } from "@/components/catalog-category-view"
import { DepartmentView } from "@/components/department-view"
import { catalog, departments, getCatalogCategory, getDepartment } from "@/lib/navigation"

export function generateStaticParams() {
  return [
    ...departments.map((department) => ({ department: department.slug })),
    ...catalog.map((category) => ({ department: category.slug })),
  ]
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ department: string }>
}): Promise<Metadata> {
  const { department: slug } = await params
  const department = getDepartment(slug)
  if (department) {
    return {
      title: department.label,
      description: department.summary,
    }
  }
  const category = getCatalogCategory(slug)
  if (!category) return { title: "Not found" }
  return { title: category.label }
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ department: string }>
}) {
  const { department: slug } = await params
  const department = getDepartment(slug)
  if (department) return <DepartmentView department={department} />
  const category = getCatalogCategory(slug)
  if (!category) notFound()
  return <CatalogCategoryView category={category} />
}
