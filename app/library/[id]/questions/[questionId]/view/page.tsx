"use client"

import Link from "next/link"
import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowArcLeftIcon,
  ArrowArcRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BackspaceIcon,
  XIcon,
} from "@phosphor-icons/react"
import katex from "katex"
import { getQuestionForLibraryItem } from "@/lib/mock-questions"
import type { MathfieldElement } from "mathlive"
import { AccountingQuestionView } from "@/components/accounting-question-view"

type KeyDef = {
  labelLatex: string
  insertLatex: string
}

const basicKeys: KeyDef[] = [
  { labelLatex: "+", insertLatex: "+" },
  { labelLatex: "-", insertLatex: "-" },
  { labelLatex: "\\times", insertLatex: "\\times" },
  { labelLatex: "\\frac{\\Box}{\\Box}", insertLatex: "\\frac{#?}{#?}" },
  { labelLatex: "=", insertLatex: "=" },
  { labelLatex: "\\cdot", insertLatex: "\\cdot" },
  { labelLatex: "(", insertLatex: "(" },
  { labelLatex: ")", insertLatex: ")" },
  { labelLatex: "\\sqrt{\\Box}", insertLatex: "\\sqrt{#?}" },
  { labelLatex: "\\Box^{\\Box}", insertLatex: "{#?}^{#?}" },
  { labelLatex: "1", insertLatex: "1" },
  { labelLatex: "2", insertLatex: "2" },
  { labelLatex: "3", insertLatex: "3" },
  { labelLatex: "4", insertLatex: "4" },
  { labelLatex: "5", insertLatex: "5" },
  { labelLatex: "6", insertLatex: "6" },
  { labelLatex: "7", insertLatex: "7" },
  { labelLatex: "8", insertLatex: "8" },
  { labelLatex: "9", insertLatex: "9" },
  { labelLatex: "0", insertLatex: "0" },
]

const funcKeys: KeyDef[] = [
  { labelLatex: "\\pi", insertLatex: "\\pi" },
  { labelLatex: "\\infty", insertLatex: "\\infty" },
  { labelLatex: "\\left|\\Box\\right|", insertLatex: "\\left|#?\\right|" },
  { labelLatex: "\\left(\\Box\\right)", insertLatex: "\\left(#?\\right)" },
  { labelLatex: "\\log\\left(\\Box\\right)", insertLatex: "\\log\\left(#?\\right)" },
  { labelLatex: "\\ln\\left(\\Box\\right)", insertLatex: "\\ln\\left(#?\\right)" },
  { labelLatex: "\\sum_{\\Box}^{\\Box}", insertLatex: "\\sum_{#?}^{#?}" },
  { labelLatex: "\\int_{\\Box}^{\\Box}", insertLatex: "\\int_{#?}^{#?}" },
]

const trigKeys: KeyDef[] = [
  { labelLatex: "\\sin\\left(\\Box\\right)", insertLatex: "\\sin\\left(#?\\right)" },
  { labelLatex: "\\cos\\left(\\Box\\right)", insertLatex: "\\cos\\left(#?\\right)" },
  { labelLatex: "\\tan\\left(\\Box\\right)", insertLatex: "\\tan\\left(#?\\right)" },
  { labelLatex: "\\theta", insertLatex: "\\theta" },
  { labelLatex: "\\alpha", insertLatex: "\\alpha" },
  { labelLatex: "\\beta", insertLatex: "\\beta" },
]

function renderLatex(latex: string) {
  if (!latex.trim()) {
    return ""
  }
  return katex.renderToString(latex, {
    throwOnError: false,
    displayMode: false,
    strict: "ignore",
  })
}

function KeyButton({
  keyDef,
  onInsert,
  variant = "default",
}: {
  keyDef: KeyDef
  onInsert: (latex: string) => void
  variant?: "default" | "digit"
}) {
  return (
    <button
      type="button"
      className={
        variant === "digit"
          ? "flex h-[34px] items-center justify-center border border-border/50 bg-muted/30 text-[13px] font-medium tabular-nums text-foreground transition-colors hover:bg-muted/60 active:bg-muted"
          : "flex h-[34px] items-center justify-center border border-border/50 bg-background text-foreground/70 transition-colors hover:bg-muted/40 hover:text-foreground active:bg-muted/60"
      }
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onInsert(keyDef.insertLatex)}
    >
      <span
        className="inline-flex items-center text-[13px] leading-none [&_.katex]:text-[13px]"
        dangerouslySetInnerHTML={{ __html: renderLatex(keyDef.labelLatex) }}
      />
    </button>
  )
}

function ControlButton({
  onClick,
  children,
  wide,
}: {
  onClick: () => void
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <button
      type="button"
      className={`flex h-[30px] items-center justify-center border border-border/40 bg-background text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground active:bg-muted/60 ${wide ? "w-10" : "w-[30px]"}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function QuestionViewPage() {
  const params = useParams()
  const itemId = params.id as string
  const questionId = Number(params.questionId as string)
  const question = getQuestionForLibraryItem(itemId, questionId)
  const isAccountingQuestion = itemId === "7"
  const fieldContainerRef = React.useRef<HTMLDivElement | null>(null)
  const [showPad, setShowPad] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"basic" | "funcs" | "trig">("basic")
  const [isMounted, setIsMounted] = React.useState(false)
  const [isMathliveReady, setIsMathliveReady] = React.useState(false)

  const getField = React.useCallback(() => {
    return fieldContainerRef.current?.querySelector("math-field") as MathfieldElement | null
  }, [])

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    let cancelled = false

    void (async () => {
      await import("mathlive")
      await customElements.whenDefined("math-field")
      if (!cancelled) {
        setIsMathliveReady(true)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    if (!isMounted || !isMathliveReady) {
      return
    }
    const field = getField()
    if (!field || typeof field.setOptions !== "function") {
      return
    }

    field.setOptions({
      smartMode: false,
      smartFence: false,
      virtualKeyboardMode: "manual",
      mathVirtualKeyboardPolicy: "manual",
      defaultMode: "math",
      mathModeSpace: "\\:",
      popoverPolicy: "off",
    })

    const onFocus = () => setShowPad(true)
    const onPointerDown = () => setShowPad(true)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }
      if (event.key === ")" || event.key === "]" || event.key === "}") {
        event.preventDefault()
        field.insert(event.key, { format: "latex" })
      }
    }
    const onContextMenu = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
    }
    const hideBuiltInToggles = () => {
      const root = field.shadowRoot
      if (!root) {
        return
      }
      if (!root.querySelector('[data-custom-caret-style="true"]')) {
        const caretStyle = document.createElement("style")
        caretStyle.setAttribute("data-custom-caret-style", "true")
        caretStyle.textContent = `
          .ML__content {
            overflow: visible !important;
            padding-top: 0.14em !important;
            padding-bottom: 0.08em !important;
          }
          .ML__content .ML__latex {
            line-height: 1.24 !important;
          }
          .ML__caret::after,
          .ML__text-caret::after,
          .ML__latex-caret::after {
            --_caret-width: 1px !important;
            height: 0.9em !important;
            border-radius: 0 !important;
            bottom: -0.02em !important;
            left: -0.01em !important;
          }
          .ML__selection,
          .ML__focused .ML__selected {
            color: #111827 !important;
            background: rgba(148, 163, 184, 0.28) !important;
          }
          .ML__contains-highlight,
          .ML__focused .ML__contains-highlight {
            color: #111827 !important;
            background: rgba(148, 163, 184, 0.2) !important;
          }
        `
        root.appendChild(caretStyle)
      }
      const toggles = root.querySelectorAll('[part="menu-toggle"], [part="virtual-keyboard-toggle"]')
      toggles.forEach((toggle) => {
        ;(toggle as HTMLElement).style.display = "none"
      })
    }
    hideBuiltInToggles()
    const observer = field.shadowRoot
      ? new MutationObserver(() => hideBuiltInToggles())
      : null
    observer?.observe(field.shadowRoot as ShadowRoot, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    field.addEventListener("focus", onFocus)
    field.addEventListener("pointerdown", onPointerDown)
    field.addEventListener("click", onPointerDown)
    field.addEventListener("keydown", onKeyDown)
    field.addEventListener("contextmenu", onContextMenu, true)

    return () => {
      observer?.disconnect()
      field.removeEventListener("focus", onFocus)
      field.removeEventListener("pointerdown", onPointerDown)
      field.removeEventListener("click", onPointerDown)
      field.removeEventListener("keydown", onKeyDown)
      field.removeEventListener("contextmenu", onContextMenu, true)
    }
  }, [getField, isMathliveReady, isMounted])

  const insertLatex = React.useCallback((latex: string) => {
    const field = getField()
    if (!field) {
      return
    }
    field.focus()
    field.insert(latex, { format: "latex" })
  }, [getField])

  const runCommand = React.useCallback((command: string) => {
    const field = getField()
    if (!field) {
      return
    }
    field.focus()
    field.executeCommand(command as never)
  }, [getField])

  if (!question) {
    return <p className="text-sm text-muted-foreground">Question not found.</p>
  }

  if (isAccountingQuestion) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Question #{question.id} • {question.type}
            </p>
            <h2 className="mt-1 text-xl font-semibold">{question.description}</h2>
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

        <AccountingQuestionView questionId={questionId} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            Question #{question.id} • {question.type}
          </p>
          <h2 className="mt-1 text-xl font-semibold">Solve this expression</h2>
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

      <div className="space-y-5">
        {/* Question prompt */}
        <div className="space-y-2">
          <p className="text-[13px] font-medium text-muted-foreground">Compute x:</p>
          <div
            className="inline-block border border-dashed border-border/70 bg-muted/20 px-4 py-2.5 text-lg text-foreground"
            dangerouslySetInnerHTML={{ __html: renderLatex("\\frac{3x+5}{2}=11") }}
          />
        </div>

        {/* Answer input + keypad zone */}
        <div className="max-w-xl space-y-2" onMouseLeave={() => setShowPad(false)}>
          <label htmlFor="math-answer" className="block text-[13px] font-medium text-foreground">
            Your answer
          </label>
          <div
            ref={fieldContainerRef}
            className="border border-input bg-transparent px-2.5 py-1.5"
          >
            {isMounted ? (
              React.createElement("math-field", {
                id: "math-answer",
                className: "block w-full text-foreground",
                style: {
                  fontSize: "0.85rem",
                  width: "100%",
                  border: "0",
                  outline: "none",
                  background: "transparent",
                  ["--selection-color" as string]: "#111827",
                  ["--selection-background-color" as string]: "rgba(148, 163, 184, 0.28)",
                  ["--contains-highlight-color" as string]: "#111827",
                  ["--contains-highlight-background-color" as string]: "rgba(148, 163, 184, 0.2)",
                } as React.CSSProperties,
              })
            ) : (
              <div className="block min-h-5 w-full" aria-hidden="true" />
            )}
          </div>

          {/* Math keypad */}
          {showPad && (
            <div
              className="w-full max-w-[28rem]"
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="overflow-hidden border border-border/70 bg-popover shadow-sm">
                {/* Tab navigation */}
                <div className="flex items-center justify-between px-2 pt-2">
                  <div className="flex items-center">
                    {(["basic", "funcs", "trig"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={`relative px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] transition-colors ${
                          activeTab === tab
                            ? "text-foreground"
                            : "text-muted-foreground/60 hover:text-muted-foreground"
                        }`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab === "basic" ? "Basic" : tab === "funcs" ? "Functions" : "Trig"}
                        {activeTab === tab && (
                          <span className="absolute inset-x-3 -bottom-[1px] h-[1.5px] bg-foreground" />
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="flex h-6 w-6 items-center justify-center text-muted-foreground/50 transition-colors hover:text-foreground"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPad(false)}
                  >
                    <XIcon size={12} weight="bold" />
                  </button>
                </div>

                <div className="mx-2 mt-1 border-t border-border/40" />

                {/* Key grid */}
                <div className="p-2">
                  {activeTab === "basic" && (
                    <>
                      <div className="grid grid-cols-10 gap-[3px]">
                        {basicKeys.slice(0, 10).map((keyDef) => (
                          <KeyButton key={keyDef.labelLatex} keyDef={keyDef} onInsert={insertLatex} />
                        ))}
                      </div>
                      <div className="mt-[3px] grid grid-cols-10 gap-[3px]">
                        {basicKeys.slice(10).map((keyDef) => (
                          <KeyButton key={keyDef.labelLatex} keyDef={keyDef} onInsert={insertLatex} variant="digit" />
                        ))}
                      </div>
                    </>
                  )}

                  {activeTab === "funcs" && (
                    <div className="grid grid-cols-4 gap-[3px]">
                      {funcKeys.map((keyDef) => (
                        <KeyButton key={keyDef.labelLatex} keyDef={keyDef} onInsert={insertLatex} />
                      ))}
                    </div>
                  )}

                  {activeTab === "trig" && (
                    <div className="grid grid-cols-3 gap-[3px]">
                      {trigKeys.map((keyDef) => (
                        <KeyButton key={keyDef.labelLatex} keyDef={keyDef} onInsert={insertLatex} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between border-t border-border/40 px-2 py-1.5">
                  <div className="flex items-center gap-[3px]">
                    <ControlButton onClick={() => runCommand("undo")}>
                      <ArrowArcLeftIcon size={13} />
                    </ControlButton>
                    <ControlButton onClick={() => runCommand("redo")}>
                      <ArrowArcRightIcon size={13} />
                    </ControlButton>
                  </div>
                  <div className="flex items-center gap-[3px]">
                    <ControlButton onClick={() => runCommand("moveToPreviousChar")}>
                      <ArrowLeftIcon size={13} />
                    </ControlButton>
                    <ControlButton onClick={() => runCommand("moveToNextChar")}>
                      <ArrowRightIcon size={13} />
                    </ControlButton>
                    <ControlButton onClick={() => runCommand("deleteBackward")} wide>
                      <BackspaceIcon size={13} />
                    </ControlButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
