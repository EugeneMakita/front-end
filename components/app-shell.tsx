"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BrandLogo from "@/components/brand-logo"
import Sidebar, { type NavKey } from "@/components/sidebar"
import QuickCreatePanel from "@/components/quick-create-panel"
import SystemBanner from "@/components/ui/system-banner"
import NotesPanel from "@/components/notes-panel"
import { NotesProvider, useNotes } from "@/components/notes-context"
import {
  MagnifyingGlassIcon,
  GlobeIcon,
  BellIcon,
  ChatCircleIcon,
  CaretDownIcon,
  GearIcon,
  QuestionIcon,
  RocketIcon,
  SignOutIcon,
  NoteBlankIcon,
  NotePencilIcon,
} from "@phosphor-icons/react"

function TopBar({
  onOpenNotes,
  onLogout,
  onOpenSettings,
}: {
  onOpenNotes?: () => void
  onLogout?: () => void
  onOpenSettings?: () => void
}) {
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
    <header className="relative sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* LEFT: brand */}
        <div className="flex items-center">
          <BrandLogo variant="full" href="/library" />
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* RIGHT: search + Upgrade + cluster */}
        <div className="flex items-center gap-3">
          {/* search */}
          <div className="relative w-[520px] max-w-[40vw]">
            <MagnifyingGlassIcon
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
                <GlobeIcon size={28} weight="fill" />
              </Button>
              <div className="text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity" onClick={handleLocaleChange}>
                {locale}
              </div>
            </div>

            {/* Icon buttons cluster: Bell + Messages */}
            <div className="flex items-center gap-1">
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
                    <BellIcon size={28} weight="fill" />
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
                  <Link href="/notifications">
                    <Button
                      variant="outline"
                      className="w-full rounded-none font-semibold"
                    >
                      View All Notifications
                    </Button>
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none"
              aria-label="Messages"
            >
              <ChatCircleIcon size={28} weight="fill" />
            </Button>
            </div>

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
                  <CaretDownIcon
                    size={22}
                    weight="fill"
                    className={`opacity-80 transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onSelect={() => onOpenSettings?.()}>
                  <GearIcon size={18} weight="fill" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <QuestionIcon size={18} weight="fill" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => onOpenNotes?.()}>
                  <NoteBlankIcon size={18} weight="fill" />
                  <span>Notes</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary">
                  <RocketIcon size={18} weight="fill" />
                  <span>Upgrade</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onSelect={onLogout}>
                  <SignOutIcon size={18} weight="fill" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* System banner — anchored at the bottom of the header */}
      <SystemBanner
        text="Student View"
        color="bg-amber-500"
        size="sm"
        position="bottom"
      />
    </header>
  )
}

const navRoutes: Partial<Record<NavKey, string>> = {
  inbox: "/notifications",
  library: "/library",
  courses: "/courses",
  classes: "/classes",
  assignments: "/assignments",
  settings: "/settings",
  quickCreate: "/",
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <NotesProvider>
      <AppShellContent>{children}</AppShellContent>
    </NotesProvider>
  )
}

function AppShellContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { capturedNotes, addCapturedNote } = useNotes()
  const isAuthPage =
    pathname.startsWith("/create-account") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/privacy-policy") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/contact")

  const pathToKey = Object.entries(navRoutes).find(([, path]) => pathname === path || pathname.startsWith(path + "/"))?.[0] as NavKey | undefined
  const hasQuickCreateParam = searchParams.get("quickCreate") === "1"
  const [quickCreateOpen, setQuickCreateOpen] = React.useState<boolean>(() => hasQuickCreateParam)
  const showRightPanel = quickCreateOpen
  const activeKey: NavKey =
    pathToKey && pathToKey !== "quickCreate"
      ? pathToKey
      : quickCreateOpen
      ? "quickCreate"
      : "quickCreate"
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [showNotes, setShowNotes] = React.useState(false)
  const [notesPinned, setNotesPinned] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const closingQuickCreateRef = React.useRef(false)
  const [selectionAction, setSelectionAction] = React.useState<{
    text: string
    x: number
    y: number
  } | null>(null)

  const buildPathWithQuickCreate = React.useCallback(
    (path: string, open: boolean) => {
      const params = new URLSearchParams(searchParams.toString())
      if (open) {
        params.set("quickCreate", "1")
      } else {
        params.delete("quickCreate")
      }
      const query = params.toString()
      return query ? `${path}?${query}` : path
    },
    [searchParams]
  )

  function closeQuickCreate() {
    closingQuickCreateRef.current = true
    setQuickCreateOpen(false)
    router.replace(buildPathWithQuickCreate(pathname, false))
  }

  function handleNavSelect(key: NavKey) {
    if (key === "quickCreate") {
      if (quickCreateOpen) {
        closeQuickCreate()
      } else {
        closingQuickCreateRef.current = false
        setQuickCreateOpen(true)
        router.push(buildPathWithQuickCreate(pathname, true))
      }
      return
    }
    const route = navRoutes[key]
    if (route) {
      router.push(buildPathWithQuickCreate(route, quickCreateOpen))
    }
  }

  React.useEffect(() => {
    function updateSelectionAction() {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) {
        setSelectionAction(null)
        return
      }

      const text = selection.toString().trim()
      if (!text) {
        setSelectionAction(null)
        return
      }

      const anchorNode = selection.anchorNode
      if (!anchorNode || !contentRef.current?.contains(anchorNode)) {
        setSelectionAction(null)
        return
      }

      const element =
        anchorNode.nodeType === Node.ELEMENT_NODE
          ? (anchorNode as Element)
          : anchorNode.parentElement
      if (element?.closest("input, textarea, [contenteditable='true'], math-field")) {
        setSelectionAction(null)
        return
      }

      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      if (!rect.width && !rect.height) {
        setSelectionAction(null)
        return
      }

      setSelectionAction({
        text,
        x: rect.right + 8,
        y: rect.top - 8,
      })
    }

    function clearSelectionAction(event?: Event) {
      const target = event?.target
      if (target instanceof Element && target.closest("[data-note-capture-button='true']")) {
        return
      }
      const selection = window.getSelection()
      if (!selection || selection.toString().trim() === "") {
        setSelectionAction(null)
      }
    }

    function hideSelectionActionOnPointerDown(event: Event) {
      const target = event.target
      if (target instanceof Element && target.closest("[data-note-capture-button='true']")) {
        return
      }
      setSelectionAction(null)
    }

    document.addEventListener("selectionchange", updateSelectionAction)
    document.addEventListener("mouseup", updateSelectionAction)
    document.addEventListener("keyup", updateSelectionAction)
    document.addEventListener("mousedown", hideSelectionActionOnPointerDown)
    document.addEventListener("click", clearSelectionAction)
    window.addEventListener("scroll", clearSelectionAction, true)
    window.addEventListener("resize", clearSelectionAction)
    return () => {
      document.removeEventListener("selectionchange", updateSelectionAction)
      document.removeEventListener("mouseup", updateSelectionAction)
      document.removeEventListener("keyup", updateSelectionAction)
      document.removeEventListener("mousedown", hideSelectionActionOnPointerDown)
      document.removeEventListener("click", clearSelectionAction)
      window.removeEventListener("scroll", clearSelectionAction, true)
      window.removeEventListener("resize", clearSelectionAction)
    }
  }, [])

  React.useEffect(() => {
    if (!hasQuickCreateParam) {
      closingQuickCreateRef.current = false
    }
  }, [hasQuickCreateParam])

  React.useEffect(() => {
    if (closingQuickCreateRef.current) return
    if (hasQuickCreateParam && !quickCreateOpen) {
      setQuickCreateOpen(true)
    }
  }, [hasQuickCreateParam, quickCreateOpen])

  React.useEffect(() => {
    if (isAuthPage) return
    if (!quickCreateOpen || hasQuickCreateParam) return
    router.replace(buildPathWithQuickCreate(pathname, true))
  }, [buildPathWithQuickCreate, hasQuickCreateParam, isAuthPage, pathname, quickCreateOpen, router])

  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <TopBar
        onOpenNotes={() => setShowNotes(true)}
        onLogout={() => router.push("/create-account")}
        onOpenSettings={() => router.push("/settings")}
      />

      {/* Row under the topbar */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar activeKey={activeKey} onSelect={handleNavSelect} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((c) => !c)} />

        {showRightPanel && (
          <aside className="h-full w-[420px] overflow-hidden border-r bg-background">
            <QuickCreatePanel onClose={closeQuickCreate} />
          </aside>
        )}

        <main className="min-w-0 flex-1 overflow-auto">
          <div ref={contentRef} className="p-6">{children}</div>
        </main>
      </div>

      {selectionAction && (
        <button
          type="button"
          aria-label="Add selection to notes"
          data-note-capture-button="true"
          className="fixed z-[75] flex h-8 w-8 items-center justify-center border bg-background shadow-md hover:bg-accent"
          style={{ left: selectionAction.x, top: selectionAction.y }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            addCapturedNote(selectionAction.text, pathname)
            setShowNotes(true)
            setSelectionAction(null)
            const selection = window.getSelection()
            selection?.removeAllRanges()
          }}
        >
          <NotePencilIcon size={16} />
        </button>
      )}

      {/* Notes panel — overlays on right */}
      {showNotes && (
        <>
          {/* Backdrop (only when not pinned) */}
          {!notesPinned && (
            <div
              className="fixed inset-0 z-[60] bg-black/20 supports-backdrop-filter:backdrop-blur-xs"
              onClick={() => setShowNotes(false)}
            />
          )}
          <aside
            className={cn(
              "fixed top-0 right-0 z-[70] h-full w-[420px] border-l bg-background shadow-2xl",
              "animate-in slide-in-from-right duration-200"
            )}
          >
            <NotesPanel
              onClose={() => {
                setShowNotes(false)
                setNotesPinned(false)
              }}
              isPinned={notesPinned}
              onTogglePin={() => setNotesPinned((p) => !p)}
              capturedNotes={capturedNotes}
            />
          </aside>
        </>
      )}

    </div>
  )
}
