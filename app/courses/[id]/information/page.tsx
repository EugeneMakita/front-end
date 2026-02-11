"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ClockIcon } from "@phosphor-icons/react"
import { mockCourses } from "@/lib/mock-courses"
import { mockParticipants } from "@/lib/mock-participants"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function InformationPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find((c) => c.id === courseId)
  const teachingAssistants = mockParticipants.filter((p) => p.role === "Teaching Assistant")
  const instructors = mockParticipants.filter((p) => p.role === "Instructor")
  const teachingTeam = [
    ...instructors.map((p) => ({ ...p, roleLabel: "Instructor" })),
    ...teachingAssistants.map((p) => ({ ...p, roleLabel: "Teaching Assistant" })),
  ]

  if (!course) return null

  const start = new Date(course.startDate)
  const end = new Date(course.endDate)
  const now = new Date()
  const isActive = now >= start && now <= end
  const isUpcoming = now < start
  const isCompleted = now > end

  return (
    <div className="space-y-8">
      {/* About */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {course.description}
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize text-xs">
            {course.category}
          </Badge>
          {isActive && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
              Active
            </Badge>
          )}
          {isUpcoming && (
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">
              Upcoming
            </Badge>
          )}
          {isCompleted && (
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs">
              Completed
            </Badge>
          )}
        </div>
      </div>

      {/* Instructors */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Instructors</h2>
        <div className="space-y-2">
          {teachingTeam.length > 0 ? (
            teachingTeam.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between gap-3 py-1"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar size="sm">
                    <AvatarFallback>
                      {person.firstName.charAt(0)}
                      {person.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    href={`/courses/${courseId}/participants/${person.id}`}
                    className="truncate text-sm font-medium text-primary hover:underline"
                  >
                    {person.firstName} {person.lastName}
                  </Link>
                  <Badge variant="outline" className="rounded-full text-[11px]">
                    {person.roleLabel}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  Last access: {person.lastAccess}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">No teaching team assigned.</p>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Progress</h2>
        <div className="border rounded-lg p-4 bg-card space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completion</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
            <div
              className="h-full bg-primary transition-all rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ClockIcon size={14} />
            <span>Last updated {course.updatedAt}</span>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Schedule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-card space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon size={16} />
              <span>Start date</span>
            </div>
            <p className="text-sm font-medium">{formatDate(course.startDate)}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon size={16} />
              <span>End date</span>
            </div>
            <p className="text-sm font-medium">{formatDate(course.endDate)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
