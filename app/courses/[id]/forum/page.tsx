"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FlagIcon,
  TrashIcon,
  PushPinIcon,
  LockSimpleIcon,
  ChatCircleDotsIcon,
} from "@phosphor-icons/react"
import { mockThreads } from "@/lib/mock-forum"

export default function ForumPage() {
  const params = useParams()
  const courseId = params.id as string
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState("recent")
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())

  const filtered = mockThreads
    .filter((t) => {
      const matchesSearch =
        t.topic.toLowerCase().includes(search.toLowerCase()) ||
        t.startedBy.toLowerCase().includes(search.toLowerCase())
      const matchesFlag =
        filter === "flagged" ? t.flagged :
        filter === "unflagged" ? !t.flagged :
        true
      return matchesSearch && matchesFlag
    })
    .sort((a, b) => {
      if (filter === "popular") return b.views - a.views
      if (filter === "replies") return b.replies - a.replies
      return 0
    })

  const allSelected =
    filtered.length > 0 &&
    filtered.every((t) => selectedIds.has(t.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((t) => t.id)))
    }
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleAll}
            aria-label="Select all"
          />
          {selectedIds.size > 0 ? (
            <span className="text-sm text-muted-foreground">
              With <span className="font-semibold text-foreground">{selectedIds.size}</span> selected:
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">Select all</span>
          )}
        </div>

        {selectedIds.size > 0 && (
          <Select
            value=""
            onValueChange={(value) => {
              if (value === "delete") setSelectedIds(new Set())
            }}
          >
            <SelectTrigger className="w-[200px] h-10">
              <SelectValue placeholder="Select the action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pin">
                <div className="flex items-center gap-2">
                  <PushPinIcon size={16} />
                  <span>Pin threads</span>
                </div>
              </SelectItem>
              <SelectItem value="lock">
                <div className="flex items-center gap-2">
                  <LockSimpleIcon size={16} />
                  <span>Lock threads</span>
                </div>
              </SelectItem>
              <SelectItem value="flag">
                <div className="flex items-center gap-2">
                  <FlagIcon size={16} />
                  <span>Flag threads</span>
                </div>
              </SelectItem>
              <SelectItem value="delete">
                <div className="flex items-center gap-2 text-destructive">
                  <TrashIcon size={16} />
                  <span>Delete threads</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}

        <div className="ml-auto flex items-center gap-3">
          <Button size="sm" className="gap-2">
            <PlusIcon size={16} />
            Add New Thread
          </Button>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[170px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Viewed</SelectItem>
              <SelectItem value="replies">Most Replies</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
              <SelectItem value="unflagged">Unflagged</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[220px]">
            <MagnifyingGlassIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="h-10 pl-9"
              placeholder="Search threads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
            <TableHead className="w-[40px]" />
            <TableHead className="text-gray-700 dark:text-gray-300 font-bold">Topic</TableHead>
            <TableHead className="w-[180px] text-gray-700 dark:text-gray-300 font-bold">Started By</TableHead>
            <TableHead className="w-[100px] text-gray-700 dark:text-gray-300 font-bold text-center">Replies</TableHead>
            <TableHead className="w-[130px] text-gray-700 dark:text-gray-300 font-bold text-center">Views (Unique)</TableHead>
            <TableHead className="w-[220px] text-gray-700 dark:text-gray-300 font-bold">Last Post</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((thread, index) => {
            const isSelected = selectedIds.has(thread.id)
            return (
              <TableRow
                key={thread.id}
                data-state={isSelected ? "selected" : undefined}
                className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/30 hover:bg-primary/5" : "hover:bg-primary/5"}
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleOne(thread.id)}
                    aria-label={`Select thread: ${thread.topic}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/courses/${courseId}/forum/${thread.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {thread.topic}
                    </Link>
                    {thread.flagged && (
                      <FlagIcon size={14} weight="fill" className="text-orange-500 shrink-0" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{thread.startedBy}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                    <ChatCircleDotsIcon size={14} className="shrink-0" />
                    {thread.replies}
                  </div>
                </TableCell>
                <TableCell className="text-center text-primary">
                  {thread.views} ({thread.uniqueViews})
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{thread.lastPost}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No threads found</p>
        </div>
      )}
    </div>
  )
}
