"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { OnboardingShell } from "@/app/onboarding/_components/onboarding-shell"
import { useOnboardingState } from "@/app/onboarding/_components/onboarding-state"

const options = [
  { key: "entrepreneur", label: "Entrepreneur / Business owner" },
  { key: "student", label: "Student" },
  { key: "influencer", label: "Influencer / Content creator" },
  { key: "educator", label: "Educator" },
  { key: "developer", label: "Software developer" },
  { key: "designer", label: "Designer / Graphic artist" },
  { key: "marketer", label: "Marketer" },
  { key: "other", label: "Other" },
]

export default function OnboardingRolePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const { state, update } = useOnboardingState(email)
  const [otherText, setOtherText] = React.useState("")
  const otherInputRef = React.useRef<HTMLInputElement>(null)

  const otherSelected = state.workRole === "other"
  const canContinue = state.workRole.length > 0 && (state.workRole !== "other" || otherText.trim().length > 0)

  function handleSelect(key: string) {
    update({ workRole: key })
    if (key === "other") {
      setTimeout(() => otherInputRef.current?.focus(), 0)
    }
  }

  return (
    <OnboardingShell
      current="role"
      onBack={() => router.push("/onboarding/setup")}
      onContinue={() => router.push("/onboarding/organization")}
      canContinue={canContinue}
    >
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-snug tracking-[-0.018em] text-zinc-900">
          What kind of work do you do?
        </h1>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {options.map((option) => {
            const selected = state.workRole === option.key
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => handleSelect(option.key)}
                className={cn(
                  "rounded-2xl border px-5 py-3 text-[13px] font-medium transition-all duration-150 select-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                  selected
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:-translate-y-px hover:text-zinc-900"
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        {otherSelected && (
          <div className="mt-6 max-w-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <Input
              ref={otherInputRef}
              placeholder="Please specify"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              className="h-12 rounded-xl border-zinc-200 bg-white text-[13px] placeholder:text-zinc-400 focus-visible:border-primary/50 focus-visible:ring-primary/20"
            />
          </div>
        )}
      </div>
    </OnboardingShell>
  )
}
