export type ForumReply = {
  id: string
  author: string
  postedAt: string
  content: string
  isNew?: boolean
  replies?: ForumReply[]
}

export type ForumThread = {
  id: string
  topic: string
  startedBy: string
  replies: number
  views: number
  uniqueViews: number
  lastPost: string
  flagged: boolean
  content?: string
  posts?: ForumReply[]
}

export const mockThreads: ForumThread[] = [
  {
    id: "1",
    topic: "Welcome to the course — introduce yourself here!",
    startedBy: "Dr. James Wilson",
    replies: 14,
    views: 87,
    uniqueViews: 42,
    lastPost: "February 8, 2026, 7:02 pm",
    flagged: false,
    content: "Hi everyone! Welcome to the course. Please take a moment to introduce yourself — share your name, background, and what you hope to learn from this course.",
    posts: [
      {
        id: "1-1",
        author: "Pooja Sharma",
        postedAt: "Mon, Feb 3, 2026, 10:15 am",
        content: "Hi! I'm Pooja, a computer science student interested in ML applications for healthcare. Excited to be here!",
        replies: [
          {
            id: "1-1-1",
            author: "Dr. James Wilson",
            postedAt: "Mon, Feb 3, 2026, 11:02 am",
            content: "Welcome Pooja! Healthcare ML is a fantastic area. We'll touch on some real-world applications later in the course.",
          },
        ],
      },
      {
        id: "1-2",
        author: "Shivam Patel",
        postedAt: "Mon, Feb 3, 2026, 2:30 pm",
        content: "Hey everyone, I'm Shivam. I have a background in data engineering and want to transition into ML roles. Looking forward to learning with you all.",
      },
      {
        id: "1-3",
        author: "Verena Müller",
        postedAt: "Tue, Feb 4, 2026, 9:00 am",
        content: "Hello! I'm Verena from Germany. I've been working as a software developer for 3 years and want to add ML to my skillset.",
        replies: [
          {
            id: "1-3-1",
            author: "Emily Chen",
            postedAt: "Tue, Feb 4, 2026, 10:45 am",
            content: "Welcome Verena! I'm Emily, a TA for this course. Feel free to reach out if you need any help.",
            isNew: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    topic: "Assignment 1 discussion thread",
    startedBy: "Dr. James Wilson",
    replies: 8,
    views: 53,
    uniqueViews: 31,
    lastPost: "February 7, 2026, 3:45 pm",
    flagged: false,
    content: "Use this thread to discuss Assignment 1. Feel free to ask questions about the requirements, but please don't share solutions directly.",
    posts: [
      {
        id: "2-1",
        author: "Chan Myae Thu",
        postedAt: "Wed, Feb 5, 2026, 4:20 pm",
        content: "Is the submission deadline for Assignment 1 on Friday or Saturday? The syllabus and the assignment page show different dates.",
        replies: [
          {
            id: "2-1-1",
            author: "Dr. James Wilson",
            postedAt: "Wed, Feb 5, 2026, 5:00 pm",
            content: "Good catch — the correct deadline is Saturday, Feb 8 at 11:59 PM. I've updated the syllabus. Thank you!",
          },
        ],
      },
      {
        id: "2-2",
        author: "Alex Andersen",
        postedAt: "Thu, Feb 6, 2026, 8:10 am",
        content: "For question 3, are we expected to use scikit-learn or can we implement from scratch?",
        replies: [
          {
            id: "2-2-1",
            author: "Emily Chen",
            postedAt: "Thu, Feb 6, 2026, 9:30 am",
            content: "Either approach is fine! If you implement from scratch you'll get bonus points for the effort.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    topic: "Help with gradient descent convergence",
    startedBy: "Pooja Sharma",
    replies: 5,
    views: 34,
    uniqueViews: 22,
    lastPost: "February 7, 2026, 11:20 am",
    flagged: true,
    content: "I'm having trouble getting my gradient descent implementation to converge. The loss keeps oscillating instead of decreasing. I've tried lowering the learning rate but it doesn't help. Any suggestions?",
    posts: [
      {
        id: "3-1",
        author: "Shivam Patel",
        postedAt: "Fri, Feb 7, 2026, 9:00 am",
        content: "Have you tried normalizing your features first? That often helps with convergence issues.",
      },
      {
        id: "3-2",
        author: "Verena Müller",
        postedAt: "Fri, Feb 7, 2026, 10:15 am",
        content: "I had the same issue. Try using a learning rate scheduler that decreases over time instead of a fixed rate.",
        replies: [
          {
            id: "3-2-1",
            author: "Pooja Sharma",
            postedAt: "Fri, Feb 7, 2026, 11:20 am",
            content: "That worked! Thank you so much, Verena. Reducing the learning rate by 0.1x every 50 epochs solved it.",
            isNew: true,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    topic: "Study group for midterm exam",
    startedBy: "Shivam Patel",
    replies: 3,
    views: 28,
    uniqueViews: 19,
    lastPost: "February 6, 2026, 9:15 pm",
    flagged: false,
    content: "Anyone interested in forming a study group for the midterm? I was thinking we could meet twice a week on Zoom.",
    posts: [
      {
        id: "4-1",
        author: "Maxim Novak",
        postedAt: "Thu, Feb 6, 2026, 7:00 pm",
        content: "I'm in! Tuesdays and Thursdays work best for me.",
      },
      {
        id: "4-2",
        author: "Khuloud Al-Rashid",
        postedAt: "Thu, Feb 6, 2026, 9:15 pm",
        content: "Count me in as well. Those days work for me too.",
      },
    ],
  },
  {
    id: "5",
    topic: "Resources for extra practice problems",
    startedBy: "Emily Chen",
    replies: 6,
    views: 41,
    uniqueViews: 27,
    lastPost: "February 6, 2026, 4:30 pm",
    flagged: false,
    content: "Here are some extra resources I recommend for additional practice beyond the course materials.",
    posts: [],
  },
  {
    id: "6",
    topic: "Confusion about backpropagation math",
    startedBy: "Verena Müller",
    replies: 11,
    views: 62,
    uniqueViews: 35,
    lastPost: "February 5, 2026, 2:10 pm",
    flagged: true,
    content: "I'm struggling with the chain rule derivation in the backpropagation lecture (slide 24). Can someone walk through the math step by step?",
    posts: [
      {
        id: "6-1",
        author: "Dr. James Wilson",
        postedAt: "Wed, Feb 5, 2026, 1:00 pm",
        content: "Great question. The key insight is that we apply the chain rule layer by layer, starting from the output. I'll post a detailed walkthrough later today.",
      },
      {
        id: "6-2",
        author: "Emily Chen",
        postedAt: "Wed, Feb 5, 2026, 2:10 pm",
        content: "I've uploaded supplementary notes to the course materials section that break down the derivation step by step. Check the 'Backpropagation' section.",
      },
    ],
  },
  {
    id: "7",
    topic: "Project ideas for final submission",
    startedBy: "Chan Myae Thu",
    replies: 2,
    views: 19,
    uniqueViews: 14,
    lastPost: "February 4, 2026, 6:50 pm",
    flagged: false,
    content: "I'm brainstorming ideas for the final project. Has anyone started thinking about what they want to build?",
    posts: [],
  },
  {
    id: "8",
    topic: "Deadline extension request for Assignment 2",
    startedBy: "Salmie Jemon",
    replies: 1,
    views: 45,
    uniqueViews: 30,
    lastPost: "February 3, 2026, 10:05 am",
    flagged: false,
    content: "Would it be possible to get a 2-day extension on Assignment 2? Several of us are also preparing for exams in other courses this week.",
    posts: [
      {
        id: "8-1",
        author: "Dr. James Wilson",
        postedAt: "Mon, Feb 3, 2026, 10:05 am",
        content: "I understand the workload can be heavy. I'll extend the deadline by 48 hours for everyone. The new deadline is Wednesday, Feb 12 at 11:59 PM.",
      },
    ],
  },
  {
    id: "9",
    topic: "How to set up the development environment",
    startedBy: "Alex Andersen",
    replies: 7,
    views: 56,
    uniqueViews: 38,
    lastPost: "February 2, 2026, 8:22 pm",
    flagged: false,
    content: "I'm having trouble setting up Python and Jupyter Notebook for the assignments. Can someone share their setup steps?",
    posts: [],
  },
  {
    id: "10",
    topic: "Off-topic: favourite ML podcasts?",
    startedBy: "Maxim Novak",
    replies: 9,
    views: 33,
    uniqueViews: 20,
    lastPost: "February 1, 2026, 5:40 pm",
    flagged: false,
    content: "Any recommendations for good ML/AI podcasts? I like listening while commuting and want to stay up to date with the field.",
    posts: [],
  },
]
