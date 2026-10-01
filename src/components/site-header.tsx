"use client"

import { useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { formatPrice, useCart } from "@/components/cart-state"
import { FavoritesOverlay } from "@/components/favorites-overlay"
import { useIntro } from "@/components/intro-state"
import { Logo } from "@/components/logo"
import { CatalogMenu } from "@/components/catalog-nav"
import { departments } from "@/lib/navigation"
import { cn } from "@/lib/utils"

type Panel = "search" | "account" | "cart"

const panels: Record<Panel, { title: string; body: string }> = {
  search: {
    title: "Search",
    body: "Search does not run in this preview. There is no catalog to query.",
  },
  account: {
    title: "Account",
    body: "Signing in is not available in this preview.",
  },
  cart: {
    title: "Cart",
    body: "Nothing is in the cart yet.",
  },
}

const iconClass = "size-[22px]"
const iconHalo =
  "[filter:drop-shadow(0_0_2px_rgb(255_255_255))_drop-shadow(0_0_12px_rgb(255_255_255/0.92))]"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panel, setPanel] = useState<Panel>("search")
  const [panelOpen, setPanelOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const favoritesOpenerRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()
  const { phase, logoBox } = useIntro()
  const home = pathname === "/"
  // Keep the mark at its final rectangle during playback so the handoff
  // only changes opacity. It stays invisible until the intro is finished.
  const placed = home && logoBox ? logoBox : null
  const shown = !home || phase === "done"

  useLayoutEffect(() => {
    if (!shown || !placed) return
    document.getElementById("vd-intro-pending")?.remove()
  }, [shown, placed])

  function openPanel(next: Panel) {
    setMenuOpen(false)
    setFavoritesOpen(false)
    setPanel(next)
    setPanelOpen(true)
  }

  function openFavorites(event: MouseEvent<HTMLButtonElement>) {
    favoritesOpenerRef.current = event.currentTarget
    setMenuOpen(false)
    setPanelOpen(false)
    setFavoritesOpen(true)
  }

  const { items, count, subtotal, removeItem } = useCart()
  const active = panels[panel]

  return (
    <header
      data-site-header=""
      className="relative z-30 flex h-[4.75rem] items-center justify-between overflow-visible bg-transparent px-2 sm:h-28 sm:px-5 lg:h-36"
    >
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger
          ref={menuTriggerRef}
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-full text-[#1A1917] hover:text-gold",
            iconHalo,
          )}
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
          <SheetHeader className="items-start border-b border-border px-6 py-6">
            <SheetTitle className="sr-only">Browse Vital Defense</SheetTitle>
            <SheetDescription className="sr-only">
              Category links for the design preview.
            </SheetDescription>
            <Logo mark className="h-20 w-auto max-w-none self-start" />
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-2">
            <nav aria-label="Categories">
              <ul>
              {departments.map((department) => (
                <li key={department.slug} className="relative list-none border-b border-border">
                  <Link
                    href={`/${department.slug}`}
                    className="vd-link inline-flex min-h-14 items-center py-3 pr-14 font-heading text-xl font-bold tracking-[0.06em]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {department.label}
                  </Link>
                  <details className="vd-disclosure">
                    <summary
                      className="absolute top-0 right-0 flex size-14 cursor-pointer list-none items-center justify-center [&::-webkit-details-marker]:hidden"
                      aria-label={`Show ${department.label} subcategories`}
                    >
                      <span className="vd-plus text-2xl leading-none text-gold" aria-hidden="true">
                        +
                      </span>
                    </summary>
                  <ul className="pb-3">
                    <li>
                      <Link
                        href={`/${department.slug}`}
                        className="vd-link flex min-h-11 items-center text-sm"
                        onClick={() => setMenuOpen(false)}
                      >
                        All {department.label.toLowerCase()}
                      </Link>
                    </li>
                    {department.groups.map((group) => (
                      <li key={group.slug}>
                        <Link
                          href={`/${department.slug}/${group.slug}`}
                          className="vd-link flex min-h-11 items-center text-sm"
                          onClick={() => setMenuOpen(false)}
                        >
                          {group.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  </details>
                </li>
              ))}
              </ul>
              <CatalogMenu onNavigate={() => setMenuOpen(false)} />
            </nav>
            <div className="mt-6 border-t border-border pt-6 pb-10">
              <Link
                href="/contact"
                className="vd-link font-heading text-xl font-bold tracking-[0.06em]"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-5 flex flex-col items-start gap-1 min-[480px]:hidden">
                <button
                  type="button"
                  className="py-2 text-sm"
                  aria-haspopup="dialog"
                  aria-expanded={favoritesOpen}
                  aria-controls={favoritesOpen ? "favorites-overlay" : undefined}
                  onClick={openFavorites}
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
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Link
        href="/"
        data-intro-logo=""
        aria-label="Vital Defense"
        aria-hidden={!shown && home ? true : undefined}
        tabIndex={!shown && home ? -1 : undefined}
        className={cn(
          "absolute rounded-sm transition-none",
          !shown && "pointer-events-none opacity-0",
          !placed && "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
        style={
          placed
            ? {
                left: placed.left,
                top: placed.top,
                width: placed.width,
                height: placed.height,
              }
            : undefined
        }
      >
        <Logo
          mark
          priority
          className={placed ? "h-full w-full" : "h-16 sm:h-24 lg:h-[7.5rem]"}
        />
      </Link>

      <div className="ml-auto flex items-center">
        <UtilityButton label="Search" onClick={() => openPanel("search")}>
          <Search className={iconClass} strokeWidth={1.5} aria-hidden />
        </UtilityButton>
        <UtilityButton
          label="Favorites"
          className="hidden min-[480px]:inline-flex"
          expanded={favoritesOpen}
          controls={favoritesOpen ? "favorites-overlay" : undefined}
          onClick={openFavorites}
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
        <UtilityButton
          label={count > 0 ? `Cart, ${count} items` : "Cart"}
          onClick={() => openPanel("cart")}
        >
          <ShoppingBag className={iconClass} strokeWidth={1.5} aria-hidden />
          {count > 0 ? (
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] leading-none text-white">
              {count}
            </span>
          ) : null}
        </UtilityButton>
      </div>

      <FavoritesOverlay
        open={favoritesOpen}
        onOpenChange={setFavoritesOpen}
        resolveOpener={() => {
          const opener = favoritesOpenerRef.current
          if (opener?.isConnected) return opener
          return menuTriggerRef.current
        }}
      />

      <Dialog open={panelOpen} onOpenChange={setPanelOpen}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="pr-8 font-heading text-2xl leading-tight font-bold">
              {active.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-6 text-muted-foreground">
              {panel === "cart" && items.length > 0
                ? "Checkout is not connected. These items stay in this browser for the preview."
                : active.body}
            </DialogDescription>
          </DialogHeader>
          {panel === "cart" && items.length > 0 ? (
            <div className="mt-2">
              <ul>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b border-border py-3"
                  >
                    <div>
                      <p className="font-semibold tracking-[0.04em]">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatPrice(item.price)} · {item.qty}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-gold"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-semibold text-lg tracking-[0.05em]">
                Subtotal {formatPrice(subtotal)}
              </p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </header>
  )
}

function UtilityButton({
  label,
  onClick,
  className,
  expanded,
  controls,
  children,
}: {
  label: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
  expanded?: boolean
  controls?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex size-11 items-center justify-center rounded-full text-[#1A1917] hover:text-gold",
        iconHalo,
        className,
      )}
      aria-haspopup="dialog"
      aria-expanded={expanded}
      aria-controls={controls}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
