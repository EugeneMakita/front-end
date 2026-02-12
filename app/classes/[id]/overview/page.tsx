"use client"

import { useParams } from "next/navigation"
import { mockClasses } from "@/lib/mock-classes"
import { mockParticipants } from "@/lib/mock-participants"
import { Badge } from "@/components/ui/badge"

export default function ClassOverviewPage() {
  const params = useParams()
  const classId = params.id as string
  const classItem = mockClasses.find((item) => item.id === classId)

  if (!classItem) return null

  const instructors = mockParticipants.filter((p) => p.role === "Instructor")
  const assistants = mockParticipants.filter((p) => p.role === "Teaching Assistant")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Class Summary</h2>
        <p className="text-sm text-muted-foreground">
          {classItem.course} · {classItem.schedule} · {classItem.room}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border p-4">
          <p className="text-xs text-muted-foreground mb-1">Students</p>
          <p className="text-xl font-semibold">{classItem.studentsCount}</p>
        </div>
        <div className="border p-4">
          <p className="text-xs text-muted-foreground mb-1">Instructors</p>
          <p className="text-xl font-semibold">{instructors.length}</p>
        </div>
        <div className="border p-4">
          <p className="text-xs text-muted-foreground mb-1">Assistants</p>
          <p className="text-xl font-semibold">{assistants.length}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Teaching Team</h3>
        <div className="flex flex-wrap gap-2">
          {[...instructors, ...assistants].map((member) => (
            <Badge key={member.id} variant="secondary">
              {member.firstName} {member.lastName}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
