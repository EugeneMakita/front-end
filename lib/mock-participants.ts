export type Participant = {
  id: string
  firstName: string
  lastName: string
  role: "Learner" | "Instructor" | "Teaching Assistant"
  groups: string
  lastAccess: string
}

export const mockParticipants: Participant[] = [
  {
    id: "1",
    firstName: "Pooja",
    lastName: "Sharma",
    role: "Learner",
    groups: "No groups",
    lastAccess: "61 days 22 hours",
  },
  {
    id: "2",
    firstName: "Verena",
    lastName: "Müller",
    role: "Learner",
    groups: "No groups",
    lastAccess: "140 days 20 hours",
  },
  {
    id: "3",
    firstName: "Shivam",
    lastName: "Patel",
    role: "Learner",
    groups: "No groups",
    lastAccess: "114 days 21 hours",
  },
  {
    id: "4",
    firstName: "Salmie",
    lastName: "Jemon",
    role: "Learner",
    groups: "No groups",
    lastAccess: "12 days 19 hours",
  },
  {
    id: "5",
    firstName: "Chan Myae",
    lastName: "Thu",
    role: "Learner",
    groups: "No groups",
    lastAccess: "182 days 19 hours",
  },
  {
    id: "6",
    firstName: "Khuloud",
    lastName: "Al-Rashid",
    role: "Learner",
    groups: "No groups",
    lastAccess: "128 days 5 hours",
  },
  {
    id: "7",
    firstName: "Alex",
    lastName: "Andersen",
    role: "Learner",
    groups: "No groups",
    lastAccess: "1 year 79 days",
  },
  {
    id: "8",
    firstName: "Maxim",
    lastName: "Novak",
    role: "Learner",
    groups: "No groups",
    lastAccess: "1 year 257 days",
  },
  {
    id: "9",
    firstName: "Emily",
    lastName: "Chen",
    role: "Teaching Assistant",
    groups: "Group A",
    lastAccess: "2 days 4 hours",
  },
  {
    id: "10",
    firstName: "Dr. James",
    lastName: "Wilson",
    role: "Instructor",
    groups: "No groups",
    lastAccess: "1 day 3 hours",
  },
]
