"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowRightIcon,
  CopyIcon,
  DotsThreeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { initialFolders, initialItems, type LibraryItem } from "@/lib/mock-library"

export default function LibraryFolderPage() {
  const params = useParams()
  const router = useRouter()
  const folderId = params.folderId as string
  const folder = initialFolders.find((entry) => entry.id === folderId)

  const [items, setItems] = React.useState(initialItems)
  const [search, setSearch] = React.useState("")
  const [sortBy, setSortBy] = React.useState("recent")
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const filtered = items
    .filter((item) => {
      const inFolder = item.folderId === folderId
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      return inFolder && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "az") return a.title.localeCompare(b.title)
      if (sortBy === "za") return b.title.localeCompare(a.title)
      return 0
    })

  const allSelected = filtered.length > 0 && filtered.every((i) => selectedItems.has(i.id))

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(filtered.map((i) => i.id)))
    }
  }

  function toggleSelect(id: string) {
    setSelectedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleDuplicate(id: string) {
    const item = items.find((i) => i.id === id)
    if (!item) return
    const copy: LibraryItem = {
      ...item,
      id: crypto.randomUUID(),
      title: `${item.title} (Copy)`,
    }
    setItems((prev) => [...prev, copy])
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
    setSelectedItems((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function handleBulkDelete() {
    setItems((prev) => prev.filter((i) => !selectedItems.has(i.id)))
    setSelectedItems(new Set())
  }

  if (!folder) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <p className="text-sm text-muted-foreground">Folder not found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/library" className="hover:text-foreground transition-colors">
          Library
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{folder.name}</span>
      </nav>

      <h1 className="mb-6 text-2xl font-bold">{folder.name}</h1>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleSelectAll}
            aria-label="Select all"
          />
          {selectedItems.size > 0 ? (
            <span className="text-sm text-muted-foreground">
              With <span className="font-semibold text-foreground">{selectedItems.size}</span> selected:
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">Select all</span>
          )}
        </div>

        {selectedItems.size > 0 && (
          <Select
            value=""
            onValueChange={(value) => {
              if (value === "delete") handleBulkDelete()
            }}
          >
            <SelectTrigger className="w-[200px] h-10">
              <SelectValue placeholder="Select the action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delete">
                <div className="flex items-center gap-2 text-destructive">
                  <TrashIcon size={16} />
                  <span>Delete</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}

        <div className="ml-auto flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent First</SelectItem>
              <SelectItem value="az">A — Z</SelectItem>
              <SelectItem value="za">Z — A</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[220px]">
            <MagnifyingGlassIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="h-10 pl-9"
              placeholder="Search for lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No lessons found in this folder</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const isSelected = selectedItems.has(item.id)
            return (
              <div
                key={item.id}
                className={`group border bg-card overflow-hidden transition-shadow hover:shadow-md cursor-pointer ${
                  isSelected ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => router.push(`/library/${item.id}`)}
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(item.id)}
                      className="bg-white/80 border-white/60"
                      aria-label={`Select ${item.title}`}
                    />
                  </div>
                  <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="flex h-7 w-7 items-center justify-center bg-white/80 text-foreground hover:bg-white transition-colors"
                          aria-label="More options"
                        >
                          <DotsThreeIcon size={18} weight="bold" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onSelect={() => router.push("/library")}>
                          <ArrowRightIcon size={16} />
                          <span>Move to folder</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleDuplicate(item.id)}>
                          <CopyIcon size={16} />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => handleDelete(item.id)}
                        >
                          <TrashIcon size={16} />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.updatedAt}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
