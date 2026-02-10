"use client"

import * as React from "react"
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

type CourseItem = {
  id: string
  title: string
  description: string
  category: "course" | "project" | "resource"
  progress: number
  updatedAt: string
  starred: boolean
}

const items: CourseItem[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description:
      "Learn the fundamentals of machine learning, including supervised and unsupervised learning techniques.",
    category: "course",
    progress: 75,
    updatedAt: "2 days ago",
    starred: true,
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    description:
      "Deep dive into advanced type system features, generics, and design patterns in TypeScript.",
    category: "course",
    progress: 40,
    updatedAt: "1 week ago",
    starred: false,
  },
  {
    id: "3",
    title: "Portfolio Website Redesign",
    description:
      "A complete redesign of the personal portfolio using Next.js and Tailwind CSS.",
    category: "project",
    progress: 90,
    updatedAt: "3 days ago",
    starred: true,
  },
  {
    id: "4",
    title: "Data Visualization Handbook",
    description:
      "Comprehensive guide to creating effective data visualizations with D3.js and modern charting libraries.",
    category: "resource",
    progress: 20,
    updatedAt: "2 weeks ago",
    starred: false,
  },
  {
    id: "5",
    title: "Neural Networks from Scratch",
    description:
      "Build neural networks step by step to understand backpropagation, gradient descent, and activation functions.",
    category: "course",
    progress: 60,
    updatedAt: "5 days ago",
    starred: false,
  },
  {
    id: "6",
    title: "API Design Best Practices",
    description:
      "Learn RESTful API design principles, versioning strategies, and authentication patterns.",
    category: "resource",
    progress: 100,
    updatedAt: "1 month ago",
    starred: true,
  },
]

const categoryColors: Record<string, string> = {
  course: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  project: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  resource: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

export default function CoursesPage() {
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "course" | "project" | "resource">("all")
  const [view, setView] = React.useState<"grid" | "list">("grid")

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || item.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Courses</h1>
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
