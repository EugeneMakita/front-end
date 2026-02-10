"use client"

import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import LinkExtension from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import { Table } from "@tiptap/extension-table"
import { TableRow } from "@tiptap/extension-table-row"
import { TableHeader } from "@tiptap/extension-table-header"
import { TableCell } from "@tiptap/extension-table-cell"
import { Mark, mergeAttributes } from "@tiptap/core"
import { cn } from "@/lib/utils"
import { mockParticipants } from "@/lib/mock-participants"
import {
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  LinkIcon,
  ImageIcon,
  AtIcon,
  TableIcon,
  CodeIcon,
  InfoIcon,
  CaretDownIcon,
} from "@phosphor-icons/react"

const MentionMark = Mark.create({
  name: "mentionHighlight",
  parseHTML() {
    return [{ tag: "span[data-mention]" }]
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { "data-mention": "", class: "mention-highlight" }), 0]
  },
})

function ToolbarButton({
  active,
  onClick,
  children,
  label,
  disabled,
}: {
  active?: boolean
  onClick: () => void
  children: React.ReactNode
  label: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded text-gray-600 dark:text-gray-400 transition-colors hover:bg-accent hover:text-gray-900 dark:hover:text-gray-100",
        active && "bg-accent text-gray-900 dark:text-gray-100",
        disabled && "opacity-40 pointer-events-none"
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
  return <div className="mx-1 h-5 w-px bg-border" />
}

export default function ForumReplyEditor({
  placeholder = "Write your reply...",
  onContentChange,
  onHtmlChange,
}: {
  placeholder?: string
  onContentChange?: (isEmpty: boolean) => void
  onHtmlChange?: (html: string) => void
}) {
  const [showLinkInput, setShowLinkInput] = React.useState(false)
  const [linkUrl, setLinkUrl] = React.useState("")
  const linkInputRef = React.useRef<HTMLInputElement>(null)
  const [showMentionMenu, setShowMentionMenu] = React.useState(false)
  const mentionRef = React.useRef<HTMLDivElement>(null)
  const [mentionSearch, setMentionSearch] = React.useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      Image,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      MentionMark,
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "forum-reply-editor-content",
      },
    },
    onUpdate: ({ editor: e }) => {
      onContentChange?.(e.isEmpty)
      onHtmlChange?.(e.getHTML())
    },
  })

  React.useEffect(() => {
    if (showLinkInput && linkInputRef.current) {
      linkInputRef.current.focus()
    }
  }, [showLinkInput])

  // Close mention menu on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (mentionRef.current && !mentionRef.current.contains(e.target as Node)) {
        setShowMentionMenu(false)
      }
    }
    if (showMentionMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMentionMenu])

  function handleLinkSubmit() {
    if (!editor) return
    if (linkUrl.trim()) {
      const url = linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`
      editor.chain().focus().setLink({ href: url }).run()
    } else {
      editor.chain().focus().unsetLink().run()
    }
    setShowLinkInput(false)
    setLinkUrl("")
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    const url = URL.createObjectURL(file)
    editor.chain().focus().setImage({ src: url, alt: file.name }).run()
    e.target.value = ""
  }

  function handleMentionSelect(name: string) {
    if (!editor) return
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "text",
          text: `@${name}`,
          marks: [{ type: "mentionHighlight" }],
        },
        { type: "text", text: " " },
      ])
      .run()
    setShowMentionMenu(false)
    setMentionSearch("")
  }

  function getCurrentBlockLabel() {
    if (!editor) return "Normal text"
    if (editor.isActive("heading", { level: 1 })) return "Heading 1"
    if (editor.isActive("heading", { level: 2 })) return "Heading 2"
    if (editor.isActive("heading", { level: 3 })) return "Heading 3"
    if (editor.isActive("codeBlock")) return "Code block"
    if (editor.isActive("blockquote")) return "Quote"
    return "Normal text"
  }

  const [showBlockMenu, setShowBlockMenu] = React.useState(false)
  const blockMenuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (blockMenuRef.current && !blockMenuRef.current.contains(e.target as Node)) {
        setShowBlockMenu(false)
      }
    }
    if (showBlockMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showBlockMenu])

  if (!editor) return null

  const blockOptions = [
    { label: "Normal text", action: () => editor.chain().focus().setParagraph().run() },
    { label: "Heading 1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: "Heading 2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "Heading 3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "Code block", action: () => editor.chain().focus().toggleCodeBlock().run() },
    { label: "Quote", action: () => editor.chain().focus().toggleBlockquote().run() },
  ]

  const filteredParticipants = mockParticipants.filter((p) => {
    const full = `${p.firstName} ${p.lastName}`.toLowerCase()
    return full.includes(mentionSearch.toLowerCase())
  })

  return (
    <div className="forum-reply-editor border rounded-lg overflow-hidden bg-background text-gray-900 dark:text-gray-100 transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/30">
      {/* Hidden file input for images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelect}
      />

      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b bg-muted/30">
        {/* Block type dropdown */}
        <div className="relative" ref={blockMenuRef}>
          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded px-2 text-xs font-medium text-gray-600 dark:text-gray-400 transition-colors hover:bg-accent hover:text-gray-900 dark:hover:text-gray-100"
            onMouseDown={(e) => {
              e.preventDefault()
              setShowBlockMenu(!showBlockMenu)
            }}
          >
            {getCurrentBlockLabel()}
            <CaretDownIcon size={12} />
          </button>
          {showBlockMenu && (
            <div className="absolute left-0 top-full z-10 mt-1 w-36 rounded-md border bg-popover py-1 shadow-md">
              {blockOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  className={cn(
                    "flex w-full items-center px-3 py-1.5 text-xs hover:bg-accent transition-colors",
                    getCurrentBlockLabel() === opt.label && "font-semibold text-primary"
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    opt.action()
                    setShowBlockMenu(false)
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Divider />

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
          <TextItalicIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <TextStrikethroughIcon size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListBulletsIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Ordered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListNumbersIcon size={16} />
        </ToolbarButton>

        <Divider />

        {showLinkInput ? (
          <div className="flex items-center gap-1">
            <input
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
              className="h-7 w-40 rounded border bg-background px-2 text-xs outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="button"
              className="h-7 rounded bg-primary px-2 text-xs text-primary-foreground hover:bg-primary/90"
              onMouseDown={(e) => {
                e.preventDefault()
                handleLinkSubmit()
              }}
            >
              Apply
            </button>
          </div>
        ) : (
          <>
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
              <LinkIcon size={16} />
            </ToolbarButton>
            <ToolbarButton
              label="Image"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={16} />
            </ToolbarButton>

            {/* @ Mention */}
            <div className="relative" ref={mentionRef}>
              <ToolbarButton
                label="Mention"
                onClick={() => setShowMentionMenu(!showMentionMenu)}
              >
                <AtIcon size={16} />
              </ToolbarButton>
              {showMentionMenu && (
                <div className="absolute left-0 top-full z-10 mt-1 w-52 rounded-md border bg-popover shadow-md">
                  <div className="p-1.5 border-b">
                    <input
                      value={mentionSearch}
                      onChange={(e) => setMentionSearch(e.target.value)}
                      placeholder="Search people…"
                      className="w-full rounded border bg-background px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-ring"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto py-1">
                    {filteredParticipants.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs hover:bg-accent transition-colors"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          handleMentionSelect(`${p.firstName} ${p.lastName}`)
                        }}
                      >
                        <span className="font-medium">{p.firstName} {p.lastName}</span>
                        <span className="text-muted-foreground capitalize">{p.role}</span>
                      </button>
                    ))}
                    {filteredParticipants.length === 0 && (
                      <p className="px-3 py-2 text-xs text-muted-foreground">No results</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <ToolbarButton
              label="Table"
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            >
              <TableIcon size={16} />
            </ToolbarButton>
            <ToolbarButton
              label="Code"
              active={editor.isActive("codeBlock")}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <CodeIcon size={16} weight="bold" />
            </ToolbarButton>
            <ToolbarButton
              label="Info"
              active={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <InfoIcon size={16} />
            </ToolbarButton>
          </>
        )}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
