"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { initialItems } from "@/lib/mock-library"
import { CopyIcon, TrashIcon } from "@phosphor-icons/react"

export default function LibraryItemSettingsPage() {
  const params = useParams()
  const itemId = params.id as string
  const item = initialItems.find((entry) => entry.id === itemId)

  const [title, setTitle] = React.useState(item?.title ?? "")
  const [description, setDescription] = React.useState(item?.description ?? "")
  const [visibility, setVisibility] = React.useState("course")
  const [allowReuse, setAllowReuse] = React.useState(true)
  const [allowPublicAccess, setAllowPublicAccess] = React.useState(false)

  const publicUrl = `http://localhost:8000/documents/${itemId}/file`

  async function copyPublicUrl() {
    try {
      await navigator.clipboard.writeText(publicUrl)
    } catch {
      // no-op fallback for unsupported clipboard environments
    }
  }

  return (
    <div className="space-y-6 max-w-2xl text-foreground">
      <p className="text-sm text-muted-foreground">
        Configure this library item and question behavior.
      </p>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="library-item-title" className="text-foreground">Title</Label>
          <Input
            id="library-item-title"
            className="text-foreground"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="library-item-description" className="text-foreground">Description</Label>
          <Textarea
            id="library-item-description"
            className="text-foreground"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-foreground">Visibility</Label>
          <Select value={visibility} onValueChange={setVisibility}>
            <SelectTrigger className="max-w-[260px] text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="course">Course only</SelectItem>
              <SelectItem value="organization">Organization</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-sm font-medium">Allow question reuse</p>
              <p className="text-xs text-muted-foreground">Let other lessons reuse this question set</p>
            </div>
            <Switch checked={allowReuse} onCheckedChange={setAllowReuse} />
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <h3 className="text-sm font-semibold">Public access</h3>
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-sm font-medium">Allow public URL access</p>
              <p className="text-xs text-muted-foreground">Anyone with the link can view this document</p>
            </div>
            <Switch checked={allowPublicAccess} onCheckedChange={setAllowPublicAccess} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="library-item-public-url" className="text-foreground">Public URL</Label>
            <div className="flex items-center gap-2">
              <Input
                id="library-item-public-url"
                className="text-foreground"
                value={publicUrl}
                readOnly
                disabled={!allowPublicAccess}
              />
              <Button
                type="button"
                variant="outline"
                onClick={copyPublicUrl}
                disabled={!allowPublicAccess}
              >
                <CopyIcon size={14} />
                Copy
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <h3 className="text-sm font-semibold text-destructive">Danger zone</h3>
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete document</p>
              <p className="text-xs text-muted-foreground">
                Permanently remove this document and all of its question references.
              </p>
            </div>
            <Button type="button" variant="destructive">
              <TrashIcon size={14} />
              Delete document
            </Button>
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <h3 className="text-sm font-semibold">Operations</h3>
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-sm font-medium">Rerun pipeline</p>
              <p className="text-xs text-muted-foreground">
                Reprocess this document and refresh generated outputs.
              </p>
            </div>
            <Button type="button" variant="outline">
              Rerun pipeline
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button>Save changes</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  )
}
