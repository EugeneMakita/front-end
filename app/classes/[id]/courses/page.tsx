"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DotsThreeIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { mockClasses } from "@/lib/mock-classes"
import { mockCourses } from "@/lib/mock-courses"

export default function ClassCoursesPage() {
  const params = useParams()
  const classId = params.id as string
  const classItem = mockClasses.find((item) => item.id === classId)

  const initialLinked = mockCourses
    .filter((course) => classItem && course.title === classItem.course)
    .concat(mockCourses.filter((course) => !classItem || course.title !== classItem.course).slice(0, 2))

  const [linkedCourses, setLinkedCourses] = React.useState(initialLinked)
  const [search, setSearch] = React.useState("")
  const [filterCategory, setFilterCategory] = React.useState("all")
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [addOpen, setAddOpen] = React.useState(false)
  const [newCourseId, setNewCourseId] = React.useState("")

  const filteredCourses = linkedCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = filterCategory === "all" || course.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const allSelected =
    filteredCourses.length > 0 && filteredCourses.every((course) => selectedIds.has(course.id))

  const availableToAdd = mockCourses.filter(
    (course) => !linkedCourses.some((linked) => linked.id === course.id)
  )

  if (!classItem) return null

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds(new Set())
      return
    }
    setSelectedIds(new Set(filteredCourses.map((course) => course.id)))
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function removeCourse(id: string) {
    setLinkedCourses((prev) => prev.filter((course) => course.id !== id))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function removeSelected() {
    setLinkedCourses((prev) => prev.filter((course) => !selectedIds.has(course.id)))
    setSelectedIds(new Set())
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Courses linked to this class.
        </p>
        <Button className="h-9 gap-2" onClick={() => setAddOpen(true)}>
          <PlusIcon size={14} />
          Add course
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} />
          {selectedIds.size > 0 ? (
            <span className="text-sm text-muted-foreground">
              With <span className="font-semibold text-foreground">{selectedIds.size}</span> selected:
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">Select all</span>
          )}
        </div>

        {selectedIds.size > 0 && (
          <Select value="" onValueChange={(value) => value === "remove" && removeSelected()}>
            <SelectTrigger className="h-9 w-[190px]">
              <SelectValue placeholder="Select action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remove">
                <div className="flex items-center gap-2 text-destructive">
                  <TrashIcon size={14} />
                  <span>Remove course(s)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}

        <div className="ml-auto flex items-center gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-9 w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="project">Project</SelectItem>
              <SelectItem value="resource">Resource</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[220px]">
            <MagnifyingGlassIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="h-9 pl-9"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[40px]" />
            <TableHead>Course</TableHead>
            <TableHead className="w-[140px]">Category</TableHead>
            <TableHead className="w-[140px] text-right">Progress</TableHead>
            <TableHead className="w-[130px]">Updated</TableHead>
            <TableHead className="w-[70px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.has(course.id)}
                  onCheckedChange={() => toggleSelect(course.id)}
                  aria-label={`Select ${course.title}`}
                />
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`/courses/${course.id}`} className="text-primary hover:underline">
                  {course.title}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {course.category}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{course.progress}%</TableCell>
              <TableCell>{course.updatedAt}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <DotsThreeIcon size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem variant="destructive" onSelect={() => removeCourse(course.id)}>
                      <TrashIcon size={14} />
                      <span>Remove course</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {filteredCourses.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                No courses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add course</DialogTitle>
            <DialogDescription>
              Link an additional course to this class.
            </DialogDescription>
          </DialogHeader>
          <Select value={newCourseId} onValueChange={setNewCourseId}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select course..." />
            </SelectTrigger>
            <SelectContent>
              {availableToAdd.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const chosen = mockCourses.find((course) => course.id === newCourseId)
                if (chosen) {
                  setLinkedCourses((prev) => [...prev, chosen])
                }
                setNewCourseId("")
                setAddOpen(false)
              }}
              disabled={!newCourseId}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
