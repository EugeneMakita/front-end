"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  MagnifyingGlassIcon,
  StarIcon,
  FolderSimpleIcon,
  DotsThreeVerticalIcon,
  PlusIcon,
  ArrowRightIcon,
  CopyIcon,
  TrashIcon,
  PencilSimpleIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react"

type Folder = {
  id: string
  name: string
  count: number
  icon: "star" | "folder"
}

type LibraryItem = {
  id: string
  title: string
  description: string
  updatedAt: string
  image: string
  folderId?: string
}

const initialFolders: Folder[] = [
  { id: "favorites", name: "Favorites", count: 1, icon: "star" },
  { id: "eugee", name: "EuGee", count: 1, icon: "folder" },
]

const initialItems: LibraryItem[] = [
  {
    id: "1",
    title: "Holiday Party Presentation",
    description: "Presentation slides for the annual holiday celebration",
    updatedAt: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=240&fit=crop",
    folderId: "favorites",
  },
  {
    id: "2",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML including supervised and unsupervised learning",
    updatedAt: "3 days ago",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop",
    folderId: "eugee",
  },
  {
    id: "3",
    title: "Q4 Sales Report",
    description: "Quarterly sales performance breakdown by region",
    updatedAt: "1 week ago",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
  },
  {
    id: "4",
    title: "Brand Guidelines 2025",
    description: "Updated brand identity, colors, typography, and usage rules",
    updatedAt: "5 days ago",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop",
  },
  {
    id: "5",
    title: "Product Launch Deck",
    description: "Keynote presentation for the upcoming product launch event",
    updatedAt: "1 day ago",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=240&fit=crop",
  },
  {
    id: "6",
    title: "Team Onboarding Guide",
    description: "Step-by-step onboarding process for new team members",
    updatedAt: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=240&fit=crop",
  },
]

export default function LibraryPage() {
  const [search, setSearch] = React.useState("")
  const [sortBy, setSortBy] = React.useState("recent")
  const [folders, setFolders] = React.useState(initialFolders)
  const [items, setItems] = React.useState(initialItems)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())
  const [activeFolderId, setActiveFolderId] = React.useState<string | null>(null)

  const filtered = items
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      const matchesFolder = activeFolderId ? item.folderId === activeFolderId : true
      return matchesSearch && matchesFolder
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

  function handleMoveToFolder(itemId: string, folderId: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, folderId } : i))
    )
    setFolders((prev) =>
      prev.map((f) => ({
        ...f,
        count: initialItems.filter((i) =>
          i.id === itemId ? folderId === f.id : i.folderId === f.id
        ).length,
      }))
    )
  }

  function handleNewFolder() {
    const name = `New Folder`
    const id = crypto.randomUUID()
    setFolders((prev) => [...prev, { id, name, count: 0, icon: "folder" }])
  }

  function handleDeleteFolder(folderId: string) {
    setFolders((prev) => prev.filter((f) => f.id !== folderId))
    setItems((prev) =>
      prev.map((i) => (i.folderId === folderId ? { ...i, folderId: undefined } : i))
    )
    if (activeFolderId === folderId) setActiveFolderId(null)
  }

  function handleRenameFolder(folderId: string) {
    const folder = folders.find((f) => f.id === folderId)
    if (!folder) return
    const newName = prompt("Rename folder", folder.name)
    if (newName && newName.trim()) {
      setFolders((prev) =>
        prev.map((f) => (f.id === folderId ? { ...f, name: newName.trim() } : f))
      )
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Library</h1>
      </div>

      {/* Folders row */}
      <div className="flex items-center gap-3 mb-6">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`group flex items-center gap-3 border bg-card px-4 py-3 cursor-pointer transition-colors hover:shadow-sm min-w-[180px] ${
              activeFolderId === folder.id ? "border-primary shadow-sm" : ""
            }`}
            onClick={() =>
              setActiveFolderId(activeFolderId === folder.id ? null : folder.id)
            }
          >
            {folder.icon === "star" ? (
              <StarIcon size={20} weight="fill" className="text-primary shrink-0" />
            ) : (
              <FolderSimpleIcon size={20} className="text-muted-foreground shrink-0" />
            )}
            <span className="text-sm font-medium flex-1 truncate">{folder.name}</span>
            <span className="text-sm text-muted-foreground shrink-0">{folder.count}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground shrink-0"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Folder options"
                >
                  <DotsThreeVerticalIcon size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onSelect={() => handleRenameFolder(folder.id)}>
                  <PencilSimpleIcon size={16} />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => handleDeleteFolder(folder.id)}
                >
                  <TrashIcon size={16} />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}

        {/* New Folder button */}
        <Button
          variant="outline"
          className="h-auto px-4 py-3 gap-2"
          onClick={handleNewFolder}
        >
          <PlusIcon size={18} />
          <span className="text-sm">New Folder</span>
        </Button>
      </div>

      {/* Toolbar: Select All + Sort + Search */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleSelectAll}
            aria-label="Select all"
          />
          <span className="text-sm text-muted-foreground">Select all</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] h-9">
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
              className="h-9 pl-9"
              placeholder="Search for lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No lessons found</p>
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
              >
                {/* Image */}
                <div className="relative aspect-[5/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Top-left checkbox */}
                  <div className="absolute top-2 left-2">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(item.id)}
                      className="bg-white/80 border-white/60"
                      aria-label={`Select ${item.title}`}
                    />
                  </div>
                  {/* Top-right 3-dot menu */}
                  <div className="absolute top-2 right-2">
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
                        {/* Move to folder submenu (simplified) */}
                        {folders.map((f) => (
                          <DropdownMenuItem
                            key={f.id}
                            onSelect={() => handleMoveToFolder(item.id, f.id)}
                          >
                            <ArrowRightIcon size={16} />
                            <span>Move to {f.name}</span>
                          </DropdownMenuItem>
                        ))}
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

                {/* Card body */}
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
