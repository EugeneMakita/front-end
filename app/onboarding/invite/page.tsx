"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UsersThreeIcon } from "@phosphor-icons/react"
import { OnboardingShell } from "@/app/onboarding/_components/onboarding-shell"
import { useOnboardingState } from "@/app/onboarding/_components/onboarding-state"

export default function OnboardingInvitePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "you@company.com"
  const { state, update, canAddInvite, addInvite, getInitials, reset } = useOnboardingState(email)
  const fieldClass = "h-8 rounded-none"
  const selectClass = "w-full rounded-none"
  const actionButtonClass = "h-8 rounded-none px-6"

  return (
    <OnboardingShell current="invite">
      <Card className="mx-auto max-w-2xl rounded-none border-slate-300">
        <CardContent className="space-y-6 p-7">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-800">Invite your team</h1>
            <p className="text-sm text-slate-600">
              Add colleagues now, or skip and invite them later from settings.
            </p>
          </div>

          <div className="space-y-4 rounded-none border border-slate-300 bg-white p-4">
            <h2 className="text-lg font-semibold text-slate-800">Team members</h2>
            <p className="text-sm text-slate-600">Invite your team members to collaborate.</p>

            <div className="grid gap-3 md:grid-cols-[1fr_1fr_180px_auto]">
              <Input
                className={fieldClass}
                placeholder="Full name"
                value={state.inviteName}
                onChange={(event) => update({ inviteName: event.target.value, inviteError: "" })}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    addInvite()
                  }
                }}
              />
              <Input
                className={fieldClass}
                placeholder="Email"
                value={state.inviteEmail}
                onChange={(event) => update({ inviteEmail: event.target.value, inviteError: "" })}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    addInvite()
                  }
                }}
              />
              <Select value={state.inviteRole} onValueChange={(value) => update({ inviteRole: value })}>
                <SelectTrigger size="sm" className={selectClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Assistant">Teaching assistant</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" className="h-8 rounded-none px-4" onClick={addInvite} disabled={!canAddInvite}>
                Add
              </Button>
            </div>
            {state.inviteError && <p className="text-xs text-red-600">{state.inviteError}</p>}

            <div className="space-y-2">
              {state.teamInvites.length === 0 ? (
                <div className="rounded-none border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-500">
                  No invites yet. Add at least one teammate or skip for now.
                </div>
              ) : (
                state.teamInvites.map((invite, index) => (
                  <div
                    key={`${invite.email}-${index}`}
                    className="grid items-center gap-3 rounded-none border border-slate-200 px-3 py-3 md:grid-cols-[52px_1fr_170px]"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-sm font-semibold text-slate-700">
                      {getInitials(invite.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{invite.name}</p>
                      <p className="truncate text-xs text-slate-600">{invite.email}</p>
                    </div>
                    <Select
                      value={invite.role}
                      onValueChange={(value) =>
                        update({
                          teamInvites: state.teamInvites.map((entry, entryIndex) =>
                            entryIndex === index ? { ...entry, role: value } : entry
                          ),
                        })
                      }
                    >
                      <SelectTrigger size="sm" className={selectClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Assistant">Teaching assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))
              )}
            </div>

            <div className="inline-flex items-center gap-2 rounded-none border border-slate-300 bg-white px-3 py-2 text-xs text-slate-600">
              <UsersThreeIcon size={16} />
              <span>Invites send after finish</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" className={fieldClass} onClick={() => { reset(); router.push("/") }}>
              Skip for now
            </Button>
            <Button
              className={actionButtonClass}
              onClick={() => router.push("/onboarding/discovery")}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </OnboardingShell>
  )
}
