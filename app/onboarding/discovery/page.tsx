"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { OnboardingShell } from "@/app/onboarding/_components/onboarding-shell"
import { useOnboardingState } from "@/app/onboarding/_components/onboarding-state"

const options = [
  { key: "facebook", label: "Facebook / Instagram" },
  { key: "search", label: "Web search" },
  { key: "newsletters", label: "Newsletters" },
  { key: "friends", label: "Friends & family" },
  { key: "pinterest", label: "Pinterest" },
  { key: "reddit", label: "Reddit" },
  { key: "twitter", label: "X (Twitter)" },
  { key: "youtube", label: "YouTube" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "ai", label: "AI chatbots (e.g., ChatGPT or Gemini)" },
  { key: "tiktok", label: "TikTok" },
  { key: "other", label: "Other" },
]

export default function OnboardingDiscoveryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const { state, update, reset } = useOnboardingState(email)
  const [otherText, setOtherText] = React.useState("")
  const otherInputRef = React.useRef<HTMLInputElement>(null)

  const otherSelected = state.heardFrom === "other"
  const canFinish = state.heardFrom.length > 0 && (state.heardFrom !== "other" || otherText.trim().length > 0)

  function handleSelect(key: string) {
    update({ heardFrom: key })
    if (key === "other") {
      setTimeout(() => otherInputRef.current?.focus(), 0)
    }
  }

  function handleFinish() {
    reset()
    router.push("/")
  }

  return (
    <OnboardingShell
      current="discovery"
      onBack={() => router.push("/onboarding/invite")}
      onContinue={handleFinish}
      continueLabel="Finish"
      canContinue={canFinish}
    >
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-snug tracking-[-0.018em] text-zinc-900">
          How did you hear about us?
        </h1>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {options.map((option) => {
            const selected = state.heardFrom === option.key
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
              placeholder="Tell us more…"
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
