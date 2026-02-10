export type WikiPage = {
  id: string
  title: string
  content: string
  author: string
  lastEdited: string
  views: number
  edits: number
}

export const mockWikiPages: WikiPage[] = [
  {
    id: "home",
    title: "Home",
    content: `
      <p>Welcome to the course wiki. This is a collaborative space where instructors and participants can document important information, share resources, and build a knowledge base together.</p>
      <h2>Quick Links</h2>
      <ul>
        <li><strong>Getting Started</strong> — Setup instructions and prerequisites</li>
        <li><strong>FAQ</strong> — Frequently asked questions</li>
        <li><strong>Resources</strong> — Useful links and references</li>
      </ul>
      <h2>Recent Updates</h2>
      <p>The <strong>Resources</strong> page has been updated with new reference materials for Module 3. Please review the latest additions before the next session.</p>
      <blockquote>If you find any errors or want to add content, click the <strong>Edit</strong> button on any page.</blockquote>
    `,
    author: "Dr. Sarah Chen",
    lastEdited: "2 days ago",
    views: 245,
    edits: 12,
  },
  {
    id: "getting-started",
    title: "Getting Started",
    content: `
      <p>This page covers everything you need to get started with the course.</p>
      <h2>Prerequisites</h2>
      <ul>
        <li>Basic understanding of the subject matter</li>
        <li>Access to the course materials (provided via the Course tab)</li>
        <li>A working development environment (see setup below)</li>
      </ul>
      <h2>Environment Setup</h2>
      <p>Follow these steps to set up your local environment:</p>
      <ol>
        <li>Download and install the required software from the Resources page</li>
        <li>Clone the starter repository using the link provided in Module 1</li>
        <li>Run the setup script: <code>./setup.sh</code></li>
        <li>Verify your installation by running <code>npm test</code></li>
      </ol>
      <h2>First Steps</h2>
      <p>Once your environment is ready, begin with <strong>Module 1: Introduction</strong> in the Course tab. Complete the reading material before attempting the exercises.</p>
    `,
    author: "Dr. Sarah Chen",
    lastEdited: "1 week ago",
    views: 189,
    edits: 5,
  },
  {
    id: "faq",
    title: "FAQ",
    content: `
      <h2>Submissions</h2>
      <p><strong>What happens when a submission is late?</strong></p>
      <p>Late submissions receive a 10% penalty per day, up to a maximum of 3 days. After 3 days, submissions are no longer accepted unless you have an approved extension.</p>
      <p><strong>Can I resubmit an assignment?</strong></p>
      <p>Yes, you can resubmit up to 3 times before the deadline. Only the latest submission will be graded.</p>
      <h2>Grading</h2>
      <p><strong>How is the final grade calculated?</strong></p>
      <p>The final grade is a weighted average:</p>
      <ul>
        <li>Assignments: 40%</li>
        <li>Midterm exam: 25%</li>
        <li>Final project: 25%</li>
        <li>Participation: 10%</li>
      </ul>
      <h2>Technical Issues</h2>
      <p><strong>I can't access the course materials. What should I do?</strong></p>
      <p>First, try clearing your browser cache and logging in again. If the issue persists, contact the teaching assistant via the Forum.</p>
    `,
    author: "James Wilson",
    lastEdited: "3 days ago",
    views: 133,
    edits: 8,
  },
  {
    id: "resources",
    title: "Resources",
    content: `
      <p>A curated list of resources to supplement the course material.</p>
      <h2>Official Documentation</h2>
      <ul>
        <li><a href="#">Language Reference Guide</a> — Complete reference for syntax and standard library</li>
        <li><a href="#">API Documentation</a> — Full API docs with examples</li>
        <li><a href="#">Style Guide</a> — Coding conventions used in this course</li>
      </ul>
      <h2>Books</h2>
      <ul>
        <li><em>Introduction to the Subject</em> by A. Author (required textbook)</li>
        <li><em>Advanced Topics</em> by B. Writer (recommended for further reading)</li>
        <li><em>Practical Exercises</em> by C. Developer (companion workbook)</li>
      </ul>
      <h2>Tools</h2>
      <ul>
        <li><a href="#">Online IDE</a> — Browser-based development environment</li>
        <li><a href="#">Visualization Tool</a> — Interactive diagrams for understanding concepts</li>
        <li><a href="#">Practice Platform</a> — Extra exercises with auto-grading</li>
      </ul>
    `,
    author: "Maria Garcia",
    lastEdited: "5 days ago",
    views: 97,
    edits: 3,
  },
  {
    id: "changelog",
    title: "Changelog",
    content: `
      <p>Track all updates and changes to the course materials.</p>
      <h2>Week 6 (Latest)</h2>
      <ul>
        <li>Added new practice problems for Module 3</li>
        <li>Updated Resources page with additional reference materials</li>
        <li>Fixed typo in Getting Started setup instructions</li>
      </ul>
      <h2>Week 4</h2>
      <ul>
        <li>Published Module 3 materials</li>
        <li>Added FAQ section on grading</li>
        <li>Updated submission deadlines in the syllabus</li>
      </ul>
      <h2>Week 2</h2>
      <ul>
        <li>Published Module 2 materials</li>
        <li>Created Getting Started wiki page</li>
        <li>Added environment setup instructions</li>
      </ul>
      <h2>Week 1</h2>
      <ul>
        <li>Course launched</li>
        <li>Created Home and Resources wiki pages</li>
        <li>Published Module 1 materials</li>
      </ul>
    `,
    author: "Dr. Sarah Chen",
    lastEdited: "1 day ago",
    views: 64,
    edits: 6,
  },
]
