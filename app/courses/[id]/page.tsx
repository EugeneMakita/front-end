"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  CaretDownIcon,
  CaretRightIcon,
  MegaphoneIcon,
} from "@phosphor-icons/react"
import { mockCourses } from "@/lib/mock-courses"

const tabs = ["Course", "Information", "Participants", "Grades", "Badges", "More"]

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const course = mockCourses.find((c) => c.id === courseId)

  const [activeTab, setActiveTab] = React.useState("Course")
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    () => new Set(course?.sections.map((s) => s.id) ?? [])
  )

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    )
  }

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
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
        <Link
          href="/courses"
          className="hover:text-foreground transition-colors"
        >
          Courses
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{course.title}</span>
      </nav>

      {/* Tabs */}
      <div className="border-b mb-8">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                activeTab === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

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
    </div>
  )
}
