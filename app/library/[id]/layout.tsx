"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { initialItems } from "@/lib/mock-library"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Overview", href: "" },
  { label: "Questions", href: "/questions" },
  { label: "Settings", href: "/settings" },
]

function truncateLabel(label: string, max = 30) {
  return label.length > max ? `${label.slice(0, max)}...` : label
}

function buildDisplayDescription(description: string) {
  const fallback =
    "This document contains curated material used across your learning workflows, including structured content, references, and reusable assets for question and answer generation. It is designed to support consistent review, collaboration, and assessment preparation within the library."
  const source = description.trim().length > 0 ? `${description.trim()} ${fallback}` : fallback
  const maxChars = 320
  return source.length > maxChars ? `${source.slice(0, maxChars).trimEnd()}...` : source
}

export default function LibraryItemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const itemId = params.id as string
  const item = initialItems.find((entry) => entry.id === itemId)
  const quickCreateOpen = searchParams.get("quickCreate") === "1"

  const withQuickCreate = React.useCallback(
    (path: string) =>
      quickCreateOpen ? `${path}${path.includes("?") ? "&" : "?"}quickCreate=1` : path,
    [quickCreateOpen]
  )

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-muted-foreground">Library item not found</p>
      </div>
    )
  }

  const basePath = `/library/${itemId}`
  const activeTab = tabs.find((tab) =>
    tab.href === "" ? pathname === basePath : pathname.startsWith(`${basePath}${tab.href}`)
  )
  const displayDescription = buildDisplayDescription(item.description)
  const isQuestionWorkPage = /^\/library\/[^/]+\/questions\/[^/]+\/(view|edit)$/.test(pathname)

  if (isQuestionWorkPage) {
    return <div className="max-w-4xl mx-auto">{children}</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
        <Link href={withQuickCreate("/library")} className="hover:text-foreground transition-colors" title="Library">
          Library
        </Link>
        <span>/</span>
        <Link
          href={withQuickCreate(basePath)}
          className="hover:text-foreground transition-colors"
          title={item.title}
        >
          {truncateLabel(item.title)}
        </Link>
        {activeTab && (
          <>
            <span>/</span>
            <span className="text-foreground font-medium">{activeTab.label}</span>
          </>
        )}
      </nav>

      <h1 className="text-2xl font-bold">{item.title}</h1>
      <p
        className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {displayDescription}
      </p>

      <div className="border-b mb-8 mt-6">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => {
            const href = tab.href === "" ? basePath : `${basePath}${tab.href}`
            const isActive = activeTab?.label === tab.label
            return (
              <Link
                key={tab.label}
                href={withQuickCreate(href)}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                  isActive
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>

      {children}
    </div>
  )
}
