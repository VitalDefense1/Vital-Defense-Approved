"use client"

import { createContext, useContext, useLayoutEffect, useRef, useState } from "react"
import { Dialog } from "@base-ui/react/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "vd-age-confirmed"

const AgeGateContext = createContext(false)

export function useAgeConfirmed() {
  return useContext(AgeGateContext)
}

function readStoredConfirmation() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  const [confirmed, setConfirmed] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const pending = document.getElementById("vd-age-pending")
    if (!readStoredConfirmation()) {
      pending?.remove()
      return
    }
    document.documentElement.dataset.age = "ok"
    pending?.remove()
    setConfirmed(true)
    setOpen(false)
  }, [])

  function confirm() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // Storage can be blocked. This visit can still continue.
    }
    document.documentElement.dataset.age = "ok"
    setConfirmed(true)
    setOpen(false)
  }

  return (
    <AgeGateContext.Provider value={confirmed}>
      <div
        className="flex min-h-full flex-1 flex-col"
        inert={open ? true : undefined}
        aria-hidden={open ? true : undefined}
      >
        {children}
      </div>
      <Dialog.Root
        open={open}
        modal
        disablePointerDismissal
        onOpenChange={(next, details) => {
          if (!next) details.cancel()
        }}
      >
        <Dialog.Portal>
          <Dialog.Backdrop
            data-age-gate=""
            className="fixed inset-0 z-[90] bg-[#1a1917]/50 data-open:animate-in data-open:fade-in-0"
          />
          <Dialog.Popup
            ref={popupRef}
            data-age-gate=""
            aria-modal="true"
            initialFocus={() => popupRef.current}
            finalFocus={false}
            className="fixed top-1/2 left-1/2 z-[90] w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 border border-border bg-white px-6 py-8 text-center text-[#1A1917] outline-none sm:px-10 sm:py-10"
          >
            <span className="mx-auto mb-6 block h-px w-12 bg-gold" aria-hidden="true" />
            <Dialog.Title className="font-heading text-[1.45rem] leading-[1.15] font-bold text-balance sm:text-[1.85rem]">
              Are you 21 years of age or older?
            </Dialog.Title>
            <Dialog.Description className="mx-auto mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              This is a self-declared age confirmation, not verified proof of age.
            </Dialog.Description>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.google.com"
                className={cn(buttonVariants({ variant: "outline" }), "h-11 w-full sm:flex-1")}
              >
                Exit the site
              </a>
              <Button
                type="button"
                className="h-11 w-full bg-gold text-white hover:bg-[#7a623c] sm:flex-1"
                onClick={confirm}
              >
                I am over 21
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </AgeGateContext.Provider>
  )
}
