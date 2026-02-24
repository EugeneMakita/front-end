"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  SparkleIcon,
  BooksIcon,
  PathIcon,
  UsersThreeIcon,
  NotePencilIcon,
  FolderOpenIcon,
  ChartBarIcon,
  PenNibIcon,
  GridFourIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react"

type NavKey =
  | "quickCreate"
  | "inbox"
  | "library"
  | "courses"
  | "classes"
  | "assignments"
  | "analytics"
  | "projects"
  | "team"
  | "dataLibrary"
  | "reports"
  | "wordAssistant"
  | "more"
  | "settings"
  | "help"

type NavItem = {
  key: NavKey
  label: string
  icon: React.ReactNode
  accent?: boolean
  muted?: boolean
}

function NavRow({
  item,
  collapsed = false,
  active = false,
  onClick,
}: {
  item: NavItem
  collapsed?: boolean
  active?: boolean
  onClick?: () => void
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      className={cn(
        "h-10 w-full text-sm font-medium",
        "bg-transparent hover:bg-sidebar-accent",
        // Active style: sidebar primary background
        active ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/95" : "",
        // Non-active accent/muted coloring
        !active && item.accent && "text-sidebar-primary hover:text-sidebar-primary",
        !active && item.muted && "text-sidebar-foreground/60 hover:text-sidebar-foreground",
        // collapsed uses centered layout
        collapsed && "justify-center px-0",
        !collapsed && "justify-start"
      )}
    >
      <div className={cn("flex items-center gap-3 w-full", collapsed ? "justify-center px-0" : "px-4")}>
        <span
          className={cn(
            "shrink-0 text-lg",
            active
              ? "text-sidebar-primary-foreground"
              : item.accent
              ? "text-sidebar-primary"
              : item.muted
              ? "text-sidebar-foreground/60"
              : "text-sidebar-foreground"
          )}
        >
          {item.icon}
        </span>
        {!collapsed && (
          <span className={cn("truncate", active && "text-sidebar-primary-foreground")}>{item.label}</span>
        )}
      </div>
    </Button>
  )
}
 

export default function Sidebar({
  collapsed = false,
  activeKey = "quickCreate",
  onSelect,
  onToggleCollapse,
}: {
  collapsed?: boolean
  activeKey?: NavKey
  onSelect?: (key: NavKey) => void
  onToggleCollapse?: () => void
}) {
  const top: NavItem[] = [
    { key: "quickCreate", label: "Quick Create", icon: <SparkleIcon size={22} weight="fill" /> },
    { key: "library", label: "Library", icon: <BooksIcon size={22} weight="fill" /> },
    { key: "courses", label: "Courses", icon: <PathIcon size={22} weight="fill" /> },
    { key: "classes", label: "Classes", icon: <UsersThreeIcon size={22} weight="fill" /> },
    { key: "assignments", label: "Assignments", icon: <NotePencilIcon size={22} weight="fill" /> },
  ]

  const documents: NavItem[] = [
    { key: "dataLibrary", label: "Data Library", icon: <FolderOpenIcon size={22} weight="fill" />, accent: true },
    { key: "reports", label: "Reports", icon: <ChartBarIcon size={22} weight="fill" />, accent: true },
    { key: "wordAssistant", label: "Word Assistant", icon: <PenNibIcon size={22} weight="fill" />, accent: true },
    { key: "more", label: "More", icon: <GridFourIcon size={22} weight="fill" />, muted: true },
  ]

  const bottom: NavItem[] = []

  return (
    <aside
      className={cn(
        "relative border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out",
        "h-full",
        collapsed ? "w-[56px]" : "w-[220px]"
      )}
    >
      {/* Toggle button */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:text-foreground transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <CaretRightIcon size={12} weight="bold" /> : <CaretLeftIcon size={12} weight="bold" />}
      </button>
      <div className="flex flex-col h-full overflow-hidden">
        <ScrollArea className="flex-1">
          <div className={cn("px-0 py-4", collapsed && "px-0")}>
            <div className="space-y-1">
              {top.map((item) => (
                <NavRow
                  key={item.key}
                  item={item}
                  collapsed={collapsed}
                  active={activeKey === item.key}
                  onClick={() => onSelect?.(item.key)}
                />
              ))}
            </div>

            {!collapsed && (
              <div className="mt-10 px-3 text-xs font-semibold text-sidebar-foreground/50">
                Your chats
              </div>
            )}

            {!collapsed && (
              <div className="mt-4 space-y-1">
                {documents.map((item) => (
                  <NavRow
                    key={item.key}
                    item={item}
                    collapsed={collapsed}
                    active={activeKey === item.key}
                    onClick={() => onSelect?.(item.key)}
                  />
                ))}
              </div>
            )}

            <div className="mt-6 space-y-1">
              {bottom.map((item) => (
                <NavRow
                  key={item.key}
                  item={item}
                  collapsed={collapsed}
                  active={activeKey === item.key}
                  onClick={() => onSelect?.(item.key)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Bottom-left footer: Terms & Privacy */}
        <div className="px-4 py-3">
          {!collapsed ? (
            <a
              href="/terms"
              className="text-xs font-medium text-sidebar-primary hover:underline"
            >
              Terms & Privacy
            </a>
          ) : (
            <a href="/terms" className="block w-full text-center text-sidebar-primary" aria-label="Terms and Privacy">
              {/* show small dot when collapsed to indicate presence */}
              <span className="inline-block h-2 w-2 rounded-full bg-sidebar-primary" />
            </a>
          )}
        </div>
      </div>
    </aside>
  )
}

export type { NavKey }
