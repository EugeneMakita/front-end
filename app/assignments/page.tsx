"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { mockAssignments } from "@/lib/mock-assignments"

export default function AssignmentsPage() {
  const router = useRouter()
  const [search, setSearch] = React.useState("")

  const filtered = mockAssignments.filter((item) =>
    `${item.title} ${item.course}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Assignments</h1>
        <p className="text-muted-foreground text-sm">
          Track upcoming work, submissions, and grading status.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative w-[320px]">
          <MagnifyingGlassIcon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="h-10 pl-9"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-10">All Courses</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Assignment</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((assignment) => (
            <TableRow
              key={assignment.id}
              className="cursor-pointer hover:bg-muted/40"
              onClick={() => router.push(`/assignments/${assignment.id}/questions`)}
            >
              <TableCell className="font-medium">{assignment.title}</TableCell>
              <TableCell>{assignment.course}</TableCell>
              <TableCell>{assignment.due}</TableCell>
              <TableCell>
                <Badge variant="secondary">{assignment.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-10">
                No assignments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
