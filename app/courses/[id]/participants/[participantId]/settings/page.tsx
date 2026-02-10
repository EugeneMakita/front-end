"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  UserMinusIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { mockParticipants } from "@/lib/mock-participants"

export default function ParticipantSettingsPage() {
  const params = useParams()
  const participantId = params.participantId as string
  const participant = mockParticipants.find((p) => p.id === participantId)

  const [role, setRole] = React.useState("")

  React.useEffect(() => {
    if (participant) setRole(participant.role)
  }, [participant])

  if (!participant) return null

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Role</h2>
        <div className="border rounded-lg p-5 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Change role
              </p>
              <p className="text-xs text-muted-foreground">
                Update this participant&apos;s role in the course
              </p>
            </div>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Learner">Learner</SelectItem>
                <SelectItem value="Teaching Assistant">Teaching Assistant</SelectItem>
                <SelectItem value="Instructor">Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Access</h2>
        <div className="border rounded-lg p-5 bg-card divide-y">
          <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Suspend user
              </p>
              <p className="text-xs text-muted-foreground">
                Temporarily prevent this user from accessing the course
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Restrict forum posting
              </p>
              <p className="text-xs text-muted-foreground">
                Prevent this user from creating or replying to forum threads
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button>Save Changes</Button>
        <Button variant="ghost">Cancel</Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
        <div className="border border-destructive/30 rounded-lg p-5 bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Unenrol user</p>
              <p className="text-xs text-muted-foreground">
                Remove this participant from the course entirely
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <UserMinusIcon size={14} />
              Unenrol
            </Button>
          </div>
          <div className="border-t border-destructive/20" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Report user</p>
              <p className="text-xs text-muted-foreground">
                Flag this user for review by administrators
              </p>
            </div>
            <Button variant="destructive" size="sm" className="gap-1.5">
              <WarningCircleIcon size={14} />
              Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
