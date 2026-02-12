"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { mockClasses } from "@/lib/mock-classes"

const tabs = [
  { label: "Overview", href: "/overview" },
  { label: "Courses", href: "/courses" },
  { label: "Students", href: "/students" },
  { label: "Participants", href: "/participants" },
  { label: "Settings", href: "/settings" },
]

function truncateLabel(label: string, max = 32) {
  return label.length > max ? `${label.slice(0, max)}...` : label
}

export default function ClassLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const classId = params.id as string
  const classItem = mockClasses.find((item) => item.id === classId)

  if (!classItem) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-muted-foreground">Class not found</p>
      </div>
    )
  }

  const basePath = `/classes/${classId}`
  const activeTab = tabs.find((tab) => pathname.startsWith(`${basePath}${tab.href}`))

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/classes" className="hover:text-foreground transition-colors">
          Classes
        </Link>
        <span>/</span>
        <Link href={`${basePath}/overview`} className="hover:text-foreground transition-colors" title={classItem.title}>
          {truncateLabel(classItem.title)}
        </Link>
        {activeTab && (
          <>
            <span>/</span>
            <span className="text-foreground font-medium">{activeTab.label}</span>
          </>
        )}
      </nav>

      <h1 className="text-2xl font-bold mb-6">{classItem.title}</h1>

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
