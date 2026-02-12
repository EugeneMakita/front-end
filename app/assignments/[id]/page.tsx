import { redirect } from "next/navigation"

export default async function AssignmentIndexPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/assignments/${id}/questions`)
}
