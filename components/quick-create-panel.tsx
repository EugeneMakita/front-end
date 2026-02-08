"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { X, FileText, FilePdf, FileDoc, File } from "@phosphor-icons/react"

function FilePreview({
  file,
  onRemove,
}: {
  file: File
  onRemove: () => void
}) {
  const [preview, setPreview] = React.useState<string | null>(null)
  const [isImage, setIsImage] = React.useState(false)

  React.useEffect(() => {
    if (file.type.startsWith("image/")) {
      setIsImage(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setIsImage(false)
    }
  }, [file])

  function getFileTypeIcon() {
    const name = file.name.toLowerCase()
    const type = file.type

    if (type.startsWith("image/")) return null

    if (type === "application/pdf" || name.endsWith(".pdf")) {
      return { icon: <FilePdf size={24} weight="bold" />, color: "text-red-500" }
    }
    if (
      type === "application/msword" ||
      type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".doc") ||
      name.endsWith(".docx")
    ) {
      return { icon: <FileDoc size={24} weight="bold" />, color: "text-blue-500" }
    }
    if (
      type.includes("sheet") ||
      type.includes("excel") ||
      name.endsWith(".xls") ||
      name.endsWith(".xlsx")
    ) {
      return { icon: <File size={24} weight="bold" />, color: "text-green-500" }
    }
    if (
      type.includes("presentation") ||
      type.includes("powerpoint") ||
      name.endsWith(".ppt") ||
      name.endsWith(".pptx")
    ) {
      return { icon: <File size={24} weight="bold" />, color: "text-orange-500" }
    }
    return { icon: <FileText size={24} weight="bold" />, color: "text-gray-500" }
  }

  function getShortFileName() {
    // Remove extension
    const dotIndex = file.name.lastIndexOf(".")
    const nameWithoutExt = dotIndex > 0 ? file.name.substring(0, dotIndex) : file.name
    
    const maxChars = 14
    if (nameWithoutExt.length > maxChars) {
      return nameWithoutExt.substring(0, maxChars) + "..."
    }
    return nameWithoutExt
  }

  const fileTypeInfo = getFileTypeIcon()

  return (
    <div className="relative rounded-none border bg-muted/10 w-20 h-20 overflow-hidden flex flex-col items-center justify-center p-0">
      {isImage && preview ? (
        <img src={preview} alt={file.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-between p-1">
          <div className="flex-1 flex items-center justify-center">
            <div className={fileTypeInfo?.color || "text-gray-500"}>
              {fileTypeInfo?.icon}
            </div>
          </div>
          <span className="text-[9px] leading-tight text-center text-muted-foreground w-full px-1 break-words">
            {getShortFileName()}
          </span>
        </div>
      )}
      <Button
        variant="ghost"
        className="absolute top-1 right-1 h-7 w-7 rounded-none bg-red-500 hover:bg-red-600 text-white hover:text-white p-0 flex items-center justify-center"
        onClick={onRemove}
        aria-label="Remove file"
      >
        <X size={16} weight="bold" />
      </Button>
    </div>
  )
}

export default function QuickCreatePanel({
  onClose,
}: {
  onClose?: () => void
}) {
  const [showQuotaBanner, setShowQuotaBanner] = React.useState(true)

  // drag/drop UI state
  const [isDraggingFiles, setIsDraggingFiles] = React.useState(false)
  const dragDepthRef = React.useRef(0)

  // file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // optional: store dropped files (for now just to prove it works)
  const [droppedFiles, setDroppedFiles] = React.useState<File[]>([])

  // duplicate file modal state
  const [showDuplicateModal, setShowDuplicateModal] = React.useState(false)

  function hasFiles(e: React.DragEvent) {
    // Best-effort detection across browsers
    const dt = e.dataTransfer
    if (!dt) return false
    if (dt.types?.includes?.("Files")) return true
    // Some browsers expose items
    if (dt.items && dt.items.length > 0) {
      return Array.from(dt.items).some((it) => it.kind === "file")
    }
    return false
  }

  function onDragEnter(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!hasFiles(e)) return

    dragDepthRef.current += 1
    setIsDraggingFiles(true)
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!hasFiles(e)) return
    // required so drop works
    e.dataTransfer.dropEffect = "copy"
    setIsDraggingFiles(true)
  }

  function onDragLeave(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!isDraggingFiles) return

    dragDepthRef.current -= 1
    if (dragDepthRef.current <= 0) {
      dragDepthRef.current = 0
      setIsDraggingFiles(false)
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()

    dragDepthRef.current = 0
    setIsDraggingFiles(false)

    const files = Array.from(e.dataTransfer.files ?? [])
    if (files.length > 0) {
      addFiles(files)
    }
  }

  function removeFile(index: number) {
    setDroppedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function isDuplicateFile(newFile: File): boolean {
    return droppedFiles.some(
      (existingFile) =>
        existingFile.name === newFile.name && existingFile.size === newFile.size
    )
  }

  function addFiles(filesToAdd: File[]) {
    let hasDuplicate = false
    const filesToAddFiltered: File[] = []

    for (const file of filesToAdd) {
      if (isDuplicateFile(file)) {
        hasDuplicate = true
      } else {
        filesToAddFiltered.push(file)
      }
    }

    if (hasDuplicate) {
      setShowDuplicateModal(true)
    }

    if (filesToAddFiltered.length > 0) {
      setDroppedFiles((prev) => [...prev, ...filesToAddFiltered])
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length > 0) {
      addFiles(files)
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function openFileDialog() {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 px-4 pt-4">
        <div className="flex items-center">
          <div className="text-sm font-medium">Quick Create</div>

          <div className="ml-auto flex items-center gap-2">
            <Button className="rounded-full px-4">✦ Generate</Button>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </Button>
            )}
          </div>
        </div>

        <Separator className="mt-4" />
      </div>

      {/* Middle (scrolls) */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="px-4 py-6 space-y-4">
          <div className="text-sm text-muted-foreground">Suggestions</div>

          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="rounded-none justify-start">
              ✦ Flat Design
            </Button>
            <Button variant="outline" className="rounded-none justify-start">
              ✦ Minimal Style
            </Button>
            <Button variant="outline" className="rounded-none justify-start">
              ✦ Brutalist
            </Button>
          </div>

          <div className="pt-6 space-y-3 text-sm">
            <div>
              <span className="font-semibold">Colors:</span> dark bg, white
              content, green primary, purple accents.
            </div>
            <div>
              <span className="font-semibold">Font:</span> Inter.
            </div>
            <div>
              <span className="font-semibold">Radius:</span> 0.5rem.
            </div>
          </div>

          <div className="h-40" />
        </div>
      </ScrollArea>

      {/* Composer */}
      <div className="shrink-0 border-t-2">
        {/* input surface (drop target) */}
        <div
          className={cn(
            "rounded-none border-0 border-b bg-background transition-[padding]",
            isDraggingFiles && "p-3",
            !isDraggingFiles && "p-0"
          )}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {/* Dismissible gray banner - now inside the input surface */}
          {showQuotaBanner && (
            <div className="mb-0 flex items-center gap-3 rounded-none border-0 bg-muted px-3 py-2 text-xs text-muted-foreground">
              <div className="min-w-0 truncate">
                You have 3 Free Pro messages left.
              </div>

              <Button variant="ghost" size="sm" className="ml-auto h-6 px-2 text-xs">
                Upgrade
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowQuotaBanner(false)}
                aria-label="Close banner"
              >
                ✕
              </Button>
            </div>
          )}

          <div className="px-4 py-5">
          {/* dashed drop area: only show when user is dragging files */}
          {isDraggingFiles && (
            <div className="mb-3 flex items-center justify-center gap-2 rounded-none border-[4px] border-dashed bg-muted/10 px-5 py-7 text-sm text-muted-foreground">
              <span className="text-base">⇪</span>
              <span>Drop images here</span>
            </div>
          )}

          {/* optional: show file previews after drop */}
          {droppedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {droppedFiles.slice(0, 6).map((f, idx) => (
                <FilePreview
                  key={`${f.name}-${f.size}-${f.lastModified}-${idx}`}
                  file={f}
                  onRemove={() => removeFile(idx)}
                />
              ))}
              {droppedFiles.length > 6 && (
                <div className="flex items-center justify-center rounded-none border border-dashed bg-muted/10 w-20 h-20 text-xs font-medium text-muted-foreground">
                  +{droppedFiles.length - 6}
                </div>
              )}
            </div>
          )}

          <Textarea
            placeholder="Describe your theme..."
            className={cn(
              "min-h-[48px] resize-none border-0 bg-transparent p-0",
              "text-sm outline-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-muted-foreground"
            )}
          />

          <div className="mt-2 flex items-center justify-between">
            <Button 
              variant="outline" 
              className="rounded-none h-8"
              onClick={openFileDialog}
            >
              ＋
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-none h-8 text-xs">
                ⊞ Image
              </Button>
              <Button className="rounded-none w-8 h-8" aria-label="Send">
                ↑
              </Button>
            </div>
          </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Duplicate file modal */}
      <AlertDialog open={showDuplicateModal} onOpenChange={setShowDuplicateModal}>
        <AlertDialogContent>
          <AlertDialogTitle>You've already uploaded this file.</AlertDialogTitle>
          <AlertDialogDescription>
            Try uploading something new.
          </AlertDialogDescription>
          <AlertDialogAction onClick={() => setShowDuplicateModal(false)}>
            OK
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
