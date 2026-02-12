"use client"

import { Badge } from "@/components/ui/badge"
import { mockParticipants } from "@/lib/mock-participants"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ClassParticipantsPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        All participants in this class, including instructors and assistants.
      </p>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last access</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockParticipants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell className="font-medium">
                {participant.firstName} {participant.lastName}
              </TableCell>
              <TableCell>{participant.email}</TableCell>
              <TableCell>
                <Badge variant="secondary">{participant.role}</Badge>
              </TableCell>
              <TableCell>{participant.lastAccess}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
