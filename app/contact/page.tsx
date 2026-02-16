"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BrandLogo from "@/components/brand-logo"
import { EnvelopeSimpleIcon, MapPinIcon, ChatCircleDotsIcon } from "@phosphor-icons/react"
import AuthFooter from "@/components/auth-footer"

export default function ContactPage() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0f0e1a]">
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
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-6">
          <BrandLogo href="/create-account" />
          <nav className="ml-8 hidden items-center gap-7 md:flex">
            <Link href="#" className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-foreground">Product</Link>
            <Link href="/pricing" className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#" className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-foreground">Resources</Link>
          </nav>
          <Button asChild className="ml-auto h-9 rounded-none px-5 text-[13px] font-semibold">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 px-6 pt-[calc(4rem+3rem)] pb-10 lg:pt-[calc(4rem+4rem)] lg:pb-16">
        <div className="mx-auto w-full max-w-5xl">
          {/* Page header */}
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
            <h1 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-white sm:text-[38px]">
              Get in touch
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/50 max-w-lg mx-auto">
              Have a question or need help? We&apos;d love to hear from you. Fill out the form and our team will get back to you within 24 hours.
            </p>
          </div>

          {/* Contact form */}
          <Card className="mx-auto max-w-xl rounded-none border-0 border-t-2 border-t-primary/25 py-0 gap-0 shadow-[0_4px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.04)]">
            <CardContent className="p-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[13px] font-medium">Name</Label>
                  <Input
                    id="name"
                    className="h-11 rounded-none text-[13px]"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[13px] font-medium">Email address</Label>
                  <Input
                    id="email"
                    className="h-11 rounded-none text-[13px]"
                    placeholder="you@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[13px] font-medium">Message</Label>
                  <textarea
                    id="message"
                    className="flex min-h-[140px] w-full border border-input bg-background px-3 py-2.5 text-[13px] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us how we can help..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button className="h-11 w-full rounded-none text-[13px] font-semibold tracking-wide">
                  Send message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company info */}
          <div className="mx-auto mt-10 flex max-w-xl flex-col gap-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <EnvelopeSimpleIcon size={18} weight="fill" className="shrink-0 text-primary" />
              <span className="text-[13px] text-white/50">support@asesley.com</span>
            </div>
            <div className="flex items-center gap-3">
              <ChatCircleDotsIcon size={18} weight="fill" className="shrink-0 text-primary" />
              <span className="text-[13px] text-white/50">Mon-Fri, 9am-5pm EST</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon size={18} weight="fill" className="shrink-0 text-primary" />
              <span className="text-[13px] text-white/50">Toronto, ON, Canada</span>
            </div>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  )
}
