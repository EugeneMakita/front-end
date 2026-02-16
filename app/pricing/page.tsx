"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import BrandLogo from "@/components/brand-logo"
import { CheckIcon } from "@phosphor-icons/react"
import AuthFooter from "@/components/auth-footer"

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For individual educators getting started.",
    features: [
      "Up to 3 courses",
      "25 students per course",
      "Basic quiz builder",
      "Community support",
      "Standard analytics",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams and departments.",
    features: [
      "Unlimited courses",
      "500 students per course",
      "Advanced quiz & assignment builder",
      "Priority support",
      "Detailed analytics & reports",
      "Custom branding",
      "SSO integration",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with dedicated needs.",
    features: [
      "Everything in Pro",
      "Unlimited students",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security & compliance",
      "SLA guarantee",
      "On-premise deployment option",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

export default function PricingPage() {
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
            <Link href="/pricing" className="text-[13px] font-semibold text-foreground transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#" className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-foreground">Resources</Link>
          </nav>
          <Button asChild className="ml-auto h-9 rounded-none px-5 text-[13px] font-semibold">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 px-6 pt-[calc(4rem+3rem)] pb-10 lg:pt-[calc(4rem+4rem)] lg:pb-16">
        <div className="mx-auto w-full max-w-4xl">
          {/* Page header */}
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Pricing</p>
            <h1 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-white sm:text-[38px]">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/50 max-w-lg mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing tiers */}
          <div className="grid gap-6 sm:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  "rounded-none border-0 py-0 gap-0 shadow-[0_4px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.04)]",
                  tier.highlighted && "border-t-2 border-t-primary ring-1 ring-primary/20"
                )}
              >
                <CardContent className="p-7">
                  {tier.highlighted && (
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">Most popular</p>
                  )}
                  <h2 className="text-[17px] font-semibold tracking-tight text-foreground">{tier.name}</h2>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-[32px] font-semibold tracking-tight text-foreground">{tier.price}</span>
                    {tier.period && (
                      <span className="text-[13px] text-muted-foreground">{tier.period}</span>
                    )}
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{tier.description}</p>

                  <Button
                    asChild
                    className={cn(
                      "mt-5 h-10 w-full rounded-none text-[13px] font-semibold",
                      !tier.highlighted && "bg-white/10 text-white hover:bg-white/15 border border-white/10"
                    )}
                    variant={tier.highlighted ? "default" : "ghost"}
                  >
                    <Link href={tier.name === "Enterprise" ? "/contact" : "/create-account"}>
                      {tier.cta}
                    </Link>
                  </Button>

                  <ul className="mt-6 space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckIcon size={14} weight="bold" className="mt-0.5 shrink-0 text-primary" />
                        <span className="text-[13px] text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  )
}
