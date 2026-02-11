"use client"

import Link from "next/link"
import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { mockQuestions, questionTypes } from "@/lib/mock-questions"

function CodeEditor({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const lines = Math.max(10, value.split("\n").length)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <Badge variant="secondary" className="rounded-full !text-foreground">Python 3.11</Badge>
      </div>
      <div className="border bg-card overflow-hidden">
        <div className="grid grid-cols-[48px_1fr]">
          <div className="border-r bg-muted/40 py-2 text-right text-xs text-muted-foreground">
            {Array.from({ length: lines }, (_, i) => (
              <div key={i} className="h-6 pr-2">{i + 1}</div>
            ))}
          </div>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[240px] border-0 rounded-none bg-background font-mono text-xs leading-6 !text-foreground"
          />
        </div>
      </div>
    </div>
  )
}

export default function QuestionEditPage() {
  const params = useParams()
  const itemId = params.id as string
  const questionId = Number(params.questionId as string)
  const question = mockQuestions.find((q) => q.id === questionId)

  const [questionType, setQuestionType] = React.useState(question?.type ?? "Numeric")
  const [title, setTitle] = React.useState(question?.description ?? "")
  const [questionControl, setQuestionControl] = React.useState(
    `# Python question control\nimport numpy as np\n\ndata = [12, 15, 15, 16, 18, 21, 23, 24, 24, 27]\nmedian = np.median(data)\n\nquestion = "What is the median of the data?"\nanswer = median`
  )
  const [questionText, setQuestionText] = React.useState(
    `# Question text builder\nprompt = "Here is a boxplot of the data."\nprompt += "\\nWhat is the median?"`
  )

  if (!question) {
    return <p className="text-sm text-muted-foreground">Question not found.</p>
  }

  return (
    <div className="space-y-5 text-foreground">
      <div className="flex items-center justify-between">
        <div>
          <nav className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/library" className="hover:text-foreground transition-colors">
              Library
            </Link>
            <span>/</span>
            <Link href={`/library/${itemId}`} className="hover:text-foreground transition-colors">
              Document
            </Link>
            <span>/</span>
            <Link href={`/library/${itemId}/questions`} className="hover:text-foreground transition-colors">
              Questions
            </Link>
            <span>/</span>
            <span className="text-foreground">Question #{question.id}</span>
          </nav>
          <h2 className="text-xl font-semibold mt-1 text-foreground">Edit question</h2>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/library/${itemId}/questions/${question.id}/view`}>
            <Button variant="outline" className="!text-foreground">View</Button>
          </Link>
          <Button variant="secondary" className="!text-foreground">Save changes</Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-end gap-3">
          <div className="space-y-1.5 w-[220px]">
            <Label className="text-foreground">Question type</Label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger className="!text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="question-description" className="text-foreground">Description</Label>
          <Input
            id="question-description"
            className="!text-foreground"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <CodeEditor
          label="Question control"
          value={questionControl}
          onChange={setQuestionControl}
        />

        <CodeEditor
          label="Question text"
          value={questionText}
          onChange={setQuestionText}
        />
      </div>
    </div>
  )
}
