"use client"

import "mathlive"
import Link from "next/link"
import * as React from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowArcLeftIcon,
  ArrowArcRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BackspaceIcon,
  XIcon,
} from "@phosphor-icons/react"
import katex from "katex"
import { mockQuestions } from "@/lib/mock-questions"
import type { MathfieldElement } from "mathlive"

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
}: {
  keyDef: KeyDef
  onInsert: (latex: string) => void
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-7 w-full px-0 text-xs"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onInsert(keyDef.insertLatex)}
    >
      <span
        className="inline-flex items-center text-[13px] leading-none [&_.katex]:text-[13px]"
        dangerouslySetInnerHTML={{ __html: renderLatex(keyDef.labelLatex) }}
      />
    </Button>
  )
}

export default function QuestionViewPage() {
  const params = useParams()
  const itemId = params.id as string
  const questionId = Number(params.questionId as string)
  const question = mockQuestions.find((q) => q.id === questionId)
  const fieldContainerRef = React.useRef<HTMLDivElement | null>(null)
  const [showPad, setShowPad] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  const getField = React.useCallback(() => {
    return fieldContainerRef.current?.querySelector("math-field") as MathfieldElement | null
  }, [])

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    if (!isMounted) {
      return
    }
    const field = getField()
    if (!field) {
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
  }, [getField, isMounted])

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

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Compute x:</p>
        <div
          className="text-lg text-foreground"
          dangerouslySetInnerHTML={{ __html: renderLatex("\\frac{3x+5}{2}=11") }}
        />

        <div className="max-w-xl space-y-2">
          <label htmlFor="math-answer" className="block text-sm font-medium text-foreground">
            Your answer
          </label>
          <div ref={fieldContainerRef} className="border bg-background px-3 py-2">
            {isMounted ? (
              React.createElement("math-field", {
                id: "math-answer",
                className: "block w-full min-h-6 text-base text-foreground",
              style: {
                fontSize: "1rem",
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
              <div className="block min-h-6 w-full" aria-hidden="true" />
            )}
          </div>
        </div>

        {showPad && (
          <div
            className="w-[25.5rem] max-w-full"
            onMouseDown={(e) => e.preventDefault()}
          >
          <div className="w-full border bg-popover shadow-md">
            <Tabs defaultValue="basic" className="px-1.5 py-2">
              <div className="flex items-center gap-1">
                <TabsList className="grid h-8 flex-1 grid-cols-3 gap-1 bg-muted/40 p-1">
                  <TabsTrigger
                    value="basic"
                    className="h-6 w-full border border-transparent bg-transparent px-2 text-xs data-active:border-border data-active:bg-background data-active:text-foreground"
                  >
                    Basic
                  </TabsTrigger>
                  <TabsTrigger
                    value="funcs"
                    className="h-6 w-full border border-transparent bg-transparent px-2 text-xs data-active:border-border data-active:bg-background data-active:text-foreground"
                  >
                    Funcs
                  </TabsTrigger>
                  <TabsTrigger
                    value="trig"
                    className="h-6 w-full border border-transparent bg-transparent px-2 text-xs data-active:border-border data-active:bg-background data-active:text-foreground"
                  >
                    Trig
                  </TabsTrigger>
                </TabsList>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setShowPad(false)}
                >
                  <XIcon size={12} />
                </Button>
              </div>

              <TabsContent value="basic">
                <div className="mt-2 grid grid-cols-10 gap-1">
                  {basicKeys.map((keyDef) => (
                    <KeyButton key={keyDef.labelLatex} keyDef={keyDef} onInsert={insertLatex} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="funcs">
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {funcKeys.map((keyDef) => (
                    <KeyButton key={keyDef.labelLatex} keyDef={keyDef} onInsert={insertLatex} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trig">
                <div className="mt-2 grid grid-cols-3 gap-1">
                  {trigKeys.map((keyDef) => (
                    <KeyButton key={keyDef.labelLatex} keyDef={keyDef} onInsert={insertLatex} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex items-center justify-between px-1.5 py-2">
              <div className="flex items-center gap-1">
                <Button type="button" variant="outline" className="h-7 w-7" onClick={() => runCommand("undo")}> 
                  <ArrowArcLeftIcon size={16} />
                </Button>
                <Button type="button" variant="outline" className="h-7 w-7" onClick={() => runCommand("redo")}> 
                  <ArrowArcRightIcon size={16} />
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button type="button" variant="outline" className="h-7 w-7" onClick={() => runCommand("moveToPreviousChar")}>
                  <ArrowLeftIcon size={16} />
                </Button>
                <Button type="button" variant="outline" className="h-7 w-7" onClick={() => runCommand("moveToNextChar")}>
                  <ArrowRightIcon size={16} />
                </Button>
                <Button type="button" variant="outline" className="h-7 w-10" onClick={() => runCommand("deleteBackward")}>
                  <BackspaceIcon size={16} />
                </Button>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  )
}
