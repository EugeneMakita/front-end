"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const initialEmails = [
  { address: "e.makita@qobogroup.com", primary: true, verified: true, privateEmail: true },
  { address: "eugenegatawa@icloud.com", primary: false, verified: true, privateEmail: true },
]

export default function EmailsSettingsPage() {
  const [emails, setEmails] = React.useState(initialEmails)
  const [newEmail, setNewEmail] = React.useState("")
  const [primaryEmail, setPrimaryEmail] = React.useState(initialEmails[0].address)
  const [backupEmail, setBackupEmail] = React.useState("all-verified")
  const [hideOnProfile, setHideOnProfile] = React.useState(true)
  const [keepPrivate, setKeepPrivate] = React.useState(true)

  function addEmail() {
    const trimmed = newEmail.trim().toLowerCase()
    if (!trimmed || emails.some((item) => item.address === trimmed)) return
    setEmails((prev) => [
      ...prev,
      { address: trimmed, primary: false, verified: false, privateEmail: true },
    ])
    setNewEmail("")
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">Emails</h2>
        <p className="text-sm text-muted-foreground">
          Manage sign-in emails, primary email usage, and profile email privacy.
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        {emails.map((email) => (
          <div key={email.address} className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium text-foreground">{email.address}</span>
              {email.primary && (
                <span className="rounded-full border border-primary px-2 py-0.5 text-xs font-medium text-primary">
                  Primary
                </span>
              )}
              {email.verified && (
                <span className="rounded-full border border-emerald-600 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  Verified
                </span>
              )}
              {email.privateEmail && (
                <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  Private
                </span>
              )}
            </div>
            {email.primary && (
              <p className="text-sm text-muted-foreground">
                This email is currently used for account-related notifications.
              </p>
            )}
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="new-email" className="text-sm">
          Add new email address
        </Label>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            id="new-email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email address"
            className="h-10 w-full max-w-sm rounded-none"
          />
          <Button onClick={addEmail} className="h-10 cursor-pointer rounded-none">
            Add
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className="text-sm">Primary email address</Label>
        <p className="text-sm text-muted-foreground">
          Choose which email should receive account and password-reset communications.
        </p>
        <Select value={primaryEmail} onValueChange={setPrimaryEmail}>
          <SelectTrigger className="h-10 w-full max-w-sm rounded-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {emails.map((email) => (
              <SelectItem key={email.address} value={email.address}>
                {email.address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className="text-sm">Backup email address</Label>
        <p className="text-sm text-muted-foreground">
          Choose where security alerts can also be sent.
        </p>
        <Select value={backupEmail} onValueChange={setBackupEmail}>
          <SelectTrigger className="h-10 w-full max-w-sm rounded-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-verified">Allow all verified emails</SelectItem>
            {emails.map((email) => (
              <SelectItem key={`backup-${email.address}`} value={email.address}>
                {email.address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Hide my email on profile page</p>
            <p className="text-sm text-muted-foreground">
              Keep your email hidden from your public profile.
            </p>
          </div>
          <Switch
            checked={hideOnProfile}
            onCheckedChange={setHideOnProfile}
            className="mt-0.5 cursor-pointer"
          />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Keep my email addresses private</p>
            <p className="text-sm text-muted-foreground">
              Use private/no-reply emails for platform operations and notifications.
            </p>
          </div>
          <Switch
            checked={keepPrivate}
            onCheckedChange={setKeepPrivate}
            className="mt-0.5 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-start gap-2">
        <Button variant="outline" className="h-10 cursor-pointer rounded-none">
          Cancel
        </Button>
        <Button className="h-10 cursor-pointer rounded-none">Save changes</Button>
      </div>
    </div>
  )
}
