"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { mockParticipants } from "@/lib/mock-participants"

const rolePermissions: Record<string, { label: string; granted: boolean }[]> = {
  Instructor: [
    { label: "Create and manage course content", granted: true },
    { label: "Grade assignments and exams", granted: true },
    { label: "Manage participants", granted: true },
    { label: "Moderate forum posts", granted: true },
    { label: "Edit wiki pages", granted: true },
    { label: "View analytics and reports", granted: true },
    { label: "Configure course settings", granted: true },
  ],
  "Teaching Assistant": [
    { label: "Create and manage course content", granted: false },
    { label: "Grade assignments and exams", granted: true },
    { label: "Manage participants", granted: false },
    { label: "Moderate forum posts", granted: true },
    { label: "Edit wiki pages", granted: true },
    { label: "View analytics and reports", granted: true },
    { label: "Configure course settings", granted: false },
  ],
  Learner: [
    { label: "Create and manage course content", granted: false },
    { label: "Grade assignments and exams", granted: false },
    { label: "Manage participants", granted: false },
    { label: "Moderate forum posts", granted: false },
    { label: "Edit wiki pages", granted: true },
    { label: "View analytics and reports", granted: false },
    { label: "Configure course settings", granted: false },
  ],
}

export default function ParticipantPermissionsPage() {
  const params = useParams()
  const participantId = params.participantId as string
  const participant = mockParticipants.find((p) => p.id === participantId)

  const [permissions, setPermissions] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    if (participant) {
      const perms = rolePermissions[participant.role] ?? []
      setPermissions(
        Object.fromEntries(perms.map((p) => [p.label, p.granted]))
      )
    }
  }, [participant])

  if (!participant) return null

  const permissionLabels = (rolePermissions[participant.role] ?? []).map((p) => p.label)

  function togglePermission(label: string) {
    setPermissions((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Role Permissions</h2>
      <p className="text-xs text-muted-foreground">
        Customise permissions for <span className="font-medium text-foreground">{participant.firstName} {participant.lastName}</span>. Defaults are based on the <span className="font-medium text-foreground">{participant.role}</span> role.
      </p>
      <div className="border rounded-lg p-5 bg-card divide-y">
        {permissionLabels.map((label) => (
          <div
            key={label}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <span className="text-sm text-gray-900 dark:text-gray-100">
              {label}
            </span>
            <Switch
              checked={permissions[label] ?? false}
              onCheckedChange={() => togglePermission(label)}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Button>Save Changes</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  )
}
