"use client"

import * as React from "react"
import Link from "next/link"
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
import Sidebar, { type NavKey } from "@/components/sidebar"
import QuickCreatePanel from "@/components/quick-create-panel"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import SystemBanner from "@/components/ui/system-banner"
import {
  ArrowCircleUpIcon,
  MagnifyingGlassIcon,
  GlobeIcon,
  BellIcon,
  CaretDownIcon,
  UserIcon,
  GearIcon,
  QuestionIcon,
  BookmarkSimpleIcon,
  RocketIcon,
  SignOutIcon,
  NoteBlankIcon,
  DownloadSimpleIcon,
  PushPinIcon,
  XIcon,
  CaretUpIcon,
} from "@phosphor-icons/react"

function TopBar({ onOpenNotes }: { onOpenNotes?: () => void }) {
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
        <div className="flex items-center gap-2">
          <ArrowCircleUpIcon size={28} weight="bold" className="text-primary" />
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
                <GlobeIcon size={28} weight="bold" />
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
                    <BellIcon size={28} weight="bold" />
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
                    weight="bold"
                    className={`opacity-80 transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <UserIcon size={18} weight="bold" />
                  <span>My Portfolio</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <GearIcon size={18} weight="bold" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <QuestionIcon size={18} weight="bold" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookmarkSimpleIcon size={18} weight="bold" />
                  <span>My Library</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => onOpenNotes?.()}>
                  <NoteBlankIcon size={18} weight="bold" />
                  <span>Notes</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary">
                  <RocketIcon size={18} weight="bold" />
                  <span>Upgrade</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <SignOutIcon size={18} weight="bold" />
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

type NoteSection = {
  title: string
  content: string
  image?: string
}

const instructorNotes: NoteSection[] = [
  {
    title: "Traditional Programming",
    content:
      "Before modern AI, creating intelligent systems required traditional programming—writing step-by-step procedures.\n\nThe challenge is that for many important tasks, we simply can't spell out the procedure—a human expert may excel but can't articulate the instructions for a computer.",
  },
  {
    title: "Machine Learning",
    content:
      "Instead of programming step-by-step procedures, machine learning enables computers to learn from examples.\n\nAI fundamentally works through pattern recognition.\n• During Training: The system recognizes and learns patterns from examples.\n• During Operation: The trained model applies these patterns to new, unseen data to make predictions or decisions.",
  },
]

const yourNotes: NoteSection[] = [
  {
    title: "Learning Machines",
    content:
      "The real magic of Netflix's recommendation system comes from these personalized experiences. Instead of endlessly scrolling through thousands of titles wondering what to watch, the system surfaces content matched to your tastes, helping you find your next favorite show without the frustration of choice overload. Here's the impressive part: 80% of Netflix viewing comes from these personalized recommendations.",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=300&fit=crop",
  },
]

const searchSuggestions = [
  "shocked students",
  "lazarusgatawa.com",
  "sean combs",
  "reckoning",
]

function NotesPanel({
  onClose,
  isPinned,
  onTogglePin,
}: {
  onClose: () => void
  isPinned: boolean
  onTogglePin: () => void
}) {
  const [activeTab, setActiveTab] = React.useState("instructor")
  const [searchValue, setSearchValue] = React.useState("")
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(yourNotes.map((n) => n.title))
  )
  const searchRef = React.useRef<HTMLDivElement>(null)

  function toggleSection(title: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  // Close suggestions on click outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const filteredSuggestions = searchSuggestions.filter((s) =>
    s.toLowerCase().includes(searchValue.toLowerCase())
  )

  function renderNoteContent(content: string) {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("• ")) {
        const parts = line.substring(2).split(":")
        if (parts.length > 1) {
          return (
            <li key={i} className="ml-4 list-disc text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{parts[0]}:</span>
              {parts.slice(1).join(":")}
            </li>
          )
        }
        return (
          <li key={i} className="ml-4 list-disc text-sm text-muted-foreground">
            {line.substring(2)}
          </li>
        )
      }
      if (line === "") return <div key={i} className="h-3" />
      return (
        <p key={i} className="text-sm text-muted-foreground">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-sm font-semibold">Notes</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Download">
            <DownloadSimpleIcon size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", isPinned && "text-primary")}
            aria-label={isPinned ? "Unpin" : "Pin"}
            onClick={onTogglePin}
          >
            <PushPinIcon size={18} weight={isPinned ? "fill" : "regular"} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Close" onClick={onClose}>
            <XIcon size={18} />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 shrink-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="instructor" className="flex-1">Instructor Notes</TabsTrigger>
            <TabsTrigger value="yours" className="flex-1">Your Notes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 shrink-0" ref={searchRef}>
        <div className="relative">
          <MagnifyingGlassIcon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="h-9 rounded-none pl-9 text-sm"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md">
              {filteredSuggestions.map((s) => (
                <button
                  key={s}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
                  onClick={() => {
                    setSearchValue(s)
                    setShowSuggestions(false)
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 mt-3">
        {activeTab === "instructor" ? (
          <div className="px-4 pb-4 space-y-6">
            {instructorNotes.map((note) => (
              <div key={note.title}>
                <h3 className="text-base font-bold mb-3">{note.title}</h3>
                <div className="space-y-1.5">{renderNoteContent(note.content)}</div>
                {note.image && (
                  <img
                    src={note.image}
                    alt=""
                    className="mt-3 w-full rounded-md border object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 pb-4 space-y-2">
            {yourNotes.map((note) => {
              const isExpanded = expandedSections.has(note.title)
              return (
                <div key={note.title} className="border rounded-md overflow-hidden">
                  <button
                    onClick={() => toggleSection(note.title)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm font-bold">{note.title}</span>
                    <CaretUpIcon
                      size={16}
                      className={cn(
                        "shrink-0 text-muted-foreground transition-transform",
                        !isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-1.5">
                      {renderNoteContent(note.content)}
                      {note.image && (
                        <img
                          src={note.image}
                          alt=""
                          className="mt-3 w-full rounded-md border object-cover"
                        />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>

      {/* Page counter badge */}
      <div className="absolute bottom-4 right-4">
        <div className="h-7 w-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
          3
        </div>
      </div>
    </div>
  )
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [activeKey, setActiveKey] = React.useState<NavKey>("quickCreate")
  const showRightPanel = activeKey === "quickCreate"
  const [showNotes, setShowNotes] = React.useState(false)
  const [notesPinned, setNotesPinned] = React.useState(false)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <TopBar onOpenNotes={() => setShowNotes(true)} />

      {/* Row under the topbar */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
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
            />
          </aside>
        </>
      )}

    </div>
  )
}
