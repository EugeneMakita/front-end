"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeftIcon, LockSimpleIcon } from "@phosphor-icons/react"

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
  "Cote d'Ivoire","Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland",
  "France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea",
  "Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq",
  "Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait",
  "Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico",
  "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru",
  "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman",
  "Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia",
  "Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
  "Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan",
  "Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City",
  "Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
]

export default function CheckoutPage() {
  const router = useRouter()
  const [showDetails, setShowDetails] = React.useState(false)
  const [acceptTerms, setAcceptTerms] = React.useState(false)
  const [acceptRenewal, setAcceptRenewal] = React.useState(false)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon size={12} weight="bold" />
        Back
      </button>

      {/* Total due */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Total due today</h2>
          <button
            type="button"
            className="cursor-pointer text-xs text-primary hover:underline"
            onClick={() => setShowDetails((v) => !v)}
          >
            {showDetails ? "Hide details" : "View details"}
          </button>
        </div>
        <p className="text-2xl font-bold tracking-tight">CA$218.40</p>
      </div>

      {showDetails && (
        <div className="space-y-3 pt-1 text-sm">
          <div className="flex justify-between gap-3">
            <div>
              <p className="font-semibold">Brilliant Premium</p>
              <p className="text-muted-foreground">Billed yearly</p>
            </div>
            <p>CA$195.00</p>
          </div>
          <div className="flex justify-between gap-3">
            <p>Tax</p>
            <p>CA$23.40</p>
          </div>
        </div>
      )}

      <Separator />

      {/* Payment method */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Payment method</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button type="button" className="h-11 w-full rounded-none bg-[#FFC439] text-[#003087] hover:bg-[#ffbf24]">
            PayPal
          </Button>
          <Button type="button" className="h-11 w-full rounded-none bg-black text-white hover:bg-zinc-900">
            G Pay · Visa •••• 1401
          </Button>
        </div>

        <div className="flex items-center gap-3 py-2">
          <Separator className="flex-1" />
          <span className="text-xs font-semibold text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>

        <div className="space-y-3.5">
          <Input placeholder="Card number" className="h-11 rounded-none" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input placeholder="Expiration date" className="h-11 rounded-none" />
            <Input placeholder="Security code" className="h-11 rounded-none" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Select defaultValue="canada">
              <SelectTrigger className="h-11 w-full rounded-none">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem
                    key={country}
                    value={country.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  >
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Postal code" className="h-11 rounded-none" />
          </div>
        </div>
      </div>

      {/* Consent checkboxes */}
      <div className="space-y-4 pt-1">
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms-consent"
            checked={acceptTerms}
            onCheckedChange={(v) => setAcceptTerms(v === true)}
            className="mt-0.5"
          />
          <label htmlFor="terms-consent" className="text-xs leading-6 text-muted-foreground">
            By checking this box, I agree to the{" "}
            <Link href="/terms" className="text-primary underline underline-offset-2">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox
            id="renewal-consent"
            checked={acceptRenewal}
            onCheckedChange={(v) => setAcceptRenewal(v === true)}
            className="mt-0.5"
          />
          <label htmlFor="renewal-consent" className="text-xs leading-6 text-muted-foreground">
            I understand my subscription starts immediately, renews automatically, and can be canceled anytime
            before renewal from account settings.
          </label>
        </div>
      </div>

      <Button
        className="h-12 w-full rounded-none"
        disabled={!acceptTerms || !acceptRenewal}
      >
        <LockSimpleIcon size={16} weight="fill" />
        Subscribe now
      </Button>
    </div>
  )
}
