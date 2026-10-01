"use client"

import { useEffect, useSyncExternalStore, type ReactNode } from "react"

/**
 * Favorites for this design preview live in the browser only.
 * They are not an account and do not sync to other devices.
 */
const STORAGE_KEY = "vd-favorites"

const empty: string[] = []
let ids = empty
let hydrated = false
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return ids
}

function readStoredIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return empty
    const next = parsed.filter((id): id is string => typeof id === "string" && id.length > 0)
    return next.length > 0 ? next : empty
  } catch {
    return empty
  }
}

function hydrate() {
  if (hydrated) return
  hydrated = true
  ids = readStoredIds()
  emit()
}

function write(next: string[]) {
  if (!hydrated) hydrate()
  ids = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // The list still updates for this session when storage is unavailable.
  }
  emit()
}

export function toggleFavorite(id: string) {
  if (!hydrated) hydrate()
  const next = ids.includes(id) ? ids.filter((item) => item !== id) : [id, ...ids]
  write(next)
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    hydrate()
  }, [])

  return children
}

export function useFavorites() {
  const current = useSyncExternalStore(subscribe, getSnapshot, () => empty)
  return {
    ids: current,
    has: (id: string) => current.includes(id),
    toggle: toggleFavorite,
  }
}
