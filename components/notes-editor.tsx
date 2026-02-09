"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import NotesFloatingToolbar from "@/components/notes-floating-toolbar"

export default function NotesEditor({
  content,
  onUpdate,
  editable = true,
}: {
  content: string
  onUpdate?: (json: object) => void
  editable?: boolean
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => {
      onUpdate?.(e.getJSON())
    },
  })

  if (!editor) return null

  return (
    <div className="tiptap-editor">
      {editable && (
        <BubbleMenu editor={editor}>
          <NotesFloatingToolbar editor={editor} />
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}
