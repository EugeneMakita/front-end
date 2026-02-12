"use client"

import Link from "next/link"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  AppleLogoIcon,
  CaretDownIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  FacebookLogoIcon,
  GoogleLogoIcon,
  MicrosoftOutlookLogoIcon,
  XIcon,
} from "@phosphor-icons/react"

const menuGroups = [
  {
    label: "Pricing",
    items: ["For Students", "For Parents", "For Teachers", "For Universities"],
  },
  {
    label: "Product",
    items: ["Question Banks", "Course Builder", "Assessments"],
  },
  {
    label: "Resources",
    items: ["Docs", "Templates", "Community"],
  },
  {
    label: "Use Cases",
    items: ["Universities", "Training Teams", "Certification Prep"],
  },
]

const socialOptions = [
  {
    label: "Google",
    icon: GoogleLogoIcon,
    className:
      "border-rose-700 bg-rose-700 text-white hover:bg-rose-800 hover:border-rose-800 hover:text-white focus-visible:ring-0 focus-visible:border-rose-800",
    iconClassName: "text-white",
  },
  {
    label: "Facebook",
    icon: FacebookLogoIcon,
    className:
      "border-blue-700 bg-blue-700 text-white hover:bg-blue-800 hover:border-blue-800 hover:text-white focus-visible:ring-0 focus-visible:border-blue-800",
    iconClassName: "text-white",
  },
  {
    label: "Apple",
    icon: AppleLogoIcon,
    className:
      "border-zinc-800 bg-zinc-800 text-white hover:bg-zinc-900 hover:border-zinc-900 hover:text-white focus-visible:ring-0 focus-visible:border-zinc-900",
    iconClassName: "text-white",
  },
  {
    label: "Microsoft 365",
    icon: MicrosoftOutlookLogoIcon,
    className:
      "border-slate-400 bg-slate-200 text-slate-900 hover:bg-slate-300 hover:border-slate-500 hover:text-slate-900 focus-visible:ring-0 focus-visible:border-slate-500",
    iconClassName: "text-slate-900",
  },
]

export default function CreateAccountPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [emailTouched, setEmailTouched] = React.useState(false)
  const [passwordTouched, setPasswordTouched] = React.useState(false)
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
  const showEmailState = emailTouched || email.length > 0
  const emailInvalid = showEmailState && !emailIsValid
  const emailValid = showEmailState && emailIsValid
  const showPasswordRules = passwordTouched || password.length > 0
  const passwordInvalid = showPasswordRules && failedPasswordRules.length > 0
  const passwordValid = password.length > 0 && failedPasswordRules.length === 0

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-6">
          <div className="w-28" />
          <div className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {menuGroups.map((group) => (
              <DropdownMenu key={group.label}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 gap-1 rounded-none">
                    {group.label}
                    <CaretDownIcon size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {group.items.map((item) => (
                    <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
          <div className="flex w-28 justify-end">
            <Button asChild className="h-9 rounded-none px-4 text-sm font-semibold">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_10%_20%,#112b56_0%,#1f1b3f_45%,#26113a_100%)] px-6 py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="border border-white/20 bg-black/15 p-8 text-white backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-white/70">Welcome back</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight">
              Build better courses, quizzes, and learning workflows.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85">
              Create one account and sign in your way. Connect with social login,
              work identity, or standard email and password. Teams can onboard in minutes.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="border border-white/25 bg-white/10 p-3">
                <p className="text-xs text-white/70">Trusted by</p>
                <p className="mt-1 text-sm font-medium">Universities and enterprise teams</p>
              </div>
              <div className="border border-white/25 bg-white/10 p-3">
                <p className="text-xs text-white/70">Identity options</p>
                <p className="mt-1 text-sm font-medium">Email, Google, Facebook, Apple, Microsoft 365</p>
              </div>
            </div>
          </section>

          <Card className="border-border/70 rounded-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Start your account</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose one sign-in method, then complete your workspace setup.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-2">
                {socialOptions.map((option) => {
                  const Icon = option.icon
                  return (
                  <Button
                    key={option.label}
                    variant="outline"
                    className={cn("h-10 rounded-none gap-2", option.className)}
                  >
                    <Icon size={16} weight="fill" className={option.iconClassName} />
                    {option.label}
                  </Button>
                  )
                })}
              </div>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  or continue with email
                </span>
              </div>

              <div className="space-y-1.5">
                <Label>I am signing up as</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={accountType === "educator" ? "default" : "outline"}
                    className="h-10 rounded-none"
                    onClick={() => setAccountType("educator")}
                  >
                    Educator
                  </Button>
                  <Button
                    type="button"
                    variant={accountType === "student" ? "default" : "outline"}
                    className="h-10 rounded-none"
                    onClick={() => setAccountType("student")}
                  >
                    Student
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className={cn(
                    "rounded-none transition",
                    emailInvalid &&
                      "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.2)] focus-visible:ring-red-500/30 focus-visible:border-red-500",
                    emailValid &&
                      "border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)] focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                  )}
                  placeholder="you@company.com"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={emailInvalid}
                />
                {showEmailState && emailInvalid && (
                  <p className="text-xs text-red-600">Enter a valid email address.</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    className={cn(
                      "rounded-none pr-10 transition",
                      passwordInvalid &&
                        "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.2)] focus-visible:ring-red-500/30 focus-visible:border-red-500",
                      passwordValid &&
                        "border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)] focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                    )}
                    placeholder="At least 8 characters"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    aria-invalid={passwordInvalid}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 h-full w-10 rounded-none text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                  </Button>
                </div>
                {showPasswordRules && (
                  <ul className="space-y-1 text-xs">
                    {passwordRules.map((rule) => {
                      const passed = rule.test(password)
                      return (
                        <li
                          key={rule.label}
                          className={cn(
                            "flex items-center gap-1.5",
                            passed ? "text-emerald-600" : "text-red-600"
                          )}
                        >
                          {passed ? <CheckIcon size={12} weight="bold" /> : <XIcon size={12} weight="bold" />}
                          <span>{rule.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    className="mt-0.5 rounded-none"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm font-normal leading-5 text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="underline underline-offset-4 text-foreground">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="underline underline-offset-4 text-foreground">
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                </div>
              </div>

              <Button
                className="h-10 w-full rounded-none"
                onClick={() => router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`)}
                disabled={!termsAccepted || failedPasswordRules.length > 0 || !emailIsValid || !accountType}
              >
                Create account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
