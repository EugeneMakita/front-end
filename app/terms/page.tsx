"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import BrandLogo from "@/components/brand-logo"
import { ScalesIcon, ArrowLeftIcon } from "@phosphor-icons/react"

const sections = [
  {
    title: "Account and access",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and any actions taken under your account. You must provide accurate information during registration and keep it up to date.",
  },
  {
    title: "Acceptable use",
    content:
      "You agree not to misuse the service, attempt unauthorized access, or interfere with platform reliability, security, or other users. Content you create or upload must not violate applicable laws or infringe on third-party rights.",
  },
  {
    title: "Service updates",
    content:
      "We may update features or terms over time. Continued use of the service after updates means you accept the revised terms. We will make reasonable efforts to notify you of material changes.",
  },
  {
    title: "Contact",
    content:
      "If you have questions about these terms, contact support via the Help section in the app or reach out to our team directly.",
  },
]

export default function TermsPage() {
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
      <main className="relative z-10 px-6 pt-[calc(4rem+2.5rem)] pb-10 lg:pt-[calc(4rem+3rem)] lg:pb-16">
        <div className="mx-auto w-full max-w-3xl">
          {/* Back link */}
          <Link
            href="/login"
            className="mb-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/40 transition-colors hover:text-white/60"
          >
            <ArrowLeftIcon size={12} weight="bold" />
            Back
          </Link>

          <Card className="rounded-none border-border/70 py-0 gap-0 shadow-2xl shadow-black/40">
            {/* Header */}
            <div className="p-8 pb-0">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10">
                  <ScalesIcon size={24} weight="fill" className="text-primary" />
                </div>
                <div>
                  <h1 className="text-[22px] font-semibold tracking-tight">
                    Terms and Conditions
                  </h1>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Last updated &mdash; February 2026
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-8 pt-6">
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                These Terms and Conditions govern your use of this platform,
                including account registration, acceptable use, and service
                access. By using the platform you agree to these terms.
              </p>

              <Separator className="my-6" />

              <div className="space-y-8">
                {sections.map((section, index) => (
                  <section key={section.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-primary/10 text-[12px] font-bold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-foreground">
                        {section.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.7] text-muted-foreground">
                        {section.content}
                      </p>
                    </div>
                  </section>
                ))}
              </div>

              <Separator className="my-6" />

              <p className="text-[12px] leading-relaxed text-muted-foreground">
                For further assistance, contact support via the Help section or
                email{" "}
                <span className="font-medium text-foreground">
                  support@asesley.com
                </span>
                .
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
