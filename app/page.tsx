"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Option = {
  id: string
  text: string
  keyHint: string
}

const options: Option[] = [
  { id: "a", text: "The first layers capture the most complex interactions.", keyHint: "1" },
  { id: "b", text: "The last layers capture the most complex interactions.", keyHint: "2" },
  { id: "c", text: "All layers capture interactions of similar complexity.", keyHint: "3" },
]

export default function Page() {
  const [value, setValue] = React.useState("a")

  // Keyboard shortcuts: 1/2/3
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const m = options.find((o) => o.keyHint === e.key)
      if (m) setValue(m.id)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <main className="min-h-screen bg-muted/40 p-8">
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="space-y-4 p-10">
          <CardTitle className="text-4xl font-semibold tracking-tight">
            Levels of representation
          </CardTitle>
          <p className="max-w-4xl text-xl text-muted-foreground">
            Which layers of a model capture more complex or &quot;higher level&quot; interactions?
          </p>
        </CardHeader>

        <Separator />

        {/* grey strip */}
        <div className="flex items-center justify-between bg-muted px-10 py-4">
          <div className="flex items-center gap-3 text-base font-medium">
            <span className="inline-flex h-6 w-6 items-center justify-center border">
              ✓
            </span>
            <span>Answer the question</span>
          </div>

          {/* Yellow XP like screenshot */}
          <Badge className="bg-yellow-400 px-3 py-1 text-base text-black hover:bg-yellow-400">
            50XP
          </Badge>
        </div>

        <Separator />

        <CardContent className="p-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Possible Answers</h2>
            <p className="text-lg text-muted-foreground">Select one answer</p>
          </div>

          <div className="mt-6">
            <RadioGroup value={value} onValueChange={setValue} className="space-y-4">
              {options.map((o) => {
                const selected = value === o.id
                return (
                  <Label
                    key={o.id}
                    htmlFor={o.id}
                    className={[
                      "flex cursor-pointer items-center justify-between border bg-background p-6",
                      "transition-colors",
                      selected ? "border-primary" : "border-border",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem id={o.id} value={o.id} />
                      <span className="text-xl">{o.text}</span>
                    </div>

                    {/* PRESS pill */}
                    <span className="inline-flex items-center gap-3 bg-muted px-5 py-3 text-sm font-semibold tracking-[0.25em] text-foreground/80">
                      PRESS <span className="tracking-normal">{o.keyHint}</span>
                    </span>
                  </Label>
                )
              })}
            </RadioGroup>
          </div>

          <div className="mt-14 flex items-center justify-between">
            <Button variant="outline" className="h-12 px-6 text-base">
              💡 Take Hint (-15 XP)
            </Button>

            <Button className="h-12 px-10 text-base">Submit Answer</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
