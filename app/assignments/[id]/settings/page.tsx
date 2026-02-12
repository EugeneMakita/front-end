"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockAssignments } from "@/lib/mock-assignments"
import { mockParticipants } from "@/lib/mock-participants"

export default function AssignmentSettingsPage() {
  const params = useParams()
  const assignmentId = params.id as string
  const assignment = mockAssignments.find((item) => item.id === assignmentId)

  const [title, setTitle] = React.useState(assignment?.title ?? "")
  const [dueDate, setDueDate] = React.useState("2026-02-20")
  const [dueTime, setDueTime] = React.useState("23:59")
  const [allowLate, setAllowLate] = React.useState(true)
  const [timedSession, setTimedSession] = React.useState(false)
  const [timeLimitMinutes, setTimeLimitMinutes] = React.useState("60")
  const [allowHints, setAllowHints] = React.useState(false)
  const [allowMultipleAttempts, setAllowMultipleAttempts] = React.useState(true)
  const [maxAttempts, setMaxAttempts] = React.useState("3")
  const [selectedStudents, setSelectedStudents] = React.useState<Set<string>>(new Set())
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")

  if (!assignment) return null

  const learners = mockParticipants.filter((p) => p.role === "Learner")
  const allSelected = learners.length > 0 && learners.every((s) => selectedStudents.has(s.id))

  function toggleStudent(id: string) {
    setSelectedStudents((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedStudents(new Set())
      return
    }
    setSelectedStudents(new Set(learners.map((s) => s.id)))
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="assignment-title">Title</Label>
        <Input
          id="assignment-title"
          className="h-10"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="assignment-due">Due date</Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            id="assignment-due"
            type="date"
            className="h-10"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Input
            id="assignment-due-time"
            type="time"
            className="h-10"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border p-4">
        <div>
          <p className="text-sm font-medium">Allow late submissions</p>
          <p className="text-xs text-muted-foreground">Students can submit after due date.</p>
        </div>
        <Switch checked={allowLate} onCheckedChange={setAllowLate} />
      </div>

      <div className="flex items-center justify-between border p-4">
        <div>
          <p className="text-sm font-medium">Timed session</p>
          <p className="text-xs text-muted-foreground">Limit how long each attempt can run.</p>
        </div>
        <Switch checked={timedSession} onCheckedChange={setTimedSession} />
      </div>

      {timedSession && (
        <div className="space-y-2">
          <Label htmlFor="time-limit">Time limit (minutes)</Label>
          <Input
            id="time-limit"
            type="number"
            min={1}
            className="h-10"
            value={timeLimitMinutes}
            onChange={(e) => setTimeLimitMinutes(e.target.value)}
          />
        </div>
      )}

      <div className="flex items-center justify-between border p-4">
        <div>
          <p className="text-sm font-medium">Hints and suggestions</p>
          <p className="text-xs text-muted-foreground">Show answer hints while students work.</p>
        </div>
        <Switch checked={allowHints} onCheckedChange={setAllowHints} />
      </div>

      <div className="flex items-center justify-between border p-4">
        <div>
          <p className="text-sm font-medium">Multiple attempts allowed</p>
          <p className="text-xs text-muted-foreground">Let students retry this assignment.</p>
        </div>
        <Switch
          checked={allowMultipleAttempts}
          onCheckedChange={setAllowMultipleAttempts}
        />
      </div>

      {allowMultipleAttempts && (
        <div className="space-y-2">
          <Label htmlFor="max-attempts">Max attempts</Label>
          <Select value={maxAttempts} onValueChange={setMaxAttempts}>
            <SelectTrigger id="max-attempts" className="h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 attempts</SelectItem>
              <SelectItem value="3">3 attempts</SelectItem>
              <SelectItem value="5">5 attempts</SelectItem>
              <SelectItem value="0">Unlimited</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button className="h-10">Save changes</Button>
        <Button variant="outline" className="h-10">Cancel</Button>
      </div>

      <div className="space-y-4 border p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Assign to students</p>
            <p className="text-xs text-muted-foreground">
              Choose who receives this assignment.
            </p>
          </div>
          <Button variant="outline" className="h-9" onClick={() => setInviteOpen(true)}>
            Invite student
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} />
          <span className="text-sm text-muted-foreground">
            {allSelected ? "All students selected" : "Select all"}
          </span>
        </div>

        <div className="max-h-56 space-y-2 overflow-auto border p-3">
          {learners.map((student) => (
            <label key={student.id} className="flex cursor-pointer items-center justify-between gap-3 py-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedStudents.has(student.id)}
                  onCheckedChange={() => toggleStudent(student.id)}
                />
                <span className="text-sm">
                  {student.firstName} {student.lastName}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{student.email}</span>
            </label>
          ))}
        </div>

        <Button className="h-10 w-full" disabled={selectedStudents.size === 0}>
          Assign selected ({selectedStudents.size})
        </Button>
      </div>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite student</DialogTitle>
            <DialogDescription>
              Send an invite and assign this work after they join.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="invite-email">Student email</Label>
            <Input
              id="invite-email"
              className="h-10"
              type="email"
              placeholder="student@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setInviteOpen(false)
                setInviteEmail("")
              }}
              disabled={!inviteEmail.trim()}
            >
              Send invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
