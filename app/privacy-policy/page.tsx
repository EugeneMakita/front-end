"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-muted/40 p-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="space-y-2 p-8">
          <CardTitle className="text-2xl font-semibold">Privacy Policy</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 p-8 text-base text-muted-foreground">
          <p>
            This Privacy Policy explains what information we collect, how we use it,
            and the choices you have when using this platform.
          </p>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">1. Information we collect</h3>
            <p>
              We may collect account details, usage events, device/browser metadata,
              and support communications to deliver and improve the product.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">2. How information is used</h3>
            <p>
              Information is used to provide features, maintain security, improve
              performance, and support product analytics and diagnostics.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">3. Sharing and retention</h3>
            <p>
              We do not sell personal data. Data may be shared with service providers
              that operate the platform and retained as needed for legal, security,
              and operational purposes.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">4. Your choices</h3>
            <p>
              You may request updates or deletion of account information subject to
              applicable legal and platform requirements.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}
