"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  read: boolean
  category: "update" | "alert" | "info"
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "RADAR returns on April 1",
    description:
      "Learn which AI skills leaders at Apple, IBM, and Snowflake are hiring for. This is an important update about the latest trends in AI recruiting.",
    timestamp: "1 day ago",
    read: false,
    category: "update",
  },
  {
    id: "2",
    title: "New course available",
    description:
      "Check out the latest course on Advanced TypeScript patterns. This course covers advanced type system features and best practices.",
    timestamp: "3 days ago",
    read: false,
    category: "info",
  },
  {
    id: "3",
    title: "Account upgrade successful",
    description: "Your premium plan is now active. Enjoy all the premium features!",
    timestamp: "1 week ago",
    read: true,
    category: "alert",
  },
  {
    id: "4",
    title: "Security alert",
    description:
      "A new login was detected from a new device. If this wasn't you, please change your password immediately.",
    timestamp: "2 weeks ago",
    read: true,
    category: "alert",
  },
  {
    id: "5",
    title: "Course completion milestone",
    description:
      "Congratulations! You've completed 50% of the TypeScript Fundamentals course.",
    timestamp: "3 weeks ago",
    read: true,
    category: "info",
  },
  {
    id: "6",
    title: "New certification available",
    description:
      "A new Advanced React certification is now available. Complete the course to earn this badge.",
    timestamp: "1 month ago",
    read: true,
    category: "update",
  },
]

export default function NotificationsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<
    "all" | "update" | "alert" | "info"
  >("all")

  const filteredNotifications =
    selectedCategory === "all"
      ? notifications
      : notifications.filter((n) => n.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "update":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "alert":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "info":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with all your notifications
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {["all", "update", "alert", "info"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-none capitalize ${
                selectedCategory === category ? "" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  category as "all" | "update" | "alert" | "info"
                )
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                  !notification.read
                    ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                    : "bg-card hover:bg-accent border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold truncate">
                        {notification.title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${getCategoryColor(
                          notification.category
                        )}`}
                      >
                        {notification.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-3 w-3 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No notifications found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
