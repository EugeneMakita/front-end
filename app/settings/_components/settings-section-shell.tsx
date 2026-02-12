import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsSectionShell({
  title,
  description,
  primaryLabel,
  secondaryLabel,
}: {
  title: string
  description: string
  primaryLabel: string
  secondaryLabel: string
}) {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="primary-field" className="text-sm">
            {primaryLabel}
          </Label>
          <Input id="primary-field" className="h-10 rounded-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="secondary-field" className="text-sm">
            {secondaryLabel}
          </Label>
          <Input id="secondary-field" className="h-10 rounded-none" />
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
