"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarBlankIcon, CreditCardIcon, TreeStructureIcon } from "@phosphor-icons/react"

const invoices = [
  { date: "Feb 7, 2026", total: "CA$31.36", status: "Paid" },
  { date: "Jan 18, 2026", total: "CA$313.60", status: "Paid" },
  { date: "Jul 31, 2024", total: "CA$29.40", status: "Paid" },
  { date: "Jun 22, 2024", total: "CA$29.40", status: "Paid" },
]

export default function SubscriptionSettingsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <TreeStructureIcon size={24} weight="fill" className="mt-0.5 text-muted-foreground" />
          <div>
            <h2 className="text-base font-semibold">Pro plan</h2>
            <p className="text-sm text-muted-foreground">Monthly</p>
          </div>
        </div>
        <Button variant="outline" className="h-10 cursor-pointer rounded-none">
          Cancel plan
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4 py-1">
        <div className="flex items-center gap-2">
          <CalendarBlankIcon size={20} weight="fill" className="shrink-0 text-muted-foreground" />
          <p className="text-sm text-foreground">Your subscription will be canceled on Mar 7, 2026.</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-base font-semibold">Payment</h3>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CreditCardIcon size={20} weight="fill" className="text-muted-foreground" />
            <p className="text-sm">Mastercard •••• 4984</p>
          </div>
          <Link href="/settings/subscription/add-payment">
            <Button variant="outline" className="h-10 cursor-pointer rounded-none">
              Add payment
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-base font-semibold">Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Date</th>
                <th className="pb-2 pr-4 font-medium">Total</th>
                <th className="pb-2 pr-4 font-medium">Status</th>
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={`${invoice.date}-${invoice.total}`} className="border-t">
                  <td className="py-2 pr-4">{invoice.date}</td>
                  <td className="py-2 pr-4">{invoice.total}</td>
                  <td className="py-2 pr-4">{invoice.status}</td>
                  <td className="py-2">
                    <button type="button" className="cursor-pointer text-primary underline underline-offset-2">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
