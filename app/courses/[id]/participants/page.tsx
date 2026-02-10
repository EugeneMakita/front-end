"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  EnvelopeSimpleIcon,
  UserMinusIcon,
  UserPlusIcon,
  UserSwitchIcon,
  CopyIcon,
  XIcon,
} from "@phosphor-icons/react"
import { mockParticipants } from "@/lib/mock-participants"

const roles = ["Learner", "Instructor", "Teaching Assistant"] as const

export default function ParticipantsPage() {
  const params = useParams()
  const courseId = params.id as string
  const [search, setSearch] = React.useState("")
  const [filterRole, setFilterRole] = React.useState("all")
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState("Learner")
  const [invitedEmails, setInvitedEmails] = React.useState<{ email: string; role: string }[]>([])
  const [linkCopied, setLinkCopied] = React.useState(false)
  const [codeCopied, setCodeCopied] = React.useState(false)

  const courseLink = `https://app.example.com/courses/${courseId}/enrol`
  const courseCode = `CRS-${courseId.toUpperCase()}-X7K9`

  const filtered = mockParticipants.filter((p) => {
    const matchesSearch =
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
    const matchesRole = filterRole === "all" || p.role === filterRole
    return matchesSearch && matchesRole
  })

  const allSelected =
    filtered.length > 0 &&
    filtered.every((p) => selectedIds.has(p.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.id)))
    }
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleAddEmail() {
    const trimmed = inviteEmail.trim()
    if (!trimmed) return
    if (invitedEmails.some((e) => e.email === trimmed)) return
    setInvitedEmails((prev) => [...prev, { email: trimmed, role: inviteRole }])
    setInviteEmail("")
  }

  function handleRemoveEmail(email: string) {
    setInvitedEmails((prev) => prev.filter((e) => e.email !== email))
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(courseLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  function handleCopyCode() {
    navigator.clipboard.writeText(courseCode)
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  function handleSendInvites() {
    setInvitedEmails([])
    setInviteEmail("")
    setInviteRole("Learner")
    setInviteOpen(false)
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allSelected}
            onCheckedChange={toggleAll}
            aria-label="Select all"
          />
          {selectedIds.size > 0 ? (
            <span className="text-sm text-muted-foreground">
              With <span className="font-semibold text-foreground">{selectedIds.size}</span> selected:
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">Select all</span>
          )}
        </div>

        {selectedIds.size > 0 && (
          <Select
            value=""
            onValueChange={(value) => {
              if (value === "remove") setSelectedIds(new Set())
            }}
          >
            <SelectTrigger className="w-[200px] h-10">
              <SelectValue placeholder="Select the action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="message">
                <div className="flex items-center gap-2">
                  <EnvelopeSimpleIcon size={16} />
                  <span>Send message</span>
                </div>
              </SelectItem>
              <SelectItem value="changeRole">
                <div className="flex items-center gap-2">
                  <UserSwitchIcon size={16} />
                  <span>Change role</span>
                </div>
              </SelectItem>
              <SelectItem value="unenrol">
                <div className="flex items-center gap-2">
                  <UserMinusIcon size={16} />
                  <span>Unenrol</span>
                </div>
              </SelectItem>
              <SelectItem value="remove">
                <div className="flex items-center gap-2 text-destructive">
                  <TrashIcon size={16} />
                  <span>Remove</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}

        <div className="ml-auto flex items-center gap-3">
          <Button size="sm" className="gap-2" onClick={() => setInviteOpen(true)}>
            <UserPlusIcon size={16} />
            Invite students
          </Button>

          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-[240px]">
            <MagnifyingGlassIcon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              className="h-10 pl-9"
              placeholder="Search participants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
            <TableHead className="w-[40px]" />
            <TableHead className="text-gray-700 dark:text-gray-300 font-bold">First name / Last name</TableHead>
            <TableHead className="w-[140px] text-gray-700 dark:text-gray-300 font-bold">Roles</TableHead>
            <TableHead className="w-[140px] text-gray-700 dark:text-gray-300 font-bold">Groups</TableHead>
            <TableHead className="w-[180px] text-gray-700 dark:text-gray-300 font-bold">Last access to course</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((participant, index) => {
            const isSelected = selectedIds.has(participant.id)
            return (
              <TableRow
                key={participant.id}
                data-state={isSelected ? "selected" : undefined}
                className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/30 hover:bg-primary/5" : "hover:bg-primary/5"}
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleOne(participant.id)}
                    aria-label={`Select ${participant.firstName} ${participant.lastName}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <UserCircleIcon
                      size={36}
                      weight="thin"
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="font-medium text-primary">
                      {participant.firstName} {participant.lastName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{participant.role}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{participant.groups}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">{participant.lastAccess}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No participants found</p>
        </div>
      )}

      {/* Invite Modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Invite to course</DialogTitle>
            <DialogDescription>
              Invite students by email or share the course link.
            </DialogDescription>
          </DialogHeader>

          {/* Invite link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Course link</label>
            <p className="text-xs text-muted-foreground">Anyone with this link can join the course.</p>
            <div className="flex items-center gap-2">
              <Input
                value={courseLink}
                readOnly
                className="h-10 text-sm bg-muted/50"
              />
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5 w-[110px]" onClick={handleCopyLink}>
                <CopyIcon size={14} />
                {linkCopied ? "Copied" : "Copy Link"}
              </Button>
            </div>
          </div>

          {/* Course secret code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Course secret code</label>
            <p className="text-xs text-muted-foreground">Students can use this code to enrol themselves.</p>
            <div className="flex items-center gap-2">
              <Input
                value={courseCode}
                readOnly
                className="h-10 text-sm bg-muted/50 font-mono"
              />
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5 w-[110px]" onClick={handleCopyCode}>
                <CopyIcon size={14} />
                {codeCopied ? "Copied" : "Copy Code"}
              </Button>
            </div>
          </div>

          {/* Email invite */}
          <div className="space-y-2 pt-2 border-t">
            <label className="text-sm font-medium">Invite by email</label>
            <div className="flex items-center gap-2">
              <Input
                className="h-10 flex-1"
                placeholder="Enter email address..."
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddEmail()
                  }
                }}
              />
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="w-[160px] h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="sm" onClick={handleAddEmail}>
                Add
              </Button>
            </div>
          </div>

          {/* Invited list */}
          {invitedEmails.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Pending invites ({invitedEmails.length})
              </label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {invitedEmails.map((entry) => (
                  <div
                    key={entry.email}
                    className="flex items-center gap-3 bg-muted/40 px-3 py-2 rounded-md"
                  >
                    <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
                      {entry.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{entry.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{entry.role}</span>
                    <button
                      onClick={() => handleRemoveEmail(entry.email)}
                      className="text-muted-foreground hover:text-foreground shrink-0"
                    >
                      <XIcon size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Send button */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            {invitedEmails.length > 0 && (
              <Button onClick={handleSendInvites}>
                Send {invitedEmails.length} invite{invitedEmails.length !== 1 ? "s" : ""}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
