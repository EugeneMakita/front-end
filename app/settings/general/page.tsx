"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, PencilSimpleIcon } from "@phosphor-icons/react"

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=640&h=640&fit=crop"
const CROP_SIZE = 320

type Point = { x: number; y: number }
type ImageMeta = { width: number; height: number }

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Failed to load image"))
    image.src = src
  })
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function clampOffset(offset: Point, zoom: number, meta: ImageMeta | null): Point {
  if (!meta) return offset
  const baseScale = Math.max(CROP_SIZE / meta.width, CROP_SIZE / meta.height)
  const drawWidth = meta.width * baseScale * zoom
  const drawHeight = meta.height * baseScale * zoom
  const maxX = Math.max(0, (drawWidth - CROP_SIZE) / 2)
  const maxY = Math.max(0, (drawHeight - CROP_SIZE) / 2)
  return {
    x: clamp(offset.x, -maxX, maxX),
    y: clamp(offset.y, -maxY, maxY),
  }
}

export default function GeneralSettingsPage() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const dragStartRef = React.useRef<Point | null>(null)
  const startOffsetRef = React.useRef<Point>({ x: 0, y: 0 })
  const [avatarSrc, setAvatarSrc] = React.useState(DEFAULT_AVATAR)
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [editingSrc, setEditingSrc] = React.useState<string | null>(null)
  const [zoom, setZoom] = React.useState(1)
  const [offset, setOffset] = React.useState<Point>({ x: 0, y: 0 })
  const [imageMeta, setImageMeta] = React.useState<ImageMeta | null>(null)

  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    try {
      const image = await loadImage(objectUrl)
      setEditingSrc(objectUrl)
      setImageMeta({ width: image.naturalWidth || image.width, height: image.naturalHeight || image.height })
      setZoom(1)
      setOffset({ x: 0, y: 0 })
      setEditorOpen(true)
    } catch {
      URL.revokeObjectURL(objectUrl)
    } finally {
      event.target.value = ""
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragStartRef.current = { x: event.clientX, y: event.clientY }
    startOffsetRef.current = offset
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragStartRef.current) return
    const deltaX = event.clientX - dragStartRef.current.x
    const deltaY = event.clientY - dragStartRef.current.y
    const next = clampOffset(
      { x: startOffsetRef.current.x + deltaX, y: startOffsetRef.current.y + deltaY },
      zoom,
      imageMeta
    )
    setOffset(next)
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    dragStartRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  async function applyCrop() {
    if (!editingSrc || !imageMeta) {
      setEditorOpen(false)
      return
    }
    const image = await loadImage(editingSrc)
    const canvas = document.createElement("canvas")
    const outputSize = 512
    canvas.width = outputSize
    canvas.height = outputSize
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const baseScale = Math.max(CROP_SIZE / imageMeta.width, CROP_SIZE / imageMeta.height)
    const drawWidth = imageMeta.width * baseScale * zoom
    const drawHeight = imageMeta.height * baseScale * zoom
    const drawX = (CROP_SIZE - drawWidth) / 2 + offset.x
    const drawY = (CROP_SIZE - drawHeight) / 2 + offset.y

    const exportScale = outputSize / CROP_SIZE
    ctx.clearRect(0, 0, outputSize, outputSize)
    ctx.save()
    ctx.beginPath()
    ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(
      image,
      drawX * exportScale,
      drawY * exportScale,
      drawWidth * exportScale,
      drawHeight * exportScale
    )
    ctx.restore()

    const dataUrl = canvas.toDataURL("image/png")
    setAvatarSrc(dataUrl)
    setEditorOpen(false)
  }

  function closeEditor() {
    setEditorOpen(false)
  }

  React.useEffect(() => {
    return () => {
      if (editingSrc?.startsWith("blob:")) {
        URL.revokeObjectURL(editingSrc)
      }
    }
  }, [editingSrc])

  return (
    <div className="space-y-6 p-4 md:p-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="space-y-4">
        <Label className="text-sm">Profile picture</Label>
        <div className="relative inline-block">
          <Avatar className="h-52 w-52 border">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>EG</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            className="absolute bottom-2 left-2 h-10 cursor-pointer rounded-xl bg-background/95"
            onClick={() => fileInputRef.current?.click()}
          >
            <PencilSimpleIcon size={16} />
            Edit
          </Button>
        </div>
      </div>

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-w-[760px] rounded-none p-0">
          <DialogHeader className="px-4 py-3">
            <DialogTitle>Edit profile picture</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 p-4">
            <div
              className="relative mx-auto h-[360px] w-full max-w-[620px] select-none overflow-hidden border bg-muted/30"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {editingSrc && (
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${editingSrc})`,
                    transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
                    transformOrigin: "center",
                  }}
                />
              )}

              <div className="pointer-events-none absolute inset-0 bg-black/35" />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
              />
            </div>

            <div className="mx-auto flex w-full max-w-[620px] items-center gap-3">
              <MagnifyingGlassMinusIcon size={18} className="text-muted-foreground" />
              <Slider
                min={1}
                max={3}
                step={0.01}
                value={[zoom]}
                onValueChange={(values) => {
                  const nextZoom = values[0] ?? 1
                  setZoom(nextZoom)
                  setOffset((prev) => clampOffset(prev, nextZoom, imageMeta))
                }}
                className="w-full"
              />
              <MagnifyingGlassPlusIcon size={18} className="text-muted-foreground" />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <Button variant="outline" className="h-10 cursor-pointer rounded-none" onClick={closeEditor}>
                Cancel
              </Button>
              <Button className="h-10 cursor-pointer rounded-none" onClick={applyCrop}>
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold leading-none text-foreground">Profile</h4>
        <Separator />
        <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name" className="text-sm">
              First name
            </Label>
            <Input id="first-name" defaultValue="Eugene" className="h-10 rounded-none" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name" className="text-sm">
              Last name
            </Label>
            <Input id="last-name" defaultValue="Gatawa" className="h-10 rounded-none" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio" className="text-sm">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us a little about yourself"
              className="min-h-28 rounded-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold leading-none text-foreground">Company details</h4>
        <Separator />
        <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm">
              Company / school
            </Label>
            <Input id="company" placeholder="Organization name" className="h-10 rounded-none" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm">
              Location
            </Label>
            <Input id="location" placeholder="City, Country" className="h-10 rounded-none" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold leading-none text-foreground">Other details</h4>
        <Separator />
        <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              E-mail address
            </Label>
            <Input id="email" defaultValue="eugene@example.com" className="h-10 rounded-none" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm">
              Phone
            </Label>
            <Input id="phone" defaultValue="+263775682319" className="h-10 rounded-none" />
          </div>
        </div>
      </div>

      <div className="flex justify-start gap-2 pt-1">
        <Button variant="outline" className="h-10 cursor-pointer rounded-none">
          Cancel
        </Button>
        <Button className="h-10 cursor-pointer rounded-none">Save changes</Button>
      </div>
    </div>
  )
}
