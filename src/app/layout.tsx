import type { Metadata } from "next"
import { Oswald, Rajdhani } from "next/font/google"
import Script from "next/script"
import { AgeGate } from "@/components/age-gate"
import { CartProvider } from "@/components/cart-state"
import { FavoritesProvider } from "@/components/favorites-state"
import { IntroProvider } from "@/components/intro-state"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { introLogoBootScript } from "@/lib/intro-logo"
import "./globals.css"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-oswald-face",
  display: "swap",
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-rajdhani-face",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Vital Defense | Lake City, Florida",
    template: "%s | Vital Defense",
  },
  description:
    "Design preview for Vital Defense, a firearms business in Lake City, Florida. This preview does not sell products.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  icons: {
    icon: "/brand/vital-defense-logo.jpg",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Script id="vd-age-session" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("vd-age-confirmed")==="1"){var s=document.createElement("style");s.id="vd-age-pending";s.textContent="[data-age-gate]{display:none!important}html,body{overflow:visible!important}";document.head.appendChild(s)}}catch(e){}`}
        </Script>
        <Script id="vd-intro-session" strategy="beforeInteractive">
          {introLogoBootScript}
        </Script>
        <AgeGate>
          <IntroProvider>
            <a className="skip-link" href="#content">
              Skip to content
            </a>
            <CartProvider>
              <FavoritesProvider>
                <SiteHeader />
                <div id="content" className="flex-1">
                  {children}
                </div>
                <SiteFooter />
              </FavoritesProvider>
            </CartProvider>
          </IntroProvider>
        </AgeGate>
      </body>
    </html>
  )
}
