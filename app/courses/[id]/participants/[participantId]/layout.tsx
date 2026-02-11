"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { UserCircleIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { mockParticipants } from "@/lib/mock-participants"

const participantTabs = [
  { label: "Profile", href: "" },
  { label: "Grades", href: "/grades" },
  { label: "Permissions", href: "/permissions" },
  { label: "Settings", href: "/settings" },
]

export default function ParticipantDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const courseId = params.id as string
  const participantId = params.participantId as string

  const participant = mockParticipants.find((p) => p.id === participantId)

  if (!participant) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Participant not found.</p>
      </div>
    )
  }

  const basePath = `/courses/${courseId}/participants/${participantId}`

  const activeTab = participantTabs.find((tab) => {
    if (tab.href === "") return pathname === basePath
    return pathname === `${basePath}${tab.href}`
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-5 mb-6">
        <UserCircleIcon
          size={72}
          weight="thin"
          className="text-muted-foreground shrink-0"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">
            {participant.firstName} {participant.lastName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {participant.role}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {participant.groups}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Last access: {participant.lastAccess}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex items-center gap-6">
          {participantTabs.map((tab) => {
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

      {children}
    </div>
  )
}
