"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
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
  CaretDownIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilSimpleIcon,
  CopyIcon,
  TrashIcon,
  FolderSimpleIcon,
} from "@phosphor-icons/react"
import { mockQuestions, questionTypes, type Question } from "@/lib/mock-questions"
import { initialItems } from "@/lib/mock-library"

export default function QuestionsPage() {
  const router = useRouter()
  const params = useParams()
  const itemId = params.id as string
  const item = initialItems.find((i) => i.id === itemId)
  const [search, setSearch] = React.useState("")
  const [selectedItems, setSelectedItems] = React.useState<Set<number>>(new Set())
  const [expanded, setExpanded] = React.useState(true)
  const [filterGroup, setFilterGroup] = React.useState("all")
  const [filterType, setFilterType] = React.useState("all")

  const filtered = mockQuestions.filter((q) => {
    const matchesSearch =
      q.description.toLowerCase().includes(search.toLowerCase()) ||
      q.type.toLowerCase().includes(search.toLowerCase())
    const matchesGroup = filterGroup === "all" || q.group.toLowerCase() === filterGroup
    const matchesType = filterType === "all" || q.type === filterType
    return matchesSearch && matchesGroup && matchesType
  })

  const allSelected = filtered.length > 0 && filtered.every((q) => selectedItems.has(q.id))

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(filtered.map((q) => q.id)))
    }
  }

  function toggleSelect(id: number) {
    setSelectedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleBulkDelete() {
    setSelectedItems(new Set())
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb + Header */}
      <div className="mb-6">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
          <Link
            href="/library"
            className="hover:text-foreground transition-colors"
          >
            Library
          </Link>
          <span>/</span>
          <Link
            href={`/library/${itemId}/questions`}
            className="hover:text-foreground transition-colors"
          >
            {item?.title ?? `Item ${itemId}`}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Questions</span>
        </nav>
        <h1 className="text-2xl font-bold">Questions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {filtered.length} question{filtered.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {/* Toolbar */}
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
          <Select value={filterGroup} onValueChange={setFilterGroup}>
            <SelectTrigger className="w-[150px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {questionTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative w-[240px]">
            <MagnifyingGlassIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="h-10 pl-9"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Group header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full bg-muted/60 px-3 py-2 mb-0 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
      >
        {expanded ? <CaretDownIcon size={16} /> : <CaretRightIcon size={16} />}
        <span>Unassigned</span>
        <Badge variant="secondary" className="ml-1 text-xs">
          {filtered.length}
        </Badge>
      </button>

      {/* Table */}
      {expanded && (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
              <TableHead className="w-[40px]" />
              <TableHead className="w-[60px] text-gray-700 dark:text-gray-300 text-center font-bold">ID</TableHead>
              <TableHead className="min-w-[280px] text-gray-700 dark:text-gray-300 font-bold">Description</TableHead>
              <TableHead className="w-[140px] text-gray-700 dark:text-gray-300 font-bold">Actions</TableHead>
              <TableHead className="w-[160px] text-gray-700 dark:text-gray-300 font-bold">Type</TableHead>
              <TableHead className="w-[100px] text-gray-700 dark:text-gray-300 text-center font-bold">Times Used</TableHead>
              <TableHead className="w-[110px] text-gray-700 dark:text-gray-300 font-bold">Last Mod</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((question, index) => {
              const isSelected = selectedItems.has(question.id)
              return (
                <TableRow
                  key={question.id}
                  data-state={isSelected ? "selected" : undefined}
                  className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/30 hover:bg-primary/5" : "hover:bg-primary/5"}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelect(question.id)}
                      aria-label={`Select question ${question.id}`}
                    />
                  </TableCell>
                  <TableCell className="text-center text-gray-600 dark:text-gray-400">{question.id}</TableCell>
                  <TableCell className="font-medium whitespace-normal max-w-[320px] text-gray-800 dark:text-gray-200">
                    {question.description}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1.5">
                          <span>Preview</span>
                          <CaretDownIcon size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-44">
                        <DropdownMenuItem>
                          <EyeIcon size={16} />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <PencilSimpleIcon size={16} />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CopyIcon size={16} />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <TrashIcon size={16} />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs font-normal">
                      {question.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-gray-600 dark:text-gray-400">{question.timesUsed}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{question.lastModified}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No questions found</p>
        </div>
      )}
    </div>
  )
}
