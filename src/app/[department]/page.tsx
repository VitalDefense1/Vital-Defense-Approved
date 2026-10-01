import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DepartmentView } from "@/components/department-view"
import { departments, getDepartment } from "@/lib/navigation"

export function generateStaticParams() {
  return departments.map((department) => ({ department: department.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ department: string }>
}): Promise<Metadata> {
  const { department: slug } = await params
  const department = getDepartment(slug)
  if (!department) return { title: "Not found" }
  return {
    title: department.label,
    description: department.summary,
  }
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ department: string }>
}) {
  const { department: slug } = await params
  const department = getDepartment(slug)
  if (!department) notFound()
  return <DepartmentView department={department} />
}
