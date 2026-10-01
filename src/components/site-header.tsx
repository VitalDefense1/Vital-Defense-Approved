"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { Heart, Search, ShoppingBag, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { departments } from "@/lib/navigation"
import { cn } from "@/lib/utils"

type Panel = "search" | "favorites" | "account" | "cart"

const panels: Record<Panel, { title: string; body: string }> = {
  search: {
    title: "Search",
    body: "Search does not run in this preview. There is no catalog to query.",
  },
  favorites: {
    title: "Favorites",
    body: "Favorites are not saved in this preview.",
  },
  account: {
    title: "Account",
    body: "Signing in is not available in this preview.",
  },
  cart: {
    title: "Cart",
    body: "The cart does not hold items. Nothing can be purchased here.",
  },
}

const iconClass = "size-[22px]"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panel, setPanel] = useState<Panel>("search")
  const [panelOpen, setPanelOpen] = useState(false)

  function openPanel(next: Panel) {
    setMenuOpen(false)
    setPanel(next)
    setPanelOpen(true)
  }

  const active = panels[panel]

  return (
    <header className="relative z-30 flex h-[4.75rem] items-center justify-between bg-white px-2 sm:h-28 sm:px-5 lg:h-36">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger
          className="inline-flex size-11 items-center justify-center rounded-full text-[#1A1917]"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
        >
          <span className="flex w-[18px] flex-col gap-[5px]" aria-hidden="true">
            <span className="block h-[1.5px] w-full bg-current" />
            <span className="block h-[1.5px] w-full bg-current" />
            <span className="block h-[1.5px] w-full bg-current" />
          </span>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full gap-0 overflow-hidden bg-white p-0 sm:max-w-md"
          id="site-navigation"
        >
          <SheetHeader className="border-b border-border px-6 py-6">
            <SheetTitle className="sr-only">Browse Vital Defense</SheetTitle>
            <SheetDescription className="sr-only">
              Category links for the design preview.
            </SheetDescription>
            <Logo className="h-16" />
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-2">
            <nav aria-label="Categories">
              {departments.map((department) => (
                <details
                  key={department.slug}
                  className="vd-disclosure border-b border-border"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <span className="font-heading text-xl">{department.label}</span>
                    <span className="vd-plus text-2xl leading-none text-gold" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <ul className="pb-4">
                    <li>
                      <Link
                        href={`/${department.slug}`}
                        className="vd-link inline-flex py-2 text-sm"
                        onClick={() => setMenuOpen(false)}
                      >
                        All {department.label.toLowerCase()}
                      </Link>
                    </li>
                    {department.groups.map((group) => (
                      <li key={group.slug}>
                        <Link
                          href={`/${department.slug}/${group.slug}`}
                          className="vd-link inline-flex py-2 text-sm text-muted-foreground"
                          onClick={() => setMenuOpen(false)}
                        >
                          {group.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </nav>
            <div className="mt-6 border-t border-border pt-6 pb-10">
              <Link
                href="/contact"
                className="vd-link font-heading text-xl"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-5 flex flex-col items-start gap-1 min-[480px]:hidden">
                <button
                  type="button"
                  className="py-2 text-sm"
                  onClick={() => openPanel("favorites")}
                >
                  Favorites
                </button>
                <button
                  type="button"
                  className="py-2 text-sm"
                  onClick={() => openPanel("account")}
                >
                  Account
                </button>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
                Optics, ammunition, and other departments can be added when you
                send the full list.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Link
        href="/"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm"
      >
        <Logo priority className="h-14 min-[480px]:h-16 sm:h-[4.5rem] lg:h-24" />
      </Link>

      <div className="ml-auto flex items-center">
        <UtilityButton label="Search" onClick={() => openPanel("search")}>
          <Search className={iconClass} strokeWidth={1.5} aria-hidden />
        </UtilityButton>
        <UtilityButton
          label="Favorites"
          className="hidden min-[480px]:inline-flex"
          onClick={() => openPanel("favorites")}
        >
          <Heart className={iconClass} strokeWidth={1.5} aria-hidden />
        </UtilityButton>
        <UtilityButton
          label="Account"
          className="hidden min-[480px]:inline-flex"
          onClick={() => openPanel("account")}
        >
          <User className={iconClass} strokeWidth={1.5} aria-hidden />
        </UtilityButton>
        <UtilityButton label="Cart" onClick={() => openPanel("cart")}>
          <ShoppingBag className={iconClass} strokeWidth={1.5} aria-hidden />
        </UtilityButton>
      </div>

      <Dialog open={panelOpen} onOpenChange={setPanelOpen}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-medium">
              {active.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-6 text-muted-foreground">
              {active.body}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  )
}

function UtilityButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string
  onClick: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full text-[#1A1917]",
        className,
      )}
      aria-haspopup="dialog"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
