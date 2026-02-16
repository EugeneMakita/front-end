"use client"

import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import { NodeSelection } from "@tiptap/pm/state"
import { CellSelection } from "@tiptap/pm/tables"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  RowsPlusTopIcon,
  RowsPlusBottomIcon,
  ColumnsPlusLeftIcon,
  ColumnsPlusRightIcon,
  TrashIcon,
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
        "flex h-7 w-7 items-center justify-center rounded text-gray-600 dark:text-gray-400 transition-colors hover:bg-accent hover:text-gray-900 dark:hover:text-gray-100",
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
  const tableContextMenuRef = React.useRef<HTMLDivElement>(null)
  const [showTableContextMenu, setShowTableContextMenu] = React.useState(false)
  const [tableContextMenuPos, setTableContextMenuPos] = React.useState({ x: 0, y: 0 })

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      Image,
      Table.configure({
        resizable: true,
        handleWidth: 4,
        cellMinWidth: 40,
        allowTableNodeSelection: true,
      }),
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
        "data-placeholder": placeholder,
      },
      handleDOMEvents: {
        contextmenu: (view, event) => {
          if (!(event instanceof MouseEvent)) return false
          const target = event.target as HTMLElement | null
          if (!target) return false

          const cell = target.closest("td, th")
          const table = target.closest("table")

          if (!table) {
            setShowTableContextMenu(false)
            return false
          }

          event.preventDefault()
          event.stopPropagation()

          const findCellPosFromResolved = (startPos: number) => {
            const resolved = view.state.doc.resolve(startPos)
            for (let depth = resolved.depth; depth > 0; depth -= 1) {
              const nodeAtDepth = resolved.node(depth)
              if (nodeAtDepth.type.name === "tableCell" || nodeAtDepth.type.name === "tableHeader") {
                return resolved.before(depth)
              }
            }
            return null
          }

          if (cell) {
            const pos = view.posAtDOM(cell, 0)
            const safeCellPos = findCellPosFromResolved(pos)
            if (safeCellPos !== null) {
              const tr = view.state.tr.setSelection(CellSelection.create(view.state.doc, safeCellPos))
              view.dispatch(tr)
            }
          } else {
            const pos = view.posAtDOM(table, 0)
            const tr = view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos))
            view.dispatch(tr)
          }

          setTableContextMenuPos({ x: event.clientX, y: event.clientY })
          setShowTableContextMenu(true)
          return true
        },
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

  React.useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (tableContextMenuRef.current && !tableContextMenuRef.current.contains(e.target as Node)) {
        setShowTableContextMenu(false)
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowTableContextMenu(false)
      }
    }

    if (showTableContextMenu) {
      document.addEventListener("mousedown", handleOutsideClick)
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick)
        document.removeEventListener("keydown", handleEscape)
      }
    }
  }, [showTableContextMenu])

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

  const [showTableMenu, setShowTableMenu] = React.useState(false)
  const [hoveredRows, setHoveredRows] = React.useState(0)
  const [hoveredCols, setHoveredCols] = React.useState(0)
  const [tableRows, setTableRows] = React.useState("3")
  const [tableCols, setTableCols] = React.useState("3")

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
  const tableActive = editor.isActive("table")
  const contextMenuX =
    typeof window === "undefined" ? tableContextMenuPos.x : Math.max(8, Math.min(tableContextMenuPos.x, window.innerWidth - 248))
  const contextMenuY =
    typeof window === "undefined" ? tableContextMenuPos.y : Math.max(8, Math.min(tableContextMenuPos.y, window.innerHeight - 320))

  function parseTableDimension(value: string, fallback: number) {
    const parsed = Number.parseInt(value, 10)
    if (Number.isNaN(parsed)) return fallback
    return Math.min(20, Math.max(1, parsed))
  }

  function insertTable(rows: number, cols: number) {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
    setShowTableMenu(false)
  }

  return (
    <div className="forum-reply-editor border rounded-lg bg-background text-gray-900 dark:text-gray-100 transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/30">
      {/* Hidden file input for images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageSelect}
      />

      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-1.5 py-0.5 border-b">
        {/* Block type dropdown */}
        <div className="relative" ref={blockMenuRef}>
          <button
            type="button"
            className="flex h-7 items-center gap-1 rounded px-2 text-[11px] font-medium text-gray-600 dark:text-gray-400 transition-colors hover:bg-accent hover:text-gray-900 dark:hover:text-gray-100"
            onMouseDown={(e) => {
              e.preventDefault()
              setShowBlockMenu(!showBlockMenu)
            }}
          >
            {getCurrentBlockLabel()}
            <CaretDownIcon size={10} weight="fill" />
          </button>
          {showBlockMenu && (
            <div className="absolute left-0 top-full z-10 mt-1 w-36 rounded-md border bg-popover py-1 shadow-md">
              {blockOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  className={cn(
                    "flex w-full items-center px-3 py-1.5 text-[11px] hover:bg-accent transition-colors",
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
          <TextItalicIcon size={16} weight="fill" />
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <TextStrikethroughIcon size={16} weight="fill" />
        </ToolbarButton>

        <Divider />

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
              <LinkIcon size={16} weight="fill" />
            </ToolbarButton>
            <ToolbarButton
              label="Image"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={16} weight="fill" />
            </ToolbarButton>

            {/* @ Mention */}
            <div className="relative" ref={mentionRef}>
              <ToolbarButton
                label="Mention"
                onClick={() => setShowMentionMenu(!showMentionMenu)}
              >
                <AtIcon size={16} weight="fill" />
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

            <DropdownMenu open={showTableMenu} onOpenChange={setShowTableMenu}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Table"
                  aria-pressed={showTableMenu}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded text-gray-600 dark:text-gray-400 transition-colors hover:bg-accent hover:text-gray-900 dark:hover:text-gray-100",
                    showTableMenu && "bg-accent text-gray-900 dark:text-gray-100"
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    setHoveredRows(0)
                    setHoveredCols(0)
                  }}
                >
                  <TableIcon size={16} weight="fill" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[320px] p-0" align="start">
                <div className="space-y-2 p-2">
                  <p className="text-xs font-medium">Insert table</p>
                  <div className="grid gap-[4px]" style={{ gridTemplateColumns: "repeat(8, 22px)" }}>
                    {Array.from({ length: 8 }, (_, row) =>
                      Array.from({ length: 8 }, (_, col) => {
                        const isHighlighted = row < hoveredRows && col < hoveredCols
                        return (
                          <button
                            key={`${row}-${col}`}
                            type="button"
                            className={cn(
                              "h-[22px] w-[22px] rounded-[2px] border transition-colors",
                              isHighlighted
                                ? "border-primary/50 bg-primary/25"
                                : "border-border bg-muted/40 hover:border-primary/30"
                            )}
                            onMouseEnter={() => {
                              setHoveredRows(row + 1)
                              setHoveredCols(col + 1)
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              insertTable(row + 1, col + 1)
                            }}
                          />
                        )
                      })
                    )}
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    {hoveredRows > 0 && hoveredCols > 0 ? `${hoveredCols} x ${hoveredRows}` : "Hover to pick table size"}
                  </p>
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      value={tableRows}
                      onChange={(e) => setTableRows(e.target.value)}
                      placeholder="Rows"
                    />
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      value={tableCols}
                      onChange={(e) => setTableCols(e.target.value)}
                      placeholder="Cols"
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 rounded-none px-3 text-xs"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        insertTable(parseTableDimension(tableRows, 3), parseTableDimension(tableCols, 3))
                      }}
                    >
                      Insert
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <InfoIcon size={16} weight="fill" />
            </ToolbarButton>
          </>
        )}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
      {showTableContextMenu && tableActive && (
        <div
          ref={tableContextMenuRef}
          className="fixed z-50 min-w-[220px] rounded-none border border-border bg-popover p-1 shadow-md"
          style={{ left: contextMenuX, top: contextMenuY }}
        >
          <button
            type="button"
            disabled={!editor.can().chain().focus().addRowBefore().run()}
            className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-accent disabled:opacity-40"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().addRowBefore().run()
              setShowTableContextMenu(false)
            }}
          >
            <RowsPlusTopIcon size={16} weight="fill" />
            Insert row above
          </button>
          <button
            type="button"
            disabled={!editor.can().chain().focus().addRowAfter().run()}
            className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-accent disabled:opacity-40"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().addRowAfter().run()
              setShowTableContextMenu(false)
            }}
          >
            <RowsPlusBottomIcon size={16} weight="fill" />
            Insert row below
          </button>
          <button
            type="button"
            disabled={!editor.can().chain().focus().deleteRow().run()}
            className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-accent disabled:opacity-40"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().deleteRow().run()
              setShowTableContextMenu(false)
            }}
          >
            <TrashIcon size={16} weight="fill" />
            Delete row
          </button>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            disabled={!editor.can().chain().focus().addColumnBefore().run()}
            className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-accent disabled:opacity-40"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().addColumnBefore().run()
              setShowTableContextMenu(false)
            }}
          >
            <ColumnsPlusLeftIcon size={16} weight="fill" />
            Insert column left
          </button>
          <button
            type="button"
            disabled={!editor.can().chain().focus().addColumnAfter().run()}
            className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-accent disabled:opacity-40"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().addColumnAfter().run()
              setShowTableContextMenu(false)
            }}
          >
            <ColumnsPlusRightIcon size={16} weight="fill" />
            Insert column right
          </button>
          <button
            type="button"
            disabled={!editor.can().chain().focus().deleteColumn().run()}
            className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-accent disabled:opacity-40"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().deleteColumn().run()
              setShowTableContextMenu(false)
            }}
          >
            <TrashIcon size={16} weight="fill" />
            Delete column
          </button>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            disabled={!editor.can().chain().focus().deleteTable().run()}
            className="flex w-full items-center gap-2 px-2 py-2 text-left text-xs text-destructive hover:bg-destructive/10 disabled:opacity-40"
            onMouseDown={(e) => {
              e.preventDefault()
              editor.chain().focus().deleteTable().run()
              setShowTableContextMenu(false)
            }}
          >
            <TrashIcon size={16} weight="fill" />
            Delete table
          </button>
        </div>
      )}
    </div>
  )
}
