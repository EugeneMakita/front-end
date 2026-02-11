"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type GradeRow = {
  id: string
  name: string
  category: string
  due: string
  submitted: string | null
  status: "Graded" | "Late" | "Missing"
  earned: number
  possible: number
}

function buildGrades(participantId: string): GradeRow[] {
  const seed = Number.parseInt(participantId, 10)
  const offset = Number.isNaN(seed) ? 0 : seed % 3

  return [
    {
      id: "quiz-1",
      name: "Quiz 1",
      category: "Quizzes",
      due: "14 Jan by 19:00",
      submitted: null,
      status: "Missing",
      earned: Math.max(0, 8.5 - offset * 0.5),
      possible: 11,
    },
    {
      id: "ch1-def",
      name: "Chapter 1 Definitions and Data",
      category: "Default",
      due: "18 Jan by 23:59",
      submitted: "5 Jan at 20:18",
      status: "Graded",
      earned: 13,
      possible: 13,
    },
    {
      id: "ch1-freq",
      name: "Chapter 1 Frequency Tables",
      category: "Default",
      due: "18 Jan by 23:59",
      submitted: "9 Jan at 21:19",
      status: "Graded",
      earned: 7,
      possible: 7,
    },
    {
      id: "ch2-box",
      name: "Chapter 2: Boxplots",
      category: "Default",
      due: "18 Jan by 23:59",
      submitted: "13 Jan at 19:40",
      status: "Late",
      earned: 9,
      possible: 9,
    },
    {
      id: "ch2-stem",
      name: "Chapter 2: Stem & Leaf, Histograms, Percentiles",
      category: "Default",
      due: "21 Jan by 23:59",
      submitted: "12 Jan at 16:44",
      status: "Graded",
      earned: 10,
      possible: 10,
    },
  ]
}

function statusBadgeVariant(status: GradeRow["status"]) {
  if (status === "Missing") return "destructive"
  if (status === "Late") return "secondary"
  return "default"
}

export default function ParticipantGradesPage() {
  const params = useParams()
  const participantId = params.participantId as string
  const rows = React.useMemo(() => buildGrades(participantId), [participantId])

  const totalEarned = rows.reduce((sum, row) => sum + row.earned, 0)
  const totalPossible = rows.reduce((sum, row) => sum + row.possible, 0)
  const finalPercent = totalPossible ? Math.round((totalEarned / totalPossible) * 1000) / 10 : 0
  const submittedCount = rows.filter((row) => row.submitted).length

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-none bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Final grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{finalPercent}%</p>
            <p className="text-xs text-muted-foreground mt-1">
              {totalEarned.toFixed(1)} / {totalPossible} points
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Submitted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {submittedCount}/{rows.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Assignments turned in</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none bg-muted/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Missing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {rows.filter((row) => row.status === "Missing").length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-background">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
              <TableHead className="w-[36%] font-bold text-gray-700 dark:text-gray-300">Name</TableHead>
              <TableHead className="w-[18%] font-bold text-gray-700 dark:text-gray-300">Due</TableHead>
              <TableHead className="w-[18%] font-bold text-gray-700 dark:text-gray-300">Submitted</TableHead>
              <TableHead className="w-[14%] font-bold text-gray-700 dark:text-gray-300">Status</TableHead>
              <TableHead className="w-[14%] text-right font-bold text-gray-700 dark:text-gray-300">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/30" : ""}
              >
                <TableCell>
                  <div className="font-medium text-primary">{row.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">{row.category}</div>
                </TableCell>
                <TableCell className="text-foreground">{row.due}</TableCell>
                <TableCell className="text-foreground">
                  {row.submitted ?? <span className="text-muted-foreground">-</span>}
                </TableCell>
                <TableCell>
                  <Badge variant={statusBadgeVariant(row.status)} className="rounded-none">
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {row.earned} / {row.possible}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
