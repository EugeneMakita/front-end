"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ForumReplyEditor from "@/components/forum-reply-editor"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  CaretDownIcon,
  CaretRightIcon,
  ArrowBendUpLeftIcon,
  FlagIcon,
  UserCircleIcon,
  DotsThreeIcon,
  TrashIcon,
  UserMinusIcon,
  WarningCircleIcon,
  PencilSimpleIcon,
  EyeSlashIcon,
} from "@phosphor-icons/react"
import { mockThreads, type ForumReply } from "@/lib/mock-forum"
import { mockParticipants } from "@/lib/mock-participants"

function ReplyCard({
  reply,
  courseId,
  participantIdByName,
  depth = 0,
}: {
  reply: ForumReply
  courseId: string
  participantIdByName: Map<string, string>
  depth?: number
}) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [showReplyBox, setShowReplyBox] = React.useState(false)
  const [replyEmpty, setReplyEmpty] = React.useState(true)

  const participantId = participantIdByName.get(reply.author.toLowerCase())

  return (
    <div className={depth > 0 ? "ml-8 border-l-2 border-primary/10 pl-4" : ""}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-muted-foreground hover:text-foreground"
            >
              {collapsed ? <CaretRightIcon size={14} /> : <CaretDownIcon size={14} />}
            </button>
            <UserCircleIcon size={28} weight="thin" className="text-muted-foreground" />
            <div className="flex items-center gap-2 text-sm">
              {participantId ? (
                <Link
                  href={`/courses/${courseId}/participants/${participantId}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {depth > 0 ? "Re: " : ""}
                  {reply.author}
                </Link>
              ) : (
                <span className="font-semibold">{depth > 0 ? `Re: ` : ""}{reply.author}</span>
              )}
              <span className="text-muted-foreground">{reply.postedAt}</span>
              {reply.isNew && (
                <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 text-[10px] px-1.5 py-0">
                  New
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              <ArrowBendUpLeftIcon size={12} />
              Reply
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <DotsThreeIcon size={16} weight="bold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem>
                  <PencilSimpleIcon size={14} />
                  Edit post
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <EyeSlashIcon size={14} />
                  Hide post
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <WarningCircleIcon size={14} />
                  Report user
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserMinusIcon size={14} />
                  Suspend user
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <TrashIcon size={14} />
                  Delete post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Body */}
        {!collapsed && (
          <div className="px-4 py-3">
            <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">{reply.content}</p>
          </div>
        )}

        {/* Reply box */}
        {showReplyBox && (
          <div className="px-4 pb-4 space-y-3 bg-muted/10">
            <div className="pt-3 flex items-start gap-3">
              <UserCircleIcon size={32} weight="thin" className="text-muted-foreground shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <ForumReplyEditor onContentChange={(isEmpty) => setReplyEmpty(isEmpty)} />
                <div className="flex items-center gap-2">
                  <Button size="sm" disabled={replyEmpty}>
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyBox(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {!collapsed && reply.replies && reply.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {reply.replies.map((nested) => (
            <ReplyCard
              key={nested.id}
              reply={nested}
              courseId={courseId}
              participantIdByName={participantIdByName}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ThreadDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const threadId = params.threadId as string
  const thread = mockThreads.find((t) => t.id === threadId)

  const [showReplyBox, setShowReplyBox] = React.useState(false)
  const [replyEmpty, setReplyEmpty] = React.useState(true)
  const participantIdByName = React.useMemo(() => {
    const map = new Map<string, string>()
    for (const participant of mockParticipants) {
      map.set(`${participant.firstName} ${participant.lastName}`.toLowerCase(), participant.id)
    }
    return map
  }, [])

  if (!thread) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Thread not found</p>
      </div>
    )
  }

  const startedById = participantIdByName.get(thread.startedBy.toLowerCase())

  return (
    <div className="space-y-6">
      {/* Thread title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{thread.topic}</h2>
          {thread.flagged && (
            <FlagIcon size={16} weight="fill" className="text-orange-500" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Posted by{" "}
          {startedById ? (
            <Link
              href={`/courses/${courseId}/participants/${startedById}`}
              className="font-medium text-primary hover:underline"
            >
              {thread.startedBy}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{thread.startedBy}</span>
          )}{" "}
          &middot; {thread.lastPost}
        </p>
      </div>

      {/* Original post */}
      <div>
        <div className="flex items-center justify-between px-4 py-3 bg-primary/5">
          <div className="flex items-center gap-2">
            <UserCircleIcon size={28} weight="thin" className="text-muted-foreground" />
            <div className="flex items-center gap-2 text-sm">
              {startedById ? (
                <Link
                  href={`/courses/${courseId}/participants/${startedById}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {thread.startedBy}
                </Link>
              ) : (
                <span className="font-semibold">{thread.startedBy}</span>
              )}
              <span className="text-muted-foreground">{thread.lastPost}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              <ArrowBendUpLeftIcon size={12} />
              Reply
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <DotsThreeIcon size={16} weight="bold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem>
                  <PencilSimpleIcon size={14} />
                  Edit post
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <EyeSlashIcon size={14} />
                  Hide post
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <WarningCircleIcon size={14} />
                  Report user
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserMinusIcon size={14} />
                  Suspend user
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <TrashIcon size={14} />
                  Delete post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">{thread.content}</p>
        </div>

        {/* Reply to original post */}
        {showReplyBox && (
          <div className="px-4 pb-4 space-y-3 bg-muted/10">
            <div className="pt-3 flex items-start gap-3">
              <UserCircleIcon size={32} weight="thin" className="text-muted-foreground shrink-0 mt-1" />
              <div className="flex-1 space-y-2">
                <ForumReplyEditor onContentChange={(isEmpty) => setReplyEmpty(isEmpty)} />
                <div className="flex items-center gap-2">
                  <Button size="sm" disabled={replyEmpty}>
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyBox(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Replies */}
      {thread.posts && thread.posts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            {thread.replies} {thread.replies === 1 ? "reply" : "replies"}
          </h3>
          <div className="space-y-4">
            {thread.posts.map((post) => (
              <ReplyCard
                key={post.id}
                reply={post}
                courseId={courseId}
                participantIdByName={participantIdByName}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
