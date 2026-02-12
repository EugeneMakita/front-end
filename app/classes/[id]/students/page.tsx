"use client"

import { mockParticipants } from "@/lib/mock-participants"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ClassStudentsPage() {
  const students = mockParticipants.filter((p) => p.role === "Learner")

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{students.length} students enrolled</p>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Last access</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                {student.firstName} {student.lastName}
              </TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.lastAccess}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
