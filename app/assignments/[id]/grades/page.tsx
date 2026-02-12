"use client"

import { useParams } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockAssignments } from "@/lib/mock-assignments"
import { mockParticipants } from "@/lib/mock-participants"

export default function AssignmentGradesPage() {
  const params = useParams()
  const assignmentId = params.id as string
  const assignment = mockAssignments.find((item) => item.id === assignmentId)

  if (!assignment) return null

  const learners = mockParticipants.filter((p) => p.role === "Learner").slice(0, 8)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {learners.length} student grades
      </p>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Student</TableHead>
            <TableHead className="w-[140px] text-right">Score</TableHead>
            <TableHead className="w-[140px] text-right">Out of</TableHead>
            <TableHead className="w-[160px] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {learners.map((learner, idx) => (
            <TableRow key={learner.id}>
              <TableCell className="font-medium">
                {learner.firstName} {learner.lastName}
              </TableCell>
              <TableCell className="text-right">{Math.max(0, assignment.points - idx * 6)}</TableCell>
              <TableCell className="text-right">{assignment.points}</TableCell>
              <TableCell className="text-right text-muted-foreground">
                {idx % 3 === 0 ? "Missing" : idx % 2 === 0 ? "Submitted" : "Graded"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
