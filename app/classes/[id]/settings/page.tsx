"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function ClassSettingsPage() {
  const [className, setClassName] = React.useState("ML - Section A")
  const [allowSelfJoin, setAllowSelfJoin] = React.useState(false)
  const [publishGrades, setPublishGrades] = React.useState(true)

  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="class-name">Class name</Label>
        <Input
          id="class-name"
          className="h-10"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between border p-4">
        <div>
          <p className="text-sm font-medium">Allow self-join</p>
          <p className="text-xs text-muted-foreground">Students can join with class code.</p>
        </div>
        <Switch checked={allowSelfJoin} onCheckedChange={setAllowSelfJoin} />
      </div>

      <div className="flex items-center justify-between border p-4">
        <div>
          <p className="text-sm font-medium">Publish grades automatically</p>
          <p className="text-xs text-muted-foreground">Release grades as soon as evaluation is complete.</p>
        </div>
        <Switch checked={publishGrades} onCheckedChange={setPublishGrades} />
      </div>

      <div className="flex items-center gap-3">
        <Button className="h-10">Save changes</Button>
        <Button variant="outline" className="h-10">Cancel</Button>
      </div>
    </div>
  )
}
