import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GroupView } from "@/components/department-view"
import { departments, getGroup } from "@/lib/navigation"

export function generateStaticParams() {
  return departments.flatMap((department) =>
    department.groups.map((group) => ({
      department: department.slug,
      group: group.slug,
    })),
  )
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ department: string; group: string }>
}): Promise<Metadata> {
  const { department, group } = await params
  const match = getGroup(department, group)
  if (!match) return { title: "Not found" }
  return {
    title: match.group.label,
    description: match.group.summary,
  }
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ department: string; group: string }>
}) {
  const { department, group } = await params
  const match = getGroup(department, group)
  if (!match) notFound()
  return <GroupView department={match.department} group={match.group} />
}
