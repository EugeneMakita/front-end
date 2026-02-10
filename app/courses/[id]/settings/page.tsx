"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  TrashIcon,
  ArchiveIcon,
} from "@phosphor-icons/react"
import { mockCourses } from "@/lib/mock-courses"

const roles = ["Instructor", "Teaching Assistant", "Learner"] as const

export default function SettingsPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find((c) => c.id === courseId)

  // General
  const [title, setTitle] = React.useState(course?.title ?? "")
  const [description, setDescription] = React.useState(course?.description ?? "")
  const [category, setCategory] = React.useState<string>(course?.category ?? "course")

  // Schedule
  const [startDate, setStartDate] = React.useState(course?.startDate ?? "")
  const [endDate, setEndDate] = React.useState(course?.endDate ?? "")
  const [isActive, setIsActive] = React.useState(() => {
    if (!course) return false
    const now = new Date()
    return now >= new Date(course.startDate) && now <= new Date(course.endDate)
  })

  // Features
  const [enableForum, setEnableForum] = React.useState(true)
  const [enableWiki, setEnableWiki] = React.useState(true)
  const [archiveForumAfterEnd, setArchiveForumAfterEnd] = React.useState(false)
  const [archiveStudentsAfterEnd, setArchiveStudentsAfterEnd] = React.useState(false)
  const [allowFileUploads, setAllowFileUploads] = React.useState(true)

  // Communication
  const [dmRoles, setDmRoles] = React.useState<Set<string>>(
    new Set(["Instructor", "Teaching Assistant"])
  )

  function toggleDmRole(role: string) {
    setDmRoles((prev) => {
      const next = new Set(prev)
      if (next.has(role)) next.delete(role)
      else next.add(role)
      return next
    })
  }

  if (!course) return null

  return (
    <div className="space-y-8 pb-8">
      {/* General */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">General</h2>
        <div className="border rounded-lg p-5 bg-card space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Input
              className="text-gray-900 dark:text-gray-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Textarea
              className="text-gray-900 dark:text-gray-100 min-h-[100px] resize-vertical"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="resource">Resource</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Schedule</h2>
        <div className="border rounded-lg p-5 bg-card space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <Input
                type="date"
                className="text-gray-900 dark:text-gray-100"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date
              </label>
              <Input
                type="date"
                className="text-gray-900 dark:text-gray-100"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Active Status</p>
                <p className="text-xs text-muted-foreground">
                  Manually override whether this course is currently active
                </p>
              </div>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Features</h2>
        <div className="border rounded-lg p-5 bg-card space-y-0 divide-y">
          <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Enable Forum</p>
              <p className="text-xs text-muted-foreground">
                Allow participants to create and reply to discussion threads
              </p>
            </div>
            <Switch checked={enableForum} onCheckedChange={setEnableForum} />
          </div>
          <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Enable Wiki</p>
              <p className="text-xs text-muted-foreground">
                Allow participants to collaboratively edit wiki pages
              </p>
            </div>
            <Switch checked={enableWiki} onCheckedChange={setEnableWiki} />
          </div>
          <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Archive forum after end date</p>
              <p className="text-xs text-muted-foreground">
                Automatically lock all threads when the course ends
              </p>
            </div>
            <Switch checked={archiveForumAfterEnd} onCheckedChange={setArchiveForumAfterEnd} />
          </div>
          <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Archive students after end date</p>
              <p className="text-xs text-muted-foreground">
                Automatically archive student enrolments when the course ends
              </p>
            </div>
            <Switch checked={archiveStudentsAfterEnd} onCheckedChange={setArchiveStudentsAfterEnd} />
          </div>
          <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Allow student file uploads</p>
              <p className="text-xs text-muted-foreground">
                Let students attach files to forum posts and submissions
              </p>
            </div>
            <Switch checked={allowFileUploads} onCheckedChange={setAllowFileUploads} />
          </div>
        </div>
      </div>

      {/* Communication */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Communication</h2>
        <div className="border rounded-lg p-5 bg-card space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              Allow DMs from students to
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Select which roles students can send direct messages to
            </p>
          </div>
          <div className="space-y-3">
            {roles.map((role) => (
              <label
                key={role}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={dmRoles.has(role)}
                  onCheckedChange={() => toggleDmRole(role)}
                />
                <span className="text-sm text-gray-900 dark:text-gray-100">{role}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
        <div className="border border-destructive/30 rounded-lg p-5 bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Archive Course</p>
              <p className="text-xs text-muted-foreground">
                Hide this course from active listings. Can be restored later.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArchiveIcon size={14} />
              Archive
            </Button>
          </div>
          <div className="border-t border-destructive/20" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Delete Course</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete this course and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" size="sm" className="gap-1.5">
              <TrashIcon size={14} />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Save / Cancel */}
      <div className="flex items-center gap-3 pt-2">
        <Button>Save Changes</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  )
}
