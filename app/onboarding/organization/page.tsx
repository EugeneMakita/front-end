"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OnboardingShell } from "@/app/onboarding/_components/onboarding-shell"
import { useOnboardingState } from "@/app/onboarding/_components/onboarding-state"

export default function OnboardingOrganizationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "you@company.com"
  const { state, update, canContinueOrganization, regionOptions } = useOnboardingState(email)

  const entityLabel =
    state.setupType === "district"
      ? "District name"
      : state.setupType === "school"
      ? "School name"
      : state.setupType === "home-school"
      ? "Home school name"
      : "Class or organization name"
  const fieldClass = "h-8 rounded-none"
  const selectClass = "w-full rounded-none"
  const actionButtonClass = "h-8 rounded-none px-6"

  return (
    <OnboardingShell current="organization" email={state.email || email}>
      <Card className="mx-auto max-w-2xl rounded-none border-slate-300">
        <CardContent className="space-y-6 p-7">
          <h1 className="text-2xl font-semibold text-slate-800">
            Tell us about your {state.setupType === "district" ? "district" : "school"}
          </h1>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>First name *</Label>
              <Input
                className={fieldClass}
                value={state.firstName}
                onChange={(event) => update({ firstName: event.target.value })}
                placeholder="First name"
              />
            </div>
            <div className="space-y-2">
              <Label>Last name *</Label>
              <Input
                className={fieldClass}
                value={state.lastName}
                onChange={(event) => update({ lastName: event.target.value })}
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Country *</Label>
              <Select value={state.country} onValueChange={(value) => update({ country: value })}>
                <SelectTrigger size="sm" className={selectClass}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Province / State *</Label>
              <Select value={state.region} onValueChange={(value) => update({ region: value })}>
                <SelectTrigger size="sm" className={selectClass}>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regionOptions.map((entry) => (
                    <SelectItem key={entry} value={entry}>
                      {entry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{entityLabel} *</Label>
            <Input
              className={fieldClass}
              value={state.organizationName}
              onChange={(event) => update({ organizationName: event.target.value })}
              placeholder="Enter name"
            />
          </div>

          <div className="flex justify-end">
            <Button
              className={actionButtonClass}
              onClick={() => router.push("/onboarding/invite")}
              disabled={!canContinueOrganization}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </OnboardingShell>
  )
}
