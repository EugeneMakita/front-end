"use client"

import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockAssignments } from "@/lib/mock-assignments"

const generatedProblems = [
  { id: "G-201", prompt: "Differentiate f(x) = 3x^2 + 2x", difficulty: "Medium", status: "Ready" },
  { id: "G-202", prompt: "Find the slope between points (2,8) and (6,4)", difficulty: "Easy", status: "Ready" },
  { id: "G-203", prompt: "Evaluate integral of 2x + 3 from 0 to 4", difficulty: "Hard", status: "Draft" },
]

export default function AssignmentGeneratedPage() {
  const params = useParams()
  const assignmentId = params.id as string
  const assignment = mockAssignments.find((item) => item.id === assignmentId)

  if (!assignment) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Auto-generated problems linked to this assignment.
        </p>
        <Button className="h-10">Generate new set</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[90px]">ID</TableHead>
            <TableHead>Prompt</TableHead>
            <TableHead className="w-[140px]">Difficulty</TableHead>
            <TableHead className="w-[130px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {generatedProblems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="font-medium">{item.prompt}</TableCell>
              <TableCell>
                <Badge variant="secondary">{item.difficulty}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={item.status === "Ready" ? "default" : "outline"}>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
