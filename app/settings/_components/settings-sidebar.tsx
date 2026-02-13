"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import {
  BellIcon,
  ChartBarIcon,
  CreditCardIcon,
  EnvelopeSimpleIcon,
  GearIcon,
  LockKeyIcon,
  ShareNetworkIcon,
  UserIcon,
} from "@phosphor-icons/react"

const sections = [
  { label: "General", href: "/settings/general", icon: GearIcon },
  { label: "Account", href: "/settings/account", icon: UserIcon },
  { label: "Subscription", href: "/settings/subscription", icon: CreditCardIcon },
  { label: "Notifications", href: "/settings/notifications", icon: BellIcon },
  { label: "Social", href: "/settings/social", icon: ShareNetworkIcon },
  { label: "Password", href: "/settings/password", icon: LockKeyIcon },
  { label: "Emails", href: "/settings/emails", icon: EnvelopeSimpleIcon },
  { label: "Usage", href: "/settings/usage", icon: ChartBarIcon },
]

export default function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-fit space-y-3 bg-card p-0">
      <div className="px-3 pt-2">
        <h3 className="text-sm font-medium text-primary">Account settings</h3>
      </div>
      <Separator />

      <div className="space-y-1 px-1.5">
        {sections.map((section) => {
          const active = pathname === section.href
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              className={`flex h-9 w-full cursor-pointer items-center gap-2.5 px-3 text-left text-sm transition-colors ${
                active
                  ? "rounded-md bg-primary/10 font-semibold text-primary"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              <Icon size={16} />
              <span>{section.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
