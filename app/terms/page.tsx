"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-muted/40 p-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="space-y-2 p-8">
          <CardTitle className="text-2xl font-semibold">Terms & Privacy</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="p-8 space-y-6 text-base text-muted-foreground">
          <p>
            Welcome. These Terms & Privacy describe how we collect and use information
            when you use the app. This page uses the site theme for readable contrast
            so content is visible in light and dark modes.
          </p>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">1. Data we collect</h3>
            <p>
              We may collect personal data you provide, usage data, and aggregated
              analytics. We use this to improve the product and for diagnostics.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">2. How we use information</h3>
            <p>
              Information is used to provide features, improve services, and comply
              with legal obligations. We do not sell your data.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">3. Contact</h3>
            <p>
              If you have questions about these terms, please contact support via the
              Help link in the app.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}
