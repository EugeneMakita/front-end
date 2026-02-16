"use client"

import Link from "next/link"
import BrandLogo from "@/components/brand-logo"

type StepKey = "setup" | "organization" | "invite" | "discovery"

const steps: Array<{ key: StepKey; label: string; href: string }> = [
  { key: "setup", label: "Setup", href: "/onboarding/setup" },
  { key: "organization", label: "Organization", href: "/onboarding/organization" },
  { key: "invite", label: "Invite", href: "/onboarding/invite" },
  { key: "discovery", label: "Discovery", href: "/onboarding/discovery" },
]

export function OnboardingShell({
  current,
  email,
  children,
}: {
  current: StepKey
  email?: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrandLogo />
            <span className="text-xl font-semibold text-foreground">Onboarding</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{email || "you@company.com"}</span>
          </p>
        </div>

        <nav className="mb-6 border-b border-slate-300 pb-2">
          <ol className="flex w-full flex-wrap items-center justify-center gap-2 text-sm">
            {steps.map((step, index) => {
              const isCurrent = current === step.key
              return (
                <li key={step.key} className="inline-flex items-center gap-2">
                  {isCurrent ? (
                    <span className="font-semibold text-foreground">{step.label}</span>
                  ) : (
                    <Link href={step.href} className="text-muted-foreground hover:text-foreground">
                      {step.label}
                    </Link>
                  )}
                  {index < steps.length - 1 && <span className="text-slate-400">/</span>}
                </li>
              )
            })}
          </ol>
        </nav>

        {children}
      </div>
    </main>
  )
}
