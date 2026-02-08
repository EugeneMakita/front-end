"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Sidebar, { type NavKey } from "@/components/sidebar"
import QuickCreatePanel from "@/components/quick-create-panel"
import {
  ArrowCircleUp,
  MagnifyingGlass,
  Globe,
  Bell,
  CaretDown,
  User,
  Gear,
  Question,
  BookmarkSimple,
  Rocket,
  SignOut,
} from "@phosphor-icons/react"

function TopBar() {
  const [locale, setLocale] = React.useState("EN")
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)
  const [unreadCount, setUnreadCount] = React.useState(3)
  const locales = ["EN", "ES", "FR", "DE"]

  const handleLocaleChange = () => {
    const currentIndex = locales.indexOf(locale)
    const nextIndex = (currentIndex + 1) % locales.length
    setLocale(locales[nextIndex])
  }

  const handleNotificationsOpen = (open: boolean) => {
    setIsNotificationsOpen(open)
    if (open && unreadCount > 0) {
      setUnreadCount(0)
    }
  }

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background/90 backdrop-blur">
      <div className="flex h-full items-center gap-4 px-6">
        {/* LEFT: brand */}
        <div className="flex items-center gap-2">
          <ArrowCircleUp size={28} weight="bold" className="text-primary" />
          <div className="font-mono text-lg font-semibold tracking-tight text-primary">
            Acme Inc.
          </div>
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* RIGHT: search + Upgrade + cluster */}
        <div className="flex items-center gap-3">
          {/* search */}
          <div className="relative w-[520px] max-w-[40vw]">
            <MagnifyingGlass
              size={22}
              weight="bold"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input className="h-10 rounded-none pl-10" placeholder="Search…" />
          </div>

          <Button className="h-10 rounded-none px-5">Upgrade</Button>

          {/* far-right cluster: Language (left), Bell (middle), Avatar (right-most) */}
          <div className="ml-2 hidden items-center gap-4 md:flex">
            {/* Language */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                aria-label="Language"
                onClick={handleLocaleChange}
              >
                <Globe size={28} weight="bold" />
              </Button>
              <div className="text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity" onClick={handleLocaleChange}>
                {locale}
              </div>
            </div>

            {/* Notifications Dropdown */}
            <DropdownMenu open={isNotificationsOpen} onOpenChange={handleNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    aria-label="Notifications"
                  >
                    <Bell size={28} weight="bold" />
                  </Button>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 p-0">
                <div className="max-h-[400px] overflow-y-auto">
                  {/* Notification Items */}
                  <div className="px-4 py-3 border-b hover:bg-accent transition-colors cursor-pointer">
                    <h3 className="font-semibold text-sm leading-tight">
                      RADAR returns on April 1
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Learn which AI skills leaders at Apple, IBM, and Snowflake are hiring for.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                  </div>

                  <div className="px-4 py-3 border-b hover:bg-accent transition-colors cursor-pointer">
                    <h3 className="font-semibold text-sm leading-tight">
                      New course available
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Check out the latest course on Advanced TypeScript patterns.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">3 days ago</p>
                  </div>

                  <div className="px-4 py-3 border-b hover:bg-accent transition-colors cursor-pointer">
                    <h3 className="font-semibold text-sm leading-tight">
                      Account upgrade successful
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Your premium plan is now active.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">1 week ago</p>
                  </div>
                </div>

                {/* View All Button */}
                <div className="border-t p-3">
                  <Button
                    variant="outline"
                    className="w-full rounded-none font-semibold"
                    onClick={() => setIsNotificationsOpen(false)}
                  >
                    View All Notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Avatar Dropdown Menu */}
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 rounded-none px-2 flex items-center gap-2"
                  aria-label="Account menu"
                >
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop" alt="Profile" />
                    <AvatarFallback>EG</AvatarFallback>
                  </Avatar>
                  <CaretDown
                    size={22}
                    weight="bold"
                    className={`opacity-80 transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User size={18} weight="bold" />
                  <span>My Portfolio</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Gear size={18} weight="bold" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Question size={18} weight="bold" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookmarkSimple size={18} weight="bold" />
                  <span>My Library</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-primary">
                  <Rocket size={18} weight="bold" />
                  <span>Upgrade</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <SignOut size={18} weight="bold" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
          <aside className="h-full w-[420px] overflow-hidden border-r bg-background">
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
