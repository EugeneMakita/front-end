"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DownloadSimpleIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"
import { mockParticipants } from "@/lib/mock-participants"

type GradeItem = {
  id: string
  title: string
  type: "Quiz" | "Assignment" | "Project" | "Exam"
  weight: number
  pointsEarned: number
  pointsPossible: number
}

type StudentGrade = {
  participantId: string
  name: string
  role: string
  items: GradeItem[]
}

const gradeCatalog: GradeItem[] = [
  { id: "q1", title: "Quiz 1", type: "Quiz", weight: 10, pointsEarned: 8, pointsPossible: 10 },
  { id: "a1", title: "Assignment 1", type: "Assignment", weight: 20, pointsEarned: 17, pointsPossible: 20 },
  { id: "q2", title: "Quiz 2", type: "Quiz", weight: 10, pointsEarned: 9, pointsPossible: 10 },
  { id: "p1", title: "Mini Project", type: "Project", weight: 25, pointsEarned: 21, pointsPossible: 25 },
  { id: "f1", title: "Final Exam", type: "Exam", weight: 35, pointsEarned: 30, pointsPossible: 35 },
]

function jitter(value: number, seed: number) {
  const delta = ((seed * 17) % 7) - 3
  return Math.max(0, value + delta)
}

function buildStudentGrades() {
  const learners = mockParticipants.filter((p) => p.role !== "Instructor")
  const grades: StudentGrade[] = learners.map((participant, index) => ({
    participantId: participant.id,
    name: `${participant.firstName} ${participant.lastName}`,
    role: participant.role,
    items: gradeCatalog.map((item, itemIndex) => ({
      ...item,
      pointsEarned: Math.min(item.pointsPossible, jitter(item.pointsEarned, index + itemIndex + 1)),
    })),
  }))
  return grades
}

function weightedFinal(items: GradeItem[]) {
  const weighted = items.reduce((sum, item) => sum + (item.pointsEarned / item.pointsPossible) * item.weight, 0)
  return Math.round(weighted * 10) / 10
}

function letterGrade(score: number) {
  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}

export default function GradesPage() {
  const params = useParams()
  const courseId = params.id as string
  const [search, setSearch] = React.useState("")
  const [sortBy, setSortBy] = React.useState("name")
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())

  const data = React.useMemo(() => buildStudentGrades(), [])

  const filtered = React.useMemo(() => {
    const bySearch = data.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
      return matchesSearch
    })
    const sorted = [...bySearch].sort((a, b) => {
      if (sortBy === "highest") return weightedFinal(b.items) - weightedFinal(a.items)
      if (sortBy === "lowest") return weightedFinal(a.items) - weightedFinal(b.items)
      return a.name.localeCompare(b.name)
    })
    return sorted
  }, [data, search, sortBy])

  const allSelected =
    filtered.length > 0 &&
    filtered.every((student) => selectedIds.has(student.participantId))

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((student) => student.participantId)))
    }
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex shrink-0 items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleAll}
            aria-label="Select all students"
          />
          {selectedIds.size > 0 ? (
            <span className="text-sm text-muted-foreground leading-tight">
              <span className="block whitespace-nowrap">
                With <span className="font-semibold text-foreground">{selectedIds.size}</span>
              </span>
              <span className="block">selected:</span>
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">Select all</span>
          )}
        </div>

        <div className="ml-auto flex min-w-0 items-center justify-end gap-3">
          {selectedIds.size > 0 && (
            <Select
              value=""
              onValueChange={(value) => {
                if (value === "clear") setSelectedIds(new Set())
              }}
            >
              <SelectTrigger className="h-10 w-[190px]">
                <SelectValue placeholder="Select the action..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="message">Send message</SelectItem>
                <SelectItem value="export">Export selected</SelectItem>
                <SelectItem value="clear">Clear selection</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Button size="sm" className="gap-1.5">
            <DownloadSimpleIcon size={14} />
            Export grades
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-10 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort: Name</SelectItem>
              <SelectItem value="highest">Sort: Highest grade</SelectItem>
              <SelectItem value="lowest">Sort: Lowest grade</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-[260px]">
            <MagnifyingGlassIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="h-10 pl-9"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
            <TableHead className="w-[40px]" />
            <TableHead className="text-gray-700 dark:text-gray-300 font-bold">Student</TableHead>
            <TableHead className="w-[140px] text-gray-700 dark:text-gray-300 font-bold">Role</TableHead>
            <TableHead className="w-[120px] text-gray-700 dark:text-gray-300 font-bold text-center">Final (%)</TableHead>
            <TableHead className="w-[120px] text-gray-700 dark:text-gray-300 font-bold text-center">Letter</TableHead>
            <TableHead className="w-[180px] text-gray-700 dark:text-gray-300 font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((student, index) => {
            const finalScore = weightedFinal(student.items)
            const letter = letterGrade(finalScore)
            const isSelected = selectedIds.has(student.participantId)
            return (
              <TableRow
                key={student.participantId}
                data-state={isSelected ? "selected" : undefined}
                className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/30" : ""}
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleOne(student.participantId)}
                    aria-label={`Select ${student.name}`}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={`/courses/${courseId}/participants/${student.participantId}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {student.name}
                  </Link>
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{student.role}</TableCell>
                <TableCell className="text-center font-semibold">{finalScore}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={letter === "F" ? "destructive" : "secondary"} className="rounded-none">
                    {letter}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/courses/${courseId}/participants/${student.participantId}/grades`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                    >
                      Show details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">No students found.</div>
      )}
    </div>
  )
}
