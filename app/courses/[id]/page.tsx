"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  CaretDownIcon,
  CaretRightIcon,
  MegaphoneIcon,
} from "@phosphor-icons/react"
import { mockCourses } from "@/lib/mock-courses"

export default function CourseTabPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find((c) => c.id === courseId)

  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    () => new Set(course?.sections.map((s) => s.id) ?? [])
  )

  if (!course) return null

  const allExpanded = course.sections.every((s) => expandedSections.has(s.id))

  function toggleSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (allExpanded) {
      setExpandedSections(new Set())
    } else {
      setExpandedSections(new Set(course.sections.map((s) => s.id)))
    }
  }

  return (
    <>
      {/* Collapse all button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleAll}
          className="text-sm text-primary hover:underline"
        >
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {course.sections.map((section) => {
          const isExpanded = expandedSections.has(section.id)
          return (
            <div
              key={section.id}
              className="border rounded-lg bg-card"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center gap-3 w-full px-5 py-4 text-left"
              >
                <span className="shrink-0 text-muted-foreground">
                  {isExpanded ? (
                    <CaretDownIcon size={20} />
                  ) : (
                    <CaretRightIcon size={20} />
                  )}
                </span>
                <span className="text-lg font-semibold">{section.title}</span>
              </button>

              {isExpanded && (section.content || section.link) && (
                <div className="px-5 pb-5 pl-12">
                  {section.link && (
                    <div className="flex items-center gap-2 mb-2">
                      <MegaphoneIcon size={20} className="text-orange-500 shrink-0" />
                      <a
                        href={section.link.href}
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        {section.link.label}
                      </a>
                    </div>
                  )}
                  {section.content && (
                    <p className="text-sm text-muted-foreground">
                      {section.content}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
