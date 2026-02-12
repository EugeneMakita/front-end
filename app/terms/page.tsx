"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-muted/40 p-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="space-y-2 p-8">
          <CardTitle className="text-2xl font-semibold">Terms and Conditions</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="p-8 space-y-6 text-base text-muted-foreground">
          <p>
            These Terms and Conditions govern your use of this platform, including
            account registration, acceptable use, and service access.
          </p>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">1. Account and access</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials and any actions taken under your account.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">2. Acceptable use</h3>
            <p>
              You agree not to misuse the service, attempt unauthorized access, or
              interfere with platform reliability, security, or other users.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">3. Service updates</h3>
            <p>
              We may update features or terms over time. Continued use of the service
              after updates means you accept the revised terms.
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-lg font-medium text-foreground">4. Contact</h3>
            <p>
              If you have questions about these terms, contact support via the Help
              section in the app.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}
