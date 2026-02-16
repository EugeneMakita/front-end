"use client"

import * as React from "react"
import type { Editor } from "@tiptap/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextHOneIcon,
  TextHTwoIcon,
  TextHThreeIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  ListChecksIcon,
  CodeBlockIcon,
  LinkIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react"

function ToolbarButton({
  active,
  onClick,
  children,
  label,
}: {
  active?: boolean
  onClick: () => void
  children: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-7 w-7 items-center justify-center transition-colors hover:bg-accent",
        active && "bg-accent text-accent-foreground"
      )}
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="mx-0.5 h-5 w-px bg-border" />
}

export default function NotesFloatingToolbar({ editor }: { editor: Editor }) {
  const [showLinkInput, setShowLinkInput] = React.useState(false)
  const [linkUrl, setLinkUrl] = React.useState("")
  const linkInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (showLinkInput && linkInputRef.current) {
      linkInputRef.current.focus()
    }
  }, [showLinkInput])

  function handleLinkSubmit() {
    if (linkUrl.trim()) {
      const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`
      editor.chain().focus().setLink({ href: url }).run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
    setShowLinkInput(false)
    setLinkUrl("")
  }

  if (showLinkInput) {
    return (
      <div className="flex items-center gap-1 border bg-popover p-1 shadow-md">
        <Input
          ref={linkInputRef}
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleLinkSubmit()
            }
            if (e.key === "Escape") {
              setShowLinkInput(false)
              setLinkUrl("")
              editor.chain().focus().run()
            }
          }}
          placeholder="Enter URL…"
          className="h-7 w-48 text-xs"
        />
        <Button
          size="sm"
          className="h-7 px-2 text-xs"
          onMouseDown={(e) => {
            e.preventDefault()
            handleLinkSubmit()
          }}
        >
          Apply
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center border bg-popover p-0.5 shadow-md">
      {/* Text formatting */}
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <TextBIcon size={16} weight="bold" />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <TextItalicIcon size={16} weight="fill" />
      </ToolbarButton>

      <Divider />

      {/* Headings */}
      <ToolbarButton
        label="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <TextHOneIcon size={16} weight="fill" />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <TextHTwoIcon size={16} weight="fill" />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <TextHThreeIcon size={16} weight="fill" />
      </ToolbarButton>

      <Divider />

      {/* Lists */}
      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListBulletsIcon size={16} weight="fill" />
      </ToolbarButton>
      <ToolbarButton
        label="Ordered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListNumbersIcon size={16} weight="fill" />
      </ToolbarButton>
      <ToolbarButton
        label="Task list"
        active={editor.isActive("taskList")}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      >
        <ListChecksIcon size={16} weight="fill" />
      </ToolbarButton>

      <Divider />

      {/* Block / inline */}
      <ToolbarButton
        label="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <CodeBlockIcon size={16} weight="fill" />
      </ToolbarButton>
      <ToolbarButton
        label="Link"
        active={editor.isActive("link")}
        onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run()
          } else {
            const existingHref = editor.getAttributes("link").href
            setLinkUrl(existingHref || "")
            setShowLinkInput(true)
          }
        }}
      >
        <LinkIcon size={16} weight="fill" />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <TextStrikethroughIcon size={16} weight="fill" />
      </ToolbarButton>

      <Divider />

      <ToolbarButton label="More" onClick={() => {}}>
        <DotsThreeIcon size={16} weight="fill" />
      </ToolbarButton>
    </div>
  )
}
