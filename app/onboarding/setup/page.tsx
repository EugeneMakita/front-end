"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BuildingsIcon, ChalkboardTeacherIcon, GraduationCapIcon, HouseLineIcon } from "@phosphor-icons/react"
import { OnboardingShell } from "@/app/onboarding/_components/onboarding-shell"
import { type SetupType, useOnboardingState } from "@/app/onboarding/_components/onboarding-state"

const setupCards: Array<{
  key: SetupType
  title: string
  description: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
}> = [
  {
    key: "classes",
    title: "Classes",
    description: "For teachers managing one or more classes",
    Icon: ChalkboardTeacherIcon,
  },
  {
    key: "school",
    title: "School",
    description: "For school administrators managing teachers and classes",
    Icon: BuildingsIcon,
  },
  {
    key: "district",
    title: "District",
    description: "For district administrators managing schools and staff",
    Icon: GraduationCapIcon,
  },
  {
    key: "home-school",
    title: "Home School",
    description: "For parents or guardians teaching outside traditional schools",
    Icon: HouseLineIcon,
  },
]

export default function OnboardingSetupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "you@company.com"
  const { state, update, canContinueSetup } = useOnboardingState(email)
  const actionButtonClass = "h-8 rounded-none px-6"

  return (
    <OnboardingShell current="setup" email={state.email || email}>
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">Set up your workspace</h1>
          <p className="text-base text-slate-600">I&apos;m setting this up for my:</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {setupCards.map((option) => {
            const selected = state.setupType === option.key
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => update({ setupType: option.key })}
                className={cn(
                  "cursor-pointer rounded-none border bg-white p-5 text-left transition",
                  selected
                    ? "border-primary shadow-[0_0_0_3px_rgba(37,99,235,0.15)]"
                    : "border-slate-300 hover:border-slate-400"
                )}
              >
                <option.Icon
                  size={28}
                  className={cn("mb-5", selected ? "text-primary" : "text-slate-500")}
                />
                <h3 className="text-xl font-semibold text-slate-800">{option.title}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">{option.description}</p>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Not an educator?{" "}
            <Link href="/create-account" className="text-primary underline underline-offset-4">
              Student signup
            </Link>
          </p>
          <Button
            className={actionButtonClass}
            disabled={!canContinueSetup}
            onClick={() => router.push("/onboarding/organization")}
          >
            Continue
          </Button>
        </div>
      </div>
    </OnboardingShell>
  )
}
