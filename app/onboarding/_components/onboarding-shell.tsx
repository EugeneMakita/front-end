"use client"

import * as React from "react"
import BrandLogo from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type StepKey = "setup" | "role" | "organization" | "invite" | "discovery"
const stepKeys: StepKey[] = ["setup", "role", "organization", "invite", "discovery"]

export function OnboardingShell({
  current,
  children,
  onContinue,
  canContinue = false,
  continueLabel = "Continue",
  onBack,
}: {
  current: StepKey
  children: React.ReactNode
  onContinue?: () => void
  canContinue?: boolean
  continueLabel?: string
  onBack?: () => void
}) {
  const currentIndex = stepKeys.indexOf(current)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Left content panel ── */}
      <div className="flex w-full flex-col bg-white lg:w-[62%]">
        {/* Inner padding wrapper */}
        <div className="flex flex-1 flex-col px-12 py-8 xl:px-16">
          {/* Logo */}
          <div className="shrink-0">
            <BrandLogo variant="full" href="/create-account" />
          </div>

          {/* Page content */}
          <div className="flex-1 pt-8">
            {children}
          </div>

          {/* Footer: step dots (left) + navigation buttons (right) */}
          <div className="flex items-center justify-between pt-8 pb-4">
            {/* Step indicator dots — current step is a wider pill */}
            <div className="flex items-center gap-2">
              {stepKeys.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "block h-[7px] rounded-full transition-all duration-300",
                    i === currentIndex
                      ? "w-7 bg-foreground"
                      : i < currentIndex
                      ? "w-[7px] bg-foreground/30"
                      : "w-[7px] bg-zinc-200"
                  )}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-2.5">
              {onBack && (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-zinc-200 px-8 text-[13px] font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  onClick={onBack}
                >
                  Back
                </Button>
              )}
              {onContinue && (
                <Button
                  size="lg"
                  className={cn(
                    "h-12 rounded-xl px-8 text-[13px] font-semibold transition-all duration-150",
                    canContinue
                      ? "shadow-sm hover:shadow-md hover:-translate-y-px"
                      : "opacity-40 cursor-not-allowed"
                  )}
                  disabled={!canContinue}
                  onClick={onContinue}
                >
                  {continueLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right decorative panel ── */}
      <div
        className="hidden lg:block lg:w-[38%] relative overflow-hidden"
        style={{ backgroundColor: "#0d0d10" }}
      >
        {/* Mesh glow — top */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 60% -10%, rgba(99,102,241,0.18) 0%, transparent 65%), radial-gradient(ellipse 70% 60% at 90% 110%, rgba(14,165,233,0.10) 0%, transparent 65%)",
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Large outer ring */}
        <div className="absolute -top-[120px] -right-[120px] h-[560px] w-[560px] rounded-full border border-white/[0.055]" />
        {/* Mid ring */}
        <div className="absolute -top-[40px] -right-[40px] h-[380px] w-[380px] rounded-full border border-white/[0.07]" />
        {/* Small inner circle */}
        <div className="absolute top-[18%] right-[18%] h-[120px] w-[120px] rounded-full border border-white/[0.10]" />
        {/* Bottom-left corner bracket */}
        <div className="absolute bottom-14 left-14 h-[52px] w-[52px] border-l border-b border-white/20 rounded-bl-sm" />
        {/* Top-right corner bracket */}
        <div className="absolute top-14 right-14 h-[36px] w-[36px] border-r border-t border-white/15 rounded-tr-sm" />
        {/* Centre cross hair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center justify-center">
            <div className="h-px w-8 bg-white/15" />
            <div className="absolute h-8 w-px bg-white/15" />
            <div className="absolute h-1.5 w-1.5 rounded-full bg-white/30" />
          </div>
        </div>
        {/* Horizontal divider */}
        <div
          className="absolute top-1/2 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
        {/* Floating accent pill — bottom */}
        <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-400/70" />
          <span className="text-[11px] font-medium tracking-wide text-white/30">
            noocra
          </span>
        </div>
      </div>
    </div>
  )
}
