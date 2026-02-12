export type ClassItem = {
  id: string
  title: string
  course: string
  schedule: string
  room: string
  studentsCount: number
}

export const mockClasses: ClassItem[] = [
  {
    id: "c-1",
    title: "ML - Section A",
    course: "Introduction to Machine Learning",
    schedule: "Mon/Wed 10:00 AM",
    room: "Room 204",
    studentsCount: 32,
  },
  {
    id: "c-2",
    title: "ML - Section B",
    course: "Introduction to Machine Learning",
    schedule: "Tue/Thu 2:00 PM",
    room: "Room 105",
    studentsCount: 28,
  },
  {
    id: "c-3",
    title: "TypeScript Lab",
    course: "Advanced TypeScript Patterns",
    schedule: "Friday 11:30 AM",
    room: "Lab 3",
    studentsCount: 21,
  },
]
