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

const practiceProblems = [
  { id: "P-301", title: "Linear model warm-up", attempts: 12, avgScore: "74%" },
  { id: "P-302", title: "Gradient practice set", attempts: 8, avgScore: "68%" },
  { id: "P-303", title: "Interpret model output", attempts: 5, avgScore: "82%" },
]

export default function AssignmentPracticePage() {
  const params = useParams()
  const assignmentId = params.id as string
  const assignment = mockAssignments.find((item) => item.id === assignmentId)

  if (!assignment) return null

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Practice set performance and usage.
      </p>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[90px]">ID</TableHead>
            <TableHead>Practice problem</TableHead>
            <TableHead className="w-[140px] text-right">Attempts</TableHead>
            <TableHead className="w-[140px] text-right">Avg score</TableHead>
            <TableHead className="w-[130px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {practiceProblems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="text-right">{item.attempts}</TableCell>
              <TableCell className="text-right">{item.avgScore}</TableCell>
              <TableCell>
                <Badge variant="secondary">Active</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
