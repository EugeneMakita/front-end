"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import BrandLogo from "@/components/brand-logo"
import { ArrowLeftIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react"
import AuthFooter from "@/components/auth-footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const emailInvalid = submitted && !emailIsValid

  function handleSubmit() {
    setSubmitted(true)
    if (!emailIsValid) return
    setSent(true)
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
        <BrandLogo variant="full" className="text-white" href="/create-account" />
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-7rem)] items-start justify-center px-6 pt-4 pb-10 sm:items-center sm:pt-0">
        <div className="w-full max-w-[440px]">
          <Card className="border-border/70 rounded-none shadow-2xl shadow-black/40 py-0 gap-0">
            {sent ? (
              <>
                <CardHeader className="p-8 pb-0">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center bg-primary/10">
                    <EnvelopeSimpleIcon size={24} weight="fill" className="text-primary" />
                  </div>
                  <CardTitle className="text-[22px] font-semibold tracking-tight">Check your inbox</CardTitle>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    We sent a password reset link to{" "}
                    <span className="font-medium text-foreground">{email}</span>.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-5 space-y-5">
                  <p className="text-[12px] leading-relaxed text-muted-foreground">
                    Click the link in the email to reset your password. If you don&apos;t see it, check your spam folder.
                  </p>

                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-none text-[13px] font-medium"
                    onClick={() => {
                      setSent(false)
                      setSubmitted(false)
                    }}
                  >
                    Try a different email
                  </Button>

                  <p className="text-center text-[12px] text-muted-foreground pt-1">
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                      Back to sign in
                    </Link>
                  </p>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="p-8 pb-0">
                  <CardTitle className="text-[22px] font-semibold tracking-tight">Reset your password</CardTitle>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    Enter the email linked to your account and we&apos;ll send a reset link.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-5 space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[13px] font-medium">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className={cn(
                        "h-11 rounded-none text-[13px] transition",
                        emailInvalid &&
                          "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.15)] focus-visible:ring-red-500/30 focus-visible:border-red-500"
                      )}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {emailInvalid && (
                      <p className="text-[12px] text-red-600 mt-1">Please enter a valid email address.</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    className="h-11 w-full rounded-none text-[13px] font-semibold tracking-wide"
                    onClick={handleSubmit}
                  >
                    Send reset link
                  </Button>

                  {/* Back to login */}
                  <p className="text-center text-[12px] text-muted-foreground pt-1">
                    <Link href="/login" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                      <ArrowLeftIcon size={12} weight="bold" />
                      Back to sign in
                    </Link>
                  </p>
                </CardContent>
              </>
            )}
          </Card>

        </div>
      </main>

      <AuthFooter />
    </div>
  )
}
