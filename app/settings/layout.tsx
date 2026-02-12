import type { ReactNode } from "react"
import SettingsSidebar from "@/app/settings/_components/settings-sidebar"

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid items-start gap-5 lg:grid-cols-[230px_1fr]">
        <SettingsSidebar />
        <section className="bg-card">{children}</section>
      </div>
    </div>
  )
}
