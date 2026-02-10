"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, EyeIcon, PencilSimpleIcon } from "@phosphor-icons/react"
import ForumReplyEditor from "@/components/forum-reply-editor"

export default function NewThreadPage() {
  const params = useParams()
  const courseId = params.id as string

  const [title, setTitle] = React.useState("")
  const [isEmpty, setIsEmpty] = React.useState(true)
  const [html, setHtml] = React.useState("")
  const [previewing, setPreviewing] = React.useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          New Thread
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs gap-1"
          onClick={() => setPreviewing(!previewing)}
          disabled={isEmpty}
        >
          {previewing ? (
            <>
              <PencilSimpleIcon size={12} />
              Edit
            </>
          ) : (
            <>
              <EyeIcon size={12} />
              Preview
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Start a new discussion in this forum
      </p>

      {/* Separator */}
      <div className="border-t border-primary/30 mb-5" />

      {previewing ? (
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            {title || "Untitled Thread"}
          </h2>
          <div
            className="wiki-content text-sm leading-relaxed text-gray-900 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="border-t mt-6 pt-4">
            <div className="flex items-center gap-2">
              <Button size="sm" disabled={!title.trim() || isEmpty}>
                <PlusIcon size={14} />
                Create Thread
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewing(false)}
              >
                Back to editing
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Input
              className="text-gray-900 dark:text-gray-100"
              placeholder="Thread title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <ForumReplyEditor
              placeholder="Write your thread content..."
              onContentChange={(empty) => setIsEmpty(empty)}
              onHtmlChange={(h) => setHtml(h)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" disabled={!title.trim() || isEmpty}>
              <PlusIcon size={14} />
              Create Thread
            </Button>
            <Link href={`/courses/${courseId}/forum`}>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
