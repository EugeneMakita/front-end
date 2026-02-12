"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  PlusCircleIcon,
  BookOpenIcon,
  GraduationCapIcon,
  ClipboardIcon,
  ChalkboardSimpleIcon,
  DatabaseIcon,
  ClipboardTextIcon,
  FileTextIcon,
  DotsThreeIcon,
  GearIcon,
  QuestionIcon,
} from "@phosphor-icons/react"

type NavKey =
  | "quickCreate"
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
        "bg-transparent hover:bg-muted/20",
        // Active style: primary background with white text
        active ? "bg-primary text-white hover:bg-primary/95" : "",
        // Non-active accent/muted coloring
        !active && item.accent && "text-primary hover:text-primary",
        !active && item.muted && "text-muted-foreground hover:text-foreground",
        // collapsed uses centered layout
        collapsed && "justify-center px-0",
        !collapsed && "justify-start"
      )}
    >
      <div className={cn("flex items-center gap-3 w-full", collapsed ? "px-0" : "px-4")}> 
        <span
          className={cn(
            "shrink-0 text-lg",
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
      </div>
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
    { key: "quickCreate", label: "Quick Create", icon: <PlusCircleIcon size={22} /> },
    { key: "library", label: "Library", icon: <BookOpenIcon size={22} /> },
    { key: "courses", label: "Courses", icon: <GraduationCapIcon size={22} /> },
    { key: "classes", label: "Classes", icon: <ChalkboardSimpleIcon size={22} /> },
    { key: "assignments", label: "Assignments", icon: <ClipboardIcon size={22} /> },
  ]

  const documents: NavItem[] = [
    { key: "dataLibrary", label: "Data Library", icon: <DatabaseIcon size={22} />, accent: true },
    { key: "reports", label: "Reports", icon: <ClipboardTextIcon size={22} />, accent: true },
    { key: "wordAssistant", label: "Word Assistant", icon: <FileTextIcon size={22} />, accent: true },
    { key: "more", label: "More", icon: <DotsThreeIcon size={22} />, muted: true },
  ]

  const bottom: NavItem[] = [
    { key: "settings", label: "Settings", icon: <GearIcon size={22} />, accent: true },
    { key: "help", label: "Get Help", icon: <QuestionIcon size={22} />, accent: true },
  ]

  return (
    <aside
      className={cn(
        "border-r bg-background",
        "h-full",
        "w-[260px]",
        collapsed && "w-[64px]"
      )}
    >
      <div className="flex flex-col h-full">
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
              <div className="mt-10 px-3 text-xs font-semibold text-muted-foreground">
                Your chats
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

        {/* Bottom-left footer: Terms & Privacy */}
        <div className="px-4 py-3">
          {!collapsed ? (
            <a
              href="/terms"
              className="text-xs font-medium text-primary hover:underline"
            >
              Terms & Privacy
            </a>
          ) : (
            <a href="/terms" className="block w-full text-center text-primary" aria-label="Terms and Privacy">
              {/* show small dot when collapsed to indicate presence */}
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            </a>
          )}
        </div>
      </div>
    </aside>
  )
}

export type { NavKey }
