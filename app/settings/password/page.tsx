"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PasswordSettingsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <h2 className="text-base font-semibold">Password</h2>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="old-password" className="text-sm">
            Old Password
          </Label>
          <Input id="old-password" type="password" className="h-10 rounded-none" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-password" className="text-sm">
            New Password
          </Label>
          <Input id="new-password" type="password" className="h-10 rounded-none" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-new-password" className="text-sm">
            Confirm New Password
          </Label>
          <Input id="confirm-new-password" type="password" className="h-10 rounded-none" />
        </div>
      </div>

      <div className="pt-1">
        <Button className="h-10 cursor-pointer rounded-none px-6">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
