import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import Script from "next/script"
import { AgeGate } from "@/components/age-gate"
import { CartProvider } from "@/components/cart-state"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-barlow",
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
      className={`${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Script id="vd-age-session" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("vd-age-confirmed")==="1"){var s=document.createElement("style");s.id="vd-age-pending";s.textContent="[data-age-gate]{display:none!important}html,body{overflow:visible!important}";document.head.appendChild(s)}}catch(e){}`}
        </Script>
        <AgeGate>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <CartProvider>
            <SiteHeader />
            <div id="content" className="flex-1">
              {children}
            </div>
            <SiteFooter />
          </CartProvider>
        </AgeGate>
      </body>
    </html>
  )
}
