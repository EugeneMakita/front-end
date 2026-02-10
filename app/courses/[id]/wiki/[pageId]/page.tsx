"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  PencilSimpleIcon,
  PlusIcon,
  FileTextIcon,
} from "@phosphor-icons/react"
import { mockWikiPages } from "@/lib/mock-wiki"
import ForumReplyEditor from "@/components/forum-reply-editor"

export default function WikiPageDetail() {
  const params = useParams()
  const courseId = params.id as string
  const pageId = params.pageId as string

  const [editing, setEditing] = React.useState(false)
  const [showNewPage, setShowNewPage] = React.useState(false)
  const [newPageTitle, setNewPageTitle] = React.useState("")
  const [newPageEmpty, setNewPageEmpty] = React.useState(true)

  const selectedPage = mockWikiPages.find((p) => p.id === pageId)

  if (!selectedPage) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Wiki page not found.</p>
      </div>
    )
  }

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Page title + edit button */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {selectedPage.title}
          </h1>
          {!editing && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setEditing(true)}
            >
              <PencilSimpleIcon size={12} />
              Edit
            </Button>
          )}
        </div>

        {/* Meta info */}
        <p className="text-xs text-muted-foreground mb-4">
          {selectedPage.views} views &middot; {selectedPage.edits} edits &middot; latest by{" "}
          <span className="font-medium text-foreground">{selectedPage.author}</span>{" "}
          {selectedPage.lastEdited}
        </p>

        {/* Separator */}
        <div className="border-t border-primary/30 mb-5" />

        {/* Content or editor */}
        {editing ? (
          <div className="space-y-3">
            <ForumReplyEditor
              placeholder="Edit wiki page content..."
              onContentChange={() => {}}
            />
            <div className="flex items-center gap-2">
              <Button size="sm">Save</Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="wiki-content text-sm leading-relaxed text-gray-900 dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: selectedPage.content }}
          />
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
              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs transition-colors ${
                page.id === pageId
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-accent"
              }`}
            >
              <FileTextIcon size={14} className="shrink-0" />
              {page.title}
            </Link>
          ))}
        </div>

        <div className="border-t my-3" />

        {/* New page button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1 text-xs"
          onClick={() => setShowNewPage(true)}
        >
          <PlusIcon size={14} />
          New Page
        </Button>
      </div>

      {/* New page modal */}
      <Dialog open={showNewPage} onOpenChange={setShowNewPage}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Wiki Page</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <Input
                className="text-gray-900 dark:text-gray-100"
                placeholder="Page title..."
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <ForumReplyEditor
                placeholder="Write page content..."
                onContentChange={(isEmpty) => setNewPageEmpty(isEmpty)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowNewPage(false)
                setNewPageTitle("")
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!newPageTitle.trim() || newPageEmpty}
            >
              Create Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
