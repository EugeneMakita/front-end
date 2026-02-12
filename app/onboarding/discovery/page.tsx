"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export default function OnboardingDiscoveryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "you@company.com"
  const { state, update, canContinueDiscovery, reset } = useOnboardingState(email)

  return (
    <OnboardingShell current="discovery" email={state.email || email}>
      <Card className="mx-auto max-w-2xl rounded-none border-slate-300">
        <CardContent className="space-y-6 p-7">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-800">Almost done</h1>
            <p className="text-sm text-slate-600">One last question to help us improve onboarding.</p>
          </div>

          <div className="space-y-2">
            <Label>Where did you hear about us? *</Label>
            <Select value={state.heardFrom} onValueChange={(value) => update({ heardFrom: value })}>
              <SelectTrigger size="sm" className="w-full rounded-none">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">Google / Search</SelectItem>
                <SelectItem value="social">Social media</SelectItem>
                <SelectItem value="friend">Friend or colleague</SelectItem>
                <SelectItem value="school">School recommendation</SelectItem>
                <SelectItem value="event">Conference or event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="h-8 rounded-none"
              onClick={() => {
                reset()
                router.push("/")
              }}
            >
              Skip for now
            </Button>
            <Button
              className="h-8 rounded-none px-6"
              disabled={!canContinueDiscovery}
              onClick={() => {
                reset()
                router.push("/")
              }}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </OnboardingShell>
  )
}
