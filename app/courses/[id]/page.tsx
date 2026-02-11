"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CaretDownIcon,
  CaretUpIcon,
  CheckIcon,
  CodeIcon,
  FileTextIcon,
  LinkSimpleIcon,
  NotePencilIcon,
  PlusIcon,
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { mockCourses, type CourseItem } from "@/lib/mock-courses"
import { cn } from "@/lib/utils"

type ChapterStatus = "available" | "locked" | "completed"
type LessonType = "reading" | "coding" | "practice" | "resource"

type Lesson = {
  id: string
  title: string
  type: LessonType
  xp: number
  completed: boolean
}

type Chapter = {
  id: string
  order: number
  title: string
  description: string
  status: ChapterStatus
  progress: number
  lessons: Lesson[]
}

function createLessons(sectionId: string, title: string, progress: number): Lesson[] {
  return [
    {
      id: `${sectionId}-lesson-1`,
      title: `Introduction to ${title}`,
      type: "reading",
      xp: 50,
      completed: progress >= 30,
    },
    {
      id: `${sectionId}-lesson-2`,
      title: `${title} guided practice`,
      type: "practice",
      xp: 50,
      completed: progress >= 60,
    },
    {
      id: `${sectionId}-lesson-3`,
      title: `Coding exercise: ${title}`,
      type: "coding",
      xp: 100,
      completed: progress >= 100,
    },
  ]
}

function createInitialChapters(course: CourseItem): Chapter[] {
  return course.sections.map((section, index) => {
    const estimatedProgress = Math.max(0, Math.min(100, course.progress - index * 25))
    const status: ChapterStatus =
      estimatedProgress >= 100 ? "completed" : index === 0 ? "available" : "locked"

    return {
      id: section.id,
      order: index + 1,
      title: section.title,
      description: section.content ?? "Chapter content and activities.",
      status,
      progress: status === "locked" ? 0 : estimatedProgress,
      lessons: createLessons(section.id, section.title, estimatedProgress),
    }
  })
}

function statusBadge(status: ChapterStatus) {
  if (status === "completed") return { label: "Completed", variant: "secondary" as const }
  if (status === "available") return { label: "Available", variant: "outline" as const }
  return { label: "Locked", variant: "outline" as const }
}

function lessonIcon(type: LessonType) {
  if (type === "coding") return <CodeIcon size={18} className="text-muted-foreground" />
  if (type === "resource") return <LinkSimpleIcon size={18} className="text-muted-foreground" />
  return <FileTextIcon size={18} className="text-muted-foreground" />
}

export default function CourseTabPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find((item) => item.id === courseId)

  const [chapters, setChapters] = React.useState<Chapter[]>(() =>
    course ? createInitialChapters(course) : []
  )
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set())

  const [chapterDialogOpen, setChapterDialogOpen] = React.useState(false)
  const [editingChapterId, setEditingChapterId] = React.useState<string | null>(null)
  const [chapterDraft, setChapterDraft] = React.useState({
    title: "",
    description: "",
    status: "available" as ChapterStatus,
    progress: 0,
  })

  const [lessonDialogOpen, setLessonDialogOpen] = React.useState(false)
  const [lessonEditor, setLessonEditor] = React.useState<{ chapterId: string; lessonId: string | null } | null>(null)
  const [lessonDraft, setLessonDraft] = React.useState({
    title: "",
    type: "reading" as LessonType,
    xp: 50,
    completed: false,
  })

  React.useEffect(() => {
    if (!course) return
    const initial = createInitialChapters(course)
    setChapters(initial)
    setExpanded(new Set(initial.slice(0, 1).map((item) => item.id)))
  }, [courseId, course])

  if (!course) return null

  const allExpanded = chapters.length > 0 && chapters.every((chapter) => expanded.has(chapter.id))

  function toggleChapter(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    setExpanded(
      allExpanded ? new Set() : new Set(chapters.map((chapter) => chapter.id))
    )
  }

  function openEditChapter(chapter: Chapter) {
    setEditingChapterId(chapter.id)
    setChapterDraft({
      title: chapter.title,
      description: chapter.description,
      status: chapter.status,
      progress: chapter.progress,
    })
    setChapterDialogOpen(true)
  }

  function openCreateChapter() {
    setEditingChapterId(null)
    setChapterDraft({
      title: "New chapter",
      description: "Chapter overview and objectives.",
      status: "available",
      progress: 0,
    })
    setChapterDialogOpen(true)
  }

  function saveChapter() {
    const normalizedProgress = Math.max(0, Math.min(100, Number(chapterDraft.progress) || 0))

    if (!editingChapterId) {
      const newChapter: Chapter = {
        id: `chapter-${Date.now()}`,
        order: chapters.length + 1,
        title: chapterDraft.title.trim(),
        description: chapterDraft.description.trim(),
        status: chapterDraft.status,
        progress: normalizedProgress,
        lessons: [],
      }
      setChapters((prev) => [...prev, newChapter])
      setExpanded((prev) => new Set(prev).add(newChapter.id))
      setChapterDialogOpen(false)
      return
    }

    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === editingChapterId
          ? {
              ...chapter,
              title: chapterDraft.title.trim(),
              description: chapterDraft.description.trim(),
              status: chapterDraft.status,
              progress: normalizedProgress,
            }
          : chapter
      )
    )
    setChapterDialogOpen(false)
  }

  function openCreateLesson(chapterId: string) {
    setLessonEditor({ chapterId, lessonId: null })
    setLessonDraft({
      title: "New lesson",
      type: "reading",
      xp: 50,
      completed: false,
    })
    setLessonDialogOpen(true)
  }

  function openEditLesson(chapterId: string, lesson: Lesson) {
    setLessonEditor({ chapterId, lessonId: lesson.id })
    setLessonDraft({
      title: lesson.title,
      type: lesson.type,
      xp: lesson.xp,
      completed: lesson.completed,
    })
    setLessonDialogOpen(true)
  }

  function saveLesson() {
    if (!lessonEditor) return
    const safeXp = Math.max(0, Number(lessonDraft.xp) || 0)

    setChapters((prev) =>
      prev.map((chapter) => {
        if (chapter.id !== lessonEditor.chapterId) return chapter
        if (!lessonEditor.lessonId) {
          return {
            ...chapter,
            lessons: [
              ...chapter.lessons,
              {
                id: `lesson-${Date.now()}`,
                title: lessonDraft.title.trim(),
                type: lessonDraft.type,
                xp: safeXp,
                completed: lessonDraft.completed,
              },
            ],
          }
        }
        return {
          ...chapter,
          lessons: chapter.lessons.map((lesson) =>
            lesson.id === lessonEditor.lessonId
              ? {
                  ...lesson,
                  title: lessonDraft.title.trim(),
                  type: lessonDraft.type,
                  xp: safeXp,
                  completed: lessonDraft.completed,
                }
              : lesson
          ),
        }
      })
    )

    setLessonDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" className="rounded-none" onClick={openCreateChapter}>
          <PlusIcon size={14} />
          Add chapter
        </Button>
        <button onClick={toggleAll} className="text-sm text-foreground hover:underline">
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter) => {
          const isExpanded = expanded.has(chapter.id)
          const status = statusBadge(chapter.status)

          return (
            <div key={chapter.id} className="rounded-none border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {chapter.order}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">{chapter.title}</h3>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                </div>

                <div className="flex min-w-[210px] items-center gap-3">
                  <div className="h-3 flex-1 bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${chapter.progress}%` }} />
                  </div>
                  <span className="w-10 text-right text-sm font-medium text-muted-foreground">
                    {chapter.progress}%
                  </span>
                </div>
              </div>

              <p className="mt-5 max-w-5xl text-sm text-muted-foreground">{chapter.description}</p>

              <Separator className="my-5" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  {isExpanded ? "Hide Chapter Details" : "View Chapter Details"}
                  {isExpanded ? <CaretUpIcon size={20} /> : <CaretDownIcon size={20} />}
                </button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="rounded-none"
                    onClick={() => openEditChapter(chapter)}
                  >
                    <NotePencilIcon size={14} />
                    Edit chapter
                  </Button>
                  <Button className="rounded-none">
                    {chapter.progress > 0 ? "Continue Chapter" : "Start Chapter"}
                  </Button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-5 space-y-3">
                  {chapter.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between gap-3 border-b py-2"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {lessonIcon(lesson.type)}
                        <span className="truncate text-sm font-medium text-foreground">{lesson.title}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {lesson.completed && <CheckIcon size={22} className="text-foreground" />}
                        <span className="min-w-[74px] text-right text-sm font-medium text-foreground">
                          {lesson.xp} XP
                        </span>
                        <Button
                          variant="ghost"
                          className="rounded-none text-foreground"
                          onClick={() => openEditLesson(chapter.id, lesson)}
                        >
                          <NotePencilIcon size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    className="mt-2 rounded-none text-foreground"
                    onClick={() => openCreateLesson(chapter.id)}
                  >
                    <PlusIcon size={14} />
                    Add lesson
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Dialog open={chapterDialogOpen} onOpenChange={setChapterDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingChapterId ? "Edit chapter" : "Create chapter"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="chapter-title">Title</Label>
              <Input
                id="chapter-title"
                value={chapterDraft.title}
                onChange={(event) =>
                  setChapterDraft((prev) => ({ ...prev, title: event.target.value }))
                }
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="chapter-description">Description</Label>
              <Textarea
                id="chapter-description"
                value={chapterDraft.description}
                onChange={(event) =>
                  setChapterDraft((prev) => ({ ...prev, description: event.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Status</Label>
                <Select
                  value={chapterDraft.status}
                  onValueChange={(value: ChapterStatus) =>
                    setChapterDraft((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="h-8 rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="locked">Locked</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="chapter-progress">Progress (%)</Label>
                <Input
                  id="chapter-progress"
                  type="number"
                  min={0}
                  max={100}
                  value={chapterDraft.progress}
                  onChange={(event) =>
                    setChapterDraft((prev) => ({ ...prev, progress: Number(event.target.value) }))
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" className="rounded-none" onClick={() => setChapterDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="rounded-none" onClick={saveChapter}>
              Save chapter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{lessonEditor?.lessonId ? "Edit lesson" : "Create lesson"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="lesson-title">Title</Label>
              <Input
                id="lesson-title"
                value={lessonDraft.title}
                onChange={(event) =>
                  setLessonDraft((prev) => ({ ...prev, title: event.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Type</Label>
                <Select
                  value={lessonDraft.type}
                  onValueChange={(value: LessonType) =>
                    setLessonDraft((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="h-8 rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="lesson-xp">XP</Label>
                <Input
                  id="lesson-xp"
                  type="number"
                  min={0}
                  value={lessonDraft.xp}
                  onChange={(event) =>
                    setLessonDraft((prev) => ({ ...prev, xp: Number(event.target.value) }))
                  }
                />
              </div>
            </div>

            <button
              className={cn(
                "inline-flex h-8 items-center justify-start rounded-none border px-2 text-xs font-medium",
                lessonDraft.completed ? "border-emerald-500 text-emerald-600" : "border-border"
              )}
              onClick={() =>
                setLessonDraft((prev) => ({ ...prev, completed: !prev.completed }))
              }
            >
              {lessonDraft.completed ? "Marked completed" : "Mark as completed"}
            </button>
          </div>

          <DialogFooter>
            <Button variant="outline" className="rounded-none" onClick={() => setLessonDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="rounded-none" onClick={saveLesson}>
              Save lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
