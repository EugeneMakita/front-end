"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import BrandLogo from "@/components/brand-logo"
import {
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  XIcon,
  ShieldCheckIcon,
  UsersIcon,
  LightningIcon,
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

const highlights = [
  {
    icon: LightningIcon,
    title: "Quick setup",
    description: "Create courses, quizzes, and assignments in minutes.",
  },
  {
    icon: UsersIcon,
    title: "Built for teams",
    description: "Onboard your entire organization with one invite link.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trusted & secure",
    description: "Enterprise-grade security with SSO and role-based access.",
  },
]

export default function CreateAccountPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [termsAccepted, setTermsAccepted] = React.useState(false)
  const [accountType, setAccountType] = React.useState<"educator" | "student" | null>(null)

  const passwordRules = [
    { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
    { label: "At least 1 uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
    { label: "At least 1 lowercase letter", test: (value: string) => /[a-z]/.test(value) },
    { label: "At least 1 number", test: (value: string) => /[0-9]/.test(value) },
  ]

  const failedPasswordRules = passwordRules.filter((rule) => !rule.test(password))
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const emailInvalid = submitted && !emailIsValid
  const emailValid = submitted && emailIsValid
  const showPasswordRules = submitted && password.length > 0
  const passwordInvalid = submitted && failedPasswordRules.length > 0
  const passwordValid = submitted && password.length > 0 && failedPasswordRules.length === 0

  function handleSubmit() {
    setSubmitted(true)
    if (!emailIsValid || failedPasswordRules.length > 0) return
    router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`)
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
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          <BrandLogo />
          <Button asChild className="h-9 rounded-none px-5 text-[13px] font-semibold">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 px-6 pt-[calc(4rem+2.5rem)] pb-10 lg:pt-[calc(4rem+4rem)] lg:pb-16">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_440px] lg:items-start">

          {/* Left — Marketing panel */}
          <section className="hidden lg:block pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Get started free</p>
            <h1 className="mt-4 text-[38px] font-semibold leading-[1.15] tracking-tight text-white">
              Build better courses,<br />quizzes, and learning<br />workflows.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
              Create one account and sign in your way. Teams can onboard in minutes with social login or email.
            </p>

            <div className="mt-10 space-y-5">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 bg-white/5">
                      <Icon size={20} weight="fill" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-white/50">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-12 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((letter) => (
                  <div
                    key={letter}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0f0e1a] bg-white/15 text-[10px] font-semibold text-white/70"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-white/40">
                Trusted by <span className="font-medium text-white/60">2,400+</span> educators worldwide
              </p>
            </div>
          </section>

          {/* Right — Form card */}
          <Card className="border-border/70 rounded-none shadow-2xl shadow-black/40 py-0 gap-0">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-[22px] font-semibold tracking-tight">Create your account</CardTitle>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                Get started with social login or email and password.
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
                      className={cn("h-11 rounded-none gap-2.5 text-[13px] font-medium", option.className)}
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

              {/* Account type */}
              <div className="space-y-2.5">
                <Label className="text-[13px] font-medium">I am signing up as</Label>
                <div className="flex items-center gap-5">
                  <label
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => setAccountType("educator")}
                  >
                    <span className={cn(
                      "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      accountType === "educator" ? "border-primary" : "border-muted-foreground/30"
                    )}>
                      {accountType === "educator" && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </span>
                    <span className="text-[13px]">Educator</span>
                  </label>
                  <label
                    className="flex cursor-pointer items-center gap-2"
                    onClick={() => setAccountType("student")}
                  >
                    <span className={cn(
                      "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      accountType === "student" ? "border-primary" : "border-muted-foreground/30"
                    )}>
                      {accountType === "student" && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </span>
                    <span className="text-[13px]">Student</span>
                  </label>
                </div>
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
                  placeholder="you@company.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={emailInvalid}
                />
                {emailInvalid && (
                  <p className="text-[12px] text-red-600 mt-1">Please enter a valid email address.</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[13px] font-medium">Password</Label>
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
                    placeholder="Min. 8 characters"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    aria-invalid={passwordInvalid}
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
                {showPasswordRules && (
                  <ul className="mt-2 space-y-1">
                    {passwordRules.map((rule) => {
                      const passed = rule.test(password)
                      return (
                        <li
                          key={rule.label}
                          className={cn(
                            "flex items-center gap-1.5 text-[11px]",
                            passed ? "text-emerald-600" : "text-muted-foreground/60"
                          )}
                        >
                          {passed ? <CheckIcon size={11} weight="bold" /> : <XIcon size={11} weight="bold" />}
                          <span>{rule.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="terms"
                  className="mt-0.5 rounded-none"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <Label htmlFor="terms" className="text-[12px] font-normal leading-relaxed text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="underline underline-offset-4 text-foreground hover:text-primary transition-colors">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="underline underline-offset-4 text-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit */}
              <Button
                className="h-11 w-full rounded-none text-[13px] font-semibold tracking-wide"
                onClick={handleSubmit}
              >
                Create account
              </Button>

              {/* Sign in link */}
              <p className="text-center text-[12px] text-muted-foreground pt-1">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Sign in
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
