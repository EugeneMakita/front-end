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
import {
  AppleLogoIcon,
  EyeIcon,
  EyeSlashIcon,
  FacebookLogoIcon,
  GoogleLogoIcon,
  MicrosoftOutlookLogoIcon,
} from "@phosphor-icons/react"

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

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [emailTouched, setEmailTouched] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [passwordTouched, setPasswordTouched] = React.useState(false)

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const emailInvalid = (emailTouched || email.length > 0) && !emailIsValid
  const emailValid = (emailTouched || email.length > 0) && emailIsValid
  const passwordInvalid = passwordTouched && password.length === 0
  const passwordValid = password.length > 0

  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#112b56_0%,#1f1b3f_45%,#26113a_100%)] px-6 py-10">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center justify-center">
          <Card className="w-full max-w-lg rounded-none border-border/70">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <p className="text-sm text-muted-foreground">
                Continue with social login or use your email and password.
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
                      className={cn("h-10 gap-2 rounded-none", option.className)}
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
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setEmailTouched(true)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onBlur={() => setPasswordTouched(true)}
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
              </div>

              <Button className="h-10 w-full rounded-none" onClick={() => router.push("/")}>
                Sign in
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/create-account" className="font-medium text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
