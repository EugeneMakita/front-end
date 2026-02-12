"use client"

import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockAssignments } from "@/lib/mock-assignments"
import { mockQuestions } from "@/lib/mock-questions"

export default function AssignmentQuestionsPage() {
  const params = useParams()
  const assignmentId = params.id as string
  const assignment = mockAssignments.find((item) => item.id === assignmentId)

  if (!assignment) return null

  const questions = mockQuestions.slice(0, 6)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {questions.length} questions in this assignment
      </p>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[170px]">Type</TableHead>
            <TableHead className="w-[120px] text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.id}</TableCell>
              <TableCell className="font-medium">{question.description}</TableCell>
              <TableCell>
                <Badge variant="secondary">{question.type}</Badge>
              </TableCell>
              <TableCell className="text-right">{Math.max(5, Math.round(assignment.points / questions.length))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
