"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("")
  const [touched, setTouched] = React.useState(false)
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const emailInvalid = (touched || email.length > 0) && !emailIsValid
  const emailValid = (touched || email.length > 0) && emailIsValid

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,#112b56_0%,#1f1b3f_45%,#26113a_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center justify-center">
        <Card className="w-full max-w-md rounded-none border-border/70">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset password</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your email and we&apos;ll send a password reset link.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className={cn(
                  "rounded-none transition",
                  emailInvalid &&
                    "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.2)] focus-visible:ring-red-500/30 focus-visible:border-red-500",
                  emailValid &&
                    "border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.2)] focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                )}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => setTouched(true)}
              />
            </div>

            <Button className="h-10 w-full rounded-none" disabled={!emailIsValid}>
              Send reset link
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Remembered your password?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Back to sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
