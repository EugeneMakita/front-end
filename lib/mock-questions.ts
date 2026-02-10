export type QuestionType =
  | "Numeric"
  | "Calculated"
  | "Complex"
  | "Calculated Complex"
  | "Multiple-choice"
  | "Multiple-answer"
  | "Matching"
  | "Algebraic Expression"
  | "String"
  | "Essay"
  | "File Upload"
  | "Drawing"
  | "Matrix"
  | "Interval"
  | "Chemical"
  | "Multipart"
  | "Conditional"

export const questionTypes: QuestionType[] = [
  "Numeric",
  "Calculated",
  "Complex",
  "Calculated Complex",
  "Multiple-choice",
  "Multiple-answer",
  "Matching",
  "Algebraic Expression",
  "String",
  "Essay",
  "File Upload",
  "Drawing",
  "Matrix",
  "Interval",
  "Chemical",
  "Multipart",
  "Conditional",
]

export type Question = {
  id: number
  description: string
  type: QuestionType
  timesUsed: number
  lastModified: string
  group: string
}

export const mockQuestions: Question[] = [
  {
    id: 36,
    description: "Calculate the derivative of f(x) = 3x² + 2x − 5 at x = 4",
    type: "Numeric",
    timesUsed: 1,
    lastModified: "02/03/26",
    group: "Unassigned",
  },
  {
    id: 37,
    description: "Which of the following best describes the Fundamental Theorem of Calculus?",
    type: "Multiple-choice",
    timesUsed: 2,
    lastModified: "02/03/26",
    group: "Unassigned",
  },
  {
    id: 38,
    description: "Select all properties that apply to a continuous function on a closed interval",
    type: "Multiple-answer",
    timesUsed: 2,
    lastModified: "02/03/26",
    group: "Unassigned",
  },
  {
    id: 39,
    description: "If f(x) is differentiable at x = a, find f'(a); otherwise explain why the derivative does not exist",
    type: "Conditional",
    timesUsed: 2,
    lastModified: "02/03/26",
    group: "Unassigned",
  },
  {
    id: 40,
    description: "Find the volume of a cylinder given radius r and height h using the formula V = πr²h",
    type: "Numeric",
    timesUsed: 1,
    lastModified: "02/03/26",
    group: "Unassigned",
  },
  {
    id: 41,
    description: "Evaluate the integral ∫(2x + 3)dx from x = 0 to x = 5 using substitution",
    type: "Multipart",
    timesUsed: 1,
    lastModified: "02/07/26",
    group: "Unassigned",
  },
  {
    id: 42,
    description: "Part A: Find f'(x). Part B: Evaluate f'(2). Part C: Find the tangent line at x = 2",
    type: "Multipart",
    timesUsed: 0,
    lastModified: "02/04/26",
    group: "Unassigned",
  },
  {
    id: 43,
    description: "Solve the system of equations: 2x + 3y = 7 and x − y = 1 using elimination",
    type: "Multipart",
    timesUsed: 0,
    lastModified: "02/04/26",
    group: "Unassigned",
  },
  {
    id: 44,
    description: "Determine the area under the curve y = x² from x = 0 to x = a using Riemann sums",
    type: "Multipart",
    timesUsed: 0,
    lastModified: "02/04/26",
    group: "Unassigned",
  },
  {
    id: 45,
    description: "Simplify the algebraic expression: (x² − 4) / (x − 2) for all valid x",
    type: "Algebraic Expression",
    timesUsed: 0,
    lastModified: "02/04/26",
    group: "Unassigned",
  },
  {
    id: 46,
    description: "Prepare an income statement for Q4 based on the provided revenue and expense data",
    type: "Multipart",
    timesUsed: 0,
    lastModified: "02/08/26",
    group: "Unassigned",
  },
  {
    id: 47,
    description: "Match each integration technique with its appropriate use case from the list provided",
    type: "Matching",
    timesUsed: 0,
    lastModified: "02/05/26",
    group: "Unassigned",
  },
  {
    id: 48,
    description: "Explain the relationship between differentiation and integration in your own words",
    type: "Essay",
    timesUsed: 0,
    lastModified: "02/06/26",
    group: "Unassigned",
  },
  {
    id: 49,
    description: "Upload your completed proof for the Mean Value Theorem as a PDF document",
    type: "File Upload",
    timesUsed: 0,
    lastModified: "02/06/26",
    group: "Unassigned",
  },
  {
    id: 50,
    description: "Sketch the graph of f(x) = sin(x) over the interval [0, 2π] on the canvas",
    type: "Drawing",
    timesUsed: 0,
    lastModified: "02/06/26",
    group: "Unassigned",
  },
  {
    id: 51,
    description: "Find the volume of a cone with radius r and height h where V = (1/3)πr²h",
    type: "Calculated",
    timesUsed: 3,
    lastModified: "02/03/26",
    group: "Unassigned",
  },
  {
    id: 52,
    description: "Solve the complex system involving three variables and two constraint equations",
    type: "Complex",
    timesUsed: 1,
    lastModified: "02/04/26",
    group: "Unassigned",
  },
  {
    id: 53,
    description: "Compute the surface area of a torus given major radius R and minor radius r",
    type: "Calculated Complex",
    timesUsed: 2,
    lastModified: "02/05/26",
    group: "Unassigned",
  },
  {
    id: 54,
    description: "State the Fundamental Theorem of Calculus in a single sentence",
    type: "String",
    timesUsed: 5,
    lastModified: "02/03/26",
    group: "Unassigned",
  },
  {
    id: 55,
    description: "Fill in the 3×3 transformation matrix for a 90-degree counterclockwise rotation",
    type: "Matrix",
    timesUsed: 1,
    lastModified: "02/07/26",
    group: "Unassigned",
  },
  {
    id: 56,
    description: "Express the solution set as an interval notation: x² < 9",
    type: "Interval",
    timesUsed: 4,
    lastModified: "02/04/26",
    group: "Unassigned",
  },
  {
    id: 57,
    description: "Balance the following chemical equation: Fe + O₂ → Fe₂O₃",
    type: "Chemical",
    timesUsed: 2,
    lastModified: "02/06/26",
    group: "Unassigned",
  },
]
