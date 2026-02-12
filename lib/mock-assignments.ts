export type AssignmentItem = {
  id: string
  title: string
  course: string
  due: string
  status: "Upcoming" | "Submitted" | "Graded"
  points: number
  submissions: number
}

export const mockAssignments: AssignmentItem[] = [
  {
    id: "A-101",
    title: "Linear Regression Worksheet",
    course: "Introduction to Machine Learning",
    due: "Feb 20, 2026",
    status: "Upcoming",
    points: 100,
    submissions: 24,
  },
  {
    id: "A-102",
    title: "Forum Reflection #2",
    course: "Introduction to Machine Learning",
    due: "Feb 14, 2026",
    status: "Submitted",
    points: 40,
    submissions: 31,
  },
  {
    id: "A-103",
    title: "TypeScript Utility Types",
    course: "Advanced TypeScript Patterns",
    due: "Feb 10, 2026",
    status: "Graded",
    points: 80,
    submissions: 28,
  },
]
