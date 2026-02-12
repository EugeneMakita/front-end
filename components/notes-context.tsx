"use client"

import * as React from "react"

export type CapturedNote = {
  id: string
  text: string
  sourcePath: string
  createdAt: string
}

type NotesContextValue = {
  capturedNotes: CapturedNote[]
  addCapturedNote: (text: string, sourcePath: string) => void
}

const NotesContext = React.createContext<NotesContextValue | null>(null)

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [capturedNotes, setCapturedNotes] = React.useState<CapturedNote[]>([])

  const addCapturedNote = React.useCallback((text: string, sourcePath: string) => {
    const normalized = text.trim()
    if (!normalized) return
    const now = new Date()
    setCapturedNotes((prev) => [
      {
        id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
        text: normalized,
        sourcePath,
        createdAt: now.toLocaleString(),
      },
      ...prev,
    ])
  }, [])

  return (
    <NotesContext.Provider value={{ capturedNotes, addCapturedNote }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const value = React.useContext(NotesContext)
  if (!value) {
    throw new Error("useNotes must be used within NotesProvider")
  }
  return value
}
