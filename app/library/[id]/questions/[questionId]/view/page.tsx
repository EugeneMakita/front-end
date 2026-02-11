"use client"

import Link from "next/link"
import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckIcon } from "@phosphor-icons/react"
import { mockQuestions } from "@/lib/mock-questions"

const points = [
  { x: 0, y: 100 },
  { x: 2, y: 80 },
  { x: 4, y: 60 },
  { x: 6, y: 40 },
]

function graphX(value: number) {
  return 130 + value * 85
}

function graphY(value: number) {
  return 380 - value * 2.7
}

export default function QuestionViewPage() {
  const params = useParams()
  const itemId = params.id as string
  const questionId = Number(params.questionId as string)
  const question = mockQuestions.find((q) => q.id === questionId)
  const [answer, setAnswer] = React.useState("-10")

  if (!question) {
    return <p className="text-sm text-muted-foreground">Question not found.</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            Question #{question.id} • {question.type}
          </p>
          <h2 className="text-xl font-semibold mt-1">Enter the rate of change for the function.</h2>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/library/${itemId}/questions`}>
            <Button variant="ghost">Back</Button>
          </Link>
          <Link href={`/library/${itemId}/questions/${question.id}/edit`}>
            <Button>Edit question</Button>
          </Link>
        </div>
      </div>

      <div className="border bg-card p-4">
        <svg viewBox="0 0 900 470" className="w-full h-auto" role="img" aria-label="Graph of v(t) points">
          <line x1="130" y1="60" x2="130" y2="390" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="380" x2="780" y2="380" stroke="currentColor" strokeWidth="2" />
          <text x="790" y="387" fontSize="20">t</text>
          <text x="123" y="52" fontSize="20">v</text>

          {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
            <g key={tick}>
              <line x1="120" y1={graphY(tick)} x2="140" y2={graphY(tick)} stroke="currentColor" strokeWidth="1.5" />
              <text x="78" y={graphY(tick) + 6} fontSize="16">{tick}</text>
            </g>
          ))}

          {[0, 2, 4, 6, 8].map((tick) => (
            <g key={tick}>
              <line x1={graphX(tick)} y1="370" x2={graphX(tick)} y2="390" stroke="currentColor" strokeWidth="1.5" />
              <text x={graphX(tick) - 5} y="410" fontSize="16">{tick}</text>
            </g>
          ))}

          {points.map((point, index) => (
            <circle key={`${point.x}-${point.y}-${index}`} cx={graphX(point.x)} cy={graphY(point.y)} r="7" fill="#4f6bed" />
          ))}
        </svg>

        <div className="mt-6 flex items-center justify-center gap-2 text-3xl">
          <span className="text-foreground">v(t) =</span>
          <div className="relative">
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="h-16 w-[180px] border-2 border-emerald-500 text-3xl text-emerald-700"
            />
            <span className="absolute -right-3 -top-3 inline-flex size-8 items-center justify-center rounded bg-emerald-500 text-white">
              <CheckIcon size={18} weight="bold" />
            </span>
          </div>
          <span className="text-foreground">t + 100</span>
        </div>
      </div>
    </div>
  )
}
