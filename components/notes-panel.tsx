"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotesEditor from "@/components/notes-editor"
import {
  MagnifyingGlassIcon,
  DownloadSimpleIcon,
  PushPinIcon,
  XIcon,
  CaretUpIcon,
} from "@phosphor-icons/react"

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

const yourNotesData: NoteSection[] = [
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

function noteContentToHtml(content: string): string {
  const lines = content.split("\n")
  let html = ""
  let inList = false

  for (const line of lines) {
    if (line.startsWith("• ")) {
      if (!inList) {
        html += "<ul>"
        inList = true
      }
      const text = line.substring(2)
      const colonIdx = text.indexOf(":")
      if (colonIdx > -1) {
        html += `<li><strong>${text.substring(0, colonIdx + 1)}</strong>${text.substring(colonIdx + 1)}</li>`
      } else {
        html += `<li>${text}</li>`
      }
    } else {
      if (inList) {
        html += "</ul>"
        inList = false
      }
      if (line === "") {
        // skip empty lines (TipTap handles paragraph spacing)
      } else {
        html += `<p>${line}</p>`
      }
    }
  }
  if (inList) html += "</ul>"
  return html
}

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

export default function NotesPanel({
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
    new Set(yourNotesData.map((n) => n.title))
  )
  const searchRef = React.useRef<HTMLDivElement>(null)

  // Convert initial string content to HTML for TipTap
  const [userNotes] = React.useState(() =>
    yourNotesData.map((n) => ({
      ...n,
      htmlContent: noteContentToHtml(n.content),
    }))
  )

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
            {userNotes.map((note) => {
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
                    <div className="px-4 pb-4">
                      <NotesEditor content={note.htmlContent} />
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
