"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { mockWikiPages } from "@/lib/mock-wiki"

export default function WikiIndexPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  useEffect(() => {
    if (mockWikiPages.length > 0) {
      router.replace(`/courses/${courseId}/wiki/${mockWikiPages[0].id}`)
    }
  }, [courseId, router])

  return null
}
