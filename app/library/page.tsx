"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
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
import { initialFolders, initialItems, type Folder, type LibraryItem } from "@/lib/mock-library"

export default function LibraryPage() {
  const router = useRouter()
  const [search, setSearch] = React.useState("")
  const [sortBy, setSortBy] = React.useState("recent")
  const [folders, setFolders] = React.useState(initialFolders)
  const [items, setItems] = React.useState(initialItems)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())
  const [moveDialogOpen, setMoveDialogOpen] = React.useState(false)
  const [moveItemId, setMoveItemId] = React.useState<string | null>(null)
  const [moveTargetFolderId, setMoveTargetFolderId] = React.useState<string | null>(null)
  const [folderSearch, setFolderSearch] = React.useState("")
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false)
  const [renameFolderId, setRenameFolderId] = React.useState<string | null>(null)
  const [renameValue, setRenameValue] = React.useState("")

  const filtered = items
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      return matchesSearch
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

  function handleBulkMoveOpen() {
    setMoveItemId(null)
    setMoveTargetFolderId(null)
    setFolderSearch("")
    setMoveDialogOpen(true)
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
  }

  function openRenameDialog(folderId: string) {
    const folder = folders.find((f) => f.id === folderId)
    if (!folder) return
    setRenameFolderId(folderId)
    setRenameValue(folder.name)
    setRenameDialogOpen(true)
  }

  function confirmRename() {
    if (renameFolderId && renameValue.trim()) {
      setFolders((prev) =>
        prev.map((f) => (f.id === renameFolderId ? { ...f, name: renameValue.trim() } : f))
      )
    }
    setRenameDialogOpen(false)
    setRenameFolderId(null)
    setRenameValue("")
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb + Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Library</h1>
      </div>

      {/* Folders row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="group flex items-center gap-3 border bg-card px-3 py-2 cursor-pointer transition-colors hover:shadow-sm min-w-[170px]"
            onClick={() => router.push(`/library/folder/${folder.id}`)}
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
                <DropdownMenuItem onSelect={() => openRenameDialog(folder.id)}>
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
          className="h-auto px-3 py-2 gap-2"
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
              if (value === "move") handleBulkMoveOpen()
              if (value === "delete") handleBulkDelete()
            }}
          >
            <SelectTrigger className="w-[200px] h-10">
              <SelectValue placeholder="Select the action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="move">
                <div className="flex items-center gap-2">
                  <FolderSimpleIcon size={16} />
                  <span>Move</span>
                </div>
              </SelectItem>
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
                onClick={() => router.push(`/library/${item.id}`)}
              >
                {/* Image */}
                <div className="relative aspect-[5/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Top-left checkbox */}
                  <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(item.id)}
                      className="bg-white/80 border-white/60"
                      aria-label={`Select ${item.title}`}
                    />
                  </div>
                  {/* Top-right 3-dot menu */}
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
                        <DropdownMenuItem
                          onSelect={() => {
                            setMoveItemId(item.id)
                            setMoveTargetFolderId(null)
                            setFolderSearch("")
                            setMoveDialogOpen(true)
                          }}
                        >
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

      {/* Move to folder dialog */}
      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Select the folder</DialogTitle>
            <DialogDescription>
              Select the folder to move your lesson or create a new folder for it
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                className="h-10 pl-9"
                placeholder="Search..."
                value={folderSearch}
                onChange={(e) => setFolderSearch(e.target.value)}
              />
            </div>

            {/* Folder list */}
            <div className="space-y-1">
              {folders
                .filter((f) =>
                  f.name.toLowerCase().includes(folderSearch.toLowerCase())
                )
                .map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setMoveTargetFolderId(folder.id)}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent ${
                      moveTargetFolderId === folder.id
                        ? "bg-accent"
                        : ""
                    }`}
                  >
                    <FolderSimpleIcon size={20} className="text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium flex-1">{folder.name}</span>
                    <span className="text-sm text-muted-foreground">{folder.count}</span>
                  </button>
                ))}
            </div>

            {/* Add folder */}
            <button
              className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
              onClick={() => {
                const id = crypto.randomUUID()
                const newFolder: Folder = { id, name: "New Folder", count: 0, icon: "folder" }
                setFolders((prev) => [...prev, newFolder])
                setMoveTargetFolderId(id)
              }}
            >
              <PlusIcon size={16} />
              <span>Add Folder</span>
            </button>

            {/* Move button */}
            <Button
              className="w-full"
              disabled={!moveTargetFolderId}
              onClick={() => {
                if (moveTargetFolderId) {
                  if (moveItemId) {
                    handleMoveToFolder(moveItemId, moveTargetFolderId)
                  } else {
                    selectedItems.forEach((id) => handleMoveToFolder(id, moveTargetFolderId))
                    setSelectedItems(new Set())
                  }
                  setMoveDialogOpen(false)
                  setMoveItemId(null)
                  setMoveTargetFolderId(null)
                }
              }}
            >
              Move
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rename folder dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Rename folder</DialogTitle>
            <DialogDescription>
              Enter a new name for this folder
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <Input
              className="h-10"
              placeholder="Folder name"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  confirmRename()
                }
              }}
              autoFocus
            />
            <Button
              className="w-full"
              disabled={!renameValue.trim()}
              onClick={confirmRename}
            >
              Rename
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
