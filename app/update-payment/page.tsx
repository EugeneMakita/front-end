"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export default function UpdatePaymentPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-lg">
        <button
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon size={12} weight="bold" />
          Back
        </button>

        <Card className="rounded-none py-0 gap-0">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Update payment method</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your new card details below.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">Card details</h3>
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

            <Button className="h-11 w-full rounded-none">
              <LockSimpleIcon size={16} weight="fill" />
              Update payment method
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
