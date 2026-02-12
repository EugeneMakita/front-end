"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { mockAssignments } from "@/lib/mock-assignments"

const tabs = [
  { label: "Questions", href: "/questions" },
  { label: "Generated", href: "/generated" },
  { label: "Practice", href: "/practice" },
  { label: "Grades", href: "/grades" },
  { label: "Settings", href: "/settings" },
]

function truncateLabel(label: string, max = 30) {
  return label.length > max ? `${label.slice(0, max)}...` : label
}

export default function AssignmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const assignmentId = params.id as string
  const assignment = mockAssignments.find((item) => item.id === assignmentId)

  if (!assignment) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-muted-foreground">Assignment not found</p>
      </div>
    )
  }

  const basePath = `/assignments/${assignmentId}`
  const activeTab = tabs.find((tab) => pathname.startsWith(`${basePath}${tab.href}`))

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
        <Link href="/assignments" className="hover:text-foreground transition-colors">
          Assignments
        </Link>
        <span>/</span>
        <Link href={`${basePath}/questions`} className="hover:text-foreground transition-colors" title={assignment.title}>
          {truncateLabel(assignment.title)}
        </Link>
        {activeTab && (
          <>
            <span>/</span>
            <span className="text-foreground font-medium">{activeTab.label}</span>
          </>
        )}
      </nav>

      <h1 className="text-2xl font-bold mb-6">{assignment.title}</h1>

      <div className="border-b mb-8">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => {
            const href = `${basePath}${tab.href}`
            const isActive = activeTab?.label === tab.label
            return (
              <Link
                key={tab.label}
                href={href}
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

      {children}
    </div>
  )
}
