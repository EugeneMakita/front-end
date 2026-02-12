"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnvelopeSimpleIcon, GoogleLogoIcon, MicrosoftOutlookLogoIcon } from "@phosphor-icons/react"

const CODE_LENGTH = 6

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "you@company.com"
  const [code, setCode] = React.useState<string[]>(Array(CODE_LENGTH).fill(""))
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

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
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
    const pastedDigits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH)
    if (!pastedDigits) return
    const next = Array(CODE_LENGTH)
      .fill("")
      .map((_, index) => pastedDigits[index] || "")
    setCode(next)
    const nextFocusIndex = Math.min(pastedDigits.length, CODE_LENGTH - 1)
    inputRefs.current[nextFocusIndex]?.focus()
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#112b56_0%,#1f1b3f_45%,#26113a_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-start justify-center pt-4 sm:pt-6 lg:pt-10">
        <Card className="w-full max-w-xl rounded-none border-border/70">
          <CardHeader className="space-y-3 px-8 pt-8 pb-2">
            <CardTitle className="text-2xl">Verify your email address</CardTitle>
            <CardDescription className="text-base">
              We sent a 6-digit verification code to <span className="font-medium text-foreground">{email}</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8 pt-4">
            <div className="flex flex-wrap gap-3">
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
                  className="h-14 w-12 rounded-none border border-input bg-background text-center text-xl outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-16 sm:w-14 sm:text-2xl"
                  aria-label={`Verification code digit ${index + 1}`}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
              <Button
                asChild
                variant="outline"
                className="rounded-none border-rose-700 bg-rose-700 text-white hover:bg-rose-800 hover:border-rose-800 hover:text-white focus-visible:ring-0 focus-visible:border-rose-800"
              >
                <a href="https://mail.google.com" target="_blank" rel="noreferrer">
                  <GoogleLogoIcon size={16} weight="fill" />
                  Open Gmail
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-[#0078D4] bg-[#0078D4] text-white hover:bg-[#106EBE] hover:border-[#106EBE] hover:text-white focus-visible:ring-0 focus-visible:border-[#106EBE]"
              >
                <a href="https://outlook.live.com" target="_blank" rel="noreferrer">
                  <MicrosoftOutlookLogoIcon size={16} weight="fill" />
                  Open Outlook
                </a>
              </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Haven&apos;t seen the email? Check spam,{" "}
                <button type="button" className="underline underline-offset-4 text-foreground">
                  resend code
                </button>{" "}
                or{" "}
                <Link href="/create-account" className="underline underline-offset-4 text-foreground">
                  change email
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 border-t pt-6">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <EnvelopeSimpleIcon size={16} />
                <span>Verification code expires in 10 minutes.</span>
              </div>
              <Button
                className="w-56 rounded-none px-4 py-2"
                disabled={!isComplete}
                onClick={() => router.push(`/onboarding/setup?email=${encodeURIComponent(email)}`)}
              >
                Verify and continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
