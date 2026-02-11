"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { initialItems } from "@/lib/mock-library"
import { CopyIcon, DotsThreeIcon, DownloadSimpleIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"

type RelatedDocument = {
  id: string
  title: string
  category: "Question type" | "Answer type"
  fileType: string
  size: string
  pages: number
  uploadedOn: string
}

function buildRelatedDocuments(id: string, title: string): RelatedDocument[] {
  const base = title || "Document"
  return [
    {
      id: `${id}-q`,
      title: `${base} - Questions`,
      category: "Question type",
      fileType: "PDF",
      size: "2.6 MB",
      pages: 18,
      uploadedOn: "February 6, 2026",
    },
    {
      id: `${id}-a`,
      title: `${base} - Answers`,
      category: "Answer type",
      fileType: "DOCX",
      size: "0.9 MB",
      pages: 9,
      uploadedOn: "February 7, 2026",
    },
  ]
}

export default function LibraryItemIndexPage() {
  const params = useParams()
  const itemId = params.id as string
  const item = initialItems.find((entry) => entry.id === itemId)

  const [documents, setDocuments] = React.useState<RelatedDocument[]>(() =>
    buildRelatedDocuments(itemId, item?.title ?? "Document")
  )
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())

  const allSelected = documents.length > 0 && documents.every((doc) => selectedIds.has(doc.id))

  function getDocumentUrl(docId: string) {
    return `http://localhost:8000/documents/${itemId}/${docId}/file`
  }

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(documents.map((doc) => doc.id)))
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

  async function copyUrlForDocuments(ids: string[]) {
    const urls = ids.map((id) => getDocumentUrl(id))
    try {
      await navigator.clipboard.writeText(urls.join("\n"))
    } catch {
      // no-op fallback
    }
  }

  function deleteDocuments(ids: string[]) {
    if (ids.length === 0) return
    setDocuments((prev) => prev.filter((doc) => !ids.includes(doc.id)))
    setSelectedIds(new Set())
  }

  function duplicateDocument(id: string) {
    const source = documents.find((doc) => doc.id === id)
    if (!source) return
    const duplicate: RelatedDocument = {
      ...source,
      id: `${id}-copy-${Date.now()}`,
      title: `${source.title} (Copy)`,
    }
    setDocuments((prev) => [duplicate, ...prev])
  }

  function duplicateDocuments(ids: string[]) {
    ids.forEach((id) => duplicateDocument(id))
  }

  function addDocument(category: RelatedDocument["category"]) {
    const isQuestion = category === "Question type"
    const newDoc: RelatedDocument = {
      id: `${itemId}-${isQuestion ? "q" : "a"}-${Date.now()}`,
      title: `${item?.title ?? "Document"} - ${isQuestion ? "Questions" : "Answers"} ${documents.length + 1}`,
      category,
      fileType: isQuestion ? "PDF" : "DOCX",
      size: isQuestion ? "1.8 MB" : "0.7 MB",
      pages: isQuestion ? 12 : 6,
      uploadedOn: "February 11, 2026",
    }
    setDocuments((prev) => [newDoc, ...prev])
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-normal text-muted-foreground">
          Questions and answers are based on the documents below
        </p>

        <div className="flex items-center gap-3 pb-1">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={allSelected}
              onCheckedChange={toggleSelectAll}
              aria-label="Select all documents"
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
                const ids = Array.from(selectedIds)
                if (value === "copy-url") copyUrlForDocuments(ids)
                if (value === "download") copyUrlForDocuments(ids)
                if (value === "duplicate") duplicateDocuments(ids)
                if (value === "delete") deleteDocuments(ids)
              }}
            >
              <SelectTrigger className="h-9 w-[210px]">
                <SelectValue placeholder="Select the action..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="copy-url">Copy URL</SelectItem>
                <SelectItem value="download">Download</SelectItem>
                <SelectItem value="duplicate">Duplicate</SelectItem>
                <SelectItem value="delete" className="text-destructive focus:text-destructive">
                  Delete
                </SelectItem>
              </SelectContent>
            </Select>
          )}

          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <PlusIcon size={14} />
                  Add document
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onSelect={() => addDocument("Question type")}>
                  <span>Add question document</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => addDocument("Answer type")}>
                  <span>Add answer document</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
              <TableHead className="w-[40px]" />
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Name</TableHead>
              <TableHead className="w-[130px] font-bold text-gray-700 dark:text-gray-300">Category</TableHead>
              <TableHead className="w-[90px] font-bold text-gray-700 dark:text-gray-300">Type</TableHead>
              <TableHead className="w-[90px] font-bold text-gray-700 dark:text-gray-300">Size</TableHead>
              <TableHead className="w-[80px] text-center font-bold text-gray-700 dark:text-gray-300">Pages</TableHead>
              <TableHead className="w-[130px] font-bold text-gray-700 dark:text-gray-300">Uploaded</TableHead>
              <TableHead className="w-[70px] text-right font-bold text-gray-700 dark:text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => {
              const isSelected = selectedIds.has(doc.id)
              return (
                <TableRow
                  key={doc.id}
                  data-state={isSelected ? "selected" : undefined}
                  className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/30" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleOne(doc.id)}
                      aria-label={`Select ${doc.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-primary hover:underline"
                    >
                      {doc.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full text-[11px]">
                      {doc.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.fileType}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell className="text-center">{doc.pages}</TableCell>
                  <TableCell>{doc.uploadedOn}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="rounded-none">
                          <DotsThreeIcon size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onSelect={() => copyUrlForDocuments([doc.id])}>
                          <CopyIcon size={14} />
                          <span>Copy URL</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DownloadSimpleIcon size={14} />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => duplicateDocument(doc.id)}>
                          <CopyIcon size={14} />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          className="text-destructive focus:text-destructive"
                          onSelect={() => deleteDocuments([doc.id])}
                        >
                          <TrashIcon size={14} />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
