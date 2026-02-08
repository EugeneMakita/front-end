"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Sidebar, { type NavKey } from "@/components/sidebar"
import QuickCreatePanel from "@/components/quick-create-panel"
import { ArrowCircleUp, MagnifyingGlass } from "@phosphor-icons/react"

const INSET_X = "px-4"

function TopBar() {
  return (
    <header className="shrink-0 h-16 border-b bg-background/90 backdrop-blur">
      <div className={`flex h-full items-center gap-3 ${INSET_X}`}>
        <div className="flex items-center gap-2">
          <ArrowCircleUp size={24} className="text-primary" />
          <div className="font-mono text-lg font-semibold tracking-tight text-primary">
            Acme Inc.
          </div>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="ml-auto flex items-center gap-2">
          <div className="relative w-[320px]">
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input className="h-10 pl-10" placeholder="Search…" />
          </div>

          <Button className="h-10 px-4">Upgrade</Button>
        </div>
      </div>
    </header>
  )
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [activeKey, setActiveKey] = React.useState<NavKey>("quickCreate")
  const showRightPanel = activeKey === "quickCreate"

  return (
    <div className="h-screen overflow-hidden bg-background">
      <TopBar />

      {/* Row under the topbar */}
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar activeKey={activeKey} onSelect={(key) => setActiveKey(key)} />

        {showRightPanel && (
          <aside className="w-[420px] h-full overflow-hidden border-r bg-background">
            <QuickCreatePanel onClose={() => setActiveKey("dashboard")} />
          </aside>
        )}

        <main className="min-w-0 flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
