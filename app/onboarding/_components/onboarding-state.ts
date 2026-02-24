"use client"

import * as React from "react"

export type SetupType = "homeschool" | "friends" | "course" | "solo" | "tutoring" | "other"

export type TeamInvite = {
  name: string
  email: string
  role: string
}

export type OnboardingState = {
  email: string
  setupType: SetupType | null
  workRole: string
  firstName: string
  lastName: string
  country: string
  region: string
  organizationName: string
  heardFrom: string
  inviteName: string
  inviteEmail: string
  inviteRole: string
  teamInvites: TeamInvite[]
  inviteError: string
}

const STORAGE_KEY = "onboarding-state-v1"

const DEFAULT_STATE: OnboardingState = {
  email: "",
  setupType: null,
  workRole: "",
  firstName: "",
  lastName: "",
  country: "Canada",
  region: "British Columbia",
  organizationName: "",
  heardFrom: "",
  inviteName: "",
  inviteEmail: "",
  inviteRole: "Teacher",
  teamInvites: [],
  inviteError: "",
}

export const regionsByCountry: Record<string, string[]> = {
  "United States": ["California", "New York", "Texas", "Washington"],
  Canada: ["British Columbia", "Ontario", "Quebec", "Alberta"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
}

export function useOnboardingState(emailFromQuery?: string) {
  const [state, setState] = React.useState<OnboardingState>(DEFAULT_STATE)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as OnboardingState
        setState({ ...DEFAULT_STATE, ...parsed })
      }
    } catch {
      setState(DEFAULT_STATE)
    } finally {
      setHydrated(true)
    }
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    if (!emailFromQuery || emailFromQuery.trim().length === 0) return
    setState((prev) => {
      if (prev.email === emailFromQuery) return prev
      return { ...prev, email: emailFromQuery }
    })
  }, [emailFromQuery, hydrated])

  React.useEffect(() => {
    if (!hydrated) return
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, hydrated])

  const update = React.useCallback((patch: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  const regionOptions = React.useMemo(() => regionsByCountry[state.country] ?? [], [state.country])

  React.useEffect(() => {
    if (!hydrated) return
    if (regionOptions.length > 0 && !regionOptions.includes(state.region)) {
      update({ region: regionOptions[0] })
    }
  }, [hydrated, regionOptions, state.region, update])

  const canContinueSetup = state.setupType !== null
  const canContinueOrganization =
    state.firstName.trim().length > 1 &&
    state.lastName.trim().length > 1 &&
    state.organizationName.trim().length > 1

  const canAddInvite = state.inviteName.trim().length > 0 && state.inviteEmail.trim().length > 0
  const canContinueDiscovery = state.heardFrom.length > 0

  function addInvite() {
    const trimmedName = state.inviteName.trim()
    const trimmedEmail = state.inviteEmail.trim()
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (!trimmedName) {
      update({ inviteError: "Enter a team member name." })
      return
    }
    if (!emailIsValid) {
      update({ inviteError: "Enter a valid email address." })
      return
    }
    if (state.teamInvites.some((entry) => entry.email.toLowerCase() === trimmedEmail.toLowerCase())) {
      update({ inviteError: "That email is already in the invite list." })
      return
    }

    update({
      teamInvites: [...state.teamInvites, { name: trimmedName, email: trimmedEmail, role: state.inviteRole }],
      inviteName: "",
      inviteEmail: "",
      inviteRole: "Teacher",
      inviteError: "",
    })
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
  }

  function reset() {
    setState(DEFAULT_STATE)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return {
    state,
    hydrated,
    update,
    regionOptions,
    canContinueSetup,
    canContinueOrganization,
    canAddInvite,
    canContinueDiscovery,
    addInvite,
    getInitials,
    reset,
  }
}
