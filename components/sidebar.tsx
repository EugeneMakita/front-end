"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  PlusCircle,
  SquaresFour,
  ListBullets,
  ChartBar,
  FolderSimple,
  UsersThree,
  Database,
  ClipboardText,
  FileText,
  DotsThree,
  Gear,
  Question,
} from "@phosphor-icons/react"

type NavKey =
  | "quickCreate"
  | "dashboard"
  | "lifecycle"
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
        "h-10 w-full justify-start gap-3 px-3 text-base font-medium",
        "bg-transparent hover:bg-muted/20",
        // Active style: primary background with white text
        active ? "bg-primary text-white hover:bg-primary/95" : "",
        // Non-active accent/muted coloring
        !active && item.accent && "text-primary hover:text-primary",
        !active && item.muted && "text-muted-foreground hover:text-foreground",
        collapsed && "justify-center px-0"
      )}
    >
      <span
        className={cn(
          "shrink-0 text-xl",
          // icon inherits white when active, otherwise keep accent/muted/default
          active
            ? "text-white"
            : item.accent
            ? "text-primary"
            : item.muted
            ? "text-muted-foreground"
            : "text-foreground"
        )}
      >
        {item.icon}
      </span>
      {!collapsed && (
        <span className={cn("truncate", active && "text-white")}>{item.label}</span>
      )}
    </Button>
  )
}

export default function Sidebar({
  collapsed = false,
  activeKey = "quickCreate",
  onSelect,
}: {
  collapsed?: boolean
  activeKey?: NavKey
  onSelect?: (key: NavKey) => void
}) {
  const top: NavItem[] = [
    { key: "quickCreate", label: "Quick Create", icon: <PlusCircle size={22} /> },
    { key: "dashboard", label: "Dashboard", icon: <SquaresFour size={22} /> },
    { key: "lifecycle", label: "Lifecycle", icon: <ListBullets size={22} /> },
    { key: "analytics", label: "Analytics", icon: <ChartBar size={22} /> },
    { key: "projects", label: "Projects", icon: <FolderSimple size={22} /> },
    { key: "team", label: "Team", icon: <UsersThree size={22} /> },
  ]

  const documents: NavItem[] = [
    { key: "dataLibrary", label: "Data Library", icon: <Database size={22} />, accent: true },
    { key: "reports", label: "Reports", icon: <ClipboardText size={22} />, accent: true },
    { key: "wordAssistant", label: "Word Assistant", icon: <FileText size={22} />, accent: true },
    { key: "more", label: "More", icon: <DotsThree size={22} />, muted: true },
  ]

  const bottom: NavItem[] = [
    { key: "settings", label: "Settings", icon: <Gear size={22} />, accent: true },
    { key: "help", label: "Get Help", icon: <Question size={22} />, accent: true },
  ]

  return (
    <aside
      className={cn(
        "border-r bg-background",
        "h-[calc(100vh-64px)]",
        "w-[260px]",
        collapsed && "w-[64px]"
      )}
    >
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className={cn("px-2 py-4", collapsed && "px-2")}>
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
            <div className="mt-10 px-3 text-sm font-semibold text-muted-foreground">
              Documents
            </div>
          )}

          <div className={cn("mt-4 space-y-1", collapsed && "mt-6")}>
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

      {/* Spacer to preserve layout height previously used by profile footer */}
      <div className="h-16" />
    </aside>
  )
}

export type { NavKey }
