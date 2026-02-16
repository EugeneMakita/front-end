"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import BrandLogo from "@/components/brand-logo"
import {
  EyeIcon,
  EyeSlashIcon,
} from "@phosphor-icons/react"
import { GoogleLogo, FacebookLogo } from "@/components/social-icons"
import AuthFooter from "@/components/auth-footer"

const socialOptions = [
  {
    label: "Google",
    icon: GoogleLogo,
    className:
      "border-border bg-white text-foreground hover:bg-gray-50 hover:border-gray-300 focus-visible:ring-0",
  },
  {
    label: "Facebook",
    icon: FacebookLogo,
    className:
      "border-[#1877F2] bg-[#1877F2] text-white hover:bg-[#166FE5] hover:border-[#166FE5] hover:text-white focus-visible:ring-0",
    iconClassName: "text-white",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const emailInvalid = submitted && !emailIsValid
  const emailValid = submitted && emailIsValid
  const passwordInvalid = submitted && password.length === 0
  const passwordValid = submitted && password.length > 0

  function handleSubmit() {
    setSubmitted(true)
    if (!emailIsValid || password.length === 0) return
    router.push("/")
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
        <BrandLogo className="text-white" href="/create-account" />
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-7rem)] items-start justify-center px-6 pt-4 pb-10 sm:items-center sm:pt-0">
        <div className="w-full max-w-[440px]">
          <Card className="border-border/70 rounded-none shadow-2xl shadow-black/40 py-0 gap-0">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-[22px] font-semibold tracking-tight">Welcome back</CardTitle>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                Sign in to continue to your workspace.
              </p>
            </CardHeader>

            <CardContent className="p-8 pt-5 space-y-5">
              {/* Social login */}
              <div className="grid grid-cols-2 gap-3">
                {socialOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <Button
                      key={option.label}
                      variant="outline"
                      className={cn("h-11 gap-2.5 rounded-none text-[13px] font-medium", option.className)}
                    >
                      <Icon size={18} />
                      {option.label}
                    </Button>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="relative py-1">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground/70">
                  or
                </span>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-medium">Email address</Label>
                <Input
                  id="email"
                  className={cn(
                    "h-11 rounded-none text-[13px] transition",
                    emailInvalid &&
                      "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.15)] focus-visible:ring-red-500/30 focus-visible:border-red-500",
                    emailValid &&
                      "border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)] focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                  )}
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {emailInvalid && (
                  <p className="text-[12px] text-red-600 mt-1">Please enter a valid email address.</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[13px] font-medium">Password</Label>
                  <Link href="/forgot-password" className="text-[12px] font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    className={cn(
                      "h-11 rounded-none pr-11 text-[13px] transition",
                      passwordInvalid &&
                        "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.15)] focus-visible:ring-red-500/30 focus-visible:border-red-500",
                      passwordValid &&
                        "border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)] focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                    )}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 h-full w-11 rounded-none text-muted-foreground/60 hover:text-foreground"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeSlashIcon size={18} weight="fill" /> : <EyeIcon size={18} weight="fill" />}
                  </Button>
                </div>
                {passwordInvalid && (
                  <p className="text-[12px] text-red-600 mt-1">Please enter your password.</p>
                )}
              </div>

              {/* Submit */}
              <Button
                className="h-11 w-full rounded-none text-[13px] font-semibold tracking-wide"
                onClick={handleSubmit}
              >
                Sign in
              </Button>

              {/* Create account link */}
              <p className="text-center text-[12px] text-muted-foreground pt-1">
                Don&apos;t have an account?{" "}
                <Link href="/create-account" className="font-semibold text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>

        </div>
      </main>

      <AuthFooter />
    </div>
  )
}
