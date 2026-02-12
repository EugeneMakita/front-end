"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  SquaresFourIcon,
  ListBulletsIcon,
  ClockIcon,
  StarIcon,
} from "@phosphor-icons/react"
import { mockCourses } from "@/lib/mock-courses"

const categoryColors: Record<string, string> = {
  course: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  project: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  resource: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

export default function CoursesPage() {
  const router = useRouter()
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "course" | "project" | "resource">("all")
  const [view, setView] = React.useState<"grid" | "list">("grid")

  const filtered = mockCourses.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || item.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Courses</h1>
        <p className="text-muted-foreground">
          Browse and manage your courses, projects, and resources.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <MagnifyingGlassIcon
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            className="h-10 pl-9"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1">
          <FunnelIcon size={18} className="text-muted-foreground mr-1" />
          {(["all", "course", "project", "resource"] as const).map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              className="rounded-none capitalize"
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <SquaresFourIcon size={18} />
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <ListBulletsIcon size={18} />
          </Button>
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No items found</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border bg-card p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/courses/${item.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <Badge className={`rounded-none text-xs ${categoryColors[item.category]}`}>
                  {item.category}
                </Badge>
                <StarIcon
                  size={18}
                  weight={item.starred ? "fill" : "regular"}
                  className={item.starred ? "text-yellow-500" : "text-muted-foreground"}
                />
              </div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {item.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.progress}% complete</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon size={12} />
                    {item.updatedAt}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border bg-card p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/courses/${item.id}`)}
            >
              <StarIcon
                size={18}
                weight={item.starred ? "fill" : "regular"}
                className={`shrink-0 ${item.starred ? "text-yellow-500" : "text-muted-foreground"}`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <Badge className={`rounded-none text-xs shrink-0 ${categoryColors[item.category]}`}>
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {item.description}
                </p>
              </div>
              <div className="shrink-0 w-32">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{item.progress}%</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon size={12} />
                    {item.updatedAt}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
