"use client"

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import type { LogoBox } from "@/lib/intro-logo"

const STORAGE_KEY = "vd-intro-seen"

export type IntroPhase = "unknown" | "playing" | "done"

type IntroContextValue = {
  phase: IntroPhase
  logoBox: LogoBox | null
  finish: () => void
  setLogoBox: (box: LogoBox | null) => void
  noteStarted: () => void
}

const IntroContext = createContext<IntroContextValue | null>(null)

function readSeen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("unknown")
  const [logoBox, setLogoBox] = useState<LogoBox | null>(null)
  const startedRef = useRef(false)
  const pathname = usePathname()

  useLayoutEffect(() => {
    // Session and motion are browser-only. The first render must match the
    // server, and this update flushes before paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase(readSeen() || prefersReducedMotion() ? "done" : "playing")
  }, [])

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // Storage can be blocked. This visit can still continue.
    }
    setPhase("done")
  }, [])

  const noteStarted = useCallback(() => {
    startedRef.current = true
  }, [])

  useLayoutEffect(() => {
    if (pathname !== "/" && startedRef.current && phase === "playing") {
      finish()
    }
  }, [pathname, phase, finish])

  useLayoutEffect(() => {
    if (phase !== "playing") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => {
      if (media.matches) finish()
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [phase, finish])

  const value = useMemo(
    () => ({ phase, logoBox, finish, setLogoBox, noteStarted }),
    [phase, logoBox, finish, noteStarted],
  )

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
}

export function useIntro() {
  const value = useContext(IntroContext)
  if (!value) {
    throw new Error("useIntro must be used within IntroProvider")
  }
  return value
}
