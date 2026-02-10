export type Folder = {
  id: string
  name: string
  count: number
  icon: "star" | "folder"
}

export type LibraryItem = {
  id: string
  title: string
  description: string
  updatedAt: string
  image: string
  folderId?: string
}

export const initialFolders: Folder[] = [
  { id: "favorites", name: "Favorites", count: 1, icon: "star" },
  { id: "eugee", name: "EuGee", count: 1, icon: "folder" },
]

export const initialItems: LibraryItem[] = [
  {
    id: "1",
    title: "Holiday Party Presentation",
    description: "Presentation slides for the annual holiday celebration",
    updatedAt: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=240&fit=crop",
    folderId: "favorites",
  },
  {
    id: "2",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML including supervised and unsupervised learning",
    updatedAt: "3 days ago",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop",
    folderId: "eugee",
  },
  {
    id: "3",
    title: "Q4 Sales Report",
    description: "Quarterly sales performance breakdown by region",
    updatedAt: "1 week ago",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
  },
  {
    id: "4",
    title: "Brand Guidelines 2025",
    description: "Updated brand identity, colors, typography, and usage rules",
    updatedAt: "5 days ago",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop",
  },
  {
    id: "5",
    title: "Product Launch Deck",
    description: "Keynote presentation for the upcoming product launch event",
    updatedAt: "1 day ago",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=240&fit=crop",
  },
  {
    id: "6",
    title: "Team Onboarding Guide",
    description: "Step-by-step onboarding process for new team members",
    updatedAt: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=240&fit=crop",
  },
]
