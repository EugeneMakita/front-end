"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

type NotificationItem = {
  key: string
  title: string
  description: string
}

const platformItems: NotificationItem[] = [
  {
    key: "forum-thread-created",
    title: "New forum thread in your class",
    description: "Get notified when a new thread is created in classes or courses you belong to.",
  },
  {
    key: "forum-replies",
    title: "Replies to your forum posts",
    description: "Receive alerts when someone responds to your thread or comment.",
  },
  {
    key: "assignment-created",
    title: "New assignment created",
    description: "Be notified when instructors publish a new assignment.",
  },
  {
    key: "added-to-class-course",
    title: "Added to a class or course",
    description: "Know when you are enrolled or assigned to a new class/course.",
  },
  {
    key: "new-messages",
    title: "New direct messages",
    description: "Receive notifications for new private messages.",
  },
  {
    key: "document-question-generation",
    title: "Questions generated from documents",
    description: "Get updates when document processing creates new questions/answers.",
  },
]

const emailItems: NotificationItem[] = [
  {
    key: "weekly-digest",
    title: "Weekly activity digest",
    description: "A summary of assignments, forum activity, and class updates.",
  },
  {
    key: "deadline-reminders",
    title: "Deadline reminders",
    description: "Email reminders before assignment due dates.",
  },
]

function NotificationRow({
  checked,
  onCheckedChange,
  title,
  description,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        size="default"
        className="mt-0.5 cursor-pointer"
      />
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default function NotificationsSettingsPage() {
  const [toggles, setToggles] = React.useState<Record<string, boolean>>({
    "forum-thread-created": true,
    "forum-replies": true,
    "assignment-created": true,
    "added-to-class-course": true,
    "new-messages": true,
    "document-question-generation": true,
    "weekly-digest": false,
    "deadline-reminders": true,
    "unsubscribe-all": false,
  })

  function setToggle(key: string, value: boolean) {
    setToggles((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Control which updates you receive across forums, assignments, classes, courses, and email.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Platform communication
          </p>
          <div className="space-y-4">
            {platformItems.map((item) => (
              <NotificationRow
                key={item.key}
                checked={toggles[item.key]}
                onCheckedChange={(value) => setToggle(item.key, value)}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Email communication
          </p>
          <div className="space-y-4">
            {emailItems.map((item) => (
              <NotificationRow
                key={item.key}
                checked={toggles[item.key]}
                onCheckedChange={(value) => setToggle(item.key, value)}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Unsubscribe
          </p>
          <NotificationRow
            checked={toggles["unsubscribe-all"]}
            onCheckedChange={(value) => setToggle("unsubscribe-all", value)}
            title="Unsubscribe from all emails"
            description="You will only receive transactional and security emails."
          />
        </div>
      </div>

      <div className="flex justify-start gap-2">
        <Button variant="outline" className="h-10 cursor-pointer rounded-none">
          Cancel
        </Button>
        <Button className="h-10 cursor-pointer rounded-none">Save changes</Button>
      </div>
    </div>
  )
}
