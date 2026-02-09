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
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { XIcon, FileTextIcon, FilePdfIcon, FileDocIcon, FileIcon, StopIcon, LightningIcon, ArrowDownIcon, ArrowRightIcon, CaretUpIcon, CaretDownIcon, CaretRightIcon, ThumbsUpIcon, ThumbsDownIcon, CopySimpleIcon, DotsThreeIcon, ClockIcon, PulseIcon, ArrowCounterClockwiseIcon, PlusCircleIcon, AtomIcon, CheckIcon } from "@phosphor-icons/react"

type FileAttachment = {
  name: string
  type: string
  dataUrl: string | null
}

type ThinkingStep = {
  label: string
  done: boolean
  details?: string[]
}

type Artifact = {
  title: string
  version: string
  filename: string
  filepath: string
}

type SurveyOption = {
  label: string
  muted?: boolean
}

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  attachments: FileAttachment[]
  thinkingSteps?: ThinkingStep[]
  thinkingLabel?: string
  thinkingStyle?: "simple" | "advanced"
  timestamp?: string
  workedForSeconds?: number
  artifacts?: Artifact[]
}

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
      return { icon: <FilePdfIcon size={24} weight="bold" />, color: "text-red-500" }
    }
    if (
      type === "application/msword" ||
      type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".doc") ||
      name.endsWith(".docx")
    ) {
      return { icon: <FileDocIcon size={24} weight="bold" />, color: "text-blue-500" }
    }
    if (
      type.includes("sheet") ||
      type.includes("excel") ||
      name.endsWith(".xls") ||
      name.endsWith(".xlsx")
    ) {
      return { icon: <FileIcon size={24} weight="bold" />, color: "text-green-500" }
    }
    if (
      type.includes("presentation") ||
      type.includes("powerpoint") ||
      name.endsWith(".ppt") ||
      name.endsWith(".pptx")
    ) {
      return { icon: <FileIcon size={24} weight="bold" />, color: "text-orange-500" }
    }
    return { icon: <FileTextIcon size={24} weight="bold" />, color: "text-gray-500" }
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
        <XIcon size={16} weight="bold" />
      </Button>
    </div>
  )
}

function SimpleThinkingChain({
  label,
  steps,
}: {
  label: string
  steps: ThinkingStep[]
}) {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="mb-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>{label}</span>
        {expanded ? (
          <CaretUpIcon size={12} weight="bold" />
        ) : (
          <CaretDownIcon size={12} weight="bold" />
        )}
      </button>
      {expanded && (
        <div className="mt-1.5 ml-0.5 border-l-2 border-muted pl-3 space-y-1">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn(
                "text-xs",
                step.done ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {step.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AdvancedThinkingStep({ step, isLast }: { step: ThinkingStep; isLast: boolean }) {
  const [expanded, setExpanded] = React.useState(false)
  const hasDetails = step.details && step.details.length > 0

  return (
    <div className="relative flex gap-3">
      {/* Vertical line + dot column */}
      <div className="flex flex-col items-center">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 shrink-0 mt-1.5" />
        {!isLast && (
          <div className="w-[2px] bg-muted flex-1 min-h-[8px]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-2 min-w-0 flex-1">
        <button
          onClick={() => hasDetails && setExpanded(!expanded)}
          className={cn(
            "flex items-center gap-1 text-sm text-muted-foreground",
            hasDetails && "hover:text-foreground cursor-pointer",
            !hasDetails && "cursor-default"
          )}
        >
          <span>{step.label}</span>
          {hasDetails && (
            expanded ? (
              <CaretUpIcon size={12} weight="bold" className="shrink-0" />
            ) : (
              <CaretDownIcon size={12} weight="bold" className="shrink-0" />
            )
          )}
        </button>
        {expanded && step.details && (
          <div className="mt-1 space-y-1">
            {step.details.map((detail, i) => (
              <div key={i} className="text-sm text-muted-foreground">
                {detail}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AdvancedThinkingChain({ steps }: { steps: ThinkingStep[] }) {
  return (
    <div className="mb-3">
      {steps.map((step, i) => (
        <AdvancedThinkingStep key={i} step={step} isLast={i === steps.length - 1} />
      ))}
    </div>
  )
}

function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="my-3 rounded-lg border bg-muted/30 overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 min-w-0 flex-1 text-left"
        >
          {expanded ? (
            <CaretDownIcon size={14} weight="bold" className="shrink-0 text-muted-foreground" />
          ) : (
            <CaretRightIcon size={14} weight="bold" className="shrink-0 text-muted-foreground" />
          )}
          <span className="text-sm font-medium truncate">{artifact.title}</span>
          <span className="text-xs text-muted-foreground shrink-0">{artifact.version}</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="shrink-0 p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Artifact options"
            >
              <DotsThreeIcon size={18} weight="bold" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ArrowCounterClockwiseIcon size={16} />
              Restore
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PlusCircleIcon size={16} />
              New Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t px-3 py-2.5 flex items-center gap-2.5">
          <AtomIcon size={18} className="shrink-0 text-blue-400" />
          <div className="min-w-0">
            <span className="text-sm font-medium">{artifact.filename}</span>
            <span className="text-xs text-muted-foreground ml-2 truncate">
              {artifact.filepath}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function ResponseListCard({
  question,
  options,
  page,
  total,
  onDismiss,
  onSubmit,
}: {
  question: string
  options: SurveyOption[]
  page: number
  total: number
  onDismiss: () => void
  onSubmit?: (selectedLabels: string[]) => void
}) {
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  function toggle(index: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  function handleSubmit() {
    const labels = Array.from(selected).map((i) => options[i].label)
    if (onSubmit) {
      onSubmit(labels)
    } else {
      onDismiss()
    }
  }

  return (
    <div className="rounded-lg border bg-muted/20 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium">{question}</span>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className="text-xs text-muted-foreground">
            {page} of {total}
          </span>
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <XIcon size={16} />
          </button>
        </div>
      </div>

      {/* Options */}
      <div>
        {options.map((opt, i) => {
          const isSelected = selected.has(i)
          return (
            <React.Fragment key={i}>
              {i > 0 && <Separator />}
              <button
                onClick={() => toggle(i)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                  isSelected && "bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "shrink-0 h-5 w-5 rounded border flex items-center justify-center transition-colors",
                    isSelected
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && <CheckIcon size={14} weight="bold" />}
                </div>
                <span
                  className={cn(
                    "text-sm",
                    opt.muted && "text-muted-foreground"
                  )}
                >
                  {opt.label}
                </span>
              </button>
            </React.Fragment>
          )
        })}
      </div>

      <Separator />

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="text-xs text-muted-foreground">
          {selected.size} selected
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-none"
            onClick={onDismiss}
          >
            Skip
          </Button>
          <Button
            size="sm"
            className="rounded-none px-2.5"
            disabled={selected.size === 0}
            onClick={handleSubmit}
          >
            <ArrowRightIcon size={16} weight="bold" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ThinkingChain({
  label,
  steps,
  style,
}: {
  label: string
  steps: ThinkingStep[]
  style: "simple" | "advanced"
}) {
  if (style === "advanced") {
    return <AdvancedThinkingChain steps={steps} />
  }
  return <SimpleThinkingChain label={label} steps={steps} />
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

  // buy credits modal state
  const [showCreditsModal, setShowCreditsModal] = React.useState(false)
  const [selectedCredits, setSelectedCredits] = React.useState(100)
  const [isCustomCredits, setIsCustomCredits] = React.useState(false)
  const [customValue, setCustomValue] = React.useState("")

  // recording/send state
  const [isRecording, setIsRecording] = React.useState(false)

  // chat state
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [textValue, setTextValue] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [showScrollDown, setShowScrollDown] = React.useState(false)
  const [showTopFade, setShowTopFade] = React.useState(false)
  const [showBottomFade, setShowBottomFade] = React.useState(false)

  // survey that replaces the composer
  const [activeSurvey, setActiveSurvey] = React.useState<{
    question: string
    options: SurveyOption[]
    page: number
    total: number
  } | null>(null)

  function readFileAsDataUrl(file: File): Promise<string | null> {
    return new Promise((resolve) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      } else {
        resolve(null)
      }
    })
  }

  async function handleSend() {
    const text = textValue.trim()
    if (!text && droppedFiles.length === 0) return

    // Convert files to serializable attachments
    const attachments: FileAttachment[] = await Promise.all(
      droppedFiles.map(async (f) => ({
        name: f.name,
        type: f.type,
        dataUrl: await readFileAsDataUrl(f),
      }))
    )

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      attachments,
    }

    setMessages((prev) => [...prev, userMsg])
    setTextValue("")
    setDroppedFiles([])
    setIsRecording(true)

    // Fake AI response after a short delay
    const style = Math.random() > 0.5 ? "advanced" as const : "simple" as const

    setTimeout(() => {
      setIsRecording(false)
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
      const fakeWorkedSeconds = Math.floor(Math.random() * 240) + 30 // 30s to 4m30s

      const fakeArtifacts: Artifact[][] = [
        [],
        [{ title: "Created graph canvas", version: "v1", filename: "graph-canvas.tsx", filepath: "/components/graph-canvas.tsx" }],
        [{ title: "Created theme config", version: "v1", filename: "theme-config.ts", filepath: "/lib/theme-config.ts" }],
        [
          { title: "Created color palette", version: "v1", filename: "colors.ts", filepath: "/lib/colors.ts" },
          { title: "Updated global styles", version: "v2", filename: "globals.css", filepath: "/app/globals.css" },
        ],
      ]
      const artifacts = fakeArtifacts[Math.floor(Math.random() * fakeArtifacts.length)]

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: `I'll create a theme based on your description${attachments.length > 0 ? ` and the ${attachments.length} file${attachments.length > 1 ? "s" : ""} you shared` : ""}. Here's what I've come up with:\n\n**Colors:** Dark background with white content, vibrant green for primary actions, and purple accents.\n\n**Font:** Inter for a clean, modern feel.\n\n**Radius:** 0.5rem for balanced corners.`,
        attachments: [],
        artifacts,
        timestamp: timeStr,
        workedForSeconds: fakeWorkedSeconds,
        thinkingLabel: "Generating theme",
        thinkingStyle: style,
        thinkingSteps: style === "advanced"
          ? [
              {
                label: "Analyzing the user's request",
                done: true,
                details: [
                  "The user wants a custom theme generated",
                  "This requires color, font, and radius decisions",
                ],
              },
              {
                label: "Considering implementation options",
                done: true,
                details: [
                  "Evaluating CSS custom properties approach",
                  "Checking compatibility with Tailwind config",
                ],
              },
              {
                label: "Selecting the best approach",
                done: true,
                details: [
                  "Using CSS variables for runtime theming",
                  "Generating Tailwind-compatible config values",
                ],
              },
            ]
          : [
              { label: "Analyzing your description...", done: true },
              { label: "Extracting color palette", done: true },
              { label: "Selecting typography", done: true },
              { label: "Configuring border radius", done: true },
              { label: "Theme generated", done: true },
            ],
      }
      setMessages((prev) => {
        const next = [...prev, aiMsg]

        // Count user messages so far (including the one we just added)
        const userCount = next.filter((m) => m.role === "user").length

        // After every 2nd user message, show a survey in the composer
        if (userCount % 2 === 0) {
          const fakeSurveys = [
            {
              question: "What would you like to improve or add?",
              options: [
                { label: "Better handling of _small.png variants" },
                { label: "OCR-based text quality detection" },
                { label: "Aspect ratio preferences (landscape vs portrait)" },
                { label: "All of the above" },
                { label: "Something else", muted: true },
              ],
            },
            {
              question: "How should we handle color conflicts?",
              options: [
                { label: "Override with new palette" },
                { label: "Merge with existing colors" },
                { label: "Create a separate color scheme" },
                { label: "Let me decide per color" },
                { label: "Something else", muted: true },
              ],
            },
          ]
          const survey = fakeSurveys[Math.floor(Math.random() * fakeSurveys.length)]
          setActiveSurvey({
            question: survey.question,
            options: survey.options,
            page: 1,
            total: 2,
          })
        }

        return next
      })
    }, 800)
  }

  function getViewport() {
    return scrollRef.current?.querySelector("[data-slot='scroll-area-viewport']") as HTMLElement | null
  }

  function scrollToBottom() {
    const vp = getViewport()
    if (vp) vp.scrollTop = vp.scrollHeight
  }

  function handleScroll() {
    const vp = getViewport()
    if (!vp) return
    const distanceFromBottom = vp.scrollHeight - vp.scrollTop - vp.clientHeight
    const hasOverflow = vp.scrollHeight > vp.clientHeight
    setShowScrollDown(distanceFromBottom > 80)
    setShowTopFade(vp.scrollTop > 10)
    setShowBottomFade(hasOverflow)
  }

  // Auto-scroll to bottom on new messages and recheck fades
  React.useEffect(() => {
    scrollToBottom()
    // Delay check so DOM has time to reflow
    requestAnimationFrame(() => handleScroll())
  }, [messages])

  // Attach scroll listener to the actual viewport
  React.useEffect(() => {
    const vp = getViewport()
    if (!vp) return
    vp.addEventListener("scroll", handleScroll)
    return () => vp.removeEventListener("scroll", handleScroll)
  }, [])

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
      <div className="shrink-0">
        <div className="flex items-center px-4 py-3">
          <div className="text-sm font-medium">New Chat</div>

          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8"
              onClick={onClose}
              aria-label="Close"
            >
              <XIcon size={20} weight="bold" />
            </Button>
          )}
        </div>

        <Separator />
      </div>

      {/* Middle (scrolls) */}
      <div className="relative min-h-0 flex-1">
      <ScrollArea className="h-full" ref={scrollRef}>
        {messages.length === 0 ? (
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
          </div>
        ) : (
          <div className="px-4 py-4 space-y-4">
            {messages.map((msg) =>
              msg.role === "user" ? (
                <div key={msg.id} className="flex flex-col items-end gap-2">
                    {msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 justify-end max-w-[85%]">
                        {msg.attachments.map((att, i) =>
                          att.dataUrl ? (
                            <img
                              key={i}
                              src={att.dataUrl}
                              alt={att.name}
                              className="w-16 h-16 rounded object-cover border"
                            />
                          ) : (
                            <div
                              key={i}
                              className="w-16 h-16 rounded border bg-muted/20 flex items-center justify-center"
                            >
                              <FileTextIcon size={20} className="text-muted-foreground" />
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {msg.text && (
                      <div className="rounded-lg bg-muted px-3 py-2 text-sm">
                        {msg.text}
                      </div>
                    )}
                </div>
              ) : (
                <div key={msg.id} className="flex justify-start gap-2 items-start">
                  <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <LightningIcon size={14} weight="fill" />
                  </div>
                  <div className="min-w-0 flex-1">
                    {msg.thinkingSteps && msg.thinkingLabel && (
                      <ThinkingChain
                        label={msg.thinkingLabel}
                        steps={msg.thinkingSteps}
                        style={msg.thinkingStyle ?? "simple"}
                      />
                    )}
                    {(() => {
                      const paragraphs = msg.text.split("\n\n")
                      const hasArtifacts = msg.artifacts && msg.artifacts.length > 0
                      const firstPara = paragraphs[0]
                      const restParas = paragraphs.slice(1).join("\n\n")

                      function renderText(text: string) {
                        return text.split(/(\*\*.*?\*\*)/).map((part, i) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <span key={i} className="font-semibold">
                              {part.slice(2, -2)}
                            </span>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )
                      }

                      return (
                        <>
                          <div className="text-sm whitespace-pre-wrap">
                            {renderText(firstPara)}
                          </div>
                          {hasArtifacts && msg.artifacts!.map((artifact, i) => (
                            <ArtifactCard key={i} artifact={artifact} />
                          ))}
                          {restParas && (
                            <div className="text-sm whitespace-pre-wrap">
                              {renderText(restParas)}
                            </div>
                          )}
                        </>
                      )
                    })()}

                    {/* Response footer */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      {msg.workedForSeconds != null && (
                        <span className="flex items-center gap-1">
                          <PulseIcon size={14} />
                          Worked for {Math.floor(msg.workedForSeconds / 60)}m {msg.workedForSeconds % 60}s
                        </span>
                      )}

                      <div className="flex items-center gap-1">
                        <button className="hover:text-foreground transition-colors p-0.5" aria-label="Thumbs up">
                          <ThumbsUpIcon size={14} />
                        </button>
                        <button className="hover:text-foreground transition-colors p-0.5" aria-label="Thumbs down">
                          <ThumbsDownIcon size={14} />
                        </button>
                        <button className="hover:text-foreground transition-colors p-0.5" aria-label="Copy">
                          <CopySimpleIcon size={14} />
                        </button>
                        <button className="hover:text-foreground transition-colors p-0.5" aria-label="More options">
                          <DotsThreeIcon size={14} weight="bold" />
                        </button>
                      </div>

                      {msg.timestamp && (
                        <span className="flex items-center gap-1 ml-auto">
                          <ClockIcon size={14} />
                          {msg.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Out of Credits card — shown after 6th message */}
            {messages.length >= 6 && (
              <Card className="mx-auto max-w-sm">
                <CardHeader>
                  <CardTitle>Out of Credits</CardTitle>
                  <CardDescription>
                    v0 stopped because you are out of credits. Please add more credits to continue.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full rounded-none"
                    onClick={() => setShowCreditsModal(true)}
                  >
                    Buy Credits
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Top fade */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-16 z-10"
        style={{ background: "linear-gradient(to bottom, var(--background), transparent)" }}
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 z-10"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
      />

      {showScrollDown && messages.length > 0 && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full border bg-background shadow-md flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Scroll to bottom"
        >
          <ArrowDownIcon size={16} weight="bold" />
        </button>
      )}
      </div>

      {/* Composer */}
      <div className="shrink-0">
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
          <div className="mx-3 mb-3">
          {activeSurvey ? (
            <ResponseListCard
              question={activeSurvey.question}
              options={activeSurvey.options}
              page={activeSurvey.page}
              total={activeSurvey.total}
              onDismiss={() => setActiveSurvey(null)}
              onSubmit={(selectedLabels) => {
                const userMsg: ChatMessage = {
                  id: crypto.randomUUID(),
                  role: "user",
                  text: selectedLabels.join(", "),
                  attachments: [],
                }
                setMessages((prev) => [...prev, userMsg])
                setActiveSurvey(null)
              }}
            />
          ) : (
            <div className="border rounded-md">
            {/* Dismissible gray banner */}
            {showQuotaBanner && (
              <div className="flex items-center gap-3 rounded-none border-0 bg-muted px-3 py-1 text-xs text-muted-foreground">
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

            <div className="px-4 py-4">
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
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
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
                <Button className="rounded-none h-8 text-xs">
                  ⊞ Image
                </Button>
                <Button
                  className={cn(
                    "rounded-none h-8 px-3",
                    isRecording && "border border-red-500 bg-white hover:bg-gray-50 text-red-500"
                  )}
                  onClick={() => {
                    if (isRecording) {
                      setIsRecording(false)
                    } else {
                      handleSend()
                    }
                  }}
                  aria-label={isRecording ? "Stop" : "Send"}
                >
                  {isRecording ? (
                    <>
                      <StopIcon size={16} weight="bold" />
                      <span className="text-xs font-medium">Stop</span>
                    </>
                  ) : (
                    "↑"
                  )}
                </Button>
              </div>
            </div>
            </div>
            </div>
          )}
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

      {/* Buy Credits modal */}
      <AlertDialog open={showCreditsModal} onOpenChange={setShowCreditsModal}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-lg font-semibold">
              Buy More Credits
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Buying purchased credits allows you to pay for v0 usage beyond your
              included credit limit.{" "}
              <span className="font-semibold text-foreground">
                Additional credits expire 1 year after purchase.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            {isCustomCredits ? (
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold tracking-tight">$</span>
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    inputMode="decimal"
                    value={customValue}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      const val = e.target.value
                      if (/^\d*\.?\d{0,2}$/.test(val)) {
                        setCustomValue(val)
                        const num = parseFloat(val)
                        setSelectedCredits(!isNaN(num) && num > 0 ? num : 0)
                      }
                    }}
                    className="text-4xl font-bold tracking-tight bg-transparent text-left outline-none w-40"
                  />
                  {!customValue && (
                    <div className="pointer-events-none absolute inset-0 flex items-baseline text-4xl font-bold tracking-tight text-muted-foreground/40">
                      0.00
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-4xl font-bold tracking-tight">
                US${selectedCredits}.00
              </div>
            )}

            <div className="flex justify-center gap-2">
              {[30, 60, 100, 250, 500].map((amount) => (
                <Button
                  key={amount}
                  variant={!isCustomCredits && selectedCredits === amount ? "default" : "outline"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => {
                    setIsCustomCredits(false)
                    setSelectedCredits(amount)
                  }}
                >
                  ${amount}
                </Button>
              ))}
              <Button
                variant={isCustomCredits ? "default" : "outline"}
                size="sm"
                className="rounded-none"
                onClick={() => {
                  setIsCustomCredits(true)
                  setCustomValue(`${selectedCredits}.00`)
                }}
              >
                Custom
              </Button>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue to Payment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
