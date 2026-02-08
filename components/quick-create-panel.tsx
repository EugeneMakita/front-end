"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

export default function QuickCreatePanel({
  onClose,
}: {
  onClose?: () => void
}) {
  const [showQuotaBanner, setShowQuotaBanner] = React.useState(true)

  // drag/drop UI state
  const [isDraggingFiles, setIsDraggingFiles] = React.useState(false)
  const dragDepthRef = React.useRef(0)

  // optional: store dropped files (for now just to prove it works)
  const [droppedFiles, setDroppedFiles] = React.useState<File[]>([])

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
      setDroppedFiles((prev) => [...prev, ...files])
    }
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
      <div className="shrink-0 border-t">
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

          <div className="px-3 py-2">
          {/* dashed drop area: only show when user is dragging files */}
          {isDraggingFiles && (
            <div className="mb-3 flex items-center justify-center gap-2 rounded-none border-[4px] border-dashed bg-muted/10 px-5 py-7 text-sm text-muted-foreground">
              <span className="text-base">⇪</span>
              <span>Drop images here</span>
            </div>
          )}

          {/* optional: show file names after drop (remove later if you want) */}
          {droppedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {droppedFiles.slice(0, 6).map((f) => (
                <div
                  key={`${f.name}-${f.size}-${f.lastModified}`}
                  className="max-w-[220px] truncate rounded-none border bg-muted/10 px-2 py-1 text-xs text-muted-foreground"
                  title={f.name}
                >
                  {f.name}
                </div>
              ))}
              {droppedFiles.length > 6 && (
                <div className="rounded-none border bg-muted/10 px-2 py-1 text-xs text-muted-foreground">
                  +{droppedFiles.length - 6} more
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
            <Button variant="outline" className="rounded-none h-8">
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
      </div>
    </div>
  )
}
