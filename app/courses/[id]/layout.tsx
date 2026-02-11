"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { mockCourses } from "@/lib/mock-courses"
import { mockThreads } from "@/lib/mock-forum"
import { mockWikiPages } from "@/lib/mock-wiki"
import { mockParticipants } from "@/lib/mock-participants"

function truncateLabel(label: string, max = 25) {
  return label.length > max ? label.slice(0, max) + "\u2026" : label
}

const tabs = [
  { label: "Course", href: "" },
  { label: "Information", href: "/information" },
  { label: "Participants", href: "/participants" },
  { label: "Grades", href: "/grades" },
  { label: "Forum", href: "/forum" },
  { label: "Wiki", href: "/wiki" },
  { label: "Settings", href: "/settings" },
]

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const courseId = params.id as string
  const course = mockCourses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    )
  }

  const basePath = `/courses/${courseId}`

  // Determine active tab from pathname (use startsWith for nested routes)
  const activeTab = tabs.find((tab) => {
    if (tab.href === "") return pathname === basePath
    return pathname.startsWith(`${basePath}${tab.href}`)
  })

  // Build breadcrumb segments
  const breadcrumbSegments: { label: string; href: string }[] = [
    { label: "Courses", href: "/courses" },
    { label: course.title, href: basePath },
  ]

  if (activeTab && activeTab.href !== "") {
    const tabPath = `${basePath}${activeTab.href}`
    const isNestedRoute = pathname !== tabPath

    breadcrumbSegments.push({
      label: activeTab.label,
      href: tabPath,
    })

    // Handle nested sub-pages
    if (isNestedRoute) {
      // Extract the sub-path segment after the tab path
      const subPath = pathname.slice(tabPath.length)
      const segments = subPath.split("/").filter(Boolean)
      const subId = segments[0]

      if (activeTab.label === "Forum") {
        if (subId === "new") {
          breadcrumbSegments.push({
            label: "New Thread",
            href: pathname,
          })
        } else {
          const thread = mockThreads.find((t) => t.id === subId)
          if (thread) {
            breadcrumbSegments.push({
              label: thread.topic,
              href: pathname,
            })
          }
        }
      }

      if (activeTab.label === "Wiki") {
        if (subId === "new") {
          breadcrumbSegments.push({
            label: "New Page",
            href: pathname,
          })
        } else {
          const wikiPage = mockWikiPages.find((p) => p.id === subId)
          if (wikiPage) {
            breadcrumbSegments.push({
              label: wikiPage.title,
              href: pathname,
            })
          }
        }
      }

      if (activeTab.label === "Participants") {
        const participant = mockParticipants.find((p) => p.id === subId)
        if (participant) {
          const participantPath = `${tabPath}/${subId}`
          breadcrumbSegments.push({
            label: `${participant.firstName} ${participant.lastName}`,
            href: participantPath,
          })

          const participantSubTab = segments[1]
          if (participantSubTab) {
            const tabLabels: Record<string, string> = {
              grades: "Grades",
              permissions: "Permissions",
              settings: "Settings",
            }
            const tabLabel = tabLabels[participantSubTab]
            if (tabLabel) {
              breadcrumbSegments.push({
                label: tabLabel,
                href: pathname,
              })
            }
          }
        }
      }
    }
  }

  // Hide course-level tabs on participant detail page (it has its own tabs)
  const isParticipantDetail =
    activeTab?.label === "Participants" &&
    pathname !== `${basePath}/participants`

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
        {breadcrumbSegments.map((segment, i) => {
          const isLast = i === breadcrumbSegments.length - 1
          return (
            <React.Fragment key={segment.href}>
              {i > 0 && <span>/</span>}
              {isLast ? (
                <span className="text-foreground font-medium" title={segment.label}>
                  {truncateLabel(segment.label)}
                </span>
              ) : (
                <Link
                  href={segment.href}
                  className="hover:text-foreground transition-colors"
                  title={segment.label}
                >
                  {truncateLabel(segment.label)}
                </Link>
              )}
            </React.Fragment>
          )
        })}
      </nav>

      {/* Title */}
      {!isParticipantDetail && (
        <h1 className="text-2xl font-bold mb-6">{course.title}</h1>
      )}

      {/* Tabs */}
      {!isParticipantDetail && (
        <div className="border-b mb-8">
          <div className="flex items-center gap-6">
            {tabs.map((tab) => {
              const tabPath = tab.href === "" ? basePath : `${basePath}${tab.href}`
              const isActive = activeTab?.label === tab.label
              return (
                <Link
                  key={tab.label}
                  href={tabPath}
                  className={cn(
                    "pb-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Tab content */}
      {children}
    </div>
  )
}
