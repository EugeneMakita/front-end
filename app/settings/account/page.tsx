import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">Account deletion</h2>
        <p className="text-sm text-muted-foreground">
          All your profile and learning data will be permanently deleted.
        </p>
        <p className="text-sm text-muted-foreground">
          If you are looking to cancel your subscription, go to{" "}
          <Link href="/settings/subscription" className="text-primary underline underline-offset-2">
            Subscription
          </Link>
          .
        </p>
      </div>

      <Separator />

      <Button variant="destructive" className="h-11 cursor-pointer rounded-none px-6">
        Delete My Account
      </Button>
    </div>
  )
}
