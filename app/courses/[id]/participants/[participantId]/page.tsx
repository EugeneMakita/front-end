"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import {
  EnvelopeSimpleIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
} from "@phosphor-icons/react"
import { mockParticipants } from "@/lib/mock-participants"

export default function ParticipantProfilePage() {
  const params = useParams()
  const participantId = params.participantId as string
  const participant = mockParticipants.find((p) => p.id === participantId)

  if (!participant) return null

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <div className="border rounded-lg p-5 bg-card space-y-4">
          <div className="flex items-center gap-3">
            <EnvelopeSimpleIcon size={16} className="text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {participant.firstName.toLowerCase()}.{participant.lastName.toLowerCase()}@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Enrolment Details</h2>
        <div className="border rounded-lg p-5 bg-card">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <UsersIcon size={16} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Groups</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {participant.groups}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarIcon size={16} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Enrolled</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  January 13, 2026
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon size={16} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Last Access</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {participant.lastAccess}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
