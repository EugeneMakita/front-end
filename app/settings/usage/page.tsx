"use client"

import { Separator } from "@/components/ui/separator"

const usageRows = [
  { label: "AI credits", used: 1240, limit: 2000, unit: "credits" },
  { label: "Generated questions", used: 318, limit: 500, unit: "questions" },
  { label: "Storage", used: 7.2, limit: 20, unit: "GB" },
  { label: "Active learners", used: 86, limit: 120, unit: "users" },
]

export default function UsageSettingsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">Usage</h2>
        <p className="text-sm text-muted-foreground">
          Monitor your current plan usage across core resources.
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        {usageRows.map((row) => {
          const pct = Math.min(100, Math.round((Number(row.used) / Number(row.limit)) * 100))
          return (
            <div key={row.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-sm text-muted-foreground">
                  {row.used} / {row.limit} {row.unit}
                </p>
              </div>
              <div className="h-2 w-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
