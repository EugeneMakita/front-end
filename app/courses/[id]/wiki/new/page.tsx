"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, FileTextIcon, EyeIcon, PencilSimpleIcon } from "@phosphor-icons/react"
import { mockWikiPages } from "@/lib/mock-wiki"
import ForumReplyEditor from "@/components/forum-reply-editor"

export default function NewWikiPage() {
  const params = useParams()
  const courseId = params.id as string

  const [title, setTitle] = React.useState("")
  const [isEmpty, setIsEmpty] = React.useState(true)
  const [html, setHtml] = React.useState("")
  const [previewing, setPreviewing] = React.useState(false)

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            New Wiki Page
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
          Create a new page for this wiki
        </p>

        {/* Separator */}
        <div className="border-t border-primary/30 mb-5" />

        {previewing ? (
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              {title || "Untitled Page"}
            </h2>
            <div
              className="wiki-content text-sm leading-relaxed text-gray-900 dark:text-gray-100"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="border-t mt-6 pt-4">
              <div className="flex items-center gap-2">
                <Button size="sm" disabled={!title.trim() || isEmpty}>
                  <PlusIcon size={14} />
                  Create Page
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
                placeholder="Page title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <ForumReplyEditor
                placeholder="Write page content..."
                onContentChange={(empty) => setIsEmpty(empty)}
                onHtmlChange={(h) => setHtml(h)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" disabled={!title.trim() || isEmpty}>
                <PlusIcon size={14} />
                Create Page
              </Button>
              <Link href={`/courses/${courseId}/wiki`}>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="w-56 shrink-0">
        {/* Pages header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Pages</h3>
          <span className="text-xs text-muted-foreground">{mockWikiPages.length}</span>
        </div>

        <div className="border-t mb-3" />

        {/* Page list */}
        <div className="space-y-0.5">
          {mockWikiPages.map((page) => (
            <Link
              key={page.id}
              href={`/courses/${courseId}/wiki/${page.id}`}
              className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs transition-colors text-gray-700 dark:text-gray-300 hover:bg-accent"
            >
              <FileTextIcon size={14} className="shrink-0" />
              {page.title}
            </Link>
          ))}
        </div>

        <div className="border-t my-3" />

        {/* New page button - already on this page */}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1 text-xs bg-primary/10 text-primary"
          disabled
        >
          <PlusIcon size={14} />
          New Page
        </Button>
      </div>
    </div>
  )
}
