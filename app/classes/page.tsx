"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react"
import { mockClasses, type ClassItem } from "@/lib/mock-classes"

export default function ClassesPage() {
  const router = useRouter()
  const [search, setSearch] = React.useState("")
  const [classes, setClasses] = React.useState<ClassItem[]>(mockClasses)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState("")
  const [newCourse, setNewCourse] = React.useState("")
  const [newSchedule, setNewSchedule] = React.useState("")
  const [newRoom, setNewRoom] = React.useState("")

  const filtered = classes.filter((item) =>
    `${item.title} ${item.course}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Classes</h1>
        <p className="text-sm text-muted-foreground">
          Manage active class groups, participants, and schedules.
        </p>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="relative w-[320px]">
          <MagnifyingGlassIcon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="h-10 pl-9"
            placeholder="Search classes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="h-10 gap-2" onClick={() => setCreateOpen(true)}>
          <PlusIcon size={14} />
          Create class
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            className="border bg-card p-5 text-left hover:shadow-md transition-shadow"
            onClick={() => router.push(`/classes/${item.id}/overview`)}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <Badge variant="secondary">{item.studentsCount} students</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{item.course}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {item.schedule} · {item.room}
            </p>
          </button>
        ))}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create class</DialogTitle>
            <DialogDescription>
              Add a new class and manage it from the Classes section.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="class-title">Class name</Label>
              <Input
                id="class-title"
                className="h-10"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="ML - Section C"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="class-course">Course</Label>
              <Input
                id="class-course"
                className="h-10"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="Introduction to Machine Learning"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="class-schedule">Schedule</Label>
                <Input
                  id="class-schedule"
                  className="h-10"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  placeholder="Mon/Wed 3:00 PM"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="class-room">Room</Label>
                <Input
                  id="class-room"
                  className="h-10"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  placeholder="Room 202"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!newTitle.trim() || !newCourse.trim()}
              onClick={() => {
                const classId = `c-${Date.now()}`
                setClasses((prev) => [
                  {
                    id: classId,
                    title: newTitle.trim(),
                    course: newCourse.trim(),
                    schedule: newSchedule.trim() || "TBD",
                    room: newRoom.trim() || "TBD",
                    studentsCount: 0,
                  },
                  ...prev,
                ])
                setNewTitle("")
                setNewCourse("")
                setNewSchedule("")
                setNewRoom("")
                setCreateOpen(false)
              }}
            >
              Create class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
