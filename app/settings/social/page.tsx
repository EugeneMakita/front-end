"use client"

import type { ElementType } from "react"
import { Button } from "@/components/ui/button"
import {
  AppleLogoIcon,
  FacebookLogoIcon,
  GoogleLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react"

type SocialAction = {
  label: string
  action: "link" | "unlink"
  icon: ElementType
  className: string
}

const linkedAccounts: SocialAction[] = [
  {
    label: "Google",
    action: "unlink",
    icon: GoogleLogoIcon,
    className: "bg-red-600 text-white hover:bg-red-700",
  },
]

const unlinkedAccounts: SocialAction[] = [
  {
    label: "LinkedIn",
    action: "link",
    icon: LinkedinLogoIcon,
    className: "bg-sky-700 text-white hover:bg-sky-800",
  },
  {
    label: "Facebook",
    action: "link",
    icon: FacebookLogoIcon,
    className: "bg-indigo-700 text-white hover:bg-indigo-800",
  },
  {
    label: "Apple",
    action: "link",
    icon: AppleLogoIcon,
    className: "bg-black text-white hover:bg-zinc-900",
  },
]

function SocialButton({ label, action, icon: Icon, className }: SocialAction) {
  const verb = action === "unlink" ? "Unlink" : "Link"
  return (
    <Button
      type="button"
      className={`h-11 w-full cursor-pointer justify-start gap-2.5 rounded-none px-4 text-base font-semibold ${className}`}
    >
      <Icon size={18} weight="fill" className="text-white" />
      <span>
        {verb} {label}
      </span>
    </Button>
  )
}

export default function SocialSettingsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <h2 className="text-base font-semibold">Social</h2>
        <p className="text-sm text-muted-foreground">Manage your linked social accounts.</p>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-base font-semibold">Linked Accounts</h3>
        <div className="space-y-2">
          {linkedAccounts.map((account) => (
            <SocialButton key={`${account.action}-${account.label}`} {...account} />
          ))}
        </div>
      </div>

      <div className="max-w-md space-y-2">
        <h3 className="text-base font-semibold">Unlinked Accounts</h3>
        <div className="space-y-2">
          {unlinkedAccounts.map((account) => (
            <SocialButton key={`${account.action}-${account.label}`} {...account} />
          ))}
        </div>
      </div>
    </div>
  )
}
