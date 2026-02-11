import { redirect } from "next/navigation"

export default async function QuestionDetailIndexPage({
  params,
}: {
  params: Promise<{ id: string; questionId: string }>
}) {
  const { id, questionId } = await params
  redirect(`/library/${id}/questions/${questionId}/view`)
}
