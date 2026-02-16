"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  MicrosoftOutlookLogoIcon,
  ClockIcon,
} from "@phosphor-icons/react"
import BrandLogo from "@/components/brand-logo"
import { GoogleLogo } from "@/components/social-icons"

const CODE_LENGTH = 6

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "you@company.com"
  const [code, setCode] = React.useState<string[]>(
    Array(CODE_LENGTH).fill("")
  )
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])

  const mergedCode = code.join("")
  const isComplete = mergedCode.length === CODE_LENGTH

  function updateDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1)
    setCode((previous) => {
      const next = [...previous]
      next[index] = digit
      return next
    })
    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH)
    if (!pastedDigits) return
    const next = Array(CODE_LENGTH)
      .fill("")
      .map((_, index) => pastedDigits[index] || "")
    setCode(next)
    const nextFocusIndex = Math.min(pastedDigits.length, CODE_LENGTH - 1)
    inputRefs.current[nextFocusIndex]?.focus()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f0e1a]">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[20%] -top-[10%] h-[70vh] w-[70vh] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[5%] h-[50vh] w-[50vh] rounded-full bg-indigo-500/6 blur-[100px]" />
      </div>

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex justify-center px-6 pt-10 pb-6">
        <BrandLogo className="text-white" />
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-7rem)] items-start justify-center px-6 pt-4 pb-10 sm:items-center sm:pt-0">
        <div className="w-full max-w-[460px]">
          <Card className="rounded-none border-border/70 py-0 gap-0 shadow-2xl shadow-black/40">
            {/* Card header */}
            <div className="p-8 pb-0">
              <h1 className="text-[22px] font-semibold tracking-tight">
                Verify your email
              </h1>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>

            <CardContent className="space-y-5 p-8 pt-6">
              {/* Code inputs */}
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(event) => updateDigit(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    className={cn(
                      "h-14 w-12 border bg-background text-center text-[20px] font-semibold tabular-nums outline-none transition-all sm:h-[60px] sm:w-[54px] sm:text-[22px]",
                      digit
                        ? "border-primary bg-primary/[0.03] shadow-[0_0_0_3px_rgba(var(--primary),0.08)]"
                        : "border-input",
                      "focus:border-primary focus:shadow-[0_0_0_3px_rgba(var(--primary),0.12)]"
                    )}
                    aria-label={`Verification code digit ${index + 1}`}
                  />
                ))}
              </div>

              {/* Expiry notice */}
              <div className="flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground">
                <ClockIcon size={13} weight="fill" />
                <span>Code expires in 10 minutes</span>
              </div>

              {/* Submit */}
              <Button
                className="h-11 w-full rounded-none text-[13px] font-semibold tracking-wide"
                disabled={!isComplete}
                onClick={() =>
                  router.push(
                    `/onboarding/setup?email=${encodeURIComponent(email)}`
                  )
                }
              >
                Verify and continue
              </Button>

              <Separator />

              {/* Quick mail access */}
              <div className="space-y-3">
                <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
                  Open your inbox
                </p>
                <div className="flex justify-center gap-2.5">
                  <Button
                    asChild
                    variant="outline"
                    className="h-9 gap-2 rounded-none border-border bg-white text-[12px] font-medium text-foreground hover:border-gray-300 hover:bg-gray-50"
                  >
                    <a
                      href="https://mail.google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GoogleLogo size={14} />
                      Gmail
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-9 gap-2 rounded-none border-[#0078D4] bg-[#0078D4] text-[12px] font-medium text-white hover:border-[#106EBE] hover:bg-[#106EBE] hover:text-white"
                  >
                    <a
                      href="https://outlook.live.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MicrosoftOutlookLogoIcon size={14} weight="fill" />
                      Outlook
                    </a>
                  </Button>
                </div>
              </div>

              {/* Help text */}
              <p className="text-center text-[12px] leading-relaxed text-muted-foreground">
                Didn&apos;t receive the email?{" "}
                <button
                  type="button"
                  className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Resend code
                </button>{" "}
                or{" "}
                <Link
                  href="/create-account"
                  className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                >
                  change email
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Footer links */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/terms"
              className="text-[11px] text-white/40 transition-colors hover:text-white/60"
            >
              Terms
            </Link>
            <span className="text-white/20">&middot;</span>
            <Link
              href="/privacy-policy"
              className="text-[11px] text-white/40 transition-colors hover:text-white/60"
            >
              Privacy
            </Link>
            <span className="text-white/20">&middot;</span>
            <span className="text-[11px] text-white/30">
              &copy; {new Date().getFullYear()} asesley
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
