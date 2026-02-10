export type CourseSection = {
  id: string
  title: string
  content?: string
  link?: { label: string; href: string }
}

export type CourseItem = {
  id: string
  title: string
  description: string
  category: "course" | "project" | "resource"
  progress: number
  updatedAt: string
  starred: boolean
  startDate: string
  endDate: string
  sections: CourseSection[]
}

export const mockCourses: CourseItem[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description:
      "Learn the fundamentals of machine learning, including supervised and unsupervised learning techniques.",
    category: "course",
    progress: 75,
    updatedAt: "2 days ago",
    starred: true,
    startDate: "2026-01-13",
    endDate: "2026-05-15",
    sections: [
      {
        id: "1-1",
        title: "ML Fundamentals",
        content:
          "This section covers the core concepts of machine learning including data preprocessing, feature engineering, and model evaluation metrics.",
      },
      {
        id: "1-2",
        title: "Supervised Learning",
        content:
          "Explore regression, classification, decision trees, and support vector machines with hands-on exercises.",
      },
      {
        id: "1-3",
        title: "Unsupervised Learning",
        content:
          "Learn clustering algorithms, dimensionality reduction, and anomaly detection techniques.",
      },
      {
        id: "1-4",
        title: "Certificate of completion",
        content:
          "You can purchase a certificate of completion once you complete all the modules in this course.",
      },
      {
        id: "1-5",
        title: "Feedback",
        content:
          "We would appreciate if you would answer these short questions. It should take only a few minutes to complete.",
        link: { label: "Provide feedback", href: "#" },
      },
    ],
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    description:
      "Deep dive into advanced type system features, generics, and design patterns in TypeScript.",
    category: "course",
    progress: 40,
    updatedAt: "1 week ago",
    starred: false,
    startDate: "2026-02-03",
    endDate: "2026-06-20",
    sections: [
      {
        id: "2-1",
        title: "Advanced Generics",
        content:
          "Master conditional types, mapped types, template literal types, and recursive type definitions.",
      },
      {
        id: "2-2",
        title: "Design Patterns in TypeScript",
        content:
          "Implement common design patterns like Factory, Observer, Strategy, and Decorator using TypeScript's type system.",
      },
      {
        id: "2-3",
        title: "Type-Safe APIs",
        content:
          "Build fully type-safe REST and GraphQL APIs with runtime validation and compile-time guarantees.",
      },
      {
        id: "2-4",
        title: "Feedback",
        content:
          "We would appreciate if you would answer these short questions. It should take only a few minutes to complete.",
        link: { label: "Provide feedback", href: "#" },
      },
    ],
  },
  {
    id: "3",
    title: "Portfolio Website Redesign",
    description:
      "A complete redesign of the personal portfolio using Next.js and Tailwind CSS.",
    category: "project",
    progress: 90,
    updatedAt: "3 days ago",
    starred: true,
    startDate: "2025-11-01",
    endDate: "2026-03-01",
    sections: [
      {
        id: "3-1",
        title: "Project Requirements",
        content:
          "Define the scope, target audience, and key features for the redesigned portfolio website.",
      },
      {
        id: "3-2",
        title: "Design Mockups",
        content:
          "Review and iterate on the wireframes and high-fidelity mockups before development begins.",
      },
      {
        id: "3-3",
        title: "Development Milestones",
        content:
          "Track progress across layout implementation, component development, responsive design, and deployment.",
      },
      {
        id: "3-4",
        title: "Certificate of completion",
        content:
          "You can purchase a certificate of completion once you complete all the tasks in this project.",
      },
    ],
  },
  {
    id: "4",
    title: "Data Visualization Handbook",
    description:
      "Comprehensive guide to creating effective data visualizations with D3.js and modern charting libraries.",
    category: "resource",
    progress: 20,
    updatedAt: "2 weeks ago",
    starred: false,
    startDate: "2026-01-20",
    endDate: "2026-07-31",
    sections: [
      {
        id: "4-1",
        title: "Visualization Principles",
        content:
          "Understand the fundamentals of effective data visualization, including color theory, chart selection, and accessibility.",
      },
      {
        id: "4-2",
        title: "D3.js Basics",
        content:
          "Get started with D3.js: selections, data binding, scales, and axes for building custom visualizations.",
      },
      {
        id: "4-3",
        title: "Interactive Charts",
        content:
          "Add tooltips, zoom, pan, and brush interactions to create engaging data dashboards.",
      },
      {
        id: "4-4",
        title: "Feedback",
        content:
          "We would appreciate if you would answer these short questions. It should take only a few minutes to complete.",
        link: { label: "Provide feedback", href: "#" },
      },
    ],
  },
  {
    id: "5",
    title: "Neural Networks from Scratch",
    description:
      "Build neural networks step by step to understand backpropagation, gradient descent, and activation functions.",
    category: "course",
    progress: 60,
    updatedAt: "5 days ago",
    starred: false,
    startDate: "2025-12-01",
    endDate: "2026-04-30",
    sections: [
      {
        id: "5-1",
        title: "Perceptrons & Neurons",
        content:
          "Learn how individual neurons work, including weights, biases, and activation functions.",
      },
      {
        id: "5-2",
        title: "Backpropagation",
        content:
          "Understand the chain rule and how gradients flow backward through a network to update weights.",
      },
      {
        id: "5-3",
        title: "Building a Neural Network",
        content:
          "Implement a multi-layer neural network from scratch using only NumPy, then train it on real data.",
      },
      {
        id: "5-4",
        title: "Certificate of completion",
        content:
          "You can purchase a certificate of completion once you complete all the courses in this program.",
      },
      {
        id: "5-5",
        title: "Feedback",
        content:
          "We would appreciate if you would answer these short questions. It should take only a few minutes to complete.",
        link: { label: "Provide feedback", href: "#" },
      },
    ],
  },
  {
    id: "6",
    title: "API Design Best Practices",
    description:
      "Learn RESTful API design principles, versioning strategies, and authentication patterns.",
    category: "resource",
    progress: 100,
    updatedAt: "1 month ago",
    starred: true,
    startDate: "2025-09-01",
    endDate: "2026-01-15",
    sections: [
      {
        id: "6-1",
        title: "REST Principles",
        content:
          "Understand resource naming, HTTP methods, status codes, and HATEOAS for building consistent APIs.",
      },
      {
        id: "6-2",
        title: "Authentication & Authorization",
        content:
          "Implement OAuth 2.0, JWT tokens, API keys, and role-based access control for secure APIs.",
      },
      {
        id: "6-3",
        title: "Versioning & Documentation",
        content:
          "Explore URL-based vs header-based versioning and auto-generate OpenAPI documentation.",
      },
      {
        id: "6-4",
        title: "Feedback",
        content:
          "We would appreciate if you would answer these short questions. It should take only a few minutes to complete.",
        link: { label: "Provide feedback", href: "#" },
      },
    ],
  },
]
